/* ============================================================
   PROJECT 3 – OFFICE GROUP ORDER | MULTI-VIEW LOGIC
   ============================================================ */

let currentSession = null;
let participants = [];
let cart = [];
let previewParticipantName = 'GuestUser';

// Initialize defaults
document.addEventListener('DOMContentLoaded', () => {
  const now = new Date();
  const dateInput = document.getElementById('createCutoffDate');
  const timeInput = document.getElementById('createCutoffTime');
  
  if (dateInput) {
    dateInput.value = now.toISOString().split('T')[0];
  }
  if (timeInput) {
    now.setHours(now.getHours() + 1); // default cutoff +1 hour
    timeInput.value = now.toTimeString().substring(0, 5);
  }

  // Pre-populate recent orders (static mockup)
  renderHomeSessions();
});

function switchView(viewId) {
  document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
  const target = document.getElementById(viewId);
  if (target) target.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (viewId === 'view-create') {
    const now = new Date();
    const dateInput = document.getElementById('createCutoffDate');
    const timeInput = document.getElementById('createCutoffTime');
    if (dateInput) {
      const offset = now.getTimezoneOffset() * 60000;
      dateInput.value = (new Date(now.getTime() - offset)).toISOString().split('T')[0];
    }
    if (timeInput) {
      now.setHours(now.getHours() + 1);
      timeInput.value = now.toTimeString().substring(0, 5);
      // Trigger input event to update preview
      timeInput.dispatchEvent(new Event('input'));
    }
  }
}

function showToast(message, icon = '<i class="ph ph-info" style="color: var(--orange);"></i>') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

// Sync Live Preview & Bind Elements
document.addEventListener('DOMContentLoaded', () => {
  const shopInput = document.getElementById('createShopName');
  const cutoffInput = document.getElementById('createCutoffTime');
  if (shopInput) {
    shopInput.addEventListener('input', (e) => {
      const title = document.getElementById('previewTitle');
      if (title) title.innerText = e.target.value ? `Join order from ${e.target.value}` : 'Join order from ...';
    });
  }
  if (cutoffInput) {
    cutoffInput.addEventListener('input', (e) => {
      const cutoff = document.getElementById('previewCutoff');
      if (cutoff) {
        if (!e.target.value) {
          cutoff.innerText = 'Closes at --:--';
          return;
        }
        const [h, m] = e.target.value.split(':');
        const d = new Date();
        d.setHours(h, m);
        cutoff.innerText = `Closes at ${d.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit', hour12:true})}`;
      }
    });
  }

  // Bind History Card Clicks (Mock Navigation)
  document.querySelectorAll('.history-card:not([onclick])').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') return; // Don't trigger if clicking a button
      switchView('view-host-dashboard', 1);
    });
  });

  // Bind Filter Pills
  const pills = document.querySelectorAll('.task-group-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      pills.forEach(p => p.classList.remove('active'));
      e.target.classList.add('active');
      const filter = e.target.innerText.toLowerCase();
      const cards = document.querySelectorAll('.history-grid .history-card');
      cards.forEach(card => {
        const status = card.querySelector('.history-status').innerText.toLowerCase();
        if (filter === 'all' || status === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});

// --- GATE 1: CREATE ORDER ---
function handleCreateOrder() {
  const shopNameInput = document.getElementById('createShopName');
  const dateInput = document.getElementById('createCutoffDate');
  const timeInput = document.getElementById('createCutoffTime');
  const shopName = shopNameInput.value.trim();
  const dateStr = dateInput.value;
  const timeStr = timeInput.value;

  // Clear previous validation states
  shopNameInput.style.borderColor = '';
  dateInput.style.borderColor = '';
  timeInput.style.borderColor = '';

  if (!shopName || !dateStr || !timeStr) {
    showToast('Please fill all required fields.', '<i class="ph ph-warning-circle" style="color: var(--orange);"></i>');
    if (!shopName) shopNameInput.style.borderColor = 'var(--orange)';
    if (!dateStr) dateInput.style.borderColor = 'var(--orange)';
    if (!timeStr) timeInput.style.borderColor = 'var(--orange)';
    return;
  }

  const cutoffDateTime = new Date(`${dateStr}T${timeStr}:00`);
  const now = new Date();
  
  // Gate check: Cutoff must be at least 5 minutes in the future
  if (cutoffDateTime.getTime() <= now.getTime() + 5 * 60000) {
    showToast('Cut-off date & time must be at least 5 minutes from now.', '<i class="ph ph-x-circle" style="color: red;"></i>');
    timeInput.style.borderColor = 'var(--orange)';
    return;
  }

  // Generate Session Code
  const sessionCode = 'HC' + Math.floor(1000 + Math.random() * 9000);

  currentSession = {
    code: sessionCode,
    shopName: shopName,
    cutoff: cutoffDateTime,
    shippingFee: 15000,
    discount: -20000
  };

  // Mock initial participants for demonstration
  participants = [
    { name: 'Anh Nghĩa', item: 'Trà Sữa x1', amount: 40000, status: 'Paid', method: 'Momo' },
    { name: 'Minh Tuấn', item: 'Cà Phê Sữa x1', amount: 34000, status: 'Unpaid', method: 'Pending' },
    { name: 'Hương Giang', item: 'Matcha Latte x1', amount: 50000, status: 'Pending', method: 'Pending' },
    { name: 'Thu Trang', item: '-', amount: 0, status: 'Waiting', method: '-' }
  ];

  updateHostDashboard();
  renderHomeSessions();
  switchView('view-host-dashboard');
}

function updateHostDashboard() {
  if (!currentSession) return;

  document.getElementById('hostDashShopName').innerText = currentSession.shopName;
  document.getElementById('hostDashSessionCode').innerText = currentSession.code;
  const formattedDate = currentSession.cutoff.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
  const formattedTime = currentSession.cutoff.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  document.getElementById('hostDashCutoff').innerText = `${formattedDate}, ${formattedTime}`;
  document.getElementById('hostDashInviteLink').value = `https://orderflow.app/join/${currentSession.code}`;

  renderParticipants();
  checkHostGates();
}

function renderParticipants() {
  const tbody = document.getElementById('participantTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';
  
  let totalParticipants = 0;
  let paidCount = 0;
  let subtotal = 0;

  participants.forEach((p) => {
    // Ignore canceled
    if (p.status === 'Canceled') return;

    totalParticipants++;
    const tr = document.createElement('tr');
    
    let statusHtml = '';
    let actionHtml = '-';
    
    if (p.status === 'Paid') {
      statusHtml = `<span class="badge success">Paid (${p.method})</span>`;
      paidCount++;
      subtotal += p.amount;
    } else if (p.status === 'Pending') {
      statusHtml = `<span class="badge" style="background: var(--orange); color: white;" title="Paid, waiting for manual verification">Pending Verify</span>`;
      actionHtml = `<button class="btn-primary" style="padding: 2px 8px; font-size: 11px;" onclick="confirmPayment('${p.name}')">Verify</button>`;
      subtotal += p.amount;
    } else if (p.status === 'Unpaid') {
      statusHtml = `<span class="badge warning" title="User has not transferred money yet">Unpaid</span>`;
      actionHtml = `<span class="action-link" onclick="remindUser('${p.name}')">Remind</span>`;
      subtotal += p.amount;
    } else {
      statusHtml = `<span class="badge" style="background: var(--border-light); color: var(--text-secondary);">Waiting</span>`;
    }

    tr.innerHTML = `
      <td style="font-weight: 600;">${p.name}</td>
      <td style="color: var(--text-secondary); line-height: 1.4;">${p.item}
        ${p.amount > 0 ? '<span style="display:block; font-size:11px; color:var(--orange); margin-top:2px;">Includes +5.000đ shipping</span>' : ''}
      </td>
      <td style="font-weight: 700;">${p.amount > 0 ? p.amount.toLocaleString('vi-VN') + 'đ' : '-'}</td>
      <td>${statusHtml}</td>
      <td>${actionHtml}</td>
    `;
    tbody.appendChild(tr);
  });

  // Update Funding Progress
  const pct = totalParticipants === 0 ? 0 : Math.round((paidCount / totalParticipants) * 100);
  document.getElementById('fundingProgressText').innerText = `${paidCount} / ${totalParticipants} Paid`;
  document.getElementById('fundingProgressBar').style.width = `${pct}%`;

  if (paidCount === totalParticipants && totalParticipants > 0) {
    document.getElementById('fundingProgressDesc').innerHTML = '<span style="color:var(--green);">100% funds verified. Ready to send to vendor.</span>';
  } else {
    document.getElementById('fundingProgressDesc').innerText = 'Waiting for all members to complete payment.';
  }

  // Update Summary
  document.getElementById('hostSubtotal').innerText = subtotal.toLocaleString('vi-VN') + 'đ';
  document.getElementById('hostShipping').innerText = currentSession.shippingFee.toLocaleString('vi-VN') + 'đ';
  document.getElementById('hostDiscount').innerText = currentSession.discount.toLocaleString('vi-VN') + 'đ';
  
  const grandTotal = subtotal + currentSession.shippingFee + currentSession.discount;
  document.getElementById('hostTotal').innerText = grandTotal.toLocaleString('vi-VN') + 'đ';

  checkHostGates();
}

function confirmPayment(name) {
  const p = participants.find(x => x.name === name);
  if (p) {
    p.status = 'Paid';
    p.method = 'Verified';
    renderParticipants();
    showToast(`Verified payment for ${name}`, '<i class="ph ph-check-circle" style="color: var(--orange);"></i>');
  }
}

function remindUser(name) {
  showToast(`Slack reminder sent to ${name}`, '<i class="ph ph-bell-ringing" style="color: var(--blue);"></i>');
}

// --- GATE 6: CLOSE ORDER ---
function handleSendToVendor() {
  const validParticipants = participants.filter(p => p.status !== 'Canceled');
  const allPaid = validParticipants.length > 0 && validParticipants.every(p => p.status === 'Paid');
  const unpaidParticipants = validParticipants.filter(p => p.status !== 'Paid');

  if (!allPaid && unpaidParticipants.length > 0) {
    const confirmMsg = `${unpaidParticipants.length} member(s) haven't paid yet. If you close the order now, you will have to cover their deficit.\n\nProceed to close order?`;
    if (!confirm(confirmMsg)) {
      return;
    }
  }

  // Populate Vendor Summary Table
  renderVendorSummary();
  switchView('view-vendor-summary');
}

function renderVendorSummary() {
  const tbody = document.getElementById('vendorTableBody');
  if (!tbody || !currentSession) return;
  
  // Aggregate items from all paid participants
  const itemMap = {};
  participants.forEach(p => {
    if (p.status === 'Canceled' || p.item === '-' || !p.item) return;
    // Parse item "Trà Sữa x1" -> name & qty
    const match = p.item.match(/^(.+?)\s*x(\d+)$/);
    if (match) {
      const name = match[1].trim();
      const qty = parseInt(match[2]);
      itemMap[name] = (itemMap[name] || 0) + qty;
    } else {
      itemMap[p.item] = (itemMap[p.item] || 0) + 1;
    }
  });
  
  tbody.innerHTML = '';
  let grandTotal = 0;
  
  Object.entries(itemMap).forEach(([name, qty]) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="font-weight: 700; text-align: center;">${qty}</td>
      <td>${name}</td>
    `;
    tbody.appendChild(tr);
  });
  
  // Update vendor name display
  const vendorShopName = document.getElementById('vendorShopName');
  if (vendorShopName) vendorShopName.innerText = currentSession.shopName;
  
  // Update vendor total
  const subtotal = participants.filter(p => p.status !== 'Canceled' && p.amount > 0).reduce((s, p) => s + p.amount, 0);
  const total = subtotal + currentSession.shippingFee + currentSession.discount;
  const vendorTotal = document.getElementById('vendorTotal');
  if (vendorTotal) vendorTotal.innerText = total.toLocaleString('vi-VN') + 'đ';
}

function checkHostGates() {
  // We no longer strictly disable the button, we use handleSendToVendor to prompt a warning.
}

// --- GATE 5: AUTO-CANCEL AT CUT-OFF ---
function simulateCutoff() {
  if (!currentSession) return;
  
  let canceledCount = 0;
  participants.forEach(p => {
    if (p.status === 'Unpaid' || p.status === 'Waiting') {
      p.status = 'Canceled';
      p.amount = 0;
      p.item = '-';
      canceledCount++;
    }
  });

  if (canceledCount > 0) {
    showToast(`System Auto-Canceled ${canceledCount} unpaid participants.`, '<i class="ph ph-shield-warning" style="color: var(--orange);"></i>');
  } else {
    showToast('Cut-off reached. No unpaid participants to cancel.');
  }

  // Gate recalculation happens in renderParticipants
  renderParticipants();
}

// --- LIVE COUNTDOWN TIMER ---
let countdownInterval = null;

function startCountdown() {
  if (countdownInterval) clearInterval(countdownInterval);
  
  countdownInterval = setInterval(() => {
    if (!currentSession) {
      clearInterval(countdownInterval);
      return;
    }
    
    const now = new Date();
    const diff = currentSession.cutoff - now;
    
    const timerEl = document.getElementById('liveCountdown');
    if (!timerEl) return;
    
    if (diff <= 0) {
      timerEl.innerHTML = '<span style="color: var(--orange); font-weight: 700;">⏰ Cut-off Reached!</span>';
      clearInterval(countdownInterval);
      // Trigger auto-cancel
      simulateCutoff();
      return;
    }
    
    const hours = Math.floor(diff / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    
    timerEl.innerHTML = `
      <div style="display: flex; gap: 8px; align-items: center;">
        <div style="background: var(--orange); color: white; padding: 6px 10px; border-radius: 8px; font-weight: 800; font-size: 16px; min-width: 38px; text-align: center;">${String(hours).padStart(2, '0')}</div>
        <span style="font-weight: 700; color: var(--orange);">:</span>
        <div style="background: var(--orange); color: white; padding: 6px 10px; border-radius: 8px; font-weight: 800; font-size: 16px; min-width: 38px; text-align: center;">${String(mins).padStart(2, '0')}</div>
        <span style="font-weight: 700; color: var(--orange);">:</span>
        <div style="background: var(--orange); color: white; padding: 6px 10px; border-radius: 8px; font-weight: 800; font-size: 16px; min-width: 38px; text-align: center;">${String(secs).padStart(2, '0')}</div>
      </div>
    `;
  }, 1000);
}

// --- GATE 2: PARTICIPANT PREVIEW & JOIN ---
function handlePreviewParticipant() {
  if (!currentSession) return;
  
  const now = new Date();
  if (now > currentSession.cutoff) {
    switchView('view-session-closed');
    return;
  }

  // Valid, setup participant view
  document.getElementById('participantShopName').innerText = currentSession.shopName;
  document.getElementById('participantSessionCode').innerText = currentSession.code;
  const formattedTime = currentSession.cutoff.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  document.getElementById('participantCutoff').innerText = formattedTime;
  
  cart = [];
  renderCart();
  switchView('view-participant');
}

// --- CART LOGIC (GATE 3) ---
function addToCart(name, price) {
  const existing = cart.find(i => i.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  showToast(`Added ${name} to cart`, '<i class="ph ph-check-circle" style="color: var(--orange);"></i>');
  renderCart();
}

function renderCart() {
  const cartEmpty = document.getElementById('cartEmpty');
  const cartFilled = document.getElementById('cartFilled');
  const container = document.getElementById('cartItemsContainer');
  const subtotalEl = document.getElementById('cartSubtotal');
  const sharedFeeEl = document.getElementById('cartSharedFee');
  const totalEl = document.getElementById('cartTotal');
  const btnEl = document.getElementById('checkoutBtn');
  
  if (cart.length === 0) {
    cartEmpty.style.display = 'block';
    cartFilled.style.display = 'none';
    btnEl.setAttribute('disabled', 'true');
  } else {
    cartEmpty.style.display = 'none';
    cartFilled.style.display = 'block';
    btnEl.removeAttribute('disabled');
    
    container.innerHTML = '';
    let subtotal = 0;
    cart.forEach((item, idx) => {
      subtotal += item.price * item.qty;
      container.innerHTML += `
        <div class="cart-item" style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div class="cart-item-name">${item.name} (x${item.qty})</div>
            <div class="cart-item-price">${(item.price * item.qty).toLocaleString('vi-VN')}đ</div>
          </div>
          <div style="display: flex; align-items: center; gap: 6px;">
            <button onclick="changeCartQty(${idx}, -1)" style="width: 24px; height: 24px; border: 1px solid var(--border-light); background: white; border-radius: 4px; cursor: pointer; font-weight: 700; display: flex; align-items: center; justify-content: center;">-</button>
            <span style="font-weight: 600; min-width: 20px; text-align: center;">${item.qty}</span>
            <button onclick="changeCartQty(${idx}, 1)" style="width: 24px; height: 24px; border: 1px solid var(--border-light); background: white; border-radius: 4px; cursor: pointer; font-weight: 700; display: flex; align-items: center; justify-content: center;">+</button>
          </div>
        </div>
      `;
    });
    
    // Dynamic fee calc mockup: assume total fee is divided by (current participants + 1 self)
    const validCount = participants.filter(p => p.status !== 'Canceled').length;
    const mySharedFee = Math.round((currentSession.shippingFee + currentSession.discount) / Math.max(validCount, 1));
    const total = subtotal + mySharedFee;
    
    subtotalEl.innerText = subtotal.toLocaleString('vi-VN') + 'đ';
    sharedFeeEl.innerText = (mySharedFee >= 0 ? '+' : '') + mySharedFee.toLocaleString('vi-VN') + 'đ';
    totalEl.innerText = total.toLocaleString('vi-VN') + 'đ';
    btnEl.innerText = 'Confirm & Pay ' + total.toLocaleString('vi-VN') + 'đ';
    
    // Pass to Payment view
    const paymentTransferMsg = `${currentSession.code}-${previewParticipantName}`;
    document.getElementById('paymentAmountDisplay').innerText = total.toLocaleString('vi-VN') + 'đ';
    document.getElementById('paymentTransferMessage').innerText = paymentTransferMsg;
    
    document.getElementById('pendingShopName').innerText = currentSession.shopName;
    document.getElementById('pendingAmountDisplay').innerText = total.toLocaleString('vi-VN') + 'đ';
  }
}

function changeCartQty(idx, delta) {
  if (!cart[idx]) return;
  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) {
    cart.splice(idx, 1);
  }
  renderCart();
}

function proceedToPayment() {
  if (cart.length === 0) return; // Gate
  switchView('view-payment');
}

// --- INTERNAL WALLET SYSTEM ---
let walletBalance = 150000; // Starting wallet balance for demo

function getWalletBalance() {
  return walletBalance;
}

function payWithWallet() {
  if (cart.length === 0) return;
  
  const validCount = participants.filter(p => p.status !== 'Canceled').length;
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const mySharedFee = Math.round((currentSession.shippingFee + currentSession.discount) / Math.max(validCount, 1));
  const total = subtotal + mySharedFee;
  
  if (walletBalance >= total) {
    walletBalance -= total;
    
    // Add self as paid participant
    const itemSummary = cart.map(i => `${i.name} x${i.qty}`).join(', ');
    participants.push({
      name: previewParticipantName,
      item: itemSummary,
      amount: total,
      status: 'Paid',
      method: 'Wallet'
    });
    
    showToast(`Paid ${total.toLocaleString('vi-VN')}đ from wallet. Balance: ${walletBalance.toLocaleString('vi-VN')}đ`, '<i class="ph ph-wallet" style="color: var(--green);"></i>');
    cart = [];
    renderParticipants();
    switchView('view-payment-pending');
    
    // Update pending view to show wallet payment
    document.getElementById('pendingAmountDisplay').innerText = total.toLocaleString('vi-VN') + 'đ';
  } else {
    showToast(`Insufficient wallet balance. You have ${walletBalance.toLocaleString('vi-VN')}đ but need ${total.toLocaleString('vi-VN')}đ.`, '<i class="ph ph-warning-circle" style="color: var(--orange);"></i>');
  }
}

// --- GATE 7: VENDOR COMPLETE ---
function markOrderCompleted() {
  currentSession = null;
  participants = [];
  if (countdownInterval) clearInterval(countdownInterval);
  showToast('Order officially completed!', '<i class="ph ph-check-circle" style="color: var(--orange);"></i>');
  renderHomeSessions();
  switchView('view-home');
}

function renderHomeSessions() {
  const container = document.getElementById('activeSessionsList');
  if (!container) return;

  if (!currentSession) {
    container.innerHTML = `
      <div class="card" style="border-style: dashed; border-color: var(--border-medium); text-align: center; padding: 40px 20px;">
        <i class="ph ph-coffee" style="font-size: 2rem; color: var(--border-medium); margin-bottom: 12px; display: block;"></i>
        <h3 class="mb-1">No active orders</h3>
        <p class="text-muted mb-3">You haven't started any group orders yet. Start one to invite your colleagues!</p>
          <button class="btn-secondary" onclick="switchView('view-create')">Create Order</button>
      </div>
    `;
  } else {
    const formattedTime = currentSession.cutoff.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    container.innerHTML = `
      <div class="history-card" style="border-color: var(--orange); box-shadow: 0 4px 12px rgba(245,166,35,0.1);" onclick="switchView('view-host-dashboard')">
        <div class="history-card-header">
          <div class="history-shop">${currentSession.shopName}</div>
          <div class="badge warning" style="font-size: 10px;">Collecting</div>
        </div>
        <div class="history-card-body">
          <div class="history-detail"><i class="ph ph-clock"></i> Closes at ${formattedTime}</div>
          <div class="history-detail"><i class="ph ph-hash"></i> ${currentSession.code}</div>
        </div>
      </div>
    `;
  }
}

// --- ANALYTICS VIEW (Dynamic Charts) ---
function renderAnalytics() {
  // Update home stats dynamically
  const totalOrdersEl = document.querySelector('#view-home .card:nth-child(1) div:last-child');
  const totalSpentEl = document.querySelector('#view-home .card:nth-child(2) div:last-child');
  const estSavingsEl = document.querySelector('#view-home .card:nth-child(3) div:last-child');
  
  // These would be dynamic in a real app; here we demonstrate the analytics view
  const analyticsView = document.getElementById('view-analytics');
  if (!analyticsView) return;
  
  // Check if chart canvas already exists
  if (!document.getElementById('orderStatsChart')) {
    // Add chart containers to the analytics view
    const kpiRow = analyticsView.querySelector('.kpi-row');
    if (kpiRow) {
      const chartSection = document.createElement('div');
      chartSection.style.cssText = 'display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 32px; max-width: 900px; margin-left: auto; margin-right: auto;';
      chartSection.innerHTML = `
        <div class="card" style="padding: 24px;">
          <h3 style="font-size: 14px; font-weight: 700; margin-bottom: 16px; color: var(--text-dark);"><i class="ph ph-chart-bar"></i> Weekly Order Volume</h3>
          <canvas id="orderStatsChart" height="200"></canvas>
        </div>
        <div class="card" style="padding: 24px;">
          <h3 style="font-size: 14px; font-weight: 700; margin-bottom: 16px; color: var(--text-dark);"><i class="ph ph-chart-pie-slice"></i> Spending by Category</h3>
          <canvas id="spendingCategoryChart" height="200"></canvas>
        </div>
        <div class="card" style="padding: 24px; grid-column: span 2;">
          <h3 style="font-size: 14px; font-weight: 700; margin-bottom: 16px; color: var(--text-dark);"><i class="ph ph-trend-up"></i> Monthly Savings vs Manual Flow</h3>
          <canvas id="savingsComparisonChart" height="160"></canvas>
        </div>
      `;
      kpiRow.after(chartSection);
    }
  }
  
  // Render charts
  setTimeout(() => {
    renderOrderStatsChart();
    renderSpendingCategoryChart();
    renderSavingsComparisonChart();
  }, 100);
}

function renderOrderStatsChart() {
  const ctx = document.getElementById('orderStatsChart');
  if (!ctx) return;
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      datasets: [{
        label: 'Orders',
        data: [3, 5, 4, 6, 8],
        backgroundColor: 'rgba(245, 166, 35, 0.8)',
        borderRadius: 6,
        borderSkipped: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { stepSize: 2 } },
        x: { grid: { display: false } }
      }
    }
  });
}

function renderSpendingCategoryChart() {
  const ctx = document.getElementById('spendingCategoryChart');
  if (!ctx) return;
  
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Coffee/Tea', 'Lunch/Dinner', 'Snacks', 'Beverages'],
      datasets: [{
        data: [35, 40, 15, 10],
        backgroundColor: ['#F5A623', '#2D9CDB', '#27AE60', '#9B59B6'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { padding: 12, font: { size: 12 } } }
      }
    }
  });
}

function renderSavingsComparisonChart() {
  const ctx = document.getElementById('savingsComparisonChart');
  if (!ctx) return;
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      datasets: [
        {
          label: 'Manual Flow Cost',
          data: [280, 310, 295, 340, 320, 350, 330, 360],
          borderColor: '#EF4444',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          fill: true,
          tension: 0.3,
          pointRadius: 3
        },
        {
          label: 'OrderFlow Cost',
          data: [250, 260, 240, 270, 250, 265, 255, 270],
          borderColor: '#F5A623',
          backgroundColor: 'rgba(245, 166, 35, 0.1)',
          fill: true,
          tension: 0.3,
          pointRadius: 3
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { padding: 16, font: { size: 12 } } }
      },
      scales: {
        y: { beginAtZero: false, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { callback: v => v + 'K đ' } },
        x: { grid: { display: false } }
      }
    }
  });
}

// Override switchView to start countdown when entering host dashboard and render analytics
const _originalSwitchView = switchView;
switchView = function(viewId) {
  _originalSwitchView(viewId);
  
  if (viewId === 'view-host-dashboard' && currentSession) {
    startCountdown();
    // Inject countdown container if not present
    const cutoffEl = document.getElementById('hostDashCutoff');
    if (cutoffEl && !document.getElementById('liveCountdown')) {
      const countdownDiv = document.createElement('div');
      countdownDiv.id = 'liveCountdown';
      countdownDiv.style.cssText = 'margin-top: 12px;';
      cutoffEl.closest('.page-subtitle').after(countdownDiv);
    }
    // Inject wallet pay button if not present
    const participantBtn = document.querySelector('#view-host-dashboard .btn-secondary[onclick*="handlePreviewParticipant"]');
    if (participantBtn && !document.getElementById('walletBalanceDisplay')) {
      const walletDiv = document.createElement('div');
      walletDiv.id = 'walletBalanceDisplay';
      walletDiv.style.cssText = 'margin-top: 12px; padding: 12px; background: linear-gradient(135deg, rgba(245,166,35,0.08), rgba(0,212,170,0.05)); border: 1px solid rgba(245,166,35,0.15); border-radius: 10px; font-size: 13px;';
      walletDiv.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="color: var(--text-secondary);"><i class="ph ph-wallet"></i> Internal Wallet</span>
          <span style="font-weight: 700; color: var(--green);">${walletBalance.toLocaleString('vi-VN')}đ</span>
        </div>
      `;
      participantBtn.after(walletDiv);
    }
  }
  
  if (viewId === 'view-analytics') {
    renderAnalytics();
  }
};

// Init QR Mockup
const qrGrid = document.getElementById('qrGrid');
if (qrGrid) {
  for(let i=0; i<49; i++) {
    const cell = document.createElement('div');
    cell.className = 'qr-cell ' + (Math.random() > 0.4 ? 'filled' : '');
    qrGrid.appendChild(cell);
  }
}

// Add wallet payment option to participant payment view
document.addEventListener('DOMContentLoaded', () => {
  const paymentView = document.getElementById('view-payment');
  if (paymentView) {
    const transferBtn = paymentView.querySelector('.btn-primary');
    if (transferBtn && !document.getElementById('walletPayBtn')) {
      const walletBtn = document.createElement('button');
      walletBtn.id = 'walletPayBtn';
      walletBtn.className = 'btn-secondary w-100 mt-2';
      walletBtn.style.cssText = 'display: flex; align-items: center; justify-content: center; gap: 8px;';
      walletBtn.innerHTML = `<i class="ph ph-wallet"></i> Pay with Wallet (${walletBalance.toLocaleString('vi-VN')}đ available)`;
      walletBtn.onclick = payWithWallet;
      transferBtn.after(walletBtn);
    }
  }
});

