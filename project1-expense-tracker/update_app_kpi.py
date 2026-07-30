import re

with open('app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Replace the beginning of renderOverview
new_render_overview = """
function renderOverview() {
  const activeSubs = state.subscriptions.filter(s => s.status !== 'Cancelled');
  const totalCost = activeSubs.reduce((sum, s) => sum + s.cost, 0);
  const activeCount = activeSubs.filter(s => s.status === 'Active').length;
  const ghostCount = state.subscriptions.filter(s => s.status === 'Ghost').length;
  const ghostCost = state.subscriptions.filter(s => s.status === 'Ghost').reduce((sum, g) => sum + g.cost, 0);
  const potentialSavings = ghostCost * 12; // yearly savings
  
  const gridEl = document.getElementById('overviewKPIsGrid');
  if (gridEl) {
    gridEl.innerHTML = `
      <div class="border-b border-gray-200 px-6 py-5 sm:border-r xl:border-b-0 dark:border-gray-800">
        <span class="text-sm text-gray-500 dark:text-gray-400">Total Monthly Cost</span>
        <div class="mt-2 flex items-end gap-3">
          <h4 class="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white/90">${formatMoney(totalCost)}</h4>
        </div>
      </div>
      <div class="border-b border-gray-200 px-6 py-5 xl:border-r xl:border-b-0 dark:border-gray-800">
        <span class="text-sm text-gray-500 dark:text-gray-400">Potential Yearly Savings</span>
        <div class="mt-2 flex items-end gap-3">
          <h4 class="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white/90">${formatMoney(potentialSavings)}</h4>
          <div><span class="bg-blue-50 text-blue-600 flex items-center gap-1 rounded-full py-0.5 pr-2.5 pl-2 text-sm font-medium">Ghost Subs</span></div>
        </div>
      </div>
      <div class="border-b border-gray-200 px-6 py-5 sm:border-r sm:border-b-0 dark:border-gray-800">
        <span class="text-sm text-gray-500 dark:text-gray-400">Active Subscriptions</span>
        <div class="mt-2 flex items-end gap-3">
          <h4 class="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white/90">${activeCount}</h4>
        </div>
      </div>
      <div class="px-6 py-5">
        <span class="text-sm text-gray-500 dark:text-gray-400">Ghost Alerts</span>
        <div class="mt-2 flex items-end gap-3">
          <h4 class="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white/90">${ghostCount}</h4>
          ${ghostCount > 0 ? '<div><span class="bg-red-50 text-red-600 flex items-center gap-1 rounded-full py-0.5 pr-2.5 pl-2 text-sm font-medium">Action Required</span></div>' : ''}
        </div>
      </div>
    `;
  }

  // Row 3 Charts Setup
"""

js = re.sub(r'function renderOverview\(\) \{.*?// Row 3 Charts Setup', new_render_overview, js, flags=re.DOTALL)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(js)
