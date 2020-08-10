import { ANIMATIONS } from './common';

const SLIDE_IN_BCK_DEFAULT: Keyframe = {
  easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
  fillMode: 'both'
};

const SLIDE_IN_BCK_CENTER: Keyframe[] = [
  { offset: 0, ...SLIDE_IN_BCK_DEFAULT, transform: 'translateZ(600px)', opacity: 0 },
  { offset: 1, ...SLIDE_IN_BCK_DEFAULT, transform: 'translateZ(0)', opacity: 1 }
];

const SLIDE_IN_BCK_TOP: Keyframe[] = [
  { offset: 0, ...SLIDE_IN_BCK_DEFAULT, transform: 'translateZ(700px) translateY(-300px)', opacity: 0 },
  { offset: 1, ...SLIDE_IN_BCK_DEFAULT, transform: 'translateZ(0) translateY(0)', opacity: 1 }
];

const SLIDE_IN_BCK_TR: Keyframe[] = [
  {
    offset: 0,
    ...SLIDE_IN_BCK_DEFAULT,
    transform: 'translateZ(700px) translateY(-300px) translateX(400px)',
    opacity: 0
  },
  { offset: 1, ...SLIDE_IN_BCK_DEFAULT, transform: 'translateZ(0) translateY(0) translateX(0)', opacity: 1 }
];

const SLIDE_IN_BCK_RIGHT: Keyframe[] = [
  { offset: 0, ...SLIDE_IN_BCK_DEFAULT, transform: 'translateZ(700px) translateX(400px)', opacity: 0 },
  { offset: 1, ...SLIDE_IN_BCK_DEFAULT, transform: 'translateZ(0) translateX(0)', opacity: 1 }
];

const SLIDE_IN_BCK_BR: Keyframe[] = [
  {
    offset: 0,
    ...SLIDE_IN_BCK_DEFAULT,
    transform: 'translateZ(700px) translateY(300px) translateX(400px)',
    opacity: 0
  },
  { offset: 1, ...SLIDE_IN_BCK_DEFAULT, transform: 'translateZ(0) translateY(0) translateX(0)', opacity: 1 }
];

const SLIDE_IN_BCK_BOTTOM: Keyframe[] = [
  { offset: 0, ...SLIDE_IN_BCK_DEFAULT, transform: 'translateZ(700px) translateY(300px)', opacity: 0 },
  { offset: 1, ...SLIDE_IN_BCK_DEFAULT, transform: 'translateZ(0) translateY(0)', opacity: 1 }
];

const SLIDE_IN_BCK_BL: Keyframe[] = [
  {
    offset: 0,
    ...SLIDE_IN_BCK_DEFAULT,
    transform: 'translateZ(700px) translateY(300px) translateX(-400px)',
    opacity: 0
  },
  { offset: 1, ...SLIDE_IN_BCK_DEFAULT, transform: 'translateZ(0) translateY(0) translateX(0)', opacity: 1 }
];

const SLIDE_IN_BCK_LEFT: Keyframe[] = [
  { offset: 0, ...SLIDE_IN_BCK_DEFAULT, transform: 'translateZ(700px) translateX(-400px)', opacity: 0 },
  { offset: 1, ...SLIDE_IN_BCK_DEFAULT, transform: 'translateZ(0) translateX(0)', opacity: 1 }
];

const SLIDE_IN_BCK_TL: Keyframe[] = [
  {
    offset: 0,
    ...SLIDE_IN_BCK_DEFAULT,
    transform: 'translateZ(700px) translateY(-300px) translateX(-400px)',
    opacity: 0
  },
  { offset: 1, ...SLIDE_IN_BCK_DEFAULT, transform: 'translateZ(0) translateY(0) translateX(0)', opacity: 1 }
];

export default {
  [ANIMATIONS.SLIDE_IN_BCK_CENTER]: SLIDE_IN_BCK_CENTER,
  [ANIMATIONS.SLIDE_IN_BCK_TOP]: SLIDE_IN_BCK_TOP,
  [ANIMATIONS.SLIDE_IN_BCK_TR]: SLIDE_IN_BCK_TR,
  [ANIMATIONS.SLIDE_IN_BCK_RIGHT]: SLIDE_IN_BCK_RIGHT,
  [ANIMATIONS.SLIDE_IN_BCK_BR]: SLIDE_IN_BCK_BR,
  [ANIMATIONS.SLIDE_IN_BCK_BOTTOM]: SLIDE_IN_BCK_BOTTOM,
  [ANIMATIONS.SLIDE_IN_BCK_BL]: SLIDE_IN_BCK_BL,
  [ANIMATIONS.SLIDE_IN_BCK_LEFT]: SLIDE_IN_BCK_LEFT,
  [ANIMATIONS.SLIDE_IN_BCK_TL]: SLIDE_IN_BCK_TL
};
