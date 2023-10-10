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

const modalLabelCategory = form.querySelector('.modal__label_category');
const idOnForm = overlayModal.querySelector('.vendor-code__id');
const modalTitle = document.querySelector('.modal__title');
const modalSubmit = form.querySelector('.modal__submit');

const subPanelPages = document.querySelector('.sub-panel__pages');
const choicePage = document.querySelector('#choicePage');
const buttonFilter = document.querySelector('.panel__filter');
const panelList = document.querySelector('.panel__list');
const searchInput = document.querySelector('.panel__input');

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
  modalLabelCategory,
  idOnForm,
  modalTitle,
  modalSubmit,
  subPanelPages,
  choicePage,
  buttonFilter,
  panelList,
  searchInput,
};
