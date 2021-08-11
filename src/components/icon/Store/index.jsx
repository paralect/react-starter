import Arrow from './ui/Arrow';
import ArrowDown from './ui/ArrowDown';
import ArrowRight from './ui/ArrowRight';
import Copy from './ui/Copy';
import Close from './ui/Close';

export const IMAGES = {
  arrow: Arrow,
  arrowDown: ArrowDown,
  arrowRight: ArrowRight,
  copy: Copy,
  close: Close,
};

class Store {
  getImage = (icon) => IMAGES[icon] || IMAGES.arrowRight;
}

export default new Store();
