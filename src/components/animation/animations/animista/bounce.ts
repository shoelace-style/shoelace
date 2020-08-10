import { ANIMATIONS } from './common';

const BOUNCE_DEFAULT: Keyframe = {
  fillMode: 'both'
};

const BOUNCE_TOP: Keyframe[] = [
  { offset: 0, ...BOUNCE_DEFAULT, transform: 'translateY(-45px)', easing: 'ease-in', opacity: 1 },
  { offset: 0.24, ...BOUNCE_DEFAULT, opacity: 1 },
  { offset: 0.25, ...BOUNCE_DEFAULT, transform: 'translateY(0px)', easing: 'ease-out' },
  { offset: 0.4, ...BOUNCE_DEFAULT, transform: 'translateY(-24px)', easing: 'ease-in' },
  { offset: 0.55, ...BOUNCE_DEFAULT, transform: 'translateY(0px)', easing: 'ease-out' },
  { offset: 0.65, ...BOUNCE_DEFAULT, transform: 'translateY(-12px)', easing: 'ease-in' },
  { offset: 0.75, ...BOUNCE_DEFAULT, transform: 'translateY(0px)', easing: 'ease-out' },
  { offset: 0.82, ...BOUNCE_DEFAULT, transform: 'translateY(-6px)', easing: 'ease-in' },
  { offset: 0.87, ...BOUNCE_DEFAULT, transform: 'translateY(0px)', easing: 'ease-out' },
  { offset: 0.93, ...BOUNCE_DEFAULT, transform: 'translateY(-4px)', easing: 'ease-in' },
  { offset: 1, ...BOUNCE_DEFAULT, transform: 'translateY(0px)', easing: 'ease-out', opacity: 1 }
];

const BOUNCE_BOTTOM: Keyframe[] = [
  { offset: 0, ...BOUNCE_DEFAULT, transform: 'translateY(45px)', easing: 'ease-in', opacity: 1 },
  { offset: 0.24, ...BOUNCE_DEFAULT, opacity: 1 },
  { offset: 0.25, ...BOUNCE_DEFAULT, transform: 'translateY(0px)', easing: 'ease-out' },
  { offset: 0.4, ...BOUNCE_DEFAULT, transform: 'translateY(24px)', easing: 'ease-in' },
  { offset: 0.55, ...BOUNCE_DEFAULT, transform: 'translateY(0px)', easing: 'ease-out' },
  { offset: 0.65, ...BOUNCE_DEFAULT, transform: 'translateY(12px)', easing: 'ease-in' },
  { offset: 0.75, ...BOUNCE_DEFAULT, transform: 'translateY(0px)', easing: 'ease-out' },
  { offset: 0.82, ...BOUNCE_DEFAULT, transform: 'translateY(6px)', easing: 'ease-in' },
  { offset: 0.87, ...BOUNCE_DEFAULT, transform: 'translateY(0px)', easing: 'ease-out' },
  { offset: 0.93, ...BOUNCE_DEFAULT, transform: 'translateY(4px)', easing: 'ease-in' },
  { offset: 1, ...BOUNCE_DEFAULT, transform: 'translateY(0px)', easing: 'ease-out', opacity: 1 }
];

const BOUNCE_LEFT: Keyframe[] = [
  { offset: 0, ...BOUNCE_DEFAULT, transform: 'translateX(-48px)', easing: 'ease-in', opacity: 1 },
  { offset: 0.24, ...BOUNCE_DEFAULT, opacity: 1 },
  { offset: 0.25, ...BOUNCE_DEFAULT, transform: 'translateX(0px)', easing: 'ease-out' },
  { offset: 0.4, ...BOUNCE_DEFAULT, transform: 'translateX(-26px)', easing: 'ease-in' },
  { offset: 0.55, ...BOUNCE_DEFAULT, transform: 'translateX(0px)', easing: 'ease-out' },
  { offset: 0.65, ...BOUNCE_DEFAULT, transform: 'translateX(-13px)', easing: 'ease-in' },
  { offset: 0.75, ...BOUNCE_DEFAULT, transform: 'translateX(0px)', easing: 'ease-out' },
  { offset: 0.82, ...BOUNCE_DEFAULT, transform: 'translateX(-6.5px)', easing: 'ease-in' },
  { offset: 0.87, ...BOUNCE_DEFAULT, transform: 'translateX(0px)', easing: 'ease-out' },
  { offset: 0.93, ...BOUNCE_DEFAULT, transform: 'translateX(-4px)', easing: 'ease-in' },
  { offset: 0.98, ...BOUNCE_DEFAULT, transform: 'translateX(0px)', easing: 'ease-out' },
  { offset: 1, ...BOUNCE_DEFAULT, transform: 'translateX(0px)', easing: 'ease-out', opacity: 1 }
];

const BOUNCE_RIGHT: Keyframe[] = [
  { offset: 0, ...BOUNCE_DEFAULT, transform: 'translateX(48px)', easing: 'ease-in', opacity: 1 },
  { offset: 0.24, ...BOUNCE_DEFAULT, opacity: 1 },
  { offset: 0.25, ...BOUNCE_DEFAULT, transform: 'translateX(0px)', easing: 'ease-out' },
  { offset: 0.4, ...BOUNCE_DEFAULT, transform: 'translateX(26px)', easing: 'ease-in' },
  { offset: 0.55, ...BOUNCE_DEFAULT, transform: 'translateX(0px)', easing: 'ease-out' },
  { offset: 0.65, ...BOUNCE_DEFAULT, transform: 'translateX(13px)', easing: 'ease-in' },
  { offset: 0.75, ...BOUNCE_DEFAULT, transform: 'translateX(0px)', easing: 'ease-out' },
  { offset: 0.82, ...BOUNCE_DEFAULT, transform: 'translateX(6.5px)', easing: 'ease-in' },
  { offset: 0.87, ...BOUNCE_DEFAULT, transform: 'translateX(0px)', easing: 'ease-out' },
  { offset: 0.93, ...BOUNCE_DEFAULT, transform: 'translateX(4px)', easing: 'ease-in' },
  { offset: 0.98, ...BOUNCE_DEFAULT, transform: 'translateX(0px)', easing: 'ease-out' },
  { offset: 1, ...BOUNCE_DEFAULT, transform: 'translateX(0px)', easing: 'ease-out', opacity: 1 }
];

export default {
  [ANIMATIONS.BOUNCE_TOP]: BOUNCE_TOP,
  [ANIMATIONS.BOUNCE_BOTTOM]: BOUNCE_BOTTOM,
  [ANIMATIONS.BOUNCE_LEFT]: BOUNCE_LEFT,
  [ANIMATIONS.BOUNCE_RIGHT]: BOUNCE_RIGHT
};
