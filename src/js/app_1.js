// const mainEl = document.querySelector('.main-container');
const cards = document.querySelectorAll('.card');
const arrCards = Array.from(cards);

cards.forEach((elem) => {
  elem.addEventListener('mousedown', (event) => { // (1) отследить нажатие
    // (2) подготовить к перемещению:
    // разместить поверх остального содержимого и в абсолютных координатах
    const shiftX = event.clientX - elem.getBoundingClientRect().left;
    const shiftY = event.clientY - elem.getBoundingClientRect().top;
    elem.style.position = 'absolute';
    elem.style.zIndex = 1000;
    elem.style.cursor = 'grabbing';
    // elem.classList.add('dragged');
    // переместим в body, чтобы карта была точно не внутри position:relative
    document.body.append(elem);
    // mainEl.append(elem);

    // переносит карту на координаты (pageX, pageY),
    // дополнительно учитывая изначальный сдвиг относительно указателя мыши
    function moveAt(pageX, pageY) {
      elem.style.left = `${pageX - shiftX}px`;
      elem.style.top = `${pageY - shiftY}px`;
    }
    // и установим абсолютно спозиционированную карту под курсор
    moveAt(event.pageX, event.pageY);

    // потенциальная цель переноса, над которой мы пролетаем прямо сейчас
    let currentDroppable = null;
    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
      elem.hidden = true;
      const elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      elem.hidden = false;
      // событие mousemove может произойти и когда указатель за пределами окна
      // (карту перетащили за пределы экрана)
      // если clientX/clientY за пределами окна, elementFromPoint вернёт null
      if (!elemBelow) return;

      // потенциальные цели переноса помечены классом droppable (может быть и другая логика)
      const droppableBelow = elemBelow.closest('.droppable');
      if (currentDroppable !== droppableBelow) {
        // if (currentDroppable === droppableBelow) {
        // console.log('Hello!!!');
        // мы либо залетаем на цель, либо улетаем из неё
        // внимание: оба значения могут быть null
        // currentDroppable=null,
        // если мы были не над droppable до этого события (например, над пустым прост
        // droppableBelow=null,
        // если мы не над droppable именно сейчас, во время этого события
        if (currentDroppable) {
          // логика обработки процесса "вылета" из droppable (удаляем подсветку)
          console.log('Bay, bay!!!');
          // leaveDroppable(currentDroppable);
        }
        currentDroppable = droppableBelow;
        if (currentDroppable) {
          // логика обработки процесса, когда мы "влетаем" в элемент droppable
          // console.log('Hello!!!');
          // enterDroppable(currentDroppable);
        }
      }
    }

    document.addEventListener('mousemove', onMouseMove);
    // mainEl.addEventListener('mousemove', onMouseMove);

    elem.addEventListener('mouseup', (evt) => {
      const elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      // if (elemBelow.contains('droppable')) {
      // elem.classList.remove('dragged');
      elem.style.cursor = 'default';
      console.log(elem);
      console.log(elemBelow);
      // }
      // const droppableBelow = elemBelow.closest('.droppable');

      console.log(evt.currentTarget);
      // console.log(droppableBelow);
      // const closest = document.elementFromPoint(evt.clientX, evt.clientY);
      // droppableBelow.append(elem);
      // document.body.remove(elem);
      document.removeEventListener('mousemove', onMouseMove);
      elem.onmouseup = null;
    });
  });
});

arrCards.forEach((element) => {
  element.addEventListener('dragstart', () => {
    // return false;
  });
});
