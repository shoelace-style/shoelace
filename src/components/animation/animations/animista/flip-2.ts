import { ANIMATIONS } from './common';

const FLIP_2_DEFAULT: Keyframe = {
  easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
  fillMode: 'both'
};

const FLIP_2_HOR_TOP_1: Keyframe[] = [
  { offset: 0, ...FLIP_2_DEFAULT, transform: 'translateY(0) rotateX(0)', transformOrigin: '50% 0%' },
  { offset: 1, ...FLIP_2_DEFAULT, transform: 'translateY(-100%) rotateX(-180deg)', transformOrigin: '50% 100%' }
];

const FLIP_2_HOR_TOP_2: Keyframe[] = [
  { offset: 0, ...FLIP_2_DEFAULT, transform: 'translateY(0) rotateX(0)', transformOrigin: '50% 0%' },
  { offset: 1, ...FLIP_2_DEFAULT, transform: 'translateY(-100%) rotateX(180deg)', transformOrigin: '50% 100%' }
];

const FLIP_2_HOR_TOP_BCK: Keyframe[] = [
  { offset: 0, ...FLIP_2_DEFAULT, transform: 'translateY(0) translateZ(0) rotateX(0)', transformOrigin: '50% 0%' },
  {
    offset: 1,
    ...FLIP_2_DEFAULT,
    transform: 'translateY(-100%) translateZ(-260px) rotateX(180deg)',
    transformOrigin: '50% 100%'
  }
];

const FLIP_2_HOR_TOP_FWD: Keyframe[] = [
  { offset: 0, ...FLIP_2_DEFAULT, transform: 'translateY(0) translateZ(0) rotateX(0)', transformOrigin: '50% 0%' },
  {
    offset: 1,
    ...FLIP_2_DEFAULT,
    transform: 'translateY(-100%) translateZ(160px) rotateX(-180deg)',
    transformOrigin: '50% 100%'
  }
];

const FLIP_2_VER_RIGHT_1: Keyframe[] = [
  { offset: 0, ...FLIP_2_DEFAULT, transform: 'translateX(0) rotateY(0)', transformOrigin: '100% 50%' },
  { offset: 1, ...FLIP_2_DEFAULT, transform: 'translateX(100%) rotateY(-180deg)', transformOrigin: '0% 50%' }
];

const FLIP_2_VER_RIGHT_2: Keyframe[] = [
  { offset: 0, ...FLIP_2_DEFAULT, transform: 'translateX(0) rotateY(0)', transformOrigin: '100% 50%' },
  { offset: 1, ...FLIP_2_DEFAULT, transform: 'translateX(100%) rotateY(180deg)', transformOrigin: '0% 50%' }
];

const FLIP_2_VER_RIGHT_BCK: Keyframe[] = [
  { offset: 0, ...FLIP_2_DEFAULT, transform: 'translateX(0) translateZ(0) rotateY(0)', transformOrigin: '100% 50%' },
  {
    offset: 1,
    ...FLIP_2_DEFAULT,
    transform: 'translateX(100%) translateZ(-260px) rotateY(180deg)',
    transformOrigin: '0% 50%'
  }
];

const FLIP_2_VER_RIGHT_FWD: Keyframe[] = [
  { offset: 0, ...FLIP_2_DEFAULT, transform: 'translateX(0) translateZ(0) rotateY(0)', transformOrigin: '100% 50%' },
  {
    offset: 1,
    ...FLIP_2_DEFAULT,
    transform: 'translateX(100%) translateZ(160px) rotateY(-180deg)',
    transformOrigin: '0% 50%'
  }
];

const FLIP_2_HOR_BOTTOM_1: Keyframe[] = [
  { offset: 0, ...FLIP_2_DEFAULT, transform: 'translateY(0) rotateX(0)', transformOrigin: '50% 100%' },
  { offset: 1, ...FLIP_2_DEFAULT, transform: 'translateY(100%) rotateX(180deg)', transformOrigin: '50% 0%' }
];

const FLIP_2_HOR_BOTTOM_2: Keyframe[] = [
  { offset: 0, ...FLIP_2_DEFAULT, transform: 'translateY(0) rotateX(0)', transformOrigin: '50% 100%' },
  { offset: 1, ...FLIP_2_DEFAULT, transform: 'translateY(100%) rotateX(-180deg)', transformOrigin: '50% 0%' }
];

const FLIP_2_HOR_BOTTOM_BCK: Keyframe[] = [
  { offset: 0, ...FLIP_2_DEFAULT, transform: 'translateY(0) translateZ(0) rotateX(0)', transformOrigin: '50% 100%' },
  {
    offset: 1,
    ...FLIP_2_DEFAULT,
    transform: 'translateY(100%) translateZ(-260px) rotateX(-180deg)',
    transformOrigin: '50% 0%'
  }
];

const FLIP_2_HOR_BOTTOM_FWD: Keyframe[] = [
  { offset: 0, ...FLIP_2_DEFAULT, transform: 'translateY(0) translateZ(0) rotateX(0)', transformOrigin: '50% 100%' },
  {
    offset: 1,
    ...FLIP_2_DEFAULT,
    transform: 'translateY(100%) translateZ(160px) rotateX(180deg)',
    transformOrigin: '50% 0%'
  }
];

const FLIP_2_VER_LEFT_1: Keyframe[] = [
  { offset: 0, ...FLIP_2_DEFAULT, transform: 'translateX(0) rotateY(0)', transformOrigin: '0% 50%' },
  { offset: 1, ...FLIP_2_DEFAULT, transform: 'translateX(-100%) rotateY(180deg)', transformOrigin: '100% 0%' }
];

const FLIP_2_VER_LEFT_2: Keyframe[] = [
  { offset: 0, ...FLIP_2_DEFAULT, transform: 'translateX(0) rotateY(0)', transformOrigin: '0% 50%' },
  { offset: 1, ...FLIP_2_DEFAULT, transform: 'translateX(-100%) rotateY(-180deg)', transformOrigin: '100% 0%' }
];

const FLIP_2_VER_LEFT_BCK: Keyframe[] = [
  { offset: 0, ...FLIP_2_DEFAULT, transform: 'translateX(0) translateZ(0) rotateY(0)', transformOrigin: '0% 50%' },
  {
    offset: 1,
    ...FLIP_2_DEFAULT,
    transform: 'translateX(-100%) translateZ(-260px) rotateY(-180deg)',
    transformOrigin: '100% 0%'
  }
];

const FLIP_2_VER_LEFT_FWD: Keyframe[] = [
  { offset: 0, ...FLIP_2_DEFAULT, transform: 'translateX(0) translateZ(0) rotateY(0)', transformOrigin: '0% 50%' },
  {
    offset: 1,
    ...FLIP_2_DEFAULT,
    transform: 'translateX(-100%) translateZ(160px) rotateY(180deg)',
    transformOrigin: '100% 0%'
  }
];

export default {
  [ANIMATIONS.FLIP_2_HOR_TOP_1]: FLIP_2_HOR_TOP_1,
  [ANIMATIONS.FLIP_2_HOR_TOP_2]: FLIP_2_HOR_TOP_2,
  [ANIMATIONS.FLIP_2_HOR_TOP_BCK]: FLIP_2_HOR_TOP_BCK,
  [ANIMATIONS.FLIP_2_HOR_TOP_FWD]: FLIP_2_HOR_TOP_FWD,
  [ANIMATIONS.FLIP_2_VER_RIGHT_1]: FLIP_2_VER_RIGHT_1,
  [ANIMATIONS.FLIP_2_VER_RIGHT_2]: FLIP_2_VER_RIGHT_2,
  [ANIMATIONS.FLIP_2_VER_RIGHT_BCK]: FLIP_2_VER_RIGHT_BCK,
  [ANIMATIONS.FLIP_2_VER_RIGHT_FWD]: FLIP_2_VER_RIGHT_FWD,
  [ANIMATIONS.FLIP_2_HOR_BOTTOM_1]: FLIP_2_HOR_BOTTOM_1,
  [ANIMATIONS.FLIP_2_HOR_BOTTOM_2]: FLIP_2_HOR_BOTTOM_2,
  [ANIMATIONS.FLIP_2_HOR_BOTTOM_BCK]: FLIP_2_HOR_BOTTOM_BCK,
  [ANIMATIONS.FLIP_2_HOR_BOTTOM_FWD]: FLIP_2_HOR_BOTTOM_FWD,
  [ANIMATIONS.FLIP_2_VER_LEFT_1]: FLIP_2_VER_LEFT_1,
  [ANIMATIONS.FLIP_2_VER_LEFT_2]: FLIP_2_VER_LEFT_2,
  [ANIMATIONS.FLIP_2_VER_LEFT_BCK]: FLIP_2_VER_LEFT_BCK,
  [ANIMATIONS.FLIP_2_VER_LEFT_FWD]: FLIP_2_VER_LEFT_FWD
};
