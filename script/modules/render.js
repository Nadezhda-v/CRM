import {
  createRow,
} from './createElements.js';

import {
  table,
  rowsTable,
} from './getElements.js';

const renderGoods = (arr) => {
  let order = rowsTable.length + 1; // Порядковый номер в таблице
  arr.forEach(element => {
    const totalPrice = element.count * element.price;
    const rowItem = createRow(element, order, totalPrice);
    order++;
    table.append(rowItem);
  });
};


export {renderGoods};
