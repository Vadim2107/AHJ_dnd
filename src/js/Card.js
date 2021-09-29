export default class Card {
  constructor(name) {
    this.name = name;
    this.draggable = true;
  }

  // eslint-disable-next-line class-methods-use-this
  addCardCloseBlock() {
    const closeBtn = document.createElement('div');
    closeBtn.classList.add('card-close-block');
    closeBtn.innerHTML = '<div class="card-close">&#10008</div>';

    return closeBtn;
  }

  createNewCard(card, cardsList) {
    const el = document.createElement('li');
    el.classList.add('card');
    el.draggable = true;
    el.innerHTML = `<p>${card.name}</p>`;

    cardsList.append(el);

    const close = this.addCardCloseBlock();

    el.addEventListener('mouseover', () => {
      el.insertAdjacentElement('afterbegin', close);

      close.addEventListener('click', () => {
        el.remove();
      });
    });

    el.addEventListener('mouseleave', () => {
      close.remove();
    });
  }
}
