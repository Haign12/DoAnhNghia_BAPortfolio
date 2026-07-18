/* ============================================================
   PROJECT 2 – PROPERTY MANAGER | Mock Data
   ============================================================ */

const kpiData = {
  revenue: 241.00,
  overdue: 0.00,
  paid: 0.00,
  occupancy: "100%"
};

const invoices = [
  {
    id: 'INV-0001',
    roomNo: 'A101',
    status: 'Draft', // Could be Draft, Paid, Overdue
    dueDate: 'Jun 16, 2026',
    issueDate: 'May 17, 2026',
    customer: 'Alex Smith',
    customerEmail: 'alexsmith.mobbln+3@gmail.com',
    customerPhone: '+16502137379',
    address: '75 Ayer Rajah Crescent\n139953 Singapore\nSingapore',
    amount: 241.00,
    breakdown: [
      { description: 'Room Rent (June)', quantity: 1, price: 100, total: 100 },
      { description: 'Electricity', quantity: 1, price: 25, total: 25 },
      { description: 'Water', quantity: 1, price: 80, total: 80 },
      { description: 'Maintenance Fee', quantity: 1, price: 36, total: 36 }
    ],
    subtotal: 241.00,
    vat: 0.00,
    total: 241.00
  },
  {
    id: 'INV-0002',
    roomNo: 'B202',
    status: 'Paid',
    dueDate: 'Jun 15, 2026',
    issueDate: 'May 15, 2026',
    customer: 'Sarah Jenkins',
    customerEmail: 'sarah.j@example.com',
    customerPhone: '+16505550198',
    address: 'Block B, Level 2\n139953 Singapore',
    amount: 320.00,
    breakdown: [
      { description: 'Room Rent (June)', quantity: 1, price: 250, total: 250 },
      { description: 'Electricity', quantity: 1, price: 40, total: 40 },
      { description: 'Water', quantity: 1, price: 30, total: 30 }
    ],
    subtotal: 320.00,
    vat: 0.00,
    total: 320.00
  },
  {
    id: 'INV-0003',
    roomNo: 'C305',
    status: 'Overdue',
    dueDate: 'Jun 01, 2026',
    issueDate: 'May 01, 2026',
    customer: 'David Chen',
    customerEmail: 'd.chen99@example.com',
    customerPhone: '+16505550777',
    address: 'Block C, Level 3\n139953 Singapore',
    amount: 185.00,
    breakdown: [
      { description: 'Room Rent (May)', quantity: 1, price: 150, total: 150 },
      { description: 'Late Fee', quantity: 1, price: 35, total: 35 }
    ],
    subtotal: 185.00,
    vat: 0.00,
    total: 185.00
  }
];
