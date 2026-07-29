/* ============================================================
   PROJECT 3 – OFFICE GROUP ORDER | MULTI-VIEW LOGIC
   ============================================================ */

const participants = [
  { name: 'Anh Nghĩa', item: 'Trà Sữa x1', amount: '40.000đ', status: 'Paid', method: 'Momo' },
  { name: 'Minh Tuấn', item: 'Cà Phê Sữa x1', amount: '34.000đ', status: 'Unpaid', method: 'Pending' },
  { name: 'Hương Giang', item: 'Matcha Latte x1', amount: '50.000đ', status: 'Paid', method: 'VNPay' },
  { name: 'Hoàng Nam', item: '-', amount: '-', status: 'Waiting', method: '-' },
  { name: 'Thu Trang', item: 'Trà Sữa x1', amount: '40.000đ', status: 'Unpaid', method: 'Pending' }
];

let cart = [];

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
  setTimeout(() => toast.remove(), 3000);
}

function renderParticipants() {
  const tbody = document.getElementById('participantTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';
  participants.forEach((p) => {
    const tr = document.createElement('tr');
    
    let statusHtml = '';
    let actionHtml = '-';
    
    if (p.status === 'Paid') {
      statusHtml = `<span class="badge success">Paid (${p.method})</span>`;
    } else if (p.status === 'Unpaid') {
      statusHtml = `<span class="badge warning">Unpaid</span>`;
      actionHtml = `<span class="action-link" onclick="remindUser('${p.name}')">Remind</span>`;
    } else {
      statusHtml = `<span class="badge" style="background: var(--border-light); color: var(--text-secondary);">Waiting</span>`;
    }

    tr.innerHTML = `
      <td style="font-weight: 600;">${p.name}</td>
      <td style="color: var(--text-secondary);">${p.item}</td>
      <td style="font-weight: 700;">${p.amount}</td>
      <td>${statusHtml}</td>
      <td>${actionHtml}</td>
    `;
    tbody.appendChild(tr);
  });
}

function remindUser(name) {
  showToast(`Slack reminder sent to ${name}`, '<i class="ph ph-bell-ringing" style="color: var(--blue);"></i>');
}

// --- Cart Logic ---
function resetParticipantCart() {
  cart = [];
  renderCart();
}

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
  const totalEl = document.getElementById('cartTotal');
  const btnEl = document.getElementById('checkoutBtn');
  const paymentDisplay = document.getElementById('paymentAmountDisplay');
  const successDisplay = document.getElementById('successAmountDisplay');
  
  if (cart.length === 0) {
    cartEmpty.style.display = 'block';
    cartFilled.style.display = 'none';
  } else {
    cartEmpty.style.display = 'none';
    cartFilled.style.display = 'block';
    
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
    
    const sharedFee = 5000;
    const total = subtotal + sharedFee;
    
    subtotalEl.innerText = subtotal.toLocaleString('vi-VN') + 'đ';
    totalEl.innerText = total.toLocaleString('vi-VN') + 'đ';
    btnEl.innerText = 'Confirm & Pay ' + total.toLocaleString('vi-VN') + 'đ';
    
    // Update Payment views
    if(paymentDisplay) paymentDisplay.innerText = total.toLocaleString('vi-VN') + 'đ';
    if(successDisplay) successDisplay.innerText = total.toLocaleString('vi-VN') + 'đ';
  }
}

function proceedToPayment() {
  switchView('view-payment');
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

// Init
document.addEventListener('DOMContentLoaded', () => {
  renderParticipants();
  renderCart();
});
