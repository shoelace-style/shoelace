import { ANIMATIONS } from './common';

const SLIDE_IN_UP: Keyframe[] = [
  { offset: 0, transform: 'translateY(100%)', visibility: 'hidden' },
  { offset: 1, transform: 'translateY(0)', visibility: 'visible' }
];

const SLIDE_IN_DOWN: Keyframe[] = [
  { offset: 0, transform: 'translateY(-100%)', visibility: 'hidden' },
  { offset: 1, transform: 'translateY(0)', visibility: 'visible' }
];

const SLIDE_IN_LEFT: Keyframe[] = [
  { offset: 0, transform: 'translateX(-100%)', visibility: 'hidden' },
  { offset: 1, transform: 'translateX(0)', visibility: 'visible' }
];

const SLIDE_IN_RIGHT: Keyframe[] = [
  { offset: 0, transform: 'translateX(100%)', visibility: 'hidden' },
  { offset: 1, transform: 'translateX(0)', visibility: 'visible' }
];

export default {
  [ANIMATIONS.SLIDE_IN_UP]: SLIDE_IN_UP,
  [ANIMATIONS.SLIDE_IN_DOWN]: SLIDE_IN_DOWN,
  [ANIMATIONS.SLIDE_IN_LEFT]: SLIDE_IN_LEFT,
  [ANIMATIONS.SLIDE_IN_RIGHT]: SLIDE_IN_RIGHT
};
