import { ANIMATIONS } from './common';

const SLIDE_IN_ELLIPTIC_DEFAULT: Keyframe = {
  easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
  fillMode: 'both'
};

const SLIDE_IN_ELLIPTIC_TOP_FWD: Keyframe[] = [
  {
    offset: 0,
    ...SLIDE_IN_ELLIPTIC_DEFAULT,
    transform: 'translateY(-600px) rotateX(-30deg) scale(0)',
    transformOrigin: '50% 100%',
    opacity: 0
  },
  {
    offset: 1,
    ...SLIDE_IN_ELLIPTIC_DEFAULT,
    transform: 'translateY(0) rotateX(0) scale(1)',
    transformOrigin: '50% 100vh',
    opacity: 1
  }
];

const SLIDE_IN_ELLIPTIC_TOP_BCK: Keyframe[] = [
  {
    offset: 0,
    ...SLIDE_IN_ELLIPTIC_DEFAULT,
    transform: 'translateY(-600px) rotateX(30deg) scale(6.5)',
    transformOrigin: '50% 200%',
    opacity: 0
  },
  {
    offset: 1,
    ...SLIDE_IN_ELLIPTIC_DEFAULT,
    transform: 'translateY(0) rotateX(0) scale(1)',
    transformOrigin: '50% -500px',
    opacity: 1
  }
];

const SLIDE_IN_ELLIPTIC_RIGHT_FWD: Keyframe[] = [
  {
    offset: 0,
    ...SLIDE_IN_ELLIPTIC_DEFAULT,
    transform: 'translateX(800px) rotateY(-30deg) scale(0)',
    transformOrigin: '100% 50%',
    opacity: 0
  },
  {
    offset: 1,
    ...SLIDE_IN_ELLIPTIC_DEFAULT,
    transform: 'translateX(0) rotateY(0) scale(1)',
    transformOrigin: '-100vw 50%',
    opacity: 1
  }
];

const SLIDE_IN_ELLIPTIC_RIGHT_BCK: Keyframe[] = [
  {
    offset: 0,
    ...SLIDE_IN_ELLIPTIC_DEFAULT,
    transform: 'translateX(800px) rotateY(30deg) scale(6.5)',
    transformOrigin: '-100% 50%',
    opacity: 0
  },
  {
    offset: 1,
    ...SLIDE_IN_ELLIPTIC_DEFAULT,
    transform: 'translateX(0) rotateY(0) scale(1)',
    transformOrigin: '600px 50%',
    opacity: 1
  }
];

const SLIDE_IN_ELLIPTIC_BOTTOM_FWD: Keyframe[] = [
  {
    offset: 0,
    ...SLIDE_IN_ELLIPTIC_DEFAULT,
    transform: 'translateY(600px) rotateX(30deg) scale(0)',
    transformOrigin: '50% 100%',
    opacity: 0
  },
  {
    offset: 1,
    ...SLIDE_IN_ELLIPTIC_DEFAULT,
    transform: 'translateY(0) rotateX(0) scale(1)',
    transformOrigin: '50% -100vh',
    opacity: 1
  }
];

const SLIDE_IN_ELLIPTIC_BOTTOM_BCK: Keyframe[] = [
  {
    offset: 0,
    ...SLIDE_IN_ELLIPTIC_DEFAULT,
    transform: 'translateY(600px) rotateX(-30deg) scale(6.5)',
    transformOrigin: '50% -100%',
    opacity: 0
  },
  {
    offset: 1,
    ...SLIDE_IN_ELLIPTIC_DEFAULT,
    transform: 'translateY(0) rotateX(0) scale(1)',
    transformOrigin: '50% 500px',
    opacity: 1
  }
];

const SLIDE_IN_ELLIPTIC_LEFT_FWD: Keyframe[] = [
  {
    offset: 0,
    ...SLIDE_IN_ELLIPTIC_DEFAULT,
    transform: 'translateX(-800px) rotateY(30deg) scale(0)',
    transformOrigin: '-100% 50%',
    opacity: 0
  },
  {
    offset: 1,
    ...SLIDE_IN_ELLIPTIC_DEFAULT,
    transform: 'translateX(0) rotateY(0) scale(1)',
    transformOrigin: '100vw 50%',
    opacity: 1
  }
];

const SLIDE_IN_ELLIPTIC_LEFT_BCK: Keyframe[] = [
  {
    offset: 0,
    ...SLIDE_IN_ELLIPTIC_DEFAULT,
    transform: 'translateX(-800px) rotateY(-30deg) scale(6.5)',
    transformOrigin: '200% 50%',
    opacity: 0
  },
  {
    offset: 1,
    ...SLIDE_IN_ELLIPTIC_DEFAULT,
    transform: 'translateX(0) rotateY(0) scale(1)',
    transformOrigin: '-600px 50%',
    opacity: 1
  }
];

export default {
  [ANIMATIONS.SLIDE_IN_ELLIPTIC_TOP_FWD]: SLIDE_IN_ELLIPTIC_TOP_FWD,
  [ANIMATIONS.SLIDE_IN_ELLIPTIC_TOP_BCK]: SLIDE_IN_ELLIPTIC_TOP_BCK,
  [ANIMATIONS.SLIDE_IN_ELLIPTIC_RIGHT_FWD]: SLIDE_IN_ELLIPTIC_RIGHT_FWD,
  [ANIMATIONS.SLIDE_IN_ELLIPTIC_RIGHT_BCK]: SLIDE_IN_ELLIPTIC_RIGHT_BCK,
  [ANIMATIONS.SLIDE_IN_ELLIPTIC_BOTTOM_FWD]: SLIDE_IN_ELLIPTIC_BOTTOM_FWD,
  [ANIMATIONS.SLIDE_IN_ELLIPTIC_BOTTOM_BCK]: SLIDE_IN_ELLIPTIC_BOTTOM_BCK,
  [ANIMATIONS.SLIDE_IN_ELLIPTIC_LEFT_FWD]: SLIDE_IN_ELLIPTIC_LEFT_FWD,
  [ANIMATIONS.SLIDE_IN_ELLIPTIC_LEFT_BCK]: SLIDE_IN_ELLIPTIC_LEFT_BCK
};
