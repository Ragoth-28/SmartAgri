// 100% Pure Node.js Fertilizer Recommendation & NPK Deficit Calculus

const CROP_NUTRIENT_REQUIREMENTS = {
  Tomato: { n: 120, p: 60, k: 80, name: 'Tomato' },
  Wheat: { n: 120, p: 60, k: 40, name: 'Wheat' },
  'Rice (Paddy)': { n: 100, p: 50, k: 50, name: 'Rice (Paddy)' },
  Cotton: { n: 120, p: 60, k: 60, name: 'Cotton' },
  'Maize (Corn)': { n: 120, p: 60, k: 40, name: 'Maize (Corn)' },
  Sugarcane: { n: 250, p: 100, k: 120, name: 'Sugarcane' },
  'Chickpea (Gram)': { n: 20, p: 40, k: 20, name: 'Chickpea' },
  Onion: { n: 100, p: 50, k: 60, name: 'Onion' },
};

export const recommendFertilizer = (req, res) => {
  try {
    const {
      cropName = 'Tomato',
      currentN = 80,
      currentP = 35,
      currentK = 30,
      landAreaAcres = 4.5,
    } = req.body;

    const target = CROP_NUTRIENT_REQUIREMENTS[cropName] || CROP_NUTRIENT_REQUIREMENTS['Tomato'];
    const area = Number(landAreaAcres);

    // Calculate deficits (kg/acre)
    const nDeficit = Math.max(0, target.n - Number(currentN));
    const pDeficit = Math.max(0, target.p - Number(currentP));
    const kDeficit = Math.max(0, target.k - Number(currentK));

    // Chemical fertilizer calculation:
    // DAP (18% N, 46% P2O5)
    // To meet pDeficit: DAP kg = pDeficit / 0.46
    const dapRequiredKgPerAcre = Math.round(pDeficit / 0.46);
    const nSuppliedByDap = Math.round(dapRequiredKgPerAcre * 0.18);

    // Remaining Nitrogen after DAP
    const remainingNDeficit = Math.max(0, nDeficit - nSuppliedByDap);
    // Urea (46% N): Urea kg = remainingNDeficit / 0.46
    const ureaRequiredKgPerAcre = Math.round(remainingNDeficit / 0.46);

    // MOP (Muriate of Potash - 60% K2O)
    // To meet kDeficit: MOP kg = kDeficit / 0.60
    const mopRequiredKgPerAcre = Math.round(kDeficit / 0.60);

    // 50kg bag conversions
    const dapBags = (dapRequiredKgPerAcre * area / 50).toFixed(1);
    const ureaBags = (ureaRequiredKgPerAcre * area / 50).toFixed(1);
    const mopBags = (mopRequiredKgPerAcre * area / 50).toFixed(1);

    // Organic Alternatives
    const vermicompostKg = Math.round(area * 800);
    const neemCakeKg = Math.round(area * 100);

    return res.json({
      success: true,
      timestamp: new Date().toISOString(),
      cropName: target.name,
      landAreaAcres: area,
      soilHealthStatus: {
        nitrogen: { current: currentN, target: target.n, deficit: nDeficit, status: nDeficit > 30 ? 'Low' : 'Adequate' },
        phosphorus: { current: currentP, target: target.p, deficit: pDeficit, status: pDeficit > 20 ? 'Low' : 'Adequate' },
        potassium: { current: currentK, target: target.k, deficit: kDeficit, status: kDeficit > 25 ? 'Low' : 'Adequate' },
      },
      chemicalRecommendations: {
        dap: {
          name: 'Di-Ammonium Phosphate (DAP 18-46-0)',
          perAcreKg: dapRequiredKgPerAcre,
          totalBags50kg: dapBags,
          applicationTime: '100% as Basal application at the time of sowing / transplanting',
        },
        urea: {
          name: 'Neem-Coated Urea (46% N)',
          perAcreKg: ureaRequiredKgPerAcre,
          totalBags50kg: ureaBags,
          applicationTime: 'Split into 2 top-dressings: 50% at 30 days and 50% at flowering stage',
        },
        mop: {
          name: 'Muriate of Potash (MOP 0-0-60)',
          perAcreKg: mopRequiredKgPerAcre,
          totalBags50kg: mopBags,
          applicationTime: '70% basal application + 30% during fruit/grain filling stage',
        },
      },
      organicAlternatives: {
        vermicompost: `${vermicompostKg} kg total (${Math.round(vermicompostKg / area)} kg/acre) enriched with Trichoderma`,
        neemCake: `${neemCakeKg} kg total (natural nitrification inhibitor and nematicide)`,
        biofertilizers: 'Azotobacter / PSB culture @ 2 kg/acre for biological nutrient mobilization',
      },
      applicationAdvice: 'Never apply urea on wet foliar canopy during hot afternoon sun to avoid leaf scorch. Irrigate lightly after chemical fertilizer application.',
    });
  } catch (error) {
    console.error('Fertilizer recommendation error:', error);
    res.status(500).json({ success: false, message: 'Failed to calculate fertilizer requirements' });
  }
};
