(() => {
  const run = () => {
    document.title = 'Do Anh Nghia — Product Designer · UI/UX · Systems';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content','Product design portfolio by Do Anh Nghia — product reasoning, UI/UX systems, working prototypes, design-to-code and evidence-aware case studies.');

    const roleWrap = document.querySelector('.hero-roles');
    if (roleWrap) {
      roleWrap.setAttribute('aria-label','Product design disciplines');
      roleWrap.innerHTML = [
        '<span class="role-line"><b>PRODUCT</b></span>',
        '<span class="role-line"><b>UI / UX</b></span>',
        '<span class="role-line"><b>SYSTEMS</b></span>',
        '<span class="role-line"><b>AI + CODE</b></span>'
      ].join('');
      requestAnimationFrame(() => document.getElementById('hero')?.classList.add('ready'));
    }

    const intro = document.querySelector('.hero-intro');
    if (intro) {
      intro.innerHTML = '<span class="status"><i></i> Open to Product Designer · UI/UX · Web Design</span>I turn ambiguous product problems into <strong>clear decisions, usable flows and scalable interface systems</strong> — then carry them into working prototypes teams can inspect.<span class="hero-positioning">Strongest at complex workflows, design systems, interaction craft and AI-assisted design-to-code.</span>';
    }

    const note = document.querySelector('.hero-note');
    if (note) note.innerHTML = '<strong>Product thinking × interface craft.</strong><br>Three flagship cases lead with problem framing, trade-offs and evidence; the wider project set shows range.';

    const side = document.querySelector('.hero-side');
    if (side) side.innerHTML = '<strong>03</strong><span>flagship product cases</span>';

    const story = document.getElementById('story');
    if (story) {
      const title = story.querySelector('.section-title');
      const lead = story.querySelector('.section-lead');
      if (title) title.textContent = 'Decisions before screens.';
      if (lead) lead.innerHTML = 'I use visual craft to make product decisions easier to understand — not to hide weak reasoning. The work moves from <strong>problem → evidence → flow → system → prototype → validation plan → repair.</strong>';
    }

    const work = document.getElementById('work');
    if (work && !document.getElementById('flagships')) {
      const flagships = document.createElement('section');
      flagships.className = 'section flagship-section';
      flagships.id = 'flagships';
      flagships.setAttribute('aria-labelledby','flagship-title');
      flagships.innerHTML = `
        <div class="flagship-head reveal">
          <div>
            <p class="eyebrow">Flagship product work</p>
            <h2 class="section-title" id="flagship-title">Three cases.<br>Three distinct styles.</h2>
            <p class="section-lead">A deliberately varied trio showing <strong>editorial commerce, trust-led education UX and data-dense B2B fintech systems.</strong></p>
          </div>
          <p class="flagship-meta"><strong>Selection logic:</strong> each case represents a different visual and product-design muscle — so the section shows range rather than three projects with the same design language.</p>
        </div>
        <div class="flagship-grid">
          <article class="flagship-card reveal">
            <a class="flagship-media" href="case-study-luxroom.html" aria-label="Read LuxRoom case study">
              <img src="thumbnail/luxroom.png" alt="LuxRoom luxury furniture commerce interface" loading="lazy" decoding="async">
              <span class="flagship-proof">Editorial luxury commerce</span>
            </a>
            <div class="flagship-copy">
              <div class="flagship-index"><span>01 / Furniture commerce</span><span>Independent concept</span></div>
              <h3>LuxRoom</h3>
              <p class="flagship-thesis">A desktop-first furniture experience where architectural imagery, dimensions, materials and room context support a high-consideration purchase instead of behaving like a generic product grid.</p>
              <div class="flagship-evidence">
                <div><span>Design style</span><p>Image-led, architectural and editorial — restrained typography, generous space and product storytelling built around confidence.</p></div>
                <div><span>Proof</span><p>Case study + working responsive prototype + Figma system covering discovery, product detail and consultation-oriented commerce.</p></div>
              </div>
              <div class="flagship-actions"><a class="flagship-primary" href="case-study-luxroom.html">Read case ↗</a><a href="https://lux-room.vercel.app/" target="_blank" rel="noopener">Live ↗</a><a href="https://www.figma.com/design/50eyqHuzpiqIYoIT9ngwcT/LuxRoom?node-id=0-1&t=HPp6OlvriN9MeZCW-1" target="_blank" rel="noopener">Figma ↗</a></div>
            </div>
          </article>

          <article class="flagship-card reveal">
            <a class="flagship-media" href="case-study-vas-education.html" aria-label="Read VAS Education case study">
              <img src="thumbnail/vas.png" alt="VAS Education school website redesign" loading="lazy" decoding="async">
              <span class="flagship-proof">Trust + information architecture</span>
            </a>
            <div class="flagship-copy">
              <div class="flagship-index"><span>02 / Education</span><span>Redesign concept</span></div>
              <h3>VAS</h3>
              <p class="flagship-thesis">A parent-facing education journey that turns complex programs, campuses and admissions information into a clearer trust → fit → action path.</p>
              <div class="flagship-evidence">
                <div><span>Design style</span><p>Warm, credible and content-led — stronger hierarchy, structured curriculum comparison and decision support rather than decorative marketing.</p></div>
                <div><span>Proof</span><p>Case study + working redesign + Figma covering program discovery, campus context, admissions and campus-tour conversion.</p></div>
              </div>
              <div class="flagship-actions"><a class="flagship-primary" href="case-study-vas-education.html">Read case ↗</a><a href="https://redesign-vas.vercel.app/" target="_blank" rel="noopener">Live ↗</a><a href="https://www.figma.com/design/E07BqE4X8apHhziPardmDG/RedesignVAS?m=auto&t=LykADgxvJ62WCIu7-1" target="_blank" rel="noopener">Figma ↗</a></div>
            </div>
          </article>

          <article class="flagship-card reveal">
            <a class="flagship-media" href="https://flux-six-liard.vercel.app/" target="_blank" rel="noopener" aria-label="Open Flux live prototype">
              <img src="thumbnail/flux.png" alt="Flux B2B treasury product interface" loading="lazy" decoding="async">
              <span class="flagship-proof">Data-dense B2B systems</span>
            </a>
            <div class="flagship-copy">
              <div class="flagship-index"><span>03 / B2B fintech</span><span>Independent concept</span></div>
              <h3>Flux</h3>
              <p class="flagship-thesis">A multi-currency treasury cockpit that keeps liquidity, reserves, incoming cash, FX exposure and settlement context visible without turning the interface into an unreadable spreadsheet.</p>
              <div class="flagship-evidence">
                <div><span>Design style</span><p>Dense, operational and system-first — compact information hierarchy, dashboard logic and clear action states for financial workflows.</p></div>
                <div><span>Proof</span><p>Working treasury prototype + Figma system covering currency accounts, money movement and operational liquidity detail.</p></div>
              </div>
              <div class="flagship-actions"><a class="flagship-primary" href="https://flux-six-liard.vercel.app/" target="_blank" rel="noopener">Live prototype ↗</a><a href="https://www.figma.com/design/bZIqaMK97vwzBuSdD8risu/Flux?node-id=1-3427&t=BvIxuJu3KrFWy5Lg-1" target="_blank" rel="noopener">Figma ↗</a><a href="https://github.com/Ngh1aa/Flux" target="_blank" rel="noopener">Source ↗</a></div>
            </div>
          </article>
        </div>
        <p class="flagship-boundary"><span><strong>Evidence boundary:</strong> independent concepts and redesign work are labeled as such. Planned validation and target metrics are not presented as measured product outcomes.</span></p>
`
      work.before(flagships);

      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold:.08, rootMargin:'0px 0px -40px 0px' });
      flagships.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }

    if (work) {
      const eyebrow = work.querySelector('.eyebrow');
      const title = work.querySelector('.section-title');
      const count = work.querySelector('.work-count');
      if (eyebrow) eyebrow.textContent = 'Supporting work';
      if (title) title.textContent = 'Range across domains.';
      if (count) count.textContent = '14 projects · 7 domains · supporting breadth';

      const cultureGroup = work.querySelector('#group-culture');
      if (cultureGroup) {
        const groupDesc = cultureGroup.querySelector('.group-desc');
        if (groupDesc) groupDesc.textContent = 'Immersive digital experiences that use editorial storytelling, spatial discovery and interaction craft to turn art and place into exploratory journeys.';

        const cultureGrid = cultureGroup.querySelector('.project-grid');
        const lumenCard = cultureGrid?.querySelector('.project-featured');
        if (cultureGrid && lumenCard && !cultureGrid.querySelector('[data-project="hue-between-river-citadel"]')) {
          const hueCard = document.createElement('article');
          hueCard.className = 'project-featured reveal';
          hueCard.dataset.cat = 'culture';
          hueCard.dataset.project = 'hue-between-river-citadel';
          hueCard.innerHTML = `
            <a class="project-media" href="https://ngh1aa.github.io/Mostar-Guide/" target="_blank" rel="noopener" aria-label="Open HUẾ — Between River & Citadel cinematic cultural experience">
              <span class="project-no">02</span>
              <img src="https://ngh1aa.github.io/Mostar-Guide/assets/hue/scenes/02-citadel-backdrop.webp" alt="Huế cinematic cultural experience featuring Ngọ Môn and the Imperial City" loading="lazy" decoding="async">
            </a>
            <div class="project-copy">
              <div>
                <div class="project-top">
                  <div>
                    <span class="status" style="margin-bottom:8px"><i></i> Independent cultural experience</span>
                    <h3>HUẾ — Between River & Citadel</h3>
                  </div>
                  <span class="project-type">Cultural experience</span>
                </div>
                <p class="project-summary">A cinematic study of Huế that follows the Perfume River through imperial thresholds, living streets and royal landscapes — combining scroll-led storytelling with an infinite places carousel and thematic routes.</p>
                <div class="project-highlights">
                  <div class="highlight-item">
                    <span>Transformation</span>
                    <p>Re-authored a borrowed cinematic interaction pattern into a Huế-specific experience by replacing destination identity, imagery, typography, route narrative and ornamental language while preserving the strongest motion mechanics.</p>
                  </div>
                  <div class="highlight-item">
                    <span>Design direction</span>
                    <p>Poetic, imperial and atmospheric — Vietnamese-capable editorial typography, restrained ceremonial geometry, licensed local imagery and deliberate scroll choreography.</p>
                  </div>
                </div>
              </div>
              <div class="project-links" style="margin-top:24px">
                <a href="https://ngh1aa.github.io/Mostar-Guide/" class="link-primary" target="_blank" rel="noopener">Live ↗</a>
                <a href="https://github.com/Ngh1aa/Mostar-Guide" target="_blank" rel="noopener">Source ↗</a>
              </div>
            </div>`;
          lumenCard.insertAdjacentElement('afterend', hueCard);

          if ('IntersectionObserver' in window) {
            const hueObserver = new IntersectionObserver(entries => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  entry.target.classList.add('in-view');
                  hueObserver.unobserve(entry.target);
                }
              });
            }, { threshold:.08, rootMargin:'0px 0px -40px 0px' });
            hueObserver.observe(hueCard);
          } else {
            hueCard.classList.add('in-view');
          }
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

      const projectNumbers = [...work.querySelectorAll('.project-groups .project-no')];
      projectNumbers.forEach((node, index) => {
        node.textContent = String(index + 1).padStart(2, '0');
      });
    }

    const experience = document.getElementById('experience');
    if (experience) {
      const eyebrow = experience.querySelector('.eyebrow');
      const title = experience.querySelector('.section-title');
      const lead = experience.querySelector('.section-lead');
      if (eyebrow) eyebrow.textContent = 'Professional experience';
      if (title) title.textContent = 'Delivery, not vanity metrics.';
      if (lead) lead.textContent = 'Roles, responsibilities and collaboration scope — kept evidence-safe instead of inflating outcomes that cannot be independently verified.';
      experience.querySelectorAll('.exp-metrics').forEach(node => node.remove());
      if (!experience.querySelector('.experience-evidence-note')) {
        const note = document.createElement('p');
        note.className = 'experience-evidence-note';
        note.innerHTML = '<strong>Portfolio principle:</strong> measured business impact belongs here only when the source and context are available. Otherwise I show the work, decisions and delivery responsibility directly.';
        experience.querySelector('.experience-head > div')?.appendChild(note);
      }
    }

    const contactCopy = document.querySelector('.contact-side > p');
    if (contactCopy) contactCopy.textContent = 'If you are looking for a designer who can move from an ambiguous product problem to structured UX, strong interface systems and a working prototype — while staying honest about evidence and constraints — I’d love to talk.';

    const navProjects = [...document.querySelectorAll('.nav-links a')].find(a => a.getAttribute('href') === '#work');
    if (navProjects) {
      navProjects.setAttribute('href','#flagships');
      navProjects.textContent = 'Work';
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once:true });
  } else {
    run();
  }
})();