import { ANIMATIONS } from './common';

const BOUNCE_IN_DEFAULT: Keyframe = {
  fillMode: 'both'
};

const BOUNCE_IN_TOP: Keyframe[] = [
  {
    offset: 0,
    ...BOUNCE_IN_DEFAULT,
    transform: 'translateY(-500px)',
    easing: 'ease-in',
    opacity: 0
  },
  {
    offset: 0.38,
    ...BOUNCE_IN_DEFAULT,
    transform: 'translateY(0)',
    easing: 'ease-out',
    opacity: 1
  },
  {
    offset: 0.55,
    ...BOUNCE_IN_DEFAULT,
    transform: 'translateY(-65px)',
    easing: 'ease-in',
    opacity: 1
  },
  {
    offset: 0.72,
    ...BOUNCE_IN_DEFAULT,
    transform: 'translateY(0)',
    easing: 'ease-out',
    opacity: 1
  },
  {
    offset: 0.81,
    ...BOUNCE_IN_DEFAULT,
    transform: 'translateY(-28px)',
    easing: 'ease-in',
    opacity: 1
  },
  {
    offset: 0.9,
    ...BOUNCE_IN_DEFAULT,
    transform: 'translateY(0)',
    easing: 'ease-out',
    opacity: 1
  },
  {
    offset: 0.95,
    ...BOUNCE_IN_DEFAULT,
    transform: 'translateY(-8px)',
    easing: 'ease-in',
    opacity: 1
  },
  {
    offset: 1,
    ...BOUNCE_IN_DEFAULT,
    transform: 'translateY(0)',
    easing: 'ease-out',
    opacity: 1
  }
];

const BOUNCE_IN_RIGHT: Keyframe[] = [
  {
    offset: 0,
    ...BOUNCE_IN_DEFAULT,
    transform: 'translateX(600px)',
    easing: 'ease-in',
    opacity: 0
  },
  {
    offset: 0.38,
    ...BOUNCE_IN_DEFAULT,
    transform: 'translateX(0)',
    easing: 'ease-out',
    opacity: 1
  },
  {
    offset: 0.55,
    ...BOUNCE_IN_DEFAULT,
    transform: 'translateX(68px)',
    easing: 'ease-in',
    opacity: 1
  },
  {
    offset: 0.72,
    ...BOUNCE_IN_DEFAULT,
    transform: 'translateX(0)',
    easing: 'ease-out',
    opacity: 1
  },
  {
    offset: 0.81,
    ...BOUNCE_IN_DEFAULT,
    transform: 'translateX(32px)',
    easing: 'ease-in',
    opacity: 1
  },
  {
    offset: 0.9,
    ...BOUNCE_IN_DEFAULT,
    transform: 'translateX(0)',
    easing: 'ease-out',
    opacity: 1
  },
  {
    offset: 0.95,
    ...BOUNCE_IN_DEFAULT,
    transform: 'translateX(8px)',
    easing: 'ease-in',
    opacity: 1
  },
  {
    offset: 1,
    ...BOUNCE_IN_DEFAULT,
    transform: 'translateX(0)',
    easing: 'ease-out',
    opacity: 1
  }
];

const BOUNCE_IN_BOTTOM: Keyframe[] = [
  {
    offset: 0,
    ...BOUNCE_IN_DEFAULT,
    transform: 'translateY(500px)',
    easing: 'ease-in',
    opacity: 0
  },
  {
    offset: 0.38,
    ...BOUNCE_IN_DEFAULT,
    transform: 'translateY(0)',
    easing: 'ease-out',
    opacity: 1
  },
  {
    offset: 0.55,
    ...BOUNCE_IN_DEFAULT,
    transform: 'translateY(65px)',
    easing: 'ease-in',
    opacity: 1
  },
  {
    offset: 0.72,
    ...BOUNCE_IN_DEFAULT,
    transform: 'translateY(0)',
    easing: 'ease-out',
    opacity: 1
  },
  {
    offset: 0.81,
    ...BOUNCE_IN_DEFAULT,
    transform: 'translateY(28px)',
    easing: 'ease-in',
    opacity: 1
  },
  {
    offset: 0.9,
    ...BOUNCE_IN_DEFAULT,
    transform: 'translateY(0)',
    easing: 'ease-out',
    opacity: 1
  },
  {
    offset: 0.95,
    ...BOUNCE_IN_DEFAULT,
    transform: 'translateY(8px)',
    easing: 'ease-in',
    opacity: 1
  },
  {
    offset: 1,
    ...BOUNCE_IN_DEFAULT,
    transform: 'translateY(0)',
    easing: 'ease-out',
    opacity: 1
  }
];

const BOUNCE_IN_LEFT: Keyframe[] = [
  {
    offset: 0,
    ...BOUNCE_IN_DEFAULT,
    transform: 'translateX(-600px)',
    easing: 'ease-in',
    opacity: 0
  },
  {
    offset: 0.38,
    ...BOUNCE_IN_DEFAULT,
    transform: 'translateX(0)',
    easing: 'ease-out',
    opacity: 1
  },
  {
    offset: 0.55,
    ...BOUNCE_IN_DEFAULT,
    transform: 'translateX(-68px)',
    easing: 'ease-in',
    opacity: 1
  },
  {
    offset: 0.72,
    ...BOUNCE_IN_DEFAULT,
    transform: 'translateX(0)',
    easing: 'ease-out',
    opacity: 1
  },
  {
    offset: 0.81,
    ...BOUNCE_IN_DEFAULT,
    transform: 'translateX(-28px)',
    easing: 'ease-in',
    opacity: 1
  },
  {
    offset: 0.9,
    ...BOUNCE_IN_DEFAULT,
    transform: 'translateX(0)',
    easing: 'ease-out',
    opacity: 1
  },
  {
    offset: 0.95,
    ...BOUNCE_IN_DEFAULT,
    transform: 'translateX(-8px)',
    easing: 'ease-in',
    opacity: 1
  },
  {
    offset: 1,
    ...BOUNCE_IN_DEFAULT,
    transform: 'translateX(0)',
    easing: 'ease-out',
    opacity: 1
  }
];

const BOUNCE_IN_FWD: Keyframe[] = [
  {
    offset: 0,
    ...BOUNCE_IN_DEFAULT,
    transform: 'scale(0)',
    easing: 'ease-in',
    opacity: 0
  },
  {
    offset: 0.38,
    ...BOUNCE_IN_DEFAULT,
    transform: 'scale(1)',
    easing: 'ease-out',
    opacity: 1
  },
  {
    offset: 0.55,
    ...BOUNCE_IN_DEFAULT,
    transform: 'scale(0.7)',
    easing: 'ease-in',
    opacity: 1
  },
  {
    offset: 0.72,
    ...BOUNCE_IN_DEFAULT,
    transform: 'scale(1)',
    easing: 'ease-out',
    opacity: 1
  },
  {
    offset: 0.81,
    ...BOUNCE_IN_DEFAULT,
    transform: 'scale(0.84)',
    easing: 'ease-in',
    opacity: 1
  },
  {
    offset: 0.89,
    ...BOUNCE_IN_DEFAULT,
    transform: 'scale(1)',
    easing: 'ease-out',
    opacity: 1
  },
  {
    offset: 0.95,
    ...BOUNCE_IN_DEFAULT,
    transform: 'scale(0.95)',
    easing: 'ease-in',
    opacity: 1
  },
  {
    offset: 1,
    ...BOUNCE_IN_DEFAULT,
    transform: 'scale(1)',
    easing: 'ease-out',
    opacity: 1
  }
];

const BOUNCE_IN_BCK: Keyframe[] = [
  {
    offset: 0,
    ...BOUNCE_IN_DEFAULT,
    transform: 'scale(7)',
    easing: 'ease-in',
    opacity: 0
  },
  {
    offset: 0.38,
    ...BOUNCE_IN_DEFAULT,
    transform: 'scale(1)',
    easing: 'ease-out',
    opacity: 1
  },
  {
    offset: 0.55,
    ...BOUNCE_IN_DEFAULT,
    transform: 'scale(1.5)',
    easing: 'ease-in',
    opacity: 1
  },
  {
    offset: 0.72,
    ...BOUNCE_IN_DEFAULT,
    transform: 'scale(1)',
    easing: 'ease-out',
    opacity: 1
  },
  {
    offset: 0.81,
    ...BOUNCE_IN_DEFAULT,
    transform: 'scale(1.24)',
    easing: 'ease-in',
    opacity: 1
  },
  {
    offset: 0.89,
    ...BOUNCE_IN_DEFAULT,
    transform: 'scale(1)',
    easing: 'ease-out',
    opacity: 1
  },
  {
    offset: 0.95,
    ...BOUNCE_IN_DEFAULT,
    transform: 'scale(1.04)',
    easing: 'ease-in',
    opacity: 1
  },
  {
    offset: 1,
    ...BOUNCE_IN_DEFAULT,
    transform: 'scale(1)',
    easing: 'ease-out',
    opacity: 1
  }
];

export default {
  [ANIMATIONS.BOUNCE_IN_TOP]: BOUNCE_IN_TOP,
  [ANIMATIONS.BOUNCE_IN_RIGHT]: BOUNCE_IN_RIGHT,
  [ANIMATIONS.BOUNCE_IN_BOTTOM]: BOUNCE_IN_BOTTOM,
  [ANIMATIONS.BOUNCE_IN_LEFT]: BOUNCE_IN_LEFT,
  [ANIMATIONS.BOUNCE_IN_FWD]: BOUNCE_IN_FWD,
  [ANIMATIONS.BOUNCE_IN_BCK]: BOUNCE_IN_BCK
};
