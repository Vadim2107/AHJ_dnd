const cards = document.querySelectorAll('.card');
const arrCards = Array.from(cards);
const newCards = document.querySelectorAll('.new_card');
const arrNewCards = Array.from(newCards);

for (let i = 0; i < arrNewCards.length; i += 1) {
  arrNewCards[i].onclick = () => {
    arrNewCards[i].insertAdjacentHTML('beforeBegin', '<form class="form"><textarea class="card_input" type="text" placeholder="Enter a title for this card..."></textarea><button data-id="card" class="btn">Add Card</button></form>');
    const btn = document.querySelector('.btn');
    const form = document.querySelector('.form');
    const input = document.querySelector('.card_input');
    arrNewCards[i].style.display = 'none';
    btn.onclick = (e) => {
      e.preventDefault();
      form.insertAdjacentHTML('beforeBegin', `<div class="card"><div class="card_title">${input.value}</div></div>`);
      form.remove();
      arrNewCards[i].style.display = 'block';
      // const cards = document.querySelectorAll('.card');
      // const arrCards = Array.from(cards);
      for (let q = 0; q < arrCards.length; q += 1) {
        arrCards[q].addEventListener('mouseenter', () => {
          arrCards[q].insertAdjacentHTML('afterBegin', '<div class="card_del">&#10008</div>');
          const cardDel = document.querySelector('.card_del');
          cardDel.onclick = () => arrCards[q].remove();
        });
      }

      for (let j = 0; j < arrCards.length; j += 1) {
        arrCards[j].addEventListener('mouseleave', () => {
          const cardDel = document.querySelector('.card_del');
          cardDel.remove();
        });
      }
    };
  };
}

// for (let i = 0; i < arrCards.length; i += 1) {
//     arrCards[i].addEventListener('mouseenter', () => {
//     // arrCards[i].addEventListener ('mouseover', () => {
//         arrCards[i].insertAdjacentHTML('afterBegin', '<div class="card_del">&#10008</div>');
//         const cardDel = document.querySelector('.card_del');
//         console.log('OVER!!!');
//         // cardDel.classList.add('active');
//         // cardDel.classList.remove('hidden');
//         cardDel.onclick = function() {
//             arrCards[i].remove();
//         }
//     });
// };

// for (let j = 0; j < arrCards.length; j += 1) {
//     arrCards[j].addEventListener('mouseleave', () => {
//     // arrCards[j].addEventListener ('mouseout', () => {
//         console.log('OUT!!!');
//         const cardDel = document.querySelector('.card_del');
//         // cardDel.classList.add('hidden');
//         // cardDel.classList.remove('active');
//         // cardDel.style.display = 'none';
//         cardDel.remove();
//     });
// };
