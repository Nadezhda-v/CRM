const overlay = document.querySelector('.overlay');
const overlayModal = document.querySelector('.overlay__modal');

const form = document.querySelector('.modal__form');
const modalTotalPrice = form.querySelector('.modal__total-price');
const modalCheckbox = document.querySelector('#discount');
const modalInputDiscount = document.querySelector('.modal__input_discount');
const priceInput = document.querySelector('#price');
const countInput = document.querySelector('#count');

const cmsTotalPrice = document.querySelector('.cms__total-price');
const panelAddGoods = document.querySelector('.panel__add-goods');

const table = document.querySelector('.table__body');
const rowsTable = table.querySelectorAll('tr');

const modalFile = form.querySelector('.modal__file');
const modalLabelFile = form.querySelector('.modal__label_file');

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
  modalFile,
  modalLabelFile,
};
