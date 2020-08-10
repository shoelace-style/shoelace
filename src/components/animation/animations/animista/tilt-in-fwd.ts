import { ANIMATIONS } from './common';

const TILT_IN_FWD_DEFAULT: Keyframe = {
  easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
  fillMode: 'both'
};

const TILT_IN_FWD_TR: Keyframe[] = [
  {
    offset: 0,
    ...TILT_IN_FWD_DEFAULT,
    transform: 'rotateY(20deg) rotateX(35deg) translate(300px, -300px) skew(-35deg, 10deg)',
    opacity: 0
  },
  {
    offset: 1,
    ...TILT_IN_FWD_DEFAULT,
    transform: 'rotateY(0) rotateX(0deg) translate(0, 0) skew(0deg, 0deg)',
    opacity: 1
  }
];

const TILT_IN_FWD_BR: Keyframe[] = [
  {
    offset: 0,
    ...TILT_IN_FWD_DEFAULT,
    transform: 'rotateY(20deg) rotateX(-35deg) translate(300px, 300px) skew(35deg, -10deg)',
    opacity: 0
  },
  {
    offset: 1,
    ...TILT_IN_FWD_DEFAULT,
    transform: 'rotateY(0) rotateX(0deg) translate(0, 0) skew(0deg, 0deg)',
    opacity: 1
  }
];

const TILT_IN_FWD_BL: Keyframe[] = [
  {
    offset: 0,
    ...TILT_IN_FWD_DEFAULT,
    transform: 'rotateY(-20deg) rotateX(-35deg) translate(-300px, 300px) skew(-35deg, 10deg)',
    opacity: 0
  },
  {
    offset: 1,
    ...TILT_IN_FWD_DEFAULT,
    transform: 'rotateY(0) rotateX(0deg) translate(0, 0) skew(0deg, 0deg)',
    opacity: 1
  }
];

const TILT_IN_FWD_TL: Keyframe[] = [
  {
    offset: 0,
    ...TILT_IN_FWD_DEFAULT,
    transform: 'rotateY(-20deg) rotateX(35deg) translate(-300px, -300px) skew(35deg, -10deg)',
    opacity: 0
  },
  {
    offset: 1,
    ...TILT_IN_FWD_DEFAULT,
    transform: 'rotateY(0) rotateX(0deg) translate(0, 0) skew(0deg, 0deg)',
    opacity: 1
  }
];

export default {
  [ANIMATIONS.TILT_IN_FWD_TR]: TILT_IN_FWD_TR,
  [ANIMATIONS.TILT_IN_FWD_BR]: TILT_IN_FWD_BR,
  [ANIMATIONS.TILT_IN_FWD_BL]: TILT_IN_FWD_BL,
  [ANIMATIONS.TILT_IN_FWD_TL]: TILT_IN_FWD_TL
};
