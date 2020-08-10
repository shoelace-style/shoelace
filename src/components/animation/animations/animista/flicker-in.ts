import { ANIMATIONS } from './common';

const FLICKER_IN_DEFAULT: Keyframe = {
  easing: 'linear',
  fillMode: 'both'
};

const FLICKER_IN_1: Keyframe[] = [
  { offset: 0, ...FLICKER_IN_DEFAULT, opacity: 0 },
  { offset: 0.1, ...FLICKER_IN_DEFAULT, opacity: 0 },
  { offset: 0.101, ...FLICKER_IN_DEFAULT, opacity: 1 },
  { offset: 0.102, ...FLICKER_IN_DEFAULT, opacity: 0 },
  { offset: 0.2, ...FLICKER_IN_DEFAULT, opacity: 0 },
  { offset: 0.201, ...FLICKER_IN_DEFAULT, opacity: 1 },
  { offset: 0.206, ...FLICKER_IN_DEFAULT, opacity: 0 },
  { offset: 0.3, ...FLICKER_IN_DEFAULT, opacity: 0 },
  { offset: 0.301, ...FLICKER_IN_DEFAULT, opacity: 1 },
  { offset: 0.305, ...FLICKER_IN_DEFAULT, opacity: 1 },
  { offset: 0.306, ...FLICKER_IN_DEFAULT, opacity: 0 },
  { offset: 0.45, ...FLICKER_IN_DEFAULT, opacity: 0 },
  { offset: 0.451, ...FLICKER_IN_DEFAULT, opacity: 1 },
  { offset: 0.5, ...FLICKER_IN_DEFAULT, opacity: 1 },
  { offset: 0.55, ...FLICKER_IN_DEFAULT, opacity: 1 },
  { offset: 0.551, ...FLICKER_IN_DEFAULT, opacity: 0 },
  { offset: 0.57, ...FLICKER_IN_DEFAULT, opacity: 0 },
  { offset: 0.571, ...FLICKER_IN_DEFAULT, opacity: 1 },
  { offset: 0.6, ...FLICKER_IN_DEFAULT, opacity: 1 },
  { offset: 0.601, ...FLICKER_IN_DEFAULT, opacity: 0 },
  { offset: 0.65, ...FLICKER_IN_DEFAULT, opacity: 0 },
  { offset: 0.651, ...FLICKER_IN_DEFAULT, opacity: 1 },
  { offset: 0.75, ...FLICKER_IN_DEFAULT, opacity: 1 },
  { offset: 0.751, ...FLICKER_IN_DEFAULT, opacity: 0 },
  { offset: 0.77, ...FLICKER_IN_DEFAULT, opacity: 0 },
  { offset: 0.771, ...FLICKER_IN_DEFAULT, opacity: 1 },
  { offset: 0.85, ...FLICKER_IN_DEFAULT, opacity: 1 },
  { offset: 0.851, ...FLICKER_IN_DEFAULT, opacity: 0 },
  { offset: 0.86, ...FLICKER_IN_DEFAULT, opacity: 0 },
  { offset: 0.861, ...FLICKER_IN_DEFAULT, opacity: 1 },
  { offset: 1, ...FLICKER_IN_DEFAULT, opacity: 1 }
];

const FLICKER_IN_2: Keyframe[] = [
  { offset: 0, ...FLICKER_IN_DEFAULT, opacity: 0, boxShadow: 'initial' },
  { offset: 0.1, ...FLICKER_IN_DEFAULT, opacity: 0, boxShadow: 'none' },
  { offset: 0.101, ...FLICKER_IN_DEFAULT, opacity: 1, boxShadow: 'none' },
  { offset: 0.102, ...FLICKER_IN_DEFAULT, opacity: 0, boxShadow: 'none' },
  { offset: 0.2, ...FLICKER_IN_DEFAULT, opacity: 0, boxShadow: 'none' },
  { offset: 0.201, ...FLICKER_IN_DEFAULT, opacity: 1, boxShadow: '0 0 30px rgba(255, 255, 255, 0.25)' },
  { offset: 0.206, ...FLICKER_IN_DEFAULT, opacity: 0, boxShadow: 'none' },
  { offset: 0.3, ...FLICKER_IN_DEFAULT, opacity: 0, boxShadow: 'none' },
  {
    offset: 0.301,
    ...FLICKER_IN_DEFAULT,
    opacity: 1,
    boxShadow: '0 0 30px rgba(255, 255, 255, 0.45), 0 0 60px rgba(255, 255, 255, 0.25)'
  },
  {
    offset: 0.305,
    ...FLICKER_IN_DEFAULT,
    opacity: 1,
    boxShadow: '0 0 30px rgba(255, 255, 255, 0.45), 0 0 60px rgba(255, 255, 255, 0.25)'
  },
  { offset: 0.306, ...FLICKER_IN_DEFAULT, opacity: 0, boxShadow: 'none' },
  { offset: 0.45, ...FLICKER_IN_DEFAULT, opacity: 0, boxShadow: 'none' },
  {
    offset: 0.451,
    ...FLICKER_IN_DEFAULT,
    opacity: 1,
    boxShadow: '0 0 30px rgba(255, 255, 255, 0.45), 0 0 60px rgba(255, 255, 255, 0.25)'
  },
  {
    offset: 0.5,
    ...FLICKER_IN_DEFAULT,
    opacity: 1,
    boxShadow: '0 0 30px rgba(255, 255, 255, 0.45), 0 0 60px rgba(255, 255, 255, 0.25)'
  },
  {
    offset: 0.55,
    ...FLICKER_IN_DEFAULT,
    opacity: 1,
    boxShadow: '0 0 30px rgba(255, 255, 255, 0.45), 0 0 60px rgba(255, 255, 255, 0.25)'
  },
  { offset: 0.551, ...FLICKER_IN_DEFAULT, opacity: 0, boxShadow: 'none' },
  { offset: 0.57, ...FLICKER_IN_DEFAULT, opacity: 0, boxShadow: 'none' },
  {
    offset: 0.571,
    ...FLICKER_IN_DEFAULT,
    opacity: 1,
    boxShadow: '0 0 30px rgba(255, 255, 255, 0.55), 0 0 60px rgba(255, 255, 255, 0.3)'
  },
  {
    offset: 0.6,
    ...FLICKER_IN_DEFAULT,
    opacity: 1,
    boxShadow: '0 0 30px rgba(255, 255, 255, 0.55), 0 0 60px rgba(255, 255, 255, 0.3)'
  },
  { offset: 0.601, ...FLICKER_IN_DEFAULT, opacity: 0, boxShadow: 'none' },
  { offset: 0.65, ...FLICKER_IN_DEFAULT, opacity: 0, boxShadow: 'none' },
  {
    offset: 0.651,
    ...FLICKER_IN_DEFAULT,
    opacity: 1,
    boxShadow:
      '0 0 30px rgba(255, 255, 255, 0.55), 0 0 60px rgba(255, 255, 255, 0.3), 0 0 100px rgba(255, 255, 255, 0.1)'
  },
  {
    offset: 0.75,
    ...FLICKER_IN_DEFAULT,
    opacity: 1,
    boxShadow:
      '0 0 30px rgba(255, 255, 255, 0.55), 0 0 60px rgba(255, 255, 255, 0.3), 0 0 100px rgba(255, 255, 255, 0.1)'
  },
  { offset: 0.751, ...FLICKER_IN_DEFAULT, opacity: 0, boxShadow: 'none' },
  { offset: 0.77, ...FLICKER_IN_DEFAULT, opacity: 0, boxShadow: 'none' },
  {
    offset: 0.771,
    ...FLICKER_IN_DEFAULT,
    opacity: 1,
    boxShadow:
      '0 0 30px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 255, 255, 0.4), 0 0 110px rgba(255, 255, 255, 0.2), 0 0 100px rgba(255, 255, 255, 0.1)'
  },
  {
    offset: 0.85,
    ...FLICKER_IN_DEFAULT,
    opacity: 1,
    boxShadow:
      '0 0 30px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 255, 255, 0.4), 0 0 110px rgba(255, 255, 255, 0.2), 0 0 100px rgba(255, 255, 255, 0.1)'
  },
  { offset: 0.851, ...FLICKER_IN_DEFAULT, opacity: 0, boxShadow: 'none' },
  { offset: 0.86, ...FLICKER_IN_DEFAULT, opacity: 0, boxShadow: 'none' },
  {
    offset: 0.861,
    ...FLICKER_IN_DEFAULT,
    opacity: 1,
    boxShadow:
      '0 0 30px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 255, 255, 0.45), 0 0 110px rgba(255, 255, 255, 0.25), 0 0 100px rgba(255, 255, 255, 0.1)'
  },
  {
    offset: 1,
    ...FLICKER_IN_DEFAULT,
    opacity: 1,
    boxShadow:
      '0 0 30px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 255, 255, 0.45), 0 0 110px rgba(255, 255, 255, 0.25), 0 0 100px rgba(255, 255, 255, 0.1)'
  }
];

export default {
  [ANIMATIONS.FLICKER_IN_1]: FLICKER_IN_1,
  [ANIMATIONS.FLICKER_IN_2]: FLICKER_IN_2
};
