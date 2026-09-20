/**
 * Modern Tech Sharp Diamond Micro-Cursor (Non-Rounded)
 * Replaces traditional rounded cursor balls with a precise, sharp 45-degree diamond crosshair.
 */

export function initCustomCursor() {
  // Disable on touch devices
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const dot = document.querySelector('.custom-cursor-dot');
  const follower = document.querySelector('.custom-cursor-follower');
  
  if (follower) {
    follower.style.display = 'none';
  }

  if (!dot) return;

  // Make dot a sharp diamond (zero border-radius)
  dot.style.borderRadius = '0px';
  dot.style.width = '7px';
  dot.style.height = '7px';
  dot.style.background = '#0a0a0d';

  let mouseX = -100;
  let mouseY = -100;
  let isVisible = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isVisible) {
      dot.style.opacity = '1';
      dot.style.transform = `translate3d(${mouseX - 3.5}px, ${mouseY - 3.5}px, 0) rotate(45deg)`;
      isVisible = true;
    } else {
      dot.style.transform = `translate3d(${mouseX - 3.5}px, ${mouseY - 3.5}px, 0) rotate(45deg)`;
    }
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    isVisible = false;
  });

  // Attach hover state scaling for sharp diamond
  const attachHoverListeners = () => {
    const interactiveElements = document.querySelectorAll(
      'a, button, input, textarea, .service-card, .project-row, .lc-stat-card, .btn-primary, .btn-secondary, .cert-card, .experience-card, .education-card'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        dot.style.transform = `translate3d(${mouseX - 3.5}px, ${mouseY - 3.5}px, 0) rotate(45deg) scale(1.6)`;
        dot.style.background = '#0ea5e9';
      });

      el.addEventListener('mouseleave', () => {
        dot.style.transform = `translate3d(${mouseX - 3.5}px, ${mouseY - 3.5}px, 0) rotate(45deg) scale(1)`;
        dot.style.background = '#0a0a0d';
      });
    });
  };

  attachHoverListeners();

  return { attachHoverListeners };
}
