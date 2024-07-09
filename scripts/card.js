document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.depoiments__carousel-track');
  let cards = Array.from(track.children);
  const leftButton = document.getElementById('carousel-button-left');
  const rightButton = document.getElementById('carousel-button-right');

  const cardWidth = cards[0].getBoundingClientRect().width;
  const cardMargin = parseInt(getComputedStyle(cards[0]).marginLeft) * 4; // margem horizontal entre os cards
  const moveAmount = cardWidth + cardMargin;
  let currentIndex = 0;
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationID = 0;

  // Clonar os primeiros e últimos elementos para criar um loop infinito
  function cloneElements() {
    cards.forEach(card => {
      let cloneFirst = card.cloneNode(true);
      let cloneLast = card.cloneNode(true);
      track.appendChild(cloneFirst);
      track.insertBefore(cloneLast, track.firstChild);
    });
  }

  cloneElements();

  // Atualizar a lista de cards após clonar
  cards = Array.from(track.children);

  // Ajustar a posição inicial para o conjunto de clones correto
  function setInitialPosition() {
    track.style.transition = 'none';
    track.style.transform = `translateX(${-moveAmount * cards.length / 3}px)`;
    setTimeout(() => {
      track.style.transition = 'transform 0.5s ease';
    });
  }

  // Atualizar o carrossel
  function updateCarousel() {
    const moveBy = -moveAmount * (currentIndex + cards.length / 3);
    track.style.transform = `translateX(${moveBy}px)`;
    cards.forEach((card, index) => {
      card.classList.toggle("active", index === currentIndex + cards.length / 3);
      card.classList.toggle("inactive", index !== currentIndex + cards.length / 3);
    });
  }

  // Função para mover para a esquerda
  function moveLeft() {
    currentIndex--;
    updateCarousel();
    if (currentIndex < 0) {
      setTimeout(() => {
        currentIndex = cards.length / 3 - 1;
        track.style.transition = 'none';
        updateCarousel();
        setTimeout(() => {
          track.style.transition = 'transform 1s ease';
        }, 0);
      }, 500);
    }
  }

  // Função para mover para a direita
  function moveRight() {
    currentIndex++;
    updateCarousel();
    if (currentIndex >= cards.length / 3) {
      setTimeout(() => {
        currentIndex = 0;
        track.style.transition = 'none';
        updateCarousel();
        setTimeout(() => {
          track.style.transition = 'transform 1s ease';
        }, 0);
      }, 500);
    }
  }

  // Funções de arrasto
  function touchStart(index) {
    return function(event) {
      isDragging = true;
      startPos = getPositionX(event);
      animationID = requestAnimationFrame(animation);
      track.classList.add('grabbing');
    }
  }

  function touchMove(event) {
    if (isDragging) {
      const currentPosition = getPositionX(event);
      currentTranslate = prevTranslate + currentPosition - startPos;
    }
  }

  function touchEnd() {
    cancelAnimationFrame(animationID);
    isDragging = false;
    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -100) {
      moveRight();
    } else if (movedBy > 100) {
      moveLeft();
    } else {
      track.style.transform = `translateX(${prevTranslate}px)`;
    }

    track.classList.remove('grabbing');
  }

  function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
  }

  function animation() {
    track.style.transform = `translateX(${currentTranslate}px)`;
    if (isDragging) requestAnimationFrame(animation);
  }

  cards.forEach((card, index) => {
    const cardImage = card.querySelector('img');
    card.addEventListener('dragstart', (e) => e.preventDefault());

    // Touch events
    card.addEventListener('touchstart', touchStart(index));
    card.addEventListener('touchmove', touchMove);
    card.addEventListener('touchend', touchEnd);

    // Mouse events
    card.addEventListener('mousedown', touchStart(index));
    card.addEventListener('mousemove', touchMove);
    card.addEventListener('mouseup', touchEnd);
    card.addEventListener('mouseleave', () => {
      if (isDragging) touchEnd();
    });
  });

  leftButton.addEventListener('click', moveLeft);
  rightButton.addEventListener('click', moveRight);

  // Inicializar a posição do carrossel
  setInitialPosition();
});
