// 100% Pure Node.js Government Schemes & Subsidy Matcher

const GOVT_SCHEMES = [
  {
    id: 'pm-kisan',
    name: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    benefit: '₹6,000 per year in 3 direct bank transfers',
    eligibility: 'All landholding farmer families across India',
    category: 'Direct Income Support',
    portalUrl: 'https://pmkisan.gov.in',
    docsRequired: ['Aadhaar Card', 'Land Ownership Record (7/12 or Khasra)', 'Bank Passbook'],
  },
  {
    id: 'pm-kusum',
    name: 'PM-KUSUM Solar Agricultural Pump Scheme',
    benefit: '60% Central & State Subsidy + 30% Bank Loan (Farmer pays only 10%)',
    eligibility: 'Farmers with grid or diesel agricultural water pumps seeking solar conversion',
    category: 'Renewable Irrigation Subsidy',
    portalUrl: 'https://pmkusum.mnre.gov.in',
    docsRequired: ['Identity Proof', 'Land Ownership Certificate', 'Electricity Bill / Water Source Proof'],
  },
  {
    id: 'pmfby',
    name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    benefit: 'Comprehensive crop insurance against drought, floods, pests; farmer premium only 1.5% - 2%',
    eligibility: 'All farmers growing notified crops in notified areas',
    category: 'Crop Insurance & Risk Mitigation',
    portalUrl: 'https://pmfby.gov.in',
    docsRequired: ['Sowing Certificate', 'Land Revenue Record', 'Aadhaar Card', 'Bank Account Details'],
  },
  {
    id: 'soil-health-card',
    name: 'National Soil Health Card Scheme',
    benefit: 'Free periodic soil chemical testing (12 parameters) + customized fertilizer dosage chart',
    eligibility: 'All agricultural landowners',
    category: 'Soil Diagnostic Support',
    portalUrl: 'https://soilhealth.dac.gov.in',
    docsRequired: ['Farmer ID', 'Field Location Coordinate'],
  },
  {
    id: 'smam',
    name: 'Sub-Mission on Agricultural Mechanization (SMAM)',
    benefit: '40% to 50% subsidy on purchase of Tractors, Power Tillers, Rotavators & Drones',
    eligibility: 'Individual farmers, Self-Help Groups, Farmer Producer Organizations (FPOs)',
    category: 'Farm Machinery Subsidy',
    portalUrl: 'https://agrimachinery.nic.in',
    docsRequired: ['Aadhaar Card', 'Land Record', 'Bank Account', 'Caste Certificate if applicable'],
  },
];

export const getSchemes = (req, res) => {
  try {
    const { state = 'All', category = 'All' } = req.query;

    let filtered = GOVT_SCHEMES;
    if (category !== 'All') {
      filtered = filtered.filter((s) => s.category.toLowerCase().includes(category.toLowerCase()));
    }

    return res.json({
      success: true,
      totalSchemes: filtered.length,
      schemes: filtered,
    });
  } catch (error) {
    console.error('Schemes error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch government schemes.' });
  }
};
