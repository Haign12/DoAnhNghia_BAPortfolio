import fs from 'node:fs';

const homePath = 'index.html';
const qaPath = 'qa/portfolio-v5.spec.mjs';
let home = fs.readFileSync(homePath, 'utf8');
let qa = fs.readFileSync(qaPath, 'utf8');

function sectionOpenById(source, id) {
  const re = new RegExp(`<section\\b[^>]*id=["']${id}["'][^>]*>`, 'i');
  const match = re.exec(source);
  if (!match) throw new Error(`Missing section #${id}`);
  return { index: match.index, end: match.index + match[0].length };
}

function balancedDivRegion(source, start) {
  const tagRe = /<\/?div\b[^>]*>/g;
  tagRe.lastIndex = start;
  let depth = 0;
  for (let match; (match = tagRe.exec(source)); ) {
    const closing = match[0].startsWith('</');
    depth += closing ? -1 : 1;
    if (depth === 0) return { start, end: tagRe.lastIndex };
  }
  throw new Error('Unclosed div region');
}

function flagshipArticle(region, token) {
  const cards = [...region.matchAll(/<article class="flagship-card[\s\S]*?<\/article>/g)].map(match => match[0]);
  const card = cards.find(item => item.includes(token));
  if (!card) throw new Error(`Missing flagship ${token}`);
  return card;
}

const flagships = sectionOpenById(home, 'flagships');
const gridStart = home.indexOf('<div class="flagship-grid">', flagships.end);
if (gridStart < 0) throw new Error('Missing flagship grid');
const grid = balancedDivRegion(home, gridStart);
const currentGrid = home.slice(grid.start, grid.end);
const nova = flagshipArticle(currentGrid, 'case-study-nova.html');
const sentry = flagshipArticle(currentGrid, 'case-study-sentry.html');
flagshipArticle(currentGrid, 'case-study-uiux-factory.html');

const luxRoom = `    <article class="flagship-card reveal flagship-commerce-card" data-flagship="luxroom">
      <a class="flagship-media" href="case-study-luxroom.html" aria-label="Read LuxRoom ecommerce case study"><img src="assets/images/luxroom.webp" alt="LuxRoom premium furniture commerce interface" loading="lazy"></a>
      <div class="flagship-copy">
        <div class="flagship-meta"><span>03 · ECOMMERCE</span><span>INDEPENDENT PRODUCT PROTOTYPE</span></div>
        <h3>LuxRoom</h3>
        <p>High-consideration furniture commerce where room context, dimensions and the exact selected finish stay continuous from product detail through cart and checkout.</p>
        <div class="flagship-signals" aria-label="LuxRoom proof signals"><span><b>Judgment</b>Purchase confidence · configuration continuity</span><span><b>Craft</b>Responsive PDP → cart → checkout</span><span><b>Evidence</b>Prototype / technical · observed test pending</span></div>
        <div class="flagship-links"><a href="case-study-luxroom.html">Read case ↗</a><a href="https://lux-room.vercel.app/" target="_blank" rel="noopener" class="link-primary">Live prototype ↗</a></div>
      </div>
    </article>`;

const newGrid = `<div class="flagship-grid">\n${nova}\n${sentry}\n${luxRoom}\n  </div>`;
home = home.slice(0, grid.start) + newGrid + home.slice(grid.end);

if (!home.includes('data-how-i-work="uiux-factory"')) {
  const ai = sectionOpenById(home, 'ai-workflow');
  const support = `\n  <article class="writing-card reveal workflow-support" data-how-i-work="uiux-factory"><div class="writing-meta"><span>HOW I WORK</span><span>SUPPORTING PROOF</span></div><h3>UIUX Factory</h3><p>An inspectable AI-assisted design workflow for grounding, alternative exploration, design-to-code and browser QA. It supports the product work; it is not a flagship product case.</p><div class="writing-actions"><a class="button white" href="case-study-uiux-factory.html">Inspect workflow ↗</a><a href="https://github.com/Ngh1aa/uiux-ai-workspace" target="_blank" rel="noopener">Repository ↗</a></div></article>`;
  home = home.slice(0, ai.end) + support + home.slice(ai.end);
}

if (!home.includes('data-professional-work="verified"')) {
  const experience = sectionOpenById(home, 'experience');
  const proof = `\n  <article class="writing-card reveal professional-work-cta" data-professional-work="verified"><div class="writing-meta"><span>PROFESSIONAL WORK</span><span>VERIFIED DELIVERY · 2025–2026</span></div><h3>MangoAds · Tikera · Trésor</h3><p>Paid UI/UX delivery separated from independent concepts: requirements, responsive systems, lifecycle states, reusable patterns and design-to-development handoff — without invented business impact.</p><div class="writing-actions"><a class="button white" href="case-study-professional-work.html">View Professional Work ↗</a><a href="Do_Anh_Nghia_Product_Designer_CV.pdf" target="_blank" rel="noopener">Resume ↗</a></div></article>`;
  home = home.slice(0, experience.end) + proof + home.slice(experience.end);
}

// Update only recruiter-hierarchy assertions. The 14-card supporting capability library remains intact.
qa = qa.replace(
  `await expect(page.locator('#flagships .flagship-card').first().getByRole('heading', { level: 3 })).toHaveText('UIUX Factory');\n    await expect(page.locator('#flagships a[href="case-study-uiux-factory.html"]').first()).toBeVisible();\n    await expect(page.locator('#flagships a[href="case-study-nova.html"]').first()).toBeVisible();\n    await expect(page.locator('#flagships a[href="case-study-sentry.html"]').first()).toBeVisible();`,
  `await expect(page.locator('#flagships .flagship-card').first().getByRole('heading', { level: 3 })).toHaveText('Nova');\n    await expect(page.locator('#flagships a[href="case-study-nova.html"]').first()).toBeVisible();\n    await expect(page.locator('#flagships a[href="case-study-sentry.html"]').first()).toBeVisible();\n    await expect(page.locator('#flagships a[href="case-study-luxroom.html"]').first()).toBeVisible();\n    await expect(page.locator('[data-how-i-work="uiux-factory"] a[href="case-study-uiux-factory.html"]')).toBeVisible();\n    await expect(page.locator('[data-professional-work="verified"] a[href="case-study-professional-work.html"]')).toBeVisible();`
);
qa = qa.replace(`for (const project of ['UIUX Factory', 'Nova', 'Sentry']) {`, `for (const project of ['Nova', 'Sentry', 'LuxRoom']) {`);

const postFlagships = sectionOpenById(home, 'flagships');
const postEnd = home.indexOf('</section>', postFlagships.end);
const flagshipRegion = home.slice(postFlagships.end, postEnd);
const order = ['case-study-nova.html', 'case-study-sentry.html', 'case-study-luxroom.html'].map(token => flagshipRegion.indexOf(token));
if (order.some(index => index < 0) || !(order[0] < order[1] && order[1] < order[2])) throw new Error(`Bad flagship order ${order.join('/')}`);
if (flagshipRegion.includes('case-study-uiux-factory.html')) throw new Error('Factory still in flagship region');
if ((home.match(/<span class="project-no">/g) || []).length !== 14) throw new Error('Supporting library was mutated');
if (!home.includes('data-project="hue-between-river-citadel"')) throw new Error('HUẾ support card lost');
if (!home.includes('case-study-lumen.html')) throw new Error('LUMEN support card lost');
if (!home.includes('data-how-i-work="uiux-factory"')) throw new Error('Factory How I work proof missing');
if (!home.includes('data-professional-work="verified"')) throw new Error('Professional Work proof missing');
if (!qa.includes(`for (const project of ['Nova', 'Sentry', 'LuxRoom']) {`)) throw new Error('A28 QA not migrated');
if (!qa.includes(`toHaveText('Nova')`)) throw new Error('Flagship first-card QA not migrated');

fs.writeFileSync(homePath, home);
fs.writeFileSync(qaPath, qa);
console.log('Lean homepage migration complete without mutating the 14-card supporting library.');
