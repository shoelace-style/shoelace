import { ANIMATIONS } from './common';

const ROTATE_DEFAULT: Keyframe = {
  easing: 'ease-in-out',
  fillMode: 'both',
  transformOrigin: 'center center'
};

const ROTATE_CENTER: Keyframe[] = [
  { offset: 0, ...ROTATE_DEFAULT, transform: 'rotate(0)' },
  { offset: 1, ...ROTATE_DEFAULT, transform: 'rotate(360deg)' }
];

const ROTATE_TOP: Keyframe[] = [
  {
    offset: 0,
    ...ROTATE_DEFAULT,
    easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
    transform: 'rotate(0)',
    transformOrigin: 'top'
  },
  {
    offset: 1,
    ...ROTATE_DEFAULT,
    easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
    transform: 'rotate(360deg)',
    transformOrigin: 'top'
  }
];

const ROTATE_TR: Keyframe[] = [
  {
    offset: 0,
    ...ROTATE_DEFAULT,
    easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
    transform: 'rotate(0)',
    transformOrigin: 'top right'
  },
  {
    offset: 1,
    ...ROTATE_DEFAULT,
    easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
    transform: 'rotate(360deg)',
    transformOrigin: 'top right'
  }
];

const ROTATE_RIGHT: Keyframe[] = [
  {
    offset: 0,
    ...ROTATE_DEFAULT,
    easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
    transform: 'rotate(0)',
    transformOrigin: 'right'
  },
  {
    offset: 1,
    ...ROTATE_DEFAULT,
    easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
    transform: 'rotate(360deg)',
    transformOrigin: 'right'
  }
];

const ROTATE_BR: Keyframe[] = [
  {
    offset: 0,
    ...ROTATE_DEFAULT,
    easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
    transform: 'rotate(0)',
    transformOrigin: 'bottom right'
  },
  {
    offset: 1,
    ...ROTATE_DEFAULT,
    easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
    transform: 'rotate(360deg)',
    transformOrigin: 'bottom right'
  }
];

const ROTATE_BOTTOM: Keyframe[] = [
  {
    offset: 0,
    ...ROTATE_DEFAULT,
    easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
    transform: 'rotate(0)',
    transformOrigin: 'bottom'
  },
  {
    offset: 1,
    ...ROTATE_DEFAULT,
    easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
    transform: 'rotate(360deg)',
    transformOrigin: 'bottom'
  }
];

const ROTATE_BL: Keyframe[] = [
  {
    offset: 0,
    ...ROTATE_DEFAULT,
    easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
    transform: 'rotate(0)',
    transformOrigin: 'bottom left'
  },
  {
    offset: 1,
    ...ROTATE_DEFAULT,
    easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
    transform: 'rotate(360deg)',
    transformOrigin: 'bottom left'
  }
];

const ROTATE_LEFT: Keyframe[] = [
  {
    offset: 0,
    ...ROTATE_DEFAULT,
    easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
    transform: 'rotate(0)',
    transformOrigin: 'left'
  },
  {
    offset: 1,
    ...ROTATE_DEFAULT,
    easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
    transform: 'rotate(360deg)',
    transformOrigin: 'left'
  }
];

const ROTATE_TL: Keyframe[] = [
  {
    offset: 0,
    ...ROTATE_DEFAULT,
    easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
    transform: 'rotate(0)',
    transformOrigin: 'top left'
  },
  {
    offset: 1,
    ...ROTATE_DEFAULT,
    easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
    transform: 'rotate(360deg)',
    transformOrigin: 'top left'
  }
];

const ROTATE_HOR_CENTER: Keyframe[] = [
  { offset: 0, ...ROTATE_DEFAULT, easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)', transform: 'rotateX(0)' },
  { offset: 1, ...ROTATE_DEFAULT, easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)', transform: 'rotateX(-360deg)' }
];

const ROTATE_HOR_TOP: Keyframe[] = [
  {
    offset: 0,
    ...ROTATE_DEFAULT,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
    transform: 'rotateX(0)',
    transformOrigin: 'top'
  },
  {
    offset: 1,
    ...ROTATE_DEFAULT,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
    transform: 'rotateX(-360deg)',
    transformOrigin: 'top'
  }
];

const ROTATE_HOR_BOTTOM: Keyframe[] = [
  {
    offset: 0,
    ...ROTATE_DEFAULT,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
    transform: 'rotateX(0)',
    transformOrigin: 'bottom'
  },
  {
    offset: 1,
    ...ROTATE_DEFAULT,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
    transform: 'rotateX(360deg)',
    transformOrigin: 'bottom'
  }
];

const ROTATE_VERT_CENTER: Keyframe[] = [
  { offset: 0, ...ROTATE_DEFAULT, easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)', transform: 'rotateY(0)' },
  { offset: 1, ...ROTATE_DEFAULT, easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)', transform: 'rotateY(360deg)' }
];

const ROTATE_VERT_LEFT: Keyframe[] = [
  {
    offset: 0,
    ...ROTATE_DEFAULT,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
    transform: 'rotateY(0)',
    transformOrigin: 'left'
  },
  {
    offset: 1,
    ...ROTATE_DEFAULT,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
    transform: 'rotateY(360deg)',
    transformOrigin: 'left'
  }
];

const ROTATE_VERT_RIGHT: Keyframe[] = [
  {
    offset: 0,
    ...ROTATE_DEFAULT,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
    transform: 'rotateY(0)',
    transformOrigin: 'right'
  },
  {
    offset: 1,
    ...ROTATE_DEFAULT,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
    transform: 'rotateY(-360deg)',
    transformOrigin: 'right'
  }
];

const ROTATE_DIAGONAL_1: Keyframe[] = [
  { offset: 0, ...ROTATE_DEFAULT, easing: 'linear', transform: 'rotate3d(1, 1, 0, 0deg)' },
  { offset: 0.5, ...ROTATE_DEFAULT, easing: 'linear', transform: 'rotate3d(1, 1, 0, -180deg)' },
  { offset: 1, ...ROTATE_DEFAULT, easing: 'linear', transform: 'rotate3d(1, 1, 0, -360deg)' }
];

const ROTATE_DIAGONAL_2: Keyframe[] = [
  { offset: 0, ...ROTATE_DEFAULT, easing: 'linear', transform: 'rotate3d(-1, 1, 0, 0deg)' },
  { offset: 0.5, ...ROTATE_DEFAULT, easing: 'linear', transform: 'rotate3d(-1, 1, 0, 180deg)' },
  { offset: 1, ...ROTATE_DEFAULT, easing: 'linear', transform: 'rotate3d(-1, 1, 0, 360deg)' }
];

const ROTATE_DIAGONAL_TR: Keyframe[] = [
  { offset: 0, ...ROTATE_DEFAULT, easing: 'linear', transform: 'rotate3d(1, 1, 0, 0deg)', transformOrigin: '100% 0%' },
  {
    offset: 0.5,
    ...ROTATE_DEFAULT,
    easing: 'linear',
    transform: 'rotate3d(1, 1, 0, -180deg)',
    transformOrigin: '100% 0%'
  },
  {
    offset: 1,
    ...ROTATE_DEFAULT,
    easing: 'linear',
    transform: 'rotate3d(1, 1, 0, -360deg)',
    transformOrigin: '100% 0%'
  }
];

const ROTATE_DIAGONAL_BR: Keyframe[] = [
  {
    offset: 0,
    ...ROTATE_DEFAULT,
    easing: 'linear',
    transform: 'rotate3d(-1, 1, 0, 0deg)',
    transformOrigin: '100% 100%'
  },
  {
    offset: 0.5,
    ...ROTATE_DEFAULT,
    easing: 'linear',
    transform: 'rotate3d(-1, 1, 0, -180deg)',
    transformOrigin: '100% 100%'
  },
  {
    offset: 1,
    ...ROTATE_DEFAULT,
    easing: 'linear',
    transform: 'rotate3d(-1, 1, 0, -360deg)',
    transformOrigin: '100% 100%'
  }
];

const ROTATE_DIAGONAL_BL: Keyframe[] = [
  { offset: 0, ...ROTATE_DEFAULT, easing: 'linear', transform: 'rotate3d(1, 1, 0, 0deg)', transformOrigin: '0% 100%' },
  {
    offset: 0.5,
    ...ROTATE_DEFAULT,
    easing: 'linear',
    transform: 'rotate3d(1, 1, 0, 180deg)',
    transformOrigin: '0% 100%'
  },
  { offset: 1, ...ROTATE_DEFAULT, easing: 'linear', transform: 'rotate3d(1, 1, 0, 360deg)', transformOrigin: '0% 100%' }
];

const ROTATE_DIAGONAL_TL: Keyframe[] = [
  { offset: 0, ...ROTATE_DEFAULT, easing: 'linear', transform: 'rotate3d(-1, 1, 0, 0deg)', transformOrigin: '0% 0%' },
  {
    offset: 0.5,
    ...ROTATE_DEFAULT,
    easing: 'linear',
    transform: 'rotate3d(-1, 1, 0, 180deg)',
    transformOrigin: '0% 0%'
  },
  { offset: 1, ...ROTATE_DEFAULT, easing: 'linear', transform: 'rotate3d(-1, 1, 0, 360deg)', transformOrigin: '0% 0%' }
];

export default {
  [ANIMATIONS.ROTATE_CENTER]: ROTATE_CENTER,
  [ANIMATIONS.ROTATE_TOP]: ROTATE_TOP,
  [ANIMATIONS.ROTATE_TR]: ROTATE_TR,
  [ANIMATIONS.ROTATE_RIGHT]: ROTATE_RIGHT,
  [ANIMATIONS.ROTATE_BR]: ROTATE_BR,
  [ANIMATIONS.ROTATE_BOTTOM]: ROTATE_BOTTOM,
  [ANIMATIONS.ROTATE_BL]: ROTATE_BL,
  [ANIMATIONS.ROTATE_LEFT]: ROTATE_LEFT,
  [ANIMATIONS.ROTATE_TL]: ROTATE_TL,
  [ANIMATIONS.ROTATE_HOR_CENTER]: ROTATE_HOR_CENTER,
  [ANIMATIONS.ROTATE_HOR_TOP]: ROTATE_HOR_TOP,
  [ANIMATIONS.ROTATE_HOR_BOTTOM]: ROTATE_HOR_BOTTOM,
  [ANIMATIONS.ROTATE_VERT_CENTER]: ROTATE_VERT_CENTER,
  [ANIMATIONS.ROTATE_VERT_LEFT]: ROTATE_VERT_LEFT,
  [ANIMATIONS.ROTATE_VERT_RIGHT]: ROTATE_VERT_RIGHT,
  [ANIMATIONS.ROTATE_DIAGONAL_1]: ROTATE_DIAGONAL_1,
  [ANIMATIONS.ROTATE_DIAGONAL_2]: ROTATE_DIAGONAL_2,
  [ANIMATIONS.ROTATE_DIAGONAL_TR]: ROTATE_DIAGONAL_TR,
  [ANIMATIONS.ROTATE_DIAGONAL_BR]: ROTATE_DIAGONAL_BR,
  [ANIMATIONS.ROTATE_DIAGONAL_BL]: ROTATE_DIAGONAL_BL,
  [ANIMATIONS.ROTATE_DIAGONAL_TL]: ROTATE_DIAGONAL_TL
};
