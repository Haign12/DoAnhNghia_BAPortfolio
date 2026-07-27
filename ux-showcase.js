/* ============================================================
   UX/BA SHOWCASE - GLOBAL JS
   Handles Welcome Onboarding Modal for each prototype
   ============================================================ */

window.initUXShowcase = function(config) {
  const { projectId, role, title, desc, tasks } = config;
  
  // Check if already seen
  const storageKey = 'onboarding_' + projectId;
  if (sessionStorage.getItem(storageKey)) {
    return; // Already seen in this session
  }

  // Create Modal HTML
  const overlay = document.createElement('div');
  overlay.className = 'ux-modal-overlay';
  
  let tasksHtml = '';
  tasks.forEach(task => {
    tasksHtml += `
      <div class="ux-modal-task">
        <i class="ph ph-check-circle"></i>
        <div class="ux-modal-task-text">${task}</div>
      </div>
    `;
  });

  overlay.innerHTML = `
    <div class="ux-modal">
      <div class="ux-modal-badge">Persona: ${role}</div>
      <div class="ux-modal-title">${title}</div>
      <div class="ux-modal-desc">${desc}</div>
      
      <div class="ux-modal-tasks">
        <div class="ux-modal-tasks-title">Try these flows:</div>
        ${tasksHtml}
      </div>
      
      <button class="ux-modal-btn" id="startPrototypeBtn">Let's Go!</button>
    </div>
  `;

  document.body.appendChild(overlay);

  // Show with animation
  setTimeout(() => {
    overlay.classList.add('active');
  }, 100);

  // Bind close
  document.getElementById('startPrototypeBtn').addEventListener('click', () => {
    overlay.classList.remove('active');
    sessionStorage.setItem(storageKey, 'true');
    setTimeout(() => overlay.remove(), 400);
  });
};
