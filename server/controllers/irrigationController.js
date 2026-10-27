// 100% Pure Node.js Smart Irrigation Recommendation Engine

export const calculateIrrigation = (req, res) => {
  try {
    const {
      soilMoisture = 28, // %
      soilType = 'Black Soil',
      cropType = 'Tomato',
      growthStage = 'Flowering',
      fieldAreaAcres = 4.5,
      weatherCondition = 'Partly Cloudy',
      temp = 28,
    } = req.body;

    const moisture = Number(soilMoisture);
    const area = Number(fieldAreaAcres);

    // Soil Field Capacity thresholds
    const soilCapacity = {
      'Sandy Soil': { wiltingPoint: 15, optimalMax: 35, retentionFactor: 0.6 },
      'Loamy Soil': { wiltingPoint: 22, optimalMax: 50, retentionFactor: 1.0 },
      'Clay Soil': { wiltingPoint: 28, optimalMax: 65, retentionFactor: 1.4 },
      'Black Soil': { wiltingPoint: 26, optimalMax: 60, retentionFactor: 1.3 },
      'Red Soil': { wiltingPoint: 20, optimalMax: 45, retentionFactor: 0.9 },
    };

    const soilProps = soilCapacity[soilType] || soilCapacity['Black Soil'];

    // Stage critical water multiplier
    const stageMultiplier = {
      Seedling: 0.7,
      Vegetative: 1.0,
      Flowering: 1.4, // Most critical stage
      Fruiting: 1.3,
      Maturity: 0.6,
    };

    const multiplier = stageMultiplier[growthStage] || 1.0;

    let pumpStatus = 'OFF';
    let urgency = 'Low';
    let recommendationText = '';
    let runTimeMinutes = 0;
    let waterLitersPerAcre = 0;

    if (moisture < soilProps.wiltingPoint) {
      pumpStatus = 'URGENT_ON';
      urgency = 'Critical';
      runTimeMinutes = Math.round(75 * multiplier);
      waterLitersPerAcre = Math.round(18000 * multiplier);
      recommendationText = `Soil moisture (${moisture}%) is below the permanent wilting point (${soilProps.wiltingPoint}%). Immediate deep irrigation required to avoid crop stress and flower drop.`;
    } else if (moisture < (soilProps.wiltingPoint + soilProps.optimalMax) / 2) {
      pumpStatus = 'RECOMMENDED_ON';
      urgency = 'Medium';
      runTimeMinutes = Math.round(45 * multiplier);
      waterLitersPerAcre = Math.round(11000 * multiplier);
      recommendationText = `Soil moisture is at moderate deficit. Initiate scheduled drip irrigation cycle to sustain root hydration.`;
    } else if (moisture > soilProps.optimalMax) {
      pumpStatus = 'OFF';
      urgency = 'Excess Moisture';
      runTimeMinutes = 0;
      waterLitersPerAcre = 0;
      recommendationText = `Soil moisture (${moisture}%) is abundant. Keep irrigation valves closed to prevent root rot and nutrient leaching.`;
    } else {
      pumpStatus = 'STANDBY_OFF';
      urgency = 'Optimal';
      runTimeMinutes = 0;
      waterLitersPerAcre = 0;
      recommendationText = `Soil moisture is in the optimal band (${moisture}%). Next irrigation review in 24 hours.`;
    }

    const totalWaterRequired = Math.round(waterLitersPerAcre * area);

    return res.json({
      success: true,
      timestamp: new Date().toISOString(),
      currentMetrics: {
        soilMoisture: moisture,
        soilType,
        cropType,
        growthStage,
        fieldAreaAcres: area,
        temp,
      },
      irrigationAction: {
        pumpStatus,
        urgency,
        recommendedRunTimeMinutes: runTimeMinutes,
        waterLitersPerAcre,
        totalWaterVolumeLiters: totalWaterRequired,
        bestTimeToIrrigate: 'Early Morning (06:00 - 08:30 AM) or Late Evening to minimize 35% evaporative loss',
        methodRecommended: 'Micro-Drip Fertigation with pressure compensating emitters',
        message: recommendationText,
      },
    });
  } catch (error) {
    console.error('Irrigation recommendation error:', error);
    res.status(500).json({ success: false, message: 'Failed to calculate irrigation schedule' });
  }
};
