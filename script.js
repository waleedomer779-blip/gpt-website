const header = document.getElementById('site-header');
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.getElementById('mobile-menu');
const revealElements = document.querySelectorAll('.reveal');
const parallaxElements = document.querySelectorAll('.parallax');
const yearEl = document.getElementById('year');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const onScroll = () => {
  if (window.scrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  const y = window.scrollY;
  parallaxElements.forEach((element) => {
    const speed = Number(element.dataset.speed || 0.04);
    element.style.transform = `translateY(${y * speed}px)`;
  });
};

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

if (menuToggle && mobileNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  },
  { threshold: 0.2 }
);

revealElements.forEach((element) => observer.observe(element));

const faqDetails = document.querySelectorAll('.faq-list details');
faqDetails.forEach((detail) => {
  detail.addEventListener('toggle', () => {
    if (detail.open) {
      faqDetails.forEach((other) => {
        if (other !== detail) {
          other.open = false;
        }
      });
    }
  });
});
