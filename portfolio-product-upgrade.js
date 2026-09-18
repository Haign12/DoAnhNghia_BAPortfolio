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
            <h2 class="section-title" id="flagship-title">Three cases.<br>Three design muscles.</h2>
            <p class="section-lead">A recruiter-first selection showing <strong>consumer product reasoning, complex operational systems and high-craft commerce.</strong></p>
          </div>
          <p class="flagship-meta"><strong>Selection logic:</strong> not the three prettiest screens. These are the cases that best expose how I frame a problem, make trade-offs, build a system and carry design intent into a working interface.</p>
        </div>
        <div class="flagship-grid">
          <article class="flagship-card reveal">
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
                <div><span>Proof</span><p>Working responsive prototype with transfer, risk, planning and recovery states.</p></div>
              </div>
              <div class="flagship-actions"><a class="flagship-primary" href="case-study-nova.html">Read case ↗</a><a href="https://nova-gamma-eosin.vercel.app/" target="_blank" rel="noopener">Live ↗</a><a href="https://www.figma.com/design/AxsWZgEvTOkzOQB71iAdcx/Nova?node-id=4-2052&t=83Wo9YlCjxLTFzxv-1" target="_blank" rel="noopener">Figma ↗</a></div>
            </div>
          </article>

          <article class="flagship-card reveal">
            <a class="flagship-media" href="case-study-vas-education.html" aria-label="Read VAS Education redesign case study">
              <img src="thumbnail/vas.png" alt="VAS Education responsive school website redesign" loading="lazy" decoding="async">
              <span class="flagship-proof">Evidence-driven redesign</span>
            </a>
            <div class="flagship-copy">
              <div class="flagship-index"><span>02 / Education redesign</span><span>Website redesign</span></div>
              <h3>VAS Education</h3>
              <p class="flagship-thesis">A redesign of a complex school website around the questions families actually need answered while comparing programmes, campuses and the path to admission.</p>
              <div class="flagship-evidence">
                <div><span>Decision</span><p>Reframe institutional content into a parent-first journey from programme understanding to campus choice and visit planning.</p></div>
                <div><span>Proof</span><p>Responsive redesign prototype + IA and user-flow case showing programme, campus, admissions and visit-booking structure.</p></div>
              </div>
              <div class="flagship-actions"><a class="flagship-primary" href="case-study-vas-education.html">Read case ↗</a><a href="https://redesign-vas.vercel.app/" target="_blank" rel="noopener">Live ↗</a><a href="https://www.figma.com/design/E07BqE4X8apHhziPardmDG/RedesignVAS?m=auto&t=LykADgxvJ62WCIu7-1" target="_blank" rel="noopener">Figma ↗</a></div>
            </div>
          </article>

          <article class="flagship-card reveal">
            <a class="flagship-media" href="case-study-atelier.html" aria-label="Read Atelier case study">
              <img src="thumbnail/atelier.png" alt="Atelier luxury fashion commerce interface" loading="lazy" decoding="async">
              <span class="flagship-proof">Visual + interaction craft</span>
            </a>
            <div class="flagship-copy">
              <div class="flagship-index"><span>03 / Luxury commerce</span><span>Independent concept</span></div>
              <h3>Atelier</h3>
              <p class="flagship-thesis">Luxury fashion commerce balancing editorial expression with shopping clarity, product-detail confidence and purposeful interaction rather than decorative motion.</p>
              <div class="flagship-evidence">
                <div><span>Decision</span><p>Let visual expression grow around the buying journey without weakening navigation, PDP comprehension or conversion actions.</p></div>
                <div><span>Proof</span><p>Figma system + working responsive prototype + product-detail and commerce flows.</p></div>
              </div>
              <div class="flagship-actions"><a class="flagship-primary" href="case-study-atelier.html">Read case ↗</a><a href="https://atelier-henna-tau.vercel.app/" target="_blank" rel="noopener">Live ↗</a><a href="https://www.figma.com/design/Di6yDrXBRps8sN0hEZn66F/Atelier?m=auto&t=LykADgxvJ62WCIu7-1" target="_blank" rel="noopener">Figma ↗</a></div>
            </div>
          </article>
        </div>
        <p class="flagship-boundary"><span><strong>Evidence boundary:</strong> independent concepts are labeled as such. Planned validation and target metrics are not presented as measured product outcomes.</span></p>
      `;
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
      if (count) count.textContent = '12 projects · 6 industry domains · supporting breadth';
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