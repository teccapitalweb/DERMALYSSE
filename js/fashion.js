(() => {
  const header = document.querySelector('.fashion-nav');
  const menuButton = document.querySelector('.fashion-menu');
  const navigation = document.querySelector('.fashion-links');
  const modal = document.querySelector('#preview-modal');
  const modalClose = modal?.querySelector('.preview-close');
  const previewVideo = modal?.querySelector('video');

  const setMenu = (open) => {
    if (!menuButton || !navigation) return;
    navigation.classList.toggle('fashion-links--open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  };

  const setModal = (open) => {
    if (!modal) return;
    modal.hidden = !open;
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) {
      modalClose?.focus();
      previewVideo?.play().catch(() => {});
    } else {
      previewVideo?.pause();
    }
  };

  const updateHeader = () => header?.classList.toggle('fashion-nav--solid', window.scrollY > 20);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  menuButton?.addEventListener('click', () => setMenu(!navigation?.classList.contains('fashion-links--open')));
  navigation?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));

  document.querySelectorAll('[data-preview]').forEach((button) => button.addEventListener('click', () => setModal(true)));
  modalClose?.addEventListener('click', () => setModal(false));
  modal?.addEventListener('mousedown', (event) => {
    if (event.target === modal) setModal(false);
  });

  window.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    setMenu(false);
    setModal(false);
  });

  const revealTargets = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.13 });
    revealTargets.forEach((target) => observer.observe(target));
  } else {
    revealTargets.forEach((target) => target.classList.add('is-visible'));
  }
})();
