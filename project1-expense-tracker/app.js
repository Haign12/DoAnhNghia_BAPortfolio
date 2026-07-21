/* ============================================================
   PROJECT 1 – EXPENSE TRACKER | "PREMIUM ANALYTICS" Logic
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Render Sparkline Bars ──
  const sparkContainer = document.getElementById('sparkline1');
  if (sparkContainer && typeof sparklineData !== 'undefined') {
    sparklineData.forEach((val, i) => {
      const bar = document.createElement('div');
      bar.className = 'spark-bar';
      bar.style.height = val + '%';
      if (i === sparklineData.length - 2) bar.classList.add('highlight');
      sparkContainer.appendChild(bar);
    });
  }

  // ── Chart.js Defaults ──
  Chart.defaults.color = '#9ca3af';
  Chart.defaults.font.family = "'Inter', sans-serif";
  Chart.defaults.font.size = 11;

  // ── Expense Overview Line Chart (Purple Gradient) ──
  const expenseCtx = document.getElementById('expenseChart');
  if (expenseCtx) {
    const ctx = expenseCtx.getContext('2d');

    // Purple gradient fill
    const gradient = ctx.createLinearGradient(0, 0, 0, 280);
    gradient.addColorStop(0, 'rgba(81, 31, 82, 0.25)');
    gradient.addColorStop(1, 'rgba(81, 31, 82, 0.0)');

    // Secondary line (subtle)
    const gradient2 = ctx.createLinearGradient(0, 0, 0, 280);
    gradient2.addColorStop(0, 'rgba(169, 135, 168, 0.1)');
    gradient2.addColorStop(1, 'rgba(169, 135, 168, 0.0)');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: burnRateData.labels,
        datasets: [
          {
            label: 'Expenses ($)',
            data: burnRateData.datasets[0].data,
            borderColor: '#8E75C8',
            borderWidth: 3,
            backgroundColor: gradient,
            fill: true,
            pointBackgroundColor: '#ffffff',
            pointBorderColor: '#8E75C8',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
            tension: 0.4
          },
          {
            label: 'Last Year ($)',
            data: [950, 1000, 1080, 1050, 1100, 1060],
            borderColor: 'rgba(105, 59, 105, 0.4)',
            borderWidth: 1.5,
            backgroundColor: gradient2,
            fill: true,
            pointRadius: 0,
            tension: 0.4,
            borderDash: [5, 5]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1F2937',
            titleColor: '#fff',
            bodyColor: 'rgba(255,255,255,0.7)',
            borderColor: 'rgba(142, 117, 200, 0.3)',
            borderWidth: 1,
            padding: 14,
            cornerRadius: 12,
            displayColors: true,
            usePointStyle: true,
            callbacks: {
              label: (ctx) => ctx.dataset.label + ': $' + ctx.parsed.y.toLocaleString()
            }
          }
        },
        scales: {
          y: {
            grid: { 
              color: 'rgba(0,0,0,0.04)',
              drawBorder: false
            },
            border: { display: false },
            ticks: {
              padding: 12,
              callback: (value) => '$' + value,
              maxTicksLimit: 5
            },
            beginAtZero: false
          },
          x: {
            grid: { display: false },
            border: { display: false },
            ticks: { padding: 12 }
          }
        }
      }
    });
  }

  // ── Radar Chart (Spending by Category) ──
  const radarCtx = document.getElementById('radarChart');
  if (radarCtx && typeof categoryData !== 'undefined') {
    new Chart(radarCtx, {
      type: 'radar',
      data: categoryData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1F2937',
            titleColor: '#fff',
            bodyColor: 'rgba(255,255,255,0.7)',
            padding: 12,
            cornerRadius: 10,
            callbacks: {
              label: (ctx) => '$' + ctx.parsed.r.toFixed(2)
            }
          }
        },
        scales: {
          r: {
            grid: { color: 'rgba(0,0,0,0.06)' },
            angleLines: { color: 'rgba(0,0,0,0.06)' },
            ticks: { display: false },
            pointLabels: {
              font: { size: 10, weight: '500' },
              color: '#6b7280'
            },
            beginAtZero: true
          }
        }
      }
    });
  }

});
