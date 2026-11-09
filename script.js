const root = document.documentElement;
let activeModal = null;
let modalReturnFocus = null;
let lightboxReturnFocus = null;
let currentGallery = 'printing';
let currentImageIndex = 0;

function setTheme(theme) {
  root.dataset.theme = theme;
  const toggle = document.getElementById('themeToggle');
  if (toggle) {
    toggle.setAttribute('aria-pressed', String(theme === 'dark'));
    toggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
  }
  try { localStorage.setItem('portfolio-theme', theme); } catch (_) {}
}

function closeMenu() {
  const menu = document.getElementById('primaryNav');
  const toggle = document.getElementById('menuToggle');
  menu.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open navigation');
}

function syncScrollLock() {
  const lightboxOpen = document.getElementById('lightbox').classList.contains('active');
  const overlayOpen = Boolean(activeModal) || lightboxOpen;
  document.body.classList.toggle('no-scroll', overlayOpen);
  document.querySelectorAll('.site-header, main, .contact-section, .site-footer').forEach(el => { el.inert = overlayOpen; });
  if (activeModal) activeModal.inert = lightboxOpen;
}

window.openModal = function (id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modalReturnFocus = document.activeElement;
  activeModal = modal;
  modal.setAttribute('aria-hidden', 'false');
  syncScrollLock();
  modal.querySelector('.close')?.focus();
};
window.closeModal = function (id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.setAttribute('aria-hidden', 'true');
  activeModal = null;
  syncScrollLock();
  modalReturnFocus?.focus();
};

  const galleries = {
    printing: [
      { src: './assets/projects/3d_printing/ossila_mount.jpg', caption: 'Ossila Four-Point Probe Automated Mount' },
      { src: './assets/projects/3d_printing/n9_holder.jpg', caption: 'North Robotics N9 Drop Cast Holder' },
      { src: './assets/projects/3d_printing/1.5 by 1.5 thinfilmholderwithlid.png', caption: '1.5" × 1.5" Thin Film Holder with Lid' },
      { src: './assets/projects/3d_printing/Thinfilmholderfordifferentdimension.png', caption: '2" × 1" and 2" × 2" Thin Film Holders' },
      { src: './assets/projects/3d_printing/Loadcellcover.png', caption: 'Load Cell Protective Cover (UTM)' },
      { src: './assets/projects/3d_printing/loadcellmount2.png', caption: 'Load Cell Mount - Design 2' },
      { src: './assets/projects/3d_printing/pipetteholder2.png', caption: 'Pipette Holder - Lab Bench Design' },
      { src: './assets/projects/3d_printing/robosoccerbot.png', caption: 'Robo Soccer Bot - Optimized Ball Handler' },
      { src: './assets/projects/3d_printing/Vileholer.png', caption: 'Custom Vial Holder System' }
    ],
    autonomous: [
      { src: './assets/projects/autonomous_lab/spectrometer_setup.jpg', caption: 'Spectrometer Setup' },
      { src: './assets/projects/autonomous_lab/stage_contact.jpg', caption: 'Stage & SMU Setup' }
    ],
    cms_tracker: [
      { src: './assets/projects/cms_tracker/Final_slides_Sabin_Baral._page-0001.jpg', caption: 'Slide 1' },
      { src: './assets/projects/cms_tracker/Final_slides_Sabin_Baral._page-0002.jpg', caption: 'Slide 2' },
      { src: './assets/projects/cms_tracker/Final_slides_Sabin_Baral._page-0003.jpg', caption: 'Slide 3' },
      { src: './assets/projects/cms_tracker/Final_slides_Sabin_Baral._page-0004.jpg', caption: 'Slide 4' },
      { src: './assets/projects/cms_tracker/Final_slides_Sabin_Baral._page-0005.jpg', caption: 'Slide 5' },
      { src: './assets/projects/cms_tracker/Final_slides_Sabin_Baral._page-0006.jpg', caption: 'Slide 6' },
      { src: './assets/projects/cms_tracker/Final_slides_Sabin_Baral._page-0007.jpg', caption: 'Slide 7' },
      { src: './assets/projects/cms_tracker/Final_slides_Sabin_Baral._page-0008.jpg', caption: 'Slide 8' },
      { src: './assets/projects/cms_tracker/Final_slides_Sabin_Baral._page-0009.jpg', caption: 'Slide 9' },
      { src: './assets/projects/cms_tracker/Final_slides_Sabin_Baral._page-0010.jpg', caption: 'Slide 10' },
      { src: './assets/projects/cms_tracker/Final_slides_Sabin_Baral._page-0011.jpg', caption: 'Slide 11' },
      { src: './assets/projects/cms_tracker/Final_slides_Sabin_Baral._page-0012.jpg', caption: 'Slide 12' },
      { src: './assets/projects/cms_tracker/Final_slides_Sabin_Baral._page-0013.jpg', caption: 'Slide 13' },
      { src: './assets/projects/cms_tracker/Final_slides_Sabin_Baral._page-0014.jpg', caption: 'Slide 14' },
      { src: './assets/projects/cms_tracker/Final_slides_Sabin_Baral._page-0015.jpg', caption: 'Slide 15' },
      { src: './assets/projects/cms_tracker/Final_slides_Sabin_Baral._page-0016.jpg', caption: 'Slide 16' },
      { src: './assets/projects/cms_tracker/Final_slides_Sabin_Baral._page-0017.jpg', caption: 'Slide 17' },
      { src: './assets/projects/cms_tracker/Final_slides_Sabin_Baral._page-0018.jpg', caption: 'Slide 18' },
      { src: './assets/projects/cms_tracker/Final_slides_Sabin_Baral._page-0019.jpg', caption: 'Slide 19' }
    ],
    veriscript_showcase: [
      { src: './assets/projects/veriscript/showcase1.jpg', caption: 'Innovation Hub Showcase 1' },
      { src: './assets/projects/veriscript/showcase2.jpg', caption: 'Innovation Hub Showcase 2' }
    ],
    veriscript_more_info: [
      { src: './assets/projects/veriscript/more_info1.jpg', caption: 'More Information 1' },
      { src: './assets/projects/veriscript/more_info2.jpg', caption: 'More Information 2' },
      { src: './assets/projects/veriscript/more_info3.jpg', caption: 'More Information 3' },
      { src: './assets/projects/veriscript/more_info4.jpg', caption: 'More Information 4' },
      { src: './assets/projects/veriscript/more_info5.jpg', caption: 'More Information 5' },
      { src: './assets/projects/veriscript/more_info6.jpg', caption: 'More Information 6' },
      { src: './assets/projects/veriscript/more_info7.jpg', caption: 'More Information 7' }
    ]
  };


window.openLightbox = function (index, gallery = 'printing') {
  if (!galleries[gallery]?.[index]) return;
  lightboxReturnFocus = document.activeElement;
  currentGallery = gallery;
  currentImageIndex = index;
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.add('active');
  lightbox.setAttribute('aria-hidden', 'false');
  updateLightbox();
  syncScrollLock();
  lightbox.querySelector('.lightbox-close').focus();
};
function updateLightbox() {
  const item = galleries[currentGallery][currentImageIndex];
  const img = document.getElementById('lightbox-img');
  img.src = item.src;
  img.alt = item.caption;
  document.getElementById('lightbox-caption').textContent = item.caption;
  document.getElementById('lightbox-counter').textContent = `${currentImageIndex + 1} / ${galleries[currentGallery].length}`;
}
window.closeLightbox = function () {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox.classList.contains('active')) return;
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
  document.getElementById('lightbox-img').removeAttribute('src');
  syncScrollLock();
  lightboxReturnFocus?.focus();
};
window.navigateLightbox = function (direction) {
  const length = galleries[currentGallery].length;
  currentImageIndex = (currentImageIndex + direction + length) % length;
  updateLightbox();
};

function trapFocus(event, container) {
  const focusable = [...container.querySelectorAll('a[href], button:not([disabled]), [tabindex="0"], input, textarea, video[controls]')].filter(el => el.getClientRects().length);
  if (!focusable.length) return;
  const first = focusable[0], last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
}

async function handleContact(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const button = form.querySelector('button[type="submit"]');
  const error = document.getElementById('formError');
  error.hidden = true;
  button.disabled = true;
  button.textContent = 'Sending…';
  try {
    const response = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error(`Form submission failed: ${response.status}`);
    form.hidden = true;
    document.getElementById('formSuccess').hidden = false;
    form.reset();
  } catch (err) {
    error.hidden = false;
    button.disabled = false;
    button.innerHTML = 'Send message <span aria-hidden="true">↗</span>';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  const initialTheme = root.dataset.theme || 'light';
  themeToggle.setAttribute('aria-pressed', String(initialTheme === 'dark'));
  themeToggle.setAttribute('aria-label', `Switch to ${initialTheme === 'dark' ? 'light' : 'dark'} theme`);
  themeToggle.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));
  document.getElementById('copyrightYear').textContent = new Date().getFullYear();
  const menuToggle = document.getElementById('menuToggle');
  const menu = document.getElementById('primaryNav');
  menuToggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.querySelectorAll('[data-modal]').forEach(button => button.addEventListener('click', () => openModal(button.dataset.modal)));
  document.querySelectorAll('.modal').forEach(modal => {
    modal.setAttribute('aria-hidden', 'true');
    modal.addEventListener('click', event => { if (event.target === modal) closeModal(modal.id); });
  });
  document.getElementById('lightbox').addEventListener('click', event => { if (event.target.id === 'lightbox') closeLightbox(); });
  document.getElementById('contactForm').addEventListener('submit', handleContact);
  document.addEventListener('keydown', event => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.classList.contains('active')) {
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowLeft') navigateLightbox(-1);
      if (event.key === 'ArrowRight') navigateLightbox(1);
      if (event.key === 'Tab') trapFocus(event, lightbox);
      return;
    }
    if (activeModal) {
      if (event.key === 'Escape') closeModal(activeModal.id);
      if (event.key === 'Tab') trapFocus(event, activeModal);
      return;
    }
    if (event.key === 'Escape') closeMenu();
  });
});
