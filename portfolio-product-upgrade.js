(() => {
  const run = () => {
    document.body.classList.add('leadership-track');
    document.title = 'Do Anh Nghia — Product Designer · Strategy · Systems · Design Leadership';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Product design portfolio by Do Anh Nghia — fintech and B2B product reasoning, operational systems, design operations, evidence-aware validation and a truthful design-leadership track.');

    const roleWrap = document.querySelector('.hero-roles');
    if (roleWrap) {
      roleWrap.setAttribute('aria-label', 'Product design, strategy, systems and design leadership');
      roleWrap.innerHTML = [
        '<span class="role-line"><b>PRODUCT</b></span>',
        '<span class="role-line"><b>STRATEGY</b></span>',
        '<span class="role-line"><b>SYSTEMS</b></span>',
        '<span class="role-line"><b>LEADERSHIP</b></span>'
      ].join('');
      requestAnimationFrame(() => document.getElementById('hero')?.classList.add('ready'));
    }

    const intro = document.querySelector('.hero-intro');
    if (intro) {
      intro.innerHTML = '<span class="status"><i></i> Product Designer · Fintech / B2B · Design leadership track</span>I design <strong>decision-heavy products and operating systems</strong> — framing the problem, making trade-offs explicit, carrying intent into working prototypes, and defining how the work should be measured.<span class="hero-positioning">Current growth focus: product analytics, business alignment, critique, mentoring, onboarding and design governance — without claiming management experience I have not earned yet.</span>';
    }

    const note = document.querySelector('.hero-note');
    if (note) note.innerHTML = '<strong>Decision quality × operating leverage.</strong><br>Flagships move from individual product decisions to complex operations and a reusable design operating system.';

    const side = document.querySelector('.hero-side');
    if (side) side.innerHTML = '<strong>03</strong><span>product + operations flagships</span>';

    const marqueeItems = ['Product strategy', 'Financial systems', 'Decision design', 'Design operations', 'Evidence + QA'];
    document.querySelectorAll('.marquee-set').forEach((set, setIndex) => {
      set.innerHTML = marqueeItems.map(item => `<span class="marquee-item"${setIndex ? ' aria-hidden="true"' : ''}>${item}</span>`).join('');
    });

    const story = document.getElementById('story');
    if (story) {
      const eyebrow = story.querySelector('.eyebrow');
      const title = story.querySelector('.section-title');
      const lead = story.querySelector('.section-lead');
      if (eyebrow) eyebrow.textContent = 'Product story';
      if (title) title.textContent = 'From screens to leverage.';
      if (lead) lead.innerHTML = 'I started in UI/UX delivery and learned that polished screens are rarely the hardest part. The harder problem is turning ambiguity into <strong>decisions a team can understand, build and evaluate</strong>. That moved my work toward product framing, financial and operational systems, evidence, and eventually DesignOps.';

      const principleData = [
        ['Frame the outcome, not the task', 'Start with the user decision, owner objective, risk and success signal before choosing a feature or screen.'],
        ['Make trade-offs inspectable', 'Alternatives, constraints and “not now” decisions belong in the work — not only the polished answer.'],
        ['Connect design to evidence', 'Targets, benchmarks, usability findings and production signals stay clearly separated from measured outcomes.'],
        ['Build practices other people can use', 'Systems, review criteria, governance and onboarding are the bridge from strong IC work to design leadership.']
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
      if (eyebrow) eyebrow.textContent = 'Flagship product + operations work';
      if (title) title.innerHTML = 'Three cases.<br>One leadership arc.';
      if (lead) lead.innerHTML = 'The selection is intentionally coherent: <strong>consumer financial decisions → operational risk systems → design operations and governance.</strong>';
      if (metaCopy) metaCopy.innerHTML = '<strong>Selection logic:</strong> not the broadest visual range. These cases best expose problem framing, systems thinking, evidence boundaries and the move from individual execution toward operating leverage.';

      const grid = flagships.querySelector('.flagship-grid');
      if (grid) {
        grid.innerHTML = `
          <article class="flagship-card reveal in-view">
            <a class="flagship-media" href="case-study-nova.html" aria-label="Read Nova Product Design case study">
              <img src="thumbnail/nova.png" alt="Nova consumer finance product interface" loading="lazy" decoding="async">
              <span class="flagship-proof">Product reasoning</span>
            </a>
            <div class="flagship-copy">
              <div class="flagship-index"><span>01 / Consumer fintech</span><span>Independent concept</span></div>
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
              <div class="flagship-index"><span>02 / Risk operations</span><span>Independent concept</span></div>
              <h3>Sentry</h3>
              <p class="flagship-thesis">A high-density investigation workspace organized around one consequential decision: correlate evidence, understand conflicts and record a defensible action without losing context.</p>
              <div class="flagship-evidence">
                <div><span>Decision</span><p>Keep alert priority, forensic evidence, consequence and recovery visible inside one stable investigation model.</p></div>
                <div><span>Product proof</span><p>Queue, evidence, decision and recovery states demonstrate pressure beyond a happy-path dashboard.</p></div>
              </div>
              <div class="flagship-actions"><a class="flagship-primary" href="case-study-sentry.html">Read case ↗</a><a href="https://sentry-9bqs.vercel.app/" target="_blank" rel="noopener">Live ↗</a><a href="https://github.com/Ngh1aa/Sentry" target="_blank" rel="noopener">Source ↗</a></div>
            </div>
          </article>

          <article class="flagship-card reveal in-view flagship-ops-card">
            <a class="flagship-media" href="case-study-uiux-factory.html" aria-label="Read UIUX Factory Design Operations case study">
              <img src="thumbnail/uiux-factory.svg" alt="UIUX Factory design operating system workflow" loading="lazy" decoding="async">
              <span class="flagship-proof">Operating leverage</span>
            </a>
            <div class="flagship-copy">
              <div class="flagship-index"><span>03 / Design operations</span><span>Working repository</span></div>
              <h3>UIUX Factory</h3>
              <p class="flagship-thesis">A verifiable design operating system for project truth, decision contracts, implementation, browser QA, governance and root-cause repair.</p>
              <div class="flagship-evidence">
                <div><span>Leadership signal</span><p>Turns quality expectations and decision ownership into reusable practices instead of private designer intuition.</p></div>
                <div><span>Evidence boundary</span><p>Repository and QA harness are real; team adoption and efficiency impact are the next proof to earn.</p></div>
              </div>
              <div class="flagship-actions"><a class="flagship-primary" href="case-study-uiux-factory.html">Read case ↗</a><a href="writing-design-ops-ai.html">Article ↗</a><a href="https://github.com/Ngh1aa/uiux-ai-workspace" target="_blank" rel="noopener">Repository ↗</a></div>
            </div>
          </article>`;
      }

      const boundary = flagships.querySelector('.flagship-boundary');
      if (boundary) boundary.innerHTML = '<span><strong>Evidence boundary:</strong> Nova and Sentry are independent concepts. UIUX Factory is a working repository. Planned validation, team adoption and target metrics are never presented as measured product or management outcomes.</span>';
    }

    const work = document.getElementById('work');
    if (flagships && !document.getElementById('leadership')) {
      const leadership = document.createElement('section');
      leadership.className = 'section leadership-section';
      leadership.id = 'leadership';
      leadership.setAttribute('aria-labelledby', 'leadership-title');
      leadership.innerHTML = `
        <div class="leadership-head reveal in-view">
          <div>
            <p class="eyebrow">Leadership practice</p>
            <h2 class="section-title" id="leadership-title">Build leverage before the title.</h2>
          </div>
          <p class="section-lead">I am building toward design management by separating <strong>what is already evidenced</strong> from the leadership proof I still need to earn. Management is impact through people — not a new label for senior-looking UI.</p>
        </div>
        <div class="leadership-grid">
          <article class="leadership-card reveal in-view"><div class="leadership-card-top"><span>01 / PROCESS DESIGN</span><span class="evidence-pill verified">VERIFIED</span></div><h3>Design operating system</h3><p>UIUX Factory defines project truth, design contracts, stage routing, evidence states, browser QA and root-cause repair as a reusable workflow.</p><a href="case-study-uiux-factory.html">Inspect the case ↗</a></article>
          <article class="leadership-card reveal in-view"><div class="leadership-card-top"><span>02 / QUALITY GOVERNANCE</span><span class="evidence-pill verified">VERIFIED</span></div><h3>Make quality inspectable</h3><p>Accessibility, responsive pressure, media integrity and rendered browser evidence are explicit release gates rather than optional polish.</p><a href="https://github.com/Ngh1aa/uiux-ai-workspace" target="_blank" rel="noopener">Open the system ↗</a></article>
          <article class="leadership-card reveal in-view"><div class="leadership-card-top"><span>03 / PEOPLE ENABLEMENT</span><span class="evidence-pill planned">NEXT PROOF</span></div><h3>Mentoring, critique, onboarding</h3><p>The next milestone is human: mentor a junior or peer, facilitate recurring critique, and pilot onboarding material so the process helps someone beyond its author.</p><span class="leadership-note">Planned — not presented as completed experience.</span></article>
          <article class="leadership-card reveal in-view"><div class="leadership-card-top"><span>04 / BUSINESS + DATA</span><span class="evidence-pill planned">NEXT PROOF</span></div><h3>From target metrics to measured outcomes</h3><p>Flagships now define product metrics and guardrails. The next gap is real instrumentation, opportunity sizing and post-launch learning connected to an owner objective.</p><span class="leadership-note">Planned — baseline and production data still required.</span></article>
        </div>
        <div class="leadership-footer"><p><strong>Current positioning:</strong> Product Designer on a deliberate design-leadership track — not a current Product Design Manager claim.</p><a class="button black" href="writing-design-ops-ai.html">Read leadership note ↗</a></div>`;
      flagships.insertAdjacentElement('afterend', leadership);
    }

    const leadership = document.getElementById('leadership');
    if (leadership && !document.getElementById('writing')) {
      const writing = document.createElement('section');
      writing.className = 'section writing-section';
      writing.id = 'writing';
      writing.setAttribute('aria-labelledby', 'writing-title');
      writing.innerHTML = `
        <div class="writing-layout">
          <div class="writing-intro reveal in-view"><p class="eyebrow">Thought leadership</p><h2 class="section-title" id="writing-title">Teach the operating principle.</h2><p class="section-lead">A manager-track portfolio needs more than “how I designed this screen.” My writing focuses on how teams make decisions, preserve evidence and scale quality.</p></div>
          <article class="writing-card reveal in-view">
            <div class="writing-meta"><span>DESIGN OPERATIONS</span><span>8 MIN READ</span><span>2026</span></div>
            <h3>From AI tools to design governance</h3>
            <p>Why faster generation increases the need for explicit authority, evidence states, design contracts, browser QA and human learning loops — and what UIUX Factory taught me about operating leverage.</p>
            <div class="writing-actions"><a class="button white" href="writing-design-ops-ai.html">Read article ↗</a><a href="case-study-uiux-factory.html">Related case ↗</a></div>
          </article>
        </div>`;
      leadership.insertAdjacentElement('afterend', writing);
    }

    if (work) {
      const eyebrow = work.querySelector('.eyebrow');
      const title = work.querySelector('.section-title');
      const count = work.querySelector('.work-count');
      if (eyebrow) eyebrow.textContent = 'Supporting work';
      if (title) title.textContent = 'Breadth without diluting the narrative.';
      if (count) count.textContent = '14 projects · 7 domains · supporting breadth';

      const factoryCard = [...work.querySelectorAll('.project-featured, .project')].find(card => card.querySelector('h3')?.textContent.trim() === 'UIUX Factory');
      if (factoryCard) {
        const caseLink = [...factoryCard.querySelectorAll('.project-links a')].find(a => /Case/i.test(a.textContent));
        if (caseLink) caseLink.setAttribute('href', 'case-study-uiux-factory.html');
      }

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
      if (lead) lead.textContent = 'Historical job titles remain truthful. Leadership is shown through concrete behaviors and systems rather than retroactively renaming UI/UX roles.';
      experience.querySelectorAll('.exp-metrics').forEach(node => node.remove());
      let evidenceNote = experience.querySelector('.experience-evidence-note');
      if (!evidenceNote) {
        evidenceNote = document.createElement('p');
        evidenceNote.className = 'experience-evidence-note';
        experience.querySelector('.experience-head > div')?.appendChild(evidenceNote);
      }
      if (evidenceNote) evidenceNote.innerHTML = '<strong>Evidence rule:</strong> product/business impact is published only when its source and context are retained. Otherwise the portfolio shows role, scope, decisions, collaboration and delivery responsibility directly.';
    }

    const factory = document.getElementById('factory');
    if (factory) {
      const eyebrow = factory.querySelector('.eyebrow');
      const title = factory.querySelector('.section-title');
      const lead = factory.querySelector('.section-lead');
      if (eyebrow) eyebrow.textContent = 'Design operations';
      if (title) title.textContent = 'Make good practice repeatable.';
      if (lead) lead.innerHTML = 'UIUX Factory is my strongest current bridge from IC craft to design leadership: an inspectable operating model for <strong>truth → decisions → contracts → implementation → browser evidence → repair.</strong> The next proof is adoption by another designer and measured process impact.';
    }

    const contactCopy = document.querySelector('.contact-side > p');
    if (contactCopy) contactCopy.textContent = 'I am looking for Product Design work where complex decisions, systems thinking and evidence matter — with room to grow into design leadership through mentoring, process ownership and measurable product learning.';

    const nav = document.getElementById('navLinks');
    if (nav) {
      const links = [...nav.querySelectorAll('a')];
      links.forEach(link => {
        const href = link.getAttribute('href');
        if (href === '#story') link.textContent = 'About';
        if (href === '#work') { link.setAttribute('href', '#flagships'); link.textContent = 'Work'; }
        if (href === '#factory') link.remove();
      });
      const experienceLink = [...nav.querySelectorAll('a')].find(a => a.getAttribute('href') === '#experience');
      if (!nav.querySelector('a[href="#leadership"]')) {
        const leadershipLink = document.createElement('a');
        leadershipLink.href = '#leadership';
        leadershipLink.textContent = 'Leadership';
        nav.insertBefore(leadershipLink, experienceLink || nav.firstChild);
      }
      if (!nav.querySelector('a[href="#writing"]')) {
        const writingLink = document.createElement('a');
        writingLink.href = '#writing';
        writingLink.textContent = 'Writing';
        nav.insertBefore(writingLink, experienceLink || nav.firstChild);
      }
    }

    const footer = document.querySelector('.footer span:last-child');
    if (footer) footer.textContent = 'PRODUCT DECISIONS · DESIGN OPERATIONS · EVIDENCE FIRST';
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true });
  } else {
    run();
  }
})();