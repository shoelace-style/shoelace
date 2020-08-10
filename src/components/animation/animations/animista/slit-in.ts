import { ANIMATIONS } from './common';

const SLIT_IN_DEFAULT: Keyframe = {
  easing: 'ease-out',
  fillMode: 'both',
  transformOrigin: 'center center'
};

const SLIT_IN_VERTICAL: Keyframe[] = [
  { offset: 0, ...SLIT_IN_DEFAULT, transform: 'translateZ(-800px) rotateY(90deg)', opacity: 0 },
  { offset: 0.54, ...SLIT_IN_DEFAULT, transform: 'translateZ(-160px) rotateY(87deg)', opacity: 1 },
  { offset: 1, ...SLIT_IN_DEFAULT, transform: 'translateZ(0) rotateY(0)', opacity: 1 }
];

const SLIT_IN_HORIZONTAL: Keyframe[] = [
  { offset: 0, ...SLIT_IN_DEFAULT, transform: 'translateZ(-800px) rotateX(90deg)', opacity: 0 },
  { offset: 0.54, ...SLIT_IN_DEFAULT, transform: 'translateZ(-160px) rotateX(87deg)', opacity: 1 },
  { offset: 1, ...SLIT_IN_DEFAULT, transform: 'translateZ(0) rotateX(0)', opacity: 1 }
];

const SLIT_IN_DIAGONAL_1: Keyframe[] = [
  {
    offset: 0,
    ...SLIT_IN_DEFAULT,
    transform: 'translateZ(-800px) rotate3d(1, 1, 0, 90deg)',
    easing: 'ease-in',
    opacity: 0
  },
  {
    offset: 0.54,
    ...SLIT_IN_DEFAULT,
    transform: 'translateZ(-160px) rotate3d(1, 1, 0, 87deg)',
    easing: 'ease-in-out',
    opacity: 1
  },
  {
    offset: 1,
    ...SLIT_IN_DEFAULT,
    transform: 'translateZ(0) rotate3d(1, 1, 0, 0)',
    easing: 'ease-out',
    opacity: 1
  }
];

const SLIT_IN_DIAGONAL_2: Keyframe[] = [
  {
    offset: 0,
    ...SLIT_IN_DEFAULT,
    transform: 'translateZ(-800px) rotate3d(-1, 1, 0, -90deg)',
    easing: 'ease-in',
    opacity: 0
  },
  {
    offset: 0.54,
    ...SLIT_IN_DEFAULT,
    transform: 'translateZ(-160px) rotate3d(-1, 1, 0, -87deg)',
    easing: 'ease-in-out',
    opacity: 1
  },
  {
    offset: 1,
    ...SLIT_IN_DEFAULT,
    transform: 'translateZ(0) rotate3d(-1, 1, 0, 0)',
    easing: 'ease-out',
    opacity: 1
  }
];

export default {
  [ANIMATIONS.SLIT_IN_VERTICAL]: SLIT_IN_VERTICAL,
  [ANIMATIONS.SLIT_IN_HORIZONTAL]: SLIT_IN_HORIZONTAL,
  [ANIMATIONS.SLIT_IN_DIAGONAL_1]: SLIT_IN_DIAGONAL_1,
  [ANIMATIONS.SLIT_IN_DIAGONAL_2]: SLIT_IN_DIAGONAL_2
};
