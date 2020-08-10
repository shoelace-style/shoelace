import { ANIMATIONS } from './common';

const ROTATE_IN_2_DEFAULT: Keyframe = {
  easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
  fillMode: 'both',
  transformOrigin: 'center center'
};

const ROTATE_IN_2_CW: Keyframe[] = [
  { offset: 0, ...ROTATE_IN_2_DEFAULT, transform: 'rotate(-45deg)', opacity: 0 },
  { offset: 1, ...ROTATE_IN_2_DEFAULT, transform: 'rotate(0)', opacity: 1 }
];

const ROTATE_IN_2_CCW: Keyframe[] = [
  { offset: 0, ...ROTATE_IN_2_DEFAULT, transform: 'rotate(45deg)', opacity: 0 },
  { offset: 1, ...ROTATE_IN_2_DEFAULT, transform: 'rotate(0)', opacity: 1 }
];

const ROTATE_IN_2_FWD_CW: Keyframe[] = [
  { offset: 0, ...ROTATE_IN_2_DEFAULT, transform: 'translateZ(-200px) rotate(-45deg)', opacity: 0 },
  { offset: 1, ...ROTATE_IN_2_DEFAULT, transform: 'translateZ(0) rotate(0)', opacity: 1 }
];

const ROTATE_IN_2_FWD_CCW: Keyframe[] = [
  { offset: 0, ...ROTATE_IN_2_DEFAULT, transform: 'translateZ(-200px) rotate(45deg)', opacity: 0 },
  { offset: 1, ...ROTATE_IN_2_DEFAULT, transform: 'translateZ(0) rotate(0)', opacity: 1 }
];

const ROTATE_IN_2_BCK_CW: Keyframe[] = [
  { offset: 0, ...ROTATE_IN_2_DEFAULT, transform: 'translateZ(200px) rotate(-45deg)', opacity: 0 },
  { offset: 1, ...ROTATE_IN_2_DEFAULT, transform: 'translateZ(0) rotate(0)', opacity: 1 }
];

const ROTATE_IN_2_BCK_CCW: Keyframe[] = [
  { offset: 0, ...ROTATE_IN_2_DEFAULT, transform: 'translateZ(200px) rotate(45deg)', opacity: 0 },
  { offset: 1, ...ROTATE_IN_2_DEFAULT, transform: 'translateZ(0) rotate(0)', opacity: 1 }
];

const ROTATE_IN_2_TR_CW: Keyframe[] = [
  { offset: 0, ...ROTATE_IN_2_DEFAULT, transform: 'rotate(-45deg)', transformOrigin: '100% 0%', opacity: 0 },
  { offset: 1, ...ROTATE_IN_2_DEFAULT, transform: 'rotate(0)', transformOrigin: '100% 0%', opacity: 1 }
];

const ROTATE_IN_2_TR_CCW: Keyframe[] = [
  { offset: 0, ...ROTATE_IN_2_DEFAULT, transform: 'rotate(45deg)', transformOrigin: '100% 0%', opacity: 0 },
  { offset: 1, ...ROTATE_IN_2_DEFAULT, transform: 'rotate(0)', transformOrigin: '100% 0%', opacity: 1 }
];

const ROTATE_IN_2_BR_CW: Keyframe[] = [
  { offset: 0, ...ROTATE_IN_2_DEFAULT, transform: 'rotate(-45deg)', transformOrigin: '100% 100%', opacity: 0 },
  { offset: 1, ...ROTATE_IN_2_DEFAULT, transform: 'rotate(0)', transformOrigin: '100% 100%', opacity: 1 }
];

const ROTATE_IN_2_BR_CCW: Keyframe[] = [
  { offset: 0, ...ROTATE_IN_2_DEFAULT, transform: 'rotate(45deg)', transformOrigin: '100% 100%', opacity: 0 },
  { offset: 1, ...ROTATE_IN_2_DEFAULT, transform: 'rotate(0)', transformOrigin: '100% 100%', opacity: 1 }
];

const ROTATE_IN_2_BL_CW: Keyframe[] = [
  { offset: 0, ...ROTATE_IN_2_DEFAULT, transform: 'rotate(-45deg)', transformOrigin: '0 100%', opacity: 0 },
  { offset: 1, ...ROTATE_IN_2_DEFAULT, transform: 'rotate(0)', transformOrigin: '0 100%', opacity: 1 }
];

const ROTATE_IN_2_BL_CCW: Keyframe[] = [
  { offset: 0, ...ROTATE_IN_2_DEFAULT, transform: 'rotate(45deg)', transformOrigin: '0 100%', opacity: 0 },
  { offset: 1, ...ROTATE_IN_2_DEFAULT, transform: 'rotate(0)', transformOrigin: '0 100%', opacity: 1 }
];

const ROTATE_IN_2_TL_CW: Keyframe[] = [
  { offset: 0, ...ROTATE_IN_2_DEFAULT, transform: 'rotate(-45deg)', transformOrigin: '0 0', opacity: 0 },
  { offset: 1, ...ROTATE_IN_2_DEFAULT, transform: 'rotate(0)', transformOrigin: '0 0', opacity: 1 }
];

const ROTATE_IN_2_TL_CCW: Keyframe[] = [
  { offset: 0, ...ROTATE_IN_2_DEFAULT, transform: 'rotate(45deg)', transformOrigin: '0 0', opacity: 0 },
  { offset: 1, ...ROTATE_IN_2_DEFAULT, transform: 'rotate(0)', transformOrigin: '0 0', opacity: 1 }
];

export default {
  [ANIMATIONS.ROTATE_IN_2_CW]: ROTATE_IN_2_CW,
  [ANIMATIONS.ROTATE_IN_2_CCW]: ROTATE_IN_2_CCW,
  [ANIMATIONS.ROTATE_IN_2_FWD_CW]: ROTATE_IN_2_FWD_CW,
  [ANIMATIONS.ROTATE_IN_2_FWD_CCW]: ROTATE_IN_2_FWD_CCW,
  [ANIMATIONS.ROTATE_IN_2_BCK_CW]: ROTATE_IN_2_BCK_CW,
  [ANIMATIONS.ROTATE_IN_2_BCK_CCW]: ROTATE_IN_2_BCK_CCW,
  [ANIMATIONS.ROTATE_IN_2_TR_CW]: ROTATE_IN_2_TR_CW,
  [ANIMATIONS.ROTATE_IN_2_TR_CCW]: ROTATE_IN_2_TR_CCW,
  [ANIMATIONS.ROTATE_IN_2_BR_CW]: ROTATE_IN_2_BR_CW,
  [ANIMATIONS.ROTATE_IN_2_BR_CCW]: ROTATE_IN_2_BR_CCW,
  [ANIMATIONS.ROTATE_IN_2_BL_CW]: ROTATE_IN_2_BL_CW,
  [ANIMATIONS.ROTATE_IN_2_BL_CCW]: ROTATE_IN_2_BL_CCW,
  [ANIMATIONS.ROTATE_IN_2_TL_CW]: ROTATE_IN_2_TL_CW,
  [ANIMATIONS.ROTATE_IN_2_TL_CCW]: ROTATE_IN_2_TL_CCW
};
