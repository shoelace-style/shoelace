import { ANIMATIONS } from './common';

const ROTATE_IN_DEFAULT: Keyframe = {
  easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
  fillMode: 'both',
  transformOrigin: 'center center'
};

const ROTATE_IN_CENTER: Keyframe[] = [
  { offset: 0, ...ROTATE_IN_DEFAULT, transform: 'rotate(-360deg)', opacity: 0 },
  { offset: 1, ...ROTATE_IN_DEFAULT, transform: 'rotate(0)', opacity: 1 }
];

const ROTATE_IN_TOP: Keyframe[] = [
  { offset: 0, ...ROTATE_IN_DEFAULT, transform: 'rotate(-360deg)', transformOrigin: 'top', opacity: 0 },
  { offset: 1, ...ROTATE_IN_DEFAULT, transform: 'rotate(0)', transformOrigin: 'top', opacity: 1 }
];

const ROTATE_IN_TR: Keyframe[] = [
  { offset: 0, ...ROTATE_IN_DEFAULT, transform: 'rotate(-360deg)', transformOrigin: 'top right', opacity: 0 },
  { offset: 1, ...ROTATE_IN_DEFAULT, transform: 'rotate(0)', transformOrigin: 'top right', opacity: 1 }
];

const ROTATE_IN_RIGHT: Keyframe[] = [
  { offset: 0, ...ROTATE_IN_DEFAULT, transform: 'rotate(-360deg)', transformOrigin: 'right', opacity: 0 },
  { offset: 1, ...ROTATE_IN_DEFAULT, transform: 'rotate(0)', transformOrigin: 'right', opacity: 1 }
];

const ROTATE_IN_BR: Keyframe[] = [
  { offset: 0, ...ROTATE_IN_DEFAULT, transform: 'rotate(-360deg)', transformOrigin: 'bottom right', opacity: 0 },
  { offset: 1, ...ROTATE_IN_DEFAULT, transform: 'rotate(0)', transformOrigin: 'bottom right', opacity: 1 }
];

const ROTATE_IN_BOTTOM: Keyframe[] = [
  { offset: 0, ...ROTATE_IN_DEFAULT, transform: 'rotate(-360deg)', transformOrigin: 'bottom', opacity: 0 },
  { offset: 1, ...ROTATE_IN_DEFAULT, transform: 'rotate(0)', transformOrigin: 'bottom', opacity: 1 }
];

const ROTATE_IN_BL: Keyframe[] = [
  { offset: 0, ...ROTATE_IN_DEFAULT, transform: 'rotate(-360deg)', transformOrigin: 'bottom left', opacity: 0 },
  { offset: 1, ...ROTATE_IN_DEFAULT, transform: 'rotate(0)', transformOrigin: 'bottom left', opacity: 1 }
];

const ROTATE_IN_LEFT: Keyframe[] = [
  { offset: 0, ...ROTATE_IN_DEFAULT, transform: 'rotate(-360deg)', transformOrigin: 'left', opacity: 0 },
  { offset: 1, ...ROTATE_IN_DEFAULT, transform: 'rotate(0)', transformOrigin: 'left', opacity: 1 }
];

const ROTATE_IN_TL: Keyframe[] = [
  { offset: 0, ...ROTATE_IN_DEFAULT, transform: 'rotate(-360deg)', transformOrigin: 'top left', opacity: 0 },
  { offset: 1, ...ROTATE_IN_DEFAULT, transform: 'rotate(0)', transformOrigin: 'top left', opacity: 1 }
];

const ROTATE_IN_HOR: Keyframe[] = [
  { offset: 0, ...ROTATE_IN_DEFAULT, transform: 'rotate(360deg)', opacity: 0 },
  { offset: 1, ...ROTATE_IN_DEFAULT, transform: 'rotate(0)', opacity: 1 }
];

const ROTATE_IN_VER: Keyframe[] = [
  { offset: 0, ...ROTATE_IN_DEFAULT, transform: 'rotate(-360deg)', opacity: 0 },
  { offset: 1, ...ROTATE_IN_DEFAULT, transform: 'rotate(0)', opacity: 1 }
];

const ROTATE_IN_DIAG_1: Keyframe[] = [
  { offset: 0, ...ROTATE_IN_DEFAULT, transform: 'rotate3d(1, 1, 0, -360deg)', opacity: 0 },
  { offset: 1, ...ROTATE_IN_DEFAULT, transform: 'rotate3d(1, 1, 0, 0deg)', opacity: 1 }
];

const ROTATE_IN_DIAG_2: Keyframe[] = [
  { offset: 0, ...ROTATE_IN_DEFAULT, transform: 'rotate3d(-1, 1, 0, -360deg)', opacity: 0 },
  { offset: 1, ...ROTATE_IN_DEFAULT, transform: 'rotate3d(-1, 1, 0, 0deg)', opacity: 1 }
];

export default {
  [ANIMATIONS.ROTATE_IN_CENTER]: ROTATE_IN_CENTER,
  [ANIMATIONS.ROTATE_IN_TOP]: ROTATE_IN_TOP,
  [ANIMATIONS.ROTATE_IN_TR]: ROTATE_IN_TR,
  [ANIMATIONS.ROTATE_IN_RIGHT]: ROTATE_IN_RIGHT,
  [ANIMATIONS.ROTATE_IN_BR]: ROTATE_IN_BR,
  [ANIMATIONS.ROTATE_IN_BOTTOM]: ROTATE_IN_BOTTOM,
  [ANIMATIONS.ROTATE_IN_BL]: ROTATE_IN_BL,
  [ANIMATIONS.ROTATE_IN_LEFT]: ROTATE_IN_LEFT,
  [ANIMATIONS.ROTATE_IN_TL]: ROTATE_IN_TL,
  [ANIMATIONS.ROTATE_IN_HOR]: ROTATE_IN_HOR,
  [ANIMATIONS.ROTATE_IN_VER]: ROTATE_IN_VER,
  [ANIMATIONS.ROTATE_IN_DIAG_1]: ROTATE_IN_DIAG_1,
  [ANIMATIONS.ROTATE_IN_DIAG_2]: ROTATE_IN_DIAG_2
};
