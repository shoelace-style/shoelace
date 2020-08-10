import { ANIMATIONS } from './common';

const SWING_DEFAULT: Keyframe = {
  easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
  fillMode: 'both'
};

const SWING_TOP_FWD: Keyframe[] = [
  { offset: 0, ...SWING_DEFAULT, transform: 'rotateX(0)', transformOrigin: 'top' },
  { offset: 1, ...SWING_DEFAULT, transform: 'rotateX(180deg)', transformOrigin: 'top' }
];

const SWING_TOP_BCK: Keyframe[] = [
  { offset: 0, ...SWING_DEFAULT, transform: 'rotateX(0)', transformOrigin: 'top' },
  { offset: 1, ...SWING_DEFAULT, transform: 'rotateX(-180deg)', transformOrigin: 'top' }
];

const SWING_TOP_RIGHT_FWD: Keyframe[] = [
  { offset: 0, ...SWING_DEFAULT, transform: 'rotate3d(1, 1, 0, 0deg)', transformOrigin: '100% 0%' },
  { offset: 1, ...SWING_DEFAULT, transform: 'rotate3d(1, 1, 0, 180deg)', transformOrigin: '100% 0%' }
];

const SWING_TOP_RIGHT_BCK: Keyframe[] = [
  { offset: 0, ...SWING_DEFAULT, transform: 'rotate3d(1, 1, 0, 0deg)', transformOrigin: '100% 0%' },
  { offset: 1, ...SWING_DEFAULT, transform: 'rotate3d(1, 1, 0, -180deg)', transformOrigin: '100% 0%' }
];

const SWING_RIGHT_FWD: Keyframe[] = [
  { offset: 0, ...SWING_DEFAULT, transform: 'rotateY(0)', transformOrigin: 'right' },
  { offset: 1, ...SWING_DEFAULT, transform: 'rotateY(180deg)', transformOrigin: 'right' }
];

const SWING_RIGHT_BCK: Keyframe[] = [
  { offset: 0, ...SWING_DEFAULT, transform: 'rotateY(0)', transformOrigin: 'right' },
  { offset: 1, ...SWING_DEFAULT, transform: 'rotateY(-180deg)', transformOrigin: 'right' }
];

const SWING_BOTTOM_RIGHT_FWD: Keyframe[] = [
  { offset: 0, ...SWING_DEFAULT, transform: 'rotate3d(-1, 1, 0, 0deg)', transformOrigin: '100% 100%' },
  { offset: 1, ...SWING_DEFAULT, transform: 'rotate3d(-1, 1, 0, 180deg)', transformOrigin: '100% 100%' }
];

const SWING_BOTTOM_RIGHT_BCK: Keyframe[] = [
  { offset: 0, ...SWING_DEFAULT, transform: 'rotate3d(-1, 1, 0, 0deg)', transformOrigin: '100% 100%' },
  { offset: 1, ...SWING_DEFAULT, transform: 'rotate3d(-1, 1, 0, -180deg)', transformOrigin: '100% 100%' }
];

const SWING_BOTTOM_FWD: Keyframe[] = [
  { offset: 0, ...SWING_DEFAULT, transform: 'rotateX(0)', transformOrigin: 'bottom' },
  { offset: 1, ...SWING_DEFAULT, transform: 'rotateX(-180deg)', transformOrigin: 'bottom' }
];

const SWING_BOTTOM_BCK: Keyframe[] = [
  { offset: 0, ...SWING_DEFAULT, transform: 'rotateX(0)', transformOrigin: 'bottom' },
  { offset: 1, ...SWING_DEFAULT, transform: 'rotateX(180deg)', transformOrigin: 'bottom' }
];

const SWING_BOTTOM_LEFT_FWD: Keyframe[] = [
  { offset: 0, ...SWING_DEFAULT, transform: 'rotate3d(1, 1, 0, 0deg)', transformOrigin: '0% 100%' },
  { offset: 1, ...SWING_DEFAULT, transform: 'rotate3d(1, 1, 0, -180deg)', transformOrigin: '0% 100%' }
];

const SWING_BOTTOM_LEFT_BCK: Keyframe[] = [
  { offset: 0, ...SWING_DEFAULT, transform: 'rotate3d(1, 1, 0, 0deg)', transformOrigin: '0% 100%' },
  { offset: 1, ...SWING_DEFAULT, transform: 'rotate3d(1, 1, 0, 180deg)', transformOrigin: '0% 100%' }
];

const SWING_LEFT_FWD: Keyframe[] = [
  { offset: 0, ...SWING_DEFAULT, transform: 'rotateY(0)', transformOrigin: 'left bottom' },
  { offset: 1, ...SWING_DEFAULT, transform: 'rotateY(-180deg)', transformOrigin: 'left bottom' }
];

const SWING_LEFT_BCK: Keyframe[] = [
  { offset: 0, ...SWING_DEFAULT, transform: 'rotateY(0)', transformOrigin: 'left bottom' },
  { offset: 1, ...SWING_DEFAULT, transform: 'rotateY(180deg)', transformOrigin: 'left bottom' }
];

const SWING_TOP_LEFT_FWD: Keyframe[] = [
  { offset: 0, ...SWING_DEFAULT, transform: 'rotate3d(-1, 1, 0, 0deg)', transformOrigin: '0% 0%' },
  { offset: 1, ...SWING_DEFAULT, transform: 'rotate3d(-1, 1, 0, -180deg)', transformOrigin: '0% 0%' }
];

const SWING_TOP_LEFT_BCK: Keyframe[] = [
  { offset: 0, ...SWING_DEFAULT, transform: 'rotate3d(-1, 1, 0, 0deg)', transformOrigin: '0% 0%' },
  { offset: 1, ...SWING_DEFAULT, transform: 'rotate3d(-1, 1, 0, 180deg)', transformOrigin: '0% 0%' }
];

export default {
  [ANIMATIONS.SWING_TOP_FWD]: SWING_TOP_FWD,
  [ANIMATIONS.SWING_TOP_BCK]: SWING_TOP_BCK,
  [ANIMATIONS.SWING_TOP_RIGHT_FWD]: SWING_TOP_RIGHT_FWD,
  [ANIMATIONS.SWING_TOP_RIGHT_BCK]: SWING_TOP_RIGHT_BCK,
  [ANIMATIONS.SWING_RIGHT_FWD]: SWING_RIGHT_FWD,
  [ANIMATIONS.SWING_RIGHT_BCK]: SWING_RIGHT_BCK,
  [ANIMATIONS.SWING_BOTTOM_RIGHT_FWD]: SWING_BOTTOM_RIGHT_FWD,
  [ANIMATIONS.SWING_BOTTOM_RIGHT_BCK]: SWING_BOTTOM_RIGHT_BCK,
  [ANIMATIONS.SWING_BOTTOM_FWD]: SWING_BOTTOM_FWD,
  [ANIMATIONS.SWING_BOTTOM_BCK]: SWING_BOTTOM_BCK,
  [ANIMATIONS.SWING_BOTTOM_LEFT_FWD]: SWING_BOTTOM_LEFT_FWD,
  [ANIMATIONS.SWING_BOTTOM_LEFT_BCK]: SWING_BOTTOM_LEFT_BCK,
  [ANIMATIONS.SWING_LEFT_FWD]: SWING_LEFT_FWD,
  [ANIMATIONS.SWING_LEFT_BCK]: SWING_LEFT_BCK,
  [ANIMATIONS.SWING_TOP_LEFT_FWD]: SWING_TOP_LEFT_FWD,
  [ANIMATIONS.SWING_TOP_LEFT_BCK]: SWING_TOP_LEFT_BCK
};
