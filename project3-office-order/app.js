/* ============================================================
   PROJECT 3 – OFFICE GROUP ORDER | Clean Enterprise App Logic
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

// --- Toast (Corporate styled) -------------------------------
const toastContainer = document.getElementById('toastContainer');

function showToast(message, icon = 'ℹ️') {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;
  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('toast-out');
    setTimeout(() => toast.remove(), 250);
  }, 3000);
}

// --- Format VND currency ------------------------------------
function formatVND(amount) {
  // Ensure dot notation for thousands (160.000đ)
  return amount.toLocaleString('vi-VN').replace(/,/g, '.') + 'đ';
}

// --- Render Process Flows -----------------------------------
function renderProcess(containerId, processData) {
  const container = document.getElementById(containerId);
  let html = '';

  processData.forEach((step, index) => {
    const labelTag = step.label
      ? `<span class="step-label-tag ${step.type}">${step.label}</span>`
      : '';

    html += `
      <div class="process-step">
        <div class="step-number ${step.type}">${index + 1}</div>
        <div class="step-content ${step.type}">
          <div class="step-text">${step.text}</div>
          ${labelTag}
        </div>
      </div>
    `;

    if (index < processData.length - 1) {
      html += `
        <div class="step-connector">
          <div class="connector-line ${step.type}"></div>
        </div>
      `;
    }
  });

  container.innerHTML = html;
}

renderProcess('asisProcess', asIsProcess);
renderProcess('tobeProcess', toBeProcess);

// --- Progress Stepper ---------------------------------------
const stepperEl = document.getElementById('stepper');
const stepperProgress = document.getElementById('stepperProgress');
let currentStep = 0;

function renderStepper() {
  const existingSteps = stepperEl.querySelectorAll('.step');
  existingSteps.forEach(s => s.remove());

  stepperSteps.forEach((step, i) => {
    const div = document.createElement('div');
    div.className = 'step';
    if (i < currentStep) div.classList.add('completed');
    if (i === currentStep) div.classList.add('active');

    const checkMark = i < currentStep ? '✓' : step.icon;

    div.innerHTML = `
      <div class="step-circle">${checkMark}</div>
      <div class="step-label">${step.label}</div>
    `;

    div.addEventListener('click', () => {
      currentStep = i;
      updateStepper();
      showToast(`View updated to: ${step.label}`, step.icon);
    });

    stepperEl.appendChild(div);
  });

  const progressPercent = currentStep / (stepperSteps.length - 1) * 100;
  stepperProgress.style.width = progressPercent + '%';
}

function updateStepper() {
  const steps = stepperEl.querySelectorAll('.step');
  steps.forEach((stepEl, i) => {
    stepEl.classList.remove('completed', 'active');
    const circle = stepEl.querySelector('.step-circle');
    if (i < currentStep) {
      stepEl.classList.add('completed');
      circle.textContent = '✓';
    } else if (i === currentStep) {
      stepEl.classList.add('active');
      circle.textContent = stepperSteps[i].icon;
    } else {
      circle.textContent = stepperSteps[i].icon;
    }
  });
  const progressPercent = currentStep / (stepperSteps.length - 1) * 100;
  stepperProgress.style.width = progressPercent + '%';
}

renderStepper();

// --- Order Table & Split Calculator -------------------------
const orderTableBody = document.getElementById('orderTableBody');
const splitAmountEl = document.getElementById('splitAmount');
const personCountEl = document.getElementById('personCount');
const quickSplitTotal = document.getElementById('quickSplitTotal');
const qrSection = document.getElementById('qrSection');

let grandTotal = 0;

orderItems.forEach(item => {
  const subtotal = item.qty * item.price;
  grandTotal += subtotal;

  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td class="item-name">${item.name}</td>
    <td>${item.qty}</td>
    <td class="item-price">${formatVND(item.price)}</td>
    <td class="item-price">${formatVND(subtotal)}</td>
  `;
  orderTableBody.appendChild(tr);
});

const totalTr = document.createElement('tr');
totalTr.className = 'total-row';
totalTr.innerHTML = `
  <td colspan="3">Grand Total</td>
  <td class="item-price">${formatVND(grandTotal)}</td>
`;
orderTableBody.appendChild(totalTr);

const perPerson = Math.ceil(grandTotal / totalPeople);
splitAmountEl.textContent = formatVND(perPerson);
personCountEl.textContent = totalPeople;
if (quickSplitTotal) {
  quickSplitTotal.value = formatVND(grandTotal);
}

// --- QR Code Mockup -----------------------------------------
const qrGrid = document.getElementById('qrGrid');
const qrPattern = [
  1,1,1,1,1,1,1, 1,0,0,0,0,0,1, 1,0,1,1,1,0,1, 1,0,1,0,1,0,1, 1,0,1,1,1,0,1, 1,0,0,0,0,0,1, 1,1,1,1,1,1,1,
  0,0,1,0,1,0,0, 1,0,0,1,0,1,1, 0,1,1,0,1,0,0, 1,0,1,1,0,1,1, 0,1,0,0,1,0,0, 1,1,0,1,0,1,0, 1,1,1,1,1,1,1,
  1,0,0,0,0,0,1, 1,0,1,1,1,0,1, 1,0,1,0,1,0,1, 1,0,1,1,1,0,1, 1,0,0,0,0,0,1, 1,1,1,1,1,1,1, 0,0,0,1,0,1,0,
  1,1,0,0,1,0,1, 0,0,1,1,0,1,0, 1,0,0,1,1,0,1, 0,1,1,0,0,1,0, 1,0,1,0,1,1,0, 1,1,1,1,1,1,1, 1,0,0,0,0,0,1,
  1,0,1,1,1,0,1, 1,0,1,0,1,0,1, 1,0,1,1,1,0,1, 1,0,0,0,0,0,1, 1,1,1,1,1,1,1, 0,1,0,1,0,0,1, 1,0,1,0,1,1,0,
  0,1,0,1,0,0,1, 1,0,1,0,1,1,0, 0,1,0,1,0,0,1, 1,0,1,0,1,1,0, 1,1,1,1,1,1,1, 1,0,0,0,0,0,1, 1,0,1,1,1,0,1,
  1,0,1,0,1,0,1, 1,0,1,1,1,0,1, 1,0,0,0,0,0,1, 1,1,1,1,1,1,1,
];

qrPattern.forEach(val => {
  const cell = document.createElement('div');
  cell.className = 'qr-cell ' + (val ? 'filled' : 'empty');
  qrGrid.appendChild(cell);
});

// --- Place Order & Calculate Buttons ------------------------
const placeOrderBtn = document.getElementById('placeOrderBtn');
const calcSplitBtn = document.getElementById('calcSplitBtn');

if (calcSplitBtn) {
  calcSplitBtn.addEventListener('click', () => {
    calcSplitBtn.textContent = 'Calculated ✓';
    calcSplitBtn.style.background = 'var(--teal)';
    calcSplitBtn.style.color = '#fff';
    calcSplitBtn.style.borderColor = 'var(--teal)';
    
    // Advance stepper to QR Payment step (Index 2)
    currentStep = 2;
    updateStepper();
    showToast(`System split: ${formatVND(perPerson)} per person`, '⚡');
    
    // Show QR
    if (qrSection) qrSection.style.display = 'flex';
  });
}

if (placeOrderBtn) {
  placeOrderBtn.addEventListener('click', () => {
    placeOrderBtn.disabled = true;
    placeOrderBtn.textContent = 'Processing...';

    // Simulate flow
    currentStep = 3;
    updateStepper();
    showToast('Verifying QR payments from all members', '📱');
    
    setTimeout(() => {
      showToast('Order confirmed and sent to vendor.', '✅');
      placeOrderBtn.textContent = '✓ Order Placed';
      placeOrderBtn.style.background = '#059669'; // success green
      placeOrderBtn.style.color = '#fff';
      
      setTimeout(() => {
        currentStep = 0;
        updateStepper();
        if (qrSection) qrSection.style.display = 'none';
        placeOrderBtn.disabled = false;
        placeOrderBtn.textContent = 'Confirm Group Order';
        placeOrderBtn.style.background = '';
        placeOrderBtn.style.color = '';
        if (calcSplitBtn) {
          calcSplitBtn.textContent = 'Auto-Calculate Shares';
          calcSplitBtn.style.background = '';
          calcSplitBtn.style.color = '';
          calcSplitBtn.style.borderColor = '';
        }
      }, 5000);
// --- BA Requirements Modal Logic -----------------------------
const baSpecBtn = document.getElementById('baSpecBtn');
const baModalOverlay = document.getElementById('baModalOverlay');
const closeBaModalBtn = document.getElementById('closeBaModalBtn');

if (baSpecBtn && baModalOverlay) {
  baSpecBtn.addEventListener('click', () => {
    baModalOverlay.classList.add('active');
  });
}
if (closeBaModalBtn && baModalOverlay) {
  closeBaModalBtn.addEventListener('click', () => {
    baModalOverlay.classList.remove('active');
  });
  baModalOverlay.addEventListener('click', (e) => {
    if (e.target === baModalOverlay) {
      baModalOverlay.classList.remove('active');
    }
  });
}

// --- Export Report Button ------------------------------------
const exportReportBtn = document.getElementById('exportReportBtn');
if (exportReportBtn) {
  exportReportBtn.addEventListener('click', () => {
    showToast('Group order summary report exported (PDF/CSV)', '📊');
  });
}

// --- Topbar Icon Interactions --------------------------------
document.querySelectorAll('.topbar-icon').forEach((icon, i) => {
  icon.addEventListener('click', () => {
    const msgs = ['Notifications: 2 payment reminders sent', 'Settings: System defaults loaded'];
    showToast(msgs[i] || 'System action triggered', '⚙️');
  });
});

// --- Participant List Rendering & Payment Status Toggle ------
const participantTableBody = document.getElementById('participantTableBody');
const participantSummaryBadge = document.getElementById('participantSummaryBadge');

function renderParticipants() {
  if (!participantTableBody) return;
  participantTableBody.innerHTML = '';
  
  let paidCount = 0;
  
  participants.forEach(p => {
    if (p.status === 'Paid') paidCount++;
    
    const tr = document.createElement('tr');
    const isPaid = p.status === 'Paid';
    
    const statusTag = isPaid
      ? `<span class="panel-tag success-tag" style="cursor: pointer;" title="Click to toggle status">Paid (${p.method})</span>`
      : `<span class="panel-tag danger-tag" style="background: rgba(245, 166, 35, 0.1); color: #f5a623; cursor: pointer;" title="Click to toggle status">Unpaid</span>`;
      
    const actionBtn = isPaid
      ? `<span style="color: var(--text-white-muted); font-size: 0.8rem;">✓ Verified</span>`
      : `<button class="view-all-btn remind-btn" style="color: #4a90d9; border-color: #4a90d9;"><i class="ph ph-bell-ringing"></i> Remind</button>`;

    tr.innerHTML = `
      <td style="font-weight: 600; display: flex; align-items: center; gap: 8px;">
        <span style="width: 26px; height: 26px; border-radius: 50%; background: var(--bg-dark-2); display: inline-flex; align-items: center; justify-content: center; font-size: 0.65rem; color: var(--teal); font-weight: 700;">${p.avatar}</span>
        ${p.name}
      </td>
      <td style="color: var(--text-secondary); font-size: 0.85rem;">${p.item}</td>
      <td style="font-weight: 700; color: #fff;">${formatVND(p.amount)}</td>
      <td>${statusTag}</td>
      <td>${actionBtn}</td>
    `;

    // Toggle Paid/Unpaid status on badge click
    const tagEl = tr.querySelector('.panel-tag');
    if (tagEl) {
      tagEl.addEventListener('click', () => {
        p.status = (p.status === 'Paid') ? 'Unpaid' : 'Paid';
        p.method = (p.status === 'Paid') ? 'Momo' : 'Pending';
        renderParticipants();
        showToast(`${p.name} status updated to ${p.status}`, p.status === 'Paid' ? '✅' : '⚠️');
      });
    }

    // Remind button click
    const remindBtn = tr.querySelector('.remind-btn');
    if (remindBtn) {
      remindBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showToast(`Slack reminder sent to ${p.name} with QR link`, '🔔');
      });
    }

    participantTableBody.appendChild(tr);
  });

  if (participantSummaryBadge) {
    participantSummaryBadge.textContent = `${paidCount} of ${participants.length} paid`;
    if (paidCount === participants.length) {
      participantSummaryBadge.style.background = 'rgba(0, 212, 170, 0.2)';
      participantSummaryBadge.style.color = '#00d4aa';
    } else {
      participantSummaryBadge.style.background = 'rgba(245, 166, 35, 0.1)';
      participantSummaryBadge.style.color = '#f5a623';
    }
  }
}

renderParticipants();

// --- Search Filter Logic -------------------------------------
const searchInput = document.querySelector('.search-box input');
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    document.querySelectorAll('.order-table tbody tr').forEach(row => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(q) ? '' : 'none';
    });
  });
}


