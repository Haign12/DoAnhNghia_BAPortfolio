import os

with open('project3-office-order/index.html', 'r', encoding='utf-8') as f:
    text = f.read()
    lines = text.split('\n')
    
for cls in ['cart-panel', 'centered', 'form-actions', 'menu-items', 'total-amount', 'val']:
    for i, line in enumerate(lines):
        if f'class="{cls}"' in line or f'class="{cls} ' in line or f' {cls}"' in line or f' {cls} ' in line:
            print(f'{cls} at line {i+1}: {line.strip()}')
