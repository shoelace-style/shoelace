import { ANIMATIONS } from './common';

const ROTATE_IN: Keyframe[] = [
  { offset: 0, opacity: 0, transform: 'rotateZ(180deg)', transformOrigin: 'center' },
  { offset: 1, opacity: 1, transform: 'rotateZ(0deg)', transformOrigin: 'center' }
];

const ROTATE_IN_CLOCKWISE: Keyframe[] = [
  { offset: 0, opacity: 0, transform: 'rotateZ(-180deg)', transformOrigin: 'center' },
  { offset: 1, opacity: 1, transform: 'rotateZ(0deg)', transformOrigin: 'center' }
];

const ROTATE_IN_DOWN_LEFT: Keyframe[] = [
  { offset: 0, opacity: 0, transform: 'rotateZ(-45deg)', transformOrigin: 'left bottom' },
  { offset: 1, opacity: 1, transform: 'rotateZ(0deg)', transformOrigin: 'left bottom' }
];

const ROTATE_IN_DOWN_RIGHT: Keyframe[] = [
  { offset: 0, opacity: 0, transform: 'rotateZ(45deg)', transformOrigin: 'right bottom' },
  { offset: 1, opacity: 1, transform: 'rotateZ(0deg)', transformOrigin: 'right bottom' }
];

const ROTATE_IN_UP_LEFT: Keyframe[] = [
  { offset: 0, opacity: 0, transform: 'rotateZ(45deg)', transformOrigin: 'left bottom' },
  { offset: 1, opacity: 1, transform: 'rotateZ(0deg)', transformOrigin: 'left bottom' }
];

const ROTATE_IN_UP_RIGHT: Keyframe[] = [
  { offset: 0, opacity: 0, transform: 'rotateZ(-45deg)', transformOrigin: 'right bottom' },
  { offset: 1, opacity: 1, transform: 'rotateZ(0deg)', transformOrigin: 'right bottom' }
];

export default {
  [ANIMATIONS.ROTATE_IN]: ROTATE_IN,
  [ANIMATIONS.ROTATE_IN_CLOCKWISE]: ROTATE_IN_CLOCKWISE,
  [ANIMATIONS.ROTATE_IN_DOWN_LEFT]: ROTATE_IN_DOWN_LEFT,
  [ANIMATIONS.ROTATE_IN_DOWN_RIGHT]: ROTATE_IN_DOWN_RIGHT,
  [ANIMATIONS.ROTATE_IN_UP_LEFT]: ROTATE_IN_UP_LEFT,
  [ANIMATIONS.ROTATE_IN_UP_RIGHT]: ROTATE_IN_UP_RIGHT
};
