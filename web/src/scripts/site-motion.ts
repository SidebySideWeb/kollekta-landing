/** Progressive-enhancement scroll reveal + sticky header (from rebrand design). */
function initSiteMotion() {
  const header = document.getElementById('siteHeader');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
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

initSiteMotion();
