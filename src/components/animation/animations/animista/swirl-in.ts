import { ANIMATIONS } from './common';

const SWIRL_IN_DEFAULT: Keyframe = {
  easing: 'ease-out',
  fillMode: 'both',
  transformOrigin: 'center center'
};

const SWIRL_IN_FWD: Keyframe[] = [
  { offset: 0, ...SWIRL_IN_DEFAULT, transform: 'rotate(-540deg) scale(0)', opacity: 0 },
  { offset: 1, ...SWIRL_IN_DEFAULT, transform: 'rotate(0) scale(1)', opacity: 1 }
];

const SWIRL_IN_BCK: Keyframe[] = [
  { offset: 0, ...SWIRL_IN_DEFAULT, transform: 'rotate(540deg) scale(5)', opacity: 0 },
  { offset: 1, ...SWIRL_IN_DEFAULT, transform: 'rotate(0) scale(1)', opacity: 1 }
];

const SWIRL_IN_TOP_FWD: Keyframe[] = [
  { offset: 0, ...SWIRL_IN_DEFAULT, transform: 'rotate(-540deg) scale(0)', transformOrigin: '50% 0', opacity: 0 },
  { offset: 1, ...SWIRL_IN_DEFAULT, transform: 'rotate(0) scale(1)', transformOrigin: '50% 0', opacity: 1 }
];

const SWIRL_IN_TOP_BCK: Keyframe[] = [
  { offset: 0, ...SWIRL_IN_DEFAULT, transform: 'rotate(540deg) scale(5)', transformOrigin: '50% 0', opacity: 0 },
  { offset: 1, ...SWIRL_IN_DEFAULT, transform: 'rotate(0) scale(1)', transformOrigin: '50% 0', opacity: 1 }
];

const SWIRL_IN_TR_FWD: Keyframe[] = [
  { offset: 0, ...SWIRL_IN_DEFAULT, transform: 'rotate(-540deg) scale(0)', transformOrigin: '100% 0%', opacity: 0 },
  { offset: 1, ...SWIRL_IN_DEFAULT, transform: 'rotate(0) scale(1)', transformOrigin: '100% 0%', opacity: 1 }
];

const SWIRL_IN_TR_BCK: Keyframe[] = [
  { offset: 0, ...SWIRL_IN_DEFAULT, transform: 'rotate(540deg) scale(5)', transformOrigin: '100% 0%', opacity: 0 },
  { offset: 1, ...SWIRL_IN_DEFAULT, transform: 'rotate(0) scale(1)', transformOrigin: '100% 0%', opacity: 1 }
];

const SWIRL_IN_RIGHT_FWD: Keyframe[] = [
  { offset: 0, ...SWIRL_IN_DEFAULT, transform: 'rotate(-540deg) scale(0)', transformOrigin: '100% 50%', opacity: 0 },
  { offset: 1, ...SWIRL_IN_DEFAULT, transform: 'rotate(0) scale(1)', transformOrigin: '100% 50%', opacity: 1 }
];

const SWIRL_IN_RIGHT_BCK: Keyframe[] = [
  { offset: 0, ...SWIRL_IN_DEFAULT, transform: 'rotate(540deg) scale(5)', transformOrigin: '100% 50%', opacity: 0 },
  { offset: 1, ...SWIRL_IN_DEFAULT, transform: 'rotate(0) scale(1)', transformOrigin: '100% 50%', opacity: 1 }
];

const SWIRL_IN_BR_FWD: Keyframe[] = [
  { offset: 0, ...SWIRL_IN_DEFAULT, transform: 'rotate(-540deg) scale(0)', transformOrigin: '100% 100%', opacity: 0 },
  { offset: 1, ...SWIRL_IN_DEFAULT, transform: 'rotate(0) scale(1)', transformOrigin: '100% 100%', opacity: 1 }
];

const SWIRL_IN_BR_BCK: Keyframe[] = [
  { offset: 0, ...SWIRL_IN_DEFAULT, transform: 'rotate(540deg) scale(5)', transformOrigin: '100% 100%', opacity: 0 },
  { offset: 1, ...SWIRL_IN_DEFAULT, transform: 'rotate(0) scale(1)', transformOrigin: '100% 100%', opacity: 1 }
];

const SWIRL_IN_BOTTOM_FWD: Keyframe[] = [
  { offset: 0, ...SWIRL_IN_DEFAULT, transform: 'rotate(-540deg) scale(0)', transformOrigin: '50% 100%', opacity: 0 },
  { offset: 1, ...SWIRL_IN_DEFAULT, transform: 'rotate(0) scale(1)', transformOrigin: '50% 100%', opacity: 1 }
];

const SWIRL_IN_BOTTOM_BCK: Keyframe[] = [
  { offset: 0, ...SWIRL_IN_DEFAULT, transform: 'rotate(540deg) scale(5)', transformOrigin: '50% 100%', opacity: 0 },
  { offset: 1, ...SWIRL_IN_DEFAULT, transform: 'rotate(0) scale(1)', transformOrigin: '50% 100%', opacity: 1 }
];

const SWIRL_IN_BL_FWD: Keyframe[] = [
  { offset: 0, ...SWIRL_IN_DEFAULT, transform: 'rotate(-540deg) scale(0)', transformOrigin: '0% 100%', opacity: 0 },
  { offset: 1, ...SWIRL_IN_DEFAULT, transform: 'rotate(0) scale(1)', transformOrigin: '0% 100%', opacity: 1 }
];

const SWIRL_IN_BL_BCK: Keyframe[] = [
  { offset: 0, ...SWIRL_IN_DEFAULT, transform: 'rotate(540deg) scale(5)', transformOrigin: '0% 100%', opacity: 0 },
  { offset: 1, ...SWIRL_IN_DEFAULT, transform: 'rotate(0) scale(1)', transformOrigin: '0% 100%', opacity: 1 }
];

const SWIRL_IN_LEFT_FWD: Keyframe[] = [
  { offset: 0, ...SWIRL_IN_DEFAULT, transform: 'rotate(-540deg) scale(0)', transformOrigin: '0 50%', opacity: 0 },
  { offset: 1, ...SWIRL_IN_DEFAULT, transform: 'rotate(0) scale(1)', transformOrigin: '0 50%', opacity: 1 }
];

const SWIRL_IN_LEFT_BCK: Keyframe[] = [
  { offset: 0, ...SWIRL_IN_DEFAULT, transform: 'rotate(540deg) scale(5)', transformOrigin: '0 50%', opacity: 0 },
  { offset: 1, ...SWIRL_IN_DEFAULT, transform: 'rotate(0) scale(1)', transformOrigin: '0 50%', opacity: 1 }
];

const SWIRL_IN_TL_FWD: Keyframe[] = [
  { offset: 0, ...SWIRL_IN_DEFAULT, transform: 'rotate(-540deg) scale(0)', transformOrigin: '0 0', opacity: 0 },
  { offset: 1, ...SWIRL_IN_DEFAULT, transform: 'rotate(0) scale(1)', transformOrigin: '0 0', opacity: 1 }
];

const SWIRL_IN_TL_BCK: Keyframe[] = [
  { offset: 0, ...SWIRL_IN_DEFAULT, transform: 'rotate(540deg) scale(5)', transformOrigin: '0 0', opacity: 0 },
  { offset: 1, ...SWIRL_IN_DEFAULT, transform: 'rotate(0) scale(1)', transformOrigin: '0 0', opacity: 1 }
];

export default {
  [ANIMATIONS.SWIRL_IN_FWD]: SWIRL_IN_FWD,
  [ANIMATIONS.SWIRL_IN_BCK]: SWIRL_IN_BCK,
  [ANIMATIONS.SWIRL_IN_TOP_FWD]: SWIRL_IN_TOP_FWD,
  [ANIMATIONS.SWIRL_IN_TOP_BCK]: SWIRL_IN_TOP_BCK,
  [ANIMATIONS.SWIRL_IN_TR_FWD]: SWIRL_IN_TR_FWD,
  [ANIMATIONS.SWIRL_IN_TR_BCK]: SWIRL_IN_TR_BCK,
  [ANIMATIONS.SWIRL_IN_RIGHT_FWD]: SWIRL_IN_RIGHT_FWD,
  [ANIMATIONS.SWIRL_IN_RIGHT_BCK]: SWIRL_IN_RIGHT_BCK,
  [ANIMATIONS.SWIRL_IN_BR_FWD]: SWIRL_IN_BR_FWD,
  [ANIMATIONS.SWIRL_IN_BR_BCK]: SWIRL_IN_BR_BCK,
  [ANIMATIONS.SWIRL_IN_BOTTOM_FWD]: SWIRL_IN_BOTTOM_FWD,
  [ANIMATIONS.SWIRL_IN_BOTTOM_BCK]: SWIRL_IN_BOTTOM_BCK,
  [ANIMATIONS.SWIRL_IN_BL_FWD]: SWIRL_IN_BL_FWD,
  [ANIMATIONS.SWIRL_IN_BL_BCK]: SWIRL_IN_BL_BCK,
  [ANIMATIONS.SWIRL_IN_LEFT_FWD]: SWIRL_IN_LEFT_FWD,
  [ANIMATIONS.SWIRL_IN_LEFT_BCK]: SWIRL_IN_LEFT_BCK,
  [ANIMATIONS.SWIRL_IN_TL_FWD]: SWIRL_IN_TL_FWD,
  [ANIMATIONS.SWIRL_IN_TL_BCK]: SWIRL_IN_TL_BCK
};
