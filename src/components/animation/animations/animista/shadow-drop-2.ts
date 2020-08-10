import { ANIMATIONS } from './common';

const SHADOW_DROP_2_DEFAULT: Keyframe = {
  easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
  fillMode: 'both'
};

const SHADOW_DROP_2_CENTER: Keyframe[] = [
  { offset: 0, ...SHADOW_DROP_2_DEFAULT, boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)', transform: 'translateZ(0)' },
  { offset: 1, ...SHADOW_DROP_2_DEFAULT, boxShadow: '0 0 20px 0px rgba(0, 0, 0, 0.35)', transform: 'translateZ(50px)' }
];

const SHADOW_DROP_2_TOP: Keyframe[] = [
  {
    offset: 0,
    ...SHADOW_DROP_2_DEFAULT,
    boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
    transform: 'translateZ(0) translateY(0)'
  },
  {
    offset: 1,
    ...SHADOW_DROP_2_DEFAULT,
    boxShadow: '0 -12px 20px -12px rgba(0, 0, 0, 0.35)',
    transform: 'translateZ(50px) translateY(12px)'
  }
];

const SHADOW_DROP_2_RIGHT: Keyframe[] = [
  {
    offset: 0,
    ...SHADOW_DROP_2_DEFAULT,
    boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
    transform: 'translateZ(0) translateY(0)'
  },
  {
    offset: 1,
    ...SHADOW_DROP_2_DEFAULT,
    boxShadow: '12px 0 20px -12px rgba(0, 0, 0, 0.35)',
    transform: 'translateZ(50px) translateX(-12px)'
  }
];

const SHADOW_DROP_2_BOTTOM: Keyframe[] = [
  {
    offset: 0,
    ...SHADOW_DROP_2_DEFAULT,
    boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
    transform: 'translateZ(0) translateY(0)'
  },
  {
    offset: 1,
    ...SHADOW_DROP_2_DEFAULT,
    boxShadow: '0 12px 20px -12px rgba(0, 0, 0, 0.35)',
    transform: 'translateZ(50px) translateY(-12px)'
  }
];

const SHADOW_DROP_2_LEFT: Keyframe[] = [
  {
    offset: 0,
    ...SHADOW_DROP_2_DEFAULT,
    boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
    transform: 'translateZ(0) translateX(0)'
  },
  {
    offset: 1,
    ...SHADOW_DROP_2_DEFAULT,
    boxShadow: '-12px 0 20px -12px rgba(0, 0, 0, 0.35)',
    transform: 'translateZ(50px) translateX(12px)'
  }
];

const SHADOW_DROP_2_LR: Keyframe[] = [
  {
    offset: 0,
    ...SHADOW_DROP_2_DEFAULT,
    boxShadow: '0 0 0 0 rgba(0, 0, 0, 0), 0 0 0 0 rgba(0, 0, 0, 0)',
    transform: 'translateZ(0)'
  },
  {
    offset: 1,
    ...SHADOW_DROP_2_DEFAULT,
    boxShadow: '-12px 0 20px -12px rgba(0, 0, 0, 0.35), 12px 0 20px -12px rgba(0, 0, 0, 0.35)',
    transform: 'translateZ(50px)'
  }
];

const SHADOW_DROP_2_TB: Keyframe[] = [
  {
    offset: 0,
    ...SHADOW_DROP_2_DEFAULT,
    boxShadow: '0 0 0 0 rgba(0, 0, 0, 0), 0 0 0 0 rgba(0, 0, 0, 0)',
    transform: 'translateZ(0)'
  },
  {
    offset: 1,
    ...SHADOW_DROP_2_DEFAULT,
    boxShadow: '0 -12px 20px -12px rgba(0, 0, 0, 0.35), 0 12px 20px -12px rgba(0, 0, 0, 0.35)',
    transform: 'translateZ(50px)'
  }
];

const SHADOW_DROP_2_TR: Keyframe[] = [
  {
    offset: 0,
    ...SHADOW_DROP_2_DEFAULT,
    boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
    transform: 'translateZ(0) translateX(0) translateY(0)'
  },
  {
    offset: 1,
    ...SHADOW_DROP_2_DEFAULT,
    boxShadow: '12px -12px 20px -12px rgba(0, 0, 0, 0.35)',
    transform: 'translateZ(50px) translateX(-12px) translateY(12px)'
  }
];

const SHADOW_DROP_2_BR: Keyframe[] = [
  {
    offset: 0,
    ...SHADOW_DROP_2_DEFAULT,
    boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
    transform: 'translateZ(0) translateX(0) translateY(0)'
  },
  {
    offset: 1,
    ...SHADOW_DROP_2_DEFAULT,
    boxShadow: '12px 12px 20px -12px rgba(0, 0, 0, 0.35)',
    transform: 'translateZ(50px) translateX(-12px) translateY(-12px)'
  }
];

const SHADOW_DROP_2_BL: Keyframe[] = [
  {
    offset: 0,
    ...SHADOW_DROP_2_DEFAULT,
    boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
    transform: 'translateZ(0) translateX(0) translateY(0)'
  },
  {
    offset: 1,
    ...SHADOW_DROP_2_DEFAULT,
    boxShadow: '-12px 12px 20px -12px rgba(0, 0, 0, 0.35)',
    transform: 'translateZ(50px) translateX(12px) translateY(-12px)'
  }
];

const SHADOW_DROP_2_TL: Keyframe[] = [
  {
    offset: 0,
    ...SHADOW_DROP_2_DEFAULT,
    boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
    transform: 'translateZ(0) translateX(0) translateY(0)'
  },
  {
    offset: 1,
    ...SHADOW_DROP_2_DEFAULT,
    boxShadow: '-12px -12px 20px -12px rgba(0, 0, 0, 0.35)',
    transform: 'translateZ(50px) translateX(12px) translateY(12px)'
  }
];

export default {
  [ANIMATIONS.SHADOW_DROP_2_CENTER]: SHADOW_DROP_2_CENTER,
  [ANIMATIONS.SHADOW_DROP_2_TOP]: SHADOW_DROP_2_TOP,
  [ANIMATIONS.SHADOW_DROP_2_RIGHT]: SHADOW_DROP_2_RIGHT,
  [ANIMATIONS.SHADOW_DROP_2_BOTTOM]: SHADOW_DROP_2_BOTTOM,
  [ANIMATIONS.SHADOW_DROP_2_LEFT]: SHADOW_DROP_2_LEFT,
  [ANIMATIONS.SHADOW_DROP_2_LR]: SHADOW_DROP_2_LR,
  [ANIMATIONS.SHADOW_DROP_2_TB]: SHADOW_DROP_2_TB,
  [ANIMATIONS.SHADOW_DROP_2_TR]: SHADOW_DROP_2_TR,
  [ANIMATIONS.SHADOW_DROP_2_BR]: SHADOW_DROP_2_BR,
  [ANIMATIONS.SHADOW_DROP_2_BL]: SHADOW_DROP_2_BL,
  [ANIMATIONS.SHADOW_DROP_2_TL]: SHADOW_DROP_2_TL
};
