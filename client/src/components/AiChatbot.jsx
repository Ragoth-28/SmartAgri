import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Mic, MicOff, Volume2, Sparkles, User, HelpCircle } from 'lucide-react';
import { api } from '../services/api';
import { TRANSLATIONS } from '../locales/translations';

export const AiChatbot = ({ language = 'ta', onSpeechReadout }) => {
  const t = TRANSLATIONS[language]?.chat || TRANSLATIONS.en.chat;

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: t.greeting,
      time: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);

  // Update greeting when language changes
  useEffect(() => {
    setMessages([
      {
        id: Date.now(),
        sender: 'bot',
        text: t.greeting,
        time: 'Just now',
      },
    ]);
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (textToSend) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await api.askChatbot(text, language);
      if (res.success) {
        const botMessage = {
          id: Date.now() + 1,
          sender: 'bot',
          text: res.reply,
          category: res.category,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, botMessage]);

        if (onSpeechReadout) {
          onSpeechReadout(res.reply);
        }
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: language === 'ta'
            ? 'மன்னிக்கவும், சேவையகத்துடன் இணைக்க முடியவில்லை. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.'
            : language === 'te'
            ? 'క్షమించండి, సర్వర్‌తో అనుసంధానించలేకపోయాము. దయచేసి మళ్లీ ప్రయత్నించండి.'
            : 'I had trouble connecting to the agronomy server. Please ensure your backend is active.',
          time: 'Just now',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Speech-to-Text via Web Speech API with Multilingual Support (Tamil, Telugu, Hindi, English)
  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(language === 'ta'
        ? 'உங்கள் உலாவியில் குரல் உள்ளீடு ஆதரிக்கப்படவில்லை. தயவுசெய்து தட்டச்சு செய்யவும்.'
        : language === 'te'
        ? 'మీ బ్రౌజర్‌లో వాయిస్ టైపింగ్ సపోర్ట్ లేదు. దయచేసి టైప్ చేయండి.'
        : 'Speech recognition is not supported in this browser. Please type your query.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language === 'ta' ? 'ta-IN' : language === 'te' ? 'te-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      handleSend(transcript);
    };

    recognition.start();
  };

  return (
    <div className="space-y-4">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Bot className="w-4 h-4" />
          <span>{language === 'ta' ? 'தமிழ் குரல் & உரை AI உதவியாளர்' : 'Natural Language Agronomy Assistant'}</span>
        </div>
        <h2 className="text-2xl font-extrabold text-slate-100 tracking-tight">{t.title}</h2>
        <p className="text-sm text-slate-400">{t.subtitle}</p>
      </div>

      {/* Main Natural Glass Chat Container */}
      <div className="rounded-3xl glass-card-3d border border-glow-emerald shadow-2xl flex flex-col h-[520px] overflow-hidden bg-gradient-to-b from-emerald-950/25 to-slate-900/80">
        {/* Chat Messages Body */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'bot' && (
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-emerald-500 to-green-600 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-emerald-500/20 shrink-0">
                  <Bot className="w-5 h-5" />
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed backdrop-blur-md shadow-lg ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-emerald-700/40 to-green-700/40 border border-emerald-400/40 text-slate-100'
                    : 'bg-slate-900/80 border border-white/10 text-slate-200'
                }`}
              >
                {msg.category && (
                  <div className="text-[10px] uppercase font-black text-emerald-300 tracking-wider mb-1">
                    {msg.category}
                  </div>
                )}
                <div className="whitespace-pre-line">{msg.text}</div>
                <div className="text-[9px] text-slate-400 text-right mt-1.5">{msg.time}</div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-9 h-9 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0">
                  <User className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-emerald-300">
              <Sparkles className="w-4 h-4 animate-spin text-emerald-400" />
              <span>{language === 'ta' ? 'வேளாண் AI பதிலைத் தயாரிக்கிறது...' : 'Agronomist AI is formulating advice...'}</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-5 py-2.5 bg-slate-950/60 border-t border-emerald-500/15 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <HelpCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          {t.prompts.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-[11px] whitespace-nowrap px-3.5 py-1.5 rounded-full bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 text-slate-300 hover:text-emerald-300 transition-all font-semibold"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat Input Bar */}
        <div className="p-4 bg-slate-950/80 border-t border-emerald-500/15 flex items-center gap-2.5">
          {/* Voice Mic Button */}
          <button
            onClick={handleVoiceInput}
            title={isListening ? 'Listening...' : language === 'ta' ? 'தமிழில் பேச கிளிக் செய்யவும்' : 'Click to Speak'}
            className={`p-3 rounded-2xl border transition-all ${
              isListening
                ? 'bg-rose-500/30 text-rose-300 border-rose-500 animate-pulse'
                : 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900/40'
            }`}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={isListening ? t.listening : t.placeholder}
            className="flex-1 glass-input rounded-2xl px-4 py-3 text-sm font-medium"
          />

          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || loading}
            className="p-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-black transition-all disabled:opacity-50 shadow-lg shadow-emerald-500/25"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
