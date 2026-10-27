// Agronomic Knowledge Base & Recommendation Algorithm
const CROP_DATABASE = [
  {
    name: 'Rice (Paddy)',
    category: 'Cereal / Kharif',
    nRange: [60, 100],
    pRange: [35, 60],
    kRange: [35, 50],
    tempRange: [22, 34],
    humidityRange: [75, 95],
    phRange: [5.5, 7.2],
    rainfallRange: [150, 300],
    soilTypes: ['Clayey', 'Clay Loam', 'Alluvial'],
    growthDuration: '110-140 days',
    expectedYield: '22-28 quintals/acre',
    waterRequirement: 'High (Puddle irrigation)',
    tips: 'Ensure proper water retention and split nitrogen application into 3 stages.',
  },
  {
    name: 'Wheat',
    category: 'Cereal / Rabi',
    nRange: [80, 120],
    pRange: [40, 60],
    kRange: [25, 45],
    tempRange: [12, 25],
    humidityRange: [45, 65],
    phRange: [6.0, 7.5],
    rainfallRange: [40, 100],
    soilTypes: ['Loamy', 'Clay Loam', 'Alluvial'],
    growthDuration: '120-135 days',
    expectedYield: '18-24 quintals/acre',
    waterRequirement: 'Moderate (Crown Root Initiation stage crucial)',
    tips: 'Apply first irrigation at CRI stage (21 days after sowing).',
  },
  {
    name: 'Cotton',
    category: 'Cash Crop / Kharif',
    nRange: [70, 120],
    pRange: [35, 60],
    kRange: [40, 70],
    tempRange: [22, 35],
    humidityRange: [50, 75],
    phRange: [6.0, 8.2],
    rainfallRange: [60, 110],
    soilTypes: ['Black Soil', 'Deep Loamy', 'Alluvial'],
    growthDuration: '150-180 days',
    expectedYield: '12-16 quintals/acre',
    waterRequirement: 'Moderate with good drainage',
    tips: 'Black soil retention is ideal. Avoid waterlogging during flowering.',
  },
  {
    name: 'Maize (Corn)',
    category: 'Cereal / All Seasons',
    nRange: [70, 110],
    pRange: [40, 60],
    kRange: [30, 50],
    tempRange: [18, 30],
    humidityRange: [55, 75],
    phRange: [5.8, 7.5],
    rainfallRange: [60, 120],
    soilTypes: ['Loamy', 'Sandy Loam', 'Red Soil'],
    growthDuration: '90-110 days',
    expectedYield: '25-32 quintals/acre',
    waterRequirement: 'Moderate',
    tips: 'Ensure high potassium during cob formation.',
  },
  {
    name: 'Tomato',
    category: 'Horticulture / Vegetable',
    nRange: [80, 130],
    pRange: [50, 80],
    kRange: [60, 100],
    tempRange: [18, 29],
    humidityRange: [50, 75],
    phRange: [6.0, 7.0],
    rainfallRange: [40, 80],
    soilTypes: ['Sandy Loam', 'Red Loam', 'Black Soil'],
    growthDuration: '90-120 days',
    expectedYield: '180-250 quintals/acre',
    waterRequirement: 'Controlled (Drip irrigation with fertigation)',
    tips: 'Stake plants early and prune suckers to prevent fungal blight.',
  },
  {
    name: 'Sugarcane',
    category: 'Cash Crop / Perennial',
    nRange: [100, 160],
    pRange: [50, 80],
    kRange: [50, 90],
    tempRange: [24, 38],
    humidityRange: [65, 85],
    phRange: [6.5, 8.0],
    rainfallRange: [120, 250],
    soilTypes: ['Deep Alluvial', 'Black Soil', 'Loamy'],
    growthDuration: '300-360 days',
    expectedYield: '350-450 quintals/acre',
    waterRequirement: 'High (regular furrow or subsurface drip)',
    tips: 'Requires heavy basal fertilizer and trash mulching for moisture retention.',
  },
  {
    name: 'Chickpea (Gram)',
    category: 'Pulses / Rabi',
    nRange: [20, 45],
    pRange: [40, 65],
    kRange: [25, 45],
    tempRange: [15, 26],
    humidityRange: [40, 60],
    phRange: [6.0, 7.8],
    rainfallRange: [30, 70],
    soilTypes: ['Sandy Loam', 'Clay Loam', 'Black Soil'],
    growthDuration: '95-110 days',
    expectedYield: '8-12 quintals/acre',
    waterRequirement: 'Low (Drought-tolerant leguminous crop)',
    tips: 'Fixes atmospheric nitrogen; requires minimal synthetic nitrogen.',
  },
  {
    name: 'Onion',
    category: 'Horticulture / Cash Vegetable',
    nRange: [60, 100],
    pRange: [40, 65],
    kRange: [50, 80],
    tempRange: [15, 30],
    humidityRange: [45, 70],
    phRange: [6.0, 7.5],
    rainfallRange: [40, 75],
    soilTypes: ['Sandy Loam', 'Clay Loam', 'Alluvial'],
    growthDuration: '100-130 days',
    expectedYield: '100-140 quintals/acre',
    waterRequirement: 'Frequent shallow irrigations',
    tips: 'Stop irrigation 10-15 days prior to harvest to improve storage shelf-life.',
  },
  {
    name: 'Groundnut (Peanut)',
    category: 'Oilseed / Kharif & Summer',
    nRange: [20, 45],
    pRange: [40, 60],
    kRange: [30, 50],
    tempRange: [22, 32],
    humidityRange: [50, 70],
    phRange: [5.8, 7.2],
    rainfallRange: [50, 90],
    soilTypes: ['Sandy Loam', 'Red Sandy', 'Well-drained'],
    growthDuration: '105-125 days',
    expectedYield: '10-14 quintals/acre',
    waterRequirement: 'Moderate; critical at pegging stage',
    tips: 'Apply gypsum at 200kg/acre during flowering for solid pod filling.',
  },
];

export const recommendCrop = (req, res) => {
  try {
    const {
      nitrogen = 80,
      phosphorus = 45,
      potassium = 40,
      temperature = 26,
      humidity = 65,
      ph = 6.8,
      rainfall = 90,
      soilType = 'Black Soil',
    } = req.body;

    const n = Number(nitrogen);
    const p = Number(phosphorus);
    const k = Number(potassium);
    const t = Number(temperature);
    const h = Number(humidity);
    const phVal = Number(ph);
    const rain = Number(rainfall);

    // Calculate match score for each crop
    const scoredCrops = CROP_DATABASE.map((crop) => {
      let score = 0;
      let reasons = [];

      // Nitrogen match
      if (n >= crop.nRange[0] && n <= crop.nRange[1]) {
        score += 20;
      } else {
        const diff = Math.min(Math.abs(n - crop.nRange[0]), Math.abs(n - crop.nRange[1]));
        score += Math.max(0, 20 - diff * 0.4);
      }

      // Phosphorus match
      if (p >= crop.pRange[0] && p <= crop.pRange[1]) {
        score += 15;
      } else {
        const diff = Math.min(Math.abs(p - crop.pRange[0]), Math.abs(p - crop.pRange[1]));
        score += Math.max(0, 15 - diff * 0.3);
      }

      // Potassium match
      if (k >= crop.kRange[0] && k <= crop.kRange[1]) {
        score += 15;
      } else {
        const diff = Math.min(Math.abs(k - crop.kRange[0]), Math.abs(k - crop.kRange[1]));
        score += Math.max(0, 15 - diff * 0.3);
      }

      // Temperature match
      if (t >= crop.tempRange[0] && t <= crop.tempRange[1]) {
        score += 18;
      } else {
        const diff = Math.min(Math.abs(t - crop.tempRange[0]), Math.abs(t - crop.tempRange[1]));
        score += Math.max(0, 18 - diff * 1.2);
      }

      // Humidity match
      if (h >= crop.humidityRange[0] && h <= crop.humidityRange[1]) {
        score += 12;
      } else {
        const diff = Math.min(Math.abs(h - crop.humidityRange[0]), Math.abs(h - crop.humidityRange[1]));
        score += Math.max(0, 12 - diff * 0.3);
      }

      // pH match
      if (phVal >= crop.phRange[0] && phVal <= crop.phRange[1]) {
        score += 10;
      } else {
        const diff = Math.min(Math.abs(phVal - crop.phRange[0]), Math.abs(phVal - crop.phRange[1]));
        score += Math.max(0, 10 - diff * 4);
      }

      // Soil Type preference boost
      if (soilType && crop.soilTypes.some((st) => st.toLowerCase().includes(soilType.toLowerCase()) || soilType.toLowerCase().includes(st.toLowerCase()))) {
        score += 10;
        reasons.push(`Optimal for your ${soilType}`);
      } else {
        score += 4;
      }

      const confidence = Math.min(99, Math.max(45, Math.round(score)));

      return {
        ...crop,
        confidence,
        matchHighlights: reasons.length ? reasons : ['Suitable NPK and agro-climatic profile'],
      };
    });

    // Sort descending by confidence
    scoredCrops.sort((a, b) => b.confidence - a.confidence);

    const primaryRecommendation = scoredCrops[0];
    const alternativeRecommendations = scoredCrops.slice(1, 3);

    return res.json({
      success: true,
      timestamp: new Date().toISOString(),
      inputParameters: { nitrogen: n, phosphorus: p, potassium: k, temperature: t, humidity: h, ph: phVal, rainfall: rain, soilType },
      primaryRecommendation,
      alternativeRecommendations,
    });
  } catch (error) {
    console.error('Crop recommendation error:', error);
    res.status(500).json({ success: false, message: 'Failed to generate crop recommendation.' });
  }
};
