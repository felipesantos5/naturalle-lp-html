document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const slideMenu = document.getElementById('slideMenu');
  const navItems = document.querySelectorAll('.slide-menu__nav-item');
  const closeButton = document.getElementById('closeButton');

  hamburger.addEventListener('click', function() {
    slideMenu.classList.toggle('open');
  });

  closeButton.addEventListener('click', function() {
    slideMenu.classList.remove('open');
  });

  navItems.forEach(item => {
    item.addEventListener('click', function() {
      slideMenu.classList.remove('open');
    });
  });
});
