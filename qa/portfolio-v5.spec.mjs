import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';

const baseURL = process.env.PORTFOLIO_BASE_URL || 'http://127.0.0.1:4173';
const viewports = [
  { name: 'desktop-1440', width: 1440, height: 1000 },
  { name: 'desktop-1280', width: 1280, height: 900 },
  { name: 'mobile-390', width: 390, height: 844 },
];

const criticalCaseStudies = [
  { path: 'case-study-uiux-factory.html', heading: 'UIUX Factory' },
  { path: 'case-study-nova.html', heading: 'Nova' },
  { path: 'case-study-sentry.html', heading: 'Sentry' },
  { path: 'case-study-flux.html', heading: 'Flux' },
  { path: 'case-study-access.html', heading: 'ACCESS' },
  { path: 'case-study-atelier.html', heading: 'Atelier' },
  { path: 'case-study-vas-education.html', heading: 'VAS Education' },
  { path: 'case-study-violet-marketplace.html', heading: 'Violet Marketplace' },
  { path: 'case-study-cennext.html', heading: 'CENNEXT' },
  { path: 'case-study-voltis.html', heading: 'VOLTIS' },
  { path: 'case-study-lumen.html', heading: 'LUMEN' },
  { path: 'case-study-hue.html', heading: 'HUẾ — Between River & Citadel' },
];

const seriousAxeViolations = async page => {
  const results = await new AxeBuilder({ page }).analyze();
  return results.violations.filter(v => ['serious', 'critical'].includes(v.impact));
};

const formatAxeViolations = blockers => blockers.flatMap(violation =>
  violation.nodes.map(node => {
    const target = Array.isArray(node.target) ? node.target.join(' ') : String(node.target);
    const summary = (node.failureSummary || '').replace(/\s+/g, ' ').trim();
    return `${violation.id} @ ${target}${summary ? ` — ${summary}` : ''}`;
  })
).join('\n');


test('recruiter essentials are concise, source-authored and ordered around work', async ({page}) => {
  await page.goto(baseURL,{waitUntil:'networkidle'});
  await expect(page).toHaveTitle(/Product Designer/);
  await expect(page.locator('#hero')).toContainText('UI/UX & Product Designer');
  await expect(page.getByRole('heading',{level:1})).toHaveText('Complexity,made clear.');
  expect(await page.locator('[data-flagship] h3').allTextContents()).toEqual(['LuxRoom ↗','Atelier ↗','Flux ↗']);
  const sectionOrder=await page.locator('main>section').evaluateAll(nodes=>nodes.map(n=>n.id));
  expect(sectionOrder.indexOf('flagships')).toBeLessThan(sectionOrder.indexOf('story'));
  expect(await page.locator('#hero').innerText().then(t=>t.split(/\s+/).length)).toBeLessThan(60);
  await expect(page.locator('#ai-workflow')).toContainText('I own the design decisions');
  await expect(page.locator('#flagships')).not.toContainText('UIUX Factory');
  await expect(page.locator('#experience article')).toHaveCount(3);
  await expect(page.locator('.resume-link')).toHaveAttribute('href','Do_Anh_Nghia_UIUXDesigner_CV.pdf');
});

test('navigation, core copy and all projects remain usable without JavaScript', async ({browser}) => {
  const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
  const page=await context.newPage();
  await page.goto(baseURL,{waitUntil:'networkidle'});
  await expect(page.getByRole('heading',{level:1})).toBeVisible();
  await expect(page.locator('.nav-links a').first()).toBeVisible();
  await expect(page.locator('.index-card:visible')).toHaveCount(20);
  await expect(page.locator('.project-tools')).toBeHidden();
  await context.close();
});

test('all categories filter and reset without losing links', async ({page}) => {
  await page.goto(baseURL);
  for(const filter of await page.locator('.filter').all()) {
    const count=Number(await filter.locator('span').innerText());
    await filter.click();
    await expect(filter).toHaveAttribute('aria-pressed','true');
    await expect(page.locator('.index-card:visible')).toHaveCount(count);
    await expect(page.locator('#filterStatus')).toContainText(String(count));
  }
  await page.locator('[data-filter="all"]').click();
  await expect(page.locator('.index-card:visible')).toHaveCount(20);
  await expect(page.locator('#work a[href="#"]')).toHaveCount(0);
});

test('legacy category deep links restore visible project groups', async ({page}) => {
  await page.goto(baseURL+'/#group-culture');
  await expect(page.locator('#group-culture')).toBeVisible();
  await expect(page.locator('#work [data-project="hue"] [data-artifact-kind="case"]')).toBeVisible();
  await page.locator('[data-filter="fintech"]').click();
  await expect(page.locator('#group-culture')).toBeHidden();
  await page.evaluate(() => { location.hash='group-commerce'; });
  await expect(page.locator('#group-culture')).toBeVisible();
});

test('mobile menu supports dismissal, Escape focus recovery and navigation', async ({page}) => {
  await page.setViewportSize({width:390,height:844});
  await page.goto(baseURL);
  const menu=page.locator('#menuBtn');
  await expect(menu).toHaveAttribute('aria-expanded','false');
  await menu.click();
  await expect(page.locator('.nav-links a').first()).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(menu).toBeFocused();
  await expect(menu).toHaveAttribute('aria-expanded','false');
  await menu.click();
  await page.locator('.nav-links a[href="#flagships"]').click();
  await expect(menu).toHaveAttribute('aria-expanded','false');
  await expect(page).toHaveURL(/#flagships$/);
});

test('system theme and manual preference survive reloads', async ({browser}) => {
  const context=await browser.newContext({colorScheme:'dark'});
  const page=await context.newPage();
  await page.goto(baseURL);
  await expect(page.locator('#themeToggle')).toHaveText('Light');
  await page.locator('#themeToggle').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme','light');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme','light');
  await expect(page.locator('#themeToggle')).toHaveText('Dark');
  await context.close();
});

test('homepage publishes honest project evidence without implying impact', async ({page}) => {
  await page.goto(baseURL);
  await expect(page.locator('[data-project="nova"]')).toContainText('10 async self-reports across two rounds');
  await expect(page.locator('[data-project="nova"]')).toContainText('awaits human retesting');
  await expect(page.locator('[data-project="sentry"]')).toContainText('Practitioner validation remains open');
  await expect(page.locator('[data-flagship="luxroom"]')).toContainText('User testing and conversion impact unmeasured');
  const source=await fs.readFile('index.html','utf8');
  expect(source).not.toContain('<a href="#">');
  expect(source).not.toContain('fonts.googleapis.com');
  expect(source).toContain('Independent concepts');
});

for(const width of [320,390,600,768,839,840,1024,1280,1440]) {
  test('responsive layout and primary media at '+width+'px',async ({page}) => {
    await page.setViewportSize({width,height:900});
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto(baseURL,{waitUntil:'networkidle'});
    for(const image of await page.locator('img').all()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate(async img=>{
        if(!img.complete) await new Promise((resolve,reject)=>{
          img.addEventListener('load',resolve,{once:true});
          img.addEventListener('error',()=>reject(new Error(`Image failed: ${img.src}`)),{once:true});
        });
        if(!img.naturalWidth) throw new Error(`Image has no pixels: ${img.src}`);
        await img.decode();
      });
    }

    expect(await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
    expect(await page.locator('img').evaluateAll(images=>images.every(i=>i.complete&&i.naturalWidth>0))).toBe(true);
    expect(errors).toEqual([]);
    const targets=await page.locator('.artifact-links a,.button,.project-heading h3 a').evaluateAll(nodes=>nodes.filter(n=>n.getClientRects().length).map(n=>({text:n.textContent,width:n.getBoundingClientRect().width,height:n.getBoundingClientRect().height})));
    expect(targets.filter(t=>t.width<43.9||t.height<43.9)).toEqual([]);
    await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
    await fs.mkdir('qa-artifacts',{recursive:true});
    await page.screenshot({path:'qa-artifacts/minimal-'+width+'.png',fullPage:true});
  });
}

for(const theme of ['light','dark']) {
  test('no serious or critical axe violations in '+theme,async ({page})=>{
    await page.emulateMedia({colorScheme:theme});
    await page.goto(baseURL,{waitUntil:'networkidle'});
    expect(await seriousAxeViolations(page)).toEqual([]);
  });
}

test('200 percent text and keyboard focus retain the primary journey',async ({page})=>{
  await page.setViewportSize({width:768,height:900});
  await page.goto(baseURL);
  await page.addStyleTag({content:'html{font-size:200%}body{font-size:1rem}p,a,button,summary{font-size:1em!important}h1{font-size:6rem!important}h2{font-size:3rem!important}h3{font-size:2rem!important}'});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
  await page.keyboard.press('Tab');
  await expect(page.locator('.skip')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#flagships$/);
});
  test('measurement targets are explicit targets, never fabricated results', async () => {
    const registry = JSON.parse(await fs.readFile('docs/measurement-targets.json', 'utf8'));
    expect(registry.policy.target_is_not_result).toBe(true);
    expect(registry.policy.result_requires_traceable_evidence).toBe(true);
    expect(registry.projects.length).toBeGreaterThanOrEqual(21);
    for (const caseStudy of criticalCaseStudies) {
      const source = await fs.readFile(caseStudy.path, 'utf8');
      expect(source).toContain('A26_MEASUREMENT_TARGETS');
      expect(source).toContain('TARGET — NOT A RESULT');
      expect(source).toContain('No invented before/after delta.');
    }
    const home = await fs.readFile('index.html', 'utf8');
    expect(home).toContain('Practitioner validation remains open.');
    expect(home).toContain('User testing and conversion impact unmeasured.');
  });

  test('primary local routes referenced from home resolve', async ({ page, request }) => {
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    const paths = await page.locator('a[href$=".html"]').evaluateAll(links => [...new Set(
      links.map(link => link.getAttribute('href')).filter(Boolean)
    )]);
    expect(paths.length).toBeGreaterThanOrEqual(12);
    expect(paths).toContain('case-study-uiux-factory.html');
    expect(paths).toContain('case-study-nova.html');
    expect(paths).toContain('case-study-sentry.html');
    expect(paths).toContain('case-study-flux.html');
    expect(paths).toContain('case-study-access.html');
    expect(paths).toContain('writing-design-ops-ai.html');
    for (const path of paths) {
      const response = await request.get(`${baseURL}/${path}`);
      expect(response.status(), `${path} should resolve`).toBeLessThan(400);
    }
  });

  for (const caseStudy of criticalCaseStudies) {
    test(`${caseStudy.heading} case study renders accessibly without horizontal overflow`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${baseURL}/${caseStudy.path}`, { waitUntil: 'domcontentloaded' });
      await expect(page.getByRole('heading', { level: 1, name: caseStudy.heading })).toBeVisible();
      await expect(page.locator('.case-evidence-strip').first()).toBeVisible();
      const overflow = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 1);
      const blockers = await seriousAxeViolations(page);
      expect(blockers, formatAxeViolations(blockers) || `${caseStudy.heading}: serious/critical Axe violation detected`).toEqual([]);
    });
  }

  test('thought leadership article renders accessibly and keeps claim boundaries visible', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${baseURL}/writing-design-ops-ai.html`, { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('heading', { level: 1, name: 'From AI tools to design governance' })).toBeVisible();
    await expect(page.getByText(/A process becomes leadership evidence when it helps someone else/i)).toBeVisible();
    const overflow = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth }));
    expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 1);
    const blockers = await seriousAxeViolations(page);
    expect(blockers, formatAxeViolations(blockers) || 'Thought leadership article: serious/critical Axe violation detected').toEqual([]);
  });

  test('Nova case-study theme preference is a working enhancement', async ({ page }) => {
    await page.goto(`${baseURL}/case-study-nova.html`, { waitUntil: 'domcontentloaded' });
    const toggle = page.locator('#theme-toggle');
    const before = await page.locator('html').getAttribute('data-theme');
    await toggle.click();
    const after = await page.locator('html').getAttribute('data-theme');
    expect(after).not.toBe(before);
    await page.reload({ waitUntil: 'domcontentloaded' });
    await expect(page.locator('html')).toHaveAttribute('data-theme', after);
  });
  test('A27 senior decision evidence is explicit and honest across every local case', async () => {
    const registry = JSON.parse(await fs.readFile('docs/senior-decision-evidence.json', 'utf8'));
    expect(registry.policy.no_invented_team_or_stakeholders).toBe(true);
    expect(registry.policy.no_invented_failure_or_pivot).toBe(true);
    expect(registry.policy.no_invented_engineering_collaboration).toBe(true);
    expect(registry.policy.no_invented_outcome).toBe(true);
    expect(registry.projects).toHaveLength(20);
    const required = ['ROLE','TEAM','CONSTRAINT','OPTIONS','DECISION','TRADE-OFF','ENGINEERING','SYSTEM IMPACT','WHAT WENT WRONG','EVIDENCE','NEXT DECISION'];
    expect(registry.required_fields).toEqual(required);
    for (const item of registry.projects) {
      const source = await fs.readFile(item.surface, 'utf8');
      expect(source).toContain('A27_SENIOR_DECISION_EVIDENCE');
      for (const field of required) expect(source).toContain(`data-a27-field="${field}"`);
      expect(item.evidence).toMatch(/NOT MEASURED|RECRUITING|TARGET|VERIFIED|NOT AN OUTCOME/i);
      expect(item.team.length).toBeGreaterThan(20);
      expect(item.next_decision.length).toBeGreaterThan(20);
    }
    const factory = registry.projects.find(item => item.surface === 'case-study-uiux-factory.html');
    expect(factory.what_went_wrong).toMatch(/raw-source|runtime repair/i);
    const nova = registry.projects.find(item => item.surface === 'case-study-nova.html');
    expect(nova.audit.options_documented).toBe(true);
    expect(nova.audit.tradeoff_documented).toBe(true);
    const sentry = registry.projects.find(item => item.surface === 'case-study-sentry.html');
    expect(sentry.audit.options_documented).toBe(true);
    expect(sentry.audit.tradeoff_documented).toBe(true);
  });


test('A32 case studies expose a 30-second proof strip with honest evidence boundaries', async ({ page }) => {
  for (const route of ['case-study-luxroom.html', 'case-study-flux.html', 'case-study-uiux-factory.html']) {
    await page.goto(`${baseURL}/${route}`);
    await expect(page.locator('#project-30-sec-proof')).toHaveCount(1);
    await expect(page.locator('#project-30-sec-proof .project-recruiter-proof-grid > article')).toHaveCount(6);
    await expect(page.locator('#project-30-sec-proof')).toContainText('Still open');
  }
  await page.goto(`${baseURL}/case-study-luxroom.html`);
  await expect(page.locator('#project-30-sec-proof')).toContainText('direct-user baseline not measured');
  await page.goto(`${baseURL}/case-study-uiux-factory.html`);
  await expect(page.locator('#project-30-sec-proof')).toContainText('human workflow impact not measured');
});

test('every existing project case is visible in exactly one classified catalog entry', async ({page})=>{
  const expected=(await fs.readdir('.')).filter(file=>/^case-study-.*\.html$/.test(file)&&file!=='case-study-professional-work.html').sort();
  await page.goto(baseURL);
  const actual=await page.locator('#work .index-card [data-artifact-kind="case"]').evaluateAll(links=>links.map(a=>a.getAttribute('href')).sort());
  expect(actual).toEqual(expected);
  await expect(page.locator('#work .index-card:visible')).toHaveCount(expected.length);
  await expect(page.locator('#work .project-group:visible')).toHaveCount(6);
  await expect(page.locator('#work details')).toHaveCount(0);
  for(const card of await page.locator('#work .index-card').all()) {
    await expect(card.locator('.index-skills')).not.toBeEmpty();
    await expect(card.locator('.index-summary')).not.toBeEmpty();
    await expect(card.locator('.index-evidence')).not.toBeEmpty();
  }
});

test('search combines with category filtering and recovers from no results',async ({page})=>{
  await page.goto(baseURL);
  const search=page.getByRole('searchbox',{name:'Find a project'});
  await search.fill('Hue');
  await expect(page.locator('.index-card:visible')).toHaveCount(1);
  await expect(page.locator('[data-project="hue"]')).toBeVisible();
  await search.fill('Huế');
  await expect(page.locator('.index-card:visible')).toHaveCount(1);
  await page.locator('[data-filter="fintech"]').click();
  await expect(page.locator('#catalogEmpty')).toBeVisible();
  await expect(page.locator('.index-card:visible')).toHaveCount(0);
  await page.getByRole('button',{name:'Clear filters'}).click();
  await expect(search).toHaveValue('');
  await expect(search).toBeFocused();
  await expect(page.locator('.index-card:visible')).toHaveCount(20);
  await expect(page.locator('#catalogEmpty')).toBeHidden();
});
