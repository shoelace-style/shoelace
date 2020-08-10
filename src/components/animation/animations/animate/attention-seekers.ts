import { ANIMATIONS } from './common';

const BOUNCE_DEFAULT: Keyframe = {
  transform: 'translate(0)',
  easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
};

const BOUNCE: Keyframe[] = [
  { offset: 0, ...BOUNCE_DEFAULT },
  { offset: 0.2, ...BOUNCE_DEFAULT },
  { offset: 0.4, transform: 'translateY(-30px)', easing: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)' },
  { offset: 0.43, transform: 'translateY(-30px)', easing: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)' },
  { offset: 0.53, ...BOUNCE_DEFAULT },
  { offset: 0.7, transform: 'translateY(-15px)', easing: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)' },
  { offset: 0.8, ...BOUNCE_DEFAULT },
  { offset: 0.9, transform: 'translateY(-4px)', easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)' },
  { offset: 1, ...BOUNCE_DEFAULT }
];

const FLASH: Keyframe[] = [
  { offset: 0, opacity: 1 },
  { offset: 0.25, opacity: 0 },
  { offset: 0.5, opacity: 1 },
  { offset: 0.75, opacity: 0 },
  { offset: 1, opacity: 1 }
];

const JELLO_DEFAULT = {
  transform: 'skewX(0deg) skewY(0deg)',
  transformOrigin: 'center'
};

const JELLO: Keyframe[] = [
  { offset: 0, ...JELLO_DEFAULT },
  { offset: 0.111, ...JELLO_DEFAULT },
  { offset: 0.222, ...JELLO_DEFAULT, transform: 'skewX(-12.5deg) skewY(-12.5deg)' },
  { offset: 0.333, ...JELLO_DEFAULT, transform: 'skewX(6.25deg) skewY(6.25deg)' },
  { offset: 0.444, ...JELLO_DEFAULT, transform: 'skewX(-3.125deg) skewY(-3.125deg)' },
  { offset: 0.555, ...JELLO_DEFAULT, transform: 'skewX(1.5625deg) skewY(1.5625deg)' },
  { offset: 0.666, ...JELLO_DEFAULT, transform: 'skewX(-0.78125deg) skewY(-0.78125deg)' },
  { offset: 0.777, ...JELLO_DEFAULT, transform: 'skewX(0.390625deg) skewY(0.390625deg)' },
  { offset: 0.888, ...JELLO_DEFAULT, transform: 'skewX(-0.1953125deg) skewY(-0.1953125deg)' },
  { offset: 1, ...JELLO_DEFAULT }
];

const PULSE: Keyframe[] = [
  { offset: 0, transform: 'scale(1)' },
  { offset: 0.5, transform: 'scale(1.05)' },
  { offset: 1, transform: 'scale(1)' }
];

const ROTATE: Keyframe[] = [
  { offset: 0, transform: 'rotate(0deg)' },
  { offset: 0.25, transform: 'rotate(90deg)' },
  { offset: 0.5, transform: 'rotate(180deg)' },
  { offset: 0.75, transform: 'rotate(270deg)' },
  { offset: 1, transform: 'rotate(360deg)' }
];

const SHAKE_LEFT: Keyframe = { transform: 'translateX(-10px)' };
const SHAKE_RIGHT: Keyframe = { transform: 'translateX(10px)' };
const SHAKE: Keyframe[] = [
  { offset: 0, transform: 'translateX(0px)' },
  { offset: 0.1, ...SHAKE_LEFT },
  { offset: 0.2, ...SHAKE_RIGHT },
  { offset: 0.3, ...SHAKE_LEFT },
  { offset: 0.4, ...SHAKE_RIGHT },
  { offset: 0.5, ...SHAKE_LEFT },
  { offset: 0.6, ...SHAKE_RIGHT },
  { offset: 0.7, ...SHAKE_LEFT },
  { offset: 0.8, ...SHAKE_RIGHT },
  { offset: 0.9, ...SHAKE_LEFT },
  { offset: 1, transform: 'translateX(0px)' }
];

const SWING: Keyframe[] = [
  { offset: 0, transform: 'rotate(0deg)', transformOrigin: 'top center' },
  { offset: 0.2, transform: 'rotate(15deg)', transformOrigin: 'top center' },
  { offset: 0.4, transform: 'rotate(-10deg)', transformOrigin: 'top center' },
  { offset: 0.6, transform: 'rotate(5deg)', transformOrigin: 'top center' },
  { offset: 0.8, transform: 'rotate(-5deg)', transformOrigin: 'top center' },
  { offset: 1, transform: 'rotate(0deg)', transformOrigin: 'top center' }
];

const RUBBER_BAND: Keyframe[] = [
  { offset: 0, transform: 'scale(1, 1)' },
  { offset: 0.3, transform: 'scale(1.25, 0.75)' },
  { offset: 0.4, transform: 'scale(0.75, 1.25)' },
  { offset: 0.5, transform: 'scale(1.15, 0.85)' },
  { offset: 0.65, transform: 'scale(0.95, 1.05)' },
  { offset: 0.75, transform: 'scale(1.05, 0.95)' },
  { offset: 1, transform: 'scale(1, 1)' }
];

const TADA: Keyframe[] = [
  { offset: 0, transform: 'scale(1) rotate(0deg)' },
  { offset: 0.1, transform: 'scale(0.9) rotate(-3deg)' },
  { offset: 0.2, transform: 'scale(0.9) rotate(-3deg)' },
  { offset: 0.3, transform: 'scale(1.1) rotate(-3deg)' },
  { offset: 0.4, transform: 'scale(1.1) rotate(3deg)' },
  { offset: 0.5, transform: 'scale(1.1) rotate(-3deg)' },
  { offset: 0.6, transform: 'scale(1.1) rotate(3deg)' },
  { offset: 0.7, transform: 'scale(1.1) rotate(-3deg)' },
  { offset: 0.8, transform: 'scale(1.1) rotate(3deg)' },
  { offset: 0.9, transform: 'scale(1.1) rotate(3deg)' },
  { offset: 1, transform: 'scale(1) rotate(0deg)' }
];

const WOBBLE: Keyframe[] = [
  { offset: 0, transform: 'translate(0) rotate(0deg)' },
  { offset: 0.15, transform: 'translateX(-25%) rotate(-5deg)' },
  { offset: 0.3, transform: 'translateX(20%) rotate(3deg)' },
  { offset: 0.45, transform: 'translateX(-15%) rotate(-3deg)' },
  { offset: 0.6, transform: 'translateX(10%) rotate(2deg)' },
  { offset: 0.75, transform: 'translateX(-5%) rotate(-1deg)' },
  { offset: 1, transform: 'translate(0) rotate(0deg)' }
];

const HEART_BEAT_DEFAULT: Keyframe = { transform: 'scale(1)', easing: 'ease-in-out' };
const HEART_BEAT: Keyframe[] = [
  { offset: 0, ...HEART_BEAT_DEFAULT },
  { offset: 0.14, ...HEART_BEAT_DEFAULT, transform: 'scale(1.3)' },
  { offset: 0.28, ...HEART_BEAT_DEFAULT },
  { offset: 0.42, ...HEART_BEAT_DEFAULT, transform: 'scale(1.3)' },
  { offset: 0.7, ...HEART_BEAT_DEFAULT },
  { offset: 1, ...HEART_BEAT_DEFAULT }
];

export default {
  [ANIMATIONS.BOUNCE]: BOUNCE,
  [ANIMATIONS.FLASH]: FLASH,
  [ANIMATIONS.JELLO]: JELLO,
  [ANIMATIONS.PULSE]: PULSE,
  [ANIMATIONS.ROTATE]: ROTATE,
  [ANIMATIONS.SHAKE]: SHAKE,
  [ANIMATIONS.SWING]: SWING,
  [ANIMATIONS.RUBBER_BAND]: RUBBER_BAND,
  [ANIMATIONS.TADA]: TADA,
  [ANIMATIONS.WOBBLE]: WOBBLE,
  [ANIMATIONS.HEART_BEAT]: HEART_BEAT
};
