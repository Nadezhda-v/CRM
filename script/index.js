'use strict';

const modalTitle = document.querySelector('.modal__title');
const modalForm = document.querySelector('.modal__form');
const modalCheckbox = document.querySelector('#discount');
const modalInputDiscount = document.querySelector('.modal__input_discount');
const overlay = document.querySelector('.overlay');

let count;

overlay.classList.remove('active');

const createRow = (item) => {
  const rowItem = document.createElement('tr');
  const cellOrder = document.createElement('td');
  cellOrder.className = 'table__cell';
  cellOrder.textContent = count;

  const cellName = document.createElement('td');
  cellName.className = 'table__cell table__cell_left table__cell_name';
  cellName.dataset.id = item.id;
  cellName.textContent = item.title;

  const span = document.createElement('span');
  span.className = 'table__cell-id';
  span.textContent = `id: ${cellName.dataset.id}`;

  const cellCategory = document.createElement('td');
  cellCategory.className = 'table__cell table__cell_left';
  cellCategory.textContent = item.category;

  const cellUnits = document.createElement('td');
  cellUnits.className = 'table__cell';
  cellUnits.textContent = item.units;

  const cellCount = document.createElement('td');
  cellCount.className = 'table__cell';
  cellCount.textContent = item.count;

  const cellPrice = document.createElement('td');
  cellPrice.className = 'table__cell';
  cellPrice.textContent = '$' + item.price;

  const cellSum = document.createElement('td');
  cellSum.className = 'table__cell';
  cellSum.textContent = '$' + item.count * item.price;

  const cellButtons = document.createElement('td');
  cellButtons.className = 'table__cell table__cell_btn-wrapper';

  const buttonPic = document.createElement('button');
  buttonPic.className = 'table__btn table__btn_pic';

  const buttonEdit = document.createElement('button');
  buttonEdit.className = 'table__btn table__btn_edit';

  const buttonDel = document.createElement('button');
  buttonDel.className = 'table__btn table__btn_del';

  rowItem.append(cellOrder, cellName, cellButtons);
  cellName.prepend(span);
  const cells = [cellCategory, cellUnits, cellCount, cellPrice, cellSum];
  cellName.after(...cells);
  cellButtons.append(buttonPic, buttonEdit, buttonDel);

  return rowItem;
};

const table = document.querySelector('.table__body');
const rowsTable = table.querySelectorAll('tr');

const renderGoods = (arr) => {
  count = rowsTable.length + 1;
  arr.forEach(element => {
    const rowItem = createRow(element);
    count++;
    table.append(rowItem);
  });
};

const goods = [
  {
    'id': 1,
    'title': 'Смартфон Xiaomi 11T 8/128GB',
    'price': 27000,
    'description':
      `Смартфон Xiaomi 11T – это представитель флагманской линейки, 
      выпущенной во второй половине 2021 года. И он полностью соответствует 
      такому позиционированию, предоставляя своим обладателям возможность 
      пользоваться отличными камерами, ни в чем себя не ограничивать при 
      запуске игр и других требовательных приложений.`,
    'category': 'mobile-phone',
    'discont': false,
    'count': 3,
    'units': 'шт',
    'images': {
      'small': 'img/smrtxiaomi11t-m.jpg',
      'big': 'img/smrtxiaomi11t-b.jpg',
    },
  },
  {
    'id': 2,
    'title': 'Радиоуправляемый автомобиль Cheetan',
    'price': 4000,
    'description':
      `Внедорожник на дистанционном управлении. 
      Скорость 25км/ч. Возраст 7 - 14 лет`,
    'category': 'toys',
    'discont': 5,
    'count': 1,
    'units': 'шт',
    'images': {
      'small': 'img/cheetancar-m.jpg',
      'big': 'img/cheetancar-b.jpg',
    },
  },
  {
    'id': 3,
    'title': 'ТВ приставка MECOOL KI',
    'price': 12400,
    'description':
      `Всего лишь один шаг сделает ваш телевизор умным, 
      Быстрый и умный MECOOL KI PRO, прекрасно спроектированный, 
      сочетает в себе прочный процессор Cortex-A53 с чипом Amlogic S905D`,
    'category': 'tv-box',
    'discont': 15,
    'count': 4,
    'units': 'шт',
    'images': {
      'small': 'img/tvboxmecool-m.jpg',
      'big': 'img/tvboxmecool-b.jpg',
    },
  },
  {
    'id': 4,
    'title': 'Витая пара PROConnect 01-0043-3-25',
    'price': 22,
    'description':
      `Витая пара Proconnect 01-0043-3-25 является сетевым кабелем 
      с 4 парами проводов типа UTP, в качестве проводника в которых 
      используется алюминий, плакированный медью CCA. 
      Такая неэкранированная витая пара с одножильными проводами 
      диаметром 0.50 мм широко применяется в процессе сетевых монтажных 
      работ. С ее помощью вы сможете обеспечить развертывание локальной 
      сети в домашних условиях или на предприятии, 
      объединить все необходимое вам оборудование в единую сеть.`,
    'category': 'cables',
    'discont': false,
    'count': 420,
    'units': 'v',
    'images': {
      'small': 'img/lan_proconnect43-3-25.jpg',
      'big': 'img/lan_proconnect43-3-25-b.jpg',
    },
  },
];

renderGoods(goods);

const panelAddGoods = document.querySelector('.panel__add-goods');
const overlayModal = document.querySelector('.overlay__modal');

// Открытие модального окна

panelAddGoods.addEventListener('click', () => {
  overlay.classList.add('active');
});

// Закрытие модального окна

overlay.addEventListener('click', e => {
  const target = e.target;

  if (!overlayModal.contains(target) || target.closest('.modal__close')) {
    overlay.classList.remove('active');
  }
});

// Удаление строки из таблицы

table.addEventListener('click', e => {
  const target = e.target;

  if (target.closest('.table__btn_del')) {
    const rowItem = target.closest('tr');
    const dataId = rowItem.querySelector('.table__cell_name').dataset.id;
    const index = goods.findIndex(item => item.id === +dataId);

    goods.splice(index, 1);

    rowItem.remove();
  }

  console.log(goods);
});