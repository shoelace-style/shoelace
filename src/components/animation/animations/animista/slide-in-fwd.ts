import { ANIMATIONS } from './common';

const SLIDE_IN_FWD_DEFAULT: Keyframe = {
  easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
  fillMode: 'both'
};

const SLIDE_IN_FWD_CENTER: Keyframe[] = [
  { offset: 0, ...SLIDE_IN_FWD_DEFAULT, transform: 'translateZ(-1400px)', opacity: 0 },
  { offset: 1, ...SLIDE_IN_FWD_DEFAULT, transform: 'translateZ(0)', opacity: 1 }
];

const SLIDE_IN_FWD_TOP: Keyframe[] = [
  { offset: 0, ...SLIDE_IN_FWD_DEFAULT, transform: 'translateZ(-1400px) translateY(-100vh)', opacity: 0 },
  { offset: 1, ...SLIDE_IN_FWD_DEFAULT, transform: 'translateZ(0) translateY(0)', opacity: 1 }
];

const SLIDE_IN_FWD_TR: Keyframe[] = [
  {
    offset: 0,
    ...SLIDE_IN_FWD_DEFAULT,
    transform: 'translateZ(-1400px) translateY(-100vh) translateX(100vw)',
    opacity: 0
  },
  { offset: 1, ...SLIDE_IN_FWD_DEFAULT, transform: 'translateZ(0) translateY(0) translateX(0)', opacity: 1 }
];

const SLIDE_IN_FWD_RIGHT: Keyframe[] = [
  { offset: 0, ...SLIDE_IN_FWD_DEFAULT, transform: 'translateZ(-1400px) translateX(100vw)', opacity: 0 },
  { offset: 1, ...SLIDE_IN_FWD_DEFAULT, transform: 'translateZ(0) translateX(0)', opacity: 1 }
];

const SLIDE_IN_FWD_BR: Keyframe[] = [
  {
    offset: 0,
    ...SLIDE_IN_FWD_DEFAULT,
    transform: 'translateZ(-1400px) translateY(100vh) translateX(100vw)',
    opacity: 0
  },
  { offset: 1, ...SLIDE_IN_FWD_DEFAULT, transform: 'translateZ(0) translateY(0) translateX(0)', opacity: 1 }
];

const SLIDE_IN_FWD_BOTTOM: Keyframe[] = [
  { offset: 0, ...SLIDE_IN_FWD_DEFAULT, transform: 'translateZ(-1400px) translateY(100vh)', opacity: 0 },
  { offset: 1, ...SLIDE_IN_FWD_DEFAULT, transform: 'translateZ(0) translateY(0)', opacity: 1 }
];

const SLIDE_IN_FWD_BL: Keyframe[] = [
  {
    offset: 0,
    ...SLIDE_IN_FWD_DEFAULT,
    transform: 'translateZ(-1400px) translateY(100vh) translateX(-100vw)',
    opacity: 0
  },
  { offset: 1, ...SLIDE_IN_FWD_DEFAULT, transform: 'translateZ(0) translateY(0) translateX(0)', opacity: 1 }
];

const SLIDE_IN_FWD_LEFT: Keyframe[] = [
  { offset: 0, ...SLIDE_IN_FWD_DEFAULT, transform: 'translateZ(-1400px) translateX(-100vw)', opacity: 0 },
  { offset: 1, ...SLIDE_IN_FWD_DEFAULT, transform: 'translateZ(0) translateX(0)', opacity: 1 }
];

const SLIDE_IN_FWD_TL: Keyframe[] = [
  {
    offset: 0,
    ...SLIDE_IN_FWD_DEFAULT,
    transform: 'translateZ(-1400px) translateY(-100vh) translateX(-100vw)',
    opacity: 0
  },
  { offset: 1, ...SLIDE_IN_FWD_DEFAULT, transform: 'translateZ(0) translateY(0) translateX(0)', opacity: 1 }
];

export default {
  [ANIMATIONS.SLIDE_IN_FWD_CENTER]: SLIDE_IN_FWD_CENTER,
  [ANIMATIONS.SLIDE_IN_FWD_TOP]: SLIDE_IN_FWD_TOP,
  [ANIMATIONS.SLIDE_IN_FWD_TR]: SLIDE_IN_FWD_TR,
  [ANIMATIONS.SLIDE_IN_FWD_RIGHT]: SLIDE_IN_FWD_RIGHT,
  [ANIMATIONS.SLIDE_IN_FWD_BR]: SLIDE_IN_FWD_BR,
  [ANIMATIONS.SLIDE_IN_FWD_BOTTOM]: SLIDE_IN_FWD_BOTTOM,
  [ANIMATIONS.SLIDE_IN_FWD_BL]: SLIDE_IN_FWD_BL,
  [ANIMATIONS.SLIDE_IN_FWD_LEFT]: SLIDE_IN_FWD_LEFT,
  [ANIMATIONS.SLIDE_IN_FWD_TL]: SLIDE_IN_FWD_TL
};
