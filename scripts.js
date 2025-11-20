// scripts.js - accordion + small UX
document.addEventListener("DOMContentLoaded", () => {
  // Existing log (keeps previous behavior)
  console.log("scripts.js cargado correctamente 🚀");

  // ACCORDION logic
  const accordion = document.querySelectorAll('.accordion-item');

  accordion.forEach(item => {
    const btn = item.querySelector('.accordion-btn');
    const panel = item.querySelector('.accordion-panel');

    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';

      // close all
      document.querySelectorAll('.accordion-btn').forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        b.classList.remove('active');
      });
      document.querySelectorAll('.accordion-panel').forEach(p => {
        p.style.maxHeight = null;
        p.classList.remove('open');
      });
      document.querySelectorAll('.accordion-btn .chev').forEach(c => {
        c.style.transform = 'rotate(0deg)';
        c.style.stroke = getComputedStyle(document.documentElement).getPropertyValue('--muted').trim() || '#bfc4c7';
      });

      // if previously closed, open this one
      if (!open) {
        btn.setAttribute('aria-expanded', 'true');
        btn.classList.add('active');
        panel.classList.add('open');

        // set maxHeight to content height
        panel.style.maxHeight = panel.scrollHeight + 20 + "px";

        // rotate chev
        const chevLocal = btn.querySelector('.chev');
        if (chevLocal) {
          chevLocal.style.transform = 'rotate(180deg)';
          chevLocal.style.stroke = getComputedStyle(document.documentElement).getPropertyValue('--gold').trim() || '#ffce54';
        }
      }
    });
  });

  // Accessibility: allow keyboard toggling with Enter/Space
  document.querySelectorAll('.accordion-btn').forEach(btn => {
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });

  // If you want to have the first panel open by default, uncomment:
  // document.querySelectorAll('.accordion-btn')[0].click();
});
