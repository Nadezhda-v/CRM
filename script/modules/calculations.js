import {
  table,
  cmsTotalPrice,
  countInput,
  priceInput,
  modalTotalPrice,
  modalInputDiscount,
} from './getElements.js';

import {formattedPrice} from './interactions.js';

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

  const formattedTotalPrice = formattedPrice(totalPrice);
  cmsTotalPrice.textContent = '$ ' + formattedTotalPrice;
};

/* Пересчет общей стоимости товаров в таблице
после удаления или добавления товара*/

const updateTotalPriceAllGoods = (itemTotalPrice) => {
  let currentTotalPrice = +cmsTotalPrice.textContent
      .slice(1)
      .replace(/\s/g, '')
      .replace(',', '.');

  currentTotalPrice += itemTotalPrice;

  const formattedCurrentTotalPrice = formattedPrice(currentTotalPrice);
  cmsTotalPrice.textContent = '$ ' + formattedCurrentTotalPrice;
};

// Отображение стоимости одного наименования товара в форме

const calcTotalPriceInput = (discount) => {
  const totalPrice = countInput.value * priceInput.value;
  let finalPrice = discount ? totalPrice * (1 - discount / 100) : totalPrice;
  finalPrice = Math.ceil(finalPrice);

  modalTotalPrice.value = '$ ' + finalPrice.toFixed(2);
  return finalPrice;
};

// Получение стоимости одного наименования товара при рендере

const getTotalPrice = (element) => {
  const totalPrice = element.count * element.price;
  let finalPrice = element.discount > 0 ?
    totalPrice * (1 - element.discount / 100) : totalPrice;
  finalPrice = Math.ceil(finalPrice);

  modalTotalPrice.value = '$ ' + finalPrice;
  return finalPrice;
};

// Пересчет общей стоимости товара на основе текущих значений полей ввода

const updateTotalPrice = () => {
  const totalPrice = calcTotalPriceInput(+modalInputDiscount.value);
  return totalPrice;
};

export {
  updateTotalPrice,
  calcTotalPriceAllGoods,
  updateTotalPriceAllGoods,
  getTotalPrice,
};
