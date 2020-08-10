import { ANIMATIONS } from './common';

const WOBBLE_DEFAULT: Keyframe = {
  fillMode: 'both'
};

const WOBBLE_HOR_BOTTOM: Keyframe[] = [
  { offset: 0, ...WOBBLE_DEFAULT, transform: 'translateX(0)', transformOrigin: '50% 50%' },
  { offset: 0.15, ...WOBBLE_DEFAULT, transform: 'translateX(-30px) rotate(-6deg)' },
  { offset: 0.3, ...WOBBLE_DEFAULT, transform: 'translateX(15px) rotate(6deg)' },
  { offset: 0.45, ...WOBBLE_DEFAULT, transform: 'translateX(-15px) rotate(-3.6deg)' },
  { offset: 0.6, ...WOBBLE_DEFAULT, transform: 'translateX(9px) rotate(2.4deg)' },
  { offset: 0.75, ...WOBBLE_DEFAULT, transform: 'translateX(-6px) rotate(-1.2deg)' },
  { offset: 1, ...WOBBLE_DEFAULT, transform: 'translateX(0)', transformOrigin: '50% 50%' }
];

const WOBBLE_HOR_TOP: Keyframe[] = [
  { offset: 0, ...WOBBLE_DEFAULT, transform: 'translateX(0)', transformOrigin: '50% 50%' },
  { offset: 0.15, ...WOBBLE_DEFAULT, transform: 'translateX(-30px) rotate(6deg)' },
  { offset: 0.3, ...WOBBLE_DEFAULT, transform: 'translateX(15px) rotate(-6deg)' },
  { offset: 0.45, ...WOBBLE_DEFAULT, transform: 'translateX(-15px) rotate(3.6deg)' },
  { offset: 0.6, ...WOBBLE_DEFAULT, transform: 'translateX(9px) rotate(-2.4deg)' },
  { offset: 0.75, ...WOBBLE_DEFAULT, transform: 'translateX(-6px) rotate(1.2deg)' },
  { offset: 1, ...WOBBLE_DEFAULT, transform: 'translateX(0)', transformOrigin: '50% 50%' }
];

const WOBBLE_VER_LEFT: Keyframe[] = [
  { offset: 0, ...WOBBLE_DEFAULT, transform: 'translateY(0) rotate(0)', transformOrigin: '50% 50%' },
  { offset: 0.15, ...WOBBLE_DEFAULT, transform: 'translateY(-30px) rotate(-6deg)' },
  { offset: 0.3, ...WOBBLE_DEFAULT, transform: 'translateY(15px) rotate(6deg)' },
  { offset: 0.45, ...WOBBLE_DEFAULT, transform: 'translateY(-15px) rotate(-3.6deg)' },
  { offset: 0.6, ...WOBBLE_DEFAULT, transform: 'translateY(9px) rotate(2.4deg)' },
  { offset: 0.75, ...WOBBLE_DEFAULT, transform: 'translateY(-6px) rotate(-1.2deg)' },
  { offset: 1, ...WOBBLE_DEFAULT, transform: 'translateY(0) rotate(0)', transformOrigin: '50% 50%' }
];

const WOBBLE_VER_RIGHT: Keyframe[] = [
  { offset: 0, ...WOBBLE_DEFAULT, transform: 'translateY(0) rotate(0)', transformOrigin: '50% 50%' },
  { offset: 0.15, ...WOBBLE_DEFAULT, transform: 'translateY(-30px) rotate(6deg)' },
  { offset: 0.3, ...WOBBLE_DEFAULT, transform: 'translateY(15px) rotate(-6deg)' },
  { offset: 0.45, ...WOBBLE_DEFAULT, transform: 'translateY(-15px) rotate(3.6deg)' },
  { offset: 0.6, ...WOBBLE_DEFAULT, transform: 'translateY(9px) rotate(-2.4deg)' },
  { offset: 0.75, ...WOBBLE_DEFAULT, transform: 'translateY(-6px) rotate(1.2deg)' },
  { offset: 1, ...WOBBLE_DEFAULT, transform: 'translateY(0) rotate(0)', transformOrigin: '50% 50%' }
];

export default {
  [ANIMATIONS.WOBBLE_HOR_BOTTOM]: WOBBLE_HOR_BOTTOM,
  [ANIMATIONS.WOBBLE_HOR_TOP]: WOBBLE_HOR_TOP,
  [ANIMATIONS.WOBBLE_VER_LEFT]: WOBBLE_VER_LEFT,
  [ANIMATIONS.WOBBLE_VER_RIGHT]: WOBBLE_VER_RIGHT
};
