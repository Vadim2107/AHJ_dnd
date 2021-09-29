export default function dragAndDrop(cards, lists) {
  function getNextElement(cursorPosition, currentElement) {
    // Получаем объект с размерами и координатами
    const currentElCoordinates = currentElement.getBoundingClientRect();

    // Находим вертикальную координату центра текущего элемента
    const currentElementCenter = currentElCoordinates.y + (currentElCoordinates.height / 2);

    // Если курсор выше центра элемента, возвращаем текущий элемент
    // В ином случае — следующий DOM-элемент
    const nextEl = (cursorPosition < currentElementCenter)
      ? currentElement
      : currentElement.nextElementSibling;

    return nextEl;
  }

  [...cards].forEach((card) => {
    // взял карточку
    card.addEventListener('dragstart', (evt) => {
      evt.target.classList.add('selected');
    });

    // отпустил карточку
    card.addEventListener('dragend', (evt) => {
      evt.target.classList.remove('selected');
    });

    // двигаешь карточку
    [...lists].forEach((list) => {
      list.addEventListener('dragover', (evt) => {
        // Разрешаем сбрасывать элементы в эту область
        evt.preventDefault();

        // Находим перемещаемый элемент
        const activeElement = document.querySelector('.selected');

        // Находим элемент, над которым в данный момент находится курсор
        const currentElement = evt.target;

        // Проверяем, что событие сработало:
        // 1. не на том элементе, который мы перемещаем,
        // 2. именно на элементе списка
        const isMoveAble = activeElement !== currentElement
                        && currentElement.classList.contains('card');

        // Если нет, прерываем выполнение функции
        if (!isMoveAble) {
          return;
        }

        // evt.clientY — вертикальная координата курсора в момент,
        // когда сработало событие
        const nextElement = getNextElement(evt.clientY, currentElement);

        // Проверяем, нужно ли менять элементы местами
        if (nextElement
            && (activeElement === nextElement.previousElementSibling
            || activeElement === nextElement)) {
          // Если нет, выходим из функции, чтобы избежать лишних изменений в DOM
          return;
        }

        list.insertBefore(activeElement, nextElement);
      });
    });
  });
}
