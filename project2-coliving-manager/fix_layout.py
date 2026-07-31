import re

with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove breadcrumb from renderKanban
breadcrumb_pattern = r'<!-- Breadcrumb -->[\s\S]*?<!-- Main Kanban Wrapper -->'
content = re.sub(breadcrumb_pattern, '<!-- Main Kanban Wrapper -->', content)

# 2. Apply layout to renderLedger
ledger_pattern = r'return ([\s\S]*?);\n\}'
ledger_match = re.search(r'function renderLedger\(\) \{[\s\S]*?return ([\s\S]*?);\n\}', content)
if ledger_match:
    ledger_inner = ledger_match.group(1)
    # Check if it already has the wrapper
    if 'max-w-(--breakpoint-2xl)' not in ledger_inner:
        new_ledger_inner = f'''
    <div class="mx-auto max-w-(--breakpoint-2xl) p-4 pb-20 md:p-6 md:pb-6">
      <div class="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        {ledger_inner}
      </div>
    </div>
'''
        content = content.replace(ledger_match.group(0), ledger_match.group(0).replace(ledger_inner, new_ledger_inner))

# 3. Apply layout to renderSettleUp
settleup_match = re.search(r'function renderSettleUp\(\) \{[\s\S]*?return ([\s\S]*?);\n\}', content)
if settleup_match:
    settleup_inner = settleup_match.group(1)
    if 'max-w-(--breakpoint-2xl)' not in settleup_inner:
        new_settleup_inner = f'''
    <div class="mx-auto max-w-(--breakpoint-2xl) p-4 pb-20 md:p-6 md:pb-6">
      <div class="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        {settleup_inner}
      </div>
    </div>
'''
        content = content.replace(settleup_match.group(0), settleup_match.group(0).replace(settleup_inner, new_settleup_inner))

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated app.js in project 2")
