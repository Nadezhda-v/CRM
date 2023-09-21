import {
  loadGoods,
} from './modules/render.js';

import {
  control,
} from './modules/interactions.js';

const init = () => {
  loadGoods();
  control();
};

init();
