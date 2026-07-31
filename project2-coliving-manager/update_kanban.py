import re

with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the renderKanban function
new_render_kanban = '''
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
    if (t.includes('nấu') || t.includes('nau') || t.includes('rửa') || t.includes('rua') || t.includes('lau') || t.includes('dọn') || t.includes('don')) return { label: 'Chore', color: 'brand' };
    if (t.includes('đổ') || t.includes('do') || t.includes('rác') || t.includes('rac')) return { label: 'Urgent', color: 'warning' };
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
      <div draggable="true" class="task shadow-theme-sm rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/5 mb-5 cursor-move hover:border-brand-500 transition-colors">
        <div class="flex items-start justify-between gap-6">
          <div>
            <h4 class="mb-3 text-base text-gray-800 dark:text-white/90">
              ${c.title}
            </h4>

            <div class="flex items-center gap-3 flex-wrap">
              <span class="flex cursor-pointer items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                <svg class="fill-current" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M5.33329 1.0835C5.74751 1.0835 6.08329 1.41928 6.08329 1.8335V2.25016L9.91663 2.25016V1.8335C9.91663 1.41928 10.2524 1.0835 10.6666 1.0835C11.0808 1.0835 11.4166 1.41928 11.4166 1.8335V2.25016L12.3333 2.25016C13.2998 2.25016 14.0833 3.03366 14.0833 4.00016V6.00016L14.0833 12.6668C14.0833 13.6333 13.2998 14.4168 12.3333 14.4168L3.66663 14.4168C2.70013 14.4168 1.91663 13.6333 1.91663 12.6668L1.91663 6.00016L1.91663 4.00016C1.91663 3.03366 2.70013 2.25016 3.66663 2.25016L4.58329 2.25016V1.8335C4.58329 1.41928 4.91908 1.0835 5.33329 1.0835ZM5.33329 3.75016L3.66663 3.75016C3.52855 3.75016 3.41663 3.86209 3.41663 4.00016V5.25016L12.5833 5.25016V4.00016C12.5833 3.86209 12.4714 3.75016 12.3333 3.75016L10.6666 3.75016L5.33329 3.75016ZM12.5833 6.75016L3.41663 6.75016L3.41663 12.6668C3.41663 12.8049 3.52855 12.9168 3.66663 12.9168L12.3333 12.9168C12.4714 12.9168 12.5833 12.8049 12.5833 12.6668L12.5833 6.75016Z" fill=""></path>
                </svg>
                ${formattedDate}
              </span>

              <span class="flex cursor-pointer items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                <svg class="stroke-current" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 15.6343C12.6244 15.6343 15.5625 12.6961 15.5625 9.07178C15.5625 5.44741 12.6244 2.50928 9 2.50928C5.37563 2.50928 2.4375 5.44741 2.4375 9.07178C2.4375 10.884 3.17203 12.5246 4.35961 13.7122L2.4375 15.6343H9Z" stroke="" stroke-width="1.5" stroke-linejoin="round"></path>
                </svg>
                ${seedComments}
              </span>
              
              ${seedAttachments > 0 ? `<span class="flex cursor-pointer items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                <svg class="fill-current" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M6.88066 3.10905C8.54039 1.44932 11.2313 1.44933 12.8911 3.10906C14.5508 4.76878 14.5508 7.45973 12.8911 9.11946L12.0657 9.94479L11.0051 8.88413L11.8304 8.0588C12.9043 6.98486 12.9043 5.24366 11.8304 4.16972C10.7565 3.09577 9.01526 3.09577 7.94132 4.16971L7.11599 4.99504L6.05533 3.93438L6.88066 3.10905ZM8.88376 11.0055L9.94442 12.0661L9.11983 12.8907C7.4601 14.5504 4.76915 14.5504 3.10942 12.8907C1.44969 11.231 1.44969 8.54002 3.10942 6.88029L3.93401 6.0557L4.99467 7.11636L4.17008 7.94095C3.09614 9.01489 3.09614 10.7561 4.17008 11.83C5.24402 12.904 6.98522 12.904 8.05917 11.83L8.88376 11.0055ZM9.94458 7.11599C10.2375 6.8231 10.2375 6.34823 9.94458 6.05533C9.65169 5.76244 9.17682 5.76244 8.88392 6.05533L6.0555 8.88376C5.7626 9.17665 5.7626 9.65153 6.0555 9.94442C6.34839 10.2373 6.82326 10.2373 7.11616 9.94442L9.94458 7.11599Z" fill=""></path>
                </svg>
                ${seedAttachments}
              </span>` : ''}
            </div>

            ${getTagHtml(tag)}
            
            <div class="mt-4 flex gap-2">
               ${c.status === 'not-assigned' ? `<button class="text-xs font-medium text-brand-500 bg-brand-50 px-3 py-1 rounded-md" onclick="app.autoAssign('${c.id}')">Auto-Assign</button>` : ''}
               ${c.status === 'todo' ? `<button class="text-xs font-medium text-brand-500 bg-brand-50 px-3 py-1 rounded-md hover:bg-brand-100" onclick="app.startChore('${c.id}')">Start</button><button class="text-xs font-medium text-gray-500 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md" onclick="app.autoAssign('${c.id}')">Reassign</button>` : ''}
               ${c.status === 'in-progress' ? `<button class="text-xs font-medium text-success-700 bg-success-50 hover:bg-success-100 px-3 py-1 rounded-md" onclick="app.completeChore('${c.id}')">Complete</button><button class="text-xs font-medium text-gray-500 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md" onclick="app.autoAssign('${c.id}')">Reassign</button>` : ''}
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

  return `
    <div class="mx-auto max-w-(--breakpoint-2xl) p-4 pb-20 md:p-6 md:pb-6">
      <!-- Breadcrumb -->
      <div class="flex flex-wrap items-center justify-between gap-3 pb-6">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-white/90">Kanban</h2>
        <nav>
          <ol class="flex items-center gap-1.5">
            <li><a class="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-500" href="#">Home
              <svg class="stroke-current" width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366" stroke="" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </a></li>
            <li class="text-sm text-gray-800 dark:text-white/90">Kanban</li>
          </ol>
        </nav>
      </div>

      <!-- Main Kanban Wrapper -->
      <div class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        
        <!-- Filters Header -->
        <div class="flex flex-col items-center px-4 py-5 xl:px-6 xl:py-6">
          <div class="flex flex-col w-full gap-5 sm:justify-between xl:flex-row xl:items-center">
            
            <div class="flex flex-wrap items-center gap-x-1 gap-y-2 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-900">
              <button class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md group ${currentTaskGroup === 'All' ? 'text-gray-900 bg-white shadow-sm dark:bg-gray-800 dark:text-white' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'}" onclick="setTaskGroup('All')">
                All Tasks
                <span class="${currentTaskGroup === 'All' ? 'bg-brand-50 text-brand-500 dark:bg-brand-500/15 dark:text-brand-400' : 'bg-white text-gray-500 group-hover:bg-brand-50 group-hover:text-brand-500 dark:bg-white/[0.03] dark:group-hover:bg-brand-500/15 dark:group-hover:text-brand-400'} inline-flex rounded-full px-2 py-0.5 text-xs font-medium leading-normal">
                  ${counts.All}
                </span>
              </button>

              <button class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md group ${currentTaskGroup === 'Todo' ? 'text-gray-900 bg-white shadow-sm dark:bg-gray-800 dark:text-white' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'}" onclick="setTaskGroup('Todo')">
                To do
                <span class="${currentTaskGroup === 'Todo' ? 'bg-brand-50 text-brand-500 dark:bg-brand-500/15 dark:text-brand-400' : 'bg-white text-gray-500 group-hover:bg-brand-50 group-hover:text-brand-500 dark:bg-white/[0.03] dark:group-hover:bg-brand-500/15 dark:group-hover:text-brand-400'} inline-flex rounded-full px-2 py-0.5 text-xs font-medium leading-normal">
                  ${counts.Todo}
                </span>
              </button>

              <button class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md group ${currentTaskGroup === 'InProgress' ? 'text-gray-900 bg-white shadow-sm dark:bg-gray-800 dark:text-white' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'}" onclick="setTaskGroup('InProgress')">
                In Progress
                <span class="${currentTaskGroup === 'InProgress' ? 'bg-brand-50 text-brand-500 dark:bg-brand-500/15 dark:text-brand-400' : 'bg-white text-gray-500 group-hover:bg-brand-50 group-hover:text-brand-500 dark:bg-white/[0.03] dark:group-hover:bg-brand-500/15 dark:group-hover:text-brand-400'} inline-flex rounded-full px-2 py-0.5 text-xs font-medium leading-normal">
                  ${counts.InProgress}
                </span>
              </button>

              <button class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md group ${currentTaskGroup === 'Completed' ? 'text-gray-900 bg-white shadow-sm dark:bg-gray-800 dark:text-white' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'}" onclick="setTaskGroup('Completed')">
                Completed
                <span class="${currentTaskGroup === 'Completed' ? 'bg-brand-50 text-brand-500 dark:bg-brand-500/15 dark:text-brand-400' : 'bg-white text-gray-500 group-hover:bg-brand-50 group-hover:text-brand-500 dark:bg-white/[0.03] dark:group-hover:bg-brand-500/15 dark:group-hover:text-brand-400'} inline-flex rounded-full px-2 py-0.5 text-xs font-medium leading-normal">
                  ${counts.Completed}
                </span>
              </button>
            </div>

            <div class="flex flex-wrap items-center gap-3 xl:justify-end">
              <button class="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-white/[0.03]" onclick="alert('Filter modal coming soon')">
                <svg class="fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0826 4.0835C11.0769 4.0835 10.2617 4.89871 10.2617 5.90433C10.2617 6.90995 11.0769 7.72516 12.0826 7.72516C13.0882 7.72516 13.9034 6.90995 13.9034 5.90433C13.9034 4.89871 13.0882 4.0835 12.0826 4.0835ZM2.29004 6.65409H8.84671C9.18662 8.12703 10.5063 9.22516 12.0826 9.22516C13.6588 9.22516 14.9785 8.12703 15.3184 6.65409H17.7067C18.1209 6.65409 18.4567 6.31831 18.4567 5.90409C18.4567 5.48988 18.1209 5.15409 17.7067 5.15409H15.3183C14.9782 3.68139 13.6586 2.5835 12.0826 2.5835C10.5065 2.5835 9.18691 3.68139 8.84682 5.15409H2.29004C1.87583 5.15409 1.54004 5.48988 1.54004 5.90409C1.54004 6.31831 1.87583 6.65409 2.29004 6.65409ZM4.6816 13.3462H2.29085C1.87664 13.3462 1.54085 13.682 1.54085 14.0962C1.54085 14.5104 1.87664 14.8462 2.29085 14.8462H4.68172C5.02181 16.3189 6.34142 17.4168 7.91745 17.4168C9.49348 17.4168 10.8131 16.3189 11.1532 14.8462H17.7075C18.1217 14.8462 18.4575 14.5104 18.4575 14.0962C18.4575 13.682 18.1217 13.3462 17.7075 13.3462H11.1533C10.8134 11.8733 9.49366 10.7752 7.91745 10.7752C6.34124 10.7752 5.02151 11.8733 4.6816 13.3462ZM9.73828 14.096C9.73828 13.0904 8.92307 12.2752 7.91745 12.2752C6.91183 12.2752 6.09662 13.0904 6.09662 14.096C6.09662 15.1016 6.91183 15.9168 7.91745 15.9168C8.92307 15.9168 9.73828 15.1016 9.73828 14.096Z" fill=""></path>
                </svg>
                Filter &amp; Sort
              </button>
              <button class="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600" onclick="app.openNewChoreModal()">
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
'''

new_content = re.sub(r'function renderKanban\(\) \{[\s\S]*?return `[\s\S]*?    </div>\n  `;\n}', new_render_kanban, content)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Updated app.js")

with open('index.html', 'r', encoding='utf-8') as f:
    idx_html = f.read()

if 'cdn.tailwindcss.com' not in idx_html:
    # Set tailwind config so it doesn't break the existing generic tags like p, h1, etc. using preflight
    tailwind_script = '''
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      corePlugins: {
        preflight: false,
      }
    }
  </script>
'''
    idx_html = idx_html.replace('</head>', f'{tailwind_script}</head>')
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(idx_html)
    print("Injected tailwind into index.html")
