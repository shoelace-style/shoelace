import { ANIMATIONS } from './common';

const SHADOW_DROP_DEFAULT: Keyframe = {
  easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
  fillMode: 'both'
};

const SHADOW_DROP_CENTER: Keyframe[] = [
  { offset: 0, ...SHADOW_DROP_DEFAULT, boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)' },
  { offset: 1, ...SHADOW_DROP_DEFAULT, boxShadow: '0 0 20px 0px rgba(0, 0, 0, 0.35)' }
];

const SHADOW_DROP_TOP: Keyframe[] = [
  { offset: 0, ...SHADOW_DROP_DEFAULT, boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)' },
  { offset: 1, ...SHADOW_DROP_DEFAULT, boxShadow: '0 -12px 20px -12px rgba(0, 0, 0, 0.35)' }
];

const SHADOW_DROP_RIGHT: Keyframe[] = [
  { offset: 0, ...SHADOW_DROP_DEFAULT, boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)' },
  { offset: 1, ...SHADOW_DROP_DEFAULT, boxShadow: '12px 0 20px -12px rgba(0, 0, 0, 0.35)' }
];

const SHADOW_DROP_BOTTOM: Keyframe[] = [
  { offset: 0, ...SHADOW_DROP_DEFAULT, boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)' },
  { offset: 1, ...SHADOW_DROP_DEFAULT, boxShadow: '0 12px 20px -12px rgba(0, 0, 0, 0.35)' }
];

const SHADOW_DROP_LEFT: Keyframe[] = [
  { offset: 0, ...SHADOW_DROP_DEFAULT, boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)' },
  { offset: 1, ...SHADOW_DROP_DEFAULT, boxShadow: '-12px 0 20px -12px rgba(0, 0, 0, 0.35)' }
];

const SHADOW_DROP_LR: Keyframe[] = [
  { offset: 0, ...SHADOW_DROP_DEFAULT, boxShadow: '0 0 0 0 rgba(0, 0, 0, 0), 0 0 0 0 rgba(0, 0, 0, 0)' },
  {
    offset: 1,
    ...SHADOW_DROP_DEFAULT,
    boxShadow: '-12px 0 20px -12px rgba(0, 0, 0, 0.35), 12px 0 20px -12px rgba(0, 0, 0, 0.35)'
  }
];

const SHADOW_DROP_TB: Keyframe[] = [
  { offset: 0, ...SHADOW_DROP_DEFAULT, boxShadow: '0 0 0 0 rgba(0, 0, 0, 0), 0 0 0 0 rgba(0, 0, 0, 0)' },
  {
    offset: 1,
    ...SHADOW_DROP_DEFAULT,
    boxShadow: '0 -12px 20px -12px rgba(0, 0, 0, 0.35), 0 12px 20px -12px rgba(0, 0, 0, 0.35)'
  }
];

const SHADOW_DROP_TR: Keyframe[] = [
  { offset: 0, ...SHADOW_DROP_DEFAULT, boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)' },
  { offset: 1, ...SHADOW_DROP_DEFAULT, boxShadow: '12px -12px 20px -12px rgba(0, 0, 0, 0.35)' }
];

const SHADOW_DROP_BR: Keyframe[] = [
  { offset: 0, ...SHADOW_DROP_DEFAULT, boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)' },
  { offset: 1, ...SHADOW_DROP_DEFAULT, boxShadow: '12px 12px 20px -12px rgba(0, 0, 0, 0.35)' }
];

const SHADOW_DROP_BL: Keyframe[] = [
  { offset: 0, ...SHADOW_DROP_DEFAULT, boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)' },
  { offset: 1, ...SHADOW_DROP_DEFAULT, boxShadow: '-12px 12px 20px -12px rgba(0, 0, 0, 0.35)' }
];

const SHADOW_DROP_TL: Keyframe[] = [
  { offset: 0, ...SHADOW_DROP_DEFAULT, boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)' },
  { offset: 1, ...SHADOW_DROP_DEFAULT, boxShadow: '-12px -12px 20px -12px rgba(0, 0, 0, 0.35)' }
];

export default {
  [ANIMATIONS.SHADOW_DROP_CENTER]: SHADOW_DROP_CENTER,
  [ANIMATIONS.SHADOW_DROP_TOP]: SHADOW_DROP_TOP,
  [ANIMATIONS.SHADOW_DROP_RIGHT]: SHADOW_DROP_RIGHT,
  [ANIMATIONS.SHADOW_DROP_BOTTOM]: SHADOW_DROP_BOTTOM,
  [ANIMATIONS.SHADOW_DROP_LEFT]: SHADOW_DROP_LEFT,
  [ANIMATIONS.SHADOW_DROP_LR]: SHADOW_DROP_LR,
  [ANIMATIONS.SHADOW_DROP_TB]: SHADOW_DROP_TB,
  [ANIMATIONS.SHADOW_DROP_TR]: SHADOW_DROP_TR,
  [ANIMATIONS.SHADOW_DROP_BR]: SHADOW_DROP_BR,
  [ANIMATIONS.SHADOW_DROP_BL]: SHADOW_DROP_BL,
  [ANIMATIONS.SHADOW_DROP_TL]: SHADOW_DROP_TL
};
