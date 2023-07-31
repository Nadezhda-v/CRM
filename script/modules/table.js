import {
  table,
  rowsTable,
  cmsTotalPrice,
} from './getElements.js';

import {goods} from '../index.js';

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

// Обновление нумерации товаров при удалении

const updateNumberItem = () => {
  const rows = table.querySelectorAll('tr');
  rows.forEach((row, index) => {
    const cellOrder = row.querySelector('.table__cell');
    cellOrder.textContent = index + 1;
  });
};

// Получение общей стоимости всех товаров в таблице

const calcTotalPriceAllGoods = () => {
  let totalPrice = 0;
  const allRows = table.querySelectorAll('tr');

  allRows.forEach(row => {
    const itemTotalPrice = +row.querySelector('.table__cell_total-price')
        .textContent
        .slice(1);
    totalPrice += itemTotalPrice;
  });

  cmsTotalPrice.textContent = '$ ' + totalPrice.toFixed(2);
};

/* Пересчет общей стоимости товаров в таблице
после удаления или добавления товара*/

const updateTotalPriceAllGoods = (itemTotalPrice) => {
  let currentTotalPrice = +cmsTotalPrice.textContent.slice(1);
  currentTotalPrice += itemTotalPrice;
  cmsTotalPrice.textContent = '$ ' + currentTotalPrice.toFixed(2);
};

// Добавление товара на страницу

const addItemPage = (newItem, itemId, totalPrice) => {
  const rowsTable = table.querySelectorAll('tr');
  newItem.id = itemId;
  const rowItem = createRow(newItem, rowsTable.length + 1, totalPrice);
  table.append(rowItem);

  updateTotalPriceAllGoods(totalPrice);
};

// Удаление товара из таблицы

const deleteItem = () => {
  table.addEventListener('click', e => {
    const target = e.target;

    if (target.closest('.table__btn_del')) {
      const rowItem = target.closest('tr');
      const dataId = rowItem.querySelector('.table__cell_name').dataset.id;
      const index = goods.findIndex(item => item.id === +dataId);

      goods.splice(index, 1);

      const itemTotalPrice = +rowItem.querySelector('.table__cell_total-price')
          .textContent
          .slice(1);

      updateTotalPriceAllGoods(-itemTotalPrice);

      rowItem.remove();

      updateNumberItem();
      console.log(goods);
    }
  });
};

const renderGoods = (arr) => {
  let order = rowsTable.length + 1; // Порядковый номер в таблице
  arr.forEach(element => {
    const totalPrice = element.count * element.price;
    const rowItem = createRow(element, order, totalPrice);
    order++;
    table.append(rowItem);
  });
};

export {
  renderGoods,
  addItemPage,
  calcTotalPriceAllGoods,
  deleteItem,
};
