const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 40);
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function initHeroEntrance() {
  const items = document.querySelectorAll<HTMLElement>('.hero-enter');
  if (!items.length) return;

  if (reduced) {
    items.forEach((el) => el.classList.add('is-in'));
    return;
  }

  requestAnimationFrame(() => {
    items.forEach((el) => el.classList.add('is-in'));
  });
}

function initHeroParallax() {
  if (reduced) return;

  const wrap = document.querySelector<HTMLElement>('[data-hero-parallax]');
  const section = document.querySelector<HTMLElement>('[data-hero-section]');
  if (!wrap || !section) return;

  const onScroll = () => {
    const rect = section.getBoundingClientRect();
    const progress = Math.min(Math.max(-rect.top / Math.max(rect.height, 1), 0), 1);
    wrap.style.transform = `translateY(${progress * 28}px)`;
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function initReveals() {
  const nodes = document.querySelectorAll<HTMLElement>('.reveal, .steps-line, [data-count-up]');
  if (!nodes.length) return;

  if (reduced) {
    nodes.forEach((el) => {
      el.classList.add('is-in', 'is-drawn');
      if (el.hasAttribute('data-count-up')) {
        el.textContent = el.getAttribute('data-count-up') ?? el.textContent;
      }
    });
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;

        if (el.classList.contains('reveal')) el.classList.add('is-in');
        if (el.classList.contains('steps-line')) el.classList.add('is-drawn');
        if (el.hasAttribute('data-count-up')) runCountUp(el);

        io.unobserve(el);
      }
    },
    { threshold: 0.2, rootMargin: '0px 0px -8% 0px' },
  );

  nodes.forEach((el) => io.observe(el));
}

function runCountUp(el: HTMLElement) {
  if (el.dataset.counted === '1') return;
  el.dataset.counted = '1';

  const targetText = el.getAttribute('data-count-up') ?? '100+';
  const match = targetText.match(/^(\d+)(.*)$/);
  if (!match) {
    el.textContent = targetText;
    return;
  }

  const target = Number(match[1]);
  const suffix = match[2] ?? '';
  const duration = 1200;
  const start = performance.now();

  const tick = (now: number) => {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = `${Math.round(target * eased)}${suffix}`;
    if (t < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

initHeader();
initHeroEntrance();
initHeroParallax();
initReveals();
