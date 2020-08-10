import { ANIMATIONS } from './common';

const SLIDE_IN_BLURRED_DEFAULT: Keyframe = {
  easing: 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
  fillMode: 'both'
};

const SLIDE_IN_BLURRED_TOP: Keyframe[] = [
  {
    offset: 0,
    ...SLIDE_IN_BLURRED_DEFAULT,
    transform: 'translateY(-100vh) scaleY(2.5) scaleX(0.2)',
    transformOrigin: '50% 0%',
    filter: 'blur(40px)',
    opacity: 0
  },
  {
    offset: 1,
    ...SLIDE_IN_BLURRED_DEFAULT,
    transform: 'translateY(0) scaleY(1) scaleX(1)',
    transformOrigin: '50% 50%',
    filter: 'blur(0)',
    opacity: 1
  }
];

const SLIDE_IN_BLURRED_TR: Keyframe[] = [
  {
    offset: 0,
    ...SLIDE_IN_BLURRED_DEFAULT,
    transform: 'translate(100vw, -100vh) skew(-80deg, -10deg)',
    transformOrigin: '0% 0%',
    filter: 'blur(40px)',
    opacity: 0
  },
  {
    offset: 1,
    ...SLIDE_IN_BLURRED_DEFAULT,
    transform: 'translate(0, 0) skew(0deg, 0deg)',
    transformOrigin: '50% 50%',
    filter: 'blur(0)',
    opacity: 1
  }
];

const SLIDE_IN_BLURRED_RIGHT: Keyframe[] = [
  {
    offset: 0,
    ...SLIDE_IN_BLURRED_DEFAULT,
    transform: 'translateX(100vw) scaleX(2.5) scaleY(0.2)',
    transformOrigin: '0% 50%',
    filter: 'blur(40px)',
    opacity: 0
  },
  {
    offset: 1,
    ...SLIDE_IN_BLURRED_DEFAULT,
    transform: 'translateX(0) scaleY(1) scaleX(1)',
    transformOrigin: '50% 50%',
    filter: 'blur(0)',
    opacity: 1
  }
];

const SLIDE_IN_BLURRED_BR: Keyframe[] = [
  {
    offset: 0,
    ...SLIDE_IN_BLURRED_DEFAULT,
    transform: 'translate(100vw, 100vh) skew(80deg, 10deg)',
    transformOrigin: '0% 100%',
    filter: 'blur(40px)',
    opacity: 0
  },
  {
    offset: 1,
    ...SLIDE_IN_BLURRED_DEFAULT,
    transform: 'translate(0, 0) skew(0deg, 0deg)',
    transformOrigin: '50% 50%',
    filter: 'blur(0)',
    opacity: 1
  }
];

const SLIDE_IN_BLURRED_BOTTOM: Keyframe[] = [
  {
    offset: 0,
    ...SLIDE_IN_BLURRED_DEFAULT,
    transform: 'translateY(100vh) scaleY(2.5) scaleX(0.2)',
    transformOrigin: '50% 100%',
    filter: 'blur(40px)',
    opacity: 0
  },
  {
    offset: 1,
    ...SLIDE_IN_BLURRED_DEFAULT,
    transform: 'translateY(0) scaleY(1) scaleX(1)',
    transformOrigin: '50% 50%',
    filter: 'blur(0)',
    opacity: 1
  }
];

const SLIDE_IN_BLURRED_BL: Keyframe[] = [
  {
    offset: 0,
    ...SLIDE_IN_BLURRED_DEFAULT,
    transform: 'translate(-100vw, 100vh) skew(-80deg, -10deg)',
    transformOrigin: '100% 100%',
    filter: 'blur(40px)',
    opacity: 0
  },
  {
    offset: 1,
    ...SLIDE_IN_BLURRED_DEFAULT,
    transform: 'translate(0, 0) skew(0deg, 0deg)',
    transformOrigin: '50% 50%',
    filter: 'blur(0)',
    opacity: 1
  }
];

const SLIDE_IN_BLURRED_LEFT: Keyframe[] = [
  {
    offset: 0,
    ...SLIDE_IN_BLURRED_DEFAULT,
    transform: 'translateX(-100vw) scaleX(2.5) scaleY(0.2)',
    transformOrigin: '100% 50%',
    filter: 'blur(40px)',
    opacity: 0
  },
  {
    offset: 1,
    ...SLIDE_IN_BLURRED_DEFAULT,
    transform: 'translateX(0) scaleY(1) scaleX(1)',
    transformOrigin: '50% 50%',
    filter: 'blur(0)',
    opacity: 1
  }
];

const SLIDE_IN_BLURRED_TL: Keyframe[] = [
  {
    offset: 0,
    ...SLIDE_IN_BLURRED_DEFAULT,
    transform: 'translate(-100vw, -100vh) skew(80deg, 10deg)',
    transformOrigin: '100% 0%',
    filter: 'blur(40px)',
    opacity: 0
  },
  {
    offset: 1,
    ...SLIDE_IN_BLURRED_DEFAULT,
    transform: 'translate(0, 0) skew(0deg, 0deg)',
    transformOrigin: '50% 50%',
    filter: 'blur(0)',
    opacity: 1
  }
];

export default {
  [ANIMATIONS.SLIDE_IN_BLURRED_TOP]: SLIDE_IN_BLURRED_TOP,
  [ANIMATIONS.SLIDE_IN_BLURRED_TR]: SLIDE_IN_BLURRED_TR,
  [ANIMATIONS.SLIDE_IN_BLURRED_RIGHT]: SLIDE_IN_BLURRED_RIGHT,
  [ANIMATIONS.SLIDE_IN_BLURRED_BR]: SLIDE_IN_BLURRED_BR,
  [ANIMATIONS.SLIDE_IN_BLURRED_BOTTOM]: SLIDE_IN_BLURRED_BOTTOM,
  [ANIMATIONS.SLIDE_IN_BLURRED_BL]: SLIDE_IN_BLURRED_BL,
  [ANIMATIONS.SLIDE_IN_BLURRED_LEFT]: SLIDE_IN_BLURRED_LEFT,
  [ANIMATIONS.SLIDE_IN_BLURRED_TL]: SLIDE_IN_BLURRED_TL
};
