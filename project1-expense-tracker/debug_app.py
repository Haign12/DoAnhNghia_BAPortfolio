import re

with open('app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Replace renderAll with a try-catch version
new_render_all = """
function renderAll(viewId) {
  try {
    renderOverview();
    renderTransactions();
    renderSubscriptions();
    renderBudget();
    renderAnalytics(viewId);
    renderCashflow();
    renderUpcomingRenewals();
  } catch (err) {
    document.body.innerHTML += `<div style="position:fixed;top:0;left:0;z-index:9999;background:red;color:white;padding:20px;width:100%;"><b>JS ERROR in renderAll:</b> ${err.message}<br><pre>${err.stack}</pre></div>`;
    console.error(err);
  }
}
"""

js = re.sub(r'function renderAll\(viewId\) \{[\s\S]*?renderUpcomingRenewals\(\);\s*\}', new_render_all.strip(), js)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(js)
