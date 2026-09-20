import './style.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
import { portfolioData } from './config/portfolioData.js';
import { initCustomCursor } from './components/cursor.js';
import { initHero3D } from './components/hero3D.js';
import { initProjects } from './components/projects.js';
import { initContact } from './components/contact.js';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Custom Cursor & Hero 3D background
  const cursor = initCustomCursor();
  initHero3D();

  // 2. Render Marquee Ticker
  renderMarquee();

  // 3. Render Services Section & Initialize 3D Viewports
  renderServices(cursor);

  // 4. Render Tech Stack
  renderTechStack();

  // 5. Initialize Works / Projects Showcase (with 3D perspective slider)
  initProjects();

  // 6. Initialize Contact, Clock, & Toasts
  initContact();

  // 7. Navigation & Mobile Menu
  initNavigation();

  // 8. Re-bind cursor hover listeners on newly rendered DOM elements
  if (cursor && cursor.attachHoverListeners) {
    cursor.attachHoverListeners();
  }

  // 9. GSAP Smooth Page Entrance
  runEntranceAnimations();

  // 10. GSAP Scroll Animations
  initScrollAnimations();

  // 11. Refresh ScrollTrigger when images, fonts, and window finish loading
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
  });
});

/**
 * Render Infinite Marquee Ticker
 */
function renderMarquee() {
  const marqueeTrack = document.querySelector('.marquee-track');
  if (!marqueeTrack) return;

  const items = portfolioData.tickerItems;
  const combined = [...items, ...items, ...items];

  marqueeTrack.innerHTML = combined
    .map((item) => `<div class="marquee-item">${item}</div>`)
    .join('');
}

/**
 * Render Services Cards
 */
function renderServices(cursor) {
  const container = document.querySelector('.services-list');
  if (!container) return;

  container.innerHTML = portfolioData.services
    .map(
      (s, idx) => `
    <div class="service-card ${idx === 0 ? 'is-expanded' : ''}" data-service-id="${s.id}">
      <div class="service-header">
        <div class="service-meta-left">
          <span class="service-id">${s.id}</span>
          <h3 class="service-title">${s.title}</h3>
        </div>
        <div class="service-expand-indicator">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>
      <div class="service-body-collapse">
        <div class="service-content-grid">
          <div class="service-desc-wrap">
            <p class="service-tagline">${s.tagline}</p>
            <p class="service-desc">${s.description}</p>
            <ul class="deliverables-list">
              ${s.deliverables.map((d) => `<li>${d}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    </div>
  `
    )
    .join('');

  const cards = document.querySelectorAll('.service-card');
  cards.forEach((card) => {
    const header = card.querySelector('.service-header');
    header.addEventListener('click', () => {
      const wasExpanded = card.classList.contains('is-expanded');

      // Accordion mode: collapse others
      cards.forEach((c) => {
        c.classList.remove('is-expanded');
      });

      if (!wasExpanded) {
        card.classList.add('is-expanded');
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 320);
      }

      if (cursor && cursor.attachHoverListeners) {
        cursor.attachHoverListeners();
      }
    });
  });
}

/**
 * Render Categorized Tech Stack Grid
 */
function renderTechStack() {
  const container = document.querySelector('.tech-stack-grid');
  if (!container) return;

  container.innerHTML = portfolioData.techStack
    .map(
      (group) => `
    <div class="tech-group-card">
      <h4 class="tech-group-title">${group.category}</h4>
      <div class="tech-badges-list">
        ${group.items.map((item) => `<span class="tech-badge-item">${item}</span>`).join('')}
      </div>
    </div>
  `
    )
    .join('');
}

/**
 * Navigation Bar Scroll Observer & Mobile Menu
 */
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.querySelector('.mobile-toggle-btn');
  const mobileOverlay = document.getElementById('mobile-menu');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach((sec) => {
      const sectionTop = sec.offsetTop - 180;
      if (window.scrollY >= sectionTop) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  if (mobileToggle && mobileOverlay) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileOverlay.classList.toggle('is-open');
      mobileToggle.classList.toggle('is-active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    const mobileLinks = mobileOverlay.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileOverlay.classList.remove('is-open');
        mobileToggle.classList.remove('is-active');
        document.body.style.overflow = '';
      });
    });
  }
}

/**
 * Smooth GSAP Page Entrance Choreography
 */
function runEntranceAnimations() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.from('.site-header', {
    y: -40,
    opacity: 0,
    duration: 0.9,
    delay: 0.1
  });

  tl.from(
    '.giant-line',
    {
      y: 80,
      opacity: 0,
      duration: 1.1,
      stagger: 0.1
    },
    '-=0.6'
  );

  tl.from(
    '.hero-portrait-wrap',
    {
      scale: 0.94,
      opacity: 0,
      duration: 1.1
    },
    '-=0.8'
  );

  tl.from(
    '.hero-left-col > *',
    {
      y: 28,
      opacity: 0,
      duration: 0.8,
      stagger: 0.08
    },
    '-=0.9'
  );

  if (document.querySelector('.floating-hero-badge')) {
    tl.from(
      '.floating-hero-badge',
      {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'back.out(1.5)'
      },
      '-=0.5'
    );
  }
}

/**
 * GSAP Clean 2D Scroll Animations
 */
function initScrollAnimations() {
  const isMobile = window.innerWidth <= 820;

  // 1. Hero Text Parallax on Scroll
  gsap.to('.hero-giant-bg-text', {
    scrollTrigger: {
      trigger: '#home',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    },
    y: isMobile ? 35 : 60,
    scale: 0.96,
    opacity: 0.25
  });

  if (!isMobile) {
    gsap.to('.hero-portrait-wrap', {
      scrollTrigger: {
        trigger: '#home',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2
      },
      y: -25
    });

    // Mouse parallax floating interaction for portrait photo
    const portraitWrap = document.querySelector('.hero-portrait-wrap');
    if (portraitWrap) {
      window.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX / window.innerWidth - 0.5) * 16;
        const moveY = (e.clientY / window.innerHeight - 0.5) * 12;
        gsap.to(portraitWrap, {
          x: moveX,
          y: moveY,
          duration: 1.2,
          ease: 'power2.out'
        });
      });
    }
  }

  // 2. Smooth Arrival for Section Headlines & Labels
  document.querySelectorAll('.section-wrapper').forEach((section) => {
    const label = section.querySelector('.section-label-tag');
    const headline = section.querySelector('.section-headline');
    const subP = section.querySelector('.section-sub-p, .section-subheadline');

    if (label) {
      gsap.fromTo(
        label,
        { y: 14, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: label,
            start: 'top 96%',
            once: true
          }
        }
      );
    }

    if (headline) {
      gsap.fromTo(
        headline,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headline,
            start: 'top 92%',
            once: true
          }
        }
      );
    }

    if (subP) {
      gsap.fromTo(
        subP,
        { y: 14, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: subP,
            start: 'top 95%',
            once: true
          }
        }
      );
    }
  });

  // 3. About Page Text & Pillars Scroll
  const aboutLead = document.querySelector('.about-lead-statement');
  const aboutBody = document.querySelector('.about-body-p');
  if (aboutLead) {
    gsap.fromTo(
      aboutLead,
      { y: 16, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: aboutLead,
          start: 'top 95%',
          once: true
        }
      }
    );
  }

  if (aboutBody) {
    gsap.fromTo(
      aboutBody,
      { y: 14, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: aboutBody,
          start: 'top 95%',
          once: true
        }
      }
    );
  }

  const pillars = document.querySelectorAll('.engineering-pillars-grid .pillar-item');
  if (pillars.length > 0) {
    gsap.fromTo(
      pillars,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.engineering-pillars-grid',
          start: 'top 90%',
          once: true
        }
      }
    );
  }

  // 4. Kinetic Watermarks Smooth Horizontal Scrub on Scroll
  document.querySelectorAll('.kinetic-watermark').forEach((mark, idx) => {
    gsap.to(mark, {
      scrollTrigger: {
        trigger: mark.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5
      },
      x: idx % 2 === 0 ? (isMobile ? -30 : -90) : (isMobile ? 30 : 90)
    });
  });

  // 5. Services Cards Entrance
  document.querySelectorAll('.service-card').forEach((card) => {
    gsap.fromTo(
      card,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 94%',
          once: true
        }
      }
    );
  });

  // 6. Spec Card Float
  const specCard = document.querySelector('.spec-card');
  if (specCard) {
    gsap.fromTo(
      specCard,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: specCard,
          start: 'top 94%',
          once: true
        }
      }
    );
  }

  // 7. FAQ Items Entrance
  document.querySelectorAll('.faq-item').forEach((item) => {
    gsap.fromTo(
      item,
      { y: 16, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 94%',
          once: true
        }
      }
    );
  });
}
