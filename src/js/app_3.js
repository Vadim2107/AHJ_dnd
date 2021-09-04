const cards = document.querySelectorAll('.card');
const arrCards = Array.from(cards);
const newCards = document.querySelectorAll('.new_card');
const arrNewCards = Array.from(newCards);

arrNewCards.forEach((elem) => {
  elem.addEventListener('click', () => {
    elem.insertAdjacentHTML('beforeBegin', '<form class="form"><textarea class="card_input" type="text" placeholder="Enter a title for this card..."></textarea><button data-id="card" class="btn">Add Card</button></form>');
    const btn = document.querySelector('.btn');
    const form = document.querySelector('.form');
    const input = document.querySelector('.card_input');
    elem.style.display = 'none';
    btn.onclick = (e) => {
      e.preventDefault();
      form.insertAdjacentHTML('beforeBegin', `<div class="card"><div class="card_title">${input.value}</div></div>`);
      form.remove();
      elem.style.display = 'block';
      // const cards = document.querySelectorAll('.card');
      // const arrCards = Array.from(cards);

      arrCards.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          el.insertAdjacentHTML('afterBegin', '<div class="card_del">&#10008</div>');
          const cardDel = document.querySelector('.card_del');
          cardDel.onclick = () => {
            el.remove();
          };
        });
      });

      arrCards.forEach((el) => {
        el.addEventListener('mouseleave', () => {
          const cardDel = document.querySelector('.card_del');
          cardDel.remove();
        });
      });
    };
  });
});

// arrCards.forEach((el) => {
//     el.addEventListener('mouseleave', () => {
//         const cardDel = document.querySelector('.card_del');
//         cardDel.remove();
//     });
// });
