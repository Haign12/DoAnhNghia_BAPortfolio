/* ============================================================
   PROJECT 1 ΓÇô FINTRACK | Main Logic & UI Rendering
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  renderApp();
});

function renderApp() {
  renderKPIs();
  renderSubscriptions();
  renderGhosts();
}

function renderKPIs() {
  const kpis = getKPIs();
  document.getElementById('kpiTotalCost').textContent = formatVND(kpis.monthlyFixedCost);
  document.getElementById('kpiActiveCount').textContent = kpis.activeSubs;
  document.getElementById('kpiUtilization').textContent = kpis.utilizationRate + '%';
  
  if (kpis.utilizationRate < 70) {
    document.getElementById('kpiUtilization').style.color = 'var(--red)';
  } else {
    document.getElementById('kpiUtilization').style.color = 'var(--teal)';
  }
}

function renderSubscriptions() {
  const container = document.getElementById('subscriptionList');
  const activeSubs = subscriptions.filter(s => s.status === 'active');
  
  if (activeSubs.length === 0) {
    container.innerHTML = '<div style="text-align:center; color: var(--text-secondary); padding: 20px;">No active subscriptions found.</div>';
    return;
  }

  container.innerHTML = activeSubs.map(sub => `
    <div class="sub-item">
      <div class="sub-info-left">
        <div class="sub-icon"><i class="ph ph-activity"></i></div>
        <div>
          <div class="sub-name">${sub.name}</div>
          <div class="sub-cycle">Billed ${sub.cycle}</div>
        </div>
      </div>
      <div>
        <div class="sub-price">${formatVND(sub.cost)}</div>
        <div class="sub-status"><span class="live-dot" style="width:6px;height:6px;display:inline-block;"></span> Active</div>
      </div>
    </div>
  `).join('');
}

function renderGhosts() {
  const container = document.getElementById('ghostList');
  const ghosts = detectGhosts();

  if (ghosts.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding: 40px 20px;">
        <i class="ph ph-check-circle" style="font-size: 48px; color: var(--teal); margin-bottom: 12px;"></i>
        <div style="font-weight: 600;">All clear!</div>
        <p style="font-size: 13px; color: var(--text-secondary); margin-top: 4px;">No ghost subscriptions detected.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = ghosts.map(g => `
    <div class="ghost-card">
      <div style="font-weight: 800; font-size: 16px;">${g.name}</div>
      <div class="ghost-alert-text">
        No transactions detected for <strong>${g.unusedDays} days</strong>.<br>
        Potential savings: <span class="ghost-savings">${formatVND(g.savingsPerYear)}/year</span>
      </div>
      <div class="ghost-actions">
        <button class="neumorphic-btn btn-danger" onclick="triggerCancel('${g.id}')">
          <i class="ph ph-x-circle"></i> Cancel
        </button>
        <button class="neumorphic-btn" onclick="triggerSnooze('${g.id}')">
          <i class="ph ph-clock"></i> Snooze
        </button>
      </div>
    </div>
  `).join('');
}

// Actions (US-02, US-03)
function triggerCancel(id) {
  cancelSubscription(id);
  renderApp();
  showToast('Subscription cancelled successfully. Wallet saved!', 'success');
}

function triggerSnooze(id) {
  snoozeGhost(id, 7); // Snooze for 7 days
  renderApp();
  showToast('Alert snoozed for 7 days (US-03)', 'info');
}

function showToast(msg, type = 'info') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 3000);
}
