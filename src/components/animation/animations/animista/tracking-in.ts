import { ANIMATIONS } from './common';

const TRACKING_IN_DEFAULT: Keyframe = {
  easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
  fillMode: 'both'
};

const TRACKING_IN_EXPAND: Keyframe[] = [
  { offset: 0, ...TRACKING_IN_DEFAULT, letterSpacing: '-0.5em', opacity: 0 },
  { offset: 0.4, ...TRACKING_IN_DEFAULT, letterSpacing: 'normal', opacity: 0.6 },
  { offset: 1, ...TRACKING_IN_DEFAULT, letterSpacing: 'normal', opacity: 1 }
];

const TRACKING_IN_EXPAND_FWD: Keyframe[] = [
  { offset: 0, ...TRACKING_IN_DEFAULT, letterSpacing: '-0.5em', transform: 'translateZ(-700px)', opacity: 0 },
  { offset: 0.4, ...TRACKING_IN_DEFAULT, letterSpacing: 'normal', opacity: 0.6 },
  { offset: 1, ...TRACKING_IN_DEFAULT, letterSpacing: 'normal', transform: 'translateZ(0)', opacity: 1 }
];

const TRACKING_IN_EXPAND_FWD_TOP: Keyframe[] = [
  {
    offset: 0,
    ...TRACKING_IN_DEFAULT,
    letterSpacing: '-0.5em',
    transform: 'translateZ(-700px) translateY(-500px)',
    opacity: 0
  },
  { offset: 0.4, ...TRACKING_IN_DEFAULT, letterSpacing: 'normal', opacity: 0.6 },
  { offset: 1, ...TRACKING_IN_DEFAULT, letterSpacing: 'normal', transform: 'translateZ(0) translateY(0)', opacity: 1 }
];

const TRACKING_IN_EXPAND_FWD_BOTTOM: Keyframe[] = [
  {
    offset: 0,
    ...TRACKING_IN_DEFAULT,
    letterSpacing: '-0.5em',
    transform: 'translateZ(-700px) translateY(500px)',
    opacity: 0
  },
  { offset: 0.4, ...TRACKING_IN_DEFAULT, letterSpacing: 'normal', opacity: 0.6 },
  { offset: 1, ...TRACKING_IN_DEFAULT, letterSpacing: 'normal', transform: 'translateZ(0) translateY(0)', opacity: 1 }
];

const TRACKING_IN_CONTRACT: Keyframe[] = [
  { offset: 0, ...TRACKING_IN_DEFAULT, letterSpacing: '1em', opacity: 0 },
  { offset: 0.4, ...TRACKING_IN_DEFAULT, letterSpacing: 'normal', opacity: 0.6 },
  { offset: 1, ...TRACKING_IN_DEFAULT, letterSpacing: 'normal', opacity: 1 }
];

const TRACKING_IN_CONTRACT_BCK: Keyframe[] = [
  { offset: 0, ...TRACKING_IN_DEFAULT, letterSpacing: '1em', transform: 'translateZ(400px)', opacity: 0 },
  { offset: 0.4, ...TRACKING_IN_DEFAULT, letterSpacing: 'normal', opacity: 0.6 },
  { offset: 1, ...TRACKING_IN_DEFAULT, letterSpacing: 'normal', transform: 'translateZ(0)', opacity: 1 }
];

const TRACKING_IN_CONTRACT_BCK_TOP: Keyframe[] = [
  {
    offset: 0,
    ...TRACKING_IN_DEFAULT,
    letterSpacing: '1em',
    transform: 'translateZ(400px) translateY(-300px)',
    opacity: 0
  },
  { offset: 0.4, ...TRACKING_IN_DEFAULT, letterSpacing: 'normal', opacity: 0.6 },
  { offset: 1, ...TRACKING_IN_DEFAULT, letterSpacing: 'normal', transform: 'translateZ(0) translateY(0)', opacity: 1 }
];

const TRACKING_IN_CONTRACT_BCK_BOTTOM: Keyframe[] = [
  {
    offset: 0,
    ...TRACKING_IN_DEFAULT,
    letterSpacing: '1em',
    transform: 'translateZ(400px) translateY(300px)',
    opacity: 0
  },
  { offset: 0.4, ...TRACKING_IN_DEFAULT, letterSpacing: 'normal', opacity: 0.6 },
  { offset: 1, ...TRACKING_IN_DEFAULT, letterSpacing: 'normal', transform: 'translateZ(0) translateY(0)', opacity: 1 }
];

export default {
  [ANIMATIONS.TRACKING_IN_EXPAND]: TRACKING_IN_EXPAND,
  [ANIMATIONS.TRACKING_IN_EXPAND_FWD]: TRACKING_IN_EXPAND_FWD,
  [ANIMATIONS.TRACKING_IN_EXPAND_FWD_TOP]: TRACKING_IN_EXPAND_FWD_TOP,
  [ANIMATIONS.TRACKING_IN_EXPAND_FWD_BOTTOM]: TRACKING_IN_EXPAND_FWD_BOTTOM,
  [ANIMATIONS.TRACKING_IN_CONTRACT]: TRACKING_IN_CONTRACT,
  [ANIMATIONS.TRACKING_IN_CONTRACT_BCK]: TRACKING_IN_CONTRACT_BCK,
  [ANIMATIONS.TRACKING_IN_CONTRACT_BCK_TOP]: TRACKING_IN_CONTRACT_BCK_TOP,
  [ANIMATIONS.TRACKING_IN_CONTRACT_BCK_BOTTOM]: TRACKING_IN_CONTRACT_BCK_BOTTOM
};
