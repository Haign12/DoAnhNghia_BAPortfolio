import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Define the wrapper template
def wrap_view(view_id, title, content):
    return f"""
    <!-- VIEW: {title.upper()} -->
    <div id="{view_id}" class="view-section">
      <div class="mx-auto max-w-7xl p-4 pb-20 md:p-6 md:pb-6">
        <div class="space-y-6">
          <div class="overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <div class="mb-6 flex justify-between">
              <div>
                <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">{title}</h3>
              </div>
            </div>
            {content}
          </div>
        </div>
      </div>
    </div>
"""

# TRANSACTIONS
tx_content = """
            <div class="flex flex-col sm:flex-row justify-between mb-4 gap-4">
              <input type="text" id="txSearchFilter" placeholder="Search transactions..." onkeyup="renderTransactions()" class="w-full sm:w-64 rounded-lg border border-gray-200 bg-transparent px-4 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-none dark:border-gray-800 dark:text-white">
              <select id="txCatFilter" onchange="renderTransactions()" class="w-full sm:w-48 rounded-lg border border-gray-200 bg-transparent px-4 py-2 text-sm text-gray-800 focus:border-brand-300 focus:outline-none dark:border-gray-800 dark:text-white">
                <option value="All">All Categories</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Health">Health</option>
                <option value="Education">Education</option>
              </select>
            </div>
            <div class="table-responsive w-full overflow-x-auto">
              <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                <thead class="bg-gray-50 dark:bg-gray-800/50">
                  <tr>
                    <th class="px-6 py-4 font-medium text-gray-900 dark:text-white">Date</th>
                    <th class="px-6 py-4 font-medium text-gray-900 dark:text-white">Subscription</th>
                    <th class="px-6 py-4 font-medium text-gray-900 dark:text-white">Category</th>
                    <th class="px-6 py-4 font-medium text-gray-900 dark:text-white">Amount</th>
                    <th class="px-6 py-4 text-right font-medium text-gray-900 dark:text-white">Actions</th>
                  </tr>
                </thead>
                <tbody id="fullTxList" class="divide-y divide-gray-200 dark:divide-gray-800"></tbody>
              </table>
              <div id="emptyTxState" style="display:none; text-align:center; padding: 40px; color: #6b7280;">No transactions found.</div>
            </div>
"""

# SUBSCRIPTIONS
sub_content = """
            <div class="flex flex-col sm:flex-row justify-between mb-6 gap-4">
              <div class="flex rounded-lg border border-gray-200 bg-gray-50 p-1 dark:border-gray-800 dark:bg-gray-900">
                <button id="subFilterAll" onclick="setSubFilter('All')" class="rounded-md px-4 py-1.5 text-sm font-medium hover:bg-white hover:shadow-sm dark:hover:bg-gray-800">All</button>
                <button id="subFilterActive" onclick="setSubFilter('Active')" class="rounded-md px-4 py-1.5 text-sm font-medium hover:bg-white hover:shadow-sm dark:hover:bg-gray-800">Active</button>
                <button id="subFilterGhost" onclick="setSubFilter('Ghost')" class="rounded-md px-4 py-1.5 text-sm font-medium hover:bg-white hover:shadow-sm dark:hover:bg-gray-800 text-orange-600">Ghost</button>
              </div>
              <button class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700" onclick="openAddSubModal()">+ New Subscription</button>
            </div>
            <div class="table-responsive w-full overflow-x-auto">
              <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                <thead class="bg-gray-50 dark:bg-gray-800/50">
                  <tr>
                    <th class="px-6 py-4 font-medium text-gray-900 dark:text-white">Subscription</th>
                    <th class="px-6 py-4 font-medium text-gray-900 dark:text-white">Next Billing</th>
                    <th class="px-6 py-4 font-medium text-gray-900 dark:text-white">Cycle</th>
                    <th class="px-6 py-4 font-medium text-gray-900 dark:text-white">Cost</th>
                    <th class="px-6 py-4 font-medium text-gray-900 dark:text-white">Status</th>
                    <th class="px-6 py-4 text-right font-medium text-gray-900 dark:text-white">Actions</th>
                  </tr>
                </thead>
                <tbody id="fullSubList" class="divide-y divide-gray-200 dark:divide-gray-800"></tbody>
              </table>
            </div>
"""

# BUDGET
budget_content = """
            <div class="flex justify-end mb-6">
              <button class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700" onclick="openBudgetModal()">+ Edit Budget</button>
            </div>
            <div id="budgetList" class="space-y-6"></div>
"""

# Replace TRANSACTIONS
html = re.sub(r'<!-- VIEW: TRANSACTIONS -->.*?<!-- VIEW: SUBSCRIPTIONS -->', wrap_view('view-transactions', 'Transactions', tx_content) + '\n\n    <!-- VIEW: SUBSCRIPTIONS -->', html, flags=re.DOTALL)

# Replace SUBSCRIPTIONS
html = re.sub(r'<!-- VIEW: SUBSCRIPTIONS -->.*?<!-- VIEW: BUDGET -->', wrap_view('view-subscriptions', 'Subscriptions', sub_content) + '\n\n    <!-- VIEW: BUDGET -->', html, flags=re.DOTALL)

# Replace BUDGET
html = re.sub(r'<!-- VIEW: BUDGET -->.*?<!-- VIEW: ANALYTICS -->', wrap_view('view-budget', 'Budgets', budget_content) + '\n\n    <!-- VIEW: ANALYTICS -->', html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
