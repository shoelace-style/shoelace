import { ANIMATIONS } from './common';

const JELLO_DEFAULT: Keyframe = {
  fillMode: 'both'
};

const JELLO_HORIZONTAL: Keyframe[] = [
  { offset: 0, ...JELLO_DEFAULT, transform: 'scale3d(1, 1, 1)' },
  { offset: 0.3, ...JELLO_DEFAULT, transform: 'scale3d(1.25, 0.75, 1)' },
  { offset: 0.4, ...JELLO_DEFAULT, transform: 'scale3d(0.75, 1.25, 1)' },
  { offset: 0.5, ...JELLO_DEFAULT, transform: 'scale3d(1.15, 0.85, 1)' },
  { offset: 0.65, ...JELLO_DEFAULT, transform: 'scale3d(0.95, 1.05, 1)' },
  { offset: 0.75, ...JELLO_DEFAULT, transform: 'scale3d(1.05, 0.95, 1)' },
  { offset: 1, ...JELLO_DEFAULT, transform: 'scale3d(1, 1, 1)' }
];

const JELLO_VERTICAL: Keyframe[] = [
  { offset: 0, ...JELLO_DEFAULT, transform: 'scale3d(1, 1, 1)' },
  { offset: 0.3, ...JELLO_DEFAULT, transform: 'scale3d(0.75, 1.25, 1)' },
  { offset: 0.4, ...JELLO_DEFAULT, transform: 'scale3d(1.25, 0.75, 1)' },
  { offset: 0.5, ...JELLO_DEFAULT, transform: 'scale3d(0.85, 1.15, 1)' },
  { offset: 0.65, ...JELLO_DEFAULT, transform: 'scale3d(1.05, 0.95, 1)' },
  { offset: 0.75, ...JELLO_DEFAULT, transform: 'scale3d(0.95, 1.05, 1)' },
  { offset: 1, ...JELLO_DEFAULT, transform: 'scale3d(1, 1, 1)' }
];

const JELLO_DIAGONAL_1: Keyframe[] = [
  { offset: 0, ...JELLO_DEFAULT, transform: 'skew(0deg, 0deg)' },
  { offset: 0.3, ...JELLO_DEFAULT, transform: ' skew(25deg, 25deg)' },
  { offset: 0.4, ...JELLO_DEFAULT, transform: 'skew(-15deg, -15deg)' },
  { offset: 0.5, ...JELLO_DEFAULT, transform: 'skew(15deg, 15deg)' },
  { offset: 0.65, ...JELLO_DEFAULT, transform: 'skew(-5deg, -5deg)' },
  { offset: 0.75, ...JELLO_DEFAULT, transform: 'skew(5deg, 5deg)' },
  { offset: 1, ...JELLO_DEFAULT, transform: 'skew(0deg, 0deg)' }
];

const JELLO_DIAGONAL_2: Keyframe[] = [
  { offset: 0, ...JELLO_DEFAULT, transform: 'skew(0deg, 0deg)' },
  { offset: 0.3, ...JELLO_DEFAULT, transform: 'skew(-25deg, -25deg)' },
  { offset: 0.4, ...JELLO_DEFAULT, transform: 'skew(15deg, 15deg)' },
  { offset: 0.5, ...JELLO_DEFAULT, transform: 'skew(-15deg, -15deg)' },
  { offset: 0.65, ...JELLO_DEFAULT, transform: 'skew(5deg, 5deg)' },
  { offset: 0.75, ...JELLO_DEFAULT, transform: 'skew(-5deg, -5deg)' },
  { offset: 1, ...JELLO_DEFAULT, transform: 'skew(0deg, 0deg)' }
];

export default {
  [ANIMATIONS.JELLO_HORIZONTAL]: JELLO_HORIZONTAL,
  [ANIMATIONS.JELLO_VERTICAL]: JELLO_VERTICAL,
  [ANIMATIONS.JELLO_DIAGONAL_1]: JELLO_DIAGONAL_1,
  [ANIMATIONS.JELLO_DIAGONAL_2]: JELLO_DIAGONAL_2
};
