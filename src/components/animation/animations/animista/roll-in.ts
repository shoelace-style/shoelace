import { ANIMATIONS } from './common';

const ROLL_IN_DEFAULT: Keyframe = {
  easing: 'ease-out',
  fillMode: 'both'
};

const ROLL_IN_LEFT: Keyframe[] = [
  {
    offset: 0,
    ...ROLL_IN_DEFAULT,
    transform: 'translateX(-800px) rotate(-540deg)',
    opacity: 0
  },
  {
    offset: 1,
    ...ROLL_IN_DEFAULT,
    transform: 'translateX(0) rotate(0deg)',
    opacity: 1
  }
];

const ROLL_IN_TOP: Keyframe[] = [
  {
    offset: 0,
    ...ROLL_IN_DEFAULT,
    transform: 'translateY(-800px) rotate(-540deg)',
    opacity: 0
  },
  {
    offset: 1,
    ...ROLL_IN_DEFAULT,
    transform: 'translateY(0) rotate(0deg)',
    opacity: 1
  }
];

const ROLL_IN_RIGHT: Keyframe[] = [
  {
    offset: 0,
    ...ROLL_IN_DEFAULT,
    transform: 'translateX(800px) rotate(540deg)',
    opacity: 0
  },
  {
    offset: 1,
    ...ROLL_IN_DEFAULT,
    transform: 'translateX(0) rotate(0deg)',
    opacity: 1
  }
];

const ROLL_IN_BOTTOM: Keyframe[] = [
  {
    offset: 0,
    ...ROLL_IN_DEFAULT,
    transform: 'translateY(800px) rotate(540deg)',
    opacity: 0
  },
  {
    offset: 1,
    ...ROLL_IN_DEFAULT,
    transform: 'translateY(0) rotate(0deg)',
    opacity: 1
  }
];

export default {
  [ANIMATIONS.ROLL_IN_LEFT]: ROLL_IN_LEFT,
  [ANIMATIONS.ROLL_IN_TOP]: ROLL_IN_TOP,
  [ANIMATIONS.ROLL_IN_RIGHT]: ROLL_IN_RIGHT,
  [ANIMATIONS.ROLL_IN_BOTTOM]: ROLL_IN_BOTTOM
};
