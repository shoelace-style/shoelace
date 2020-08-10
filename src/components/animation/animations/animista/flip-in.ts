import { ANIMATIONS } from './common';

const FLIP_IN_DEFAULT: Keyframe = {
  easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
  fillMode: 'both',
  transformOrigin: 'center center'
};

const FLIP_IN_HOR_BOTTOM: Keyframe[] = [
  { offset: 0, ...FLIP_IN_DEFAULT, transform: 'rotateX(80deg)', opacity: 0 },
  { offset: 1, ...FLIP_IN_DEFAULT, transform: 'rotateX(0)', opacity: 1 }
];

const FLIP_IN_HOR_TOP: Keyframe[] = [
  { offset: 0, ...FLIP_IN_DEFAULT, transform: 'rotateX(-80deg)', opacity: 0 },
  { offset: 1, ...FLIP_IN_DEFAULT, transform: 'rotateX(0)', opacity: 1 }
];

const FLIP_IN_VER_RIGHT: Keyframe[] = [
  { offset: 0, ...FLIP_IN_DEFAULT, transform: 'rotateY(-80deg)', opacity: 0 },
  { offset: 1, ...FLIP_IN_DEFAULT, transform: 'rotateY(0)', opacity: 1 }
];

const FLIP_IN_VER_LEFT: Keyframe[] = [
  { offset: 0, ...FLIP_IN_DEFAULT, transform: 'rotateY(80deg)', opacity: 0 },
  { offset: 1, ...FLIP_IN_DEFAULT, transform: 'rotateY(0)', opacity: 1 }
];

const FLIP_IN_DIAG_1_TR: Keyframe[] = [
  { offset: 0, ...FLIP_IN_DEFAULT, transform: 'rotate3d(1, 1, 0, -80deg)', opacity: 0 },
  { offset: 1, ...FLIP_IN_DEFAULT, transform: 'rotate3d(1, 1, 0, 0deg)', opacity: 1 }
];

const FLIP_IN_DIAG_1_BL: Keyframe[] = [
  { offset: 0, ...FLIP_IN_DEFAULT, transform: 'rotate3d(1, 1, 0, 80deg)', opacity: 0 },
  { offset: 1, ...FLIP_IN_DEFAULT, transform: 'rotate3d(1, 1, 0, 0deg)', opacity: 1 }
];

const FLIP_IN_DIAG_2_TL: Keyframe[] = [
  { offset: 0, ...FLIP_IN_DEFAULT, transform: 'rotate3d(-1, 1, 0, 80deg)', opacity: 0 },
  { offset: 1, ...FLIP_IN_DEFAULT, transform: 'rotate3d(1, 1, 0, 0deg)', opacity: 1 }
];

const FLIP_IN_DIAG_2_BR: Keyframe[] = [
  { offset: 0, ...FLIP_IN_DEFAULT, transform: 'rotate3d(-1, 1, 0, -80deg)', opacity: 0 },
  { offset: 1, ...FLIP_IN_DEFAULT, transform: 'rotate3d(1, 1, 0, 0deg)', opacity: 1 }
];

export default {
  [ANIMATIONS.FLIP_IN_HOR_BOTTOM]: FLIP_IN_HOR_BOTTOM,
  [ANIMATIONS.FLIP_IN_HOR_TOP]: FLIP_IN_HOR_TOP,
  [ANIMATIONS.FLIP_IN_VER_RIGHT]: FLIP_IN_VER_RIGHT,
  [ANIMATIONS.FLIP_IN_VER_LEFT]: FLIP_IN_VER_LEFT,
  [ANIMATIONS.FLIP_IN_DIAG_1_TR]: FLIP_IN_DIAG_1_TR,
  [ANIMATIONS.FLIP_IN_DIAG_1_BL]: FLIP_IN_DIAG_1_BL,
  [ANIMATIONS.FLIP_IN_DIAG_2_TL]: FLIP_IN_DIAG_2_TL,
  [ANIMATIONS.FLIP_IN_DIAG_2_BR]: FLIP_IN_DIAG_2_BR
};
