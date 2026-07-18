import os
import re
import subprocess

html_files = [
    'index.html',
    'case-study-p1.html',
    'case-study-p2.html',
    'case-study-p3.html',
    'case-study-ux.html'
]

for file in html_files:
    if not os.path.exists(file): continue
    
    # Read current content
    with open(file, 'r', encoding='utf-8') as f:
        current_content = f.read()
        
    # Get old content from git HEAD~1
    try:
        old_content = subprocess.check_output(['git', 'show', f'HEAD~1:{file}'], encoding='utf-8')
    except Exception as e:
        print(f"Error reading {file} from git: {e}")
        continue
        
    # Extract old footer HTML
    old_footer_match = re.search(r'<footer id="contact">.*?</footer>', old_content, flags=re.DOTALL)
    if not old_footer_match:
        print(f"Could not find old footer HTML in {file}")
        continue
    old_footer_html = old_footer_match.group(0)
    
    # Replace new footer with old footer
    current_content = re.sub(r'<footer id="contact" class="new-footer">.*?</footer>', old_footer_html, current_content, flags=re.DOTALL)
    
    # Extract old CSS
    if file == 'index.html':
        old_css_match = re.search(r'/\* Footer \*/\s*footer \{.*?\.footer-link:hover \{.*?\}', old_content, flags=re.DOTALL)
        if old_css_match:
            old_css = old_css_match.group(0)
            # Find the new CSS and replace it
            current_content = re.sub(r'/\* New Footer Styles \*/.*?@media \(max-width: 600px\) \{.*?\n    \}', old_css, current_content, flags=re.DOTALL)
    else:
        old_css_match = re.search(r'    footer \{.*?\}\n    footer strong \{.*?\}', old_content, flags=re.DOTALL)
        if old_css_match:
            old_css = old_css_match.group(0)
            # Find new CSS block and replace
            current_content = re.sub(r'/\* New Footer Styles \*/.*?@media \(max-width: 600px\) \{.*?\n    \}', old_css, current_content, flags=re.DOTALL)

    # In case the regex for new CSS failed (it might have an extra blank line), let's be more robust:
    # Actually, the new CSS block was appended before </style>, so let's just find "/* New Footer Styles */" and remove up to "</style>" and put old CSS there.
    # We can do this safely:
    if '/* New Footer Styles */' in current_content:
        # We need to replace the New Footer Styles block.
        if file == 'index.html':
            if old_css_match:
                current_content = re.sub(r'\s*/\* New Footer Styles \*/.*?(?=</style>)', '\n\n    ' + old_css + '\n  ', current_content, flags=re.DOTALL)
        else:
            if old_css_match:
                # the old case study files had inline footer CSS near the top
                # let's just remove the new CSS block entirely
                current_content = re.sub(r'\s*/\* New Footer Styles \*/.*?(?=</style>)', '\n  ', current_content, flags=re.DOTALL)
                # and put the old CSS where it belongs, or just at the end before </style>
                current_content = current_content.replace('</style>', old_css + '\n  </style>')
            else:
                 current_content = re.sub(r'\s*/\* New Footer Styles \*/.*?(?=</style>)', '\n  ', current_content, flags=re.DOTALL)

    with open(file, 'w', encoding='utf-8') as f:
        f.write(current_content)
    print(f"Reverted footer in {file}")
