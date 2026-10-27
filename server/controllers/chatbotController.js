// 100% Pure Node.js AI Farmer Chatbot & Agricultural Knowledge Engine (Supports Tamil, Hindi, English)

const AGRONOMIST_INTENT_RESPONSES = [
  {
    keywords: ['blight', 'yellow leaf', 'fungus', 'black spot', 'leaf spot', 'rot', 'கருகல்', 'இலை கருகல்', 'புள்ளி', 'நோய்'],
    title: 'Plant Disease & Fungal Management',
    titleTa: 'பயிர் இலை கருகல் & பூஞ்சாண நோய் மேலாண்மை',
    replyEn: `Fungal infections like Early/Late Blight thrive in moist, warm weather:
1. **Immediate Action:** Prune and destroy infected lower foliage away from the field.
2. **Organic Spray:** Apply 5% cold-pressed Neem Oil or Trichoderma viride (5g/L) during early morning.
3. **Chemical Remedy:** Spray Mancozeb 75% WP @ 2.5 g/L or Azoxystrobin @ 1 ml/L.
4. **Water Management:** Avoid overhead sprinkler irrigation; switch to drip to keep leaves dry.`,
    replyTa: `இலை கருகல் மற்றும் பூஞ்சாண நோய் மேலாண்மை வழிமுறைகள்:
1. **உடனடி நடவடிக்கை:** பாதிக்கப்பட்ட கீழ் இலைகளை வெட்டி வயலுக்கு வெளியே அப்புறப்படுத்தி அழிக்கவும்.
2. **இயற்கை மருந்து:** 5% வேப்பெண்ணெய் கரைசல் அல்லது டிரைக்கோடெர்மா விரிடி (லிட்டருக்கு 5 கிராம்) காலை வேளையில் தெளிக்கவும்.
3. **ரசாயன மருந்து:** மேன்கோசெப் 75% WP (லிட்டருக்கு 2.5 கிராம்) அல்லது அசோக்சிஸ்ட்ரோபின் (லிட்டருக்கு 1 மி.லி) தெளிக்கவும்.
4. **நீர் பாசனம்:** இலைகளில் நீர் தெளிப்பதைத் தவிர்த்து, சொட்டு நீர் பாசனத்தைப் பயன்படுத்தவும்.`,
  },
  {
    keywords: ['irrigation', 'water', 'pump', 'moisture', 'dry', 'drip', 'பாசனம்', 'தண்ணீர்', 'சொட்டு நீர்', 'ஈரப்பதம்', 'பம்ப்'],
    title: 'Smart Water & Irrigation Advisory',
    titleTa: 'நுண்ணிய நீர் மேலாண்மை & சொட்டு நீர் பாசனம்',
    replyEn: `Optimal irrigation guidelines:
- **Critical Stages:** Flowering and fruit/grain filling stages require steady soil moisture. Any moisture stress causes flower drop.
- **Timing:** Irrigate between 06:00 AM - 09:00 AM to minimize up to 35% evaporative loss under hot sun.
- **Sensor Guideline:** For black soil maintain 40-55% moisture; for sandy loam, maintain 25-35%.`,
    replyTa: `துல்லிய நீர் பாசன ஆலோசனைகள்:
- **முக்கிய பருவம்:** பூக்கும் மற்றும் காய் பிடிக்கும் பருவத்தில் நிலத்தில் சீரான ஈரப்பதம் அவசியம். நீர் பற்றாக்குறை பூக்கள் உதிர்வதற்கு காரணமாகும்.
- **நேரம்:** காலை 6:00 மணி முதல் 9:00 மணிக்குள் பாசனம் செய்வதன் மூலம் 35% ஆவியாதல் நீர் இழப்பைத் தடுக்கலாம்.
- **சென்சார் அளவு:** கரிசல் மண்ணில் 40-55% ஈரப்பதமும், செம்மண்/மணல் கலந்த மண்ணில் 25-35% ஈரப்பதமும் பராமரிக்கவும்.`,
  },
  {
    keywords: ['fertilizer', 'urea', 'dap', 'npk', 'potash', 'manure', 'compost', 'உரம்', 'யூரியா', 'டிஏபி', 'பொட்டாஷ்', 'சாணம்'],
    title: 'Nutrient & Fertilizer Management',
    titleTa: 'ஊட்டச்சத்து & சமச்சீர் உர மேலாண்மை',
    replyEn: `Balanced plant nutrition prevents lodging and disease susceptibility:
- **Basal Dose:** Apply full Phosphorus (DAP) and 50% Potash (MOP) during field preparation or transplanting.
- **Nitrogen Management:** Split Urea into 2 or 3 doses (vegetative and pre-flowering) to avoid excessive foliage and pest attacks.
- **Organic Boost:** Apply 1-2 tonnes of vermicompost per acre before sowing.`,
    replyTa: `சமச்சீர் உர நிர்வாக ஆலோசனைகள்:
- **அடி உரம்:** நடவு செய்யும் போது முழு அளவு டிஏபி (DAP) மற்றும் 50% பொட்டாஷ் (MOP) இடவும்.
- **தழைச்சத்து (யூரியா):** யூரியாவை ஒரே முறையில் இடாமல் 2 அல்லது 3 தவணைகளாகப் பிரித்து இடவும். இதனால் பூச்சி தாக்குதல் குறையும்.
- **இயற்கை உரம்:** ஏக்கருக்கு 1 டன் மண்புழு உரம் அல்லது 5 டன் தொழுவுரம் இடுவது மண் வளத்தை பெருக்கும்.`,
  },
  {
    keywords: ['price', 'mandi', 'market', 'sell', 'rate', 'msp', 'profit', 'விலை', 'சந்தை', 'மண்டி', 'லாபம்', 'விற்பனை'],
    title: 'Market Trends & Selling Advice',
    titleTa: 'சந்தை விலை நிலவரம் & லாபகர விற்பனை',
    replyEn: `Current wholesale mandi trends:
- Check our **Market Insights** tab for real-time rates at your nearest APMC mandi.
- Storing onion or potato for 3-4 weeks can yield a 10-15% price upside due to off-season supply dips.
- Grade your produce into Grade A and B before taking to market to command higher prices.`,
    replyTa: `விவசாய விளைபொருட்கள் சந்தை நிலவரம்:
- உங்கள் அருகில் உள்ள ஒழுங்குமுறை விற்பனைக் கூட (மண்டி) நேரடி விலைகளை நமது 'சந்தை விலை' பகுதியில் பார்க்கலாம்.
- தக்காளி, வெங்காயம் போன்ற பயிர்களைத் தரம் பிரித்து (Grade A) விற்பனை செய்தால் 15-20% கூடுதல் விலை கிடைக்கும்.
- அடுத்த மாதத்திற்கான சந்தை கணிப்பைப் பார்த்து அறுவடையைத் திட்டமிடுங்கள்.`,
  },
  {
    keywords: ['scheme', 'subsidy', 'pm kisan', 'kusum', 'insurance', 'loan', 'திட்டம்', 'மானியம்', 'காப்பீடு', 'பிஎம் கிசான்', 'சோலார்'],
    title: 'Government Agriculture Schemes',
    titleTa: 'மத்திய & மாநில அரசு வேளாண் மானியங்கள்',
    replyEn: `Key government agriculture schemes:
1. **PM-KISAN:** Direct income support of ₹6,000/year in 3 installments.
2. **PM-KUSUM:** 60% Central & State subsidy for solar agricultural pumps.
3. **PM Fasal Bima Yojana (PMFBY):** Comprehensive crop insurance with only 1.5% - 2% farmer premium.
4. **Soil Health Card:** Free testing of 12 soil parameters.`,
    replyTa: `முக்கிய அரசு மானியத் திட்டங்கள்:
1. **பிஎம்-கிசான் (PM-KISAN):** விவசாயிகளுக்கு ஆண்டுக்கு ₹6,000 நேரடி வங்கி வரவு.
2. **பிஎம்-குசும் (PM-KUSUM):** விவசாயிகளுக்கு 60% மானியத்தில் சோலார் பாசன பம்ப் அமைக்கும் திட்டம்.
3. **பயிர் காப்பீட்டுத் திட்டம் (PMFBY):** இயற்கை இடர்பாடுகளிலிருந்து பயிர்களைப் பாதுகாக்க மிகக் குறைந்த பிரிமியத்தில் முழு இழப்பீடு.
4. **மண் வள அட்டை:** 12 வகையான மண் சத்துக்களை இலவசமாகப் பரிசோதித்து உர பரிந்துரை வழங்கும் திட்டம்.`,
  },
];

// Call Google Gemini API
const callGeminiApi = async (message, language) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  const langPrompt =
    language === 'ta'
      ? 'Reply in clear, practical, and helpful Tamil (தமிழ்) for an Indian farmer.'
      : language === 'te'
      ? 'Reply in clear, practical, and helpful Telugu (తెలుగు) for an Indian farmer.'
      : language === 'hi'
      ? 'Reply in simple, helpful Hindi (हिंदी) for an Indian farmer.'
      : 'Reply in clear, actionable English for an Indian farmer.';

  const systemInstruction = `You are "SmartAgri AI", a senior agronomist and precision farming assistant.
You provide practical, scientific, and actionable farming advice on:
- Crop health, pests, fungicides, pesticides, organic remedies (Neem oil, Trichoderma).
- Soil nutrients (NPK, Urea, DAP, Potash dosages).
- Drip irrigation scheduling, field capacity, water conservation.
- Indian agricultural schemes (PM-KISAN, PM-KUSUM, PMFBY).
- APMC Mandi trends and profit maximization.
Format your answer with concise bullet points and bold highlights.
${langPrompt}`;

  const bodyData = {
    contents: [
      {
        parts: [
          {
            text: `${systemInstruction}\n\nFarmer Query: ${message}`,
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.4,
      maxOutputTokens: 1000,
    },
  };

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyData),
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    console.warn('Gemini API returned status:', response.status, errText);
    return null;
  }

  const data = await response.json();
  if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
    return data.candidates[0].content.parts[0].text;
  }
  return null;
};

export const chatWithAi = async (req, res) => {
  try {
    const { message = '', language = 'en' } = req.body;

    if (!message.trim()) {
      return res.status(400).json({ success: false, message: 'Message cannot be empty.' });
    }

    let replyText = '';
    let category = 'AI Agronomist';
    let source = 'local-engine';

    // 1. Try Gemini Live AI first if API Key is configured
    try {
      const geminiReply = await callGeminiApi(message, language);
      if (geminiReply) {
        replyText = geminiReply;
        category =
          language === 'ta'
            ? 'AI வேளாண் நிபுணர் (Gemini AI)'
            : language === 'te'
            ? 'AI వ్యవసాయ నిపుణుడు (Gemini AI)'
            : 'AI Agronomist (Gemini Powered)';
        source = 'gemini-ai';
      }
    } catch (geminiErr) {
      console.warn('Gemini API call failed, falling back to local agronomy database:', geminiErr.message);
    }

    // 2. If Gemini is not configured, busy (503), or offline, fallback to built-in knowledge base
    if (!replyText) {
      const cleanMsg = message.toLowerCase().trim();

      let matchedResponse = null;
      for (const intent of AGRONOMIST_INTENT_RESPONSES) {
        if (intent.keywords.some((kw) => cleanMsg.includes(kw.toLowerCase()))) {
          matchedResponse = intent;
          break;
        }
      }

      if (matchedResponse) {
        if (language === 'ta') {
          replyText = matchedResponse.replyTa;
          category = matchedResponse.titleTa;
        } else if (language === 'te') {
          replyText = matchedResponse.replyTa; // fallback to structured response
          category = matchedResponse.title;
        } else {
          replyText = matchedResponse.replyEn;
          category = matchedResponse.title;
        }
      } else {
        if (language === 'ta') {
          replyText = `SmartAgri AI ஆலோசகரிடம் கேட்டதற்கு நன்றி! 🌾
உங்கள் கேள்வி: "${message}"
உங்கள் நிலத்தின் மண் பரிசோதனை (NPK சத்துக்கள்) மற்றும் தற்போதைய பருவநிலைக்கு ஏற்ப பயிர் முறைகளைத் திட்டமிடுங்கள். ஏதேனும் பூச்சி அல்லது இலை நோய் இருந்தால், அதன் புகைப்படத்தை நமது 'இலை நோய் கண்டறிதல்' பகுதியில் பதிவேற்றி உடனடி மருந்து ஆலோசனையைப் பெறலாம்.`;
          category = 'வேளாண் ஆலோசனை';
        } else if (language === 'te') {
          replyText = `SmartAgri AI సలహాదారుని అడిగినందుకు ధన్యవాదాలు! 🌾
మీ ప్రశ్న: "${message}"
మీ పొలం నేల పరీక్ష (NPK పోషకాలు) మరియు ప్రస్తుత వాతావరణానికి అనుగుణంగా పంట ప్రణాళికను సిద్ధం చేయండి. ఏదైనా ఆకు తెగులు లేదా పురుగుల సమస్యా ఉంటే, దాన్ని మన 'ఆకు తెగులు గుర్తింపు' భాగంలో అప్‌లోడ్ చేసి తక్షణ నివారణ సலహా పొందవచ్చు.`;
          category = 'వ్యవసాయ సలహా';
        } else {
          replyText = `Thank you for consulting SmartAgri AI! 🌾
Regarding "${message}":
For best results in your field, always match your soil test report (NPK & pH) with the seasonal weather forecast. If you are experiencing pest activity, upload a leaf photo to our **Leaf Disease Detection** tab for an immediate diagnostic report.`;
        }
      }

      // Add courteous greetings
      if (language === 'ta') {
        replyText = `வணக்கம் உழவரே! 🙏\n\n` + replyText;
      } else if (language === 'te') {
        replyText = `నமస్కారం రైతు సోదరా! 🙏\n\n` + replyText;
      } else if (language === 'hi') {
        replyText = `नमस्ते किसान भाई! 🙏\n\n` + replyText;
      }
    }

    return res.json({
      success: true,
      timestamp: new Date().toISOString(),
      userQuery: message,
      category,
      source,
      reply: replyText,
      suggestedQuestions:
        language === 'ta'
          ? [
              'தக்காளி இலை கருகல் நோயை எவ்வாறு கட்டுப்படுத்துவது?',
              'சொட்டு நீர் பாசனத்திற்கு சிறந்த நேரம் எது?',
              'நெல் பயிருக்கு ஏக்கருக்கு எவ்வளவு DAP மற்றும் யூரியா தேவை?',
              'PM-KUSUM சோலார் பம்ப் மானியத்திற்கு எப்படி விண்ணப்பிப்பது?',
            ]
          : language === 'te'
          ? [
              'టమాటా ఆకు మచ్చ తెగులును ఎలా అదుపు చేయాలి?',
              'బిందు సేద్యం (డ్రిప్) చేయడానికీ సరైన సమయం ఏది?',
              'వరి పంటకు ఎకరాకు ఎంత DAP మరియు యూరియా కావాలి?',
              'PM-KUSUM సోలార్ పంప్ సబ్సిడీకి ఎలా దరఖాస్తు చేయాలి?',
            ]
          : [
              'How to identify tomato early blight?',
              'What is optimal drip irrigation timing?',
              'How much DAP & Urea per acre for wheat?',
              'How do I apply for PM-KUSUM solar subsidy?',
            ],
    });
  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({ success: false, message: 'AI Chatbot service temporarily unavailable.' });
  }
};
