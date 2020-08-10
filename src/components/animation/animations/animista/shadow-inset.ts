import { ANIMATIONS } from './common';

const SHADOW_INSET_DEFAULT: Keyframe = {
  easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
  fillMode: 'both'
};

const SHADOW_INSET_CENTER: Keyframe[] = [
  {
    offset: 0,
    ...SHADOW_INSET_DEFAULT,
    boxShadow: 'inset 0 0 0 0 rgba(0, 0, 0, 0)'
  },
  {
    offset: 1,
    ...SHADOW_INSET_DEFAULT,
    boxShadow: 'inset 0 0 14px 0px rgba(0, 0, 0, 0.5)'
  }
];

const SHADOW_INSET_TOP: Keyframe[] = [
  {
    offset: 0,
    ...SHADOW_INSET_DEFAULT,
    boxShadow: 'inset 0 0 0 0 rgba(0, 0, 0, 0)'
  },
  {
    offset: 1,
    ...SHADOW_INSET_DEFAULT,
    boxShadow: 'inset 0 6px 14px -6px rgba(0, 0, 0, 0.5)'
  }
];

const SHADOW_INSET_RIGHT: Keyframe[] = [
  {
    offset: 0,
    ...SHADOW_INSET_DEFAULT,
    boxShadow: 'inset 0 0 0 0 rgba(0, 0, 0, 0)'
  },
  {
    offset: 1,
    ...SHADOW_INSET_DEFAULT,
    boxShadow: 'inset -6px 0 14px -6px rgba(0, 0, 0, 0.5)'
  }
];

const SHADOW_INSET_BOTTOM: Keyframe[] = [
  {
    offset: 0,
    ...SHADOW_INSET_DEFAULT,
    boxShadow: 'inset 0 0 0 0 rgba(0, 0, 0, 0)'
  },
  {
    offset: 1,
    ...SHADOW_INSET_DEFAULT,
    boxShadow: 'inset 0 -6px 14px -6px rgba(0, 0, 0, 0.5)'
  }
];

const SHADOW_INSET_LEFT: Keyframe[] = [
  {
    offset: 0,
    ...SHADOW_INSET_DEFAULT,
    boxShadow: 'inset 0 0 0 0 rgba(0, 0, 0, 0)'
  },
  {
    offset: 1,
    ...SHADOW_INSET_DEFAULT,
    boxShadow: 'inset 6px 0 14px -6px rgba(0, 0, 0, 0.5)'
  }
];

const SHADOW_INSET_LR: Keyframe[] = [
  {
    offset: 0,
    ...SHADOW_INSET_DEFAULT,
    boxShadow: 'inset 0 0 0 0 rgba(0, 0, 0, 0), inset 0 0 0 0 rgba(0, 0, 0, 0)'
  },
  {
    offset: 1,
    ...SHADOW_INSET_DEFAULT,
    boxShadow: 'inset -6px 0 14px -6px rgba(0, 0, 0, 0.5), inset 6px 0 14px -6px rgba(0, 0, 0, 0.5)'
  }
];

const SHADOW_INSET_TB: Keyframe[] = [
  {
    offset: 0,
    ...SHADOW_INSET_DEFAULT,
    boxShadow: 'inset 0 0 0 0 rgba(0, 0, 0, 0), inset 0 0 0 0 rgba(0, 0, 0, 0)'
  },
  {
    offset: 1,
    ...SHADOW_INSET_DEFAULT,
    boxShadow: 'inset 0 -6px 14px -6px rgba(0, 0, 0, 0.5), inset 0 6px 14px -6px rgba(0, 0, 0, 0.5)'
  }
];

const SHADOW_INSET_TR: Keyframe[] = [
  {
    offset: 0,
    ...SHADOW_INSET_DEFAULT,
    boxShadow: 'inset 0 0 0 0 rgba(0, 0, 0, 0)'
  },
  {
    offset: 1,
    ...SHADOW_INSET_DEFAULT,
    boxShadow: 'inset -6px 6px 14px -6px rgba(0, 0, 0, 0.5)'
  }
];

const SHADOW_INSET_BR: Keyframe[] = [
  {
    offset: 0,
    ...SHADOW_INSET_DEFAULT,
    boxShadow: 'inset 0 0 0 0 rgba(0, 0, 0, 0)'
  },
  {
    offset: 1,
    ...SHADOW_INSET_DEFAULT,
    boxShadow: 'inset -6px -6px 14px -6px rgba(0, 0, 0, 0.5)'
  }
];

const SHADOW_INSET_BL: Keyframe[] = [
  {
    offset: 0,
    ...SHADOW_INSET_DEFAULT,
    boxShadow: 'inset 0 0 0 0 rgba(0, 0, 0, 0)'
  },
  {
    offset: 1,
    ...SHADOW_INSET_DEFAULT,
    boxShadow: 'inset 6px -6px 14px -6px rgba(0, 0, 0, 0.5)'
  }
];

const SHADOW_INSET_TL: Keyframe[] = [
  {
    offset: 0,
    ...SHADOW_INSET_DEFAULT,
    boxShadow: 'inset 0 0 0 0 rgba(0, 0, 0, 0)'
  },
  {
    offset: 1,
    ...SHADOW_INSET_DEFAULT,
    boxShadow: 'inset 6px 6px 14px -6px rgba(0, 0, 0, 0.5)'
  }
];

export default {
  [ANIMATIONS.SHADOW_INSET_CENTER]: SHADOW_INSET_CENTER,
  [ANIMATIONS.SHADOW_INSET_TOP]: SHADOW_INSET_TOP,
  [ANIMATIONS.SHADOW_INSET_RIGHT]: SHADOW_INSET_RIGHT,
  [ANIMATIONS.SHADOW_INSET_BOTTOM]: SHADOW_INSET_BOTTOM,
  [ANIMATIONS.SHADOW_INSET_LEFT]: SHADOW_INSET_LEFT,
  [ANIMATIONS.SHADOW_INSET_LR]: SHADOW_INSET_LR,
  [ANIMATIONS.SHADOW_INSET_TB]: SHADOW_INSET_TB,
  [ANIMATIONS.SHADOW_INSET_TR]: SHADOW_INSET_TR,
  [ANIMATIONS.SHADOW_INSET_BR]: SHADOW_INSET_BR,
  [ANIMATIONS.SHADOW_INSET_BL]: SHADOW_INSET_BL,
  [ANIMATIONS.SHADOW_INSET_TL]: SHADOW_INSET_TL
};
