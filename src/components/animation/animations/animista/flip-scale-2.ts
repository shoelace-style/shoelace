import { ANIMATIONS } from './common';

const FLIP_SCALE_2_DEFAULT: Keyframe = {
  easing: 'linear',
  fillMode: 'both'
};

const FLIP_SCALE_2_HOR_TOP: Keyframe[] = [
  { offset: 0, ...FLIP_SCALE_2_DEFAULT, transform: 'translateY(0) rotateX(0) scale(1)', transformOrigin: '50% 0%' },
  {
    offset: 0.5,
    ...FLIP_SCALE_2_DEFAULT,
    transform: 'translateY(-50%) rotateX(-90deg) scale(2)',
    transformOrigin: '50% 50%'
  },
  {
    offset: 1,
    ...FLIP_SCALE_2_DEFAULT,
    transform: 'translateY(-100%) rotateX(-180deg) scale(1)',
    transformOrigin: '50% 100%'
  }
];

const FLIP_SCALE_2_VER_RIGHT: Keyframe[] = [
  { offset: 0, ...FLIP_SCALE_2_DEFAULT, transform: 'translateX(0) rotateY(0) scale(1)', transformOrigin: '100% 50%' },
  {
    offset: 0.5,
    ...FLIP_SCALE_2_DEFAULT,
    transform: 'translateX(50%) rotateY(-90deg) scale(2)',
    transformOrigin: '50% 50%'
  },
  {
    offset: 1,
    ...FLIP_SCALE_2_DEFAULT,
    transform: 'translateX(100%) rotateY(-180deg) scale(1)',
    transformOrigin: '0% 50%'
  }
];

const FLIP_SCALE_2_HOR_BOTTOM: Keyframe[] = [
  { offset: 0, ...FLIP_SCALE_2_DEFAULT, transform: 'translateY(0) rotateX(0) scale(1)', transformOrigin: '50% 100%' },
  {
    offset: 0.5,
    ...FLIP_SCALE_2_DEFAULT,
    transform: 'translateY(50%) rotateX(90deg) scale(2)',
    transformOrigin: '50% 50%'
  },
  {
    offset: 1,
    ...FLIP_SCALE_2_DEFAULT,
    transform: 'translateY(100%) rotateX(180deg) scale(1)',
    transformOrigin: '50% 0%'
  }
];

const FLIP_SCALE_2_VER_LEFT: Keyframe[] = [
  { offset: 0, ...FLIP_SCALE_2_DEFAULT, transform: 'translateX(0) rotateY(0) scale(1)', transformOrigin: '0% 50%' },
  {
    offset: 0.5,
    ...FLIP_SCALE_2_DEFAULT,
    transform: 'translateX(-50%) rotateY(90deg) scale(2)',
    transformOrigin: '50% 50%'
  },
  {
    offset: 1,
    ...FLIP_SCALE_2_DEFAULT,
    transform: 'translateX(-100%) rotateY(180deg) scale(1)',
    transformOrigin: '100% 50%'
  }
];

export default {
  [ANIMATIONS.FLIP_SCALE_2_HOR_TOP]: FLIP_SCALE_2_HOR_TOP,
  [ANIMATIONS.FLIP_SCALE_2_VER_RIGHT]: FLIP_SCALE_2_VER_RIGHT,
  [ANIMATIONS.FLIP_SCALE_2_HOR_BOTTOM]: FLIP_SCALE_2_HOR_BOTTOM,
  [ANIMATIONS.FLIP_SCALE_2_VER_LEFT]: FLIP_SCALE_2_VER_LEFT
};
