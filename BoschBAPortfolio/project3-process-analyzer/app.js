// ============================================================
// Business Process Analyzer — App Logic
// ============================================================

Chart.defaults.color = '#8b8fa3';
Chart.defaults.borderColor = 'rgba(255,255,255,0.06)';
Chart.defaults.font.family = "'Inter', sans-serif";

let currentProcess = 'quality-inspection';
let charts = {};

document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupProcessSelector();
  setupMobileMenu();
  renderAll();
});

function setupNavigation() {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      const tab = item.dataset.tab;
      document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
      item.classList.add('active');
      document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
      document.getElementById(`tab-${tab}`).classList.add('active');
      const titles = {
        comparison: ['As-Is vs To-Be Comparison', PROCESSES[currentProcess].name],
        metrics: ['Process Metrics', 'Cycle Time, Cost & Efficiency Analysis'],
        bottleneck: ['Bottleneck Analysis', 'Identify process inefficiencies'],
        recommendations: ['Improvement Recommendations', 'Actionable insights for optimization'],
      };
      document.getElementById('pageTitle').textContent = titles[tab][0];
      document.getElementById('pageSubtitle').textContent = titles[tab][1];
      document.querySelector('.sidebar').classList.remove('open');
    });
  });
}

function setupProcessSelector() {
  document.getElementById('processSelect').addEventListener('change', e => {
    currentProcess = e.target.value;
    renderAll();
  });
}

function setupMobileMenu() {
  document.getElementById('menuToggle').addEventListener('click', () => {
    document.querySelector('.sidebar').classList.toggle('open');
  });
}

function renderAll() {
  const process = PROCESSES[currentProcess];
  renderProcessFlow('asIsFlow', process.asIs.steps, false);
  renderProcessFlow('toBeFlow', process.toBe.steps, true);
  renderProcessSummaries(process);
  renderImprovementSummary(process);
  renderMetrics(process);
  renderCycleTimeChart(process);
  renderCostChart(process);
  renderBottlenecks(process);
  renderRecommendations(process);
}

// ============================================================
// Process Flow Renderer (BPMN-style)
// ============================================================
function renderProcessFlow(containerId, steps, isToBe) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  steps.forEach(step => {
    const el = document.createElement('div');
    let classes = 'flow-step';
    if (step.type === 'wait') classes += ' bottleneck';
    if (step.improvement) classes += ' improved';
    
    const icons = { start: '▶', end: '⏹', task: '⚙', decision: '◆', wait: '⏳' };
    const timeColor = step.time > 30 ? 'var(--accent-red)' : step.time > 10 ? 'var(--accent-yellow)' : 'var(--accent-green)';
    const errorColor = step.errorRate > 5 ? 'var(--accent-red)' : step.errorRate > 2 ? 'var(--accent-yellow)' : 'var(--accent-green)';

    el.className = classes;
    el.innerHTML = `
      <div class="step-icon ${step.type}">
        ${step.type === 'decision' ? `<span>${icons[step.type]}</span>` : icons[step.type]}
      </div>
      <div class="step-info">
        <div class="step-name">${step.name}</div>
        <div class="step-desc">${step.description}</div>
        ${step.improvement ? `<div class="step-improvement">✨ ${step.improvement}</div>` : ''}
      </div>
      <div class="step-metrics">
        <div class="step-metric">
          <span class="step-metric-value" style="color:${timeColor}">${step.time}m</span>
          <span class="step-metric-label">Thời gian</span>
        </div>
        <div class="step-metric">
          <span class="step-metric-value" style="color:var(--text-secondary)">$${step.cost}</span>
          <span class="step-metric-label">Chi phí</span>
        </div>
        ${step.errorRate > 0 ? `
        <div class="step-metric">
          <span class="step-metric-value" style="color:${errorColor}">${step.errorRate}%</span>
          <span class="step-metric-label">Lỗi</span>
        </div>` : ''}
      </div>
    `;
    
    el.addEventListener('click', () => {
      el.querySelector('.step-desc').style.webkitLineClamp = 
        el.querySelector('.step-desc').style.webkitLineClamp === 'unset' ? '2' : 'unset';
    });
    
    container.appendChild(el);
  });
}

function renderProcessSummaries(process) {
  const asIsStats = calculateStats(process.asIs.steps);
  const toBeStats = calculateStats(process.toBe.steps);

  document.getElementById('asIsSummary').innerHTML = `
    <div class="summary-item"><span class="summary-value" style="color:var(--accent-red)">${asIsStats.totalTime}m</span><span class="summary-label">Cycle Time</span></div>
    <div class="summary-item"><span class="summary-value" style="color:var(--accent-red)">$${asIsStats.totalCost}</span><span class="summary-label">Cost / Unit</span></div>
    <div class="summary-item"><span class="summary-value" style="color:var(--accent-red)">${asIsStats.steps}</span><span class="summary-label">Bước</span></div>
    <div class="summary-item"><span class="summary-value" style="color:var(--accent-red)">${asIsStats.avgError}%</span><span class="summary-label">Avg Error</span></div>
  `;

  document.getElementById('toBeSummary').innerHTML = `
    <div class="summary-item"><span class="summary-value" style="color:var(--accent-green)">${toBeStats.totalTime}m</span><span class="summary-label">Cycle Time</span></div>
    <div class="summary-item"><span class="summary-value" style="color:var(--accent-green)">$${toBeStats.totalCost}</span><span class="summary-label">Cost / Unit</span></div>
    <div class="summary-item"><span class="summary-value" style="color:var(--accent-green)">${toBeStats.steps}</span><span class="summary-label">Bước</span></div>
    <div class="summary-item"><span class="summary-value" style="color:var(--accent-green)">${toBeStats.avgError}%</span><span class="summary-label">Avg Error</span></div>
  `;
}

function renderImprovementSummary(process) {
  const asIs = calculateStats(process.asIs.steps);
  const toBe = calculateStats(process.toBe.steps);

  const timeSaving = Math.round(((asIs.totalTime - toBe.totalTime) / asIs.totalTime) * 100);
  const costSaving = Math.round(((asIs.totalCost - toBe.totalCost) / asIs.totalCost) * 100);
  const errorReduction = asIs.avgError > 0 ? Math.round(((asIs.avgError - toBe.avgError) / asIs.avgError) * 100) : 0;
  const stepReduction = asIs.steps - toBe.steps;

  document.getElementById('improvementSummary').innerHTML = `
    <h3>📈 Tóm tắt Cải tiến</h3>
    <div class="improvement-grid">
      <div class="improvement-item">
        <span class="imp-value">-${timeSaving}%</span>
        <span class="imp-label">Giảm Cycle Time</span>
      </div>
      <div class="improvement-item">
        <span class="imp-value">-${costSaving}%</span>
        <span class="imp-label">Giảm Chi phí</span>
      </div>
      <div class="improvement-item">
        <span class="imp-value">-${errorReduction}%</span>
        <span class="imp-label">Giảm Tỉ lệ Lỗi</span>
      </div>
      <div class="improvement-item">
        <span class="imp-value">-${stepReduction}</span>
        <span class="imp-label">Giảm số Bước</span>
      </div>
    </div>
  `;
}

function calculateStats(steps) {
  const totalTime = steps.reduce((s, st) => s + st.time, 0);
  const totalCost = steps.reduce((s, st) => s + st.cost, 0);
  const stepsWithError = steps.filter(s => s.errorRate > 0);
  const avgError = stepsWithError.length > 0
    ? Math.round((stepsWithError.reduce((s, st) => s + st.errorRate, 0) / stepsWithError.length) * 10) / 10
    : 0;
  return { totalTime, totalCost, steps: steps.length, avgError };
}

// ============================================================
// Metrics Tab
// ============================================================
function renderMetrics(process) {
  const asIs = calculateStats(process.asIs.steps);
  const toBe = calculateStats(process.toBe.steps);
  
  document.getElementById('metricCycleAsIs').textContent = asIs.totalTime + 'm';
  document.getElementById('metricCycleToBe').textContent = toBe.totalTime + 'm';
  
  const costSaving = Math.round(((asIs.totalCost - toBe.totalCost) / asIs.totalCost) * 100);
  document.getElementById('metricCostSaving').textContent = costSaving + '%';
  
  const efficiency = Math.round(((asIs.totalTime - toBe.totalTime) / asIs.totalTime) * 100);
  document.getElementById('metricEfficiency').textContent = '+' + efficiency + '%';
}

function renderCycleTimeChart(process) {
  if (charts.cycleTime) charts.cycleTime.destroy();
  
  const maxLen = Math.max(process.asIs.steps.length, process.toBe.steps.length);
  const labels = [];
  for (let i = 0; i < maxLen; i++) labels.push(`Step ${i + 1}`);

  const ctx = document.getElementById('cycleTimeChart').getContext('2d');
  charts.cycleTime = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'As-Is (phút)',
          data: process.asIs.steps.map(s => s.time),
          backgroundColor: 'rgba(248,113,113,0.2)',
          borderColor: '#f87171',
          borderWidth: 1.5,
          borderRadius: 6,
        },
        {
          label: 'To-Be (phút)',
          data: process.toBe.steps.map(s => s.time),
          backgroundColor: 'rgba(52,211,153,0.2)',
          borderColor: '#34d399',
          borderWidth: 1.5,
          borderRadius: 6,
        },
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'top', labels: { usePointStyle: true, padding: 16 } } },
      scales: { y: { beginAtZero: true, title: { display: true, text: 'Phút' } } },
    }
  });
}

function renderCostChart(process) {
  if (charts.cost) charts.cost.destroy();
  
  const asIs = calculateStats(process.asIs.steps);
  const toBe = calculateStats(process.toBe.steps);

  const ctx = document.getElementById('costChart').getContext('2d');
  charts.cost = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['As-Is Cost', 'To-Be Cost', 'Savings'],
      datasets: [{
        data: [asIs.totalCost, toBe.totalCost, asIs.totalCost - toBe.totalCost],
        backgroundColor: ['rgba(248,113,113,0.3)', 'rgba(52,211,153,0.3)', 'rgba(96,165,250,0.3)'],
        borderColor: ['#f87171', '#34d399', '#60a5fa'],
        borderWidth: 2,
        hoverOffset: 8,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '60%',
      plugins: {
        legend: { position: 'bottom', labels: { usePointStyle: true, padding: 16 } },
        tooltip: { callbacks: { label: ctx => `${ctx.label}: $${ctx.parsed}` } },
      },
    }
  });
}

// ============================================================
// Bottleneck Analysis
// ============================================================
function renderBottlenecks(process) {
  const container = document.getElementById('bottleneckList');
  container.innerHTML = '';

  // Identify bottlenecks: steps with highest time, error, or wait type
  const steps = [...process.asIs.steps]
    .filter(s => s.time > 0 || s.errorRate > 0)
    .sort((a, b) => (b.time + b.errorRate * 10) - (a.time + a.errorRate * 10));

  steps.slice(0, 5).forEach((step, i) => {
    const severity = step.time >= 40 || step.errorRate >= 5 ? 'critical' : step.time >= 15 || step.errorRate >= 3 ? 'warning' : 'info';
    
    const el = document.createElement('div');
    el.className = 'bottleneck-item';
    el.innerHTML = `
      <div class="bottleneck-rank ${severity}">#${i + 1}</div>
      <div class="bottleneck-details">
        <h4>${step.name}</h4>
        <p>${step.description}</p>
        <div class="bottleneck-tags">
          <span class="bottleneck-tag" style="background:rgba(248,113,113,0.1);color:#f87171">⏱ ${step.time} phút</span>
          ${step.errorRate > 0 ? `<span class="bottleneck-tag" style="background:rgba(251,191,36,0.1);color:#fbbf24">⚠ ${step.errorRate}% lỗi</span>` : ''}
          <span class="bottleneck-tag" style="background:rgba(96,165,250,0.1);color:#60a5fa">💰 $${step.cost}</span>
          <span class="bottleneck-tag" style="background:rgba(167,139,250,0.1);color:#a78bfa">👤 ${step.role}</span>
        </div>
      </div>
    `;
    container.appendChild(el);
  });
}

// ============================================================
// Recommendations
// ============================================================
function renderRecommendations(process) {
  const container = document.getElementById('recommendationsList');
  container.innerHTML = '';

  process.recommendations.forEach(rec => {
    const el = document.createElement('div');
    el.className = 'recommendation-card';
    el.innerHTML = `
      <div class="rec-header">
        <h3>${rec.title}</h3>
        <div class="rec-badges">
          <span class="rec-badge ${rec.priority.toLowerCase()}">${rec.priority}</span>
          <span class="rec-badge medium">Impact: ${rec.impact}</span>
        </div>
      </div>
      <div class="rec-description">${rec.description}</div>
      <div class="rec-roi">💰 ${rec.roi}</div>
      <div class="rec-category">🏷️ Category: <strong>${rec.category}</strong></div>
    `;
    container.appendChild(el);
  });
}
