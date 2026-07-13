// ============================================================
// Manufacturing KPI Dashboard — Main Application Logic
// ============================================================

// Global state
let allData = [];
let filteredData = [];
let charts = {};

// Chart.js global defaults
Chart.defaults.color = '#8b8fa3';
Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.06)';
Chart.defaults.font.family = "'Inter', sans-serif";

const CHART_COLORS = {
  blue: '#60a5fa',
  green: '#34d399',
  yellow: '#fbbf24',
  purple: '#a78bfa',
  red: '#f87171',
  cyan: '#22d3ee',
  blueAlpha: 'rgba(96, 165, 250, 0.15)',
  greenAlpha: 'rgba(52, 211, 153, 0.15)',
  yellowAlpha: 'rgba(251, 191, 36, 0.15)',
  purpleAlpha: 'rgba(167, 139, 250, 0.15)',
};

// ============================================================
// Initialization
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  allData = generateProductionData();
  filteredData = [...allData];

  populateFilters();
  setupNavigation();
  setupFilters();
  setupMobileMenu();
  renderAll();
});

function populateFilters() {
  const lineFilter = document.getElementById('lineFilter');
  PRODUCTION_LINES.forEach(line => {
    const opt = document.createElement('option');
    opt.value = line.id;
    opt.textContent = line.name;
    lineFilter.appendChild(opt);
  });
}

function setupFilters() {
  document.getElementById('lineFilter').addEventListener('change', applyFilters);
  document.getElementById('shiftFilter').addEventListener('change', applyFilters);
}

function applyFilters() {
  const lineId = document.getElementById('lineFilter').value;
  const shiftId = document.getElementById('shiftFilter').value;

  filteredData = allData.filter(d => {
    if (lineId !== 'all' && d.lineId !== lineId) return false;
    if (shiftId !== 'all' && d.shiftId !== shiftId) return false;
    return true;
  });

  renderAll();
}

// ============================================================
// Navigation
// ============================================================
function setupNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const section = item.dataset.section;

      // Update active nav
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');

      // Show section
      document.querySelectorAll('.dashboard-section').forEach(s => s.classList.remove('active'));
      document.getElementById(`section-${section}`).classList.add('active');

      // Update title
      const titles = {
        'overview': ['Production Overview', 'Automotive Component Lines — Last 30 Days'],
        'oee-analysis': ['OEE Analysis', 'Overall Equipment Effectiveness — Breakdown & Trends'],
        'defect-analysis': ['Defect Analysis', 'Defect Analysis — Pareto & Root Cause'],
        'downtime': ['Downtime Analysis', 'Equipment Downtime — Reasons & Impact'],
        'line-comparison': ['Line Comparison', 'Production Line Benchmarking'],
      };
      document.getElementById('pageTitle').textContent = titles[section][0];
      document.getElementById('pageSubtitle').textContent = titles[section][1];

      // Close mobile menu
      document.getElementById('sidebar').classList.remove('open');
    });
  });
}

function setupMobileMenu() {
  document.getElementById('menuToggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
  });
}

// ============================================================
// Render All
// ============================================================
function renderAll() {
  renderKPIs();
  renderOEETrendChart();
  renderOutputByLineChart();
  renderOEEByLineChart();
  renderOEEComponentsChart();
  renderDefectParetoChart();
  renderDefectByLineChart();
  renderDowntimeReasonsChart();
  renderDowntimeByLineChart();
  renderLineComparisonTable();
  renderRadarChart();
}

// ============================================================
// KPI Cards
// ============================================================
function renderKPIs() {
  const summary = calculateKPISummary(filteredData);

  animateValue('kpiOEE', summary.avgOEE, '%');
  animateValue('kpiAvailability', summary.avgAvailability, '%');
  animateValue('kpiPerformance', summary.avgPerformance, '%');
  animateValue('kpiQuality', summary.avgQuality, '%');

  document.getElementById('kpiTotalOutput').textContent = summary.totalOutput.toLocaleString();
  document.getElementById('kpiGoodOutput').textContent = summary.totalGoodOutput.toLocaleString();
  document.getElementById('kpiDefectRate').textContent = summary.defectRate + '%';
  document.getElementById('kpiTotalDowntime').textContent = Math.round(summary.totalDowntime / 60) + 'h';

  // Set trend indicators (mock comparison with target)
  setTrend('kpiOEETrend', summary.avgOEE, 85);
  setTrend('kpiAvailabilityTrend', summary.avgAvailability, 90);
  setTrend('kpiPerformanceTrend', summary.avgPerformance, 85);
  setTrend('kpiQualityTrend', summary.avgQuality, 95);
}

function animateValue(elementId, targetValue, suffix = '') {
  const el = document.getElementById(elementId);
  const startValue = parseFloat(el.textContent) || 0;
  const duration = 600;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const currentValue = startValue + (targetValue - startValue) * easeOut;
    el.textContent = currentValue.toFixed(1) + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  requestAnimationFrame(update);
}

function setTrend(elementId, value, target) {
  const el = document.getElementById(elementId);
  const diff = value - target;
  if (diff >= 0) {
    el.className = 'kpi-trend up';
    el.textContent = '▲ ' + Math.abs(diff).toFixed(1);
  } else {
    el.className = 'kpi-trend down';
    el.textContent = '▼ ' + Math.abs(diff).toFixed(1);
  }
}

// ============================================================
// Charts
// ============================================================
function destroyChart(key) {
  if (charts[key]) {
    charts[key].destroy();
    charts[key] = null;
  }
}

function renderOEETrendChart() {
  destroyChart('oeeTrend');
  const oeeByDate = calculateOEEByDate(filteredData);
  const ctx = document.getElementById('oeeTrendChart').getContext('2d');

  charts.oeeTrend = new Chart(ctx, {
    type: 'line',
    data: {
      labels: oeeByDate.map(d => d.date.substring(5)), // MM-DD
      datasets: [{
        label: 'OEE (%)',
        data: oeeByDate.map(d => d.oee),
        borderColor: CHART_COLORS.blue,
        backgroundColor: CHART_COLORS.blueAlpha,
        borderWidth: 2.5,
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: CHART_COLORS.blue,
      }, {
        label: 'Target (85%)',
        data: oeeByDate.map(() => 85),
        borderColor: CHART_COLORS.red,
        borderWidth: 1.5,
        borderDash: [6, 4],
        pointRadius: 0,
        fill: false,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top', labels: { usePointStyle: true, padding: 20 } },
      },
      scales: {
        y: { min: 50, max: 100, ticks: { callback: v => v + '%' } },
      },
      interaction: { intersect: false, mode: 'index' },
    }
  });
}

function renderOutputByLineChart() {
  destroyChart('outputByLine');
  const byLine = calculateKPIByLine(filteredData);
  const ctx = document.getElementById('outputByLineChart').getContext('2d');

  charts.outputByLine = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: byLine.map(l => l.lineName),
      datasets: [{
        data: byLine.map(l => l.totalOutput),
        backgroundColor: [CHART_COLORS.blue, CHART_COLORS.green, CHART_COLORS.yellow, CHART_COLORS.purple],
        borderWidth: 0,
        hoverOffset: 8,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '65%',
      plugins: {
        legend: { position: 'bottom', labels: { usePointStyle: true, padding: 16, font: { size: 12 } } },
      },
    }
  });
}

function renderOEEByLineChart() {
  destroyChart('oeeByLine');
  const oeeByLineByDate = calculateOEEByLineByDate(filteredData);
  const colors = [CHART_COLORS.blue, CHART_COLORS.green, CHART_COLORS.yellow, CHART_COLORS.purple];
  const ctx = document.getElementById('oeeByLineChart').getContext('2d');

  const datasets = PRODUCTION_LINES.map((line, i) => {
    const lineData = oeeByLineByDate[line.id] || [];
    return {
      label: line.name,
      data: lineData.map(d => d.oee),
      borderColor: colors[i],
      backgroundColor: 'transparent',
      borderWidth: 2,
      tension: 0.4,
      pointRadius: 2,
      pointHoverRadius: 5,
    };
  });

  const sampleDates = oeeByLineByDate[PRODUCTION_LINES[0].id]?.map(d => d.date.substring(5)) || [];

  charts.oeeByLine = new Chart(ctx, {
    type: 'line',
    data: { labels: sampleDates, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top', labels: { usePointStyle: true, padding: 16 } },
      },
      scales: {
        y: { min: 50, max: 100, ticks: { callback: v => v + '%' } },
      },
      interaction: { intersect: false, mode: 'index' },
    }
  });
}

function renderOEEComponentsChart() {
  destroyChart('oeeComponents');
  const byLine = calculateKPIByLine(filteredData);
  const ctx = document.getElementById('oeeComponentsChart').getContext('2d');

  charts.oeeComponents = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: byLine.map(l => l.lineName),
      datasets: [
        {
          label: 'Availability',
          data: byLine.map(l => l.avgAvailability),
          backgroundColor: CHART_COLORS.blueAlpha,
          borderColor: CHART_COLORS.blue,
          borderWidth: 1.5,
          borderRadius: 4,
        },
        {
          label: 'Performance',
          data: byLine.map(l => l.avgPerformance),
          backgroundColor: CHART_COLORS.yellowAlpha,
          borderColor: CHART_COLORS.yellow,
          borderWidth: 1.5,
          borderRadius: 4,
        },
        {
          label: 'Quality',
          data: byLine.map(l => l.avgQuality),
          backgroundColor: CHART_COLORS.greenAlpha,
          borderColor: CHART_COLORS.green,
          borderWidth: 1.5,
          borderRadius: 4,
        },
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top', labels: { usePointStyle: true, padding: 16 } },
      },
      scales: {
        y: { min: 70, max: 100, ticks: { callback: v => v + '%' } },
      },
    }
  });
}

function renderDefectParetoChart() {
  destroyChart('defectPareto');
  const defects = analyzeDefects(filteredData);
  const total = defects.reduce((s, d) => s + d.count, 0);
  let cumulative = 0;
  const cumulativeData = defects.map(d => {
    cumulative += d.count;
    return Math.round((cumulative / total) * 100);
  });

  const ctx = document.getElementById('defectParetoChart').getContext('2d');

  charts.defectPareto = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: defects.map(d => d.type),
      datasets: [
        {
          label: 'Defect Count',
          data: defects.map(d => d.count),
          backgroundColor: CHART_COLORS.blueAlpha,
          borderColor: CHART_COLORS.blue,
          borderWidth: 1.5,
          borderRadius: 6,
          yAxisID: 'y',
        },
        {
          label: 'Cumulative (%)',
          data: cumulativeData,
          type: 'line',
          borderColor: CHART_COLORS.red,
          borderWidth: 2,
          pointRadius: 4,
          pointBackgroundColor: CHART_COLORS.red,
          fill: false,
          yAxisID: 'y1',
        },
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top', labels: { usePointStyle: true, padding: 16 } },
      },
      scales: {
        y: { beginAtZero: true, position: 'left' },
        y1: { min: 0, max: 100, position: 'right', ticks: { callback: v => v + '%' }, grid: { display: false } },
      },
    }
  });
}

function renderDefectByLineChart() {
  destroyChart('defectByLine');
  const byLine = calculateKPIByLine(filteredData);
  const ctx = document.getElementById('defectByLineChart').getContext('2d');

  charts.defectByLine = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: byLine.map(l => l.lineName),
      datasets: [{
        label: 'Defect Rate (%)',
        data: byLine.map(l => l.defectRate),
        backgroundColor: [
          CHART_COLORS.blueAlpha, CHART_COLORS.greenAlpha,
          CHART_COLORS.yellowAlpha, CHART_COLORS.purpleAlpha
        ],
        borderColor: [
          CHART_COLORS.blue, CHART_COLORS.green,
          CHART_COLORS.yellow, CHART_COLORS.purple
        ],
        borderWidth: 1.5,
        borderRadius: 8,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: {
        legend: { display: false },
      },
      scales: {
        x: { ticks: { callback: v => v + '%' } },
      },
    }
  });
}

function renderDowntimeReasonsChart() {
  destroyChart('downtimeReasons');
  const reasons = analyzeDowntime(filteredData);
  const ctx = document.getElementById('downtimeReasonsChart').getContext('2d');

  const bgColors = [
    CHART_COLORS.blue, CHART_COLORS.green, CHART_COLORS.yellow,
    CHART_COLORS.purple, CHART_COLORS.red, CHART_COLORS.cyan
  ];

  charts.downtimeReasons = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: reasons.map(r => r.reason),
      datasets: [{
        label: 'Time (hours)',
        data: reasons.map(r => r.hours),
        backgroundColor: bgColors.map(c => c + '33'),
        borderColor: bgColors,
        borderWidth: 1.5,
        borderRadius: 8,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: { legend: { display: false } },
    }
  });
}

function renderDowntimeByLineChart() {
  destroyChart('downtimeByLine');
  const byLine = calculateKPIByLine(filteredData);
  const ctx = document.getElementById('downtimeByLineChart').getContext('2d');

  charts.downtimeByLine = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: byLine.map(l => l.lineName),
      datasets: [{
        data: byLine.map(l => Math.round(l.totalDowntime / 60)),
        backgroundColor: [CHART_COLORS.blue, CHART_COLORS.green, CHART_COLORS.yellow, CHART_COLORS.purple],
        borderWidth: 0,
        hoverOffset: 8,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '60%',
      plugins: {
        legend: { position: 'bottom', labels: { usePointStyle: true, padding: 16, font: { size: 12 } } },
        tooltip: { callbacks: { label: (ctx) => `${ctx.label}: ${ctx.parsed}h` } },
      },
    }
  });
}

// ============================================================
// Comparison Table
// ============================================================
function renderLineComparisonTable() {
  const byLine = calculateKPIByLine(filteredData);
  const tbody = document.querySelector('#lineComparisonTable tbody');
  tbody.innerHTML = '';

  byLine.forEach(line => {
    const status = getStatusBadge(line.avgOEE);
    const row = document.createElement('tr');
    row.innerHTML = `
      <td style="font-weight:600">${line.lineName}</td>
      <td style="color:var(--text-secondary)">${line.product}</td>
      <td style="font-weight:700;color:${getOEEColor(line.avgOEE)}">${line.avgOEE}%</td>
      <td>${line.avgAvailability}%</td>
      <td>${line.avgPerformance}%</td>
      <td>${line.avgQuality}%</td>
      <td>${line.totalOutput.toLocaleString()}</td>
      <td style="color:var(--accent-red)">${line.totalDefects.toLocaleString()}</td>
      <td>${line.defectRate}%</td>
      <td>${status}</td>
    `;
    tbody.appendChild(row);
  });
}

function getOEEColor(oee) {
  if (oee >= 85) return CHART_COLORS.green;
  if (oee >= 60) return CHART_COLORS.yellow;
  return CHART_COLORS.red;
}

function getStatusBadge(oee) {
  if (oee >= 85) return '<span class="status-badge excellent">🟢 Excellent</span>';
  if (oee >= 75) return '<span class="status-badge good">🔵 Good</span>';
  if (oee >= 60) return '<span class="status-badge warning">🟡 Average</span>';
  return '<span class="status-badge critical">🔴 Needs Improvement</span>';
}

// ============================================================
// Radar Chart
// ============================================================
function renderRadarChart() {
  destroyChart('radar');
  const byLine = calculateKPIByLine(filteredData);
  const colors = [CHART_COLORS.blue, CHART_COLORS.green, CHART_COLORS.yellow, CHART_COLORS.purple];
  const ctx = document.getElementById('radarChart').getContext('2d');

  const datasets = byLine.map((line, i) => ({
    label: line.lineName,
    data: [line.avgOEE, line.avgAvailability, line.avgPerformance, line.avgQuality, line.yieldRate],
    borderColor: colors[i],
    backgroundColor: colors[i] + '15',
    borderWidth: 2,
    pointBackgroundColor: colors[i],
    pointRadius: 4,
  }));

  charts.radar = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['OEE', 'Availability', 'Performance', 'Quality', 'Yield Rate'],
      datasets,
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { position: 'bottom', labels: { usePointStyle: true, padding: 16 } },
      },
      scales: {
        r: {
          min: 70,
          max: 100,
          ticks: { stepSize: 5, backdropColor: 'transparent' },
          grid: { color: 'rgba(255,255,255,0.06)' },
          angleLines: { color: 'rgba(255,255,255,0.06)' },
          pointLabels: { font: { size: 12 } },
        },
      },
    }
  });
}