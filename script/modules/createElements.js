export const createRow = (item, order, totalPrice) => {
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
  cellCategory.className = 'table__cell table__cell_left';
  cellCategory.textContent = item.category;

  const cellUnits = document.createElement('td');
  cellUnits.className = 'table__cell';
  cellUnits.textContent = item.units;

  const cellCount = document.createElement('td');
  cellCount.className = 'table__cell';
  cellCount.textContent = item.count;

  const cellPrice = document.createElement('td');
  cellPrice.className = 'table__cell';
  cellPrice.textContent = '$' + item.price;

  const cellSum = document.createElement('td');
  cellSum.className = 'table__cell table__cell_total-price';
  cellSum.textContent = '$' + totalPrice;

  const cellButtons = document.createElement('td');
  cellButtons.className = 'table__cell table__cell_btn-wrapper';

  const buttonPic = document.createElement('button');
  buttonPic.className = 'table__btn table__btn_pic';
  buttonPic.dataset.pic = 'img/image.jpg';

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
