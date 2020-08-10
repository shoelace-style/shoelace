import { ANIMATIONS } from './common';

const BOUNCE_OUT: Keyframe[] = [
  { offset: 0, opacity: 1, transform: 'scale(1)' },
  { offset: 0.2, opacity: 1, transform: 'scale(0.9)' },
  { offset: 0.5, opacity: 1, transform: 'scale(1.11)' },
  { offset: 0.55, opacity: 1, transform: 'scale(1.11)' },
  { offset: 1, opacity: 0, transform: 'scale(1)' }
];

const BOUNCE_OUT_UP: Keyframe[] = [
  { offset: 0, opacity: 1, transform: 'translateY(0px)' },
  { offset: 0.2, opacity: 1, transform: 'translateY(-10px)' },
  { offset: 0.4, opacity: 1, transform: 'translateY(20px)' },
  { offset: 0.45, opacity: 1, transform: 'translateY(20px)' },
  { offset: 0.55, opacity: 1, transform: 'translateY(20px)' },
  { offset: 1, opacity: 0, transform: 'translateY(-100vh)' }
];

const BOUNCE_OUT_DOWN: Keyframe[] = [
  { offset: 0, opacity: 1, transform: 'translateY(0px)' },
  { offset: 0.2, opacity: 1, transform: 'translateY(10px)' },
  { offset: 0.4, opacity: 1, transform: 'translateY(-20px)' },
  { offset: 0.45, opacity: 1, transform: 'translateY(-20px)' },
  { offset: 0.55, opacity: 1, transform: 'translateY(-20px)' },
  { offset: 1, opacity: 0, transform: 'translateY(100vh)' }
];

const BOUNCE_OUT_RIGHT: Keyframe[] = [
  { offset: 0, opacity: 1, transform: 'translateX(0px)' },
  { offset: 0.2, opacity: 1, transform: 'translateX(10px)' },
  { offset: 0.4, opacity: 1, transform: 'translateX(-20px)' },
  { offset: 0.45, opacity: 1, transform: 'translateX(-20px)' },
  { offset: 0.55, opacity: 1, transform: 'translateX(-20px)' },
  { offset: 1, opacity: 0, transform: 'translateX(100vw)' }
];

const BOUNCE_OUT_LEFT: Keyframe[] = [
  { offset: 0, opacity: 1, transform: 'translateX(0px)' },
  { offset: 0.2, opacity: 1, transform: 'translateX(-10px)' },
  { offset: 0.4, opacity: 1, transform: 'translateX(20px)' },
  { offset: 0.45, opacity: 1, transform: 'translateX(20px)' },
  { offset: 0.55, opacity: 1, transform: 'translateX(20px)' },
  { offset: 1, opacity: 0, transform: 'translateX(-100vw)' }
];

export default {
  [ANIMATIONS.BOUNCE_OUT]: BOUNCE_OUT,
  [ANIMATIONS.BOUNCE_OUT_UP]: BOUNCE_OUT_UP,
  [ANIMATIONS.BOUNCE_OUT_DOWN]: BOUNCE_OUT_DOWN,
  [ANIMATIONS.BOUNCE_OUT_RIGHT]: BOUNCE_OUT_RIGHT,
  [ANIMATIONS.BOUNCE_OUT_LEFT]: BOUNCE_OUT_LEFT
};
