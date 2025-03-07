// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  body.classList.add(savedTheme);
  themeToggle.textContent = savedTheme === 'dark-mode' ? '🌞' : '🌙';
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  const isDarkMode = body.classList.contains('dark-mode');
  themeToggle.textContent = isDarkMode ? '🌞' : '🌙';
  localStorage.setItem('theme', isDarkMode ? 'dark-mode' : 'light-mode');
});

// ScrollReveal Animation
ScrollReveal().reveal('.header__container', { delay: 300, duration: 1000, origin: 'top', distance: '30px' });
ScrollReveal().reveal('.dashboard', { delay: 500, duration: 1000, origin: 'bottom', distance: '30px' });

// Swiper Initialization
const swiper = new Swiper('.swiper', {
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});