/** Progressive-enhancement motion: reveal fallback, stagger, count-up, plan select. */

function supportsNativeScrollAnim(): boolean {
  if (typeof CSS === 'undefined' || typeof CSS.supports !== 'function') return false;
  // Prefer the two-arg form — the combined "(…)" string is unreliable across engines.
  try {
    return CSS.supports('animation-timeline', 'view()');
  } catch {
    return false;
  }
}

function initHeaderScroll() {
  const header = document.getElementById('siteHeader');
  if (!header) return;
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/** 1. Reveal — native CSS scroll-driven when supported; IO .pre/.in as fallback. */
function initReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  if (supportsNativeScrollAnim()) return;

  if (!('IntersectionObserver' in window)) return;

  revealEls.forEach((el) => el.classList.add('pre'));
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
  );
  revealEls.forEach((el) => observer.observe(el));
}

/** 2. Stagger fallback when sibling-index() is unsupported. */
function initStaggerFallback() {
  let hasSiblingIndex = false;
  try {
    hasSiblingIndex =
      typeof CSS !== 'undefined' &&
      typeof CSS.supports === 'function' &&
      CSS.supports('animation-delay', 'calc(sibling-index() * 1s)');
  } catch {
    hasSiblingIndex = false;
  }
  if (hasSiblingIndex) return;

  const selectors = ['.who-row', '.grid-3', '#features > .wrap', '.sec-grid', '.price-grid', '.compare-col'];
  selectors.forEach((sel) => {
    document.querySelectorAll(sel).forEach((parent) => {
      Array.from(parent.children).forEach((el, i) => {
        (el as HTMLElement).style.setProperty('--sibling-index', String(i));
      });
    });
  });

  document.querySelectorAll('.breakdown').forEach((parent) => {
    Array.from(parent.children).forEach((el, i) => {
      const fill = el.querySelector('.bd-fill') as HTMLElement | null;
      if (fill) fill.style.setProperty('--sibling-index', String(i));
      (el as HTMLElement).style.setProperty('--sibling-index', String(i));
    });
  });
}

/** 5. Count-up on #statNumber — plays once. */
function initStatCountUp() {
  const statEl = document.getElementById('statNumber');
  if (!statEl) return;

  const raw = (statEl.textContent || '100+').trim();
  const match = raw.match(/(\d+)/);
  const targetValue = match ? parseInt(match[1], 10) : 100;
  const suffix = raw.replace(/^\d+/, '') || '+';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced || !('IntersectionObserver' in window)) {
    statEl.textContent = `${targetValue}${suffix}`;
    return;
  }

  let counted = false;
  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !counted) {
          counted = true;
          const start = performance.now();
          const duration = 1400;
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            statEl.textContent = `${Math.round(eased * targetValue)}${suffix}`;
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          statObserver.unobserve(statEl);
        }
      });
    },
    { threshold: 0.4 },
  );
  statObserver.observe(statEl);
}

function selectPlan(plan: string) {
  document.querySelectorAll('.plan-opt').forEach((el) => {
    el.classList.toggle('active', el.getAttribute('data-plan') === plan);
  });
  const hidden = document.getElementById('selectedPlan') as HTMLInputElement | null;
  if (hidden) hidden.value = plan;
  const form = document.getElementById('interestForm');
  if (form) form.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

declare global {
  interface Window {
    selectPlan: typeof selectPlan;
  }
}

window.selectPlan = selectPlan;

document.addEventListener('click', (event) => {
  const target = event.target as HTMLElement | null;
  const planBtn = target?.closest('[data-select-plan]') as HTMLElement | null;
  if (planBtn) {
    const plan = planBtn.getAttribute('data-select-plan');
    if (plan) selectPlan(plan);
  }
});

initHeaderScroll();
initReveal();
initStaggerFallback();
initStatCountUp();
