import NewForm from './addForm';
import Card from './Card';
import dragAndDrop from './DnD';

const addNewForm = new NewForm();
const addCard = document.querySelectorAll('.add-card-container');
const allLists = document.querySelectorAll('.card-list');

const allCardsArr = [];

export default function makeNewCard(title, list) {
  const newCard = new Card(title);
  allCardsArr.push(newCard);
  allCardsArr.forEach((item, index) => {
    // eslint-disable-next-line no-param-reassign
    item.id = index;
  });
  newCard.createNewCard(newCard, list);
}

[...addCard].forEach((item) => {
  item.addEventListener('click', () => {
    const parent = item.closest('.container');
    const list = parent.querySelector('.card-list');

    item.classList.remove('card');
    item.classList.add('hidden');
    const form = addNewForm.createForm();
    parent.appendChild(form);
    addNewForm.closeForm(form, item, parent);

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      makeNewCard(addNewForm.addCardTitle(form), list);

      addNewForm.afterSubmit(form, item, parent);

      const allCards = document.querySelectorAll('.card');

      dragAndDrop(allCards, allLists);
    });
  });
});
