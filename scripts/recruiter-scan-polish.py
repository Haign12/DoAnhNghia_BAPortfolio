from pathlib import Path
import re

index_path = Path('index.html')
text = index_path.read_text()

# The old full-screen percentage preloader delays the first hiring signal and
# also contaminates section-level rendered evidence. Keep the DOM hook for
# compatibility, but make loading non-blocking and start the hero immediately.
scan_css = """
/* Recruiter-first scan: no blocking splash before product proof. */
.preloader{display:none!important}
.skip{top:-100px!important;transform:none!important}
.skip:focus{top:16px!important}
"""
if 'Recruiter-first scan: no blocking splash' not in text:
    text = text.replace('</style>', scan_css + '\n</style>', 1)

text = text.replace('<a class="skip" href="#work">Skip to projects</a>', '<a class="skip" href="#flagships">Skip to selected work</a>')
text = text.replace('<a href="#ai-workflow">AI workflow</a>', '<a href="#ai-workflow">How I work</a>')

pattern = re.compile(r"// Preloader smooth count animation\nlet n = 0;\nconst timer = setInterval\(\(\) => \{.*?\n\}, 38\);", re.S)
replacement = """// Recruiter-first loading: preserve the hero entrance, remove the blocking splash.
if (count) count.textContent = '100';
if (pre) pre.classList.add('done');
startHero();"""
text, count_replaced = pattern.subn(replacement, text, count=1)
if count_replaced != 1:
    raise SystemExit('Expected one preloader timer block to replace')

index_path.write_text(text)

qa_path = Path('qa/portfolio-v5.spec.mjs')
qa = qa_path.read_text()
qa = qa.replace("    expect(source).toContain('nova-card-scoreboard');\n", '')
qa = qa.replace("    expect(source).toContain('Recovery clarity · regression signal');\n", "    expect(source).toContain('Make protected money, sensitive-action consequences and failure recovery explicit');\n")

# The public surface no longer needs legacy Nova scoreboard/Figma strings as a
# source-of-truth gate. What matters is the lean product story + real proof path.
qa = qa.replace("    expect(source).toContain('Figma ↗');\n", "    expect(source).toContain('case-study-professional-work.html');\n")

# Rendered section evidence must be taken after the actual page is ready.
needle = "  await page.setViewportSize({ width: 1440, height: 1000 });\n  await page.goto(baseURL, { waitUntil: 'domcontentloaded' });\n\n  const names = await page.locator('#flagships [data-flagship] h3').allTextContents();"
replacement_test = "  await page.setViewportSize({ width: 1440, height: 1000 });\n  await page.goto(baseURL, { waitUntil: 'domcontentloaded' });\n  await expect(page.locator('.preloader')).toBeHidden();\n  await expect(page.locator('#hero')).toHaveClass(/ready/);\n\n  const names = await page.locator('#flagships [data-flagship] h3').allTextContents();"
if needle not in qa:
    raise SystemExit('Expected lean homepage test setup not found')
qa = qa.replace(needle, replacement_test, 1)

loop_needle = "    await page.setViewportSize({ width, height: 1000 });\n    await page.goto(baseURL, { waitUntil: 'domcontentloaded' });\n    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);"
loop_replace = "    await page.setViewportSize({ width, height: 1000 });\n    await page.goto(baseURL, { waitUntil: 'domcontentloaded' });\n    await expect(page.locator('.preloader')).toBeHidden();\n    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);"
if loop_needle not in qa:
    raise SystemExit('Expected lean screenshot loop not found')
qa = qa.replace(loop_needle, loop_replace, 1)

qa_path.write_text(qa)

for temp in [Path('.github/workflows/recruiter-scan-polish.yml'), Path('scripts/recruiter-scan-polish.py')]:
    if temp.exists():
        temp.unlink()
