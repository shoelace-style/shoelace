import { ANIMATIONS } from './common';

const ROLL_IN_BLURRED_DEFAULT: Keyframe = {
  easing: 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
  fillMode: 'both'
};

const ROLL_IN_BLURRED_LEFT: Keyframe[] = [
  {
    offset: 0,
    ...ROLL_IN_BLURRED_DEFAULT,
    transform: 'translateX(-100vw) rotate(-540deg)',
    filter: 'blur(50px)',
    opacity: 0
  },
  {
    offset: 1,
    ...ROLL_IN_BLURRED_DEFAULT,
    transform: 'translateX(0) rotate(0deg)',
    filter: 'blur(0)',
    opacity: 1
  }
];

const ROLL_IN_BLURRED_TOP: Keyframe[] = [
  {
    offset: 0,
    ...ROLL_IN_BLURRED_DEFAULT,
    transform: 'translateY(-100vh) rotate(-720deg)',
    filter: 'blur(50px)',
    opacity: 0
  },
  {
    offset: 1,
    ...ROLL_IN_BLURRED_DEFAULT,
    transform: 'translateY(0) rotate(0deg)',
    filter: 'blur(0)',
    opacity: 1
  }
];

const ROLL_IN_BLURRED_RIGHT: Keyframe[] = [
  {
    offset: 0,
    ...ROLL_IN_BLURRED_DEFAULT,
    transform: 'translateX(100vw) rotate(720deg)',
    filter: 'blur(50px)',
    opacity: 0
  },
  {
    offset: 1,
    ...ROLL_IN_BLURRED_DEFAULT,
    transform: 'translateX(0) rotate(0deg)',
    filter: 'blur(0)',
    opacity: 1
  }
];

const ROLL_IN_BLURRED_BOTTOM: Keyframe[] = [
  {
    offset: 0,
    ...ROLL_IN_BLURRED_DEFAULT,
    transform: 'translateY(800px) rotate(720deg)',
    filter: 'blur(50px)',
    opacity: 0
  },
  {
    offset: 1,
    ...ROLL_IN_BLURRED_DEFAULT,
    transform: 'translateY(0) rotate(0deg)',
    filter: 'blur(0)',
    opacity: 1
  }
];

export default {
  [ANIMATIONS.ROLL_IN_BLURRED_LEFT]: ROLL_IN_BLURRED_LEFT,
  [ANIMATIONS.ROLL_IN_BLURRED_TOP]: ROLL_IN_BLURRED_TOP,
  [ANIMATIONS.ROLL_IN_BLURRED_RIGHT]: ROLL_IN_BLURRED_RIGHT,
  [ANIMATIONS.ROLL_IN_BLURRED_BOTTOM]: ROLL_IN_BLURRED_BOTTOM
};
