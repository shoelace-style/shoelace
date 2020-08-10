import { ANIMATIONS } from './common';

const VIBRATE_DEFAULT: Keyframe = {
  easing: 'linear',
  fillMode: 'both'
};

const VIBRATE_1: Keyframe[] = [
  { offset: 0, ...VIBRATE_DEFAULT, transform: 'translate(0)' },
  { offset: 0.2, ...VIBRATE_DEFAULT, transform: 'translate(-2px, 2px)' },
  { offset: 0.4, ...VIBRATE_DEFAULT, transform: 'translate(-2px, -2px)' },
  { offset: 0.6, ...VIBRATE_DEFAULT, transform: 'translate(2px, 2px)' },
  { offset: 0.8, ...VIBRATE_DEFAULT, transform: 'translate(2px, -2px)' },
  { offset: 1, ...VIBRATE_DEFAULT, transform: 'translate(0)' }
];

const VIBRATE_2: Keyframe[] = [
  { offset: 0, ...VIBRATE_DEFAULT, transform: 'translate(0)' },
  { offset: 0.1, ...VIBRATE_DEFAULT, transform: 'translate(-2px, -2px)' },
  { offset: 0.2, ...VIBRATE_DEFAULT, transform: 'translate(2px, -2px)' },
  { offset: 0.3, ...VIBRATE_DEFAULT, transform: 'translate(-2px, 2px)' },
  { offset: 0.4, ...VIBRATE_DEFAULT, transform: 'translate(2px, 2px)' },
  { offset: 0.5, ...VIBRATE_DEFAULT, transform: 'translate(-2px, -2px)' },
  { offset: 0.6, ...VIBRATE_DEFAULT, transform: 'translate(2px, -2px)' },
  { offset: 0.7, ...VIBRATE_DEFAULT, transform: 'translate(-2px, 2px)' },
  { offset: 0.8, ...VIBRATE_DEFAULT, transform: 'translate(-2px, -2px)' },
  { offset: 0.9, ...VIBRATE_DEFAULT, transform: 'translate(2px, -2px)' },
  { offset: 1, ...VIBRATE_DEFAULT, transform: 'translate(0)' }
];

export default {
  [ANIMATIONS.VIBRATE_1]: VIBRATE_1,
  [ANIMATIONS.VIBRATE_2]: VIBRATE_2
};
