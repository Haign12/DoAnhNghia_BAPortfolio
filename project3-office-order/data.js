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
  { id: 1, name: 'Trà Sữa Trân Châu', qty: 2, price: 35000, category: 'Beverage' },
  { id: 2, name: 'Cà Phê Sữa Đá', qty: 3, price: 29000, category: 'Coffee' },
  { id: 3, name: 'Matcha Latte', qty: 1, price: 45000, category: 'Tea' },
  { id: 4, name: 'Bạc Xỉu', qty: 2, price: 32000, category: 'Coffee' },
  { id: 5, name: 'Phí Ship (Discount Shared)', qty: 1, price: 15000, category: 'Fee' }
];

const participants = [
  { id: 1, name: 'Anh Nghĩa (Host)', item: 'Trà Sữa Trân Châu x1, Bạc Xỉu x1', amount: 69000, status: 'Paid', avatar: 'AN', method: 'Momo' },
  { id: 2, name: 'Minh Tuấn', item: 'Cà Phê Sữa Đá x1', amount: 32000, status: 'Unpaid', avatar: 'MT', method: 'Pending' },
  { id: 3, name: 'Hương Giang', item: 'Matcha Latte x1', amount: 48000, status: 'Unpaid', avatar: 'HG', method: 'Pending' },
  { id: 4, name: 'Hoàng Nam', item: 'Cà Phê Sữa Đá x1', amount: 32000, status: 'Paid', avatar: 'HN', method: 'VNPay' },
  { id: 5, name: 'Thu Trang', item: 'Trà Sữa Trân Châu x1, Cà Phê x1', amount: 67000, status: 'Unpaid', avatar: 'TT', method: 'Pending' }
];

const totalPeople = 5;
