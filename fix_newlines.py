import os

files = ["case-study-p1.html", "case-study-p2.html", "case-study-p3.html"]

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    start_idx = content.find('const caseDict = {')
    end_idx = content.find('const langViBtn = document.getElementById(\'lang-vi\');')
    
    if start_idx != -1 and end_idx != -1:
        dict_part = content[start_idx:end_idx]
        
        # In the string, there is literally a backslash followed by 'n'.
        # We want to replace it with an actual newline.
        # Python literal for backslash followed by n is '\\n'
        # Python literal for newline is '\n'
        fixed_dict = dict_part.replace('\\n', '\n')
        
        content = content[:start_idx] + fixed_dict + content[end_idx:]
        
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed {file}")
    else:
        print(f"Could not find bounds in {file}")
