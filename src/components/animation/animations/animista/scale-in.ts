import { ANIMATIONS } from './common';

const SCALE_IN_DEFAULT: Keyframe = {
  easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
  fillMode: 'both'
};

const SCALE_IN_CENTER: Keyframe[] = [
  {
    offset: 0,
    ...SCALE_IN_DEFAULT,
    transform: 'scale(0)',
    transformOrigin: 'center center',
    opacity: 1
  },
  {
    offset: 1,
    ...SCALE_IN_DEFAULT,
    transform: 'scale(1)',
    transformOrigin: 'center center',
    opacity: 1
  }
];

const SCALE_IN_TOP: Keyframe[] = [
  {
    offset: 0,
    ...SCALE_IN_DEFAULT,
    transform: 'scale(0)',
    transformOrigin: '50% 0%',
    opacity: 1
  },
  {
    offset: 1,
    ...SCALE_IN_DEFAULT,
    transform: 'scale(1)',
    transformOrigin: '50% 0%',
    opacity: 1
  }
];

const SCALE_IN_TR: Keyframe[] = [
  {
    offset: 0,
    ...SCALE_IN_DEFAULT,
    transform: 'scale(0)',
    transformOrigin: '100% 0%',
    opacity: 1
  },
  {
    offset: 1,
    ...SCALE_IN_DEFAULT,
    transform: 'scale(1)',
    transformOrigin: '100% 0%',
    opacity: 1
  }
];

const SCALE_IN_RIGHT: Keyframe[] = [
  {
    offset: 0,
    ...SCALE_IN_DEFAULT,
    transform: 'scale(0)',
    transformOrigin: '100% 50%',
    opacity: 1
  },
  {
    offset: 1,
    ...SCALE_IN_DEFAULT,
    transform: 'scale(1)',
    transformOrigin: '100% 50%',
    opacity: 1
  }
];

const SCALE_IN_BR: Keyframe[] = [
  {
    offset: 0,
    ...SCALE_IN_DEFAULT,
    transform: 'scale(0)',
    transformOrigin: '100% 100%',
    opacity: 1
  },
  {
    offset: 1,
    ...SCALE_IN_DEFAULT,
    transform: 'scale(1)',
    transformOrigin: '100% 100%',
    opacity: 1
  }
];

const SCALE_IN_BOTTOM: Keyframe[] = [
  {
    offset: 0,
    ...SCALE_IN_DEFAULT,
    transform: 'scale(0)',
    transformOrigin: '50% 100%',
    opacity: 1
  },
  {
    offset: 1,
    ...SCALE_IN_DEFAULT,
    transform: 'scale(1)',
    transformOrigin: '50% 100%',
    opacity: 1
  }
];

const SCALE_IN_BL: Keyframe[] = [
  {
    offset: 0,
    ...SCALE_IN_DEFAULT,
    transform: 'scale(0)',
    transformOrigin: '0% 100%',
    opacity: 1
  },
  {
    offset: 1,
    ...SCALE_IN_DEFAULT,
    transform: 'scale(1)',
    transformOrigin: '0% 100%',
    opacity: 1
  }
];

const SCALE_IN_LEFT: Keyframe[] = [
  {
    offset: 0,
    ...SCALE_IN_DEFAULT,
    transform: 'scale(0)',
    transformOrigin: '0% 50%',
    opacity: 1
  },
  {
    offset: 1,
    ...SCALE_IN_DEFAULT,
    transform: 'scale(1)',
    transformOrigin: '0% 50%',
    opacity: 1
  }
];

const SCALE_IN_TL: Keyframe[] = [
  {
    offset: 0,
    ...SCALE_IN_DEFAULT,
    transform: 'scale(0)',
    transformOrigin: '0% 0%',
    opacity: 1
  },
  {
    offset: 1,
    ...SCALE_IN_DEFAULT,
    transform: 'scale(1)',
    transformOrigin: '0% 0%',
    opacity: 1
  }
];

const SCALE_IN_HOR_CENTER: Keyframe[] = [
  {
    offset: 0,
    ...SCALE_IN_DEFAULT,
    transform: 'scaleX(0)',
    transformOrigin: 'center center',
    opacity: 1
  },
  {
    offset: 1,
    ...SCALE_IN_DEFAULT,
    transform: 'scaleX(1)',
    transformOrigin: 'center center',
    opacity: 1
  }
];

const SCALE_IN_HOR_LEFT: Keyframe[] = [
  {
    offset: 0,
    ...SCALE_IN_DEFAULT,
    transform: 'scaleX(0)',
    transformOrigin: '0% 0%',
    opacity: 1
  },
  {
    offset: 1,
    ...SCALE_IN_DEFAULT,
    transform: 'scaleX(1)',
    transformOrigin: '0% 0%',
    opacity: 1
  }
];

const SCALE_IN_HOR_RIGHT: Keyframe[] = [
  {
    offset: 0,
    ...SCALE_IN_DEFAULT,
    transform: 'scaleX(0)',
    transformOrigin: '100% 100%',
    opacity: 1
  },
  {
    offset: 1,
    ...SCALE_IN_DEFAULT,
    transform: 'scaleX(1)',
    transformOrigin: '100% 100%',
    opacity: 1
  }
];

const SCALE_IN_VER_CENTER: Keyframe[] = [
  {
    offset: 0,
    ...SCALE_IN_DEFAULT,
    transform: 'scaleY(0)',
    transformOrigin: 'center center',
    opacity: 1
  },
  {
    offset: 1,
    ...SCALE_IN_DEFAULT,
    transform: 'scaleY(1)',
    transformOrigin: 'center center',
    opacity: 1
  }
];

const SCALE_IN_VER_TOP: Keyframe[] = [
  {
    offset: 0,
    ...SCALE_IN_DEFAULT,
    transform: 'scaleY(0)',
    transformOrigin: '100% 0%',
    opacity: 1
  },
  {
    offset: 1,
    ...SCALE_IN_DEFAULT,
    transform: 'scaleY(1)',
    transformOrigin: '100% 0%',
    opacity: 1
  }
];

const SCALE_IN_VER_BOTTOM: Keyframe[] = [
  {
    offset: 0,
    ...SCALE_IN_DEFAULT,
    transform: 'scaleY(0)',
    transformOrigin: '0% 100%',
    opacity: 1
  },
  {
    offset: 1,
    ...SCALE_IN_DEFAULT,
    transform: 'scaleY(1)',
    transformOrigin: '0% 100%',
    opacity: 1
  }
];

export default {
  [ANIMATIONS.SCALE_IN_CENTER]: SCALE_IN_CENTER,
  [ANIMATIONS.SCALE_IN_TOP]: SCALE_IN_TOP,
  [ANIMATIONS.SCALE_IN_TR]: SCALE_IN_TR,
  [ANIMATIONS.SCALE_IN_RIGHT]: SCALE_IN_RIGHT,
  [ANIMATIONS.SCALE_IN_BR]: SCALE_IN_BR,
  [ANIMATIONS.SCALE_IN_BOTTOM]: SCALE_IN_BOTTOM,
  [ANIMATIONS.SCALE_IN_BL]: SCALE_IN_BL,
  [ANIMATIONS.SCALE_IN_LEFT]: SCALE_IN_LEFT,
  [ANIMATIONS.SCALE_IN_TL]: SCALE_IN_TL,
  [ANIMATIONS.SCALE_IN_HOR_CENTER]: SCALE_IN_HOR_CENTER,
  [ANIMATIONS.SCALE_IN_HOR_LEFT]: SCALE_IN_HOR_LEFT,
  [ANIMATIONS.SCALE_IN_HOR_RIGHT]: SCALE_IN_HOR_RIGHT,
  [ANIMATIONS.SCALE_IN_VER_CENTER]: SCALE_IN_VER_CENTER,
  [ANIMATIONS.SCALE_IN_VER_TOP]: SCALE_IN_VER_TOP,
  [ANIMATIONS.SCALE_IN_VER_BOTTOM]: SCALE_IN_VER_BOTTOM
};
