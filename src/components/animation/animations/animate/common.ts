const ANIMATIONS_ATTENTION_SEEKERS = {
  BOUNCE: 'bounce',
  FLASH: 'flash',
  JELLO: 'jello',
  PULSE: 'pulse',
  ROTATE: 'rotate',
  SHAKE: 'shake',
  SWING: 'swing',
  RUBBER_BAND: 'rubberBand',
  TADA: 'tada',
  WOBBLE: 'wobble',
  HEART_BEAT: 'heartBeat'
} as const;

const ANIMATIONS_BOUNCING_ENTRANCES = {
  BOUNCE_IN: 'bounceIn',
  BOUNCE_IN_UP: 'bounceInUp',
  BOUNCE_IN_DOWN: 'bounceInDown',
  BOUNCE_IN_RIGHT: 'bounceInRight',
  BOUNCE_IN_LEFT: 'bounceInLeft'
} as const;

const ANIMATIONS_BOUNCING_EXITS = {
  BOUNCE_OUT: 'bounceOut',
  BOUNCE_OUT_UP: 'bounceOutUp',
  BOUNCE_OUT_DOWN: 'bounceOutDown',
  BOUNCE_OUT_RIGHT: 'bounceOutRight',
  BOUNCE_OUT_LEFT: 'bounceOutLeft'
} as const;

const ANIMATIONS_FADING_ENTRANCES = {
  FADE_IN: 'fadeIn',
  FADE_IN_UP: 'fadeInUp',
  FADE_IN_UP_BIG: 'fadeInUpBig',
  FADE_IN_DOWN: 'fadeInDown',
  FADE_IN_DOWN_BIG: 'fadeInDownBig',
  FADE_IN_RIGHT: 'fadeInRight',
  FADE_IN_RIGHT_BIG: 'fadeInRightBig',
  FADE_IN_LEFT: 'fadeInLeft',
  FADE_IN_LEFT_BIG: 'fadeInLeftBig'
} as const;

const ANIMATIONS_FADING_EXITS = {
  FADE_OUT: 'fadeOut',
  FADE_OUT_UP: 'fadeOutUp',
  FADE_OUT_UP_BIG: 'fadeOutUpBig',
  FADE_OUT_DOWN: 'fadeOutDown',
  FADE_OUT_DOWN_BIG: 'fadeOutDownBig',
  FADE_OUT_RIGHT: 'fadeOutRight',
  FADE_OUT_RIGHT_BIG: 'fadeOutRightBig',
  FADE_OUT_LEFT: 'fadeOutLeft',
  FADE_OUT_LEFT_BIG: 'fadeOutLeftBig'
} as const;

const ANIMATIONS_FLIPPERS = {
  FLIP: 'flip',
  FLIP_IN_X: 'flipInX',
  FLIP_IN_Y: 'flipInY',
  FLIP_OUT_X: 'flipOutX',
  FLIP_OUT_Y: 'flipOutY'
} as const;

const ANIMATIONS_LIGHTSPEED = {
  LIGHT_SPEED_IN: 'lightSpeedIn',
  LIGHT_SPEED_OUT: 'lightSpeedOut'
} as const;

const ANIMATIONS_ROTATING_ENTRANCES = {
  ROTATE_IN: 'rotateIn',
  ROTATE_IN_CLOCKWISE: 'rotateInClockwise',
  ROTATE_IN_DOWN_LEFT: 'rotateInDownLeft',
  ROTATE_IN_DOWN_RIGHT: 'rotateInDownRight',
  ROTATE_IN_UP_LEFT: 'rotateInUpLeft',
  ROTATE_IN_UP_RIGHT: 'rotateInUpRight'
} as const;

const ANIMATIONS_ROTATING_EXITS = {
  ROTATE_OUT: 'rotateOut',
  ROTATE_OUT_CLOCKWISE: 'rotateOutClockwise',
  ROTATE_OUT_DOWN_LEFT: 'rotateOutDownLeft',
  ROTATE_OUT_DOWN_RIGHT: 'rotateOutDownRight',
  ROTATE_OUT_UP_LEFT: 'rotateOutUpLeft',
  ROTATE_OUT_UP_RIGHT: 'rotateOutUpRight'
} as const;

const ANIMATIONS_SLIDING_ENTRANCES = {
  SLIDE_IN_UP: 'slideInUp',
  SLIDE_IN_DOWN: 'slideInDown',
  SLIDE_IN_LEFT: 'slideInLeft',
  SLIDE_IN_RIGHT: 'slideInRight'
} as const;

const ANIMATIONS_SLIDING_EXITS = {
  SLIDE_OUT_UP: 'slideOutUp',
  SLIDE_OUT_DOWN: 'slideOutDown',
  SLIDE_OUT_LEFT: 'slideOutLeft',
  SLIDE_OUT_RIGHT: 'slideOutRight'
} as const;

const ANIMATIONS_ZOOM_ENTRANCES = {
  ZOOM_IN: 'zoomIn',
  ZOOM_IN_UP: 'zoomInUp',
  ZOOM_IN_DOWN: 'zoomInDown',
  ZOOM_IN_LEFT: 'zoomInLeft',
  ZOOM_IN_RIGHT: 'zoomInRight'
} as const;

const ANIMATIONS_ZOOM_EXITS = {
  ZOOM_OUT: 'zoomOut',
  ZOOM_OUT_UP: 'zoomOutUp',
  ZOOM_OUT_DOWN: 'zoomOutDown',
  ZOOM_OUT_LEFT: 'zoomOutLeft',
  ZOOM_OUT_RIGHT: 'zoomOutRight'
} as const;

const ANIMATIONS_SPECIALS = {
  HINGE: 'hinge',
  JACK_IN_THE_BOX: 'jackInTheBox',
  ROLL_IN: 'rollIn',
  ROLL_OUT: 'rollOut'
} as const;

export const ANIMATIONS = {
  ...ANIMATIONS_ATTENTION_SEEKERS,
  ...ANIMATIONS_BOUNCING_ENTRANCES,
  ...ANIMATIONS_BOUNCING_EXITS,
  ...ANIMATIONS_FADING_ENTRANCES,
  ...ANIMATIONS_FADING_EXITS,
  ...ANIMATIONS_FLIPPERS,
  ...ANIMATIONS_LIGHTSPEED,
  ...ANIMATIONS_ROTATING_ENTRANCES,
  ...ANIMATIONS_ROTATING_EXITS,
  ...ANIMATIONS_SLIDING_ENTRANCES,
  ...ANIMATIONS_SLIDING_EXITS,
  ...ANIMATIONS_ZOOM_ENTRANCES,
  ...ANIMATIONS_ZOOM_EXITS,
  ...ANIMATIONS_SPECIALS
} as const;
