import { ANIMATIONS } from './common';

const FADE_IN: Keyframe[] = [
  { offset: 0, opacity: 0 },
  { offset: 1, opacity: 1 }
];

const FADE_IN_UP: Keyframe[] = [
  { offset: 0, opacity: 0, transform: 'translateY(100%)' },
  { offset: 1, opacity: 1, transform: 'translateY(0)' }
];

const FADE_IN_UP_BIG: Keyframe[] = [
  { offset: 0, opacity: 0, transform: 'translateY(100vh)' },
  { offset: 1, opacity: 1, transform: 'translateY(0px)' }
];

const FADE_IN_DOWN: Keyframe[] = [
  { offset: 0, opacity: 0, transform: 'translateY(-100%)' },
  { offset: 1, opacity: 1, transform: 'translateY(0)' }
];

const FADE_IN_DOWN_BIG: Keyframe[] = [
  { offset: 0, opacity: 0, transform: 'translateY(-100vh)' },
  { offset: 1, opacity: 1, transform: 'translateY(0px)' }
];

const FADE_IN_RIGHT: Keyframe[] = [
  { offset: 0, opacity: 0, transform: 'translateX(100%)' },
  { offset: 1, opacity: 1, transform: 'translateX(0)' }
];

const FADE_IN_RIGHT_BIG: Keyframe[] = [
  { offset: 0, opacity: 0, transform: 'translateX(100vw)' },
  { offset: 1, opacity: 1, transform: 'translateX(0px)' }
];

const FADE_IN_LEFT: Keyframe[] = [
  { offset: 0, opacity: 0, transform: 'translateX(-100%)' },
  { offset: 1, opacity: 1, transform: 'translateX(0)' }
];

const FADE_IN_LEFT_BIG: Keyframe[] = [
  { offset: 0, opacity: 0, transform: 'translateX(-100vw)' },
  { offset: 1, opacity: 1, transform: 'translateX(0px)' }
];

export default {
  [ANIMATIONS.FADE_IN]: FADE_IN,
  [ANIMATIONS.FADE_IN_UP]: FADE_IN_UP,
  [ANIMATIONS.FADE_IN_UP_BIG]: FADE_IN_UP_BIG,
  [ANIMATIONS.FADE_IN_DOWN]: FADE_IN_DOWN,
  [ANIMATIONS.FADE_IN_DOWN_BIG]: FADE_IN_DOWN_BIG,
  [ANIMATIONS.FADE_IN_RIGHT]: FADE_IN_RIGHT,
  [ANIMATIONS.FADE_IN_RIGHT_BIG]: FADE_IN_RIGHT_BIG,
  [ANIMATIONS.FADE_IN_LEFT]: FADE_IN_LEFT,
  [ANIMATIONS.FADE_IN_LEFT_BIG]: FADE_IN_LEFT_BIG
};
