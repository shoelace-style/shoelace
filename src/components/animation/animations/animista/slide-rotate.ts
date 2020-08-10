import { ANIMATIONS } from './common';

const SLIDE_ROTATE_DEFAULT: Keyframe = {
  easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
  fillMode: 'both'
};

const SLIDE_ROTATE_HOR_TOP: Keyframe[] = [
  { offset: 0, ...SLIDE_ROTATE_DEFAULT, transform: 'translateY(0) rotateX(0deg)' },
  { offset: 1, ...SLIDE_ROTATE_DEFAULT, transform: 'translateY(-150px) rotateX(-90deg)' }
];

const SLIDE_ROTATE_HOR_T_BCK: Keyframe[] = [
  {
    offset: 0,
    ...SLIDE_ROTATE_DEFAULT,
    transform: 'translateY(0) translateZ(0) rotateX(0deg)',
    transformOrigin: 'top center'
  },
  {
    offset: 1,
    ...SLIDE_ROTATE_DEFAULT,
    transform: 'translateY(-150px) translateZ(-230px) rotateX(-90deg)',
    transformOrigin: 'top center'
  }
];

const SLIDE_ROTATE_HOR_T_FWD: Keyframe[] = [
  {
    offset: 0,
    ...SLIDE_ROTATE_DEFAULT,
    transform: 'translateY(0) translateZ(0) rotateX(0deg)',
    transformOrigin: 'bottom center'
  },
  {
    offset: 1,
    ...SLIDE_ROTATE_DEFAULT,
    transform: 'translateY(-150px) translateZ(130px) rotateX(-90deg)',
    transformOrigin: 'bottom center'
  }
];

const SLIDE_ROTATE_VER_RIGHT: Keyframe[] = [
  { offset: 0, ...SLIDE_ROTATE_DEFAULT, transform: 'translateX(0) rotateY(0)' },
  { offset: 1, ...SLIDE_ROTATE_DEFAULT, transform: 'translateX(150px) rotateY(-90deg)' }
];

const SLIDE_ROTATE_VER_R_BCK: Keyframe[] = [
  {
    offset: 0,
    ...SLIDE_ROTATE_DEFAULT,
    transform: 'translateX(0) translateZ(0) rotateY(0)',
    transformOrigin: 'center right'
  },
  {
    offset: 1,
    ...SLIDE_ROTATE_DEFAULT,
    transform: 'translateX(150px) translateZ(-230px) rotateY(-90deg)',
    transformOrigin: 'center right'
  }
];

const SLIDE_ROTATE_VER_R_FWD: Keyframe[] = [
  {
    offset: 0,
    ...SLIDE_ROTATE_DEFAULT,
    transform: 'translateX(0) translateZ(0) rotateY(0)',
    transformOrigin: 'center left'
  },
  {
    offset: 1,
    ...SLIDE_ROTATE_DEFAULT,
    transform: 'translateX(150px) translateZ(130px) rotateY(-90deg)',
    transformOrigin: 'center left'
  }
];

const SLIDE_ROTATE_HOR_BOTTOM: Keyframe[] = [
  { offset: 0, ...SLIDE_ROTATE_DEFAULT, transform: 'translateY(0) rotateX(0deg)' },
  { offset: 1, ...SLIDE_ROTATE_DEFAULT, transform: 'translateY(150px) rotateX(90deg)' }
];

const SLIDE_ROTATE_HOR_B_BCK: Keyframe[] = [
  {
    offset: 0,
    ...SLIDE_ROTATE_DEFAULT,
    transform: 'translateY(0) translateZ(0) rotateX(0deg)',
    transformOrigin: 'bottom center'
  },
  {
    offset: 1,
    ...SLIDE_ROTATE_DEFAULT,
    transform: 'translateY(150px) translateZ(-230px) rotateX(90deg)',
    transformOrigin: 'bottom center'
  }
];

const SLIDE_ROTATE_HOR_B_FWD: Keyframe[] = [
  {
    offset: 0,
    ...SLIDE_ROTATE_DEFAULT,
    transform: 'translateY(0) translateZ(0) rotateX(0deg)',
    transformOrigin: 'top center'
  },
  {
    offset: 1,
    ...SLIDE_ROTATE_DEFAULT,
    transform: 'translateY(150px) translateZ(130px) rotateX(90deg)',
    transformOrigin: 'top center'
  }
];

const SLIDE_ROTATE_VER_LEFT: Keyframe[] = [
  { offset: 0, ...SLIDE_ROTATE_DEFAULT, transform: 'translateX(0) rotateY(0)' },
  { offset: 1, ...SLIDE_ROTATE_DEFAULT, transform: 'translateX(-150px) rotateY(90deg)' }
];

const SLIDE_ROTATE_VER_L_BCK: Keyframe[] = [
  {
    offset: 0,
    ...SLIDE_ROTATE_DEFAULT,
    transform: 'translateX(0) translateZ(0) rotateY(0)',
    transformOrigin: 'center left'
  },
  {
    offset: 1,
    ...SLIDE_ROTATE_DEFAULT,
    transform: 'translateX(-150px) translateZ(-230px) rotateY(90deg)',
    transformOrigin: 'center left'
  }
];

const SLIDE_ROTATE_VER_L_FWD: Keyframe[] = [
  {
    offset: 0,
    ...SLIDE_ROTATE_DEFAULT,
    transform: 'translateX(0) translateZ(0) rotateY(0)',
    transformOrigin: 'center right'
  },
  {
    offset: 1,
    ...SLIDE_ROTATE_DEFAULT,
    transform: 'translateX(-150px) translateZ(130px) rotateY(90deg)',
    transformOrigin: 'center right'
  }
];

export default {
  [ANIMATIONS.SLIDE_ROTATE_HOR_TOP]: SLIDE_ROTATE_HOR_TOP,
  [ANIMATIONS.SLIDE_ROTATE_HOR_T_BCK]: SLIDE_ROTATE_HOR_T_BCK,
  [ANIMATIONS.SLIDE_ROTATE_HOR_T_FWD]: SLIDE_ROTATE_HOR_T_FWD,
  [ANIMATIONS.SLIDE_ROTATE_VER_RIGHT]: SLIDE_ROTATE_VER_RIGHT,
  [ANIMATIONS.SLIDE_ROTATE_VER_R_BCK]: SLIDE_ROTATE_VER_R_BCK,
  [ANIMATIONS.SLIDE_ROTATE_VER_R_FWD]: SLIDE_ROTATE_VER_R_FWD,
  [ANIMATIONS.SLIDE_ROTATE_HOR_BOTTOM]: SLIDE_ROTATE_HOR_BOTTOM,
  [ANIMATIONS.SLIDE_ROTATE_HOR_B_BCK]: SLIDE_ROTATE_HOR_B_BCK,
  [ANIMATIONS.SLIDE_ROTATE_HOR_B_FWD]: SLIDE_ROTATE_HOR_B_FWD,
  [ANIMATIONS.SLIDE_ROTATE_VER_LEFT]: SLIDE_ROTATE_VER_LEFT,
  [ANIMATIONS.SLIDE_ROTATE_VER_L_BCK]: SLIDE_ROTATE_VER_L_BCK,
  [ANIMATIONS.SLIDE_ROTATE_VER_L_FWD]: SLIDE_ROTATE_VER_L_FWD
};
