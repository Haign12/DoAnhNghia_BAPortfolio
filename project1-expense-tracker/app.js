/* ============================================================
   PROJECT 1 – EXPENSE TRACKER | "FINTECH PREMIUM" Logic
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Render Subscription Table ------------------------------
  const tbody = document.getElementById('subscriptionTable');
  
  if (tbody) {
    subscriptions.forEach(sub => {
      const tr = document.createElement('tr');
      const isGhost = sub.status === 'Ghost';
      const badgeClass = isGhost ? 'badge ghost' : 'badge active';
      const statusText = isGhost ? 'Ghost' : 'Active';
  
      tr.innerHTML = `
        <td>
          <div style="font-weight: 500; display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 1.2rem;">${sub.icon}</span> 
            ${sub.service}
          </div>
        </td>
        <td>${sub.category}</td>
        <td>
           <div class="progress-bar-container">
             <div class="progress-bar-fill" style="width: ${Math.random() * 60 + 20}%"></div>
           </div>
           <span style="font-size: 0.75rem; color: var(--text-muted); margin-left: 8px;">${sub.cycle}</span>
        </td>
        <td style="font-weight: 500;">$${sub.cost.toFixed(2)}</td>
        <td><span class="${badgeClass}">${statusText}</span></td>
      `;
      tbody.appendChild(tr);
    });
  }
  
  // --- Chart.js – Compound UI Line Chart ------------------------
  Chart.defaults.color = '#9ca3af';
  Chart.defaults.font.family = "'Inter', sans-serif";
  Chart.defaults.font.size = 11;
  
  const burnCtx = document.getElementById('burnRateChart');
  if (burnCtx) {
    const ctx = burnCtx.getContext('2d');
    
    // Create a subtle blue gradient for the line chart fill
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(147, 197, 253, 0.5)'); // pastel blue
    gradient.addColorStop(1, 'rgba(147, 197, 253, 0.0)');
  
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: burnRateData.labels,
        datasets: [{
          label: 'Burn Rate ($)',
          data: burnRateData.datasets[0].data,
          borderColor: '#3b82f6', // stronger blue for the line
          borderWidth: 2,
          backgroundColor: gradient,
          fill: true,
          pointBackgroundColor: '#ffffff',
          pointBorderColor: '#3b82f6',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          tension: 0.3 // smooth curve
        }]
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
            backgroundColor: '#ffffff',
            titleColor: '#111827',
            bodyColor: '#6b7280',
            borderColor: '#eaeaea',
            borderWidth: 1,
            padding: 12,
            cornerRadius: 8,
            displayColors: false,
            callbacks: {
              label: (ctx) => 'Spent: $' + ctx.parsed.y.toLocaleString()
            }
          }
        },
        scales: {
          y: {
            grid: { color: '#f3f4f6' },
            border: { display: false },
            ticks: { 
              padding: 12,
              callback: function(value) { return '$' + value; }
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
});
