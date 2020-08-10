import { ANIMATIONS } from './common';

const SLIDE_DEFAULT: Keyframe = {
  easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
  fillMode: 'both'
};

const SLIDE_TOP: Keyframe[] = [
  { offset: 0, ...SLIDE_DEFAULT, transform: 'translateY(0)' },
  { offset: 1, ...SLIDE_DEFAULT, transform: 'translateY(-100px)' }
];

const SLIDE_TR: Keyframe[] = [
  { offset: 0, ...SLIDE_DEFAULT, transform: 'translateY(0) translateX(0)' },
  { offset: 1, ...SLIDE_DEFAULT, transform: 'translateY(-100px) translateX(100px)' }
];

const SLIDE_RIGHT: Keyframe[] = [
  { offset: 0, ...SLIDE_DEFAULT, transform: 'translateX(0)' },
  { offset: 1, ...SLIDE_DEFAULT, transform: 'translateX(100px)' }
];

const SLIDE_BR: Keyframe[] = [
  { offset: 0, ...SLIDE_DEFAULT, transform: 'translateY(0) translateX(0)' },
  { offset: 1, ...SLIDE_DEFAULT, transform: 'translateY(100px) translateX(100px)' }
];

const SLIDE_BOTTOM: Keyframe[] = [
  { offset: 0, ...SLIDE_DEFAULT, transform: 'translateY(0)' },
  { offset: 1, ...SLIDE_DEFAULT, transform: 'translateY(100px)' }
];

const SLIDE_BL: Keyframe[] = [
  { offset: 0, ...SLIDE_DEFAULT, transform: 'translateY(0) translateX(0)' },
  { offset: 1, ...SLIDE_DEFAULT, transform: 'translateY(100px) translateX(-100px)' }
];

const SLIDE_LEFT: Keyframe[] = [
  { offset: 0, ...SLIDE_DEFAULT, transform: 'translateX(0)' },
  { offset: 1, ...SLIDE_DEFAULT, transform: 'translateX(-100px)' }
];

const SLIDE_TL: Keyframe[] = [
  { offset: 0, ...SLIDE_DEFAULT, transform: 'translateY(0) translateX(0)' },
  { offset: 1, ...SLIDE_DEFAULT, transform: 'translateY(-100px) translateX(-100px)' }
];

export default {
  [ANIMATIONS.SLIDE_TOP]: SLIDE_TOP,
  [ANIMATIONS.SLIDE_TR]: SLIDE_TR,
  [ANIMATIONS.SLIDE_RIGHT]: SLIDE_RIGHT,
  [ANIMATIONS.SLIDE_BR]: SLIDE_BR,
  [ANIMATIONS.SLIDE_BOTTOM]: SLIDE_BOTTOM,
  [ANIMATIONS.SLIDE_BL]: SLIDE_BL,
  [ANIMATIONS.SLIDE_LEFT]: SLIDE_LEFT,
  [ANIMATIONS.SLIDE_TL]: SLIDE_TL
};
