const fs = require('fs');

let html = fs.readFileSync('project1-expense-tracker/index.html', 'utf8');

// 1. Inject CSS
html = html.replace(
  '<link rel="stylesheet" href="styles.css?v=2">',
  '<link rel="stylesheet" href="styles.css?v=2">\n  <link rel="stylesheet" href="../ux-showcase.css">'
);

// 2. Inject kpiTotalCost
html = html.replace(
  '<div class="kpi-card-label">Total Expenses</div>\n          <div class="kpi-card-value">$1,240</div>',
  '<div class="kpi-card-label">Total Fixed Cost</div>\n          <div class="kpi-card-value" id="kpiTotalCost">$0</div>'
);

// 3. Inject kpiActiveCount
html = html.replace(
  '<div class="kpi-card-label">Active Subscriptions</div>\n          <div class="kpi-card-value">5</div>',
  '<div class="kpi-card-label">Active Subscriptions</div>\n          <div class="kpi-card-value" id="kpiActiveCount">0</div>'
);

// 4. Inject kpiUtilization
html = html.replace(
  '<div class="kpi-card-label">Ghost Subscriptions</div>\n          <div class="kpi-card-value" style="color: var(--red-500);">3</div>',
  '<div class="kpi-card-label">Utilization Rate</div>\n          <div class="kpi-card-value" id="kpiUtilization" style="color: var(--teal);">0%</div>'
);

// 5. Replace Statistics Panel with Ghost Panel
const statsPanelRegex = /<!-- Statistics -->[\s\S]*?(?=<\/div>\n      <\/div>\n\n      <!-- ΓöÇΓöÇ Expense Overview Chart)/;
const ghostHTML = `<!-- Ghost Subscriptions Panel -->
        <div class="panel-card ghost-panel">
          <div class="panel-card-header" style="margin-bottom: 24px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div class="ghost-icon" style="width: 32px; height: 32px; background: var(--red-light); color: var(--red-500); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 18px;"><i class="ph ph-ghost"></i></div>
              <div>
                <span class="panel-card-title" style="color: var(--red-500);">Ghost Subscriptions <span class="ba-hotspot" data-ba-note="Business Rule (FR-03): Detects active subscriptions with 0 logins in 30 days. Showing this panel on the right creates urgency to act."><i class="ph ph-question"></i></span></span>
                <div style="font-size: 13px; color: var(--text-secondary); margin-top: 4px;">Detected via FR-03 rules</div>
              </div>
            </div>
          </div>
          <div id="ghostList"></div>
        </div>`;
html = html.replace(statsPanelRegex, ghostHTML);

// 6. Replace Top Spending with Active Subscriptions
const spendingRowRegex = /<!-- ΓöÇΓöÇ Top Spending Sources ΓöÇΓöÇ -->[\s\S]*?(?=<\/div>\n  <\/main>)/;
const activeSubsHTML = `<!-- ΓöÇΓöÇ Active Subscriptions List ΓöÇΓöÇ -->
      <div class="spending-row">
        <div class="spending-header">
          <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
            <div>
              <div class="spending-title">Active Subscriptions</div>
              <div class="spending-subtitle">Your monthly recurring costs.</div>
            </div>
            <button class="neumorphic-btn-small" onclick="showToast('Add flow not implemented in demo', 'info')" style="padding: 6px 12px; border-radius: 6px; background: var(--purple-100); color: var(--purple-600); border: none; cursor: pointer; font-weight: 600;"><i class="ph ph-plus"></i> Add Sub</button>
          </div>
        </div>
        <div class="sub-list" id="subscriptionList" style="display: flex; flex-direction: column; gap: 16px; margin-top: 16px;"></div>
      </div>
    `;
html = html.replace(spendingRowRegex, activeSubsHTML);

// 7. Inject UX scripts and Toast container
html = html.replace(
  '  <script src="data.js"></script>',
  `<!-- Toast -->
<div class="toast-container" id="toastContainer"></div>

  <script src="data.js"></script>`
);
html = html.replace(
  '</body>',
  `  <script src="../ux-showcase.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      initUXShowcase({
        projectId: 'p1_fintrack',
        role: 'User (End-consumer)',
        title: 'Welcome to FinTrack Prototype',
        desc: 'Experience a Premium Analytics Dashboard designed to help users track subscriptions and avoid hidden costs.',
        tasks: [
          'Navigate through the Sidebar menus to explore the dashboard layout.',
          'Review the Ghost Subscriptions logic in the UI.',
          'Hover over BA hotspots for design rationale.'
        ]
      });
    });
  </script>
</body>`
);

fs.writeFileSync('project1-expense-tracker/index.html', html);
console.log("HTML Injected");
