import { ANIMATIONS } from './common';

const SLIDE_OUT_UP: Keyframe[] = [
  { offset: 0, transform: 'translateY(0)', visibility: 'visible' },
  { offset: 1, transform: 'translateY(-100%)', visibility: 'hidden' }
];

const SLIDE_OUT_DOWN: Keyframe[] = [
  { offset: 0, transform: 'translateY(0)', visibility: 'visible' },
  { offset: 1, transform: 'translateY(100%)', visibility: 'hidden' }
];

const SLIDE_OUT_LEFT: Keyframe[] = [
  { offset: 0, transform: 'translateX(0)', visibility: 'visible' },
  { offset: 1, transform: 'translateX(-100%)', visibility: 'hidden' }
];

const SLIDE_OUT_RIGHT: Keyframe[] = [
  { offset: 0, transform: 'translateX(0)', visibility: 'visible' },
  { offset: 1, transform: 'translateX(100%)', visibility: 'hidden' }
];

export default {
  [ANIMATIONS.SLIDE_OUT_UP]: SLIDE_OUT_UP,
  [ANIMATIONS.SLIDE_OUT_DOWN]: SLIDE_OUT_DOWN,
  [ANIMATIONS.SLIDE_OUT_LEFT]: SLIDE_OUT_LEFT,
  [ANIMATIONS.SLIDE_OUT_RIGHT]: SLIDE_OUT_RIGHT
};
