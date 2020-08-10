import { ANIMATIONS } from './common';

const FLIP: Keyframe[] = [
  {
    offset: 0,
    backfaceVisibility: 'visible',
    easing: 'ease-out',
    transform: 'perspective(400px) scale(1) translateZ(0) rotateY(-360deg)'
  },
  {
    offset: 0.4,
    backfaceVisibility: 'visible',
    easing: 'ease-out',
    transform: 'perspective(400px) scale(1) translateZ(150px) rotateY(-190deg)'
  },
  {
    offset: 0.5,
    backfaceVisibility: 'visible',
    easing: 'ease-in',
    transform: 'perspective(400px) scale(1) translateZ(150px) rotateY(-170deg)'
  },
  {
    offset: 0.8,
    backfaceVisibility: 'visible',
    easing: 'ease-in',
    transform: 'perspective(400px) scale(0.95) translateZ(0) rotateY(0deg)'
  },
  {
    offset: 1,
    backfaceVisibility: 'visible',
    easing: 'ease-in',
    transform: 'perspective(400px) scale(1) translateZ(0) rotateY(0deg)'
  }
];

const FLIP_IN_X: Keyframe[] = [
  {
    offset: 0,
    backfaceVisibility: 'visible',
    opacity: 0,
    easing: 'ease-in',
    transform: 'perspective(400px) rotateX(90deg)'
  },
  {
    offset: 0.4,
    backfaceVisibility: 'visible',
    opacity: 0.5,
    easing: 'ease-in',
    transform: 'perspective(400px) rotateX(-20deg)'
  },
  {
    offset: 0.6,
    backfaceVisibility: 'visible',
    opacity: 1,
    easing: 'ease-in',
    transform: 'perspective(400px) rotateX(10deg)'
  },
  {
    offset: 0.8,
    backfaceVisibility: 'visible',
    opacity: 1,
    easing: 'ease-in',
    transform: 'perspective(400px) rotateX(-5deg)'
  },
  {
    offset: 1,
    backfaceVisibility: 'visible',
    opacity: 1,
    easing: 'ease-in',
    transform: 'perspective(400px) rotateX(0deg)'
  }
];

const FLIP_IN_Y: Keyframe[] = [
  {
    offset: 0,
    backfaceVisibility: 'visible',
    opacity: 0,
    easing: 'ease-in',
    transform: 'perspective(400px) rotateY(90deg)'
  },
  {
    offset: 0.4,
    backfaceVisibility: 'visible',
    opacity: 0.5,
    easing: 'ease-in',
    transform: 'perspective(400px) rotateY(-20deg)'
  },
  {
    offset: 0.6,
    backfaceVisibility: 'visible',
    opacity: 1,
    easing: 'ease-in',
    transform: 'perspective(400px) rotateY(10deg)'
  },
  {
    offset: 0.8,
    backfaceVisibility: 'visible',
    opacity: 1,
    easing: 'ease-in',
    transform: 'perspective(400px) rotateY(-5deg)'
  },
  {
    offset: 1,
    backfaceVisibility: 'visible',
    opacity: 1,
    easing: 'ease-in',
    transform: 'perspective(400px) rotateY(0deg)'
  }
];

const FLIP_OUT_X: Keyframe[] = [
  { offset: 0, backfaceVisibility: 'visible', opacity: 1, transform: 'perspective(400px) rotateX(0deg)' },
  { offset: 0.3, backfaceVisibility: 'visible', opacity: 1, transform: 'perspective(400px) rotateX(-15deg)' },
  { offset: 1, backfaceVisibility: 'visible', opacity: 0, transform: 'perspective(400px) rotateX(90deg)' }
];

const FLIP_OUT_Y: Keyframe[] = [
  { offset: 0, backfaceVisibility: 'visible', opacity: 1, transform: 'perspective(400px) rotateY(0deg)' },
  { offset: 0.3, backfaceVisibility: 'visible', opacity: 1, transform: 'perspective(400px) rotateY(-15deg)' },
  { offset: 1, backfaceVisibility: 'visible', opacity: 0, transform: 'perspective(400px) rotateY(90deg)' }
];

export default {
  [ANIMATIONS.FLIP]: FLIP,
  [ANIMATIONS.FLIP_IN_X]: FLIP_IN_X,
  [ANIMATIONS.FLIP_IN_Y]: FLIP_IN_Y,
  [ANIMATIONS.FLIP_OUT_X]: FLIP_OUT_X,
  [ANIMATIONS.FLIP_OUT_Y]: FLIP_OUT_Y
};
