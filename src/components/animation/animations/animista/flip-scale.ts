import { ANIMATIONS } from './common';

const FLIP_SCALE_DEFAULT: Keyframe = {
  easing: 'linear',
  fillMode: 'both'
};

const FLIP_SCALE_UP_HOR: Keyframe[] = [
  { offset: 0, ...FLIP_SCALE_DEFAULT, transform: 'scale(1) rotateX(0)' },
  { offset: 0.5, ...FLIP_SCALE_DEFAULT, transform: 'scale(2.5) rotateX(-90deg)' },
  { offset: 1, ...FLIP_SCALE_DEFAULT, transform: 'scale(1) rotateX(-180deg)' }
];

const FLIP_SCALE_DOWN_HOR: Keyframe[] = [
  { offset: 0, ...FLIP_SCALE_DEFAULT, transform: 'scale(1) rotateX(0)' },
  { offset: 0.5, ...FLIP_SCALE_DEFAULT, transform: 'scale(0.4) rotateX(90deg)' },
  { offset: 1, ...FLIP_SCALE_DEFAULT, transform: 'scale(1) rotateX(180deg)' }
];

const FLIP_SCALE_UP_VER: Keyframe[] = [
  { offset: 0, ...FLIP_SCALE_DEFAULT, transform: 'scale(1) rotateY(0)' },
  { offset: 0.5, ...FLIP_SCALE_DEFAULT, transform: 'scale(2.5) rotateY(90deg)' },
  { offset: 1, ...FLIP_SCALE_DEFAULT, transform: 'scale(1) rotateY(180deg)' }
];

const FLIP_SCALE_DOWN_VER: Keyframe[] = [
  { offset: 0, ...FLIP_SCALE_DEFAULT, transform: 'scale(1) rotateY(0)' },
  { offset: 0.5, ...FLIP_SCALE_DEFAULT, transform: 'scale(0.4) rotateY(-90deg)' },
  { offset: 1, ...FLIP_SCALE_DEFAULT, transform: 'scale(1) rotateY(-180deg)' }
];

const FLIP_SCALE_UP_DIAG_1: Keyframe[] = [
  { offset: 0, ...FLIP_SCALE_DEFAULT, transform: 'scale(1) rotate3d(1, 1, 0, 0deg)' },
  { offset: 0.5, ...FLIP_SCALE_DEFAULT, transform: 'scale(2.5) rotate3d(1, 1, 0, 90deg)' },
  { offset: 1, ...FLIP_SCALE_DEFAULT, transform: 'scale(1) rotate3d(1, 1, 0, 180deg)' }
];

const FLIP_SCALE_DOWN_DIAG_1: Keyframe[] = [
  { offset: 0, ...FLIP_SCALE_DEFAULT, transform: 'scale(1) rotate3d(1, 1, 0, 0deg)' },
  { offset: 0.5, ...FLIP_SCALE_DEFAULT, transform: 'scale(0.4) rotate3d(1, 1, 0, -90deg)' },
  { offset: 1, ...FLIP_SCALE_DEFAULT, transform: 'scale(1) rotate3d(1, 1, 0, -180deg)' }
];

const FLIP_SCALE_UP_DIAG_2: Keyframe[] = [
  { offset: 0, ...FLIP_SCALE_DEFAULT, transform: 'scale(1) rotate3d(-1, 1, 0, 0deg)' },
  { offset: 0.5, ...FLIP_SCALE_DEFAULT, transform: 'scale(2.5) rotate3d(-1, 1, 0, 90deg)' },
  { offset: 1, ...FLIP_SCALE_DEFAULT, transform: 'scale(1) rotate3d(-1, 1, 0, 180deg)' }
];

const FLIP_SCALE_DOWN_DIAG_2: Keyframe[] = [
  { offset: 0, ...FLIP_SCALE_DEFAULT, transform: 'scale(1) rotate3d(-1, 1, 0, 0deg)' },
  { offset: 0.5, ...FLIP_SCALE_DEFAULT, transform: 'scale(0.4) rotate3d(-1, 1, 0, -90deg)' },
  { offset: 1, ...FLIP_SCALE_DEFAULT, transform: 'scale(1) rotate3d(-1, 1, 0, -180deg)' }
];

export default {
  [ANIMATIONS.FLIP_SCALE_UP_HOR]: FLIP_SCALE_UP_HOR,
  [ANIMATIONS.FLIP_SCALE_DOWN_HOR]: FLIP_SCALE_DOWN_HOR,
  [ANIMATIONS.FLIP_SCALE_UP_VER]: FLIP_SCALE_UP_VER,
  [ANIMATIONS.FLIP_SCALE_DOWN_VER]: FLIP_SCALE_DOWN_VER,
  [ANIMATIONS.FLIP_SCALE_UP_DIAG_1]: FLIP_SCALE_UP_DIAG_1,
  [ANIMATIONS.FLIP_SCALE_DOWN_DIAG_1]: FLIP_SCALE_DOWN_DIAG_1,
  [ANIMATIONS.FLIP_SCALE_UP_DIAG_2]: FLIP_SCALE_UP_DIAG_2,
  [ANIMATIONS.FLIP_SCALE_DOWN_DIAG_2]: FLIP_SCALE_DOWN_DIAG_2
};
