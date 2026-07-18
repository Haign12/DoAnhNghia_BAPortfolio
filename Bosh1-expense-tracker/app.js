/* ============================================================
   PROJECT 1 – EXPENSE TRACKER | Neon Fintech App Logic
   ============================================================ */

// --- Mobile Sidebar Toggle ----------------------------------
const sidebar = document.getElementById('sidebar');
const mobileNavToggle = document.getElementById('mobileNavToggle');
const sidebarOverlay = document.getElementById('sidebarOverlay');

mobileNavToggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  sidebarOverlay.classList.toggle('active');
});

sidebarOverlay.addEventListener('click', () => {
  sidebar.classList.remove('open');
  sidebarOverlay.classList.remove('active');
});

// --- Toast Notification System (Neon styled) ----------------
const toastContainer = document.getElementById('toastContainer');

function showToast(message, icon = '⚡') {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;
  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('toast-out');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// --- Animated KPI Counters ----------------------------------
function animateCounters() {
  const counters = document.querySelectorAll('.kpi-value[data-count]');
  counters.forEach(counter => {
    const target = parseFloat(counter.dataset.count);
    const isDecimal = target % 1 !== 0;
    const prefix = counter.textContent.includes('$') ? '$' : (counter.dataset.prefix || '');
    const duration = 1200;
    const start = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      counter.textContent = isDecimal
        ? prefix + current.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        : prefix + Math.round(current);

      if (progress < 1) requestAnimationFrame(update);
      else counter.textContent = isDecimal
        ? prefix + target.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        : prefix + target;
    }
    requestAnimationFrame(update);
  });
}

setTimeout(animateCounters, 400);

// --- Render Subscription Table ------------------------------
const tbody = document.getElementById('subscriptionTable');

subscriptions.forEach(sub => {
  const tr = document.createElement('tr');
  const statusClass = sub.status === 'Ghost' ? 'status-ghost' : 'status-active';
  const statusDot = sub.status === 'Ghost' ? '⚠' : '✓';

  tr.innerHTML = `
    <td>
      <div class="service-name">
        <div class="service-icon">${sub.icon}</div>
        <div class="service-info">
          <strong>${sub.service}</strong>
          <small>${sub.cycle}</small>
        </div>
      </div>
    </td>
    <td>${sub.category}</td>
    <td class="cost-cell">$${sub.cost.toFixed(2)}</td>
    <td class="last-used-cell">${sub.lastUsed}</td>
    <td><span class="status-badge ${statusClass}">${statusDot} ${sub.status}</span></td>
  `;

  tr.addEventListener('click', () => {
    if (sub.status === 'Ghost') {
      showToast(`"${sub.service}" is a ghost! Save $${sub.cost.toFixed(2)}/mo by cancelling.`, '👻');
    } else {
      showToast(`"${sub.service}" — $${sub.cost.toFixed(2)}/mo, last used ${sub.lastUsed}.`, '📋');
    }
  });

  tbody.appendChild(tr);
});

// --- Chart.js – Neon Fintech Palette ------------------------
Chart.defaults.color = '#475569';
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.font.weight = 500;

// Burn Rate Chart – Neon Cyan Gradient
const burnCtx = document.getElementById('burnRateChart').getContext('2d');

const barGradient = burnCtx.createLinearGradient(0, 0, 0, 270);
barGradient.addColorStop(0, '#06d6a0');
barGradient.addColorStop(0.6, 'rgba(6, 214, 160, 0.4)');
barGradient.addColorStop(1, 'rgba(123, 97, 255, 0.1)');

burnRateData.datasets[0].backgroundColor = barGradient;
burnRateData.datasets[0].hoverBackgroundColor = '#06d6a0';

new Chart(burnCtx, {
  type: 'bar',
  data: burnRateData,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 1200, easing: 'easeOutQuart' },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0d1324',
        titleColor: '#e2e8f0',
        bodyColor: '#7b8ba6',
        borderColor: 'rgba(6, 214, 160, 0.15)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
        titleFont: { weight: 700, size: 13 },
        callbacks: {
          label: (ctx) => 'Spent: $' + ctx.parsed.y.toLocaleString()
        }
      }
    },
    scales: {
      y: {
        grid: { color: 'rgba(99, 179, 237, 0.04)', drawBorder: false },
        border: { display: false },
        ticks: { padding: 8, font: { size: 11 } },
        beginAtZero: true
      },
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { padding: 8, font: { size: 11, weight: 600 } }
      }
    }
  }
});

// Utilization Chart – Neon Palette
const utilCtx = document.getElementById('utilizationChart').getContext('2d');

utilData.datasets[0].backgroundColor = ['#06d6a0', '#ffbe0b', '#ff006e'];

new Chart(utilCtx, {
  type: 'doughnut',
  data: utilData,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '72%',
    animation: { animateRotate: true, duration: 1400, easing: 'easeOutQuart' },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 16,
          usePointStyle: true,
          pointStyle: 'circle',
          font: { size: 11, weight: 500 },
          color: '#7b8ba6'
        }
      },
      tooltip: {
        backgroundColor: '#0d1324',
        titleColor: '#e2e8f0',
        bodyColor: '#7b8ba6',
        borderColor: 'rgba(6, 214, 160, 0.15)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (ctx) => ctx.label + ': ' + ctx.parsed + '%'
        }
      }
    }
  }
});
