/* ===================================================
   NAVBAR SCROLL EFFECT + ACTIVE LINK
=================================================== */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  //updateProgressBar();
  updateActiveLink();
  revealOnScroll();
  toggleBackToTop();
});

function updateActiveLink() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.section === current);
  });
}

/* ===================================================
   MOBILE NAV TOGGLE
=================================================== */
const navToggle = document.getElementById('navToggle');
const navLinksContainer = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinksContainer.classList.toggle('open');
});

navLinksContainer.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinksContainer.classList.remove('open');
  });
});


/* ===================================================
   BACK TO TOP BUTTON
=================================================== */
const backToTop = document.getElementById('backToTop');

function toggleBackToTop() {
  backToTop.classList.toggle('show', window.scrollY > 500);
}

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===================================================
   TYPING ANIMATION
=================================================== */
const typedTextEl = document.getElementById('typedText');
const phrases = [
  'BCA Student',
  'Aspiring Full Stack Web Developer',
  'React • Node.js • MongoDB Learner'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  typedTextEl.textContent = currentPhrase.substring(0, charIndex);

  let typeSpeed = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === currentPhrase.length) {
    typeSpeed = 1600;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typeSpeed = 400;
  }

  setTimeout(typeLoop, typeSpeed);
}

typeLoop();

/* ===================================================
   SCROLL REVEAL ANIMATION
=================================================== */
const revealElements = document.querySelectorAll('.reveal');

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  revealElements.forEach(el => {
    const elTop = el.getBoundingClientRect().top;

    if (elTop < windowHeight - 80) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
}

/* ===================================================
   ANIMATED STATISTICS COUNTER
=================================================== */
const statNumbers = document.querySelectorAll('.stat-number');
let countersStarted = false;

function startCounters() {
  if (countersStarted) return;

  const heroEl = document.querySelector('.hero-stats');
  const rect = heroEl.getBoundingClientRect();

  if (rect.top < window.innerHeight) {
    countersStarted = true;
    statNumbers.forEach(stat => {
      const target = parseInt(stat.dataset.target, 10);
      let count = 0;
      const duration = 1500;
      const stepTime = Math.max(Math.floor(duration / target), 20);

      const interval = setInterval(() => {
        count++;
        stat.textContent = count;
        if (count >= target) {
          stat.textContent = target;
          clearInterval(interval);
        }
      }, stepTime);
    });
  }
}

window.addEventListener('scroll', startCounters);
window.addEventListener('load', () => {
  revealOnScroll();
  startCounters();
  //updateProgressBar();
});

/* ===================================================
   BUTTON RIPPLE EFFECT
=================================================== */
document.querySelectorAll('.ripple').forEach(button => {
  button.addEventListener('click', function (e) {
    const circle = document.createElement('span');
    const diameter = Math.max(this.clientWidth, this.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - this.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${e.clientY - this.getBoundingClientRect().top - radius}px`;
    circle.classList.add('ripple-effect');

    const oldRipple = this.querySelector('.ripple-effect');
    if (oldRipple) oldRipple.remove();

    this.appendChild(circle);

    setTimeout(() => circle.remove(), 600);
  });
});

/* ===================================================
   SMOOTH SCROLL FOR ANCHOR LINKS
=================================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId.length > 1) {
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});
