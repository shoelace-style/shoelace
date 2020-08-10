import { ANIMATIONS } from './common';

const ZOOM_OUT: Keyframe[] = [
  { offset: 0, opacity: 1, transform: 'scale(1)' },
  { offset: 0.5, opacity: 0, transform: 'scale(0.3)' },
  { offset: 1, opacity: 0, transform: 'scale(0)' }
];

const ZOOM_OUT_UP: Keyframe[] = [
  {
    offset: 0,
    opacity: 1,
    transform: 'scale(1) translateY(0px)',
    easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)',
    transformOrigin: 'center'
  },
  {
    offset: 0.4,
    opacity: 1,
    transform: 'scale(0.475) translateY(60px)',
    easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)',
    transformOrigin: 'center'
  },
  {
    offset: 1,
    opacity: 0,
    transform: 'scale(0.1) translateY(-100vh)',
    easing: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
    transformOrigin: 'center bottom'
  }
];

const ZOOM_OUT_DOWN: Keyframe[] = [
  {
    offset: 0,
    opacity: 1,
    transform: 'scale(1) translateY(0px)',
    easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)',
    transformOrigin: 'center'
  },
  {
    offset: 0.4,
    opacity: 1,
    transform: 'scale(0.475) translateY(-60px)',
    easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)',
    transformOrigin: 'center'
  },
  {
    offset: 1,
    opacity: 0,
    transform: 'scale(0.1) translateY(100vh)',
    easing: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
    transformOrigin: 'center bottom'
  }
];

const ZOOM_OUT_LEFT: Keyframe[] = [
  { offset: 0, opacity: 1, transform: 'scale(1) translateX(0px)', easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)' },
  {
    offset: 0.4,
    opacity: 1,
    transform: 'scale(0.475) translateX(10px)',
    easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)'
  },
  {
    offset: 1,
    opacity: 0,
    transform: 'scale(0.1) translateX(-100vw)',
    easing: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)'
  }
];

const ZOOM_OUT_RIGHT: Keyframe[] = [
  { offset: 0, opacity: 1, transform: 'scale(1) translateX(0px)', easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)' },
  {
    offset: 0.4,
    opacity: 1,
    transform: 'scale(0.475) translateX(-10px)',
    easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)'
  },
  { offset: 1, opacity: 0, transform: 'scale(0.1) translateX(100vw)', easing: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)' }
];

export default {
  [ANIMATIONS.ZOOM_OUT]: ZOOM_OUT,
  [ANIMATIONS.ZOOM_OUT_UP]: ZOOM_OUT_UP,
  [ANIMATIONS.ZOOM_OUT_DOWN]: ZOOM_OUT_DOWN,
  [ANIMATIONS.ZOOM_OUT_LEFT]: ZOOM_OUT_LEFT,
  [ANIMATIONS.ZOOM_OUT_RIGHT]: ZOOM_OUT_RIGHT
};
