import { ANIMATIONS } from './common';

const ZOOM_IN: Keyframe[] = [
  { offset: 0, opacity: 0, transform: 'scale(1)' },
  { offset: 0.5, opacity: 0, transform: 'scale(0.3)' },
  { offset: 1, opacity: 1, transform: 'scale(1)' }
];

const ZOOM_IN_UP: Keyframe[] = [
  {
    offset: 0,
    opacity: 0,
    transform: 'scale(0.1) translateY(-100vh)',
    easing: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)'
  },
  {
    offset: 0.6,
    opacity: 1,
    transform: 'scale(0.475) translateY(60px)',
    easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)'
  },
  { offset: 1, opacity: 1, transform: 'scale(1) translateY(0px)', easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)' }
];

const ZOOM_IN_DOWN: Keyframe[] = [
  {
    offset: 0,
    opacity: 0,
    transform: 'scale(0.1) translateY(100vh)',
    easing: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)'
  },
  {
    offset: 0.6,
    opacity: 1,
    transform: 'scale(0.475) translateY(-60px)',
    easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)'
  },
  { offset: 1, opacity: 1, transform: 'scale(1) translateY(0px)', easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)' }
];

const ZOOM_IN_LEFT: Keyframe[] = [
  {
    offset: 0,
    opacity: 0,
    transform: 'scale(0.1) translateX(-100vw)',
    easing: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)'
  },
  {
    offset: 0.6,
    opacity: 1,
    transform: 'scale(0.475) translateX(10px)',
    easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)'
  },
  { offset: 1, opacity: 1, transform: 'scale(1) translateX(0px)', easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)' }
];

const ZOOM_IN_RIGHT: Keyframe[] = [
  {
    offset: 0,
    opacity: 0,
    transform: 'scale(0.1) translateX(100vw)',
    easing: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)'
  },
  {
    offset: 0.6,
    opacity: 1,
    transform: 'scale(0.475) translateX(-10px)',
    easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)'
  },
  { offset: 1, opacity: 1, transform: 'scale(1) translateX(0px)', easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)' }
];

export default {
  [ANIMATIONS.ZOOM_IN]: ZOOM_IN,
  [ANIMATIONS.ZOOM_IN_UP]: ZOOM_IN_UP,
  [ANIMATIONS.ZOOM_IN_DOWN]: ZOOM_IN_DOWN,
  [ANIMATIONS.ZOOM_IN_LEFT]: ZOOM_IN_LEFT,
  [ANIMATIONS.ZOOM_IN_RIGHT]: ZOOM_IN_RIGHT
};
