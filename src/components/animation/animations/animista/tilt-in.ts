import { ANIMATIONS } from './common';

const TILT_IN_DEFAULT: Keyframe = {
  easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
  fillMode: 'both'
};

const TILT_IN_TOP_1: Keyframe[] = [
  {
    offset: 0,
    ...TILT_IN_DEFAULT,
    transform: 'rotateY(30deg) translateY(-300px) skewY(-30deg)',
    opacity: 0
  },
  {
    offset: 1,
    ...TILT_IN_DEFAULT,
    transform: 'rotateY(0deg) translateY(0) skewY(0deg)',
    opacity: 1
  }
];

const TILT_IN_TOP_2: Keyframe[] = [
  {
    offset: 0,
    ...TILT_IN_DEFAULT,
    transform: 'rotateY(-30deg) translateY(-300px) skewY(30deg)',
    opacity: 0
  },
  {
    offset: 1,
    ...TILT_IN_DEFAULT,
    transform: 'rotateY(0deg) translateY(0) skewY(0deg)',
    opacity: 1
  }
];

const TILT_IN_TR: Keyframe[] = [
  {
    offset: 0,
    ...TILT_IN_DEFAULT,
    transform: 'rotateY(-35deg) rotateX(20deg) translate(250px, -250px) skew(-12deg, -15deg)',
    opacity: 0
  },
  {
    offset: 1,
    ...TILT_IN_DEFAULT,
    transform: 'rotateY(0) rotateX(0deg) translate(0, 0) skew(0deg, 0deg)',
    opacity: 1
  }
];

const TILT_IN_RIGHT_1: Keyframe[] = [
  {
    offset: 0,
    ...TILT_IN_DEFAULT,
    transform: 'rotateX(-30deg) translateX(300px) skewX(30deg)',
    opacity: 0
  },
  {
    offset: 1,
    ...TILT_IN_DEFAULT,
    transform: 'rotateX(0deg) translateX(0) skewX(0deg)',
    opacity: 1
  }
];

const TILT_IN_RIGHT_2: Keyframe[] = [
  {
    offset: 0,
    ...TILT_IN_DEFAULT,
    transform: 'rotateX(30deg) translateX(300px) skewX(-30deg)',
    opacity: 0
  },
  {
    offset: 1,
    ...TILT_IN_DEFAULT,
    transform: 'rotateX(0deg) translateX(0) skewX(0deg)',
    opacity: 1
  }
];

const TILT_IN_BR: Keyframe[] = [
  {
    offset: 0,
    ...TILT_IN_DEFAULT,
    transform: 'rotateY(-35deg) rotateX(-20deg) translate(250px, 250px) skew(12deg, 15deg)',
    opacity: 0
  },
  {
    offset: 1,
    ...TILT_IN_DEFAULT,
    transform: 'rotateY(0) rotateX(0deg) translate(0, 0) skew(0deg, 0deg)',
    opacity: 1
  }
];

const TILT_IN_BOTTOM_1: Keyframe[] = [
  {
    offset: 0,
    ...TILT_IN_DEFAULT,
    transform: 'rotateY(30deg) translateY(300px) skewY(-30deg)',
    opacity: 0
  },
  {
    offset: 1,
    ...TILT_IN_DEFAULT,
    transform: 'rotateY(0deg) translateY(0) skewY(0deg)',
    opacity: 1
  }
];

const TILT_IN_BOTTOM_2: Keyframe[] = [
  {
    offset: 0,
    ...TILT_IN_DEFAULT,
    transform: 'rotateY(-30deg) translateY(300px) skewY(30deg)',
    opacity: 0
  },
  {
    offset: 1,
    ...TILT_IN_DEFAULT,
    transform: 'rotateY(0deg) translateY(0) skewY(0deg)',
    opacity: 1
  }
];

const TILT_IN_BL: Keyframe[] = [
  {
    offset: 0,
    ...TILT_IN_DEFAULT,
    transform: 'rotateY(35deg) rotateX(-20deg) translate(-250px, 250px) skew(-12deg, -15deg)',
    opacity: 0
  },
  {
    offset: 1,
    ...TILT_IN_DEFAULT,
    transform: 'rotateY(0) rotateX(0deg) translate(0, 0) skew(0deg, 0deg)',
    opacity: 1
  }
];

const TILT_IN_LEFT_1: Keyframe[] = [
  {
    offset: 0,
    ...TILT_IN_DEFAULT,
    transform: 'rotateX(-30deg) translateX(-300px) skewX(-30deg)',
    opacity: 0
  },
  {
    offset: 1,
    ...TILT_IN_DEFAULT,
    transform: 'rotateX(0deg) translateX(0) skewX(0deg)',
    opacity: 1
  }
];

const TILT_IN_LEFT_2: Keyframe[] = [
  {
    offset: 0,
    ...TILT_IN_DEFAULT,
    transform: 'rotateX(30deg) translateX(-300px) skewX(30deg)',
    opacity: 0
  },
  {
    offset: 1,
    ...TILT_IN_DEFAULT,
    transform: 'rotateX(0deg) translateX(0) skewX(0deg)',
    opacity: 1
  }
];

const TILT_IN_TL: Keyframe[] = [
  {
    offset: 0,
    ...TILT_IN_DEFAULT,
    transform: 'rotateY(35deg) rotateX(20deg) translate(-250px, -250px) skew(12deg, 15deg)',
    opacity: 0
  },
  {
    offset: 1,
    ...TILT_IN_DEFAULT,
    transform: 'rotateY(0) rotateX(0deg) translate(0, 0) skew(0deg, 0deg)',
    opacity: 1
  }
];

export default {
  [ANIMATIONS.TILT_IN_TOP_1]: TILT_IN_TOP_1,
  [ANIMATIONS.TILT_IN_TOP_2]: TILT_IN_TOP_2,
  [ANIMATIONS.TILT_IN_TR]: TILT_IN_TR,
  [ANIMATIONS.TILT_IN_RIGHT_1]: TILT_IN_RIGHT_1,
  [ANIMATIONS.TILT_IN_RIGHT_2]: TILT_IN_RIGHT_2,
  [ANIMATIONS.TILT_IN_BR]: TILT_IN_BR,
  [ANIMATIONS.TILT_IN_BOTTOM_1]: TILT_IN_BOTTOM_1,
  [ANIMATIONS.TILT_IN_BOTTOM_2]: TILT_IN_BOTTOM_2,
  [ANIMATIONS.TILT_IN_BL]: TILT_IN_BL,
  [ANIMATIONS.TILT_IN_LEFT_1]: TILT_IN_LEFT_1,
  [ANIMATIONS.TILT_IN_LEFT_2]: TILT_IN_LEFT_2,
  [ANIMATIONS.TILT_IN_TL]: TILT_IN_TL
};
