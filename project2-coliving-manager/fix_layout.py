import re

with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove breadcrumb block from renderKanban
breadcrumb_pattern = r'<!-- Breadcrumb -->[\s\S]*?<!-- Main Kanban Wrapper -->'
content = re.sub(breadcrumb_pattern, '<!-- Main Kanban Wrapper -->', content)

WRAPPER_TEMPLATE = (
    '\n    <div class="mx-auto max-w-(--breakpoint-2xl) p-4 pb-20 md:p-6 md:pb-6">'
    '\n      <div class="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">'
    '\n        {inner}'
    '\n      </div>'
    '\n    </div>'
    '\n  '
)

def wrap_view(content, func_name):
    # Match: function <name>() { ... return `TEMPLATE`; }
    # Group 1 = "function ... { ... return "
    # Group 2 = content between backticks (the template body)
    # Group 3 = "`;\n}" (closing backtick, semicolon, brace)
    pattern = re.compile(
        r'(function\s+' + re.escape(func_name) + r'\(\)\s*\{[\s\S]*?return\s*)`([\s\S]*?)`(\s*;\s*\})',
        re.MULTILINE,
    )
    match = pattern.search(content)
    if not match:
        return content
    inner = match.group(2)
    if 'max-w-(--breakpoint-2xl)' in inner:
        return content  # already wrapped, idempotent
    new_inner = WRAPPER_TEMPLATE.replace('{inner}', inner)
    replacement = match.group(1) + '`' + new_inner + '`' + match.group(3)
    return content[:match.start()] + replacement + content[match.end():]

content = wrap_view(content, 'renderLedger')
content = wrap_view(content, 'renderSettleUp')

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated app.js in project 2")
