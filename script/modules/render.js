import {fetchRequest} from './fetchRequest.js';

import {
  createRow,
} from './createElements.js';

import {
  table,
  rowsTable,
  modalLabelCategory,
  buttonFilter,
} from './getElements.js';

import {
  calcTotalPriceAllGoods,
  getTotalPrice,
} from './calculations.js';

import {
  updatePagination,
} from './interactions.js';

const renderCategory = (err, categories) => {
  if (err) {
    console.warn(err);
    return;
  }

  const datalist = document.createElement('datalist');
  datalist.id = 'category-list';

  const listCategory = document.createElement('ul');
  listCategory.classList.add('panel__list');

  const li = document.createElement('li');
  li.classList.add('panel__category');
  li.textContent = 'Показать все';
  listCategory.append(li);

  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    datalist.append(option);

    const li = document.createElement('li');
    li.textContent = category;
    li.classList.add('panel__category');
    listCategory.append(li);
  });

  modalLabelCategory.after(datalist);
  buttonFilter.after(listCategory);
};

const loadCategory = async () => {
  await fetchRequest('api/category', {
    callback: renderCategory,
  });
};

const renderGoods = (err, goods) => {
  if (err) {
    console.warn(err);
    return;
  }

  let order = rowsTable.length + 1; // Порядковый номер в таблице

  goods.forEach(element => {
    const totalPrice = getTotalPrice(element);
    const rowItem = createRow(element, order, totalPrice);
    order++;
    table.append(rowItem);
  });

  calcTotalPriceAllGoods();
  loadCategory();
};

const loadGoods = async () => {
  await fetchRequest('api/goods', {
    callback: renderGoods,
  });

  updatePagination();
};

export {
  loadGoods,
  renderGoods,
};
