import { ANIMATIONS } from './common';

const SHADOW_POP_DEFAULT: Keyframe = {
  easing: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
  fillMode: 'both'
};

const SHADOW_POP_TR: Keyframe[] = [
  {
    offset: 0,
    ...SHADOW_POP_DEFAULT,
    boxShadow: '0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e',
    transform: 'translateX(0) translateY(0)'
  },
  {
    offset: 1,
    ...SHADOW_POP_DEFAULT,
    boxShadow:
      '1px -1px #3e3e3e, 2px -2px #3e3e3e, 3px -3px #3e3e3e, 4px -4px #3e3e3e, 5px -5px #3e3e3e, 6px -6px #3e3e3e, 7px -7px #3e3e3e, 8px -8px #3e3e3e',
    transform: 'translateX(-8px) translateY(8px)'
  }
];

const SHADOW_POP_BR: Keyframe[] = [
  {
    offset: 0,
    ...SHADOW_POP_DEFAULT,
    boxShadow: '0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e',
    transform: 'translateX(0) translateY(0)'
  },
  {
    offset: 1,
    ...SHADOW_POP_DEFAULT,
    boxShadow:
      '1px 1px #3e3e3e, 2px 2px #3e3e3e, 3px 3px #3e3e3e, 4px 4px #3e3e3e, 5px 5px #3e3e3e, 6px 6px #3e3e3e, 7px 7px #3e3e3e, 8px 8px #3e3e3e',
    transform: 'translateX(-8px) translateY(-8px)'
  }
];

const SHADOW_POP_BL: Keyframe[] = [
  {
    offset: 0,
    ...SHADOW_POP_DEFAULT,
    boxShadow: '0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e',
    transform: 'translateX(0) translateY(0)'
  },
  {
    offset: 1,
    ...SHADOW_POP_DEFAULT,
    boxShadow:
      '-1px 1px #3e3e3e, -2px 2px #3e3e3e, -3px 3px #3e3e3e, -4px 4px #3e3e3e, -5px 5px #3e3e3e, -6px 6px #3e3e3e, -7px 7px #3e3e3e, -8px 8px #3e3e3e',
    transform: 'translateX(8px) translateY(-8px)'
  }
];

const SHADOW_POP_TL: Keyframe[] = [
  {
    offset: 0,
    ...SHADOW_POP_DEFAULT,
    boxShadow: '0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e',
    transform: 'translateX(0) translateY(0)'
  },
  {
    offset: 1,
    ...SHADOW_POP_DEFAULT,
    boxShadow:
      '-1px -1px #3e3e3e, -2px -2px #3e3e3e, -3px -3px #3e3e3e, -4px -4px #3e3e3e, -5px -5px #3e3e3e, -6px -6px #3e3e3e, -7px -7px #3e3e3e, -8px -8px #3e3e3e',
    transform: 'translateX(8px) translateY(8px)'
  }
];

export default {
  [ANIMATIONS.SHADOW_POP_TR]: SHADOW_POP_TR,
  [ANIMATIONS.SHADOW_POP_BR]: SHADOW_POP_BR,
  [ANIMATIONS.SHADOW_POP_BL]: SHADOW_POP_BL,
  [ANIMATIONS.SHADOW_POP_TL]: SHADOW_POP_TL
};
