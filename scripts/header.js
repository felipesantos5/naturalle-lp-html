document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const slideMenu = document.getElementById('slideMenu');
  const navItems = document.querySelectorAll('.header__nav-item-slide');
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
  // Seleciona todos os links de navegação dentro do modal
  var navLinks = document.querySelectorAll('.header__nav-item-slide');

  // Adiciona um evento de clique a cada link de navegação
  navLinks.forEach(function(link) {
    link.addEventListener('click', closeMenuModal);
  });
});
