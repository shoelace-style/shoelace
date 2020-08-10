import { ANIMATIONS } from './common';

const TEXT_SHADOW_POP_DEFAULT: Keyframe = {
  fillMode: 'both'
};

const TEXT_SHADOW_POP_TOP: Keyframe[] = [
  {
    offset: 0,
    ...TEXT_SHADOW_POP_DEFAULT,
    transform: 'translateY(0)',
    textShadow: '0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555'
  },
  {
    offset: 1,
    ...TEXT_SHADOW_POP_DEFAULT,
    transform: 'translateY(8px)',
    textShadow:
      '0 -1px #555555, 0 -2px #555555, 0 -3px #555555, 0 -4px #555555, 0 -5px #555555, 0 -6px #555555, 0 -7px #555555, 0 -8px #555555'
  }
];

const TEXT_SHADOW_POP_TR: Keyframe[] = [
  {
    offset: 0,
    ...TEXT_SHADOW_POP_DEFAULT,
    transform: 'translateX(0) translateY(0)',
    textShadow: '0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555'
  },
  {
    offset: 1,
    ...TEXT_SHADOW_POP_DEFAULT,
    transform: 'translateX(-8px) translateY(8px)',
    textShadow:
      '1px -1px #555555, 2px -2px #555555, 3px -3px #555555, 4px -4px #555555, 5px -5px #555555, 6px -6px #555555, 7px -7px #555555, 8px -8px #555555'
  }
];

const TEXT_SHADOW_POP_RIGHT: Keyframe[] = [
  {
    offset: 0,
    ...TEXT_SHADOW_POP_DEFAULT,
    transform: 'translateX(0)',
    textShadow: '0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555'
  },
  {
    offset: 1,
    ...TEXT_SHADOW_POP_DEFAULT,
    transform: 'translateX(-8px)',
    textShadow:
      '1px 0 #555555, 2px 0 #555555, 3px 0 #555555, 4px 0 #555555, 5px 0 #555555, 6px 0 #555555, 7px 0 #555555, 8px 0 #555555'
  }
];

const TEXT_SHADOW_POP_BR: Keyframe[] = [
  {
    offset: 0,
    ...TEXT_SHADOW_POP_DEFAULT,
    transform: 'translateX(0) translateY(0)',
    textShadow: '0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555'
  },
  {
    offset: 1,
    ...TEXT_SHADOW_POP_DEFAULT,
    transform: 'translateX(-8px) translateY(-8px)',
    textShadow:
      '1px 1px #555555, 2px 2px #555555, 3px 3px #555555, 4px 4px #555555, 5px 5px #555555, 6px 6px #555555, 7px 7px #555555, 8px 8px #555555'
  }
];

const TEXT_SHADOW_POP_BOTTOM: Keyframe[] = [
  {
    offset: 0,
    ...TEXT_SHADOW_POP_DEFAULT,
    transform: 'translateY(0)',
    textShadow: '0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555'
  },
  {
    offset: 1,
    ...TEXT_SHADOW_POP_DEFAULT,
    transform: 'translateY(-8px)',
    textShadow:
      '0 1px #555555, 0 2px #555555, 0 3px #555555, 0 4px #555555, 0 5px #555555, 0 6px #555555, 0 7px #555555, 0 8px #555555'
  }
];

const TEXT_SHADOW_POP_BL: Keyframe[] = [
  {
    offset: 0,
    ...TEXT_SHADOW_POP_DEFAULT,
    transform: 'translateX(0) translateY(0)',
    textShadow: '0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555'
  },
  {
    offset: 1,
    ...TEXT_SHADOW_POP_DEFAULT,
    transform: 'translateX(8px) translateY(-8px)',
    textShadow:
      '-1px 1px #555555, -2px 2px #555555, -3px 3px #555555, -4px 4px #555555, -5px 5px #555555, -6px 6px #555555, -7px 7px #555555, -8px 8px #555555'
  }
];

const TEXT_SHADOW_POP_LEFT: Keyframe[] = [
  {
    offset: 0,
    ...TEXT_SHADOW_POP_DEFAULT,
    transform: 'translateX(0)',
    textShadow: '0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555'
  },
  {
    offset: 1,
    ...TEXT_SHADOW_POP_DEFAULT,
    transform: 'translateX(8px)',
    textShadow:
      '-1px 0 #555555, -2px 0 #555555, -3px 0 #555555, -4px 0 #555555, -5px 0 #555555, -6px 0 #555555, -7px 0 #555555, -8px 0 #555555'
  }
];

const TEXT_SHADOW_POP_TL: Keyframe[] = [
  {
    offset: 0,
    ...TEXT_SHADOW_POP_DEFAULT,
    transform: 'translateX(0) translateY(0)',
    textShadow: '0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555'
  },
  {
    offset: 1,
    ...TEXT_SHADOW_POP_DEFAULT,
    transform: 'translateX(8px) translateY(8px)',
    textShadow:
      '-1px -1px #555555, -2px -2px #555555, -3px -3px #555555, -4px -4px #555555, -5px -5px #555555, -6px -6px #555555, -7px -7px #555555, -8px -8px #555555'
  }
];

export default {
  [ANIMATIONS.TEXT_SHADOW_POP_TOP]: TEXT_SHADOW_POP_TOP,
  [ANIMATIONS.TEXT_SHADOW_POP_TR]: TEXT_SHADOW_POP_TR,
  [ANIMATIONS.TEXT_SHADOW_POP_RIGHT]: TEXT_SHADOW_POP_RIGHT,
  [ANIMATIONS.TEXT_SHADOW_POP_BR]: TEXT_SHADOW_POP_BR,
  [ANIMATIONS.TEXT_SHADOW_POP_BOTTOM]: TEXT_SHADOW_POP_BOTTOM,
  [ANIMATIONS.TEXT_SHADOW_POP_BL]: TEXT_SHADOW_POP_BL,
  [ANIMATIONS.TEXT_SHADOW_POP_LEFT]: TEXT_SHADOW_POP_LEFT,
  [ANIMATIONS.TEXT_SHADOW_POP_TL]: TEXT_SHADOW_POP_TL
};
