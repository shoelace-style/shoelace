import { ANIMATIONS } from './common';

const SLIDE_BCK_DEFAULT: Keyframe = {
  easing: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
  fillMode: 'both'
};

const SLIDE_BCK_CENTER: Keyframe[] = [
  { offset: 0, ...SLIDE_BCK_DEFAULT, transform: 'translateZ(0)' },
  { offset: 1, ...SLIDE_BCK_DEFAULT, transform: 'translateZ(-400px)' }
];

const SLIDE_BCK_TOP: Keyframe[] = [
  { offset: 0, ...SLIDE_BCK_DEFAULT, transform: 'translateZ(0) translateY(0)' },
  { offset: 1, ...SLIDE_BCK_DEFAULT, transform: 'translateZ(-400px) translateY(-200px)' }
];

const SLIDE_BCK_TR: Keyframe[] = [
  { offset: 0, ...SLIDE_BCK_DEFAULT, transform: 'translateZ(0) translateY(0) translateX(0)' },
  { offset: 1, ...SLIDE_BCK_DEFAULT, transform: 'translateZ(-400px) translateY(-200px) translateX(200px)' }
];

const SLIDE_BCK_RIGHT: Keyframe[] = [
  { offset: 0, ...SLIDE_BCK_DEFAULT, transform: 'translateZ(0) translateX(0)' },
  { offset: 1, ...SLIDE_BCK_DEFAULT, transform: 'translateZ(-400px) translateX(200px)' }
];

const SLIDE_BCK_BR: Keyframe[] = [
  { offset: 0, ...SLIDE_BCK_DEFAULT, transform: 'translateZ(0) translateY(0) translateX(0)' },
  { offset: 1, ...SLIDE_BCK_DEFAULT, transform: 'translateZ(-400px) translateY(200px) translateX(200px)' }
];

const SLIDE_BCK_BOTTOM: Keyframe[] = [
  { offset: 0, ...SLIDE_BCK_DEFAULT, transform: 'translateZ(0) translateY(0)' },
  { offset: 1, ...SLIDE_BCK_DEFAULT, transform: 'translateZ(-400px) translateY(200px)' }
];

const SLIDE_BCK_BL: Keyframe[] = [
  { offset: 0, ...SLIDE_BCK_DEFAULT, transform: 'translateZ(0) translateY(0) translateX(0)' },
  { offset: 1, ...SLIDE_BCK_DEFAULT, transform: 'translateZ(-400px) translateY(200px) translateX(-200px)' }
];

const SLIDE_BCK_LEFT: Keyframe[] = [
  { offset: 0, ...SLIDE_BCK_DEFAULT, transform: 'translateZ(0) translateX(0)' },
  { offset: 1, ...SLIDE_BCK_DEFAULT, transform: 'translateZ(-400px) translateX(-200px)' }
];

const SLIDE_BCK_TL: Keyframe[] = [
  { offset: 0, ...SLIDE_BCK_DEFAULT, transform: 'translateZ(0) translateY(0) translateX(0)' },
  { offset: 1, ...SLIDE_BCK_DEFAULT, transform: 'translateZ(-400px) translateY(-200px) translateX(-200px)' }
];

export default {
  [ANIMATIONS.SLIDE_BCK_CENTER]: SLIDE_BCK_CENTER,
  [ANIMATIONS.SLIDE_BCK_TOP]: SLIDE_BCK_TOP,
  [ANIMATIONS.SLIDE_BCK_TR]: SLIDE_BCK_TR,
  [ANIMATIONS.SLIDE_BCK_RIGHT]: SLIDE_BCK_RIGHT,
  [ANIMATIONS.SLIDE_BCK_BR]: SLIDE_BCK_BR,
  [ANIMATIONS.SLIDE_BCK_BOTTOM]: SLIDE_BCK_BOTTOM,
  [ANIMATIONS.SLIDE_BCK_BL]: SLIDE_BCK_BL,
  [ANIMATIONS.SLIDE_BCK_LEFT]: SLIDE_BCK_LEFT,
  [ANIMATIONS.SLIDE_BCK_TL]: SLIDE_BCK_TL
};
