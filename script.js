
// ========================================
// PORTFOLIO - JAVASCRIPT
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initNavigation();
  initScrollEffects();
  initTypingEffect();
  initContactForm();
  initRippleEffect();
  initProjectStats();
  initLightbox();

  // Reveal sections
  revealSections();

  console.log('🎉 Portfolio fully loaded and initialized!');
});


// ========================================
// DARK MODE
// ========================================
function initDarkMode() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;

  const savedMode = localStorage.getItem('darkMode');
  const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Enable dark mode if saved as 'enabled' OR (not saved AND system prefers dark)
  if (savedMode === 'enabled' || (!savedMode && systemPrefersDark)) {
    body.classList.add('dark-mode');
  }

  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
      } else {
        localStorage.setItem('darkMode', 'disabled');
      }
    });
  }
}

// ========================================
// NAVIGATION
// ========================================
function initNavigation() {
  // Hamburger Menu
  window.toggleMenu = function () {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
  };
}

// ========================================
// SCROLL EFFECTS
// ========================================
function initScrollEffects() {
  // Back to Top
  const backToTopButton = document.getElementById('backToTop');
  if (backToTopButton) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
      } else {
        backToTopButton.classList.remove('show');
      }
    });

    backToTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Intersection Observer for Fade In
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        entry.target.style.animation = 'none'; // Stop CSS animation to allow manual control if needed
      }
    });
  }, observerOptions);

  const fadeElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
  fadeElements.forEach(el => observer.observe(el));
}

// ========================================
// TYPING EFFECT
// ========================================
function initTypingEffect() {
  const titleElement = document.querySelector('.typing-effect');
  if (titleElement) {
    const text = titleElement.textContent;
    titleElement.textContent = '';
    titleElement.style.opacity = '1';

    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        titleElement.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    }
    setTimeout(typeWriter, 500);
  }
}

// ========================================
// CONTACT FORM
// ========================================
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      try {
        const formData = new FormData(contactForm);
        const response = await fetch('https://formspree.io/f/xqarlrdl', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          contactForm.style.display = 'none';
          if (formSuccess) formSuccess.classList.add('show');
          contactForm.reset();

          // Reset form view after delay
          setTimeout(() => {
            contactForm.style.display = 'flex';
            if (formSuccess) formSuccess.classList.remove('show');
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
          }, 5000);
        } else {
          throw new Error('Form submission failed');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Oops! There was a problem submitting your form. Please try again or email me directly.');
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
      }
    });
  }
}

// ========================================
// RIPPLE EFFECT
// ========================================
function initRippleEffect() {
  document.querySelectorAll('.ripple').forEach(button => {
    button.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple-effect');

      button.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// ========================================
// PROJECT STATS
// ========================================
function initProjectStats() {
  const statNumbers = document.querySelectorAll('.stat-number');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const finalValue = target.textContent;

        if (finalValue.includes('%')) {
          animateCounter(target, 0, parseInt(finalValue), 1500, '%');
        } else if (finalValue.includes('+')) {
          animateCounter(target, 0, parseInt(finalValue), 1500, '+');
        } else if (finalValue.includes('$')) {
          animateCounter(target, 0, parseInt(finalValue.replace('$', '')), 1500, '$', '+');
        } else if (finalValue === 'GP') {
          // Just leave it as GP - no animation needed
          target.textContent = 'GP';
        } else if (finalValue === 'Full' || finalValue === 'Closed') {
          // Just leave text-based stats as-is - no animation needed
          target.textContent = finalValue;
        }
        statsObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(stat => statsObserver.observe(stat));
}

function animateCounter(element, start, end, duration, suffix = '', prefix = '') {
  const startTime = performance.now();
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const current = Math.floor(start + (end - start) * easeOutQuart);
    element.textContent = prefix + current + suffix;
    if (progress < 1) requestAnimationFrame(update);
    else element.textContent = prefix + end + suffix;
  }
  requestAnimationFrame(update);
}

// ========================================
// LIGHTBOX GALLERY
// ========================================
function initLightbox() {
  // Expose functions to global scope for onclick handlers
  window.openModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "block";
      document.body.style.overflow = "hidden";
    }
  };

  window.closeModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  };

  // Close modal when clicking outside
  window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
      event.target.style.display = "none";
      document.body.style.overflow = "auto";
    }
  };

  // Escape key for modals
  document.addEventListener('keydown', (event) => {
    if (event.key === "Escape") {
      document.querySelectorAll('.modal').forEach(modal => {
        if (modal.style.display === "block") {
          modal.style.display = "none";
          document.body.style.overflow = "auto";
        }
      });
      closeLightbox();
    }
  });

  // Separate Gallery Data for each project
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

  let currentGallery = 'printing';
  let currentImageIndex = 0;

  window.openLightbox = function (index, gallery = 'printing') {
    currentGallery = gallery;
    currentImageIndex = index;
    const galleryImages = galleries[currentGallery];
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxCounter = document.getElementById('lightbox-counter');

    if (lightbox && lightboxImg && galleryImages[index]) {
      lightbox.classList.add('active');
      lightboxImg.src = galleryImages[index].src;
      lightboxCaption.textContent = galleryImages[index].caption;
      lightboxCounter.textContent = `${index + 1} / ${galleryImages.length}`;
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeLightbox = function () {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  };

  window.navigateLightbox = function (direction) {
    const galleryImages = galleries[currentGallery];
    currentImageIndex += direction;
    if (currentImageIndex < 0) currentImageIndex = galleryImages.length - 1;
    else if (currentImageIndex >= galleryImages.length) currentImageIndex = 0;

    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxCounter = document.getElementById('lightbox-counter');

    if (lightboxImg) {
      lightboxImg.style.opacity = '0';
      setTimeout(() => {
        lightboxImg.src = galleryImages[currentImageIndex].src;
        lightboxCaption.textContent = galleryImages[currentImageIndex].caption;
        lightboxCounter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
        lightboxImg.style.opacity = '1';
      }, 150);
    }
  };

  // Keyboard navigation for lightbox
  document.addEventListener('keydown', (event) => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox && lightbox.classList.contains('active')) {
      if (event.key === 'ArrowLeft') window.navigateLightbox(-1);
      else if (event.key === 'ArrowRight') window.navigateLightbox(1);
    }
  });
}

function revealSections() {
  const sections = document.querySelectorAll('section');
  sections.forEach((section, index) => {
    section.style.opacity = '0';
    setTimeout(() => {
      section.style.transition = 'opacity 0.6s ease';
      section.style.opacity = '1';
    }, index * 100);
  });
}