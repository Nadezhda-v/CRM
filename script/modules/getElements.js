const overlay = document.querySelector('.overlay');
const table = document.querySelector('.table__body');
const rowsTable = table.querySelectorAll('tr');
const panelAddGoods = document.querySelector('.panel__add-goods');
const overlayModal = document.querySelector('.overlay__modal');
const form = document.querySelector('.modal__form');
const modalTotalPrice = form.querySelector('.modal__total-price');
const countInput = document.querySelector('#count');
const priceInput = document.querySelector('#price');
const cmsTotalPrice = document.querySelector('.cms__total-price');
const modalCheckbox = document.querySelector('#discount');
const modalInputDiscount = document.querySelector('.modal__input_discount');

export {
  overlay,
  table,
  rowsTable,
  panelAddGoods,
  overlayModal,
  form,
  modalTotalPrice,
  countInput,
  priceInput,
  cmsTotalPrice,
  modalCheckbox,
  modalInputDiscount,
};
