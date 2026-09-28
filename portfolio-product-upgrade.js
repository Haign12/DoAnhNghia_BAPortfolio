(() => {
  const run = () => {
    document.body.classList.add('leadership-track');
    document.title = 'Do Anh Nghia — Product Designer · Systems · AI-assisted Design-to-Code';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Product design portfolio by Do Anh Nghia — fintech and B2B product reasoning, systems thinking, working prototypes, AI-assisted design-to-code and evidence-aware browser QA.');

    const roleWrap = document.querySelector('.hero-roles');
    if (roleWrap) {
      roleWrap.setAttribute('aria-label', 'Product design, systems, prototypes and AI-assisted quality assurance');
      roleWrap.innerHTML = [
        '<span class="role-line"><b>PRODUCT</b></span>',
        '<span class="role-line"><b>SYSTEMS</b></span>',
        '<span class="role-line"><b>PROTOTYPES</b></span>',
        '<span class="role-line"><b>AI + QA</b></span>'
      ].join('');
      requestAnimationFrame(() => document.getElementById('hero')?.classList.add('ready'));
    }

    const intro = document.querySelector('.hero-intro');
    if (intro) {
      intro.innerHTML = '<span class="status"><i></i> Product Designer · Fintech / B2B · AI-assisted design-to-code</span>I turn <strong>ambiguous product problems into inspectable decisions, flows, systems and working prototypes</strong>. AI accelerates synthesis, exploration, implementation and QA; product judgment, evidence boundaries and consequential decisions remain human-owned.<span class="hero-positioning">Current evidence boundary: most portfolio cases are independent concepts. Where direct user research or production metrics are missing, I label the gap and define the next validation instead of converting hypotheses into “results.”</span>';
    }

    const note = document.querySelector('.hero-note');
    if (note) note.innerHTML = '<strong>Decisions before screens.</strong><br>Problem → evidence → flow → system → prototype → validation → repair.';

    const side = document.querySelector('.hero-side');
    if (side) side.innerHTML = '<strong>03</strong><span>flagships · product + systems</span>';

    const marqueeItems = ['Product reasoning', 'Financial systems', 'Decision design', 'AI-assisted workflow', 'Evidence + browser QA'];
    document.querySelectorAll('.marquee-set').forEach((set, setIndex) => {
      set.innerHTML = marqueeItems.map(item => `<span class="marquee-item"${setIndex ? ' aria-hidden="true"' : ''}>${item}</span>`).join('');
    });

    const story = document.getElementById('story');
    if (story) {
      const eyebrow = story.querySelector('.eyebrow');
      const title = story.querySelector('.section-title');
      const lead = story.querySelector('.section-lead');
      if (eyebrow) eyebrow.textContent = 'Product practice';
      if (title) title.textContent = 'Decisions before screens.';
      if (lead) lead.innerHTML = 'Polished UI is only useful when the team can explain <strong>what decision it supports, what evidence shaped it, what trade-off was made and how the result will be checked.</strong> My work therefore connects product framing, information architecture, interaction states, visual systems, working code and evidence-aware QA.';

      const principleData = [
        ['Frame the decision, not the screen', 'Start with the user decision, owner objective, risk and success signal before choosing a feature or layout.'],
        ['Separate evidence from hypothesis', 'Benchmarks, AI critique and heuristic review can guide a design; they do not become user research unless users actually produced the evidence.'],
        ['Carry intent into working behavior', 'Flows, states, responsive rules and recovery paths belong in the prototype — not only in presentation slides.'],
        ['Use AI to increase leverage, not authority', 'AI can inspect, synthesize, generate alternatives, implement and test. Humans retain product priorities, research interpretation, trade-offs and release judgment.']
      ];
      story.querySelectorAll('.principle').forEach((node, index) => {
        const data = principleData[index];
        if (!data) return;
        const h3 = node.querySelector('h3');
        const p = node.querySelector('p');
        if (h3) h3.textContent = data[0];
        if (p) p.textContent = data[1];
      });
    }

    const flagships = document.getElementById('flagships');
    if (flagships) {
      const eyebrow = flagships.querySelector('.eyebrow');
      const title = flagships.querySelector('.section-title');
      const lead = flagships.querySelector('.section-lead');
      const metaCopy = flagships.querySelector('.flagship-meta');
      if (eyebrow) eyebrow.textContent = 'Flagship product + systems work';
      if (title) title.innerHTML = 'Three cases.<br>One product practice.';
      if (lead) lead.innerHTML = 'The sequence shows how I work across <strong>AI-assisted delivery systems → consumer financial decisions → operational risk systems.</strong>';
      if (metaCopy) metaCopy.innerHTML = '<strong>Selection logic:</strong> these cases expose reasoning, state design, implementation proof, evidence boundaries and how I use AI without outsourcing product judgment.';

      const grid = flagships.querySelector('.flagship-grid');
      if (grid) {
        grid.innerHTML = `
          <article class="flagship-card reveal in-view flagship-ops-card">
            <a class="flagship-media" href="case-study-uiux-factory.html" aria-label="Read UIUX Factory Design Operations case study">
              <img src="thumbnail/uiux-factory.svg" alt="UIUX Factory design operating system workflow" loading="lazy" decoding="async">
              <span class="flagship-proof">AI workflow + evidence</span>
            </a>
            <div class="flagship-copy">
              <div class="flagship-index"><span>01 / AI-assisted DesignOps</span><span>Working repository</span></div>
              <h3>UIUX Factory</h3>
              <p class="flagship-thesis">A verifiable operating system for project truth, decision contracts, implementation, browser QA and root-cause repair — built to make AI-assisted work faster without making evidence or ownership optional.</p>
              <div class="flagship-evidence">
                <div><span>Product decision</span><p>Use AI as an inspectable co-pilot across research synthesis, exploration, implementation and QA instead of treating generated output as final authority.</p></div>
                <div><span>Evidence boundary</span><p>Repository, contracts and QA harness are real; organization-wide adoption and efficiency gains are not claimed.</p></div>
              </div>
              <div class="flagship-actions"><a class="flagship-primary" href="case-study-uiux-factory.html">Read case ↗</a><a href="writing-design-ops-ai.html">Article ↗</a><a href="https://github.com/Ngh1aa/uiux-ai-workspace" target="_blank" rel="noopener">Repository ↗</a></div>
            </div>
          </article>

          <article class="flagship-card reveal in-view">
            <a class="flagship-media" href="case-study-nova.html" aria-label="Read Nova Product Design case study">
              <img src="thumbnail/nova.png" alt="Nova consumer finance product interface" loading="lazy" decoding="async">
              <span class="flagship-proof">Consumer decision design</span>
            </a>
            <div class="flagship-copy">
              <div class="flagship-index"><span>02 / Consumer fintech</span><span>Independent concept</span></div>
              <h3>Nova</h3>
              <p class="flagship-thesis">Personal finance organized around a harder question than “what is my balance?” — what is actually safe to spend after known obligations and a protected buffer?</p>
              <div class="flagship-evidence">
                <div><span>Decision</span><p>Bring future obligations into the primary money-decision surface without turning home into a spreadsheet.</p></div>
                <div><span>Product proof</span><p>Alternatives, trade-offs, recovery states, measurement plan and working responsive prototype.</p></div>
              </div>
              <div class="flagship-actions"><a class="flagship-primary" href="case-study-nova.html">Read case ↗</a><a href="https://nova-gamma-eosin.vercel.app/" target="_blank" rel="noopener">Live ↗</a><a href="https://github.com/Ngh1aa/Nova" target="_blank" rel="noopener">Source ↗</a></div>
            </div>
          </article>

          <article class="flagship-card reveal in-view">
            <a class="flagship-media" href="case-study-sentry.html" aria-label="Read Sentry Product Design case study">
              <img src="thumbnail/sentry.png" alt="Sentry fraud operations investigation interface" loading="lazy" decoding="async">
              <span class="flagship-proof">Operational systems</span>
            </a>
            <div class="flagship-copy">
              <div class="flagship-index"><span>03 / Risk operations</span><span>Independent concept</span></div>
              <h3>Sentry</h3>
              <p class="flagship-thesis">A high-density investigation workspace organized around one consequential decision: correlate evidence, understand conflicts and record a defensible action without losing context.</p>
              <div class="flagship-evidence">
                <div><span>Decision</span><p>Keep alert priority, forensic evidence, consequence and recovery visible inside one stable investigation model.</p></div>
                <div><span>Product proof</span><p>Queue, evidence, decision and recovery states demonstrate pressure beyond a happy-path dashboard.</p></div>
              </div>
              <div class="flagship-actions"><a class="flagship-primary" href="case-study-sentry.html">Read case ↗</a><a href="https://sentry-9bqs.vercel.app/" target="_blank" rel="noopener">Live ↗</a><a href="https://github.com/Ngh1aa/Sentry" target="_blank" rel="noopener">Source ↗</a></div>
            </div>
          </article>`;
      }

      const boundary = flagships.querySelector('.flagship-boundary');
      if (boundary) boundary.innerHTML = '<span><strong>Evidence boundary:</strong> Nova and Sentry are independent concepts. UIUX Factory is a working repository. Planned usability tests, adoption and target metrics are kept separate from verified outcomes.</span>';
    }

    if (flagships && !document.getElementById('ai-workflow')) {
      const ai = document.createElement('section');
      ai.className = 'section leadership-section';
      ai.id = 'ai-workflow';
      ai.setAttribute('aria-labelledby', 'ai-workflow-title');
      ai.innerHTML = `
        <div class="leadership-head reveal in-view">
          <div>
            <p class="eyebrow">How I use AI</p>
            <h2 class="section-title" id="ai-workflow-title">AI is a multiplier, not the product owner.</h2>
          </div>
          <p class="section-lead">My workflow uses AI where it creates leverage — <strong>grounding, synthesis, alternatives, implementation, critique and QA</strong> — while keeping user evidence, product priorities, design rationale and release decisions explicitly human-owned.</p>
        </div>
        <div class="leadership-grid">
          <article class="leadership-card reveal in-view"><div class="leadership-card-top"><span>01 / GROUND + SYNTHESIZE</span><span class="evidence-pill verified">VERIFIED</span></div><h3>Start from project truth</h3><p>Agents inspect the repository, brief, routes, constraints and evidence gaps before proposing UI. Facts, inferences, assumptions and unknowns stay separated.</p><a href="https://github.com/Haign12/DoAnhNghia_BAPortfolio/blob/main/.agents/AGENTS.md" target="_blank" rel="noopener">Inspect agent contract ↗</a></article>
          <article class="leadership-card reveal in-view"><div class="leadership-card-top"><span>02 / EXPLORE + CRITIQUE</span><span class="evidence-pill verified">VERIFIED</span></div><h3>Generate options, then govern them</h3><p>References and AI alternatives pass through ADOPT / ADAPT / REJECT decisions. Model critique can reveal risks, but it is never relabeled as user research.</p><a href="https://github.com/Haign12/DoAnhNghia_BAPortfolio/tree/main/.agents/skills" target="_blank" rel="noopener">Inspect routed skills ↗</a></article>
          <article class="leadership-card reveal in-view"><div class="leadership-card-top"><span>03 / DESIGN → CODE</span><span class="evidence-pill verified">VERIFIED</span></div><h3>Pair on implementation</h3><p>AI helps translate approved flows, states, tokens and responsive contracts into working HTML/CSS/JS prototypes. Current flagship source is not presented as React/Next proof when it is not React/Next.</p><a href="https://github.com/Haign12/DoAnhNghia_BAPortfolio/blob/main/.claude/settings.local.json" target="_blank" rel="noopener">Inspect project agent config ↗</a></article>
          <article class="leadership-card reveal in-view"><div class="leadership-card-top"><span>04 / VERIFY + REPAIR</span><span class="evidence-pill verified">VERIFIED</span></div><h3>Rendered pixels are evidence</h3><p>Playwright/Chromium, axe-core and Lighthouse diagnostics check routes, viewports, accessibility and visual integrity. Failures loop back to the stage that owns the problem.</p><a href="https://github.com/Haign12/DoAnhNghia_BAPortfolio/blob/main/.github/workflows/portfolio-cloud-qa-v5.yml" target="_blank" rel="noopener">Inspect cloud QA ↗</a></article>
        </div>
        <div class="leadership-footer"><p><strong>Human-owned:</strong> problem definition · direct user evidence · business priority · consequential trade-offs · final design rationale · release judgment.</p><a class="button black" href="case-study-uiux-factory.html">See the full workflow ↗</a></div>`;
      flagships.insertAdjacentElement('afterend', ai);
    }

    const aiWorkflow = document.getElementById('ai-workflow');
    if (aiWorkflow && !document.getElementById('writing')) {
      const writing = document.createElement('section');
      writing.className = 'section writing-section';
      writing.id = 'writing';
      writing.setAttribute('aria-labelledby', 'writing-title');
      writing.innerHTML = `
        <div class="writing-layout">
          <div class="writing-intro reveal in-view"><p class="eyebrow">Process note</p><h2 class="section-title" id="writing-title">From AI tools to design governance.</h2><p class="section-lead">The useful question is not which model generated a screen. It is whether the workflow preserves authority, evidence, review criteria and a repair loop.</p></div>
          <article class="writing-card reveal in-view">
            <div class="writing-meta"><span>DESIGN OPERATIONS</span><span>8 MIN READ</span><span>2026</span></div>
            <h3>From AI tools to design governance</h3>
            <p>Why faster generation increases the need for explicit authority, evidence states, design contracts, browser QA and human learning loops — and what UIUX Factory taught me about operating leverage.</p>
            <div class="writing-actions"><a class="button white" href="writing-design-ops-ai.html">Read article ↗</a><a href="case-study-uiux-factory.html">Related case ↗</a></div>
          </article>
        </div>`;
      aiWorkflow.insertAdjacentElement('afterend', writing);
    }

    const work = document.getElementById('work');
    if (work) {
      const eyebrow = work.querySelector('.eyebrow');
      const title = work.querySelector('.section-title');
      const count = work.querySelector('.work-count');
      if (eyebrow) eyebrow.textContent = 'Supporting work';
      if (title) title.textContent = 'Breadth without diluting the narrative.';
      if (count) count.textContent = '14 projects · 7 domains · supporting breadth';

      const setCaseLink = (name, path) => {
        const target = name.toUpperCase();
        const card = [...work.querySelectorAll('.project-featured, .project')].find(item => item.querySelector('h3')?.textContent.trim().toUpperCase() === target);
        if (!card) return;
        const caseLink = [...card.querySelectorAll('.project-links a')].find(a => /Case/i.test(a.textContent));
        if (caseLink) caseLink.setAttribute('href', path);
      };
      setCaseLink('UIUX Factory', 'case-study-uiux-factory.html');
      setCaseLink('Flux', 'case-study-flux.html');
      setCaseLink('ACCESS', 'case-study-access.html');

      const cultureGroup = work.querySelector('#group-culture');
      if (cultureGroup) {
        const groupDesc = cultureGroup.querySelector('.group-desc');
        if (groupDesc) groupDesc.textContent = 'Immersive digital experiences that use editorial storytelling, spatial discovery and interaction craft to turn art and place into exploratory journeys.';
        const cultureGrid = cultureGroup.querySelector('.project-grid');
        const lumenCard = cultureGrid?.querySelector('.project-featured');
        if (cultureGrid && lumenCard && !cultureGrid.querySelector('[data-project="hue-between-river-citadel"]')) {
          const hueCard = document.createElement('article');
          hueCard.className = 'project-featured reveal in-view';
          hueCard.dataset.cat = 'culture';
          hueCard.dataset.project = 'hue-between-river-citadel';
          hueCard.innerHTML = `
            <a class="project-media" href="https://ngh1aa.github.io/Mostar-Guide/" target="_blank" rel="noopener" aria-label="Open HUẾ — Between River & Citadel cinematic cultural experience">
              <span class="project-no">02</span>
              <img src="https://ngh1aa.github.io/Mostar-Guide/assets/hue/scenes/02-citadel-backdrop.webp" alt="Huế cinematic cultural experience featuring Ngọ Môn and the Imperial City" loading="lazy" decoding="async">
            </a>
            <div class="project-copy"><div><div class="project-top"><div><span class="status" style="margin-bottom:8px"><i></i> Independent cultural experience</span><h3>HUẾ — Between River & Citadel</h3></div><span class="project-type">Cultural experience</span></div><p class="project-summary">A cinematic study of Huế following the Perfume River through imperial thresholds, living streets and royal landscapes.</p><div class="project-highlights"><div class="highlight-item"><span>Transformation</span><p>Re-authored a borrowed interaction pattern into a Huế-specific visual and narrative system.</p></div><div class="highlight-item"><span>Design direction</span><p>Poetic, imperial and atmospheric — with Vietnamese editorial typography and deliberate scroll choreography.</p></div></div></div><div class="project-links" style="margin-top:24px"><a href="https://ngh1aa.github.io/Mostar-Guide/" class="link-primary" target="_blank" rel="noopener">Live ↗</a><a href="https://github.com/Ngh1aa/Mostar-Guide" target="_blank" rel="noopener">Source ↗</a></div></div>`;
          lumenCard.insertAdjacentElement('afterend', hueCard);
        }
        const groupCount = cultureGroup.querySelector('.group-count-badge');
        if (groupCount) groupCount.textContent = '02 Projects';
      }

      const allFilterCount = work.querySelector('.filter[data-filter="all"] b');
      if (allFilterCount) allFilterCount.textContent = '14';
      const cultureFilterCount = work.querySelector('.filter[data-filter="culture"] b');
      if (cultureFilterCount) cultureFilterCount.textContent = '2';
      const selectedProjectsMetric = work.querySelector('.metrics .metric:first-child strong');
      if (selectedProjectsMetric) selectedProjectsMetric.textContent = '14';
      [...work.querySelectorAll('.project-groups .project-no')].forEach((node, index) => {
        node.textContent = String(index + 1).padStart(2, '0');
      });
    }

    const experience = document.getElementById('experience');
    if (experience) {
      const eyebrow = experience.querySelector('.eyebrow');
      const title = experience.querySelector('.section-title');
      const lead = experience.querySelector('.section-lead');
      if (eyebrow) eyebrow.textContent = 'Professional experience';
      if (title) title.textContent = 'Delivery. Collaboration. Evidence.';
      if (lead) lead.textContent = 'Historical job titles remain truthful. Product thinking is shown through framing, flows, systems, states, collaboration and implementation responsibility — not by retroactively renaming UI/UX roles.';
      experience.querySelectorAll('.exp-metrics').forEach(node => node.remove());
      let evidenceNote = experience.querySelector('.experience-evidence-note');
      if (!evidenceNote) {
        evidenceNote = document.createElement('p');
        evidenceNote.className = 'experience-evidence-note';
        experience.querySelector('.experience-head > div')?.appendChild(evidenceNote);
      }
      if (evidenceNote) evidenceNote.innerHTML = '<strong>Evidence rule:</strong> product or business impact is published only when its source and context are retained. Otherwise the portfolio shows role, scope, decisions, collaboration and delivery responsibility directly.';
    }

    const factory = document.getElementById('factory');
    if (factory) {
      const eyebrow = factory.querySelector('.eyebrow');
      const title = factory.querySelector('.section-title');
      const lead = factory.querySelector('.section-lead');
      if (eyebrow) eyebrow.textContent = 'AI-assisted design operations';
      if (title) title.textContent = 'Make good practice repeatable.';
      if (lead) lead.innerHTML = 'UIUX Factory is the operating layer behind how I work with AI: <strong>project truth → evidence → design contract → implementation → browser evidence → root-cause repair.</strong> The system is real; adoption and efficiency outcomes remain future evidence.';
    }

    const contactCopy = document.querySelector('.contact-side > p');
    if (contactCopy) contactCopy.textContent = 'I am looking for Product Design work where complex decisions, systems thinking, strong UI craft and AI-assisted execution can meet real user evidence and measurable product learning.';

    document.querySelectorAll('a[href="Do_Anh_Nghia_UIUXDesigner_CV.pdf"], a[href="Do_Anh_Nghia_CV.pdf"], a[href="cv.pdf"], a[href="cv/main.pdf"]').forEach(link => {
      link.setAttribute('href', 'Do_Anh_Nghia_Product_Designer_CV.pdf');
    });

    const nav = document.getElementById('navLinks');
    if (nav) {
      [...nav.querySelectorAll('a')].forEach(link => {
        const href = link.getAttribute('href');
        if (href === '#story') link.textContent = 'About';
        if (href === '#work') { link.setAttribute('href', '#flagships'); link.textContent = 'Work'; }
        if (href === '#factory') link.remove();
        if (href === '#leadership') link.remove();
      });
      const experienceLink = [...nav.querySelectorAll('a')].find(a => a.getAttribute('href') === '#experience');
      if (!nav.querySelector('a[href="#ai-workflow"]')) {
        const aiLink = document.createElement('a');
        aiLink.href = '#ai-workflow';
        aiLink.textContent = 'AI workflow';
        nav.insertBefore(aiLink, experienceLink || nav.firstChild);
      }
      if (!nav.querySelector('a[href="#writing"]')) {
        const writingLink = document.createElement('a');
        writingLink.href = '#writing';
        writingLink.textContent = 'Writing';
        nav.insertBefore(writingLink, experienceLink || nav.firstChild);
      }
    }

    const footer = document.querySelector('.footer span:last-child');
    if (footer) footer.textContent = 'PRODUCT DECISIONS · AI-ASSISTED EXECUTION · EVIDENCE FIRST';
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true });
  } else {
    run();
  }
})();