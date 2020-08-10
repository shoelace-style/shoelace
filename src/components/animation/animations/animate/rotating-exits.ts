import { ANIMATIONS } from './common';

const ROTATE_OUT: Keyframe[] = [
  { offset: 0, opacity: 1, transform: 'rotateZ(0deg)', transformOrigin: 'center' },
  { offset: 1, opacity: 0, transform: 'rotateZ(180deg)', transformOrigin: 'center' }
];

const ROTATE_OUT_CLOCKWISE: Keyframe[] = [
  { offset: 0, opacity: 1, transform: 'rotateZ(0deg)', transformOrigin: 'center' },
  { offset: 1, opacity: 0, transform: 'rotateZ(-180deg)', transformOrigin: 'center' }
];

const ROTATE_OUT_DOWN_LEFT: Keyframe[] = [
  { offset: 0, opacity: 1, transform: 'rotateZ(0deg)', transformOrigin: 'left bottom' },
  { offset: 1, opacity: 0, transform: 'rotateZ(45deg)', transformOrigin: 'left bottom' }
];

const ROTATE_OUT_DOWN_RIGHT: Keyframe[] = [
  { offset: 0, opacity: 1, transform: 'rotateZ(0deg)', transformOrigin: 'right bottom' },
  { offset: 1, opacity: 0, transform: 'rotateZ(-45deg)', transformOrigin: 'right bottom' }
];

const ROTATE_OUT_UP_LEFT: Keyframe[] = [
  { offset: 0, opacity: 1, transform: 'rotateZ(0deg)', transformOrigin: 'left bottom' },
  { offset: 1, opacity: 0, transform: 'rotateZ(-45deg)', transformOrigin: 'left bottom' }
];

const ROTATE_OUT_UP_RIGHT: Keyframe[] = [
  { offset: 0, opacity: 1, transform: 'rotateZ(0deg)', transformOrigin: 'right bottom' },
  { offset: 1, opacity: 0, transform: 'rotateZ(45deg)', transformOrigin: 'right bottom' }
];

export default {
  [ANIMATIONS.ROTATE_OUT]: ROTATE_OUT,
  [ANIMATIONS.ROTATE_OUT_CLOCKWISE]: ROTATE_OUT_CLOCKWISE,
  [ANIMATIONS.ROTATE_OUT_DOWN_LEFT]: ROTATE_OUT_DOWN_LEFT,
  [ANIMATIONS.ROTATE_OUT_DOWN_RIGHT]: ROTATE_OUT_DOWN_RIGHT,
  [ANIMATIONS.ROTATE_OUT_UP_LEFT]: ROTATE_OUT_UP_LEFT,
  [ANIMATIONS.ROTATE_OUT_UP_RIGHT]: ROTATE_OUT_UP_RIGHT
};
