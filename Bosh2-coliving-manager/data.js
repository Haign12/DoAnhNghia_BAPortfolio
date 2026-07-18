/* ============================================================
   PROJECT 2 – CO-LIVING MANAGER | Mock Data
   ============================================================ */

const roommates = [
  { name: 'Nghia (You)', initials: 'N', avatarClass: 'avatar-1', balance: 45.00 },
  { name: 'John Doe', initials: 'JD', avatarClass: 'avatar-2', balance: -30.00 },
  { name: 'Minh Tran', initials: 'MT', avatarClass: 'avatar-3', balance: -15.00 }
];

const chores = [
  { title: 'Take out trash', assignee: 'John Doe', assigneeIdx: 1, status: 'todo', priority: 'high', dueDate: 'Today' },
  { title: 'Clean bathroom', assignee: 'Nghia (You)', assigneeIdx: 0, status: 'todo', priority: 'medium', dueDate: 'Tomorrow' },
  { title: 'Mop kitchen floor', assignee: 'Minh Tran', assigneeIdx: 2, status: 'todo', priority: 'low', dueDate: 'Fri' },
  { title: 'Vacuum living room', assignee: 'John Doe', assigneeIdx: 1, status: 'done', priority: 'medium', dueDate: 'Mon' },
  { title: 'Buy dish soap', assignee: 'Nghia (You)', assigneeIdx: 0, status: 'done', priority: 'low', dueDate: 'Tue' }
];

const expenses = [
  { date: 'Oct 12', item: 'Internet Bill', paidBy: 'Nghia (You)', amount: 60, split: '3-way' },
  { date: 'Oct 10', item: 'Groceries (Shared)', paidBy: 'Nghia (You)', amount: 45, split: '3-way' },
  { date: 'Oct 08', item: 'Water Bill', paidBy: 'John Doe', amount: 30, split: '3-way' },
  { date: 'Oct 05', item: 'Cleaning Supplies', paidBy: 'Minh Tran', amount: 18, split: '3-way' },
  { date: 'Oct 02', item: 'Electricity Bill', paidBy: 'Nghia (You)', amount: 90, split: '3-way' }
];
