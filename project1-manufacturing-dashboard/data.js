// ============================================================
// Manufacturing KPI Dashboard - Simulated Production Data
// Simulated data for automotive component production lines
// ============================================================

const PRODUCTION_LINES = [
  { id: 'PL-01', name: 'ABS Sensor Line', product: 'ABS Sensor Module', capacity: 1200 },
  { id: 'PL-02', name: 'Engine ECU Line', product: 'Engine Control Unit', capacity: 800 },
  { id: 'PL-03', name: 'Brake System Line', product: 'Brake Booster Assembly', capacity: 600 },
  { id: 'PL-04', name: 'Pressure Sensor Line', product: 'Pressure Sensor', capacity: 1500 },
];

const SHIFTS = [
  { id: 'S1', name: 'Morning Shift', start: '06:00', end: '14:00' },
  { id: 'S2', name: 'Afternoon Shift', start: '14:00', end: '22:00' },
  { id: 'S3', name: 'Night Shift', start: '22:00', end: '06:00' },
];

const DEFECT_TYPES = [
  'Soldering Defect',
  'Component Defect',
  'Assembly Defect',
  'Inspection Defect',
  'Material Defect',
  'Calibration Defect',
];

const DOWNTIME_REASONS = [
  'Scheduled Maintenance',
  'Unexpected Breakdown',
  'Material Shortage',
  'Product Changeover',
  'PLC Software Fault',
  'Quality Inspection',
];

// Seeded random for consistent data
function seededRandom(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Generate production data for the last 30 days
function generateProductionData() {
  const data = [];
  const today = new Date();

  for (let dayOffset = 29; dayOffset >= 0; dayOffset--) {
    const date = new Date(today);
    date.setDate(date.getDate() - dayOffset);
    const dateStr = date.toISOString().split('T')[0];

    PRODUCTION_LINES.forEach((line, lineIdx) => {
      SHIFTS.forEach((shift, shiftIdx) => {
        const seed = dayOffset * 100 + lineIdx * 10 + shiftIdx;
        const rand = () => seededRandom(seed + data.length);

        // OEE components
        const availability = 0.80 + rand() * 0.18; // 80% - 98%
        const performance = 0.75 + rand() * 0.22;  // 75% - 97%
        const quality = 0.90 + rand() * 0.09;       // 90% - 99%

        const plannedTime = 480; // 8 hours = 480 minutes
        const actualRunTime = Math.round(plannedTime * availability);
        const downtimeMinutes = plannedTime - actualRunTime;

        const maxOutput = Math.round(line.capacity / 3); // Divided by 3 shifts
        const actualOutput = Math.round(maxOutput * performance);
        const goodOutput = Math.round(actualOutput * quality);
        const defectCount = actualOutput - goodOutput;

        // OEE = Availability × Performance × Quality
        const oee = availability * performance * quality;

        // Pick random downtime reason
        const downtimeReason = downtimeMinutes > 30
          ? DOWNTIME_REASONS[Math.floor(seededRandom(seed + 777) * DOWNTIME_REASONS.length)]
          : null;

        // Pick defect type
        const defectType = defectCount > 0
          ? DEFECT_TYPES[Math.floor(seededRandom(seed + 333) * DEFECT_TYPES.length)]
          : null;

        data.push({
          date: dateStr,
          lineId: line.id,
          lineName: line.name,
          product: line.product,
          shiftId: shift.id,
          shiftName: shift.name,
          plannedTime,
          actualRunTime,
          downtimeMinutes,
          downtimeReason,
          maxOutput,
          actualOutput,
          goodOutput,
          defectCount,
          defectType,
          availability: Math.round(availability * 10000) / 100,
          performance: Math.round(performance * 10000) / 100,
          quality: Math.round(quality * 10000) / 100,
          oee: Math.round(oee * 10000) / 100,
        });
      });
    });
  }

  return data;
}

// Calculate aggregate KPI summary
function calculateKPISummary(data) {
  const totalRecords = data.length;
  const avgOEE = data.reduce((s, d) => s + d.oee, 0) / totalRecords;
  const avgAvailability = data.reduce((s, d) => s + d.availability, 0) / totalRecords;
  const avgPerformance = data.reduce((s, d) => s + d.performance, 0) / totalRecords;
  const avgQuality = data.reduce((s, d) => s + d.quality, 0) / totalRecords;
  const totalOutput = data.reduce((s, d) => s + d.actualOutput, 0);
  const totalGoodOutput = data.reduce((s, d) => s + d.goodOutput, 0);
  const totalDefects = data.reduce((s, d) => s + d.defectCount, 0);
  const totalDowntime = data.reduce((s, d) => s + d.downtimeMinutes, 0);

  return {
    avgOEE: Math.round(avgOEE * 100) / 100,
    avgAvailability: Math.round(avgAvailability * 100) / 100,
    avgPerformance: Math.round(avgPerformance * 100) / 100,
    avgQuality: Math.round(avgQuality * 100) / 100,
    totalOutput,
    totalGoodOutput,
    totalDefects,
    totalDowntime,
    defectRate: Math.round((totalDefects / totalOutput) * 10000) / 100,
    yieldRate: Math.round((totalGoodOutput / totalOutput) * 10000) / 100,
  };
}

// Calculate KPI by production line
function calculateKPIByLine(data) {
  const byLine = {};
  data.forEach(d => {
    if (!byLine[d.lineId]) {
      byLine[d.lineId] = { lineName: d.lineName, product: d.product, records: [] };
    }
    byLine[d.lineId].records.push(d);
  });

  return Object.entries(byLine).map(([lineId, info]) => {
    const summary = calculateKPISummary(info.records);
    return { lineId, lineName: info.lineName, product: info.product, ...summary };
  });
}

// Calculate OEE by date (for trend chart)
function calculateOEEByDate(data) {
  const byDate = {};
  data.forEach(d => {
    if (!byDate[d.date]) byDate[d.date] = [];
    byDate[d.date].push(d);
  });

  return Object.entries(byDate).map(([date, records]) => {
    const avgOEE = records.reduce((s, r) => s + r.oee, 0) / records.length;
    return { date, oee: Math.round(avgOEE * 100) / 100 };
  }).sort((a, b) => a.date.localeCompare(b.date));
}

// Analyze downtime reasons
function analyzeDowntime(data) {
  const reasons = {};
  data.forEach(d => {
    if (d.downtimeReason) {
      if (!reasons[d.downtimeReason]) reasons[d.downtimeReason] = 0;
      reasons[d.downtimeReason] += d.downtimeMinutes;
    }
  });
  return Object.entries(reasons)
    .map(([reason, minutes]) => ({ reason, minutes, hours: Math.round(minutes / 60 * 10) / 10 }))
    .sort((a, b) => b.minutes - a.minutes);
}

// Analyze defects by type
function analyzeDefects(data) {
  const types = {};
  data.forEach(d => {
    if (d.defectType) {
      if (!types[d.defectType]) types[d.defectType] = 0;
      types[d.defectType] += d.defectCount;
    }
  });
  return Object.entries(types)
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count);
}

// Calculate OEE by line and date (for multi-line chart)
function calculateOEEByLineByDate(data) {
  const result = {};
  PRODUCTION_LINES.forEach(line => {
    const lineData = data.filter(d => d.lineId === line.id);
    result[line.id] = calculateOEEByDate(lineData);
  });
  return result;
}