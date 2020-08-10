import { ANIMATIONS } from './common';

const FOCUS_IN_DEFAULT: Keyframe = {
  easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
  fillMode: 'both'
};

const TEXT_FOCUS_IN: Keyframe[] = [
  { offset: 0, easing: 'cubic-bezier(0.550, 0.085, 0.680, 0.530)', filter: 'blur(12px)', opacity: 0 },
  { offset: 1, easing: 'cubic-bezier(0.550, 0.085, 0.680, 0.530)', filter: 'blur(0px)', opacity: 1 }
];

const FOCUS_IN_EXPAND: Keyframe[] = [
  { offset: 0, ...FOCUS_IN_DEFAULT, letterSpacing: '-0.5em', filter: 'blur(12px)', opacity: 0 },
  { offset: 1, ...FOCUS_IN_DEFAULT, letterSpacing: 'normal', filter: 'blur(0px)', opacity: 1 }
];

const FOCUS_IN_EXPAND_FWD: Keyframe[] = [
  {
    offset: 0,
    ...FOCUS_IN_DEFAULT,
    letterSpacing: '-0.5em',
    transform: 'translateZ(-800px)',
    filter: 'blur(12px)',
    opacity: 0
  },
  {
    offset: 1,
    ...FOCUS_IN_DEFAULT,
    letterSpacing: 'normal',
    transform: 'translateZ(0)',
    filter: 'blur(0px)',
    opacity: 1
  }
];

const FOCUS_IN_CONTRACT: Keyframe[] = [
  { offset: 0, ...FOCUS_IN_DEFAULT, letterSpacing: '1em', filter: 'blur(12px)', opacity: 0 },
  { offset: 1, ...FOCUS_IN_DEFAULT, letterSpacing: 'normal', filter: 'blur(0px)', opacity: 1 }
];

const FOCUS_IN_CONTRACT_BCK: Keyframe[] = [
  {
    offset: 0,
    ...FOCUS_IN_DEFAULT,
    letterSpacing: '1em',
    transform: 'translateZ(300px)',
    filter: 'blur(12px)',
    opacity: 0
  },
  {
    offset: 1,
    ...FOCUS_IN_DEFAULT,
    letterSpacing: 'normal',
    transform: 'translateZ(12px)',
    filter: 'blur(0px)',
    opacity: 1
  }
];

export default {
  [ANIMATIONS.TEXT_FOCUS_IN]: TEXT_FOCUS_IN,
  [ANIMATIONS.FOCUS_IN_EXPAND]: FOCUS_IN_EXPAND,
  [ANIMATIONS.FOCUS_IN_EXPAND_FWD]: FOCUS_IN_EXPAND_FWD,
  [ANIMATIONS.FOCUS_IN_CONTRACT]: FOCUS_IN_CONTRACT,
  [ANIMATIONS.FOCUS_IN_CONTRACT_BCK]: FOCUS_IN_CONTRACT_BCK
};
