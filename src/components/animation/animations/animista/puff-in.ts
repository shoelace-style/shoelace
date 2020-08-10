import { ANIMATIONS } from './common';

const PUFF_IN_DEFAULT: Keyframe = {
  easing: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
  fillMode: 'both'
};

const PUFF_IN_CENTER: Keyframe[] = [
  {
    offset: 0,
    ...PUFF_IN_DEFAULT,
    transform: 'scale(2)',
    filter: 'blur(4px)',
    opacity: 0
  },
  {
    offset: 1,
    ...PUFF_IN_DEFAULT,
    transform: 'scale(1)',
    filter: 'blur(0)',
    opacity: 1
  }
];

const PUFF_IN_TOP: Keyframe[] = [
  {
    offset: 0,
    ...PUFF_IN_DEFAULT,
    transform: 'scale(2)',
    transformOrigin: '50% 0%',
    filter: 'blur(4px)',
    opacity: 0
  },
  {
    offset: 1,
    ...PUFF_IN_DEFAULT,
    transform: 'scale(1)',
    transformOrigin: '50% 0%',
    filter: 'blur(0)',
    opacity: 1
  }
];

const PUFF_IN_TR: Keyframe[] = [
  {
    offset: 0,
    ...PUFF_IN_DEFAULT,
    transform: 'scale(2)',
    transformOrigin: '100% 0%',
    filter: 'blur(4px)',
    opacity: 0
  },
  {
    offset: 1,
    ...PUFF_IN_DEFAULT,
    transform: 'scale(1)',
    transformOrigin: '100% 0%',
    filter: 'blur(0)',
    opacity: 1
  }
];

const PUFF_IN_RIGHT: Keyframe[] = [
  {
    offset: 0,
    ...PUFF_IN_DEFAULT,
    transform: 'scale(2)',
    transformOrigin: '100% 50%',
    filter: 'blur(4px)',
    opacity: 0
  },
  {
    offset: 1,
    ...PUFF_IN_DEFAULT,
    transform: 'scale(1)',
    transformOrigin: '100% 50%',
    filter: 'blur(0)',
    opacity: 1
  }
];

const PUFF_IN_BR: Keyframe[] = [
  {
    offset: 0,
    ...PUFF_IN_DEFAULT,
    transform: 'scale(2)',
    transformOrigin: '100% 100%',
    filter: 'blur(4px)',
    opacity: 0
  },
  {
    offset: 1,
    ...PUFF_IN_DEFAULT,
    transform: 'scale(1)',
    transformOrigin: '100% 100%',
    filter: 'blur(0)',
    opacity: 1
  }
];

const PUFF_IN_BOTTOM: Keyframe[] = [
  {
    offset: 0,
    ...PUFF_IN_DEFAULT,
    transform: 'scale(2)',
    transformOrigin: '50% 100%',
    filter: 'blur(4px)',
    opacity: 0
  },
  {
    offset: 1,
    ...PUFF_IN_DEFAULT,
    transform: 'scale(1)',
    transformOrigin: '50% 100%',
    filter: 'blur(0)',
    opacity: 1
  }
];

const PUFF_IN_BL: Keyframe[] = [
  {
    offset: 0,
    ...PUFF_IN_DEFAULT,
    transform: 'scale(2)',
    transformOrigin: '0% 100%',
    filter: 'blur(4px)',
    opacity: 0
  },
  {
    offset: 1,
    ...PUFF_IN_DEFAULT,
    transform: 'scale(1)',
    transformOrigin: '0% 100%',
    filter: 'blur(0)',
    opacity: 1
  }
];

const PUFF_IN_LEFT: Keyframe[] = [
  {
    offset: 0,
    ...PUFF_IN_DEFAULT,
    transform: 'scale(2)',
    transformOrigin: '0% 50%',
    filter: 'blur(4px)',
    opacity: 0
  },
  {
    offset: 1,
    ...PUFF_IN_DEFAULT,
    transform: 'scale(1)',
    transformOrigin: '0% 50%',
    filter: 'blur(0)',
    opacity: 1
  }
];

const PUFF_IN_TL: Keyframe[] = [
  {
    offset: 0,
    ...PUFF_IN_DEFAULT,
    transform: 'scale(2)',
    transformOrigin: '0% 0%',
    filter: 'blur(4px)',
    opacity: 0
  },
  {
    offset: 1,
    ...PUFF_IN_DEFAULT,
    transform: 'scale(1)',
    transformOrigin: '0% 0%',
    filter: 'blur(0)',
    opacity: 1
  }
];

const PUFF_IN_HOR: Keyframe[] = [
  {
    offset: 0,
    ...PUFF_IN_DEFAULT,
    transform: 'scaleX(2)',
    transformOrigin: 'center center',
    filter: 'blur(4px)',
    opacity: 0
  },
  {
    offset: 1,
    ...PUFF_IN_DEFAULT,
    transform: 'scaleX(1)',
    transformOrigin: 'center center',
    filter: 'blur(0)',
    opacity: 1
  }
];

const PUFF_IN_VER: Keyframe[] = [
  {
    offset: 0,
    ...PUFF_IN_DEFAULT,
    transform: 'scaleY(2)',
    transformOrigin: 'center center',
    filter: 'blur(4px)',
    opacity: 0
  },
  {
    offset: 1,
    ...PUFF_IN_DEFAULT,
    transform: 'scaleY(1)',
    transformOrigin: 'center center',
    filter: 'blur(0)',
    opacity: 1
  }
];

export default {
  [ANIMATIONS.PUFF_IN_CENTER]: PUFF_IN_CENTER,
  [ANIMATIONS.PUFF_IN_TOP]: PUFF_IN_TOP,
  [ANIMATIONS.PUFF_IN_TR]: PUFF_IN_TR,
  [ANIMATIONS.PUFF_IN_RIGHT]: PUFF_IN_RIGHT,
  [ANIMATIONS.PUFF_IN_BR]: PUFF_IN_BR,
  [ANIMATIONS.PUFF_IN_BOTTOM]: PUFF_IN_BOTTOM,
  [ANIMATIONS.PUFF_IN_BL]: PUFF_IN_BL,
  [ANIMATIONS.PUFF_IN_LEFT]: PUFF_IN_LEFT,
  [ANIMATIONS.PUFF_IN_TL]: PUFF_IN_TL,
  [ANIMATIONS.PUFF_IN_HOR]: PUFF_IN_HOR,
  [ANIMATIONS.PUFF_IN_VER]: PUFF_IN_VER
};
