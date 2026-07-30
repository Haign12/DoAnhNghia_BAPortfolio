import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace the overview view with TailAdmin framework layout
tailadmin_overview = """
    <!-- VIEW: OVERVIEW -->
    <div id="view-overview" class="view-section active">
      <div class="mx-auto max-w-7xl p-4 pb-20 md:p-6 md:pb-6">
        <div class="space-y-6">
          
          <!-- Metrics Start -->
          <div class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div class="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Overview</h3>
              </div>
            </div>
            <div class="grid rounded-2xl border border-gray-200 bg-white sm:grid-cols-2 xl:grid-cols-4 dark:border-gray-800 dark:bg-gray-900" id="overviewKPIsGrid">
              <!-- KPI Cards injected here by JS -->
            </div>
          </div>
          
          <!-- Charts Start -->
          <div class="gap-5 space-y-5 xl:grid xl:grid-cols-12 xl:space-y-0">
            <div class="xl:col-span-7 2xl:col-span-8">
              <div class="overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
                <div class="mb-6 flex justify-between">
                  <div>
                    <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">Spending by Category</h3>
                  </div>
                </div>
                <div style="height: 300px;" id="overviewSpendingByCategory">
                  <canvas id="ovDonutChart"></canvas>
                </div>
              </div>
            </div>
            
            <div class="xl:col-span-5 2xl:col-span-4">
              <div class="overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
                <div class="mb-6 flex justify-between">
                  <div>
                    <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">Subscription Health</h3>
                  </div>
                </div>
                <div style="height: 300px;" id="overviewSubscriptionHealth">
                  <canvas id="ovBarChart"></canvas>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Transactions -->
          <div class="overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <div class="mb-6 flex justify-between">
              <div>
                <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">Recent Transactions</h3>
              </div>
            </div>
            <div id="overviewTxList" class="space-y-4"></div>
          </div>
          
        </div>
      </div>
    </div>
"""

# Find view-overview and replace it
html = re.sub(r'<!-- VIEW: OVERVIEW -->.*?<!-- VIEW: TRANSACTIONS -->', tailadmin_overview + '\n\n    <!-- VIEW: TRANSACTIONS -->', html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
