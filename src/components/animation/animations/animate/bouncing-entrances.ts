import { ANIMATIONS } from './common';

const BOUNCE_DEFAULT: Keyframe = {
  easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
};

const BOUNCE_IN: Keyframe[] = [
  { offset: 0, opacity: 0, transform: 'scale(0.3)', ...BOUNCE_DEFAULT },
  { offset: 0.2, opacity: 0, transform: 'scale(1.1)', ...BOUNCE_DEFAULT },
  { offset: 0.4, opacity: 0, transform: 'scale(0.9)', ...BOUNCE_DEFAULT },
  { offset: 0.6, opacity: 1, transform: 'scale(1.03)', ...BOUNCE_DEFAULT },
  { offset: 0.8, opacity: 1, transform: 'scale(0.97)', ...BOUNCE_DEFAULT },
  { offset: 1, opacity: 1, transform: 'scale(1)', ...BOUNCE_DEFAULT }
];

const BOUNCE_IN_UP: Keyframe[] = [
  { offset: 0, opacity: 0, transform: 'translateY(3000px)', ...BOUNCE_DEFAULT },
  { offset: 0.6, opacity: 1, transform: 'translateY(-20px)', ...BOUNCE_DEFAULT },
  { offset: 0.75, opacity: 1, transform: 'translateY(10px)', ...BOUNCE_DEFAULT },
  { offset: 0.9, opacity: 1, transform: 'translateY(-5px)', ...BOUNCE_DEFAULT },
  { offset: 1, opacity: 1, transform: 'translateY(0px)', ...BOUNCE_DEFAULT }
];

const BOUNCE_IN_DOWN: Keyframe[] = [
  { offset: 0, opacity: 0, transform: 'translateY(-3000px)', ...BOUNCE_DEFAULT },
  { offset: 0.6, opacity: 1, transform: 'translateY(25px)', ...BOUNCE_DEFAULT },
  { offset: 0.75, opacity: 1, transform: 'translateY(-10px)', ...BOUNCE_DEFAULT },
  { offset: 0.9, opacity: 1, transform: 'translateY(5px)', ...BOUNCE_DEFAULT },
  { offset: 1, opacity: 1, transform: 'translateY(0px)', ...BOUNCE_DEFAULT }
];

const BOUNCE_IN_RIGHT: Keyframe[] = [
  { offset: 0, opacity: 0, transform: 'translateX(3000px)', ...BOUNCE_DEFAULT },
  { offset: 0.6, opacity: 1, transform: 'translateX(-25px)', ...BOUNCE_DEFAULT },
  { offset: 0.75, opacity: 1, transform: 'translateX(10px)', ...BOUNCE_DEFAULT },
  { offset: 0.9, opacity: 1, transform: 'translateX(-5px)', ...BOUNCE_DEFAULT },
  { offset: 1, opacity: 1, transform: 'translateX(0px)', ...BOUNCE_DEFAULT }
];

const BOUNCE_IN_LEFT: Keyframe[] = [
  { offset: 0, opacity: 0, transform: 'translateX(-3000px)', ...BOUNCE_DEFAULT },
  { offset: 0.6, opacity: 1, transform: 'translateX(25px)', ...BOUNCE_DEFAULT },
  { offset: 0.75, opacity: 1, transform: 'translateX(-10px)', ...BOUNCE_DEFAULT },
  { offset: 0.9, opacity: 1, transform: 'translateX(5px)', ...BOUNCE_DEFAULT },
  { offset: 1, opacity: 1, transform: 'translateX(0px)', ...BOUNCE_DEFAULT }
];

export default {
  [ANIMATIONS.BOUNCE_IN]: BOUNCE_IN,
  [ANIMATIONS.BOUNCE_IN_UP]: BOUNCE_IN_UP,
  [ANIMATIONS.BOUNCE_IN_DOWN]: BOUNCE_IN_DOWN,
  [ANIMATIONS.BOUNCE_IN_RIGHT]: BOUNCE_IN_RIGHT,
  [ANIMATIONS.BOUNCE_IN_LEFT]: BOUNCE_IN_LEFT
};
