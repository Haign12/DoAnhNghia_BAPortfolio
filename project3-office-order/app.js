/* ============================================================
   PROJECT 3 – OFFICE GROUP ORDER | MULTI-VIEW LOGIC
   ============================================================ */

const participants = [
  { name: 'Anh Nghĩa', item: 'Trà Sữa x1', amount: '40.000đ', status: 'Paid', method: 'Momo' },
  { name: 'Minh Tuấn', item: 'Cà Phê Sữa x1', amount: '34.000đ', status: 'Unpaid', method: 'Pending' },
  { name: 'Hương Giang', item: 'Matcha Latte x1', amount: '50.000đ', status: 'Paid', method: 'VNPay' },
  { name: 'Thu Trang', item: '-', amount: '-', status: 'Pending', method: '-' }
];

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
  participants.forEach((p, index) => {
    const tr = document.createElement('tr');
    
    const statusHtml = p.status === 'Paid' 
      ? `<span class="badge success">Paid (${p.method})</span>`
      : p.status === 'Unpaid' 
        ? `<span class="badge warning">Unpaid</span>` 
        : `<span class="badge" style="background: var(--border-light); color: var(--text-secondary);">Waiting</span>`;

    const actionHtml = p.status === 'Unpaid'
      ? `<span class="action-link" onclick="remindUser('${p.name}')">Remind</span>`
      : `<span style="color: var(--text-muted); font-size: 0.8rem;">-</span>`;

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

function handlePaymentComplete() {
  showToast('Payment detected! Updating status...', '<i class="ph ph-spinner"></i>');
  setTimeout(() => {
    // Mock updating Thu Trang
    participants[3] = { name: 'Thu Trang', item: 'Trà Sữa x1', amount: '40.000đ', status: 'Paid', method: 'Momo' };
    renderParticipants();
    switchView('view-host-dashboard');
    showToast('Payment successful!', '<i class="ph ph-check-circle" style="color: var(--teal);"></i>');
  }, 1500);
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
  
  const placeOrderBtn = document.getElementById('placeOrderBtn');
  if(placeOrderBtn) {
    placeOrderBtn.addEventListener('click', function() {
      this.innerHTML = '<i class="ph ph-check"></i> Sent to Vendor';
      this.style.background = 'var(--green)';
      this.style.color = '#fff';
      showToast('Order successfully sent to Highlands Coffee!', '<i class="ph ph-check-circle" style="color: var(--green);"></i>');
    });
  }
});
