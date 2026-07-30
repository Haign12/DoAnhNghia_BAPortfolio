import re

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Fix search-box padding and border
new_input_css = """
.search-box input {
  width: 100%;
  background: transparent;
  border: 1px solid var(--border-medium);
  padding: 10px 16px 10px 44px !important;
  outline: none;
  border-radius: 8px;
  transition: border 0.2s;
  font-size: 14px;
  color: var(--text-primary);
  font-family: inherit;
}
"""

css = re.sub(r'\.search-box input \{[^}]+\}', new_input_css.strip(), css)

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)
