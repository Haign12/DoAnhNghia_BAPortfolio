// ============================================================
// Requirements Management Tool — App Logic
// ============================================================

Chart.defaults.color = '#8b8fa3';
Chart.defaults.borderColor = 'rgba(255,255,255,0.06)';
Chart.defaults.font.family = "'Inter', sans-serif";

let currentFilter = 'all';
let currentSprint = 'Sprint 5';
let charts = {};

document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupFilters();
  setupModal();
  setupMobileMenu();
  renderAll();
});

// ============================================================
// Navigation
// ============================================================
function setupNavigation() {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', e => {
      if (!item.hasAttribute('data-tab')) return;
      e.preventDefault();
      const tab = item.dataset.tab;
      document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
      item.classList.add('active');
      document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
      document.getElementById(`tab-${tab}`).classList.add('active');

      const titles = {
        backlog: ['Product Backlog', 'Smart Factory IoT Platform — Sprint 5'],
        kanban: ['Kanban Board', 'Current Sprint — Drag and drop to update status'],
        traceability: ['Traceability Matrix', 'Business Requirements → User Stories → Test Cases'],
        stats: ['Sprint Metrics', 'Velocity & Burndown Analysis'],
      };
      document.getElementById('pageTitle').textContent = titles[tab][0];
      document.getElementById('pageSubtitle').textContent = titles[tab][1];
      document.querySelector('.sidebar').classList.remove('open');
    });
  });
}

function setupMobileMenu() {
  document.getElementById('menuToggle').addEventListener('click', () => {
    document.querySelector('.sidebar').classList.toggle('open');
  });
}

// ============================================================
// Filters
// ============================================================
function setupFilters() {
  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentFilter = chip.dataset.filter;
      renderBacklog();
    });
  });

  document.getElementById('searchInput').addEventListener('input', renderBacklog);

  document.getElementById('sprintSelect').addEventListener('change', e => {
    currentSprint = e.target.value;
    renderAll();
  });
}

// ============================================================
// Render All
// ============================================================
function renderAll() {
  renderBacklog();
  renderKanban();
  renderTraceabilityMatrix();
  renderMetrics();
  renderBurndownChart();
  renderVelocityChart();
}

// ============================================================
// Backlog Table
// ============================================================
function renderBacklog() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const tbody = document.getElementById('backlogBody');
  tbody.innerHTML = '';

  let filtered = userStories;
  if (currentFilter !== 'all') filtered = filtered.filter(s => s.type === currentFilter);
  if (currentSprint !== 'all') filtered = filtered.filter(s => s.sprint === currentSprint);
  if (search) filtered = filtered.filter(s => s.title.toLowerCase().includes(search) || s.id.toLowerCase().includes(search));

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;color:var(--text-muted);padding:40px">No user story found</td></tr>`;
    return;
  }

  filtered.forEach(story => {
    const epic = EPICS.find(e => e.id === story.epicId);
    const row = document.createElement('tr');
    row.innerHTML = `
      <td style="font-weight:600;color:var(--text-muted)">${story.id}</td>
      <td>${getTypeBadge(story.type)}</td>
      <td style="max-width:350px">
        <div style="font-weight:500;line-height:1.4">${story.title}</div>
        ${story.acceptanceCriteria ? `<div style="font-size:11px;color:var(--text-muted);margin-top:4px;font-style:italic">AC: ${story.acceptanceCriteria.substring(0, 80)}...</div>` : ''}
      </td>
      <td>${getPriorityBadge(story.priority)}</td>
      <td style="text-align:center;font-weight:700;color:var(--accent-purple)">${story.storyPoints}</td>
      <td style="color:var(--text-secondary)">${story.sprint}</td>
      <td>${getStatusBadge(story.status)}</td>
      <td><span class="epic-badge" style="background:${epic.color}15;color:${epic.color}">${epic.id}</span></td>
    `;
    tbody.appendChild(row);
  });
}

function getTypeBadge(type) {
  const icons = { Story: '📖', Bug: '🐛', Task: '⚡', Epic: '🎯' };
  return `<span class="type-badge ${type.toLowerCase()}">${icons[type] || ''} ${type}</span>`;
}

function getPriorityBadge(priority) {
  return `<span class="priority-badge ${priority.toLowerCase()}">${priority}</span>`;
}

function getStatusBadge(status) {
  const cls = status.toLowerCase().replace(/\s+/g, '-');
  return `<span class="status-badge ${cls}">${status}</span>`;
}

// ============================================================
// Kanban Board
// ============================================================
function renderKanban() {
  const statuses = ['To Do', 'In Progress', 'In Review', 'Done'];
  const containerIds = ['kanbanTodo', 'kanbanInProgress', 'kanbanInReview', 'kanbanDone'];
  const countIds = ['countTodo', 'countInProgress', 'countInReview', 'countDone'];

  let stories = userStories;
  if (currentSprint !== 'all') stories = stories.filter(s => s.sprint === currentSprint);

  statuses.forEach((status, i) => {
    const container = document.getElementById(containerIds[i]);
    container.innerHTML = '';
    const items = stories.filter(s => s.status === status);
    document.getElementById(countIds[i]).textContent = items.length;

    items.forEach(story => {
      const epic = EPICS.find(e => e.id === story.epicId);
      const card = document.createElement('div');
      card.className = 'kanban-card';
      card.style.borderLeft = `3px solid ${epic.color}`;
      card.innerHTML = `
        <div class="card-id">${story.id} · ${getTypeBadge(story.type)}</div>
        <div class="card-title">${story.title}</div>
        <div class="card-footer">
          <span class="card-epic" style="background:${epic.color}15;color:${epic.color}">${epic.name}</span>
          <span class="card-points">${story.storyPoints} pts</span>
        </div>
      `;
      // Click to cycle status
      card.addEventListener('click', () => {
        const idx = statuses.indexOf(story.status);
        story.status = statuses[(idx + 1) % statuses.length];
        renderAll();
      });
      container.appendChild(card);
    });
  });
}

// ============================================================
// Traceability Matrix
// ============================================================
function renderTraceabilityMatrix() {
  const tbody = document.getElementById('matrixBody');
  tbody.innerHTML = '';

  BUSINESS_REQUIREMENTS.forEach(br => {
    const linkedStories = userStories.filter(s => s.brIds && s.brIds.includes(br.id));
    const allTestCases = linkedStories.flatMap(s => s.testCases || []);
    const uniqueTC = [...new Set(allTestCases)];
    const doneStories = linkedStories.filter(s => s.status === 'Done').length;
    const coverage = linkedStories.length > 0 ? Math.round((doneStories / linkedStories.length) * 100) : 0;

    const coverageColor = coverage >= 80 ? '#34d399' : coverage >= 50 ? '#fbbf24' : '#f87171';

    const row = document.createElement('tr');
    row.innerHTML = `
      <td style="font-weight:700;color:var(--accent-blue)">${br.id}</td>
      <td style="line-height:1.5">${br.text}</td>
      <td>${linkedStories.map(s => `<span class="story-link">${s.id}</span>`).join(' ')}</td>
      <td>${uniqueTC.map(tc => `<span class="tc-link">${tc}</span>`).join(' ')}</td>
      <td>
        <div class="coverage-bar"><div class="coverage-fill" style="width:${coverage}%;background:${coverageColor}"></div></div>
        <span style="font-size:12px;font-weight:600;color:${coverageColor}">${coverage}%</span>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// ============================================================
// Sprint Metrics
// ============================================================
function renderMetrics() {
  let stories = userStories;
  if (currentSprint !== 'all') stories = stories.filter(s => s.sprint === currentSprint);

  document.getElementById('metricTotal').textContent = stories.length;
  document.getElementById('metricDone').textContent = stories.filter(s => s.status === 'Done').length;
  document.getElementById('metricProgress').textContent = stories.filter(s => s.status === 'In Progress').length;
  document.getElementById('metricPoints').textContent = stories.reduce((s, st) => s + st.storyPoints, 0);
}

function renderBurndownChart() {
  if (charts.burndown) charts.burndown.destroy();

  const sprintStories = currentSprint !== 'all'
    ? userStories.filter(s => s.sprint === currentSprint)
    : userStories.filter(s => s.sprint === 'Sprint 5');

  const totalPoints = sprintStories.reduce((s, st) => s + st.storyPoints, 0);
  const days = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8', 'Day 9', 'Day 10'];
  const idealBurndown = days.map((_, i) => Math.round(totalPoints * (1 - i / (days.length - 1))));

  // Simulated actual burndown
  let remaining = totalPoints;
  const actualBurndown = days.map((_, i) => {
    if (i === 0) return totalPoints;
    const burned = Math.round(Math.random() * (totalPoints / days.length) * 1.3);
    remaining = Math.max(0, remaining - burned);
    return remaining;
  });

  const ctx = document.getElementById('burndownChart').getContext('2d');
  charts.burndown = new Chart(ctx, {
    type: 'line',
    data: {
      labels: days,
      datasets: [
        {
          label: 'Ideal',
          data: idealBurndown,
          borderColor: '#f8717180',
          borderWidth: 2,
          borderDash: [6, 4],
          pointRadius: 0,
          fill: false,
        },
        {
          label: 'Actual',
          data: actualBurndown,
          borderColor: '#60a5fa',
          backgroundColor: 'rgba(96,165,250,0.1)',
          borderWidth: 2.5,
          fill: true,
          tension: 0.3,
          pointRadius: 4,
          pointBackgroundColor: '#60a5fa',
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'top', labels: { usePointStyle: true, padding: 16 } } },
      scales: { y: { beginAtZero: true, title: { display: true, text: 'Story Points' } } },
    }
  });
}

function renderVelocityChart() {
  if (charts.velocity) charts.velocity.destroy();
  const ctx = document.getElementById('velocityChart').getContext('2d');

  charts.velocity = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: VELOCITY_DATA.map(v => v.sprint),
      datasets: [
        {
          label: 'Planned',
          data: VELOCITY_DATA.map(v => v.planned),
          backgroundColor: 'rgba(167,139,250,0.2)',
          borderColor: '#a78bfa',
          borderWidth: 1.5,
          borderRadius: 6,
        },
        {
          label: 'Completed',
          data: VELOCITY_DATA.map(v => v.completed),
          backgroundColor: 'rgba(52,211,153,0.2)',
          borderColor: '#34d399',
          borderWidth: 1.5,
          borderRadius: 6,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'top', labels: { usePointStyle: true, padding: 16 } } },
      scales: { y: { beginAtZero: true, title: { display: true, text: 'Story Points' } } },
    }
  });
}

// ============================================================
// Modal (Add User Story)
// ============================================================
function setupModal() {
  const modal = document.getElementById('storyModal');
  const form = document.getElementById('storyForm');

  document.getElementById('addStoryBtn').addEventListener('click', () => {
    modal.classList.add('open');
    document.getElementById('modalTitle').textContent = 'Add User Story';
    form.reset();
  });

  document.getElementById('modalClose').addEventListener('click', () => modal.classList.remove('open'));
  document.getElementById('cancelBtn').addEventListener('click', () => modal.classList.remove('open'));

  modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const newStory = {
      id: `US-${String(nextStoryId++).padStart(3, '0')}`,
      type: document.getElementById('formType').value,
      epicId: document.getElementById('formEpic').value,
      title: document.getElementById('formTitle').value,
      acceptanceCriteria: document.getElementById('formCriteria').value,
      priority: document.getElementById('formPriority').value,
      storyPoints: parseInt(document.getElementById('formPoints').value),
      sprint: document.getElementById('formSprint').value,
      status: 'To Do',
      brIds: [],
      testCases: [],
    };
    userStories.push(newStory);
    modal.classList.remove('open');
    renderAll();
  });
}
