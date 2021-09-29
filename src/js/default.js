import makeNewCard from './app';
import dragAndDrop from './DnD';

document.addEventListener('DOMContentLoaded', () => {
  const todo = document.querySelector('.todo-list');
  const inprogress = document.querySelector('.inprogress-list');
  const done = document.querySelector('.done-list');

  makeNewCard('Welcome to Trello!', todo);
  makeNewCard('This is a card.', todo);

  makeNewCard('Click on a card to see what\'s behind it.', inprogress);
  makeNewCard('Finished with a card? Delete it.', inprogress);

  makeNewCard('To learn more tricks, check out the guide.', done);
  makeNewCard('Want to use keyboard shortcuts? We have them!', done);

  const allCards = document.querySelectorAll('.card');
  const allLists = document.querySelectorAll('.card-list');

  dragAndDrop(allCards, allLists);
});
