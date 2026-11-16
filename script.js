let activeModal = null;
let modalReturnFocus = null;
let lightboxReturnFocus = null;
let currentGallery = 'printing';
let currentImageIndex = 0;
let standaloneImage = null;
let lockedScrollY = null;

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
  if (overlayOpen && lockedScrollY === null) {
    lockedScrollY = window.scrollY;
    document.body.style.top = `-${lockedScrollY}px`;
    document.body.classList.add('no-scroll');
  } else if (!overlayOpen && lockedScrollY !== null) {
    const position = lockedScrollY;
    lockedScrollY = null;
    document.body.classList.remove('no-scroll');
    document.body.style.removeProperty('top');
    window.scrollTo({ top: position, behavior: 'instant' });
  }
  document.querySelectorAll('.site-header, main, .site-footer').forEach(el => { el.inert = overlayOpen; });
  if (activeModal) activeModal.inert = lightboxOpen;
}

window.openModal = function (id, trigger = document.activeElement) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modalReturnFocus = trigger;
  activeModal = modal;
  closeMenu();
  modal.inert = false;
  modal.setAttribute('aria-hidden', 'false');
  modal.querySelector('.modal-content').scrollTop = 0;
  syncScrollLock();
  modal.querySelector('.close')?.focus();
  if (id === 'modal3') initPrintingGallery();
};
window.closeModal = function (id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.querySelectorAll('video').forEach(video => video.pause());
  modal.setAttribute('aria-hidden', 'true');
  activeModal = null;
  syncScrollLock();
  modalReturnFocus?.focus({ preventScroll: true });
};

  const galleries = {
    printing: [],
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


let printingDataPromise = null;
let printingData = null;
let printingCategory = 'all';

function galleryImage(item) {
  return { src: item.src, caption: item.display_title, category: item.gallery_category };
}

function loadPrintingData() {
  if (!printingDataPromise) {
    printingDataPromise = fetch('./assets/projects/3d_printing/gallery.json')
      .then(response => {
        if (!response.ok) throw new Error('Gallery data could not be loaded.');
        return response.json();
      })
      .then(data => {
        if (!Array.isArray(data.images) || !Array.isArray(data.categories)) throw new Error('Invalid gallery data.');
        printingData = data;
        return data;
      })
      .catch(error => { printingDataPromise = null; throw error; });
  }
  return printingDataPromise;
}

function applyPrintingFilter(category) {
  printingCategory = category;
  const cards = [...document.querySelectorAll('#printingGalleryGrid .design-card')];
  cards.forEach(card => { card.hidden = category !== 'all' && card.dataset.category !== category; });
  document.querySelectorAll('#printingGalleryFilters button').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.category === category));
  });
  const count = cards.filter(card => !card.hidden).length;
  document.getElementById('printingGalleryStatus').textContent = `Showing ${count} of ${printingData.images.length} images`;
}

function openPrintingImage(filename, trigger) {
  const images = printingData.images.filter(item => printingCategory === 'all' || item.gallery_category === printingCategory);
  const index = images.findIndex(item => item.portfolio_filename === filename);
  if (index < 0) return;
  galleries.printing = images.map(galleryImage);
  lightboxReturnFocus = trigger;
  standaloneImage = null;
  currentGallery = 'printing';
  currentImageIndex = index;
  showLightbox();
}

async function initPrintingGallery() {
  const grid = document.getElementById('printingGalleryGrid');
  const filters = document.getElementById('printingGalleryFilters');
  const status = document.getElementById('printingGalleryStatus');
  const retry = document.getElementById('printingGalleryRetry');
  retry.hidden = true;
  grid.setAttribute('aria-busy', 'true');
  try {
    const data = await loadPrintingData();
    if (!grid.dataset.rendered) {
      const categories = [{ name: 'All Designs', count: data.images.length, value: 'all' }, ...data.categories.map(item => ({ ...item, value: item.name }))];
      filters.replaceChildren(...categories.map(item => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'gallery-filter';
        button.dataset.category = item.value;
        button.append(document.createTextNode(item.name + ' '));
        const count = document.createElement('span');
        count.textContent = item.count;
        button.append(count);
        button.addEventListener('click', () => applyPrintingFilter(item.value));
        return button;
      }));
      grid.replaceChildren(...data.images.map(item => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'design-card';
        button.dataset.category = item.gallery_category;
        button.dataset.filename = item.portfolio_filename;
        button.setAttribute('aria-label', `Enlarge ${item.display_title} — ${item.gallery_category}`);
        const frame = document.createElement('span');
        frame.className = 'design-image';
        const image = document.createElement('img');
        image.src = item.thumbnail;
        image.srcset = item.srcset;
        image.sizes = '(max-width: 520px) calc(100vw - 96px), (max-width: 920px) 40vw, 330px';
        image.width = item.thumbnail_width;
        image.height = item.thumbnail_height;
        image.loading = 'lazy';
        image.decoding = 'async';
        image.alt = item.display_title;
        frame.append(image);
        frame.append(document.querySelector('.project-media .expand-icon').cloneNode(true));
        const caption = document.createElement('span');
        caption.className = 'design-caption';
        const title = document.createElement('strong');
        title.textContent = item.display_title;
        const category = document.createElement('span');
        category.textContent = item.gallery_category;
        caption.append(title, category);
        button.append(frame, caption);
        button.addEventListener('click', () => openPrintingImage(item.portfolio_filename, button));
        return button;
      }));
      grid.dataset.rendered = 'true';
    }
    applyPrintingFilter(printingCategory);
  } catch (_) {
    status.textContent = 'The design gallery could not be loaded. Please try again.';
    retry.hidden = false;
  } finally {
    grid.setAttribute('aria-busy', 'false');
  }
}

async function handleProjectImage(button) {
  let caption = button.dataset.imageCaption;
  let category = '';
  if (button.dataset.printingFile) {
    button.setAttribute('aria-busy', 'true');
    try {
      const data = await loadPrintingData();
      const item = data.images.find(item => item.portfolio_filename === button.dataset.printingFile);
      if (item) { caption = item.display_title; category = item.gallery_category; }
    } catch (_) { /* The supplied image can still open if gallery metadata fails. */ }
    finally { button.setAttribute('aria-busy', 'false'); }
  }
  openProjectImage(button.dataset.imageSrc, caption, button, category);
}

function showLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.add('active');
  lightbox.setAttribute('aria-hidden', 'false');
  updateLightbox();
  syncScrollLock();
  lightbox.querySelector('.lightbox-close').focus();
}
window.openLightbox = function (index, gallery = 'printing', trigger = document.activeElement) {
  if (!galleries[gallery]?.[index]) return;
  lightboxReturnFocus = trigger;
  standaloneImage = null;
  currentGallery = gallery;
  currentImageIndex = index;
  showLightbox();
};
function openProjectImage(src, caption, trigger, category = '') {
  lightboxReturnFocus = trigger;
  standaloneImage = { src, caption, category };
  currentImageIndex = 0;
  showLightbox();
}
function updateLightbox() {
  const images = standaloneImage ? [standaloneImage] : galleries[currentGallery];
  const item = images[currentImageIndex];
  const img = document.getElementById('lightbox-img');
  img.src = item.src;
  img.alt = item.caption;
  document.getElementById('lightbox-caption').textContent = item.caption;
  const category = document.getElementById('lightbox-category');
  category.textContent = item.category || '';
  category.hidden = !item.category;
  const original = document.getElementById('lightbox-original');
  original.href = item.src;
  original.hidden = false;
  const counter = document.getElementById('lightbox-counter');
  counter.textContent = `${currentImageIndex + 1} / ${images.length}`;
  counter.hidden = images.length === 1;
  document.querySelectorAll('.lightbox-prev, .lightbox-next').forEach(button => { button.hidden = images.length === 1; });
}
window.closeLightbox = function () {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox.classList.contains('active')) return;
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
  document.getElementById('lightbox-img').removeAttribute('src');
  document.getElementById('lightbox-original').removeAttribute('href');
  document.getElementById('lightbox-original').hidden = true;
  syncScrollLock();
  lightboxReturnFocus?.focus({ preventScroll: true });
};
window.navigateLightbox = function (direction) {
  if (standaloneImage) return;
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
  form.setAttribute('aria-busy', 'true');
  error.hidden = true;
  button.disabled = true;
  button.textContent = 'Sending…';
  try {
    const response = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error(`Form submission failed: ${response.status}`);
    form.hidden = true;
    const success = document.getElementById('formSuccess');
    success.hidden = false;
    success.focus();
    form.reset();
  } catch (err) {
    error.hidden = false;
    button.disabled = false;
    button.innerHTML = 'Send message <span aria-hidden="true">↗</span>';
  } finally {
    form.setAttribute('aria-busy', 'false');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('copyrightYear').textContent = new Date().getFullYear();
  const menuToggle = document.getElementById('menuToggle');
  const menu = document.getElementById('primaryNav');
  menuToggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  matchMedia('(min-width: 921px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
  document.addEventListener('click', event => { if (!event.target.closest('.nav-shell') || event.target.closest('#themeToggle')) closeMenu(); });
  document.addEventListener('focusin', event => { if (!event.target.closest('.nav-shell')) closeMenu(); });
  document.querySelectorAll('[data-image-src]').forEach(button => button.addEventListener('click', () => handleProjectImage(button)));
  document.getElementById('printingGalleryRetry').addEventListener('click', initPrintingGallery);
  document.querySelectorAll('[data-modal]').forEach(button => button.addEventListener('click', () => openModal(button.dataset.modal, button)));
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
    if (event.key === 'Escape' && menu.classList.contains('open')) { closeMenu(); menuToggle.focus(); }
  });
});
