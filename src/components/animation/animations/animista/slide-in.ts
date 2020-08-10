import { ANIMATIONS } from './common';

const SLIDE_IN_DEFAULT: Keyframe = {
  easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
  fillMode: 'both'
};

const SLIDE_IN_TOP: Keyframe[] = [
  { offset: 0, ...SLIDE_IN_DEFAULT, transform: 'translateY(-100vh)', opacity: 0 },
  { offset: 1, ...SLIDE_IN_DEFAULT, transform: 'translateY(0)', opacity: 1 }
];

const SLIDE_IN_TR: Keyframe[] = [
  { offset: 0, ...SLIDE_IN_DEFAULT, transform: 'translateY(-100vh) translateX(100vw)', opacity: 0 },
  { offset: 1, ...SLIDE_IN_DEFAULT, transform: 'translateY(0) translateX(0)', opacity: 1 }
];

const SLIDE_IN_RIGHT: Keyframe[] = [
  { offset: 0, ...SLIDE_IN_DEFAULT, transform: 'translateX(100vw)', opacity: 0 },
  { offset: 1, ...SLIDE_IN_DEFAULT, transform: 'translateX(0)', opacity: 1 }
];

const SLIDE_IN_BR: Keyframe[] = [
  { offset: 0, ...SLIDE_IN_DEFAULT, transform: 'translateY(100vh) translateX(100vw)', opacity: 0 },
  { offset: 1, ...SLIDE_IN_DEFAULT, transform: 'translateY(0) translateX(0)', opacity: 1 }
];

const SLIDE_IN_BOTTOM: Keyframe[] = [
  { offset: 0, ...SLIDE_IN_DEFAULT, transform: 'translateY(100vh)', opacity: 0 },
  { offset: 1, ...SLIDE_IN_DEFAULT, transform: 'translateY(0)', opacity: 1 }
];

const SLIDE_IN_BL: Keyframe[] = [
  { offset: 0, ...SLIDE_IN_DEFAULT, transform: 'translateY(100vh) translateX(-100vw)', opacity: 0 },
  { offset: 1, ...SLIDE_IN_DEFAULT, transform: 'translateY(0) translateX(0)', opacity: 1 }
];

const SLIDE_IN_LEFT: Keyframe[] = [
  { offset: 0, ...SLIDE_IN_DEFAULT, transform: 'translateX(-100vw)', opacity: 0 },
  { offset: 1, ...SLIDE_IN_DEFAULT, transform: 'translateX(0)', opacity: 1 }
];

const SLIDE_IN_TL: Keyframe[] = [
  { offset: 0, ...SLIDE_IN_DEFAULT, transform: 'translateY(-100vh) translateX(-100vw)', opacity: 0 },
  { offset: 1, ...SLIDE_IN_DEFAULT, transform: 'translateY(0) translateX(0)', opacity: 1 }
];

export default {
  [ANIMATIONS.SLIDE_IN_TOP]: SLIDE_IN_TOP,
  [ANIMATIONS.SLIDE_IN_TR]: SLIDE_IN_TR,
  [ANIMATIONS.SLIDE_IN_RIGHT]: SLIDE_IN_RIGHT,
  [ANIMATIONS.SLIDE_IN_BR]: SLIDE_IN_BR,
  [ANIMATIONS.SLIDE_IN_BOTTOM]: SLIDE_IN_BOTTOM,
  [ANIMATIONS.SLIDE_IN_BL]: SLIDE_IN_BL,
  [ANIMATIONS.SLIDE_IN_LEFT]: SLIDE_IN_LEFT,
  [ANIMATIONS.SLIDE_IN_TL]: SLIDE_IN_TL
};
