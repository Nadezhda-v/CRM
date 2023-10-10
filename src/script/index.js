import {loadGoods} from './modules/render';
import {control} from './modules/interactions';

import '../css/index.css';

const init = () => {
  loadGoods();
  control();
};

init();
