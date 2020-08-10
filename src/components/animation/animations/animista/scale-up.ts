import { ANIMATIONS } from './common';

const SCALE_UP_DEFAULT: Keyframe = {
  easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
  fillMode: 'both',
  transformOrigin: 'center center'
};

const SCALE_UP_CENTER: Keyframe[] = [
  { offset: 0, ...SCALE_UP_DEFAULT, transform: 'scale(0.5)' },
  { offset: 1, ...SCALE_UP_DEFAULT, transform: 'scale(1)' }
];

const SCALE_UP_TOP: Keyframe[] = [
  { offset: 0, ...SCALE_UP_DEFAULT, transform: 'scale(0.5)', transformOrigin: '50% 0%' },
  { offset: 1, ...SCALE_UP_DEFAULT, transform: 'scale(1)', transformOrigin: '50% 0%' }
];

const SCALE_UP_TR: Keyframe[] = [
  { offset: 0, ...SCALE_UP_DEFAULT, transform: 'scale(0.5)', transformOrigin: '100% 0%' },
  { offset: 1, ...SCALE_UP_DEFAULT, transform: 'scale(1)', transformOrigin: '100% 0%' }
];

const SCALE_UP_RIGHT: Keyframe[] = [
  { offset: 0, ...SCALE_UP_DEFAULT, transform: 'scale(0.5)', transformOrigin: '100% 50%' },
  { offset: 1, ...SCALE_UP_DEFAULT, transform: 'scale(1)', transformOrigin: '100% 50%' }
];

const SCALE_UP_BR: Keyframe[] = [
  { offset: 0, ...SCALE_UP_DEFAULT, transform: 'scale(0.5)', transformOrigin: '100% 100%' },
  { offset: 1, ...SCALE_UP_DEFAULT, transform: 'scale(1)', transformOrigin: '100% 100%' }
];

const SCALE_UP_BOTTOM: Keyframe[] = [
  { offset: 0, ...SCALE_UP_DEFAULT, transform: 'scale(0.5)', transformOrigin: '50% 100%' },
  { offset: 1, ...SCALE_UP_DEFAULT, transform: 'scale(1)', transformOrigin: '50% 100%' }
];

const SCALE_UP_BL: Keyframe[] = [
  { offset: 0, ...SCALE_UP_DEFAULT, transform: 'scale(0.5)', transformOrigin: '0% 100%' },
  { offset: 1, ...SCALE_UP_DEFAULT, transform: 'scale(1)', transformOrigin: '0% 100%' }
];

const SCALE_UP_LEFT: Keyframe[] = [
  { offset: 0, ...SCALE_UP_DEFAULT, transform: 'scale(0.5)', transformOrigin: '0% 50%' },
  { offset: 1, ...SCALE_UP_DEFAULT, transform: 'scale(1)', transformOrigin: '0% 50%' }
];

const SCALE_UP_TL: Keyframe[] = [
  { offset: 0, ...SCALE_UP_DEFAULT, transform: 'scale(0.5)', transformOrigin: '0% 0%' },
  { offset: 1, ...SCALE_UP_DEFAULT, transform: 'scale(1)', transformOrigin: '0% 0%' }
];

const SCALE_UP_HOR_CENTER: Keyframe[] = [
  { offset: 0, ...SCALE_UP_DEFAULT, transform: 'scaleX(0.4)' },
  { offset: 1, ...SCALE_UP_DEFAULT, transform: 'scaleX(1)' }
];

const SCALE_UP_HOR_LEFT: Keyframe[] = [
  { offset: 0, ...SCALE_UP_DEFAULT, transform: 'scaleX(0.4)', transformOrigin: '0% 0%' },
  { offset: 1, ...SCALE_UP_DEFAULT, transform: 'scaleX(1)', transformOrigin: '0% 0%' }
];

const SCALE_UP_HOR_RIGHT: Keyframe[] = [
  { offset: 0, ...SCALE_UP_DEFAULT, transform: 'scaleX(0.4)', transformOrigin: '100% 100%' },
  { offset: 1, ...SCALE_UP_DEFAULT, transform: 'scaleX(1)', transformOrigin: '100% 100%' }
];

const SCALE_UP_VER_CENTER: Keyframe[] = [
  { offset: 0, ...SCALE_UP_DEFAULT, transform: 'scaleY(0.4)' },
  { offset: 1, ...SCALE_UP_DEFAULT, transform: 'scaleY(1)' }
];

const SCALE_UP_VER_TOP: Keyframe[] = [
  { offset: 0, ...SCALE_UP_DEFAULT, transform: 'scaleY(0.4)', transformOrigin: '100% 0%' },
  { offset: 1, ...SCALE_UP_DEFAULT, transform: 'scaleY(1)', transformOrigin: '100% 0%' }
];

const SCALE_UP_VER_BOTTOM: Keyframe[] = [
  { offset: 0, ...SCALE_UP_DEFAULT, transform: 'scaleY(0.4)', transformOrigin: '0% 100%' },
  { offset: 1, ...SCALE_UP_DEFAULT, transform: 'scaleY(1)', transformOrigin: '0% 100%' }
];

export default {
  [ANIMATIONS.SCALE_UP_CENTER]: SCALE_UP_CENTER,
  [ANIMATIONS.SCALE_UP_TOP]: SCALE_UP_TOP,
  [ANIMATIONS.SCALE_UP_TR]: SCALE_UP_TR,
  [ANIMATIONS.SCALE_UP_RIGHT]: SCALE_UP_RIGHT,
  [ANIMATIONS.SCALE_UP_BR]: SCALE_UP_BR,
  [ANIMATIONS.SCALE_UP_BOTTOM]: SCALE_UP_BOTTOM,
  [ANIMATIONS.SCALE_UP_BL]: SCALE_UP_BL,
  [ANIMATIONS.SCALE_UP_LEFT]: SCALE_UP_LEFT,
  [ANIMATIONS.SCALE_UP_TL]: SCALE_UP_TL,
  [ANIMATIONS.SCALE_UP_HOR_CENTER]: SCALE_UP_HOR_CENTER,
  [ANIMATIONS.SCALE_UP_HOR_LEFT]: SCALE_UP_HOR_LEFT,
  [ANIMATIONS.SCALE_UP_HOR_RIGHT]: SCALE_UP_HOR_RIGHT,
  [ANIMATIONS.SCALE_UP_VER_CENTER]: SCALE_UP_VER_CENTER,
  [ANIMATIONS.SCALE_UP_VER_TOP]: SCALE_UP_VER_TOP,
  [ANIMATIONS.SCALE_UP_VER_BOTTOM]: SCALE_UP_VER_BOTTOM
};
