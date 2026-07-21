import os
import re
import glob

base = r"c:\Users\LENOVO\Documents\GitHub\DoAnhNghia_BAPortfolio"

# 1. Update index.html to have id="project-02" and id="project-03" on project cards
index_path = os.path.join(base, "index.html")
with open(index_path, 'r', encoding='utf-8') as f:
    idx_content = f.read()

# Add id="project-02" if missing
idx_content = re.sub(
    r'(<!-- Project 02: [^\n]* -->\s*<div class="project-card")',
    r'<!-- Project 02: Co-living Manager -->\n      <div class="project-card" id="project-02"',
    idx_content
)

# Add id="project-03" if missing
idx_content = re.sub(
    r'(<!-- Project 03: [^\n]* -->\s*<div class="project-card")',
    r'<!-- Project 03: Process Analyzer -->\n      <div class="project-card" id="project-03"',
    idx_content
)

with open(index_path, 'w', encoding='utf-8') as f:
    f.write(idx_content)

print("Updated root index.html with project-02 and project-03 IDs")

# Helper function to process project files
def fix_project_back_btn(project_dir, project_id):
    html_files = glob.glob(os.path.join(project_dir, "*.html"))
    for filepath in html_files:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace the onclick handleGoBack link with direct link to ../index.html#project-XX
        pattern_btn = r'<a href="#" onclick="handleGoBack\(event,\s*[\'"][^\'"]+[\'"]\)" class="back-portfolio-btn">'
        replacement_btn = f'<a href="../index.html#{project_id}" class="back-portfolio-btn">'
        
        content = re.sub(pattern_btn, replacement_btn, content)
        
        # Also handle any fallback href="#" or javascript:history.back() on back-portfolio-btn
        content = re.sub(
            r'<a href="(?:#|javascript:history\.back\(\))"[^>]*class="back-portfolio-btn"[^>]*>',
            f'<a href="../index.html#{project_id}" class="back-portfolio-btn">',
            content
        )
        
        # Remove handleGoBack script function if present
        script_pattern = r'<script>\s*function handleGoBack\(event,\s*projectId\)\s*\{.*?\}\s*</script>'
        content = re.sub(script_pattern, '', content, flags=re.DOTALL)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed back button in {os.path.basename(filepath)}")

# 2. Fix Project 1
fix_project_back_btn(os.path.join(base, "project1-expense-tracker"), "project-01")

# 3. Fix Project 2
fix_project_back_btn(os.path.join(base, "project2-coliving-manager"), "project-02")

# 4. Fix Project 3
fix_project_back_btn(os.path.join(base, "project3-office-order"), "project-03")

print("All projects updated successfully.")
