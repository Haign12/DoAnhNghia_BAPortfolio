
/* CoSpace SPA Core Logic */
// 1. Data & State Initialization
const DEFAULT_MEMBERS = [
  { id: 'm1', name: 'Nghĩa', avatar: 'AN', color: '#60A5FA' },
  { id: 'm2', name: 'Roommate A', avatar: 'RA', color: '#F472B6' },
  { id: 'm3', name: 'Roommate B', avatar: 'RB', color: '#34D399' }
];
let members = DEFAULT_MEMBERS;
let chores = [];
let expenses = [];
try {
  members = JSON.parse(localStorage.getItem('cospace_members_v3')) || DEFAULT_MEMBERS;
  chores = JSON.parse(localStorage.getItem('cospace_chores_v3')) || [];
  expenses = JSON.parse(localStorage.getItem('cospace_expenses_v3')) || [];
} catch (e) {
  console.error('LocalStorage parse error:', e);
  localStorage.removeItem('cospace_members_v3');
  localStorage.removeItem('cospace_chores_v3');
  localStorage.removeItem('cospace_expenses_v3');
}

function persist() {
  localStorage.setItem('cospace_chores_v3', JSON.stringify(chores));
  localStorage.setItem('cospace_expenses_v3', JSON.stringify(expenses));
}

function uid() { return Date.now().toString(36) + Math.random().toString(36).substr(2, 5); }

// Seed data if empty (for demo purposes)
if (chores.length === 0 && expenses.length === 0) {
  const t = new Date();
  const d1 = new Date(t); d1.setDate(t.getDate() - 2);
  const d2 = new Date(t); d2.setDate(t.getDate() - 1);
  const d3 = new Date(t); d3.setDate(t.getDate() + 1);
  const d4 = new Date(t); d4.setDate(t.getDate() + 3);
  const fmt = (d) => d.toISOString().split('T')[0];

  chores = [
    { id: uid(), title: 'Mop the floor', assignee: 'm1', status: 'done', createdAt: fmt(d1), dueDate: fmt(d2) },
    { id: uid(), title: 'Take out trash', assignee: 'm3', status: 'done', createdAt: fmt(d1), dueDate: fmt(d2) },
    { id: uid(), title: 'Cook dinner', assignee: 'm2', status: 'done', createdAt: fmt(d1), dueDate: fmt(d2) },
    { id: uid(), title: 'Wash dishes', assignee: 'm1', status: 'done', createdAt: fmt(d1), dueDate: fmt(d2) },
    { id: uid(), title: 'Do laundry', assignee: 'm3', status: 'done', createdAt: fmt(d1), dueDate: fmt(d2) },
    { id: uid(), title: 'Hang laundry', assignee: 'm2', status: 'done', createdAt: fmt(d1), dueDate: fmt(d2) },
    { id: uid(), title: 'Pay internet bill', assignee: 'm1', status: 'done', createdAt: fmt(d1), dueDate: fmt(d2) },
    { id: uid(), title: 'Buy water', assignee: 'm3', status: 'in-progress', createdAt: fmt(d2), dueDate: fmt(d3) },
    { id: uid(), title: 'Clean kitchen', assignee: 'm2', status: 'in-progress', createdAt: fmt(d2), dueDate: fmt(d3) },
    { id: uid(), title: 'Clean bathroom', assignee: null, status: 'not-assigned', createdAt: fmt(d2), dueDate: fmt(d4) },
    { id: uid(), title: 'Sweep yard', assignee: null, status: 'not-assigned', createdAt: fmt(d2), dueDate: fmt(d4) },
    { id: uid(), title: 'Buy fruits', assignee: 'm1', status: 'todo', createdAt: fmt(d2), dueDate: fmt(d4) },
    { id: uid(), title: 'Water plants', assignee: 'm2', status: 'todo', createdAt: fmt(d2), dueDate: fmt(d4) }
  ];
  expenses = [
    { id: uid(), description: 'Electricity bill', category: 'Utilities', amount: 850000, paidBy: 'm2', splitAmong: ['m1', 'm2', 'm3'], date: fmt(d2), settled: 'false' },
    { id: uid(), description: 'Buy detergent', category: 'Supplies', amount: 95000, paidBy: 'm1', splitAmong: ['m1', 'm2'], date: fmt(d1), settled: 'pending' },
    { id: uid(), description: 'Water bill', category: 'Utilities', amount: 120000, paidBy: 'm3', splitAmong: ['m1', 'm2', 'm3'], date: fmt(d1), settled: 'true' }
  ];
  persist();
}

// 2. Navigation Logic
const navLinks = document.querySelectorAll('.nav-link');
const appContent = document.getElementById('app-content');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    renderView(link.dataset.target);
  });
});

function formatMoney(amount) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

function getMember(id) { return members.find(m => m.id === id) || {name: 'Unknown', avatar: '?', color: '#ccc'}; }

function isOverdue(dueDate) {
  if(!dueDate) return false;
  return new Date(dueDate).getTime() < new Date().setHours(0,0,0,0);
}

// 3. Views
function renderView(view) {
  let html = '';
  switch(view) {
    case 'kanban': html = renderKanban(); break;
    case 'ledger': html = renderLedger(); break;
    case 'settle': html = renderSettleUp(); break;
  }
  appContent.innerHTML = html;
}

// -- KANBAN VIEW (TailAdmin-style: 3 swim-lanes, breadcrumb, filter pills) --
let currentTaskGroup = 'All';

function setTaskGroup(group) {
  currentTaskGroup = group;
  renderView('kanban');
}

function toggleLaneMenu(idx, e) {
  if (e) e.stopPropagation();
  document.querySelectorAll('.swim-lane-dropdown').forEach(d => {
    if (d.dataset.idx !== String(idx)) d.classList.remove('open');
  });
  const dd = document.querySelector(`.swim-lane-dropdown[data-idx="${idx}"]`);
  if (dd) dd.classList.toggle('open');
}


function renderKanban() {
  const toDo = chores.filter(c => c.status === 'not-assigned' || c.status === 'todo');
  const inProgress = chores.filter(c => c.status === 'in-progress');
  const completed = chores.filter(c => c.status === 'done');
  const all = chores;

  const counts = {
    All: all.length,
    Todo: toDo.length,
    InProgress: inProgress.length,
    Completed: completed.length
  };

  const filtered = {
    All: all,
    Todo: toDo,
    InProgress: inProgress,
    Completed: completed
  };

  const inferTag = (c) => {
    const t = (c.title || '').toLowerCase();
    if (t.includes('cook') || t.includes('wash') || t.includes('clean') || t.includes('mop') || t.includes('sweep') || t.includes('laundry')) return { label: 'Chore', color: 'brand' };
    if (t.includes('trash') || t.includes('bill') || t.includes('pay')) return { label: 'Urgent', color: 'warning' };
    return { label: 'Task', color: 'success' };
  };

  const getTagHtml = (tag) => {
    if (!tag) return '';
    if (tag.color === 'warning') {
      return `<span class="text-theme-xs mt-3 inline-flex rounded-full bg-orange-400/10 px-2 py-0.5 font-medium text-orange-400">${tag.label}</span>`;
    } else if (tag.color === 'success') {
      return `<span class="bg-success-50 text-theme-xs text-success-700 dark:bg-success-500/15 dark:text-success-500 mt-3 inline-flex rounded-full px-2 py-0.5 font-medium">${tag.label}</span>`;
    }
    return `<span class="bg-brand-50 text-theme-xs text-brand-500 dark:bg-brand-500/15 dark:text-brand-400 mt-3 inline-flex rounded-full px-2 py-0.5 font-medium">${tag.label}</span>`;
  };

  const renderCard = (c) => {
    const m = getMember(c.assignee);
    const tag = inferTag(c);
    const seedComments = (c.title.length + c.id.length) % 5;
    const seedAttachments = (c.title.length * 2) % 3;
    const formattedDate = c.dueDate ? formatRelativeDate(c.dueDate) : 'No date';

    return `
      <div draggable="true" class="task group relative shadow-theme-sm rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/5 mb-5 cursor-move hover:border-brand-500 transition-colors">
        <div class="absolute top-3 right-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor"><path d="M104,64A16,16,0,1,1,88,48,16,16,0,0,1,104,64Zm56-16a16,16,0,1,0,16,16A16,16,0,0,0,160,48ZM88,112a16,16,0,1,0,16,16A16,16,0,0,0,88,112Zm72,0a16,16,0,1,0,16,16A16,16,0,0,0,160,112ZM88,176a16,16,0,1,0,16,16A16,16,0,0,0,88,176Zm72,0a16,16,0,1,0,16,16A16,16,0,0,0,160,176Z"></path></svg>
        </div>
        <div class="flex items-start justify-between gap-6">
          <div>
            <h4 class="mb-3 text-base text-gray-800 dark:text-white/90">
              ${c.title}
            </h4>

            <div class="flex items-center gap-3 flex-wrap">
              <span class="flex cursor-pointer items-center gap-1 text-sm text-gray-700 font-medium dark:text-gray-300">
                <svg class="fill-current text-gray-500" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M5.33329 1.0835C5.74751 1.0835 6.08329 1.41928 6.08329 1.8335V2.25016L9.91663 2.25016V1.8335C9.91663 1.41928 10.2524 1.0835 10.6666 1.0835C11.0808 1.0835 11.4166 1.41928 11.4166 1.8335V2.25016L12.3333 2.25016C13.2998 2.25016 14.0833 3.03366 14.0833 4.00016V6.00016L14.0833 12.6668C14.0833 13.6333 13.2998 14.4168 12.3333 14.4168L3.66663 14.4168C2.70013 14.4168 1.91663 13.6333 1.91663 12.6668L1.91663 6.00016L1.91663 4.00016C1.91663 3.03366 2.70013 2.25016 3.66663 2.25016L4.58329 2.25016V1.8335C4.58329 1.41928 4.91908 1.0835 5.33329 1.0835ZM5.33329 3.75016L3.66663 3.75016C3.52855 3.75016 3.41663 3.86209 3.41663 4.00016V5.25016L12.5833 5.25016V4.00016C12.5833 3.86209 12.4714 3.75016 12.3333 3.75016L10.6666 3.75016L5.33329 3.75016ZM12.5833 6.75016L3.41663 6.75016L3.41663 12.6668C3.41663 12.8049 3.52855 12.9168 3.66663 12.9168L12.3333 12.9168C12.4714 12.9168 12.5833 12.8049 12.5833 12.6668L12.5833 6.75016Z" fill=""></path>
                </svg>
                ${formattedDate}
              </span>

              <span class="flex cursor-pointer items-center gap-1 text-sm text-gray-700 font-medium dark:text-gray-300">
                <svg class="stroke-current text-gray-500" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 15.6343C12.6244 15.6343 15.5625 12.6961 15.5625 9.07178C15.5625 5.44741 12.6244 2.50928 9 2.50928C5.37563 2.50928 2.4375 5.44741 2.4375 9.07178C2.4375 10.884 3.17203 12.5246 4.35961 13.7122L2.4375 15.6343H9Z" stroke="" stroke-width="1.5" stroke-linejoin="round"></path>
                </svg>
                ${seedComments}
              </span>
              
              ${seedAttachments > 0 ? `<span class="flex cursor-pointer items-center gap-1 text-sm text-gray-700 font-medium dark:text-gray-300">
                <svg class="fill-current text-gray-500" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M6.88066 3.10905C8.54039 1.44932 11.2313 1.44933 12.8911 3.10906C14.5508 4.76878 14.5508 7.45973 12.8911 9.11946L12.0657 9.94479L11.0051 8.88413L11.8304 8.0588C12.9043 6.98486 12.9043 5.24366 11.8304 4.16972C10.7565 3.09577 9.01526 3.09577 7.94132 4.16971L7.11599 4.99504L6.05533 3.93438L6.88066 3.10905ZM8.88376 11.0055L9.94442 12.0661L9.11983 12.8907C7.4601 14.5504 4.76915 14.5504 3.10942 12.8907C1.44969 11.231 1.44969 8.54002 3.10942 6.88029L3.93401 6.0557L4.99467 7.11636L4.17008 7.94095C3.09614 9.01489 3.09614 10.7561 4.17008 11.83C5.24402 12.904 6.98522 12.904 8.05917 11.83L8.88376 11.0055ZM9.94458 7.11599C10.2375 6.8231 10.2375 6.34823 9.94458 6.05533C9.65169 5.76244 9.17682 5.76244 8.88392 6.05533L6.0555 8.88376C5.7626 9.17665 5.7626 9.65153 6.0555 9.94442C6.34839 10.2373 6.82326 10.2373 7.11616 9.94442L9.94458 7.11599Z" fill=""></path>
                </svg>
                ${seedAttachments}
              </span>` : ''}
            </div>

            ${getTagHtml(tag)}
            
            <div class="mt-6 flex gap-2">
               ${c.status === 'not-assigned' ? `<button class="text-xs font-medium text-brand-500 bg-brand-50 px-3 py-1 rounded-md" onclick="app.autoAssign('${c.id}')">Auto-Assign</button>` : ''}
               ${c.status === 'todo' ? `<button class="text-xs font-medium text-brand-500 bg-brand-50 px-3 py-1 rounded-md hover:bg-brand-100" onclick="app.startChore('${c.id}')">Start</button><button class="text-xs font-medium text-gray-500 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md" onclick="app.autoAssign('${c.id}')">Reassign</button>` : ''}
               ${c.status === 'in-progress' ? `<button class="text-xs font-medium text-white bg-success-600 hover:bg-success-700 px-3 py-1 rounded-md" onclick="app.completeChore('${c.id}')">Complete</button><button class="text-xs font-medium text-gray-500 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md" onclick="app.autoAssign('${c.id}')">Reassign</button>` : ''}
               ${c.status === 'done' ? `<button class="text-xs font-medium text-gray-500 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md" onclick="app.reopenChore('${c.id}')">Reopen</button>` : ''}
            </div>
          </div>

          ${c.assignee ? `
          <div class="h-8 w-8 overflow-hidden rounded-full border-[0.5px] border-gray-200 dark:border-gray-800 flex items-center justify-center text-white text-xs font-bold shrink-0" style="background: ${m.color}">
            ${m.avatar}
          </div>` : ''}
        </div>
      </div>
    `;
  };

  const renderLane = (title, count, items, colorCls) => `
    <div class="swim-lane flex flex-col gap-5 p-4 xl:p-6 ${title === 'In Progress' ? 'border-x border-gray-200 dark:border-gray-800' : ''}">
      <div class="mb-1 flex items-center justify-between">
        <h3 class="flex items-center gap-3 text-base font-medium text-gray-800 dark:text-white/90">
          ${title}
          <span class="${colorCls} text-theme-xs inline-flex rounded-full px-2 py-0.5 font-medium">
            ${count}
          </span>
        </h3>
      </div>
      <div>
        ${items.length === 0 ? `<div class="text-center p-6 border border-dashed border-gray-300 rounded-xl text-gray-500 text-sm">No tasks</div>` : items.map(renderCard).join('')}
      </div>
    </div>
  `;

  const progressPercent = all.length === 0 ? 0 : Math.round((completed.length / all.length) * 100);
  const progressBarHtml = `
    <div class="mb-6 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <div class="flex items-center justify-between mb-3">
        <span class="text-sm font-semibold text-gray-800 dark:text-gray-200">Overall Progress</span>
        <span class="text-sm font-bold text-success-600 dark:text-success-500">Completed ${completed.length}/${all.length} tasks</span>
      </div>
      <div class="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden dark:bg-gray-800">
        <div class="h-full bg-success-500 transition-all duration-500" style="width: ${progressPercent}%"></div>
      </div>
    </div>
  `;

  return `
    <div class="mx-auto max-w-(--breakpoint-2xl) p-4 pb-20 md:p-6 md:pb-6">
      ${progressBarHtml}
      <!-- Main Kanban Wrapper -->
      <div class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        
        <!-- Filters Header -->
        <div class="flex flex-col items-center px-4 py-5 xl:px-6 xl:py-6">
          <div class="flex flex-col w-full gap-5 sm:justify-between xl:flex-row xl:items-center">
            
            <div class="flex flex-wrap items-center gap-x-1 gap-y-2 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-900">
              <button class="inline-flex focus:outline-none items-center gap-2 px-4 py-2 text-sm font-medium rounded-md group ${currentTaskGroup === 'All' ? 'text-gray-900 bg-white shadow-sm dark:bg-gray-800 dark:text-white' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'}" onclick="setTaskGroup('All')">
                All Tasks
                <span class="${currentTaskGroup === 'All' ? 'bg-brand-50 text-brand-500 dark:bg-brand-500/15 dark:text-brand-400' : 'bg-white text-gray-500 group-hover:bg-brand-50 group-hover:text-brand-500 dark:bg-white/[0.03] dark:group-hover:bg-brand-500/15 dark:group-hover:text-brand-400'} inline-flex rounded-full px-2 py-0.5 text-xs font-medium leading-normal">
                  ${counts.All}
                </span>
              </button>

              <button class="inline-flex focus:outline-none items-center gap-2 px-4 py-2 text-sm font-medium rounded-md group ${currentTaskGroup === 'Todo' ? 'text-gray-900 bg-white shadow-sm dark:bg-gray-800 dark:text-white' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'}" onclick="setTaskGroup('Todo')">
                To do
                <span class="${currentTaskGroup === 'Todo' ? 'bg-brand-50 text-brand-500 dark:bg-brand-500/15 dark:text-brand-400' : 'bg-white text-gray-500 group-hover:bg-brand-50 group-hover:text-brand-500 dark:bg-white/[0.03] dark:group-hover:bg-brand-500/15 dark:group-hover:text-brand-400'} inline-flex rounded-full px-2 py-0.5 text-xs font-medium leading-normal">
                  ${counts.Todo}
                </span>
              </button>

              <button class="inline-flex focus:outline-none items-center gap-2 px-4 py-2 text-sm font-medium rounded-md group ${currentTaskGroup === 'InProgress' ? 'text-gray-900 bg-white shadow-sm dark:bg-gray-800 dark:text-white' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'}" onclick="setTaskGroup('InProgress')">
                In Progress
                <span class="${currentTaskGroup === 'InProgress' ? 'bg-brand-50 text-brand-500 dark:bg-brand-500/15 dark:text-brand-400' : 'bg-white text-gray-500 group-hover:bg-brand-50 group-hover:text-brand-500 dark:bg-white/[0.03] dark:group-hover:bg-brand-500/15 dark:group-hover:text-brand-400'} inline-flex rounded-full px-2 py-0.5 text-xs font-medium leading-normal">
                  ${counts.InProgress}
                </span>
              </button>

              <button class="inline-flex focus:outline-none items-center gap-2 px-4 py-2 text-sm font-medium rounded-md group ${currentTaskGroup === 'Completed' ? 'text-gray-900 bg-white shadow-sm dark:bg-gray-800 dark:text-white' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'}" onclick="setTaskGroup('Completed')">
                Completed
                <span class="${currentTaskGroup === 'Completed' ? 'bg-brand-50 text-brand-500 dark:bg-brand-500/15 dark:text-brand-400' : 'bg-white text-gray-500 group-hover:bg-brand-50 group-hover:text-brand-500 dark:bg-white/[0.03] dark:group-hover:bg-brand-500/15 dark:group-hover:text-brand-400'} inline-flex rounded-full px-2 py-0.5 text-xs font-medium leading-normal">
                  ${counts.Completed}
                </span>
              </button>
            </div>

            <div class="flex flex-wrap items-center gap-3 xl:justify-end">
              <button class="inline-flex focus:outline-none items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-white/[0.03]" onclick="alert('Filter modal coming soon')">
                <svg class="fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0826 4.0835C11.0769 4.0835 10.2617 4.89871 10.2617 5.90433C10.2617 6.90995 11.0769 7.72516 12.0826 7.72516C13.0882 7.72516 13.9034 6.90995 13.9034 5.90433C13.9034 4.89871 13.0882 4.0835 12.0826 4.0835ZM2.29004 6.65409H8.84671C9.18662 8.12703 10.5063 9.22516 12.0826 9.22516C13.6588 9.22516 14.9785 8.12703 15.3184 6.65409H17.7067C18.1209 6.65409 18.4567 6.31831 18.4567 5.90409C18.4567 5.48988 18.1209 5.15409 17.7067 5.15409H15.3183C14.9782 3.68139 13.6586 2.5835 12.0826 2.5835C10.5065 2.5835 9.18691 3.68139 8.84682 5.15409H2.29004C1.87583 5.15409 1.54004 5.48988 1.54004 5.90409C1.54004 6.31831 1.87583 6.65409 2.29004 6.65409ZM4.6816 13.3462H2.29085C1.87664 13.3462 1.54085 13.682 1.54085 14.0962C1.54085 14.5104 1.87664 14.8462 2.29085 14.8462H4.68172C5.02181 16.3189 6.34142 17.4168 7.91745 17.4168C9.49348 17.4168 10.8131 16.3189 11.1532 14.8462H17.7075C18.1217 14.8462 18.4575 14.5104 18.4575 14.0962C18.4575 13.682 18.1217 13.3462 17.7075 13.3462H11.1533C10.8134 11.8733 9.49366 10.7752 7.91745 10.7752C6.34124 10.7752 5.02151 11.8733 4.6816 13.3462ZM9.73828 14.096C9.73828 13.0904 8.92307 12.2752 7.91745 12.2752C6.91183 12.2752 6.09662 13.0904 6.09662 14.096C6.09662 15.1016 6.91183 15.9168 7.91745 15.9168C8.92307 15.9168 9.73828 15.1016 9.73828 14.096Z" fill=""></path>
                </svg>
                Filter &amp; Sort
              </button>
              <button class="inline-flex focus:outline-none items-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600" onclick="app.openNewChoreModal()">
                Add New Task
                <svg class="fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M9.2502 4.99951C9.2502 4.5853 9.58599 4.24951 10.0002 4.24951C10.4144 4.24951 10.7502 4.5853 10.7502 4.99951V9.24971H15.0006C15.4148 9.24971 15.7506 9.5855 15.7506 9.99971C15.7506 10.4139 15.4148 10.7497 15.0006 10.7497H10.7502V15.0001C10.7502 15.4143 10.4144 15.7501 10.0002 15.7501C9.58599 15.7501 9.2502 15.4143 9.2502 15.0001V10.7497H5C4.58579 10.7497 4.25 10.4139 4.25 9.99971C4.25 9.5855 4.58579 9.24971 5 9.24971H9.2502V4.99951Z" fill=""></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Swimlanes Grid -->
        <div class="mt-7 grid grid-cols-1 border-t border-gray-200 sm:mt-0 ${currentTaskGroup === 'All' ? 'sm:grid-cols-2 xl:grid-cols-3' : ''} dark:border-gray-800">
          ${currentTaskGroup === 'All' || currentTaskGroup === 'Todo' ? renderLane('To Do', counts.Todo, filtered.Todo, 'bg-gray-100 text-gray-700 dark:bg-white/[0.03] dark:text-white/80') : ''}
          ${currentTaskGroup === 'All' || currentTaskGroup === 'InProgress' ? renderLane('In Progress', counts.InProgress, filtered.InProgress, 'bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-orange-400') : ''}
          ${currentTaskGroup === 'All' || currentTaskGroup === 'Completed' ? renderLane('Completed', counts.Completed, filtered.Completed, 'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500') : ''}
        </div>

      </div>
    </div>
  `;
}


function formatRelativeDate(dateStr) {
  if (!dateStr) return 'No date';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return 'Invalid date';
  const today = new Date(); today.setHours(0,0,0,0);
  d.setHours(0,0,0,0);
  const diff = Math.round((d - today) / (1000*60*60*24));
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Tomorrow';
  if (diff === -1) return 'Yesterday';
  if (diff < 0) {
    if (Math.abs(diff) > 365) return 'Overdue';
    return `${Math.abs(diff)}d overdue`;
  }
  if (diff < 7) return `In ${diff} days`;
  return dateStr;
}

// -- LEDGER VIEW --
function renderLedger() {
  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const totalUnsettled = expenses.filter(e => e.settled !== 'true').reduce((s, e) => s + e.amount, 0);
  const settledCount = expenses.filter(e => e.settled === 'true').length;
  const pendingCount = expenses.filter(e => e.settled === 'pending').length;
  const unpaidCount = expenses.filter(e => e.settled === 'false').length;

  return `
    <div class="mx-auto max-w-(--breakpoint-2xl) p-4 pb-20 md:p-6 md:pb-6">
      <div class="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div class="page-breadcrumb-section">
          <div class="breadcrumb-wrap">
            <div class="breadcrumb-row">
              <h2 class="breadcrumb-title">Expenses</h2>
              <nav class="breadcrumb-nav">
                <ol>
                  <li><a href="#">Home</a></li>
                  <li class="current">Expenses</li>
                </ol>
              </nav>
            </div>
          </div>

          <div class="task-group-row" style="background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-2xl);">
            <div class="task-group-pills" style="background: transparent;">
              <div class="task-group-pill active" style="cursor:default;">All <span class="count-chip">${expenses.length}</span></div>
              <div class="task-group-pill" style="cursor:default;">Unpaid <span class="count-chip" style="background: var(--warning-50); color: var(--warning-700); border-color: transparent;">${unpaidCount}</span></div>
              <div class="task-group-pill" style="cursor:default;">Pending <span class="count-chip" style="background: var(--warning-50); color: var(--warning-700); border-color: transparent;">${pendingCount}</span></div>
              <div class="task-group-pill" style="cursor:default;">Settled <span class="count-chip" style="background: var(--success-50); color: var(--success-700); border-color: transparent;">${settledCount}</span></div>
            </div>
            <div class="kanban-action-row">
              <button class="btn-add-task" onclick="app.openExpenseModal()">
                <i class="ph-bold ph-plus"></i> Add Expense
              </button>
              <button class="btn-primary" style="background: var(--gray-900);" onclick="renderView('settle')">
                View in Balances <i class="ph-bold ph-arrow-right"></i>
              </button>
            </div>
          </div>

          <div style="display: flex; gap: 16px; flex-wrap: wrap; margin-top: 4px;">
            <div class="card" style="flex: 1; min-width: 200px; padding: 16px 20px;">
              <div style="font-size: 12px; color: var(--text2); font-weight: 600; margin-bottom: 4px;">Total Expenses</div>
              <div style="font-size: 1.4rem; font-weight: 800; color: var(--text);">${formatMoney(totalExpenses)}</div>
            </div>
            <div class="card" style="flex: 1; min-width: 200px; padding: 16px 20px;">
              <div style="font-size: 12px; color: var(--text2); font-weight: 600; margin-bottom: 4px;">Unsettled</div>
              <div style="font-size: 1.4rem; font-weight: 800; color: var(--warning-700);">${formatMoney(totalUnsettled)}</div>
            </div>
            <div class="card" style="flex: 1; min-width: 200px; padding: 16px 20px;">
              <div style="font-size: 12px; color: var(--text2); font-weight: 600; margin-bottom: 4px;">Settled Count</div>
              <div style="font-size: 1.4rem; font-weight: 800; color: var(--success-700);">${settledCount}</div>
            </div>
          </div>

          <div class="card" style="margin-top: 8px; overflow-x: auto;">
            ${expenses.length === 0 ? '<div class="empty-state">No expenses yet. Click Add Expense to create one!</div>' : `
        <table class="data-table" style="min-width: 800px;">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category / Desc</th>
              <th>Paid By</th>
              <th>Split Among</th>
              <th>Amount</th>
              <th>Status / Action</th>
            </tr>
          </thead>
          <tbody>
            ${expenses.map(e => {
              const payer = getMember(e.paidBy);
              let actionHtml = '';
              if(e.settled === 'false') {
                actionHtml = `<button class="btn-primary" style="background: var(--brand-600); color: white; padding: 6px 12px; font-size: 13px;" onclick="app.markSent('${e.id}')">I've sent it</button>`;
              } else if(e.settled === 'pending') {
                actionHtml = `<button class="btn-small btn-confirm" onclick="app.confirmReceived('${e.id}')">Confirm Receipt</button>`;
              } else {
                actionHtml = `<span class="badge badge-paid">SETTLED</span>`;
              }
              
              const splitHtml = (e.splitAmong || ['m1', 'm2', 'm3']).map(mid => {
                const m = getMember(mid);
                return `<div class="nav-avatar" style="background:${m.color}; width: 24px; height: 24px; font-size: 10px; margin-left: -6px; border: 2px solid var(--bg-card); display:inline-flex; align-items:center; justify-content:center; color:white; font-weight:bold; border-radius:50%;" title="${m.name}">${m.avatar}</div>`;
              }).join('');

              return `<tr>
                <td>${e.date}</td>
                <td>
                  <div style="display:flex; flex-direction:column; gap:6px;">
                    <span style="font-weight:600;">${e.description} <i class="ph-bold ph-paperclip" style="color:var(--text3); font-size:14px; margin-left:4px; cursor:pointer;" title="View Attachment"></i></span>
                    <span class="badge" style="width:fit-content; background:var(--brand-50); color:var(--brand-700); border-color:var(--brand-100);">${e.category || 'General'}</span>
                  </div>
                </td>
                <td><div style="display:flex;align-items:center;gap:8px;"><div class="nav-avatar" style="background:${payer.color}">${payer.avatar}</div> ${payer.name}</div></td>
                <td><div style="display:flex; padding-left: 6px;">${splitHtml}</div></td>
                <td style="font-weight:700;">${formatMoney(e.amount)} <div style="font-size:11px; color:var(--text3); font-weight:normal; display:flex; align-items:center; gap:4px; margin-top:2px;"><i class="ph-bold ph-arrows-clockwise"></i> Recurring</div></td>
                <td>
                  <div style="display:flex; align-items:center; gap:8px;">
                    ${e.settled === 'pending' ? '<span class="badge badge-unpaid" title="Needs Payee Confirmation">PENDING</span>' : ''}
                    ${actionHtml}
                    <button class="nav-icon-btn" style="color:var(--text3); border:none;" onclick="alert('Edit expense')"><i class="ph-bold ph-pencil-simple"></i></button>
                    <button class="nav-icon-btn" style="color:var(--red); border:none;" onclick="alert('Delete expense')"><i class="ph-bold ph-trash"></i></button>
                  </div>
                </td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
        `}
          </div>

          <!-- BA Note Alert -->
          <div style="margin-top: 24px; padding: 16px; background: rgba(11, 165, 236, 0.1); border-left: 4px solid var(--brand-500); border-radius: 4px;">
            <h4 style="margin-bottom: 8px; color: var(--brand-600); display: flex; align-items: center; gap: 6px;"><i class="ph-bold ph-info"></i> BA Notes: Expense Rules</h4>
            <ul style="font-size: 13px; color: var(--text2); margin-left: 16px;">
              <li><strong>Split Rule:</strong> Default is Equal Split among selected members. Custom ratio splits are planned for Phase 2.</li>
              <li><strong>Confirmation:</strong> 2-way verification required. Payer clicks "I've sent it", Payee clicks "Confirm Receipt" to fully settle.</li>
              <li><strong>Disputes:</strong> If unconfirmed for >3 days, marked as "Disputed" for group review.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;
}
// -- SETTLE UP VIEW --
function calculateSimplifications() {
  const balances = {};
  members.forEach(m => balances[m.id] = 0);
  
  expenses.filter(e => e.settled !== 'true').forEach(e => {
    const share = Math.floor(e.amount / e.splitAmong.length);
    const remainder = e.amount - (share * e.splitAmong.length);
    e.splitAmong.forEach((mid, idx) => {
      let owes = share + (idx === 0 ? remainder : 0);
      if(mid === e.paidBy) balances[mid] += (e.amount - owes);
      else balances[mid] -= owes;
    });
  });

  let debtors = Object.keys(balances).filter(k => balances[k] < 0).map(k => ({id: k, amount: -balances[k]})).sort((a,b) => b.amount - a.amount);
  let creditors = Object.keys(balances).filter(k => balances[k] > 0).map(k => ({id: k, amount: balances[k]})).sort((a,b) => b.amount - a.amount);
  
  const transactions = [];
  let d = 0, c = 0;
  
  while (d < debtors.length && c < creditors.length) {
    let debtor = debtors[d];
    let creditor = creditors[c];
    let amount = Math.min(debtor.amount, creditor.amount);
    
    transactions.push({ from: debtor.id, to: creditor.id, amount });
    
    debtor.amount -= amount;
    creditor.amount -= amount;
    
    if (debtor.amount < 1) d++;
    if (creditor.amount < 1) c++;
  }
  return transactions;
}

function renderSettleUp() {
  const transactions = calculateSimplifications();
  const totalDebt = transactions.reduce((s, t) => s + t.amount, 0);
  const lastUpdated = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

  return `
    <div class="mx-auto max-w-(--breakpoint-2xl) p-4 pb-20 md:p-6 md:pb-6">
      <div class="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div class="page-breadcrumb-section">
          <div class="breadcrumb-wrap">
            <div class="breadcrumb-row">
              <h2 class="breadcrumb-title">Balances</h2>
              <nav class="breadcrumb-nav">
                <ol>
                  <li><a href="#">Home</a></li>
                  <li class="current">Balances</li>
                </ol>
              </nav>
            </div>
          </div>

          <!-- Total Debt Banner -->
          <div style="background: var(--error-50); border: 1px solid var(--error-100); border-radius: var(--radius-xl); padding: 24px; text-align: center; margin-bottom: 24px; position: relative;">
            <div style="position: absolute; top: 12px; right: 16px; font-size: 13px; color: var(--error-700); opacity: 0.8;"><i class="ph-bold ph-clock"></i> Last updated: ${lastUpdated}</div>
            <div style="font-size: 14px; color: var(--error-700); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">Total Debt</div>
            <div style="font-size: 2.5rem; font-weight: 800; color: var(--error-700);">${formatMoney(totalDebt)}</div>
          </div>

          <!-- Status pills -->
          <div class="task-group-row" style="background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-2xl);">
            <div class="task-group-pills" style="background: transparent;">
              <div class="task-group-pill active" style="cursor:default;">Transactions <span class="count-chip">${transactions.length}</span></div>
              <div class="task-group-pill" style="cursor:default; color: var(--success-700);">Members <span class="count-chip" style="background: var(--success-50); color: var(--success-700); border-color: transparent;">${members.length}</span></div>
              <div class="task-group-pill" style="cursor:pointer;" onclick="alert('Filter by member coming soon')"><i class="ph-bold ph-funnel"></i> My Debts Only</div>
            </div>
          </div>

          <div class="card" style="margin-top:8px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
              <h3 style="margin: 0;">Who owes who?</h3>
              ${transactions.length === 0 ? '<span class="badge badge-paid">ALL CLEAR</span>' : `<span style="font-size: 12px; color: var(--text2);">Min ${transactions.length} transactions to settle up</span>`}
            </div>
            ${transactions.length === 0 ? '<p style="color:var(--text2); text-align:center; padding: 20px 0;">🎉 Everyone is settled up!</p>' : ''}
            <div class="settle-list" style="display:flex; flex-direction: column; gap: 12px;">
              ${transactions.map(t => {
                const fromM = getMember(t.from);
                const toM = getMember(t.to);
                return `<div style="display:flex; align-items:center; justify-content:space-between; padding: 16px; border: 1px solid var(--border); border-radius: 10px; background: var(--bg);">
                  <div style="display:flex; align-items:center; gap:12px;">
                    <div class="nav-avatar" style="background:${fromM.color}">${fromM.avatar}</div>
                    <strong>${fromM.name}</strong>
                    <i class="ph-bold ph-arrow-right" style="color:var(--text2)"></i>
                    <div class="nav-avatar" style="background:${toM.color}">${toM.avatar}</div>
                    <strong>${toM.name}</strong>
                  </div>
                  <div style="display: flex; align-items: center; gap: 16px;">
                    <div style="font-weight: 800; font-size: 1.1rem; color: var(--red);">${formatMoney(t.amount)}</div>
                    <button class="btn-primary" style="background: var(--gray-900); padding: 6px 16px;" onclick="alert('Simulation: Open confirmation popup (Sent -> Confirm Receipt)')">Settle</button>
                    <button class="btn-primary" style="background: var(--pink); padding: 6px 10px;" onclick="alert('Payment Method: Open MoMo / Bank Transfer details')" title="Pay via MoMo / Bank"><i class="ph-bold ph-wallet"></i></button>
                  </div>
                </div>`;
              }).join('')}
            </div>
            
            <div style="margin-top: 32px; border-top: 1px dashed var(--border); padding-top: 24px;">
              <h3 style="margin-bottom: 16px; font-size: 16px;">Settlement History</h3>
              <div style="font-size: 13.5px; color: var(--text2); display: flex; align-items: center; gap: 12px; background: var(--gray-50); padding: 12px; border-radius: 8px;">
                <i class="ph-fill ph-check-circle" style="color: var(--success-500); font-size: 20px;"></i>
                <span style="flex:1;"><strong>Nghĩa</strong> paid <strong>Roommate A</strong> ${formatMoney(150000)} via MoMo</span>
                <span style="font-size:12px; color:var(--text3);">Yesterday, 14:30</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}


// 4. Application Methods
window.app = {
  autoAssign: function(choreId) {
    const doneChores = chores.filter(c => c.status === 'done');
    const counts = members.map(m => {
      return { id: m.id, name: m.name, count: doneChores.filter(c => c.assignee === m.id).length };
    });
    
    // Sort by count asc, then by name asc (Tie-breaker rule)
    counts.sort((a, b) => {
      if(a.count !== b.count) return a.count - b.count;
      return a.name.localeCompare(b.name); // Alphabetical tie-breaker
    });
    
    const assignee = counts[0].id;
    const c = chores.find(x => x.id === choreId);
    if(c) {
      c.assignee = assignee;
      c.status = 'todo';
      persist();
      renderView('kanban');
      alert(`Auto-assigned to ${counts[0].name}\n\nTie-breaking Rule Applied: Selection based on lowest completion count (${counts[0].count}). In case of tie, alphabetical order is prioritized.`);
    }
  },
  startChore: function(id) {
    const c = chores.find(x => x.id === id);
    if(c) { c.status = 'in-progress'; persist(); renderView('kanban'); }
  },
  completeChore: function(id) {
    const c = chores.find(x => x.id === id);
    if(c) { c.status = 'done'; persist(); renderView('kanban'); }
  },
  reopenChore: function(id) {
    const c = chores.find(x => x.id === id);
    if(c) { c.status = 'todo'; persist(); renderView('kanban'); }
  },
  clearLane: function(laneTitle) {
    const map = { 'To Do': ['not-assigned','todo'], 'In Progress': ['in-progress'], 'Completed': ['done'] };
    const statuses = map[laneTitle];
    if (!statuses) return;
    if (!confirm(`Clear all tasks in lane "${laneTitle}"?`)) return;
    chores = chores.filter(c => !statuses.includes(c.status));
    persist();
    renderView('kanban');
  },
  markSent: function(id) {
    const e = expenses.find(x => x.id === id);
    if(e) { e.settled = 'pending'; persist(); renderView('ledger'); }
  },
  confirmReceived: function(id) {
    // Chỉ payee (người trả tiền ban đầu) mới có quyền xác nhận
    const e = expenses.find(x => x.id === id);
    if(e) { e.settled = 'true'; persist(); renderView('ledger'); }
  },
  openNewChoreModal: function() {
    const modalHtml = `
      <div class="modal-card">
        <button class="modal-close" onclick="document.getElementById('modal-overlay').classList.remove('active')">&times;</button>
        <h2 style="margin-bottom: 20px;">Add New Chore</h2>
        <div style="margin-bottom:16px;">
          <label style="display:block;margin-bottom:8px;font-weight:600">Chore Name</label>
          <input type="text" id="new-chore-title" style="width:100%;padding:10px;border:1px solid var(--border);border-radius:6px;">
        </div>
        <div style="margin-bottom:16px;">
          <label style="display:block;margin-bottom:8px;font-weight:600">Due Date</label>
          <input type="date" id="new-chore-due" style="width:100%;padding:10px;border:1px solid var(--border);border-radius:6px;">
        </div>
        <button class="btn-primary" style="width:100%;justify-content:center" onclick="app.saveChore()">Create & Auto-Assign</button>
      </div>
    `;
    const overlay = document.getElementById('modal-overlay');
    overlay.innerHTML = modalHtml;
    overlay.classList.add('active');
  },
  saveChore: function() {
    const title = document.getElementById('new-chore-title').value;
    const due = document.getElementById('new-chore-due').value;
    if(!title || !due) return alert('Fill all fields');
    
    const newId = uid();
    chores.push({ id: newId, title, assignee: null, status: 'not-assigned', createdAt: new Date().toISOString().split('T')[0], dueDate: due });
    persist();
    document.getElementById('modal-overlay').classList.remove('active');
    app.autoAssign(newId);
  },
  openExpenseModal: function() {
    const modalHtml = `
      <div class="modal-card">
        <button class="modal-close" onclick="document.getElementById('modal-overlay').classList.remove('active')">&times;</button>
        <h2 style="margin-bottom: 20px;">Add Expense</h2>
        <div style="margin-bottom:16px;">
          <label style="display:block;margin-bottom:8px;font-weight:600">Description</label>
          <input type="text" id="new-exp-desc" style="width:100%;padding:10px;border:1px solid var(--border);border-radius:6px;">
        </div>
        <div style="margin-bottom:16px;">
          <label style="display:block;margin-bottom:8px;font-weight:600">Amount (VND)</label>
          <input type="number" id="new-exp-amt" style="width:100%;padding:10px;border:1px solid var(--border);border-radius:6px;">
        </div>
        <div style="margin-bottom:16px;">
          <label style="display:block;margin-bottom:8px;font-weight:600">Paid By</label>
          <select id="new-exp-payer" style="width:100%;padding:10px;border:1px solid var(--border);border-radius:6px;">
            ${members.map(m => `<option value="${m.id}">${m.name}</option>`).join('')}
          </select>
        </div>
        <button class="btn-primary" style="width:100%;justify-content:center" onclick="app.saveExpense()">Add Expense</button>
      </div>
    `;
    const overlay = document.getElementById('modal-overlay');
    overlay.innerHTML = modalHtml;
    overlay.classList.add('active');
  },
  saveExpense: function() {
    const desc = document.getElementById('new-exp-desc').value;
    const amt = parseInt(document.getElementById('new-exp-amt').value);
    const payer = document.getElementById('new-exp-payer').value;
    if(!desc || !amt) return alert('Fill all fields');
    expenses.push({
      id: uid(), description: desc, amount: amt, paidBy: payer, splitAmong: ['m1','m2','m3'], date: new Date().toISOString().split('T')[0], settled: 'false'
    });
    persist();
    document.getElementById('modal-overlay').classList.remove('active');
    renderView('ledger');
  }
};

// Run initial
renderView('kanban');

// Click outside to close swim-lane dropdown
document.addEventListener('click', (e) => {
  if (!e.target.closest('.swim-lane-options-wrap')) {
    document.querySelectorAll('.swim-lane-dropdown.open').forEach(d => d.classList.remove('open'));
  }
});
