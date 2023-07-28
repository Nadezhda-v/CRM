import {
  overlay,
  panelAddGoods,
  overlayModal,
  form,
  modalTotalPrice,
  countInput,
  priceInput,
  modalCheckbox,
  modalInputDiscount,
} from './getElements.js';

import {addItemPage} from './table.js';

import {goods} from '../index.js';

let itemId;

// Генерирование случайного id

const generateId = () => Date.now().toString();

// Заполнение id на форме

const updateIdOnForm = (itemId) => {
  const idOnForm = overlayModal.querySelector('.vendor-code__id');
  idOnForm.textContent = itemId;
};

// Открытие модального окна

const openModal = () => {
  overlay.classList.add('active');
};

// Закрытие модального окна

const closeModal = () => {
  overlay.classList.remove('active');
};

const modalControl = () => {
  panelAddGoods.addEventListener('click', () => {
    openModal();
    itemId = generateId();
    updateIdOnForm(itemId);
  });

  overlay.addEventListener('click', e => {
    const target = e.target;

    if (!overlayModal.contains(target) || target.closest('.modal__close')) {
      closeModal();
    }
  });
};

// Получение стоимости одного наименования товара

const calcItemPrice = () => {
  modalTotalPrice.value = '$' + countInput.value * priceInput.value;
};

/* Разблокировка и блокировка поля ввода скидки
в зависимости от состояния чекбокса 'discount'*/

const toggleDiscountInput = (disabled) => {
  modalInputDiscount.value = '';
  modalInputDiscount.disabled = disabled;
};

const formControl = () => {
  modalCheckbox.addEventListener('change', () => {
    toggleDiscountInput(!modalCheckbox.checked);
  });

  countInput.addEventListener('input', () => {
    calcItemPrice();
  });

  priceInput.addEventListener('input', () => {
    calcItemPrice();
  });

  // Заполнение и отправка формы

  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newItem = Object.fromEntries(formData);
    addItemPage(newItem, itemId);
    goods.push(newItem);

    form.reset();
    closeModal();
    toggleDiscountInput(true);
    console.log(goods);
  });
};

export {
  modalControl,
  formControl,
};
