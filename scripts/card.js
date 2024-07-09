document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.depoiments__carousel-track');
  let cards = Array.from(track.children);
  const leftButton = document.getElementById('carousel-button-left');
  const rightButton = document.getElementById('carousel-button-right');

  const cardWidth = cards[0].getBoundingClientRect().width;
  const cardMargin = parseInt(getComputedStyle(cards[0]).marginLeft); // margem horizontal entre os cards
  let currentIndex = 0;
  
  // Clonar os primeiros e últimos elementos para criar um loop infinito

  function setMoveAmount() {

    let moveAmount;

    if (window.innerWidth > 1200) {
        moveAmount = cardWidth + cardMargin + 20;
    } 
    else if (window.innerWidth < 499) {
        moveAmount = cardWidth + cardMargin  ;
    }
    else if (window.innerWidth < 600) {
        moveAmount = cardWidth + cardMargin - 9;
    }
    else if (window.innerWidth < 690) {
        moveAmount = cardWidth + cardMargin -21;
    }
    else if (window.innerWidth < 999) {
        moveAmount = cardWidth + cardMargin - 15;
    }
    else if (window.innerWidth < 1199) {
      moveAmount = cardWidth + cardMargin - 50;
    }

    return moveAmount;
}

  let moveAmount = setMoveAmount();

  console.log(moveAmount)

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

  leftButton.addEventListener('click', moveLeft);
  rightButton.addEventListener('click', moveRight);

  // Inicializar a posição do carrossel
  setInitialPosition();
});
