// 100% Pure Node.js IoT Soil Sensor Telemetry Simulator & Smart Pump Switch

let virtualSensorNode = {
  nodeId: 'AGRI-NODE-01-NASHIK',
  status: 'Online',
  batteryLevel: 94, // %
  signalStrength: '98% (4G LTE-M)',
  soilMoisture: 32.4, // %
  soilTemperature: 23.8, // °C
  ambientTemperature: 28.5, // °C
  ambientHumidity: 64, // %
  nitrogen: 82, // kg/ha
  phosphorus: 38, // kg/ha
  potassium: 44, // kg/ha
  soilPh: 6.7,
  electricalConductivity: 1.2, // dS/m
  pumpActive: false,
  autoMode: true,
  lastSync: new Date().toISOString(),
};

export const getTelemetry = (req, res) => {
  // Simulate natural ambient fluctuations
  const jitter = (Math.random() - 0.5) * 0.4;
  virtualSensorNode.soilMoisture = Number(
    Math.max(10, Math.min(85, virtualSensorNode.soilMoisture + (virtualSensorNode.pumpActive ? 0.8 : -0.1) + jitter)).toFixed(1)
  );
  virtualSensorNode.soilTemperature = Number((23.5 + Math.random() * 1.2).toFixed(1));
  virtualSensorNode.lastSync = new Date().toISOString();

  // If autoMode is active and moisture drops below 25%, turn on pump
  if (virtualSensorNode.autoMode) {
    if (virtualSensorNode.soilMoisture < 25 && !virtualSensorNode.pumpActive) {
      virtualSensorNode.pumpActive = true;
    } else if (virtualSensorNode.soilMoisture > 55 && virtualSensorNode.pumpActive) {
      virtualSensorNode.pumpActive = false;
    }
  }

  return res.json({
    success: true,
    telemetry: virtualSensorNode,
  });
};

export const togglePump = (req, res) => {
  const { pumpActive, autoMode } = req.body;

  if (typeof pumpActive === 'boolean') {
    virtualSensorNode.pumpActive = pumpActive;
  }

  if (typeof autoMode === 'boolean') {
    virtualSensorNode.autoMode = autoMode;
  }

  virtualSensorNode.lastSync = new Date().toISOString();

  return res.json({
    success: true,
    message: `Water pump is now ${virtualSensorNode.pumpActive ? 'ACTIVATED (Water flowing)' : 'SHUT OFF (Idle)'}`,
    telemetry: virtualSensorNode,
  });
};
