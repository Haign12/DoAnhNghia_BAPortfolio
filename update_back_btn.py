import os
import re
import glob

base = r"c:\Users\LENOVO\Documents\GitHub\DoAnhNghia_BAPortfolio"

# 1. Add IDs to the index.html project cards
index_path = os.path.join(base, "index.html")
with open(index_path, 'r', encoding='utf-8') as f:
    index_content = f.read()

index_content = index_content.replace('<!-- Project 01: KPI Dashboard -->\n      <div class="project-card">', '<!-- Project 01: KPI Dashboard -->\n      <div class="project-card" id="project-01">')
index_content = index_content.replace('<!-- Project 02: Coliving Dashboard -->\n      <div class="project-card">', '<!-- Project 02: Coliving Dashboard -->\n      <div class="project-card" id="project-02">')
index_content = index_content.replace('<!-- Project 03: Order Workflow -->\n      <div class="project-card">', '<!-- Project 03: Order Workflow -->\n      <div class="project-card" id="project-03">')

with open(index_path, 'w', encoding='utf-8') as f:
    f.write(index_content)
print("Updated index.html with IDs")

# 2. Update all projects HTML files
def process_project(project_folder, project_id):
    p_dir = os.path.join(base, project_folder)
    html_files = glob.glob(os.path.join(p_dir, "*.html"))
    
    script_snippet = f'''
<script>
  function handleGoBack(event, projectId) {{
    event.preventDefault(); // Ngăn hành vi nhảy trang mặc định của thẻ <a>
    
    // Kiểm tra xem người dùng có đi từ trang Portfolio của bạn sang đây không
    if (document.referrer.includes("haign12.github.io")) {{
      // Nếu đúng -> Dùng lịch sử trình duyệt để quay lại giữ nguyên vị trí cuộn mượt mà
      window.history.back();
    }} else {{
      // EDGE CASE: Nếu họ mở link trực tiếp (hoặc gửi cho người khác) -> Điều hướng thẳng về trang chủ và neo vào đúng Project đó
      window.location.href = "https://haign12.github.io/DoAnhNghia_BAPortfolio/#" + projectId;
    }}
  }}
</script>
</body>'''

    for filepath in html_files:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace the back button <a> tag
        content = re.sub(
            r'<a href="https://haign12\.github\.io/DoAnhNghia_BAPortfolio/" class="back-portfolio-btn">',
            f'<a href="#" onclick="handleGoBack(event, \'{project_id}\')" class="back-portfolio-btn">',
            content
        )
        
        # Avoid duplicate scripts if run multiple times
        if "function handleGoBack(event, projectId)" not in content:
            content = content.replace('</body>', script_snippet)
            
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
    print(f"Updated {project_folder}")

process_project("project1-expense-tracker", "project-01")
process_project("project2-coliving-manager", "project-02")
process_project("project3-office-order", "project-03")
