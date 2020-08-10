import { ANIMATIONS } from './common';

const FADE_OUT: Keyframe[] = [
  { offset: 0, opacity: 1 },
  { offset: 1, opacity: 0 }
];

const FADE_OUT_UP: Keyframe[] = [
  { offset: 0, opacity: 1, transform: 'translateY(0)' },
  { offset: 1, opacity: 0, transform: 'translateY(-100%)' }
];

const FADE_OUT_UP_BIG: Keyframe[] = [
  { offset: 0, opacity: 1, transform: 'translateY(0px)' },
  { offset: 1, opacity: 0, transform: 'translateY(-100vh)' }
];

const FADE_OUT_DOWN: Keyframe[] = [
  { offset: 0, opacity: 1, transform: 'translateY(0)' },
  { offset: 1, opacity: 0, transform: 'translateY(100%)' }
];

const FADE_OUT_DOWN_BIG: Keyframe[] = [
  { offset: 0, opacity: 1, transform: 'translateY(0px)' },
  { offset: 1, opacity: 0, transform: 'translateY(100vh)' }
];

const FADE_OUT_RIGHT: Keyframe[] = [
  { offset: 0, opacity: 1, transform: 'translateX(0)' },
  { offset: 1, opacity: 0, transform: 'translateX(100%)' }
];

const FADE_OUT_RIGHT_BIG: Keyframe[] = [
  { offset: 0, opacity: 1, transform: 'translateX(0px)' },
  { offset: 1, opacity: 0, transform: 'translateX(100vw)' }
];

const FADE_OUT_LEFT: Keyframe[] = [
  { offset: 0, opacity: 1, transform: 'translateX(0)' },
  { offset: 1, opacity: 0, transform: 'translateX(-100%)' }
];

const FADE_OUT_LEFT_BIG: Keyframe[] = [
  { offset: 0, opacity: 1, transform: 'translateX(0px)' },
  { offset: 1, opacity: 0, transform: 'translateX(-100vw)' }
];

export default {
  [ANIMATIONS.FADE_OUT]: FADE_OUT,
  [ANIMATIONS.FADE_OUT_UP]: FADE_OUT_UP,
  [ANIMATIONS.FADE_OUT_UP_BIG]: FADE_OUT_UP_BIG,
  [ANIMATIONS.FADE_OUT_DOWN]: FADE_OUT_DOWN,
  [ANIMATIONS.FADE_OUT_DOWN_BIG]: FADE_OUT_DOWN_BIG,
  [ANIMATIONS.FADE_OUT_RIGHT]: FADE_OUT_RIGHT,
  [ANIMATIONS.FADE_OUT_RIGHT_BIG]: FADE_OUT_RIGHT_BIG,
  [ANIMATIONS.FADE_OUT_LEFT]: FADE_OUT_LEFT,
  [ANIMATIONS.FADE_OUT_LEFT_BIG]: FADE_OUT_LEFT_BIG
};
