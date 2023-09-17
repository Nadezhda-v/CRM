import {goods} from '../index.js';

import {
  table,
  overlayModal,
  overlay,
  panelAddGoods,
  modalTotalPrice,
  modalInputDiscount,
  modalCheckbox,
  form,
  modalFile,
  modalLabelFile,
} from './getElements.js';

import {
  createRow,
  createImage,
  createBlockWithError,
} from './createElements.js';

import {
  updateTotalPriceAllGoods,
  updateTotalPrice,
} from './calculations.js';

// Добавление товара на страницу

const addItemPage = (newItem, itemId, totalPrice) => {
  const rowsTable = table.querySelectorAll('tr');
  newItem.id = itemId;
  const rowItem = createRow(newItem, rowsTable.length + 1, totalPrice);
  table.append(rowItem);

  updateTotalPriceAllGoods(totalPrice);
};

// Обновление нумерации товаров при удалении

const updateNumberItem = () => {
  const rows = table.querySelectorAll('tr');
  rows.forEach((row, index) => {
    const cellOrder = row.querySelector('.table__cell');
    cellOrder.textContent = index + 1;
  });
};

// Открытие нового окна браузера

const openWindow = (url, width, height) => {
  const screenWidth = screen.width;
  const screenHeight = screen.height;

  const left = (screenWidth - width) / 2;
  const top = (screenHeight - height) / 2;

  const win = open(
      url,
      '',
      `width=${width}, height=${height}, left=${left}, top=${top}`,
  );

  return win;
};

const openImage = (imgUrl) => {
  const win = openWindow('about:blank', 800, 600);

  const image = document.createElement('img');
  image.src = imgUrl;
  image.alt = 'Изображение товара';

  win.document.body.append(image);
};

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

/* Разблокировка и блокировка поля ввода скидки
в зависимости от состояния чекбокса 'discount'*/

const toggleDiscountInput = (disabled) => {
  modalInputDiscount.value = '';
  modalInputDiscount.disabled = disabled;
};

const control = () => {
  // Удаление товаров из таблицы
  table.addEventListener('click', e => {
    const target = e.target;

    if (target.closest('.table__btn_del')) {
      const rowItem = target.closest('tr');
      const dataId = rowItem.querySelector('.table__cell_name').dataset.id;
      const index = goods.findIndex(item => item.id === +dataId);

      goods.splice(index, 1);

      const itemTotalPrice = +rowItem.querySelector(
          '.table__cell_total-price')
          .textContent
          .slice(1);

      updateTotalPriceAllGoods(-itemTotalPrice);

      rowItem.remove();

      updateNumberItem();
      console.log(goods);
    }
  });

  // Открытие изображения товара
  const currentUrl = location.origin;

  table.addEventListener('click', e => {
    const target = e.target;
    const buttonPic = target.closest('.table__btn_pic');

    if (buttonPic) {
      const imgUrlRelative = buttonPic.getAttribute('data-pic');
      const imgUrl = `${currentUrl}/${imgUrlRelative}`;
      openImage(imgUrl);
    }
  });


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

  let totalPrice;

  modalCheckbox.addEventListener('change', () => {
    toggleDiscountInput(!modalCheckbox.checked);
    updateTotalPrice();
  });

  form.addEventListener('input', e => {
    const target = e.target;
    if (target.matches('.modal__input[type="number"]')) {
      totalPrice = updateTotalPrice();
    }
  });

  // Отображение изображения в форме

  modalFile.addEventListener('change', () => {
    const imageContainer = form.querySelector('.image-container');

    if (imageContainer) {
      imageContainer.remove();
    }

    if (modalFile.files.length > 0) {
      const file = modalFile.files[0];
      const maxSize = 1 * 1024 * 1024; // 1 МБ в байтах

      if (file.size >= maxSize) {
        const blockWithError = createBlockWithError(
            'Изображение не должно превышать размер 1 МБ',
            'modal__label_file-error');
        modalLabelFile.before(blockWithError);
      } else {
        const blockWithError = document.querySelector(
            '.modal__label_file-error');

        if (blockWithError) {
          blockWithError.remove();
        }
        const src = URL.createObjectURL(file);
        const {imageContainer, img} = createImage();
        img.src = src;

        modalFile.after(imageContainer);
        imageContainer.style.display = 'block';

        imageContainer.addEventListener('click', (e) => {
          e.stopPropagation(); // Предотвращение всплытия события
          imageContainer.remove();
        });
      }
    }
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
  control,
  addItemPage,
  updateTotalPriceAllGoods,
  updateNumberItem,
  openImage,
};
