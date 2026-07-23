/* ============================================================
   PROJECT 2 – CO-LIVING MANAGER | Enhanced UX Logic
   Toast, Filter Tabs, Search, Mobile Nav, Row Actions, Animations
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ══════════════════════════════════════════════════════════════
  // TOAST NOTIFICATION SYSTEM
  // ══════════════════════════════════════════════════════════════
  window.showToast = function(message, type = 'info', duration = 3000) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    const icons = { 'info': '💡', 'success': '✅', 'warning': '⚠️', 'error': '❌' };
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

  // ══════════════════════════════════════════════════════════════
  // FILTER TABS — Real filtering on reservation/rooms tables
  // ══════════════════════════════════════════════════════════════
  const filterTabs = document.querySelectorAll('.filter-tab');
  if (filterTabs.length > 0) {
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filterText = tab.textContent.trim().toLowerCase();
        const tableRows = document.querySelectorAll('.data-table tbody tr');
        const timelineRows = document.querySelectorAll('.timeline-row');

        // Filter table rows by status badge
        tableRows.forEach(row => {
          const badge = row.querySelector('.status-badge');
          if (!badge) return;
          const status = badge.textContent.trim().toLowerCase();

          if (filterText === 'all') {
            row.style.display = '';
          } else if (filterText.includes('completed')) {
            row.style.display = (status === 'paid' || status === 'completed') ? '' : 'none';
          } else {
            row.style.display = status.includes(filterText.replace(/\s+/g, '').replace('checkedin','checked in').replace('checkedout','checked out')) ? '' : 'none';
          }
        });

        showToast(`Filter: ${tab.textContent.trim()}`, 'info', 1500);
      });
    });
  }

  // ══════════════════════════════════════════════════════════════
  // NEW RESERVATION BUTTON — Toast demo
  // ══════════════════════════════════════════════════════════════
  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const text = btn.textContent.trim().toLowerCase();
      if (text.includes('reservation')) {
        showToast('New reservation form — prototype demo', 'info', 3000);
      } else if (text.includes('guest')) {
        showToast('Add guest form — prototype demo', 'info', 3000);
      } else {
        showToast('Action triggered — prototype demo', 'info', 2500);
      }
    });
  });

  // ══════════════════════════════════════════════════════════════
  // ROW ACTION MENU (3-dot buttons)
  // ══════════════════════════════════════════════════════════════
  document.querySelectorAll('.row-action-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      
      // Remove any existing menu
      document.querySelectorAll('.action-menu').forEach(m => m.remove());

      const menu = document.createElement('div');
      menu.className = 'action-menu';
      menu.innerHTML = `
        <button class="action-menu-item" data-action="view"><i class="ph ph-eye" style="font-size:14px;"></i> View Details</button>
        <button class="action-menu-item" data-action="edit"><i class="ph ph-pencil-simple" style="font-size:14px;"></i> Edit</button>
        <button class="action-menu-item" data-action="checkin"><i class="ph ph-sign-in" style="font-size:14px;"></i> Check In</button>
        <button class="action-menu-item" data-action="checkout"><i class="ph ph-sign-out" style="font-size:14px;"></i> Check Out</button>
        <div class="action-menu-divider"></div>
        <button class="action-menu-item danger" data-action="cancel"><i class="ph ph-x-circle" style="font-size:14px;"></i> Cancel</button>
      `;

      btn.style.position = 'relative';
      btn.appendChild(menu);

      // Position the menu
      requestAnimationFrame(() => menu.classList.add('show'));

      // Handle menu item clicks
      menu.querySelectorAll('.action-menu-item').forEach(item => {
        item.addEventListener('click', (ev) => {
          ev.stopPropagation();
          const action = item.dataset.action;
          const row = btn.closest('tr');
          const name = row ? (row.querySelector('.tenant-cell')?.textContent.trim() || 'Guest') : 'Guest';

          const messages = {
            'view': `Viewing details for ${name}`,
            'edit': `Editing booking for ${name}`,
            'checkin': `${name} checked in successfully!`,
            'checkout': `${name} checked out successfully!`,
            'cancel': `Booking for ${name} cancelled`
          };
          const types = {
            'view': 'info', 'edit': 'info', 'checkin': 'success',
            'checkout': 'success', 'cancel': 'warning'
          };

          showToast(messages[action] || 'Action performed', types[action] || 'info', 3000);
          menu.remove();
        });
      });

      // Close menu on outside click
      const closeMenu = (ev) => {
        if (!menu.contains(ev.target)) {
          menu.remove();
          document.removeEventListener('click', closeMenu);
        }
      };
      setTimeout(() => document.addEventListener('click', closeMenu), 10);
    });
  });

  // ══════════════════════════════════════════════════════════════
  // TABLE ROW CLICK — View detail toast
  // ══════════════════════════════════════════════════════════════
  document.querySelectorAll('.data-table tbody tr').forEach(row => {
    row.style.cursor = 'pointer';
    row.addEventListener('click', () => {
      const bookingId = row.querySelector('td:first-child, td:nth-child(2)')?.textContent.trim();
      const name = row.querySelector('.tenant-cell')?.textContent.trim();
      if (name) {
        showToast(`Booking ${bookingId || ''}: ${name} — click ⋮ for actions`, 'info', 3000);
      }
    });
  });

  // ══════════════════════════════════════════════════════════════
  // CHECKBOX "Select All" LOGIC
  // ══════════════════════════════════════════════════════════════
  const selectAllCheckbox = document.querySelector('thead .custom-checkbox input');
  const rowCheckboxes = document.querySelectorAll('tbody .custom-checkbox input');

  if (selectAllCheckbox && rowCheckboxes.length > 0) {
    selectAllCheckbox.addEventListener('change', () => {
      rowCheckboxes.forEach(cb => {
        cb.checked = selectAllCheckbox.checked;
      });
      if (selectAllCheckbox.checked) {
        showToast(`${rowCheckboxes.length} rows selected`, 'info', 1500);
      }
    });
  }

  // ══════════════════════════════════════════════════════════════
  // NAV ICON INTERACTIONS
  // ══════════════════════════════════════════════════════════════
  document.querySelectorAll('.nav-icon-btn').forEach((btn, i) => {
    btn.addEventListener('click', () => {
      const actions = ['Search — prototype demo', 'Messages — 2 unread', 'Notifications — 3 new'];
      showToast(actions[i] || 'Action triggered', 'info', 2500);
    });
  });

  // ══════════════════════════════════════════════════════════════
  // KPI COUNTER ANIMATION
  // ══════════════════════════════════════════════════════════════
  const kpiValues = document.querySelectorAll('.kpi-value');
  const observerOptions = { threshold: 0.5 };
  const kpiObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent.trim();
        const match = text.match(/^([\d,]+(?:\.\d+)?)/);
        if (match) {
          const target = parseFloat(match[1].replace(/,/g, ''));
          const suffix = text.replace(match[1], '');
          const duration = 800;
          const startTime = performance.now();

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = target * eased;

            el.textContent = Math.round(current).toLocaleString() + suffix;

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              el.textContent = text;
            }
          };
          requestAnimationFrame(animate);
        }
        kpiObserver.unobserve(el);
      }
    });
  }, observerOptions);

  kpiValues.forEach(val => kpiObserver.observe(val));

  // ══════════════════════════════════════════════════════════════
  // STAT VALUES ANIMATION  
  // ══════════════════════════════════════════════════════════════
  const statVals = document.querySelectorAll('.stat-item-val');
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent.trim();
        const match = text.match(/^(\d+)/);
        if (match) {
          const target = parseInt(match[1]);
          const suffix = text.replace(match[1], '');
          const duration = 600;
          const startTime = performance.now();

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(target * eased) + suffix;
            if (progress < 1) requestAnimationFrame(animate);
            else el.textContent = text;
          };
          requestAnimationFrame(animate);
        }
        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  statVals.forEach(v => statObserver.observe(v));

  // ══════════════════════════════════════════════════════════════
  // MOBILE HAMBURGER MENU
  // ══════════════════════════════════════════════════════════════
  const hamburger = document.querySelector('.mobile-hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
      hamburger.classList.toggle('open');
    });
  }

  // ══════════════════════════════════════════════════════════════
  // PAGINATION CLICK
  // ══════════════════════════════════════════════════════════════
  document.querySelectorAll('.page-controls button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.page-controls button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      showToast(`Page ${btn.textContent.trim()} — prototype demo`, 'info', 1500);
    });
  });

  // ══════════════════════════════════════════════════════════════
  // ACTION CARD (Check In) 
  // ══════════════════════════════════════════════════════════════
  const actionCard = document.querySelector('.action-card');
  if (actionCard) {
    actionCard.addEventListener('click', () => {
      showToast('Quick check-in flow — prototype demo', 'success', 3000);
    });
  }

  // ══════════════════════════════════════════════════════════════
  // TIMELINE BAR TOOLTIPS
  // ══════════════════════════════════════════════════════════════
  document.querySelectorAll('.timeline-bar').forEach(bar => {
    bar.addEventListener('click', () => {
      const name = bar.textContent.trim();
      showToast(`Booking: ${name} — click to view details`, 'info', 3000);
    });
  });

});
