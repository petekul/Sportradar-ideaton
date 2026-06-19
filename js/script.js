// Highlights the current page's link in the nav bar.
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.nav-links a');
  const current = window.location.pathname.split('/').pop() || 'index.html';

  links.forEach((link) => {
    if (link.getAttribute('href') === current) {
      link.classList.add('active');
    }
  });
});
