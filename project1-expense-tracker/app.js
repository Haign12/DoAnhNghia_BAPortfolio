/* ============================================================
   PROJECT 1 – EXPENSE TRACKER | "PREMIUM ANALYTICS" Logic
   Enhanced: Toast, Tab Filters, Search, Scroll-Top, Interactions
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Render Sparkline Bars ──
  const sparkContainer = document.getElementById('sparkline1');
  if (sparkContainer && typeof sparklineData !== 'undefined') {
    sparklineData.forEach((val, i) => {
      const bar = document.createElement('div');
      bar.className = 'spark-bar';
      bar.style.height = '0%';
      if (i === sparklineData.length - 2) bar.classList.add('highlight');
      sparkContainer.appendChild(bar);
      // Animate bars on load
      requestAnimationFrame(() => {
        setTimeout(() => { bar.style.height = val + '%'; }, i * 60);
      });
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

  // ══════════════════════════════════════════════════════════════
  // ENHANCED UX FEATURES
  // ══════════════════════════════════════════════════════════════

  // ── Toast Notification System ──
  window.showToast = function(message, type = 'info', duration = 3000) {
    // Remove existing toast
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    
    const icons = {
      'info': '<i class="ph ph-info" style="color: #8E75C8;"></i>',
      'success': '<i class="ph ph-check-circle" style="color: #22c55e;"></i>',
      'warning': '<i class="ph ph-warning" style="color: #f59e0b;"></i>',
      'error': '<i class="ph ph-x-circle" style="color: #ef4444;"></i>'
    };
    
    toast.innerHTML = `
      <span class="toast-icon">${icons[type] || icons.info}</span>
      <span>${message}</span>
      <button class="toast-close" onclick="this.parentElement.classList.remove('show'); setTimeout(() => this.parentElement.remove(), 300);">✕</button>
    `;
    
    document.body.appendChild(toast);
    requestAnimationFrame(() => {
      setTimeout(() => toast.classList.add('show'), 10);
    });
    
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  };

  // ── Tab Filter System (Subscriptions page) ──
  const tabs = document.querySelectorAll('.tabs .tab');
  const subCards = document.querySelectorAll('.sub-grid .sub-card');
  
  if (tabs.length > 0 && subCards.length > 0) {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        const text = tab.textContent.trim().toLowerCase();
        
        subCards.forEach(card => {
          card.style.display = '';
          card.style.animation = 'none';
          card.offsetHeight; // force reflow
          card.style.animation = '';
        });
        
        if (text.includes('active')) {
          subCards.forEach(card => {
            if (card.classList.contains('ghost') || card.querySelector('.badge-ghost')) {
              card.style.display = 'none';
            }
          });
          showToast('Showing active subscriptions', 'info', 2000);
        } else if (text.includes('ghost')) {
          subCards.forEach(card => {
            if (!card.classList.contains('ghost') && !card.querySelector('.badge-ghost')) {
              card.style.display = 'none';
            }
          });
          showToast('Showing ghost subscriptions', 'warning', 2000);
        } else if (text.includes('cancel')) {
          subCards.forEach(card => {
            card.style.display = 'none';
          });
          showToast('No cancelled subscriptions', 'info', 2000);
        }
      });
    });
  }

  // ── Search Functionality ──
  const searchInputs = document.querySelectorAll('.filter-search input, .search-box input');
  searchInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      
      // Search in table rows
      const tableRows = document.querySelectorAll('.data-table tbody tr');
      tableRows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(query) ? '' : 'none';
      });
      
      // Search in subscription cards
      const cards = document.querySelectorAll('.sub-card');
      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(query) ? '' : 'none';
      });
    });
  });

  // ── Delete Buttons (with toast confirmation) ──
  document.querySelectorAll('.icon-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const row = btn.closest('tr') || btn.closest('.sub-card');
      if (row) {
        const name = row.querySelector('.sub-name, [style*="font-weight: 600"]');
        const displayName = name ? name.textContent.trim() : 'item';
        
        row.style.transition = 'all 0.3s ease';
        row.style.opacity = '0.5';
        row.style.transform = 'scale(0.98)';
        
        setTimeout(() => {
          row.style.opacity = '1';
          row.style.transform = '';
        }, 1500);
        
        showToast(`"${displayName}" would be deleted in production`, 'warning', 3000);
      }
    });
  });

  // ── Cancel Subscription Buttons ──
  document.querySelectorAll('.btn-link.text-red').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.sub-card');
      const name = card ? card.querySelector('.sub-name')?.textContent : '';
      showToast(`Cancel flow for "${name}" — prototype demo`, 'info', 3000);
    });
  });

  // ── Save/Submit Button Toasts ──
  document.querySelectorAll('.btn-primary').forEach(btn => {
    const text = btn.textContent.trim().toLowerCase();
    if (['save changes', 'save transaction', 'save subscription', 'add'].includes(text)) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('Changes saved successfully!', 'success', 2500);
      });
    }
    if (text.includes('export') || text.includes('download')) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('Report exported — prototype demo', 'success', 2500);
      });
    }
  });

  // ── Export/Download Buttons ──
  document.querySelectorAll('.btn-secondary, .chart-btn').forEach(btn => {
    const text = btn.textContent.trim().toLowerCase();
    if (text.includes('export') || text.includes('csv') || text.includes('download')) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('CSV exported — prototype demo', 'success', 2500);
      });
    }
    if (text.includes('import')) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('Import from CSV — prototype demo', 'info', 2500);
      });
    }
  });

  // ── Danger Button ──
  document.querySelectorAll('.btn-danger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Data cleared — prototype demo only', 'error', 3000);
    });
  });

  // ── Scroll to Top Button ──
  const scrollBtn = document.createElement('button');
  scrollBtn.className = 'scroll-top-btn';
  scrollBtn.innerHTML = '<i class="ph ph-arrow-up" style="font-size: 16px;"></i>';
  scrollBtn.title = 'Back to top';
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  document.body.appendChild(scrollBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });

  // ── Notification Bell Interaction ──
  document.querySelectorAll('.topbar-icon').forEach(icon => {
    icon.addEventListener('click', () => {
      const dot = icon.querySelector('.notif-dot');
      if (dot) {
        dot.style.display = 'none';
        showToast('3 notifications: 2 renewals upcoming, 1 ghost alert', 'info', 4000);
      }
    });
  });

  // ── KPI Card Counter Animation ──
  const kpiValues = document.querySelectorAll('.kpi-card-value');
  const observerOptions = { threshold: 0.5 };
  const kpiObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent.trim();
        // Only animate numeric values
        const match = text.match(/^\$?([\d,]+(?:\.\d+)?)/);
        if (match) {
          const target = parseFloat(match[1].replace(/,/g, ''));
          const prefix = text.startsWith('$') ? '$' : '';
          const hasDecimals = text.includes('.');
          const duration = 800;
          const startTime = performance.now();
          
          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            const current = target * eased;
            
            if (hasDecimals) {
              el.textContent = prefix + current.toFixed(2);
            } else {
              el.textContent = prefix + Math.round(current).toLocaleString();
            }
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              el.textContent = text; // restore exact original
            }
          };
          
          requestAnimationFrame(animate);
        }
        kpiObserver.unobserve(el);
      }
    });
  }, observerOptions);
  
  kpiValues.forEach(val => kpiObserver.observe(val));

  // ── Budget Page: Animate Progress Bars ──
  const budgetBars = document.querySelectorAll('.budget-progress-fill');
  if (budgetBars.length > 0) {
    const barObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const targetWidth = bar.dataset.width;
          setTimeout(() => {
            bar.style.width = targetWidth;
          }, 200);
          barObserver.unobserve(bar);
        }
      });
    }, { threshold: 0.3 });
    
    budgetBars.forEach(bar => barObserver.observe(bar));
  }

});
