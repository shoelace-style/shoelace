import { ANIMATIONS } from './common';

const SHAKE_DEFAULT: Keyframe = {
  easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
  fillMode: 'both'
};

const SHAKE_HORIZONTAL: Keyframe[] = [
  { offset: 0, ...SHAKE_DEFAULT, transform: 'translateX(0)' },
  { offset: 0.1, ...SHAKE_DEFAULT, transform: 'translateX(-10px)' },
  { offset: 0.2, ...SHAKE_DEFAULT, transform: 'translateX(10px)' },
  { offset: 0.3, ...SHAKE_DEFAULT, transform: 'translateX(-10px)' },
  { offset: 0.4, ...SHAKE_DEFAULT, transform: 'translateX(10px)' },
  { offset: 0.5, ...SHAKE_DEFAULT, transform: 'translateX(-10px)' },
  { offset: 0.6, ...SHAKE_DEFAULT, transform: 'translateX(10px)' },
  { offset: 0.7, ...SHAKE_DEFAULT, transform: 'translateX(-10px)' },
  { offset: 0.8, ...SHAKE_DEFAULT, transform: 'translateX(8px)' },
  { offset: 0.9, ...SHAKE_DEFAULT, transform: 'translateX(-8px)' },
  { offset: 1, ...SHAKE_DEFAULT, transform: 'translateX(0)' }
];

const SHAKE_VERTICAL: Keyframe[] = [
  { offset: 0, ...SHAKE_DEFAULT, transform: 'translateY(0)' },
  { offset: 0.1, ...SHAKE_DEFAULT, transform: 'translateY(-8px)' },
  { offset: 0.2, ...SHAKE_DEFAULT, transform: 'translateY(8px)' },
  { offset: 0.3, ...SHAKE_DEFAULT, transform: 'translateY(-8px)' },
  { offset: 0.4, ...SHAKE_DEFAULT, transform: 'translateY(8px)' },
  { offset: 0.5, ...SHAKE_DEFAULT, transform: 'translateY(-8px)' },
  { offset: 0.6, ...SHAKE_DEFAULT, transform: 'translateY(8px)' },
  { offset: 0.7, ...SHAKE_DEFAULT, transform: 'translateY(-8px)' },
  { offset: 0.8, ...SHAKE_DEFAULT, transform: 'translateY(6.4px)' },
  { offset: 0.9, ...SHAKE_DEFAULT, transform: 'translateY(-6.4px)' },
  { offset: 1, ...SHAKE_DEFAULT, transform: 'translateY(0)' }
];

const SHAKE_LR: Keyframe[] = [
  { offset: 0, ...SHAKE_DEFAULT, transform: 'rotate(0deg)', transformOrigin: '50% 50%' },
  { offset: 0.1, ...SHAKE_DEFAULT, transform: 'rotate(8deg)' },
  { offset: 0.2, ...SHAKE_DEFAULT, transform: 'rotate(-10deg)' },
  { offset: 0.3, ...SHAKE_DEFAULT, transform: 'rotate(10deg)' },
  { offset: 0.4, ...SHAKE_DEFAULT, transform: 'rotate(-10deg)' },
  { offset: 0.5, ...SHAKE_DEFAULT, transform: 'rotate(10deg)' },
  { offset: 0.6, ...SHAKE_DEFAULT, transform: 'rotate(-10deg)' },
  { offset: 0.7, ...SHAKE_DEFAULT, transform: 'rotate(10deg)' },
  { offset: 0.8, ...SHAKE_DEFAULT, transform: 'rotate(-8deg)' },
  { offset: 0.9, ...SHAKE_DEFAULT, transform: 'rotate(8deg)' },
  { offset: 1, ...SHAKE_DEFAULT, transform: 'rotate(0deg)', transformOrigin: '50% 50%' }
];

const SHAKE_TOP: Keyframe[] = [
  { offset: 0, ...SHAKE_DEFAULT, transform: 'rotate(0deg)', transformOrigin: '50% 0' },
  { offset: 0.1, ...SHAKE_DEFAULT, transform: 'rotate(2deg)' },
  { offset: 0.2, ...SHAKE_DEFAULT, transform: 'rotate(-4deg)' },
  { offset: 0.3, ...SHAKE_DEFAULT, transform: 'rotate(4deg)' },
  { offset: 0.4, ...SHAKE_DEFAULT, transform: 'rotate(-4deg)' },
  { offset: 0.5, ...SHAKE_DEFAULT, transform: 'rotate(4deg)' },
  { offset: 0.6, ...SHAKE_DEFAULT, transform: 'rotate(-4deg)' },
  { offset: 0.7, ...SHAKE_DEFAULT, transform: 'rotate(4deg)' },
  { offset: 0.8, ...SHAKE_DEFAULT, transform: 'rotate(-2deg)' },
  { offset: 0.9, ...SHAKE_DEFAULT, transform: 'rotate(2deg)' },
  { offset: 1, ...SHAKE_DEFAULT, transform: 'rotate(0deg)', transformOrigin: '50% 0' }
];

const SHAKE_TR: Keyframe[] = [
  { offset: 0, ...SHAKE_DEFAULT, transform: 'rotate(0deg)', transformOrigin: '100% 0' },
  { offset: 0.1, ...SHAKE_DEFAULT, transform: 'rotate(2deg)' },
  { offset: 0.2, ...SHAKE_DEFAULT, transform: 'rotate(-4deg)' },
  { offset: 0.3, ...SHAKE_DEFAULT, transform: 'rotate(4deg)' },
  { offset: 0.4, ...SHAKE_DEFAULT, transform: 'rotate(-4deg)' },
  { offset: 0.5, ...SHAKE_DEFAULT, transform: 'rotate(4deg)' },
  { offset: 0.6, ...SHAKE_DEFAULT, transform: 'rotate(-4deg)' },
  { offset: 0.7, ...SHAKE_DEFAULT, transform: 'rotate(4deg)' },
  { offset: 0.8, ...SHAKE_DEFAULT, transform: 'rotate(-2deg)' },
  { offset: 0.9, ...SHAKE_DEFAULT, transform: 'rotate(2deg)' },
  { offset: 1, ...SHAKE_DEFAULT, transform: 'rotate(0deg)', transformOrigin: '100% 0' }
];

const SHAKE_RIGHT: Keyframe[] = [
  { offset: 0, ...SHAKE_DEFAULT, transform: 'rotate(0deg)', transformOrigin: '100% 50%' },
  { offset: 0.1, ...SHAKE_DEFAULT, transform: 'rotate(2deg)' },
  { offset: 0.2, ...SHAKE_DEFAULT, transform: 'rotate(-4deg)' },
  { offset: 0.3, ...SHAKE_DEFAULT, transform: 'rotate(4deg)' },
  { offset: 0.4, ...SHAKE_DEFAULT, transform: 'rotate(-4deg)' },
  { offset: 0.5, ...SHAKE_DEFAULT, transform: 'rotate(4deg)' },
  { offset: 0.6, ...SHAKE_DEFAULT, transform: 'rotate(-4deg)' },
  { offset: 0.7, ...SHAKE_DEFAULT, transform: 'rotate(4deg)' },
  { offset: 0.8, ...SHAKE_DEFAULT, transform: 'rotate(-2deg)' },
  { offset: 0.9, ...SHAKE_DEFAULT, transform: 'rotate(2deg)' },
  { offset: 1, ...SHAKE_DEFAULT, transform: 'rotate(0deg)', transformOrigin: '100% 50%' }
];

const SHAKE_BR: Keyframe[] = [
  { offset: 0, ...SHAKE_DEFAULT, transform: 'rotate(0deg)', transformOrigin: '100% 100%' },
  { offset: 0.1, ...SHAKE_DEFAULT, transform: 'rotate(2deg)' },
  { offset: 0.2, ...SHAKE_DEFAULT, transform: 'rotate(-4deg)' },
  { offset: 0.3, ...SHAKE_DEFAULT, transform: 'rotate(4deg)' },
  { offset: 0.4, ...SHAKE_DEFAULT, transform: 'rotate(-4deg)' },
  { offset: 0.5, ...SHAKE_DEFAULT, transform: 'rotate(4deg)' },
  { offset: 0.6, ...SHAKE_DEFAULT, transform: 'rotate(-4deg)' },
  { offset: 0.7, ...SHAKE_DEFAULT, transform: 'rotate(4deg)' },
  { offset: 0.8, ...SHAKE_DEFAULT, transform: 'rotate(-2deg)' },
  { offset: 0.9, ...SHAKE_DEFAULT, transform: 'rotate(2deg)' },
  { offset: 1, ...SHAKE_DEFAULT, transform: 'rotate(0deg)', transformOrigin: '100% 100%' }
];

const SHAKE_BOTTOM: Keyframe[] = [
  { offset: 0, ...SHAKE_DEFAULT, transform: 'rotate(0deg)', transformOrigin: '50% 100%' },
  { offset: 0.1, ...SHAKE_DEFAULT, transform: 'rotate(2deg)' },
  { offset: 0.2, ...SHAKE_DEFAULT, transform: 'rotate(-4deg)' },
  { offset: 0.3, ...SHAKE_DEFAULT, transform: 'rotate(4deg)' },
  { offset: 0.4, ...SHAKE_DEFAULT, transform: 'rotate(-4deg)' },
  { offset: 0.5, ...SHAKE_DEFAULT, transform: 'rotate(4deg)' },
  { offset: 0.6, ...SHAKE_DEFAULT, transform: 'rotate(-4deg)' },
  { offset: 0.7, ...SHAKE_DEFAULT, transform: 'rotate(4deg)' },
  { offset: 0.8, ...SHAKE_DEFAULT, transform: 'rotate(-2deg)' },
  { offset: 0.9, ...SHAKE_DEFAULT, transform: 'rotate(2deg)' },
  { offset: 1, ...SHAKE_DEFAULT, transform: 'rotate(0deg)', transformOrigin: '50% 100%' }
];

const SHAKE_BL: Keyframe[] = [
  { offset: 0, ...SHAKE_DEFAULT, transform: 'rotate(0deg)', transformOrigin: '0% 100%' },
  { offset: 0.1, ...SHAKE_DEFAULT, transform: 'rotate(2deg)' },
  { offset: 0.2, ...SHAKE_DEFAULT, transform: 'rotate(-4deg)' },
  { offset: 0.3, ...SHAKE_DEFAULT, transform: 'rotate(4deg)' },
  { offset: 0.4, ...SHAKE_DEFAULT, transform: 'rotate(-4deg)' },
  { offset: 0.5, ...SHAKE_DEFAULT, transform: 'rotate(4deg)' },
  { offset: 0.6, ...SHAKE_DEFAULT, transform: 'rotate(-4deg)' },
  { offset: 0.7, ...SHAKE_DEFAULT, transform: 'rotate(4deg)' },
  { offset: 0.8, ...SHAKE_DEFAULT, transform: 'rotate(-2deg)' },
  { offset: 0.9, ...SHAKE_DEFAULT, transform: 'rotate(2deg)' },
  { offset: 1, ...SHAKE_DEFAULT, transform: 'rotate(0deg)', transformOrigin: '0% 100%' }
];

const SHAKE_LEFT: Keyframe[] = [
  { offset: 0, ...SHAKE_DEFAULT, transform: 'rotate(0deg)', transformOrigin: '0% 50%' },
  { offset: 0.1, ...SHAKE_DEFAULT, transform: 'rotate(2deg)' },
  { offset: 0.2, ...SHAKE_DEFAULT, transform: 'rotate(-4deg)' },
  { offset: 0.3, ...SHAKE_DEFAULT, transform: 'rotate(4deg)' },
  { offset: 0.4, ...SHAKE_DEFAULT, transform: 'rotate(-4deg)' },
  { offset: 0.5, ...SHAKE_DEFAULT, transform: 'rotate(4deg)' },
  { offset: 0.6, ...SHAKE_DEFAULT, transform: 'rotate(-4deg)' },
  { offset: 0.7, ...SHAKE_DEFAULT, transform: 'rotate(4deg)' },
  { offset: 0.8, ...SHAKE_DEFAULT, transform: 'rotate(-2deg)' },
  { offset: 0.9, ...SHAKE_DEFAULT, transform: 'rotate(2deg)' },
  { offset: 1, ...SHAKE_DEFAULT, transform: 'rotate(0deg)', transformOrigin: '0% 50%' }
];

const SHAKE_TL: Keyframe[] = [
  { offset: 0, ...SHAKE_DEFAULT, transform: 'rotate(0deg)', transformOrigin: '0% 0%' },
  { offset: 0.1, ...SHAKE_DEFAULT, transform: 'rotate(2deg)' },
  { offset: 0.2, ...SHAKE_DEFAULT, transform: 'rotate(-4deg)' },
  { offset: 0.3, ...SHAKE_DEFAULT, transform: 'rotate(4deg)' },
  { offset: 0.4, ...SHAKE_DEFAULT, transform: 'rotate(-4deg)' },
  { offset: 0.5, ...SHAKE_DEFAULT, transform: 'rotate(4deg)' },
  { offset: 0.6, ...SHAKE_DEFAULT, transform: 'rotate(-4deg)' },
  { offset: 0.7, ...SHAKE_DEFAULT, transform: 'rotate(4deg)' },
  { offset: 0.8, ...SHAKE_DEFAULT, transform: 'rotate(-2deg)' },
  { offset: 0.9, ...SHAKE_DEFAULT, transform: 'rotate(2deg)' },
  { offset: 1, ...SHAKE_DEFAULT, transform: 'rotate(0deg)', transformOrigin: '0% 0%' }
];

export default {
  [ANIMATIONS.SHAKE_HORIZONTAL]: SHAKE_HORIZONTAL,
  [ANIMATIONS.SHAKE_VERTICAL]: SHAKE_VERTICAL,
  [ANIMATIONS.SHAKE_LR]: SHAKE_LR,
  [ANIMATIONS.SHAKE_TOP]: SHAKE_TOP,
  [ANIMATIONS.SHAKE_TR]: SHAKE_TR,
  [ANIMATIONS.SHAKE_RIGHT]: SHAKE_RIGHT,
  [ANIMATIONS.SHAKE_BR]: SHAKE_BR,
  [ANIMATIONS.SHAKE_BOTTOM]: SHAKE_BOTTOM,
  [ANIMATIONS.SHAKE_BL]: SHAKE_BL,
  [ANIMATIONS.SHAKE_LEFT]: SHAKE_LEFT,
  [ANIMATIONS.SHAKE_TL]: SHAKE_TL
};
