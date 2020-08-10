import { ANIMATIONS } from './common';

const FLIP_DEFAULT: Keyframe = {
  easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
  fillMode: 'both'
};

const FLIP_HORIZONTAL_BOTTOM: Keyframe[] = [
  { offset: 0, ...FLIP_DEFAULT, transform: 'rotateX(0)' },
  { offset: 1, ...FLIP_DEFAULT, transform: 'rotateX(-180deg)' }
];

const FLIP_HORIZONTAL_TOP: Keyframe[] = [
  { offset: 0, ...FLIP_DEFAULT, transform: 'rotateX(0)' },
  { offset: 1, ...FLIP_DEFAULT, transform: 'rotateX(180deg)' }
];

const FLIP_HORIZONTAL_BCK: Keyframe[] = [
  { offset: 0, ...FLIP_DEFAULT, transform: 'translateZ(0) rotateX(0)' },
  { offset: 1, ...FLIP_DEFAULT, transform: 'translateZ(-260px) rotateX(180deg)' }
];

const FLIP_HORIZONTAL_FWD: Keyframe[] = [
  { offset: 0, ...FLIP_DEFAULT, transform: 'translateZ(0) rotateX(0)' },
  { offset: 1, ...FLIP_DEFAULT, transform: 'translateZ(160px) rotateX(-180deg)' }
];

const FLIP_VERTICAL_RIGHT: Keyframe[] = [
  { offset: 0, ...FLIP_DEFAULT, transform: 'rotateY(0)' },
  { offset: 1, ...FLIP_DEFAULT, transform: 'rotateY(180deg)' }
];

const FLIP_VERTICAL_LEFT: Keyframe[] = [
  { offset: 0, ...FLIP_DEFAULT, transform: 'rotateY(0)' },
  { offset: 1, ...FLIP_DEFAULT, transform: 'rotateY(-180deg)' }
];

const FLIP_VERTICAL_BCK: Keyframe[] = [
  { offset: 0, ...FLIP_DEFAULT, transform: 'translateZ(0) rotateY(0)' },
  { offset: 1, ...FLIP_DEFAULT, transform: 'translateZ(-260px) rotateY(-180deg)' }
];

const FLIP_VERTICAL_FWD: Keyframe[] = [
  { offset: 0, ...FLIP_DEFAULT, transform: 'translateZ(0) rotateY(0)' },
  { offset: 1, ...FLIP_DEFAULT, transform: 'translateZ(160px) rotateY(180deg)' }
];

const FLIP_DIAGONAL_1_TR: Keyframe[] = [
  { offset: 0, ...FLIP_DEFAULT, transform: 'rotate3d(1, 1, 0, 0deg)' },
  { offset: 1, ...FLIP_DEFAULT, transform: 'rotate3d(1, 1, 0, 180deg)' }
];

const FLIP_DIAGONAL_1_BL: Keyframe[] = [
  { offset: 0, ...FLIP_DEFAULT, transform: 'rotate3d(1, 1, 0, 0deg)' },
  { offset: 1, ...FLIP_DEFAULT, transform: 'rotate3d(1, 1, 0, -180deg)' }
];

const FLIP_DIAGONAL_1_BCK: Keyframe[] = [
  { offset: 0, ...FLIP_DEFAULT, transform: 'translateZ(0) rotate3d(1, 1, 0, 0deg)' },
  { offset: 1, ...FLIP_DEFAULT, transform: 'translateZ(-260px) rotate3d(1, 1, 0, -180deg)' }
];

const FLIP_DIAGONAL_1_FWD: Keyframe[] = [
  { offset: 0, ...FLIP_DEFAULT, transform: 'translateZ(0) rotate3d(1, 1, 0, 0deg)' },
  { offset: 1, ...FLIP_DEFAULT, transform: 'translateZ(160px) rotate3d(1, 1, 0, 180deg)' }
];

const FLIP_DIAGONAL_2_BR: Keyframe[] = [
  { offset: 0, ...FLIP_DEFAULT, transform: 'rotate3d(-1, 1, 0, 0deg)' },
  { offset: 1, ...FLIP_DEFAULT, transform: 'rotate3d(-1, 1, 0, 180deg)' }
];

const FLIP_DIAGONAL_2_TL: Keyframe[] = [
  { offset: 0, ...FLIP_DEFAULT, transform: 'rotate3d(-1, 1, 0, 0deg)' },
  { offset: 1, ...FLIP_DEFAULT, transform: 'rotate3d(-1, 1, 0, -180deg)' }
];

const FLIP_DIAGONAL_2_BCK: Keyframe[] = [
  { offset: 0, ...FLIP_DEFAULT, transform: 'translateZ(0) rotate3d(-1, 1, 0, 0deg)' },
  { offset: 1, ...FLIP_DEFAULT, transform: 'translateZ(-260px) rotate3d(-1, 1, 0, -180deg)' }
];

const FLIP_DIAGONAL_2_FWD: Keyframe[] = [
  { offset: 0, ...FLIP_DEFAULT, transform: 'translateZ(0) rotate3d(-1, 1, 0, 0deg)' },
  { offset: 1, ...FLIP_DEFAULT, transform: 'translateZ(160px) rotate3d(-1, 1, 0, 180deg)' }
];

export default {
  [ANIMATIONS.FLIP_HORIZONTAL_BOTTOM]: FLIP_HORIZONTAL_BOTTOM,
  [ANIMATIONS.FLIP_HORIZONTAL_TOP]: FLIP_HORIZONTAL_TOP,
  [ANIMATIONS.FLIP_HORIZONTAL_BCK]: FLIP_HORIZONTAL_BCK,
  [ANIMATIONS.FLIP_HORIZONTAL_FWD]: FLIP_HORIZONTAL_FWD,
  [ANIMATIONS.FLIP_VERTICAL_RIGHT]: FLIP_VERTICAL_RIGHT,
  [ANIMATIONS.FLIP_VERTICAL_LEFT]: FLIP_VERTICAL_LEFT,
  [ANIMATIONS.FLIP_VERTICAL_BCK]: FLIP_VERTICAL_BCK,
  [ANIMATIONS.FLIP_VERTICAL_FWD]: FLIP_VERTICAL_FWD,
  [ANIMATIONS.FLIP_DIAGONAL_1_TR]: FLIP_DIAGONAL_1_TR,
  [ANIMATIONS.FLIP_DIAGONAL_1_BL]: FLIP_DIAGONAL_1_BL,
  [ANIMATIONS.FLIP_DIAGONAL_1_BCK]: FLIP_DIAGONAL_1_BCK,
  [ANIMATIONS.FLIP_DIAGONAL_1_FWD]: FLIP_DIAGONAL_1_FWD,
  [ANIMATIONS.FLIP_DIAGONAL_2_BR]: FLIP_DIAGONAL_2_BR,
  [ANIMATIONS.FLIP_DIAGONAL_2_TL]: FLIP_DIAGONAL_2_TL,
  [ANIMATIONS.FLIP_DIAGONAL_2_BCK]: FLIP_DIAGONAL_2_BCK,
  [ANIMATIONS.FLIP_DIAGONAL_2_FWD]: FLIP_DIAGONAL_2_FWD
};
