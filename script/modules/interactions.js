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
  idOnForm,
  modalTitle,
  modalSubmit,
  subPanelPages,
  choicePage,
  buttonFilter,
  searchInput,
} from './getElements.js';

import {
  createRow,
  createImage,
  createBlockWithError,
  createModal,
} from './createElements.js';

import {
  updateTotalPriceAllGoods,
  updateTotalPrice,
  calcTotalPriceAllGoods,
} from './calculations.js';

import {
  urlServ,
  fetchRequest,
} from './fetchRequest.js';

import {
  renderGoods,
} from './render.js';

// Добавление товара на страницу

const addItemPage = (newItem, totalPrice) => {
  const rowsTable = table.querySelectorAll('tr');
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

/* Изменение текста формы в зависимости
  добавляется или редактируется товар*/
const changeTitleForm = (dataId) => {
  if (dataId) {
    modalTitle.textContent = 'Изменить товар';
    modalSubmit.textContent = 'Изменить товар';
  } else {
    modalTitle.textContent = 'Добавить товар';
    modalSubmit.textContent = 'Добавить товар';
  }
};

// Заполнение id на форме

const updateIdOnForm = (itemId) => {
  const idOnForm = overlayModal.querySelector('.vendor-code__id');
  idOnForm.textContent = itemId;
  changeTitleForm(itemId);
};

// Открытие модального окна

const openModal = (overlay) => {
  overlay.classList.add('active');
};

// Закрытие модального окна

const closeModal = (overlay) => {
  overlay.classList.remove('active');
};

/* Разблокировка и блокировка поля ввода скидки
в зависимости от состояния чекбокса 'discount'*/

const toggleDiscountInput = (disabled) => {
  modalInputDiscount.value = '';
  modalInputDiscount.disabled = disabled;
};

// Преобразование файла в формат base64

const toBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();

  reader.addEventListener('loadend', () => {
    resolve(reader.result);
  });

  reader.addEventListener('error', (err) => {
    reject(err);
  });

  reader.readAsDataURL(file);
});

// Форматирование цены
const formattedPrice = (price) => {
  const formattedPrice = price.toLocaleString('ru-RU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formattedPrice;
};

// Добавление модального окна с ошибкой на страницу
const addModalError = (err) => {
  let errorMessage;

  if (err.message) {
    errorMessage = err;
  } else {
    errorMessage = 'Что-то пошло не так';
  }
  const modal = createModal(`${errorMessage}`, 'warn');
  openModal(modal);
};

// Удаление предыдущей картинки и ошибки в форме
const delPrevImage = () => {
  const imageContainer = form.querySelector('.image-container');
  const errorInForm = form.querySelector('.modal__label_file-error');

  if (imageContainer) {
    imageContainer.remove();
  }

  if (errorInForm) {
    errorInForm.remove();
  }
};

// Удаление модального окна с ошибкой
const delModalError = () => {
  const modalActionError = document.querySelector(
      '.overlay__modal-action_error');
  if (modalActionError) {
    modalActionError.remove();
  }
};

// Обновление информации о страницах в панели
const updatePagination = () => {
  const rowsCount = table.querySelectorAll('tr').length;
  const selectedValue = choicePage.value;
  subPanelPages.textContent = `1-${selectedValue} из ${rowsCount}`;
};

choicePage.addEventListener('change', updatePagination);

// Удаление всех строк в таблице
const deleteRows = () => {
  const allRows = table.querySelectorAll('tr');
  allRows.forEach(row => row.remove());
};

// Обновление строки таблицы по ID
const updateRowById = (newData, totalPrice) => {
  const allRows = table.querySelectorAll('tr');
  const rowToUpdate = [...allRows].find(row =>
    row.querySelector('.table__cell_name').dataset.id === newData.id);

  if (rowToUpdate) {
    rowToUpdate.querySelector('.table__cell_name').childNodes[1].textContent =
      newData.title;
    rowToUpdate.querySelector('.table__cell_category').textContent =
      newData.category;
    rowToUpdate.querySelector('.table__cell_units').textContent =
      newData.units;
    rowToUpdate.querySelector('.table__cell_count').textContent =
      newData.count;
    rowToUpdate.querySelector('.table__cell_price').textContent =
      '$' + newData.price;
    rowToUpdate.querySelector('.table__cell_total-price').textContent =
      '$' + totalPrice;
    rowToUpdate.querySelector('.table__btn_pic').dataset.pic =
      newData.image;
  }
};

const control = () => {
  const pathImagePattern = /\/\d/;

  // Открытие изображения товара
  table.addEventListener('click', e => {
    const target = e.target;
    const buttonPic = target.closest('.table__btn_pic');

    if (buttonPic) {
      const imgUrlRelative = buttonPic.getAttribute('data-pic');

      if (pathImagePattern.test(imgUrlRelative)) {
        const imgUrl = `${urlServ}/${imgUrlRelative}`;
        openImage(imgUrl);
      }
    }
  });

  // Удаление товара из таблицы и БД
  table.addEventListener('click', e => {
    const target = e.target;

    if (target.closest('.table__btn_del')) {
      const rowItem = target.closest('tr');
      const dataId = rowItem.querySelector('.table__cell_name').dataset.id;

      const confirmModal = createModal('Вы действительно хотите удалить товар?',
          'confirm');
      openModal(confirmModal);

      const buttonDel = confirmModal.querySelector('.button__confirm_del');

      buttonDel.addEventListener('click', () => {
        delModalError();

        fetchRequest(`api/goods/${dataId}`, {
          method: 'DELETE',
          callback(err) {
            if (err) {
              addModalError(err);
            } else {
              const itemTotalPrice = +rowItem.querySelector(
                  '.table__cell_total-price')
                  .textContent
                  .slice(1);

              updateTotalPriceAllGoods(-itemTotalPrice);
              rowItem.remove();
              updateNumberItem();
              closeModal(confirmModal);
            }
          },
        });
      });
    }
  });

  panelAddGoods.addEventListener('click', () => {
    form.reset();
    modalTotalPrice.value = '$ ' + 0;
    updateIdOnForm('');
    openModal(overlay);
  });

  overlay.addEventListener('click', e => {
    const target = e.target;

    if (!overlayModal.contains(target) || target.closest('.modal__close')) {
      closeModal(overlay);
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
  const maxSizeImg = 1 * 1024 * 1024; // 1 МБ в байтах

  modalFile.addEventListener('change', () => {
    delPrevImage();

    if (modalFile.files.length > 0) {
      const file = modalFile.files[0];

      if (file.size >= maxSizeImg) {
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
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    delModalError();

    const formData = new FormData(form);
    let image = formData.get('image');

    if (image.size > 0 && image.size < maxSizeImg) {
      image = await toBase64(image);
    } else {
      image = [];
    }
    console.log(idOnForm.textContent);
    const itemId = idOnForm.textContent;

    if (itemId) {
      fetchRequest(`api/goods/${itemId}`, {
        method: 'PATCH',
        body: {
          title: formData.get('title'),
          category: formData.get('category'),
          description: formData.get('description'),
          units: formData.get('units'),
          discount: +formData.get('discount'),
          count: +formData.get('count'),
          price: +formData.get('price'),
          image,
        },
        callback(err, data) {
          if (err) {
            addModalError(err);
          } else {
            const totalPrice = modalTotalPrice.textContent
                .split('.')[0]
                .replace(/\$\s/g, '');
            updateRowById(data, totalPrice);
            calcTotalPriceAllGoods();

            closeModal(overlay);
            form.reset();
            delPrevImage();
            toggleDiscountInput(true);
          }
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      fetchRequest('api/goods', {
        method: 'POST',
        body: {
          title: formData.get('title'),
          category: formData.get('category'),
          description: formData.get('description'),
          units: formData.get('units'),
          discount: +formData.get('discount'),
          count: +formData.get('count'),
          price: +formData.get('price'),
          image,
        },
        callback(err, data) {
          if (err) {
            addModalError(err);
          } else {
            addItemPage(data, totalPrice);

            closeModal(overlay);
            form.reset();
            delPrevImage();
            toggleDiscountInput(true);
          }
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  });

  // Заполнение формы данными из БД
  const fillForm = (data) => {
    delPrevImage();

    if (pathImagePattern.test(data.image)) {
      const {imageContainer, img} = createImage();
      img.src = `${urlServ}${data.image}`;
      modalFile.after(imageContainer);
      imageContainer.style.display = 'block';
    }

    const formInputs = form.elements;
    const inputElements = Array.from(formInputs).filter(element =>
      element.tagName === 'INPUT' || element.name === 'description');

    for (const input of inputElements) {
      if (input.name in data) {
        if (input.name === 'image') {
          continue; // Пропустить инпут с именем "image"
        }

        input.value = data[input.name];

        if (data.discount > 0) {
          modalCheckbox.checked = true;
          modalInputDiscount.disabled = false;
        } else {
          toggleDiscountInput(true);
          modalCheckbox.checked = false;
        }
      }
    }
  };

  // Редактирование товара
  table.addEventListener('click', async (e) => {
    const target = e.target;

    if (target.closest('.table__btn_edit')) {
      delModalError();
      const rowItem = target.closest('tr');
      const dataId = rowItem.querySelector('.table__cell_name').dataset.id;

      await fetchRequest(`api/goods/${dataId}`, {
        method: 'GET',
        callback(err, data) {
          if (err) {
            addModalError(err);
          } else {
            fillForm(data);
            updateIdOnForm(data.id);
            totalPrice = updateTotalPrice();
            openModal(overlay);

            const imageContainer = form.querySelector('.image-container');
            if (imageContainer) {
              imageContainer.addEventListener('click', (e) => {
                e.stopPropagation();
                imageContainer.remove();
              });
            }
          }
        },
      });
    }
  });

  // Обработка клика по списку с категориями
  const handlePanelListClick = async ({target}) => {
    if (target.classList.contains('panel__category')) {
      // Получение значения выбранного элемента <li>
      const selectedValue = target.textContent;
      deleteRows();

      if (selectedValue !== 'Показать все') {
        await fetchRequest(`api/goods/category/${selectedValue}`, {
          method: 'GET',
          callback: renderGoods,
        });
      } else {
        await fetchRequest('api/goods', {
          callback: renderGoods,
        });
      }

      calcTotalPriceAllGoods();
      // Скрытие списка после выбора категории
      const panelList = document.querySelector('.panel__list');
      closeModal(panelList);
    }
  };

  buttonFilter.addEventListener('click', () => {
    const panelList = document.querySelector('.panel__list');
    panelList.classList.toggle('active');

    panelList.addEventListener('click', handlePanelListClick);
  });

  document.addEventListener('click', ({target}) => {
    const panelList = document.querySelector('.panel__list');
    if (!buttonFilter.contains(target) && !panelList.contains(target)) {
      closeModal(panelList);
    }
  });

  // Обработка поискового запроса
  searchInput.addEventListener('input', () => {
    const inputValue = searchInput.value;
    console.log(inputValue);

    setTimeout(async () => {
      if (searchInput.value === inputValue) {
        deleteRows();

        await fetchRequest(`api/goods?search=${inputValue}`, {
          method: 'GET',
          callback: renderGoods,
        });

        calcTotalPriceAllGoods();
      }
    }, 300);
  });
};

export {
  control,
  addItemPage,
  updateTotalPriceAllGoods,
  updateNumberItem,
  openImage,
  formattedPrice,
  updatePagination,
};
