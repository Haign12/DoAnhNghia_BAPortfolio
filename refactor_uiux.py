import re
import os

try:
    with open('uiux-portfolio.html', 'r', encoding='utf-16le') as f:
        content = f.read()
except UnicodeDecodeError:
    with open('uiux-portfolio.html', 'r', encoding='utf-8') as f:
        content = f.read()

# Update title
content = re.sub(r'<title>.*?</title>', '<title>UI/UX Portfolio | Do Anh Nghia</title>', content)

# Remove the hero section details and change text
content = re.sub(r'<h1.*?</h1>', '<h1>UI/UX Design Portfolio</h1>', content, flags=re.DOTALL)
content = re.sub(r'<p class="hero-sub".*?</p>', '<p class="hero-sub">Enterprise and B2B Interface Design</p>', content, flags=re.DOTALL)
content = re.sub(r'<div class="hero-skills".*?</div>', '', content, flags=re.DOTALL)
content = re.sub(r'<a href="#ba-projects" class="hero-cta".*?</a>', '', content, flags=re.DOTALL)
content = re.sub(r'<div class="hero-badge".*?</div>', '', content, flags=re.DOTALL)

# Remove the about, resume, and ba-projects sections completely
# Start from <section class="about-me" id="about"> up to <section class="projects" id="uiux-projects">
content = re.sub(r'<section class="about-me" id="about">.*?(?=<section class="projects" id="uiux-projects")', '', content, flags=re.DOTALL)

# Update nav link
content = content.replace('href="#about"', 'href="index.html#about"')
content = content.replace('href="#ba-projects"', 'href="index.html#ba-projects"')

with open('uiux-portfolio.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("uiux-portfolio.html updated successfully!")
