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
}

function showToast(message, icon = '<i class="ph ph-info" style="color: var(--teal);"></i>') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

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
    showToast('Cut-off time must be at least 5 minutes from now.', '<i class="ph ph-x-circle" style="color: red;"></i>');
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
        ${p.amount > 0 ? '<span style="display:block; font-size:11px; color:var(--teal); margin-top:2px;">Includes +5.000đ shipping</span>' : ''}
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
    showToast(`Verified payment for ${name}`, '<i class="ph ph-check-circle" style="color: var(--teal);"></i>');
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
  switchView('view-vendor-summary');
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
  showToast(`Added ${name} to cart`, '<i class="ph ph-check-circle" style="color: var(--teal);"></i>');
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
    cart.forEach(item => {
      subtotal += item.price * item.qty;
      container.innerHTML += `
        <div class="cart-item">
          <div class="cart-item-name">${item.name} (x${item.qty})</div>
          <div class="cart-item-price">${(item.price * item.qty).toLocaleString('vi-VN')}đ</div>
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

function proceedToPayment() {
  if (cart.length === 0) return; // Gate
  switchView('view-payment');
}

// --- GATE 7: VENDOR COMPLETE ---
function markOrderCompleted() {
  currentSession = null;
  participants = [];
  showToast('Order officially completed!', '<i class="ph ph-check-circle" style="color: var(--teal);"></i>');
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
      <div class="history-card" style="border-color: var(--teal); box-shadow: 0 4px 12px rgba(0,212,170,0.1);" onclick="switchView('view-host-dashboard')">
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

// Init QR Mockup
const qrGrid = document.getElementById('qrGrid');
if (qrGrid) {
  for(let i=0; i<49; i++) {
    const cell = document.createElement('div');
    cell.className = 'qr-cell ' + (Math.random() > 0.4 ? 'filled' : '');
    qrGrid.appendChild(cell);
  }
}
