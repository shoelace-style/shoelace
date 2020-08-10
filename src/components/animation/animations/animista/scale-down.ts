import { ANIMATIONS } from './common';

const SCALE_DOWN_DEFAULT: Keyframe = {
  easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
  fillMode: 'both',
  transformOrigin: 'center center'
};

const SCALE_DOWN_CENTER: Keyframe[] = [
  { offset: 0, ...SCALE_DOWN_DEFAULT, transform: 'scale(1)' },
  { offset: 1, ...SCALE_DOWN_DEFAULT, transform: 'scale(0.5)' }
];

const SCALE_DOWN_TOP: Keyframe[] = [
  { offset: 0, ...SCALE_DOWN_DEFAULT, transform: 'scale(1)', transformOrigin: '50% 0%' },
  { offset: 1, ...SCALE_DOWN_DEFAULT, transform: 'scale(0.5)', transformOrigin: '50% 0%' }
];

const SCALE_DOWN_TR: Keyframe[] = [
  { offset: 0, ...SCALE_DOWN_DEFAULT, transform: 'scale(1)', transformOrigin: '100% 0%' },
  { offset: 1, ...SCALE_DOWN_DEFAULT, transform: 'scale(0.5)', transformOrigin: '100% 0%' }
];

const SCALE_DOWN_RIGHT: Keyframe[] = [
  { offset: 0, ...SCALE_DOWN_DEFAULT, transform: 'scale(1)', transformOrigin: '100% 50%' },
  { offset: 1, ...SCALE_DOWN_DEFAULT, transform: 'scale(0.5)', transformOrigin: '100% 50%' }
];

const SCALE_DOWN_BR: Keyframe[] = [
  { offset: 0, ...SCALE_DOWN_DEFAULT, transform: 'scale(1)', transformOrigin: '100% 100%' },
  { offset: 1, ...SCALE_DOWN_DEFAULT, transform: 'scale(0.5)', transformOrigin: '100% 100%' }
];

const SCALE_DOWN_BOTTOM: Keyframe[] = [
  { offset: 0, ...SCALE_DOWN_DEFAULT, transform: 'scale(1)', transformOrigin: '50% 100%' },
  { offset: 1, ...SCALE_DOWN_DEFAULT, transform: 'scale(0.5)', transformOrigin: '50% 100%' }
];

const SCALE_DOWN_BL: Keyframe[] = [
  { offset: 0, ...SCALE_DOWN_DEFAULT, transform: 'scale(1)', transformOrigin: '0% 100%' },
  { offset: 1, ...SCALE_DOWN_DEFAULT, transform: 'scale(0.5)', transformOrigin: '0% 100%' }
];

const SCALE_DOWN_LEFT: Keyframe[] = [
  { offset: 0, ...SCALE_DOWN_DEFAULT, transform: 'scale(1)', transformOrigin: '0% 50%' },
  { offset: 1, ...SCALE_DOWN_DEFAULT, transform: 'scale(0.5)', transformOrigin: '0% 50%' }
];

const SCALE_DOWN_TL: Keyframe[] = [
  { offset: 0, ...SCALE_DOWN_DEFAULT, transform: 'scale(1)', transformOrigin: '0% 0%' },
  { offset: 1, ...SCALE_DOWN_DEFAULT, transform: 'scale(0.5)', transformOrigin: '0% 0%' }
];

const SCALE_DOWN_HOR_CENTER: Keyframe[] = [
  { offset: 0, ...SCALE_DOWN_DEFAULT, transform: 'scaleX(1)' },
  { offset: 1, ...SCALE_DOWN_DEFAULT, transform: 'scaleX(0.3)' }
];

const SCALE_DOWN_HOR_LEFT: Keyframe[] = [
  { offset: 0, ...SCALE_DOWN_DEFAULT, transform: 'scaleX(1)', transformOrigin: '0% 0%' },
  { offset: 1, ...SCALE_DOWN_DEFAULT, transform: 'scaleX(0.3)', transformOrigin: '0% 0%' }
];

const SCALE_DOWN_HOR_RIGHT: Keyframe[] = [
  { offset: 0, ...SCALE_DOWN_DEFAULT, transform: 'scaleX(1)', transformOrigin: '100% 100%' },
  { offset: 1, ...SCALE_DOWN_DEFAULT, transform: 'scaleX(0.3)', transformOrigin: '100% 100%' }
];

const SCALE_DOWN_VER_CENTER: Keyframe[] = [
  { offset: 0, ...SCALE_DOWN_DEFAULT, transform: 'scaleY(1)' },
  { offset: 1, ...SCALE_DOWN_DEFAULT, transform: 'scaleY(0.3)' }
];

const SCALE_DOWN_VER_TOP: Keyframe[] = [
  { offset: 0, ...SCALE_DOWN_DEFAULT, transform: 'scaleY(1)', transformOrigin: '100% 0%' },
  { offset: 1, ...SCALE_DOWN_DEFAULT, transform: 'scaleY(0.3)', transformOrigin: '100% 0%' }
];

const SCALE_DOWN_VER_BOTTOM: Keyframe[] = [
  { offset: 0, ...SCALE_DOWN_DEFAULT, transform: 'scaleY(1)', transformOrigin: '0% 100%' },
  { offset: 1, ...SCALE_DOWN_DEFAULT, transform: 'scaleY(0.3)', transformOrigin: '0% 100%' }
];

export default {
  [ANIMATIONS.SCALE_DOWN_CENTER]: SCALE_DOWN_CENTER,
  [ANIMATIONS.SCALE_DOWN_TOP]: SCALE_DOWN_TOP,
  [ANIMATIONS.SCALE_DOWN_TR]: SCALE_DOWN_TR,
  [ANIMATIONS.SCALE_DOWN_RIGHT]: SCALE_DOWN_RIGHT,
  [ANIMATIONS.SCALE_DOWN_BR]: SCALE_DOWN_BR,
  [ANIMATIONS.SCALE_DOWN_BOTTOM]: SCALE_DOWN_BOTTOM,
  [ANIMATIONS.SCALE_DOWN_BL]: SCALE_DOWN_BL,
  [ANIMATIONS.SCALE_DOWN_LEFT]: SCALE_DOWN_LEFT,
  [ANIMATIONS.SCALE_DOWN_TL]: SCALE_DOWN_TL,
  [ANIMATIONS.SCALE_DOWN_HOR_CENTER]: SCALE_DOWN_HOR_CENTER,
  [ANIMATIONS.SCALE_DOWN_HOR_LEFT]: SCALE_DOWN_HOR_LEFT,
  [ANIMATIONS.SCALE_DOWN_HOR_RIGHT]: SCALE_DOWN_HOR_RIGHT,
  [ANIMATIONS.SCALE_DOWN_VER_CENTER]: SCALE_DOWN_VER_CENTER,
  [ANIMATIONS.SCALE_DOWN_VER_TOP]: SCALE_DOWN_VER_TOP,
  [ANIMATIONS.SCALE_DOWN_VER_BOTTOM]: SCALE_DOWN_VER_BOTTOM
};
