import { ANIMATIONS } from './common';

const HINGE_DEFAULT: Keyframe = {
  opacity: 1,
  transformOrigin: 'top left',
  easing: 'ease-in-out'
};

const HINGE: Keyframe[] = [
  { offset: 0, transform: 'rotate(0)', ...HINGE_DEFAULT },
  { offset: 0.2, transform: 'rotateZ(80deg)', ...HINGE_DEFAULT },
  { offset: 0.4, transform: 'rotateZ(60deg)', ...HINGE_DEFAULT },
  { offset: 0.6, transform: 'rotateZ(80deg)', ...HINGE_DEFAULT },
  { offset: 0.8, transform: 'rotateZ(60deg)', ...HINGE_DEFAULT },
  { offset: 1, ...HINGE_DEFAULT, opacity: 0, transform: 'translateY(700px)' }
];

const JACK_IN_THE_BOX: Keyframe[] = [
  { offset: 0, opacity: 0, transform: 'scale(0.1) rotate(30deg)', transformOrigin: 'center bottom' },
  { offset: 0.5, opacity: 0.3, transform: 'rotate(-10deg)', transformOrigin: '50% 50% 0' },
  { offset: 0.7, opacity: 0.6, transform: 'rotate(3deg)', transformOrigin: '50% 50% 0' },
  { offset: 1, opacity: 1, transform: 'scale(1)', transformOrigin: '50% 50% 0' }
];

const ROLL_IN: Keyframe[] = [
  { offset: 0, opacity: 0, transform: 'translateX(-100%) rotateZ(-120deg)' },
  { offset: 1, opacity: 1, transform: 'translateX(0%)' }
];

const ROLL_OUT: Keyframe[] = [
  { offset: 0, opacity: 1, transform: 'translateX(0%)' },
  { offset: 1, opacity: 0, transform: 'translateX(100%) rotateZ(120deg)' }
];

export default {
  [ANIMATIONS.HINGE]: HINGE,
  [ANIMATIONS.JACK_IN_THE_BOX]: JACK_IN_THE_BOX,
  [ANIMATIONS.ROLL_IN]: ROLL_IN,
  [ANIMATIONS.ROLL_OUT]: ROLL_OUT
};
