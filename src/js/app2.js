const card = document.querySelector('.card');
// const mainEl = document.querySelector('.main-container');
// const draggedEl = null;
// const ghostEl = null;

card.onmousedown = (event) => { // (1) отследить нажатие
  // (2) подготовить к перемещению:
  // разместить поверх остального содержимого и в абсолютных координатах
  const shiftX = event.clientX - card.getBoundingClientRect().left;
  const shiftY = event.clientY - card.getBoundingClientRect().top;
  // card.style.position = 'absolute';
  // card.style.zIndex = 1000;
  card.classList.add('dragged');
  // переместим в body, чтобы карта была точно не внутри position:relative
  document.body.append(card);

  function moveAt(pageX, pageY) {
    card.style.left = `${pageX - shiftX}px`;
    card.style.top = `${pageY - shiftY}px`;
  }
  // и установим абсолютно спозиционированную карту под курсор
  // переносит карту на координаты (pageX, pageY),
  // дополнительно учитывая изначальный сдвиг относительно указателя мыши
  moveAt(event.pageX, event.pageY);

  // function onMouseMove(event) {
  //     moveAt(event.pageX, event.pageY);
  // }

  // потенциальная цель переноса, над которой мы пролетаем прямо сейчас
  let currentDroppable = null;
  function onMouseMove() {
    moveAt(event.pageX, event.pageY);
    card.hidden = true;
    const elemBelow = document.elementFromPoint(event.clientX, event.clientY);
    card.hidden = false;
    // событие mousemove может произойти и когда указатель за пределами окна
    // (карту перетащили за пределы экрана)
    // если clientX/clientY за пределами окна, elementFromPoint вернёт null
    if (!elemBelow) return;

    // потенциальные цели переноса помечены классом droppable (может быть и другая логика)
    const droppableBelow = elemBelow.closest('.droppable');
    if (currentDroppable !== droppableBelow) {
    // мы либо залетаем на цель, либо улетаем из неё
    // внимание: оба значения могут быть null
    // currentDroppable=null,
    // если мы были не над droppable до этого события (например, над пустым прост
    // droppableBelow=null,
    // если мы не над droppable именно сейчас, во время этого события
      if (currentDroppable) {
        // логика обработки процесса "вылета" из droppable (удаляем подсветку)
        // console.log('Bay, bay!!!');
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
  card.onmouseup = () => {
    card.classList.remove('dragged');
    document.removeEventListener('mousemove', onMouseMove);
    card.onmouseup = null;
  };
};

card.ondragstart = function fun() {
  return false;
};

// mainEl.addEventListener('mousedown', (evt) => {
//   // evt.preventDefault();
//   if (!evt.target.classList.contains('card')) {
//     return;
//   }

//   draggedEl = evt.target;
//   ghostEl = evt.target.cloneNode(true);
//   ghostEl.classList.add('dragged');
//   document.body.append(ghostEl);
//   ghostEl.style.left = `${evt.pageX - ghostEl.offsetWidth / 2}px`;
//   ghostEl.style.top = `${evt.pageY - ghostEl.offsetHeight / 2}px`;
//   // card.classList.add('dragged');
//   // document.body.append(card);
//   // card.style.left = `${evt.pageX - card.offsetWidth / 2}px`;
//   // card.style.top = `${evt.pageY - card.offsetHeight / 2}px`;
// });

// mainEl.addEventListener('mousemove', (evt) => {
//   evt.preventDefault(); // не даём выделять элементы
//   if (!draggedEl) {
//     return;
//   }
//   ghostEl.style.left = `${evt.pageX - ghostEl.offsetWidth / 2}px`;
//   ghostEl.style.top = `${evt.pageY - ghostEl.offsetHeight / 2}px`;
// });

// mainEl.addEventListener('mouseleave', () => {
//   // при уходе курсора за границы контейнера - отменяем перенос
//   if (!draggedEl) {
//     return;
//   }
//   document.body.removeChild(ghostEl);
//   ghostEl = null;
//   draggedEl = null;
// });

// mainEl.addEventListener('mouseup', (evt) => {
//   if (!draggedEl) {
//     return;
//   }
//   const closest = document.elementFromPoint(evt.clientX, evt.clientY);
//   evt.currentTarget.insertBefore(draggedEl, closest);
//   document.body.removeChild(ghostEl);
//   ghostEl = null;
//   draggedEl = null;
// });
