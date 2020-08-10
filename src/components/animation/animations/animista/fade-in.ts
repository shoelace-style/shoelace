import { ANIMATIONS } from './common';

const FADE_IN_DEFAULT: Keyframe = {
  easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
  fillMode: 'both'
};

const FADE_IN_FWD: Keyframe[] = [
  {
    offset: 0,
    ...FADE_IN_DEFAULT,
    transform: 'translateZ(-80px)',
    opacity: 0
  },
  {
    offset: 1,
    ...FADE_IN_DEFAULT,
    transform: 'translateZ(0)',
    opacity: 1
  }
];

const FADE_IN_BCK: Keyframe[] = [
  {
    offset: 0,
    ...FADE_IN_DEFAULT,
    transform: 'translateZ(80px)',
    opacity: 0
  },
  {
    offset: 1,
    ...FADE_IN_DEFAULT,
    transform: 'translateZ(0)',
    opacity: 1
  }
];

const FADE_IN_TOP: Keyframe[] = [
  {
    offset: 0,
    ...FADE_IN_DEFAULT,
    transform: 'translateY(-50px)',
    opacity: 0
  },
  {
    offset: 1,
    ...FADE_IN_DEFAULT,
    transform: 'translateY(0)',
    opacity: 1
  }
];

const FADE_IN_TR: Keyframe[] = [
  {
    offset: 0,
    ...FADE_IN_DEFAULT,
    transform: 'translateX(50px) translateY(-50px)',
    opacity: 0
  },
  {
    offset: 1,
    ...FADE_IN_DEFAULT,
    transform: 'translateX(0) translateY(0)',
    opacity: 1
  }
];

const FADE_IN_RIGHT: Keyframe[] = [
  {
    offset: 0,
    ...FADE_IN_DEFAULT,
    transform: 'translateX(50px)',
    opacity: 0
  },
  {
    offset: 1,
    ...FADE_IN_DEFAULT,
    transform: 'translateX(0)',
    opacity: 1
  }
];

const FADE_IN_BR: Keyframe[] = [
  {
    offset: 0,
    ...FADE_IN_DEFAULT,
    transform: 'translateX(50px) translateY(50px)',
    opacity: 0
  },
  {
    offset: 1,
    ...FADE_IN_DEFAULT,
    transform: 'translateX(0) translateY(0)',
    opacity: 1
  }
];

const FADE_IN_BOTTOM: Keyframe[] = [
  {
    offset: 0,
    ...FADE_IN_DEFAULT,
    transform: 'translateY(50px)',
    opacity: 0
  },
  {
    offset: 1,
    ...FADE_IN_DEFAULT,
    transform: 'translateY(0)',
    opacity: 1
  }
];

const FADE_IN_BL: Keyframe[] = [
  {
    offset: 0,
    ...FADE_IN_DEFAULT,
    transform: 'translateX(-50px) translateY(50px)',
    opacity: 0
  },
  {
    offset: 1,
    ...FADE_IN_DEFAULT,
    transform: 'translateX(0) translateY(0)',
    opacity: 1
  }
];

const FADE_IN_LEFT: Keyframe[] = [
  {
    offset: 0,
    ...FADE_IN_DEFAULT,
    transform: 'translateX(-50px)',
    opacity: 0
  },
  {
    offset: 1,
    ...FADE_IN_DEFAULT,
    transform: 'translateX(0)',
    opacity: 1
  }
];

const FADE_IN_TL: Keyframe[] = [
  {
    offset: 0,
    ...FADE_IN_DEFAULT,
    transform: 'translateX(-50px) translateY(-50px)',
    opacity: 0
  },
  {
    offset: 1,
    ...FADE_IN_DEFAULT,
    transform: 'translateX(0) translateY(0)',
    opacity: 1
  }
];

export default {
  [ANIMATIONS.FADE_IN_FWD]: FADE_IN_FWD,
  [ANIMATIONS.FADE_IN_BCK]: FADE_IN_BCK,
  [ANIMATIONS.FADE_IN_TOP]: FADE_IN_TOP,
  [ANIMATIONS.FADE_IN_TR]: FADE_IN_TR,
  [ANIMATIONS.FADE_IN_RIGHT]: FADE_IN_RIGHT,
  [ANIMATIONS.FADE_IN_BR]: FADE_IN_BR,
  [ANIMATIONS.FADE_IN_BOTTOM]: FADE_IN_BOTTOM,
  [ANIMATIONS.FADE_IN_BL]: FADE_IN_BL,
  [ANIMATIONS.FADE_IN_LEFT]: FADE_IN_LEFT,
  [ANIMATIONS.FADE_IN_TL]: FADE_IN_TL
};
