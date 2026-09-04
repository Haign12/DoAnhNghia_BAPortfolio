import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const baseURL = 'http://127.0.0.1:4173/index.html';
const outDir = path.resolve('qa-artifacts');
await fs.mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const report = {
  generatedAt: new Date().toISOString(),
  browser: 'Chromium / Playwright',
  checks: [],
  captures: [],
};

const record = (name, pass, detail) => {
  report.checks.push({ name, pass: Boolean(pass), detail });
};

async function openPage(viewport, options = {}) {
  const context = await browser.newContext({
    viewport,
    reducedMotion: options.reducedMotion || 'no-preference',
    colorScheme: options.colorScheme || 'light',
  });
  const page = await context.newPage();
  const severe = [];
  page.on('pageerror', error => severe.push(`pageerror: ${error.message}`));
  page.on('console', msg => {
    if (msg.type() === 'error') severe.push(`console: ${msg.text()}`);
  });
  await page.goto(baseURL, { waitUntil: 'networkidle' });
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
    await Promise.all([...document.images].map(img => img.complete ? Promise.resolve() : new Promise(resolve => {
      img.addEventListener('load', resolve, { once: true });
      img.addEventListener('error', resolve, { once: true });
    })));
  });
  return { context, page, severe };
}

const matrices = [
  { name: 'home-1280x1080', width: 1280, height: 1080, fullPage: true },
  { name: 'home-1440x1080', width: 1440, height: 1080, fullPage: true },
  { name: 'home-1920x1080', width: 1920, height: 1080, fullPage: true },
  { name: 'hero-pressure-1881x782', width: 1881, height: 782, section: '.hero' },
  { name: 'hero-pressure-1280x720', width: 1280, height: 720, section: '.hero' },
  { name: 'work-1440x1080', width: 1440, height: 1080, section: '#work' },
  { name: 'practice-1440x900', width: 1440, height: 900, section: '.practice' },
  { name: 'experience-1440x900', width: 1440, height: 900, section: '#experience' },
  { name: 'motion-rail-1440x600', width: 1440, height: 600, section: '.motion-rail' },
  { name: 'contact-pressure-1268x642', width: 1268, height: 642, section: '#contact' },
  { name: 'contact-1440x900', width: 1440, height: 900, section: '#contact' },
];

for (const item of matrices) {
  const { context, page, severe } = await openPage({ width: item.width, height: item.height });
  const metrics = await page.evaluate(() => {
    const hero = document.querySelector('.hero');
    const heroArt = document.querySelector('.hero-art');
    const photo = document.querySelector('.hero-photo-wrap');
    const note = document.querySelector('.hero-note-card');
    const work = document.querySelector('#work');
    const contact = document.querySelector('#contact');
    const contactTitle = document.querySelector('#contact-title');
    const contactEmail = document.querySelector('.contact-email');
    const shell = contact?.querySelector('.shell');
    const documentWidth = document.documentElement.scrollWidth;
    const viewportWidth = document.documentElement.clientWidth;
    const toDocBottom = el => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return r.bottom + window.scrollY;
    };
    const toDocTop = el => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return r.top + window.scrollY;
    };
    const rect = el => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, width: r.width, height: r.height };
    };
    return {
      overflow: documentWidth > viewportWidth + 1,
      documentWidth,
      viewportWidth,
      heroBottom: toDocBottom(hero),
      heroArtBottom: toDocBottom(heroArt),
      photoBottom: toDocBottom(photo),
      noteBottom: toDocBottom(note),
      workTop: toDocTop(work),
      photoRect: rect(photo),
      noteRect: rect(note),
      contactTitleRect: rect(contactTitle),
      contactEmailRect: rect(contactEmail),
      contactShellRect: rect(shell),
      photoFit: photo ? getComputedStyle(photo.querySelector('img')).objectFit : null,
      photoPosition: photo ? getComputedStyle(photo.querySelector('img')).objectPosition : null,
      heroSansFont: document.querySelector('.hero-sans') ? getComputedStyle(document.querySelector('.hero-sans')).fontFamily : null,
      heroSerifFont: document.querySelector('#hero-title em') ? getComputedStyle(document.querySelector('#hero-title em')).fontFamily : null,
      metaFont: document.querySelector('.hero-index') ? getComputedStyle(document.querySelector('.hero-index')).fontFamily : null,
      groupHeadings: [...document.querySelectorAll('.project-group-head span:first-child')].map(el => el.textContent.trim()),
      groupRowCounts: [...document.querySelectorAll('.project-group')].map(group => group.querySelectorAll('.project-row').length),
    };
  });

  record(`${item.name}: no horizontal overflow`, !metrics.overflow, metrics);
  if (item.name.startsWith('hero-pressure')) {
    const artSafe = Math.max(metrics.photoBottom || 0, metrics.noteBottom || 0) <= (metrics.workTop || Infinity) + 1;
    record(`${item.name}: portrait/note stay before Work`, artSafe, metrics);
    record(`${item.name}: portrait fit contract`, metrics.photoFit === 'cover' && metrics.photoPosition === '50% 50%', { fit: metrics.photoFit, position: metrics.photoPosition });
  }
  if (item.name.startsWith('contact')) {
    const shell = metrics.contactShellRect;
    const title = metrics.contactTitleRect;
    const email = metrics.contactEmailRect;
    const titleSafe = shell && title && title.left >= shell.left - 1 && title.right <= shell.right + 1;
    const emailSafe = shell && email && email.left >= shell.left - 1 && email.right <= shell.right + 1;
    record(`${item.name}: contact title within shell`, titleSafe, { shell, title });
    record(`${item.name}: email within shell`, emailSafe, { shell, email });
  }
  if (item.name === 'work-1440x1080') {
    record('work: two explicit categories', metrics.groupHeadings.length === 2 && metrics.groupHeadings[0].includes('ORIGINAL CONCEPTS') && metrics.groupHeadings[1].includes('WEBSITE REDESIGNS'), metrics.groupHeadings);
    record('work: requested 4/2 project split', JSON.stringify(metrics.groupRowCounts) === JSON.stringify([4, 2]), metrics.groupRowCounts);
    record('type roles: DM Sans / Instrument Serif / DM Mono preserved', /DM Sans/.test(metrics.heroSansFont || '') && /Instrument Serif/.test(metrics.heroSerifFont || '') && /DM Mono/.test(metrics.metaFont || ''), { heroSansFont: metrics.heroSansFont, heroSerifFont: metrics.heroSerifFont, metaFont: metrics.metaFont });
  }
  record(`${item.name}: no severe console error`, severe.length === 0, severe);

  const file = path.join(outDir, `${item.name}.png`);
  if (item.section) {
    const locator = page.locator(item.section);
    await locator.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1100);
    await locator.screenshot({ path: file });
  } else {
    await page.screenshot({ path: file, fullPage: Boolean(item.fullPage) });
  }
  report.captures.push({ name: item.name, file: path.basename(file), viewport: { width: item.width, height: item.height }, section: item.section || 'full-page' });
  await context.close();
}

// Keyboard/focus parity for the live project preview.
{
  const { context, page, severe } = await openPage({ width: 1440, height: 1080 });
  const capital = page.locator('.project-row[data-project="Capital Place"]');
  await capital.focus();
  await page.waitForTimeout(1050);
  const title = (await page.locator('#projectPreviewTitle').textContent())?.trim();
  record('keyboard focus updates Capital Place preview', title === 'Capital Place', { title });
  record('keyboard preview check has no severe console error', severe.length === 0, severe);
  await page.locator('#work').screenshot({ path: path.join(outDir, 'work-keyboard-capital-1440x1080.png') });
  report.captures.push({ name: 'work-keyboard-capital-1440x1080', file: 'work-keyboard-capital-1440x1080.png', viewport: { width: 1440, height: 1080 }, section: '#work' });
  await context.close();
}

// Reduced-motion contract: decorative running type stops and reveal content remains visible.
{
  const { context, page, severe } = await openPage({ width: 1440, height: 900 }, { reducedMotion: 'reduce' });
  const state = await page.evaluate(() => {
    const rail = document.querySelector('.motion-rail-track');
    const photo = document.querySelector('.hero-photo-wrap');
    const titlePart = document.querySelector('.hero-copy h1 > span');
    const railStyle = rail ? getComputedStyle(rail) : null;
    const photoStyle = photo ? getComputedStyle(photo) : null;
    const titleStyle = titlePart ? getComputedStyle(titlePart) : null;
    return {
      railAnimation: railStyle?.animationName,
      photoOpacity: photoStyle?.opacity,
      photoClip: photoStyle?.clipPath,
      titleOpacity: titleStyle?.opacity,
      titleClip: titleStyle?.clipPath,
    };
  });
  const reducedPass = (state.railAnimation === 'none' || state.railAnimation === '') && state.photoOpacity === '1' && state.titleOpacity === '1';
  record('prefers-reduced-motion disables decorative motion without hiding content', reducedPass, state);
  record('reduced-motion check has no severe console error', severe.length === 0, severe);
  await page.screenshot({ path: path.join(outDir, 'home-reduced-motion-1440x900.png'), fullPage: false });
  report.captures.push({ name: 'home-reduced-motion-1440x900', file: 'home-reduced-motion-1440x900.png', viewport: { width: 1440, height: 900 }, section: 'viewport' });
  await context.close();
}

report.failed = report.checks.filter(check => !check.pass);
report.summary = {
  total: report.checks.length,
  passed: report.checks.length - report.failed.length,
  failed: report.failed.length,
};

await fs.writeFile(path.join(outDir, 'metrics.json'), JSON.stringify(report, null, 2));
await browser.close();

console.log(JSON.stringify(report.summary));
if (report.failed.length) {
  console.error(JSON.stringify(report.failed, null, 2));
  process.exit(1);
}
