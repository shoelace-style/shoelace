import { ANIMATIONS } from './common';

const LIGHT_SPEED_IN: Keyframe[] = [
  { offset: 0, easing: 'ease-out', opacity: 0, transform: 'translateX(200px) skewX(-30deg)' },
  { offset: 0.6, easing: 'ease-out', opacity: 1, transform: 'translateX(0px) skewX(20deg)' },
  { offset: 0.8, easing: 'ease-out', opacity: 1, transform: 'translateX(0px) skewX(-5deg)' },
  { offset: 1, easing: 'ease-out', opacity: 1, transform: 'translateX(0px) skewX(0deg)' }
];

const LIGHT_SPEED_OUT: Keyframe[] = [
  { offset: 0, easing: 'ease-in', opacity: 1, transform: 'translateX(0px) skewX(0deg)' },
  { offset: 1, easing: 'ease-in', opacity: 0, transform: 'translateX(200px) skewX(30deg)' }
];

export default {
  [ANIMATIONS.LIGHT_SPEED_IN]: LIGHT_SPEED_IN,
  [ANIMATIONS.LIGHT_SPEED_OUT]: LIGHT_SPEED_OUT
};
