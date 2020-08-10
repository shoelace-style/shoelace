import { ANIMATIONS } from './common';

const SWING_IN_DEFAULT: Keyframe = {
  easing: 'cubic-bezier(0.175, 0.885, 0.320, 1.275)',
  fillMode: 'both'
};

const SWING_IN_TOP_FWD: Keyframe[] = [
  {
    offset: 0,
    ...SWING_IN_DEFAULT,
    transform: 'rotateX(-100deg)',
    transformOrigin: 'top',
    opacity: 0
  },
  {
    offset: 1,
    ...SWING_IN_DEFAULT,
    transform: 'rotateX(0deg)',
    transformOrigin: 'top',
    opacity: 1
  }
];

const SWING_IN_TOP_BCK: Keyframe[] = [
  {
    offset: 0,
    ...SWING_IN_DEFAULT,
    transform: 'rotateX(70deg)',
    transformOrigin: 'top',
    opacity: 0
  },
  {
    offset: 1,
    ...SWING_IN_DEFAULT,
    transform: 'rotateX(0deg)',
    transformOrigin: 'top',
    opacity: 1
  }
];

const SWING_IN_RIGHT_FWD: Keyframe[] = [
  {
    offset: 0,
    ...SWING_IN_DEFAULT,
    transform: 'rotateY(-100deg)',
    transformOrigin: 'right',
    opacity: 0
  },
  {
    offset: 1,
    ...SWING_IN_DEFAULT,
    transform: 'rotateY(0)',
    transformOrigin: 'right',
    opacity: 1
  }
];

const SWING_IN_RIGHT_BCK: Keyframe[] = [
  {
    offset: 0,
    ...SWING_IN_DEFAULT,
    transform: 'rotateY(70deg)',
    transformOrigin: 'right',
    opacity: 0
  },
  {
    offset: 1,
    ...SWING_IN_DEFAULT,
    transform: 'rotateY(0)',
    transformOrigin: 'right',
    opacity: 1
  }
];

const SWING_IN_BOTTOM_FWD: Keyframe[] = [
  {
    offset: 0,
    ...SWING_IN_DEFAULT,
    transform: 'rotateX(100deg)',
    transformOrigin: 'bottom',
    opacity: 0
  },
  {
    offset: 1,
    ...SWING_IN_DEFAULT,
    transform: 'rotateX(0)',
    transformOrigin: 'bottom',
    opacity: 1
  }
];

const SWING_IN_BOTTOM_BCK: Keyframe[] = [
  {
    offset: 0,
    ...SWING_IN_DEFAULT,
    transform: 'rotateX(-70deg)',
    transformOrigin: 'bottom',
    opacity: 0
  },
  {
    offset: 1,
    ...SWING_IN_DEFAULT,
    transform: 'rotateX(0)',
    transformOrigin: 'bottom',
    opacity: 1
  }
];

const SWING_IN_LEFT_FWD: Keyframe[] = [
  {
    offset: 0,
    ...SWING_IN_DEFAULT,
    transform: 'rotateY(100deg)',
    transformOrigin: 'left',
    opacity: 0
  },
  {
    offset: 1,
    ...SWING_IN_DEFAULT,
    transform: 'rotateY(0)',
    transformOrigin: 'left',
    opacity: 1
  }
];

const SWING_IN_LEFT_BCK: Keyframe[] = [
  {
    offset: 0,
    ...SWING_IN_DEFAULT,
    transform: 'rotateY(-70deg)',
    transformOrigin: 'left',
    opacity: 0
  },
  {
    offset: 1,
    ...SWING_IN_DEFAULT,
    transform: 'rotateY(0)',
    transformOrigin: 'left',
    opacity: 1
  }
];

export default {
  [ANIMATIONS.SWING_IN_TOP_FWD]: SWING_IN_TOP_FWD,
  [ANIMATIONS.SWING_IN_TOP_BCK]: SWING_IN_TOP_BCK,
  [ANIMATIONS.SWING_IN_RIGHT_FWD]: SWING_IN_RIGHT_FWD,
  [ANIMATIONS.SWING_IN_RIGHT_BCK]: SWING_IN_RIGHT_BCK,
  [ANIMATIONS.SWING_IN_BOTTOM_FWD]: SWING_IN_BOTTOM_FWD,
  [ANIMATIONS.SWING_IN_BOTTOM_BCK]: SWING_IN_BOTTOM_BCK,
  [ANIMATIONS.SWING_IN_LEFT_FWD]: SWING_IN_LEFT_FWD,
  [ANIMATIONS.SWING_IN_LEFT_BCK]: SWING_IN_LEFT_BCK
};
