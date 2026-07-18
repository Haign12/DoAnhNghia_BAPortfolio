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
  return amount.toLocaleString('vi-VN') + 'đ';
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

// --- Place Order Button -------------------------------------
const placeOrderBtn = document.getElementById('placeOrderBtn');

placeOrderBtn.addEventListener('click', () => {
  placeOrderBtn.disabled = true;
  placeOrderBtn.textContent = 'Processing...';

  let step = 0;
  const interval = setInterval(() => {
    currentStep = step;
    updateStepper();

    if (step === 0) showToast('Order received from 5 staff members', '📝');
    if (step === 1) showToast(`System split: ${formatVND(perPerson)} per person`, '⚡');
    if (step === 2) showToast('Verifying QR payments from all members', '📱');
    if (step === 3) {
      showToast('Order confirmed and sent to vendor.', '✅');
      placeOrderBtn.textContent = '✓ Order Placed';
      placeOrderBtn.style.background = '#059669'; // success green
      clearInterval(interval);

      setTimeout(() => {
        currentStep = 0;
        updateStepper();
        placeOrderBtn.disabled = false;
        placeOrderBtn.textContent = '✓ Confirm & Place Order';
        placeOrderBtn.style.background = '';
      }, 4000);
    }
    step++;
  }, 1000);
});
