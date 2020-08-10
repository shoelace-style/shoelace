import { ANIMATIONS } from './common';

const PULSATE_DEFAULT: Keyframe = {
  easing: 'ease-in-out',
  fillMode: 'both'
};

const PULSATE_BCK: Keyframe[] = [
  { offset: 0, ...PULSATE_DEFAULT, transform: 'scale(1)' },
  { offset: 0.5, ...PULSATE_DEFAULT, transform: 'scale(0.9)' },
  { offset: 1, ...PULSATE_DEFAULT, transform: 'scale(1)' }
];

const PULSATE_FWD: Keyframe[] = [
  { offset: 0, ...PULSATE_DEFAULT, transform: 'scale(1)' },
  { offset: 0.5, ...PULSATE_DEFAULT, transform: 'scale(1.1)' },
  { offset: 1, ...PULSATE_DEFAULT, transform: 'scale(1)' }
];

const PING: Keyframe[] = [
  { offset: 0, ...PULSATE_DEFAULT, transform: 'scale(0.2)', opacity: 0.8 },
  { offset: 0.8, ...PULSATE_DEFAULT, transform: 'scale(1.2)', opacity: 0 },
  { offset: 1, ...PULSATE_DEFAULT, transform: 'scale(2.2)', opacity: 0 }
];

export default {
  [ANIMATIONS.PULSATE_BCK]: PULSATE_BCK,
  [ANIMATIONS.PULSATE_FWD]: PULSATE_FWD,
  [ANIMATIONS.PING]: PING
};
