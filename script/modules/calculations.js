import {
  table,
  cmsTotalPrice,
  countInput,
  priceInput,
  modalTotalPrice,
  modalInputDiscount,
} from './getElements.js';

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

// Получение стоимости одного наименования товара

const calcTotalPriceInput = (discount) => {
  const totalPrice = countInput.value * priceInput.value;
  const finalPrice = discount ? totalPrice * (1 - discount / 100) : totalPrice;

  modalTotalPrice.value = '$ ' + finalPrice.toFixed(2);
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
};
