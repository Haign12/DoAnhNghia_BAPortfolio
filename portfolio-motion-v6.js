(() => {
  const root = document.documentElement;
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const supportsObserver = 'IntersectionObserver' in window;

  const selectors = [
    '.hero-meta',
    '.hero-copy',
    '.hero-evidence',
    '.hero-ledger > *',
    '.section-head',
    '.project-group',
    '.project-item',
    '.case-card',
    '.signal-lab',
    '.approach-grid > *',
    '.approach-list > *',
    '.experience-row',
    '.experience-list > *',
    '.contact-copy',
    '.contact-links',
    '.footer .shell'
  ].join(',');

  let revealObserver = null;
  const observed = new WeakSet();

  const directionFor = element => {
    if (element.matches('.hero-copy')) return 'left';
    if (element.matches('.hero-evidence')) return 'right';
    if (element.matches('.project-item,.case-card,.signal-lab')) return 'soft';
    return 'up';
  };

  const getCandidates = scope => {
    const nodes = [];
    if (scope instanceof Element && scope.matches(selectors)) nodes.push(scope);
    if (scope?.querySelectorAll) nodes.push(...scope.querySelectorAll(selectors));
    return nodes;
  };

  const markVisible = element => {
    element.classList.add('motion-in');
  };

  const register = scope => {
    const candidates = getCandidates(scope);
    let localIndex = 0;

    candidates.forEach(element => {
      if (observed.has(element)) return;
      observed.add(element);
      element.classList.add('motion-reveal');
      element.dataset.motion = directionFor(element);

      if (!element.style.getPropertyValue('--motion-delay')) {
        const delay = Math.min((localIndex % 5) * 55, 220);
        element.style.setProperty('--motion-delay', `${delay}ms`);
      }
      localIndex += 1;

      if (motionQuery.matches || !supportsObserver) {
        markVisible(element);
        return;
      }
      revealObserver?.observe(element);
    });
  };

  const buildObserver = () => {
    if (!supportsObserver || motionQuery.matches) return;
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        markVisible(entry.target);
        revealObserver.unobserve(entry.target);
      });
    }, {
      threshold:0.12,
      rootMargin:'0px 0px -7% 0px'
    });
  };

  const revealEverything = () => {
    document.querySelectorAll('.motion-reveal').forEach(markVisible);
    revealObserver?.disconnect();
  };

  const start = () => {
    if (motionQuery.matches) {
      root.classList.remove('motion-ready');
      root.classList.add('motion-reduced');
      register(document);
      revealEverything();
      return;
    }

    root.classList.remove('motion-reduced');
    root.classList.add('motion-ready');
    buildObserver();
    register(document);

    // The project grouping layer is injected dynamically by portfolio-v5.js.
    // Observe only structural additions so newly grouped projects receive the same motion contract.
    const mutationObserver = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) register(node);
        });
      });
    });
    mutationObserver.observe(document.body,{childList:true,subtree:true});
  };

  motionQuery.addEventListener?.('change', event => {
    if (event.matches) {
      root.classList.remove('motion-ready');
      root.classList.add('motion-reduced');
      revealEverything();
    } else {
      // Re-entering motion mode should not replay the full page unexpectedly.
      root.classList.remove('motion-reduced');
      root.classList.add('motion-ready');
      document.querySelectorAll('.motion-reveal').forEach(markVisible);
    }
  });

  requestAnimationFrame(start);
})();