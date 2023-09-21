const createRow = (item, order, totalPrice) => {
  const rowItem = document.createElement('tr');
  const cellOrder = document.createElement('td');
  cellOrder.className = 'table__cell';
  cellOrder.textContent = order;

  const cellName = document.createElement('td');
  cellName.className = 'table__cell table__cell_left table__cell_name';
  cellName.dataset.id = item.id;
  cellName.textContent = item.title;

  const span = document.createElement('span');
  span.className = 'table__cell-id';
  span.textContent = `id: ${cellName.dataset.id}`;

  const cellCategory = document.createElement('td');
  cellCategory.className = 'table__cell table__cell_left table__cell_category';
  cellCategory.textContent = item.category;

  const cellUnits = document.createElement('td');
  cellUnits.className = 'table__cell table__cell_units';
  cellUnits.textContent = item.units;

  const cellCount = document.createElement('td');
  cellCount.className = 'table__cell table__cell_count';
  cellCount.textContent = item.count;

  const cellPrice = document.createElement('td');
  cellPrice.className = 'table__cell table__cell_price';
  cellPrice.textContent = '$' + item.price;

  const cellSum = document.createElement('td');
  cellSum.className = 'table__cell table__cell_total-price';
  cellSum.textContent = '$' + totalPrice;

  const cellButtons = document.createElement('td');
  cellButtons.className = 'table__cell table__cell_btn-wrapper';

  const buttonPic = document.createElement('button');
  buttonPic.className = 'table__btn table__btn_pic';
  buttonPic.dataset.pic = item.image;

  const buttonEdit = document.createElement('button');
  buttonEdit.className = 'table__btn table__btn_edit';

  const buttonDel = document.createElement('button');
  buttonDel.className = 'table__btn table__btn_del';

  rowItem.append(cellOrder, cellName, cellButtons);
  cellName.prepend(span);
  const cells = [cellCategory, cellUnits, cellCount, cellPrice, cellSum];
  cellName.after(...cells);
  cellButtons.append(buttonPic, buttonEdit, buttonDel);

  return rowItem;
};

const createImage = () => {
  const imageContainer = document.createElement('div');
  imageContainer.classList.add('image-container');

  const img = document.createElement('img');
  img.classList.add('modal__label_file-add');
  img.alt = 'Изображение товара';

  imageContainer.append(img);
  return {imageContainer, img};
};

const createBlockWithError = (text, className) => {
  const blockWithError = document.createElement('span');
  blockWithError.className = className;
  blockWithError.textContent = text;

  return blockWithError;
};

const createModal = (text, type) => {
  const overlay = document.createElement('div');
  overlay.classList.add('overlay__modal-action');
  overlay.classList.add(type === 'warn' ?
    'overlay__modal-action_error' : 'overlay__modal-action_confirm');

  const modal = document.createElement('div');
  modal.classList.add('modal', 'modal__action');

  const buttonClose = document.createElement('button');
  buttonClose.type = 'button';
  buttonClose.classList.add(
      'modal__close',
      'modal__close-error',
  );

  const svgCloseBtn = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgCloseBtn.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svgCloseBtn.setAttribute('viewBox', '0 0 24 24');
  svgCloseBtn.setAttribute('width', '24');
  svgCloseBtn.setAttribute('height', '24');
  svgCloseBtn.setAttribute('fill', 'none');

  const pathCloseBtn1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  pathCloseBtn1.setAttribute('d', 'M2 2L22 22');
  pathCloseBtn1.setAttribute('stroke', '#6E6893');
  pathCloseBtn1.setAttribute('stroke-width', '3');
  pathCloseBtn1.setAttribute('stroke-linecap', 'round');

  const pathCloseBtn2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  pathCloseBtn2.setAttribute('d', 'M2 22L22 2');
  pathCloseBtn2.setAttribute('stroke', '#6E6893');
  pathCloseBtn2.setAttribute('stroke-width', '3');
  pathCloseBtn2.setAttribute('stroke-linecap', 'round');

  svgCloseBtn.append(pathCloseBtn1, pathCloseBtn2);
  buttonClose.append(svgCloseBtn);

  const content = document.createElement('div');
  content.classList.add('modal__content');

  if (type === 'warn') {
    const svgError = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgError.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svgError.setAttribute('width', '94');
    svgError.setAttribute('height', '94');
    svgError.setAttribute('viewBox', '0 0 94 94');
    svgError.setAttribute('fill', 'none');

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M2 2L92 92');
    path1.setAttribute('stroke', '#D80101');
    path1.setAttribute('stroke-width', '3');
    path1.setAttribute('stroke-linecap', 'round');

    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'M2 92L92 2');
    path2.setAttribute('stroke', '#D80101');
    path2.setAttribute('stroke-width', '3');
    path2.setAttribute('stroke-linecap', 'round');

    svgError.append(path1, path2);

    content.append(svgError);
  }

  const title = document.createElement('h2');
  title.classList.add('modal__title');
  title.classList.add(type === 'warn' ?
    'modal__title_error' : 'modal__title_action');
  title.textContent = text;

  content.append(title);

  if (type === 'confirm') {
    const buttonWrap = document.createElement('div');
    buttonWrap.classList.add('button__wrap');

    const cancelButton = document.createElement('button');
    cancelButton.type = 'button';
    cancelButton.classList.add('button',
        'button__confirm', 'button__confirm_cancel');
    cancelButton.textContent = 'Отмена';

    const confirmButton = document.createElement('button');
    confirmButton.type = 'button';
    confirmButton.classList.add('button',
        'button__confirm', 'button__confirm_del');
    confirmButton.textContent = 'Удалить';

    buttonWrap.append(cancelButton, confirmButton);
    content.append(buttonWrap);

    cancelButton.addEventListener('click', () => {
      overlay.classList.remove('active');

      const modalsAction = document.querySelectorAll('.overlay__modal-action');
      modalsAction.forEach(modal => modal.remove());
    });
  }

  modal.append(buttonClose, content);
  overlay.append(modal);

  document.body.append(overlay);

  buttonClose.addEventListener('click', () => {
    overlay.classList.remove('active');
    overlay.remove();
  });

  return overlay;
};

export {
  createRow,
  createImage,
  createBlockWithError,
  createModal,
};
