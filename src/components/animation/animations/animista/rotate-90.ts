import { ANIMATIONS } from './common';

const ROTATE_90_DEFAULT: Keyframe = {
  easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
  fillMode: 'both',
  transformOrigin: 'center center'
};

const ROTATE_90_CW: Keyframe[] = [
  { offset: 0, ...ROTATE_90_DEFAULT, transform: 'rotate(0)' },
  { offset: 1, ...ROTATE_90_DEFAULT, transform: 'rotate(90deg)' }
];

const ROTATE_90_CCW: Keyframe[] = [
  { offset: 0, ...ROTATE_90_DEFAULT, transform: 'rotate(0)' },
  { offset: 1, ...ROTATE_90_DEFAULT, transform: 'rotate(-90deg)' }
];

const ROTATE_90_TOP_CW: Keyframe[] = [
  { offset: 0, ...ROTATE_90_DEFAULT, transform: 'rotate(0)', transformOrigin: 'top' },
  { offset: 1, ...ROTATE_90_DEFAULT, transform: 'rotate(90deg)', transformOrigin: 'top' }
];

const ROTATE_90_TOP_CCW: Keyframe[] = [
  { offset: 0, ...ROTATE_90_DEFAULT, transform: 'rotate(0)', transformOrigin: 'top' },
  { offset: 1, ...ROTATE_90_DEFAULT, transform: 'rotate(-90deg)', transformOrigin: 'top' }
];

const ROTATE_90_TR_CW: Keyframe[] = [
  { offset: 0, ...ROTATE_90_DEFAULT, transform: 'rotate(0)', transformOrigin: 'top right' },
  { offset: 1, ...ROTATE_90_DEFAULT, transform: 'rotate(90deg)', transformOrigin: 'top right' }
];

const ROTATE_90_TR_CCW: Keyframe[] = [
  { offset: 0, ...ROTATE_90_DEFAULT, transform: 'rotate(0)', transformOrigin: 'top right' },
  { offset: 1, ...ROTATE_90_DEFAULT, transform: 'rotate(-90deg)', transformOrigin: 'top right' }
];

const ROTATE_90_RIGHT_CW: Keyframe[] = [
  { offset: 0, ...ROTATE_90_DEFAULT, transform: 'rotate(0)', transformOrigin: 'right' },
  { offset: 1, ...ROTATE_90_DEFAULT, transform: 'rotate(90deg)', transformOrigin: 'right' }
];

const ROTATE_90_RIGHT_CCW: Keyframe[] = [
  { offset: 0, ...ROTATE_90_DEFAULT, transform: 'rotate(0)', transformOrigin: 'right' },
  { offset: 1, ...ROTATE_90_DEFAULT, transform: 'rotate(-90deg)', transformOrigin: 'right' }
];

const ROTATE_90_BR_CW: Keyframe[] = [
  { offset: 0, ...ROTATE_90_DEFAULT, transform: 'rotate(0)', transformOrigin: '100% 100%' },
  { offset: 1, ...ROTATE_90_DEFAULT, transform: 'rotate(90deg)', transformOrigin: '100% 100%' }
];

const ROTATE_90_BR_CCW: Keyframe[] = [
  { offset: 0, ...ROTATE_90_DEFAULT, transform: 'rotate(0)', transformOrigin: '100% 100%' },
  { offset: 1, ...ROTATE_90_DEFAULT, transform: 'rotate(-90deg)', transformOrigin: '100% 100%' }
];

const ROTATE_90_BOTTOM_CW: Keyframe[] = [
  { offset: 0, ...ROTATE_90_DEFAULT, transform: 'rotate(0)', transformOrigin: 'bottom' },
  { offset: 1, ...ROTATE_90_DEFAULT, transform: 'rotate(90deg)', transformOrigin: 'bottom' }
];

const ROTATE_90_BOTTOM_CCW: Keyframe[] = [
  { offset: 0, ...ROTATE_90_DEFAULT, transform: 'rotate(0)', transformOrigin: 'bottom' },
  { offset: 1, ...ROTATE_90_DEFAULT, transform: 'rotate(-90deg)', transformOrigin: 'bottom' }
];

const ROTATE_90_BL_CW: Keyframe[] = [
  { offset: 0, ...ROTATE_90_DEFAULT, transform: 'rotate(0)', transformOrigin: '0% 100%' },
  { offset: 1, ...ROTATE_90_DEFAULT, transform: 'rotate(90deg)', transformOrigin: '0% 100%' }
];

const ROTATE_90_BL_CCW: Keyframe[] = [
  { offset: 0, ...ROTATE_90_DEFAULT, transform: 'rotate(0)', transformOrigin: '0% 100%' },
  { offset: 1, ...ROTATE_90_DEFAULT, transform: 'rotate(-90deg)', transformOrigin: '0% 100%' }
];

const ROTATE_90_LEFT_CW: Keyframe[] = [
  { offset: 0, ...ROTATE_90_DEFAULT, transform: 'rotate(0)', transformOrigin: 'left' },
  { offset: 1, ...ROTATE_90_DEFAULT, transform: 'rotate(90deg)', transformOrigin: 'left' }
];

const ROTATE_90_LEFT_CCW: Keyframe[] = [
  { offset: 0, ...ROTATE_90_DEFAULT, transform: 'rotate(0)', transformOrigin: 'left' },
  { offset: 1, ...ROTATE_90_DEFAULT, transform: 'rotate(-90deg)', transformOrigin: 'left' }
];

const ROTATE_90_TL_CW: Keyframe[] = [
  { offset: 0, ...ROTATE_90_DEFAULT, transform: 'rotate(0)', transformOrigin: '0% 0%' },
  { offset: 1, ...ROTATE_90_DEFAULT, transform: 'rotate(90deg)', transformOrigin: '0% 0%' }
];

const ROTATE_90_TL_CCW: Keyframe[] = [
  { offset: 0, ...ROTATE_90_DEFAULT, transform: 'rotate(0)', transformOrigin: '0% 0%' },
  { offset: 1, ...ROTATE_90_DEFAULT, transform: 'rotate(-90deg)', transformOrigin: '0% 0%' }
];

const ROTATE_90_HORIZONTAL_FWD: Keyframe[] = [
  { offset: 0, ...ROTATE_90_DEFAULT, transform: 'rotateX(0)' },
  { offset: 1, ...ROTATE_90_DEFAULT, transform: 'rotateX(90deg)' }
];

const ROTATE_90_HORIZONTAL_BCK: Keyframe[] = [
  { offset: 0, ...ROTATE_90_DEFAULT, transform: 'rotateX(0)' },
  { offset: 1, ...ROTATE_90_DEFAULT, transform: 'rotateX(-90deg)' }
];

const ROTATE_90_VERTICAL_FWD: Keyframe[] = [
  { offset: 0, ...ROTATE_90_DEFAULT, transform: 'rotateY(0)' },
  { offset: 1, ...ROTATE_90_DEFAULT, transform: 'rotateY(90deg)' }
];

const ROTATE_90_VERTICAL_BCK: Keyframe[] = [
  { offset: 0, ...ROTATE_90_DEFAULT, transform: 'rotateY(0)' },
  { offset: 1, ...ROTATE_90_DEFAULT, transform: 'rotateY(-90deg)' }
];

export default {
  [ANIMATIONS.ROTATE_90_CW]: ROTATE_90_CW,
  [ANIMATIONS.ROTATE_90_CCW]: ROTATE_90_CCW,
  [ANIMATIONS.ROTATE_90_TOP_CW]: ROTATE_90_TOP_CW,
  [ANIMATIONS.ROTATE_90_TOP_CCW]: ROTATE_90_TOP_CCW,
  [ANIMATIONS.ROTATE_90_TR_CW]: ROTATE_90_TR_CW,
  [ANIMATIONS.ROTATE_90_TR_CCW]: ROTATE_90_TR_CCW,
  [ANIMATIONS.ROTATE_90_RIGHT_CW]: ROTATE_90_RIGHT_CW,
  [ANIMATIONS.ROTATE_90_RIGHT_CCW]: ROTATE_90_RIGHT_CCW,
  [ANIMATIONS.ROTATE_90_BR_CW]: ROTATE_90_BR_CW,
  [ANIMATIONS.ROTATE_90_BR_CCW]: ROTATE_90_BR_CCW,
  [ANIMATIONS.ROTATE_90_BOTTOM_CW]: ROTATE_90_BOTTOM_CW,
  [ANIMATIONS.ROTATE_90_BOTTOM_CCW]: ROTATE_90_BOTTOM_CCW,
  [ANIMATIONS.ROTATE_90_BL_CW]: ROTATE_90_BL_CW,
  [ANIMATIONS.ROTATE_90_BL_CCW]: ROTATE_90_BL_CCW,
  [ANIMATIONS.ROTATE_90_LEFT_CW]: ROTATE_90_LEFT_CW,
  [ANIMATIONS.ROTATE_90_LEFT_CCW]: ROTATE_90_LEFT_CCW,
  [ANIMATIONS.ROTATE_90_TL_CW]: ROTATE_90_TL_CW,
  [ANIMATIONS.ROTATE_90_TL_CCW]: ROTATE_90_TL_CCW,
  [ANIMATIONS.ROTATE_90_HORIZONTAL_FWD]: ROTATE_90_HORIZONTAL_FWD,
  [ANIMATIONS.ROTATE_90_HORIZONTAL_BCK]: ROTATE_90_HORIZONTAL_BCK,
  [ANIMATIONS.ROTATE_90_VERTICAL_FWD]: ROTATE_90_VERTICAL_FWD,
  [ANIMATIONS.ROTATE_90_VERTICAL_BCK]: ROTATE_90_VERTICAL_BCK
};
