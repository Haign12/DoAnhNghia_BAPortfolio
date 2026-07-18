/* ============================================================
   PROJECT 3 – OFFICE GROUP ORDER | Mock Data
   ============================================================ */

const asIsProcess = [
  { text: 'Staff sends order in group chat', type: 'normal' },
  { text: 'Admin compiles list manually', type: 'normal' },
  { text: 'Admin places order & pays upfront', type: 'bottleneck', label: 'Cash Flow Risk' },
  { text: 'Admin calculates individual costs + shipping', type: 'bottleneck', label: 'Time Sink (45m)' },
  { text: 'Staff transfers money (often forgotten)', type: 'bottleneck', label: 'Payment Loss' }
];

const toBeProcess = [
  { text: 'Staff opens App & selects items', type: 'automated', label: 'Self-service' },
  { text: 'System calculates individual split + shipping', type: 'automated', label: 'Instant' },
  { text: 'Staff pays directly via QR Code', type: 'normal' },
  { text: 'System confirms 100% funds collected', type: 'automated', label: 'Zero Risk' },
  { text: 'System triggers final order to vendor', type: 'automated', label: 'Auto' }
];

const stepperSteps = [
  { icon: '<i class="ph ph-note-pencil"></i>', label: 'Place Order' },
  { icon: '<i class="ph ph-lightning"></i>', label: 'Auto Split' },
  { icon: '<i class="ph ph-qr-code"></i>', label: 'QR Payment' },
  { icon: '<i class="ph ph-check-circle"></i>', label: 'Confirmed' }
];

const orderItems = [
  { name: 'Trà Sữa Trân Châu', qty: 2, price: 35000 },
  { name: 'Cà Phê Sữa Đá', qty: 3, price: 29000 },
  { name: 'Matcha Latte', qty: 1, price: 45000 },
  { name: 'Bạc Xỉu', qty: 2, price: 32000 },
  { name: 'Phí Ship', qty: 1, price: 15000 }
];

const totalPeople = 5;
