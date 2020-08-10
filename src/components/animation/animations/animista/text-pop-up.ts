import { ANIMATIONS } from './common';

const TEXT_POP_UP_DEFAULT: Keyframe = {
  easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
  fillMode: 'both'
};

const TEXT_POP_UP_TOP: Keyframe[] = [
  {
    offset: 0,
    ...TEXT_POP_UP_DEFAULT,
    transform: 'translateY(0)',
    transformOrigin: '50% 50%',
    textShadow: 'none'
  },
  {
    offset: 1,
    ...TEXT_POP_UP_DEFAULT,
    transform: 'translateY(-50px)',
    transformOrigin: '50% 50%',
    textShadow:
      '0 1px 0 #cccccc, 0 2px 0 #cccccc, 0 3px 0 #cccccc, 0 4px 0 #cccccc, 0 5px 0 #cccccc, 0 6px 0 #cccccc, 0 7px 0 #cccccc, 0 8px 0 #cccccc, 0 9px 0 #cccccc, 0 50px 30px rgba(0, 0, 0, 0.3)'
  }
];

const TEXT_POP_UP_TR: Keyframe[] = [
  {
    offset: 0,
    ...TEXT_POP_UP_DEFAULT,
    transform: 'translateY(0) translateX(0)',
    transformOrigin: '50% 50%',
    textShadow: 'none'
  },
  {
    offset: 1,
    ...TEXT_POP_UP_DEFAULT,
    transform: 'translateY(-50px) translateX(50px)',
    transformOrigin: '50% 50%',
    textShadow:
      '0 1px 0 #cccccc, 0 2px 0 #cccccc, 0 3px 0 #cccccc, 0 4px 0 #cccccc, 0 5px 0 #cccccc, 0 6px 0 #cccccc, 0 7px 0 #cccccc, 0 8px 0 #cccccc, 0 9px 0 #cccccc, 0 50px 30px rgba(0, 0, 0, 0.3)'
  }
];

const TEXT_POP_UP_RIGHT: Keyframe[] = [
  {
    offset: 0,
    ...TEXT_POP_UP_DEFAULT,
    transform: 'translateX(0)',
    transformOrigin: '50% 50%',
    textShadow: 'none'
  },
  {
    offset: 1,
    ...TEXT_POP_UP_DEFAULT,
    transform: 'translateX(50px)',
    transformOrigin: '50% 50%',
    textShadow:
      '0 1px 0 #cccccc, 0 2px 0 #cccccc, 0 3px 0 #cccccc, 0 4px 0 #cccccc, 0 5px 0 #cccccc, 0 6px 0 #cccccc, 0 7px 0 #cccccc, 0 8px 0 #cccccc, 0 9px 0 #cccccc, 0 50px 30px rgba(0, 0, 0, 0.3)'
  }
];

const TEXT_POP_UP_BR: Keyframe[] = [
  {
    offset: 0,
    ...TEXT_POP_UP_DEFAULT,
    transform: 'translateY(0) translateX(0)',
    transformOrigin: '50% 50%',
    textShadow: 'none'
  },
  {
    offset: 1,
    ...TEXT_POP_UP_DEFAULT,
    transform: 'translateY(50px) translateX(50px)',
    transformOrigin: '50% 50%',
    textShadow:
      '0 1px 0 #cccccc, 0 2px 0 #cccccc, 0 3px 0 #cccccc, 0 4px 0 #cccccc, 0 5px 0 #cccccc, 0 6px 0 #cccccc, 0 7px 0 #cccccc, 0 8px 0 #cccccc, 0 9px 0 #cccccc, 0 50px 30px rgba(0, 0, 0, 0.3)'
  }
];

const TEXT_POP_UP_BOTTOM: Keyframe[] = [
  {
    offset: 0,
    ...TEXT_POP_UP_DEFAULT,
    transform: 'translateY(0)',
    transformOrigin: '50% 50%',
    textShadow: 'none'
  },
  {
    offset: 1,
    ...TEXT_POP_UP_DEFAULT,
    transform: 'translateY(50px)',
    transformOrigin: '50% 50%',
    textShadow:
      '0 1px 0 #cccccc, 0 2px 0 #cccccc, 0 3px 0 #cccccc, 0 4px 0 #cccccc, 0 5px 0 #cccccc, 0 6px 0 #cccccc, 0 7px 0 #cccccc, 0 8px 0 #cccccc, 0 9px 0 #cccccc, 0 50px 30px rgba(0, 0, 0, 0.3)'
  }
];

const TEXT_POP_UP_BL: Keyframe[] = [
  {
    offset: 0,
    ...TEXT_POP_UP_DEFAULT,
    transform: 'translateY(0) translateX(0)',
    transformOrigin: '50% 50%',
    textShadow: 'none'
  },
  {
    offset: 1,
    ...TEXT_POP_UP_DEFAULT,
    transform: 'translateY(50px) translateX(-50px)',
    transformOrigin: '50% 50%',
    textShadow:
      '0 1px 0 #cccccc, 0 2px 0 #cccccc, 0 3px 0 #cccccc, 0 4px 0 #cccccc, 0 5px 0 #cccccc, 0 6px 0 #cccccc, 0 7px 0 #cccccc, 0 8px 0 #cccccc, 0 9px 0 #cccccc, 0 50px 30px rgba(0, 0, 0, 0.3)'
  }
];

const TEXT_POP_UP_LEFT: Keyframe[] = [
  {
    offset: 0,
    ...TEXT_POP_UP_DEFAULT,
    transform: 'translateX(0)',
    transformOrigin: '50% 50%',
    textShadow: 'none'
  },
  {
    offset: 1,
    ...TEXT_POP_UP_DEFAULT,
    transform: 'translateX(-50px)',
    transformOrigin: '50% 50%',
    textShadow:
      '0 1px 0 #cccccc, 0 2px 0 #cccccc, 0 3px 0 #cccccc, 0 4px 0 #cccccc, 0 5px 0 #cccccc, 0 6px 0 #cccccc, 0 7px 0 #cccccc, 0 8px 0 #cccccc, 0 9px 0 #cccccc, 0 50px 30px rgba(0, 0, 0, 0.3)'
  }
];

const TEXT_POP_UP_TL: Keyframe[] = [
  {
    offset: 0,
    ...TEXT_POP_UP_DEFAULT,
    transform: 'translateY(0) translateX(0)',
    transformOrigin: '50% 50%',
    textShadow: 'none'
  },
  {
    offset: 1,
    ...TEXT_POP_UP_DEFAULT,
    transform: 'translateY(-50px) translateX(-50px)',
    transformOrigin: '50% 50%',
    textShadow:
      '0 1px 0 #cccccc, 0 2px 0 #cccccc, 0 3px 0 #cccccc, 0 4px 0 #cccccc, 0 5px 0 #cccccc, 0 6px 0 #cccccc, 0 7px 0 #cccccc, 0 8px 0 #cccccc, 0 9px 0 #cccccc, 0 50px 30px rgba(0, 0, 0, 0.3)'
  }
];

export default {
  [ANIMATIONS.TEXT_POP_UP_TOP]: TEXT_POP_UP_TOP,
  [ANIMATIONS.TEXT_POP_UP_TR]: TEXT_POP_UP_TR,
  [ANIMATIONS.TEXT_POP_UP_RIGHT]: TEXT_POP_UP_RIGHT,
  [ANIMATIONS.TEXT_POP_UP_BR]: TEXT_POP_UP_BR,
  [ANIMATIONS.TEXT_POP_UP_BOTTOM]: TEXT_POP_UP_BOTTOM,
  [ANIMATIONS.TEXT_POP_UP_BL]: TEXT_POP_UP_BL,
  [ANIMATIONS.TEXT_POP_UP_LEFT]: TEXT_POP_UP_LEFT,
  [ANIMATIONS.TEXT_POP_UP_TL]: TEXT_POP_UP_TL
};
