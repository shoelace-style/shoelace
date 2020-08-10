import { ANIMATIONS } from './common';

const SLIDE_FWD_DEFAULT: Keyframe = {
  easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
  fillMode: 'both'
};

const SLIDE_FWD_CENTER: Keyframe[] = [
  { offset: 0, ...SLIDE_FWD_DEFAULT, transform: 'translateZ(0)' },
  { offset: 1, ...SLIDE_FWD_DEFAULT, transform: 'translateZ(160px)' }
];

const SLIDE_FWD_TOP: Keyframe[] = [
  { offset: 0, ...SLIDE_FWD_DEFAULT, transform: 'translateZ(0) translateY(0)' },
  { offset: 1, ...SLIDE_FWD_DEFAULT, transform: 'translateZ(160px) translateY(-100px)' }
];

const SLIDE_FWD_TR: Keyframe[] = [
  { offset: 0, ...SLIDE_FWD_DEFAULT, transform: 'translateZ(0) translateY(0) translateX(0)' },
  { offset: 1, ...SLIDE_FWD_DEFAULT, transform: 'translateZ(160px) translateY(-100px) translateX(100px)' }
];

const SLIDE_FWD_RIGHT: Keyframe[] = [
  { offset: 0, ...SLIDE_FWD_DEFAULT, transform: 'translateZ(0) translateX(0)' },
  { offset: 1, ...SLIDE_FWD_DEFAULT, transform: 'translateZ(160px) translateX(100px)' }
];

const SLIDE_FWD_BR: Keyframe[] = [
  { offset: 0, ...SLIDE_FWD_DEFAULT, transform: 'translateZ(0) translateY(0) translateX(0)' },
  { offset: 1, ...SLIDE_FWD_DEFAULT, transform: 'translateZ(160px) translateY(100px) translateX(100px)' }
];

const SLIDE_FWD_BOTTOM: Keyframe[] = [
  { offset: 0, ...SLIDE_FWD_DEFAULT, transform: 'translateZ(0) translateY(0)' },
  { offset: 1, ...SLIDE_FWD_DEFAULT, transform: 'translateZ(160px) translateY(100px)' }
];

const SLIDE_FWD_BL: Keyframe[] = [
  { offset: 0, ...SLIDE_FWD_DEFAULT, transform: 'translateZ(0) translateY(0) translateX(0)' },
  { offset: 1, ...SLIDE_FWD_DEFAULT, transform: 'translateZ(160px) translateY(100px) translateX(-100px)' }
];

const SLIDE_FWD_LEFT: Keyframe[] = [
  { offset: 0, ...SLIDE_FWD_DEFAULT, transform: 'translateZ(0) translateX(0)' },
  { offset: 1, ...SLIDE_FWD_DEFAULT, transform: 'translateZ(160px) translateX(-100px)' }
];

const SLIDE_FWD_TL: Keyframe[] = [
  { offset: 0, ...SLIDE_FWD_DEFAULT, transform: 'translateZ(0) translateY(0) translateX(0)' },
  { offset: 1, ...SLIDE_FWD_DEFAULT, transform: 'translateZ(160px) translateY(-100px) translateX(-100px)' }
];

export default {
  [ANIMATIONS.SLIDE_FWD_CENTER]: SLIDE_FWD_CENTER,
  [ANIMATIONS.SLIDE_FWD_TOP]: SLIDE_FWD_TOP,
  [ANIMATIONS.SLIDE_FWD_TR]: SLIDE_FWD_TR,
  [ANIMATIONS.SLIDE_FWD_RIGHT]: SLIDE_FWD_RIGHT,
  [ANIMATIONS.SLIDE_FWD_BR]: SLIDE_FWD_BR,
  [ANIMATIONS.SLIDE_FWD_BOTTOM]: SLIDE_FWD_BOTTOM,
  [ANIMATIONS.SLIDE_FWD_BL]: SLIDE_FWD_BL,
  [ANIMATIONS.SLIDE_FWD_LEFT]: SLIDE_FWD_LEFT,
  [ANIMATIONS.SLIDE_FWD_TL]: SLIDE_FWD_TL
};
