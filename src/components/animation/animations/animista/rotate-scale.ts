import { ANIMATIONS } from './common';

const ROTATE_SCALE_DEFAULT: Keyframe = {
  easing: 'linear',
  fillMode: 'both'
};

const ROTATE_SCALE_UP: Keyframe[] = [
  { offset: 0, ...ROTATE_SCALE_DEFAULT, transform: 'scale(1) rotateZ(0)' },
  { offset: 0.5, ...ROTATE_SCALE_DEFAULT, transform: 'scale(2) rotateZ(180deg)' },
  { offset: 1, ...ROTATE_SCALE_DEFAULT, transform: 'scale(1) rotateZ(360deg)' }
];

const ROTATE_SCALE_DOWN: Keyframe[] = [
  { offset: 0, ...ROTATE_SCALE_DEFAULT, transform: 'scale(1) rotateZ(0)' },
  { offset: 0.5, ...ROTATE_SCALE_DEFAULT, transform: 'scale(0.5) rotateZ(180deg)' },
  { offset: 1, ...ROTATE_SCALE_DEFAULT, transform: 'scale(1) rotateZ(360deg)' }
];

const ROTATE_SCALE_UP_HOR: Keyframe[] = [
  { offset: 0, ...ROTATE_SCALE_DEFAULT, transform: 'scale(1) rotateX(0)' },
  { offset: 0.5, ...ROTATE_SCALE_DEFAULT, transform: 'scale(2) rotateX(-180deg)' },
  { offset: 1, ...ROTATE_SCALE_DEFAULT, transform: 'scale(1) rotateX(-360deg)' }
];

const ROTATE_SCALE_DOWN_HOR: Keyframe[] = [
  { offset: 0, ...ROTATE_SCALE_DEFAULT, transform: 'scale(1) rotateX(0)' },
  { offset: 0.5, ...ROTATE_SCALE_DEFAULT, transform: 'scale(0.5) rotateX(-180deg)' },
  { offset: 1, ...ROTATE_SCALE_DEFAULT, transform: 'scale(1) rotateX(-360deg)' }
];

const ROTATE_SCALE_UP_VER: Keyframe[] = [
  { offset: 0, ...ROTATE_SCALE_DEFAULT, transform: 'scale(1) rotateY(0)' },
  { offset: 0.5, ...ROTATE_SCALE_DEFAULT, transform: 'scale(2) rotateY(180deg)' },
  { offset: 1, ...ROTATE_SCALE_DEFAULT, transform: 'scale(1) rotateY(360deg)' }
];

const ROTATE_SCALE_DOWN_VER: Keyframe[] = [
  { offset: 0, ...ROTATE_SCALE_DEFAULT, transform: 'scale(1) rotateY(0)' },
  { offset: 0.5, ...ROTATE_SCALE_DEFAULT, transform: 'scale(0.5) rotateY(180deg)' },
  { offset: 1, ...ROTATE_SCALE_DEFAULT, transform: 'scale(1) rotateY(360deg)' }
];

const ROTATE_SCALE_UP_DIAG_1: Keyframe[] = [
  { offset: 0, ...ROTATE_SCALE_DEFAULT, transform: 'scale(1) rotate3d(1, 1, 0, 0deg)' },
  { offset: 0.5, ...ROTATE_SCALE_DEFAULT, transform: 'scale(2) rotate3d(1, 1, 0, -180deg)' },
  { offset: 1, ...ROTATE_SCALE_DEFAULT, transform: 'scale(1) rotate3d(1, 1, 0, -360deg)' }
];

const ROTATE_SCALE_DOWN_DIAG_1: Keyframe[] = [
  { offset: 0, ...ROTATE_SCALE_DEFAULT, transform: 'scale(1) rotate3d(1, 1, 0, 0deg)' },
  { offset: 0.5, ...ROTATE_SCALE_DEFAULT, transform: 'scale(0.5) rotate3d(1, 1, 0, -180deg)' },
  { offset: 1, ...ROTATE_SCALE_DEFAULT, transform: 'scale(1) rotate3d(1, 1, 0, -360deg)' }
];

const ROTATE_SCALE_UP_DIAG_2: Keyframe[] = [
  { offset: 0, ...ROTATE_SCALE_DEFAULT, transform: 'scale(1) rotate3d(-1, 1, 0, 0deg)' },
  { offset: 0.5, ...ROTATE_SCALE_DEFAULT, transform: 'scale(2) rotate3d(-1, 1, 0, 180deg)' },
  { offset: 1, ...ROTATE_SCALE_DEFAULT, transform: 'scale(1) rotate3d(-1, 1, 0, 360deg)' }
];

const ROTATE_SCALE_DOWN_DIAG_2: Keyframe[] = [
  { offset: 0, ...ROTATE_SCALE_DEFAULT, transform: 'scale(1) rotate3d(-1, 1, 0, 0deg)' },
  { offset: 0.5, ...ROTATE_SCALE_DEFAULT, transform: 'scale(0.5) rotate3d(-1, 1, 0, 180deg)' },
  { offset: 1, ...ROTATE_SCALE_DEFAULT, transform: 'scale(1) rotate3d(-1, 1, 0, 360deg)' }
];

export default {
  [ANIMATIONS.ROTATE_SCALE_UP]: ROTATE_SCALE_UP,
  [ANIMATIONS.ROTATE_SCALE_DOWN]: ROTATE_SCALE_DOWN,
  [ANIMATIONS.ROTATE_SCALE_UP_HOR]: ROTATE_SCALE_UP_HOR,
  [ANIMATIONS.ROTATE_SCALE_DOWN_HOR]: ROTATE_SCALE_DOWN_HOR,
  [ANIMATIONS.ROTATE_SCALE_UP_VER]: ROTATE_SCALE_UP_VER,
  [ANIMATIONS.ROTATE_SCALE_DOWN_VER]: ROTATE_SCALE_DOWN_VER,
  [ANIMATIONS.ROTATE_SCALE_UP_DIAG_1]: ROTATE_SCALE_UP_DIAG_1,
  [ANIMATIONS.ROTATE_SCALE_DOWN_DIAG_1]: ROTATE_SCALE_DOWN_DIAG_1,
  [ANIMATIONS.ROTATE_SCALE_UP_DIAG_2]: ROTATE_SCALE_UP_DIAG_2,
  [ANIMATIONS.ROTATE_SCALE_DOWN_DIAG_2]: ROTATE_SCALE_DOWN_DIAG_2
};
