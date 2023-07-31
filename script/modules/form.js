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
    modalTotalPrice.value = '$ ' + 0;
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

/* Разблокировка и блокировка поля ввода скидки
в зависимости от состояния чекбокса 'discount'*/

const toggleDiscountInput = (disabled) => {
  modalInputDiscount.value = '';
  modalInputDiscount.disabled = disabled;
};

const formControl = () => {
  let totalPrice;

  modalCheckbox.addEventListener('change', () => {
    toggleDiscountInput(!modalCheckbox.checked);
  });

  countInput.addEventListener('input', () => {
    totalPrice = updateTotalPrice();
  });

  priceInput.addEventListener('input', () => {
    totalPrice = updateTotalPrice();
  });

  modalInputDiscount.addEventListener('input', () => {
    totalPrice = updateTotalPrice();
  });

  // Заполнение и отправка формы

  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newItem = Object.fromEntries(formData);

    addItemPage(newItem, itemId, totalPrice);
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
