import { ANIMATIONS } from './common';

const KEN_BURNS_DEFAULT: Keyframe = {
  easing: 'ease-out',
  fillMode: 'both'
};

const KEN_BURNS_TOP: Keyframe[] = [
  { offset: 0, ...KEN_BURNS_DEFAULT, transform: 'scale(1) translateY(0)', transformOrigin: '50% 16%' },
  { offset: 1, ...KEN_BURNS_DEFAULT, transform: 'scale(1.25) translateY(-15px)', transformOrigin: 'top' }
];

const KEN_BURNS_TOP_RIGHT: Keyframe[] = [
  { offset: 0, ...KEN_BURNS_DEFAULT, transform: 'scale(1) translate(0, 0)', transformOrigin: '84% 16%' },
  { offset: 1, ...KEN_BURNS_DEFAULT, transform: 'scale(1.25) translate(20px, -15px)', transformOrigin: 'right top' }
];

const KEN_BURNS_RIGHT: Keyframe[] = [
  { offset: 0, ...KEN_BURNS_DEFAULT, transform: 'scale(1) translate(0, 0)', transformOrigin: '84% 50%' },
  { offset: 1, ...KEN_BURNS_DEFAULT, transform: 'scale(1.25) translateX(20px)', transformOrigin: 'right' }
];

const KEN_BURNS_BOTTOM_RIGHT: Keyframe[] = [
  { offset: 0, ...KEN_BURNS_DEFAULT, transform: 'scale(1) translate(0, 0)', transformOrigin: '84% 84%' },
  { offset: 1, ...KEN_BURNS_DEFAULT, transform: 'scale(1.25) translate(20px, 15px)', transformOrigin: 'right bottom' }
];

const KEN_BURNS_BOTTOM: Keyframe[] = [
  { offset: 0, ...KEN_BURNS_DEFAULT, transform: 'scale(1) translateY(0)', transformOrigin: '50% 84%' },
  { offset: 1, ...KEN_BURNS_DEFAULT, transform: 'scale(1.25) translateY(15px)', transformOrigin: 'bottom' }
];

const KEN_BURNS_BOTTOM_LEFT: Keyframe[] = [
  { offset: 0, ...KEN_BURNS_DEFAULT, transform: 'scale(1) translate(0, 0)', transformOrigin: '16% 84%' },
  { offset: 1, ...KEN_BURNS_DEFAULT, transform: 'scale(1.25) translate(-20px, 15px)', transformOrigin: 'left bottom' }
];

const KEN_BURNS_LEFT: Keyframe[] = [
  { offset: 0, ...KEN_BURNS_DEFAULT, transform: 'scale(1) translate(0, 0)', transformOrigin: '16% 50%' },
  { offset: 1, ...KEN_BURNS_DEFAULT, transform: 'scale(1.25) translateX(-20px)', transformOrigin: 'left' }
];

const KEN_BURNS_TOP_LEFT: Keyframe[] = [
  { offset: 0, ...KEN_BURNS_DEFAULT, transform: 'scale(1) translate(0, 0)', transformOrigin: '16% 16%' },
  { offset: 1, ...KEN_BURNS_DEFAULT, transform: 'scale(1.25) translate(-20px, -15px)', transformOrigin: 'left top' }
];

export default {
  [ANIMATIONS.KEN_BURNS_TOP]: KEN_BURNS_TOP,
  [ANIMATIONS.KEN_BURNS_TOP_RIGHT]: KEN_BURNS_TOP_RIGHT,
  [ANIMATIONS.KEN_BURNS_RIGHT]: KEN_BURNS_RIGHT,
  [ANIMATIONS.KEN_BURNS_BOTTOM_RIGHT]: KEN_BURNS_BOTTOM_RIGHT,
  [ANIMATIONS.KEN_BURNS_BOTTOM]: KEN_BURNS_BOTTOM,
  [ANIMATIONS.KEN_BURNS_BOTTOM_LEFT]: KEN_BURNS_BOTTOM_LEFT,
  [ANIMATIONS.KEN_BURNS_LEFT]: KEN_BURNS_LEFT,
  [ANIMATIONS.KEN_BURNS_TOP_LEFT]: KEN_BURNS_TOP_LEFT
};
