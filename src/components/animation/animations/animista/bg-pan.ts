import { ANIMATIONS } from './common';

const BG_PAN_DEFAULT: Keyframe = {
  fillMode: 'both'
};

const BG_PAN_LEFT: Keyframe[] = [
  { offset: 0, ...BG_PAN_DEFAULT, backgroundPosition: '100% 50%' },
  { offset: 1, ...BG_PAN_DEFAULT, backgroundPosition: '0% 50%' }
];

const BG_PAN_RIGHT: Keyframe[] = [
  { offset: 0, ...BG_PAN_DEFAULT, backgroundPosition: '0% 50%' },
  { offset: 1, ...BG_PAN_DEFAULT, backgroundPosition: '100% 50%' }
];

const BG_PAN_TOP: Keyframe[] = [
  { offset: 0, ...BG_PAN_DEFAULT, backgroundPosition: '50% 100%' },
  { offset: 1, ...BG_PAN_DEFAULT, backgroundPosition: '50% 0%' }
];

const BG_PAN_BOTTOM: Keyframe[] = [
  { offset: 0, ...BG_PAN_DEFAULT, backgroundPosition: '50% 0%' },
  { offset: 1, ...BG_PAN_DEFAULT, backgroundPosition: '50% 100%' }
];

const BG_PAN_TR: Keyframe[] = [
  { offset: 0, ...BG_PAN_DEFAULT, backgroundPosition: '0% 100%' },
  { offset: 1, ...BG_PAN_DEFAULT, backgroundPosition: '100% 0%' }
];

const BG_PAN_BR: Keyframe[] = [
  { offset: 0, ...BG_PAN_DEFAULT, backgroundPosition: '0% 0%' },
  { offset: 1, ...BG_PAN_DEFAULT, backgroundPosition: '100% 100%' }
];

const BG_PAN_BL: Keyframe[] = [
  { offset: 0, ...BG_PAN_DEFAULT, backgroundPosition: '100% 0%' },
  { offset: 1, ...BG_PAN_DEFAULT, backgroundPosition: '0% 100%' }
];

const BG_PAN_TL: Keyframe[] = [
  { offset: 0, ...BG_PAN_DEFAULT, backgroundPosition: '100% 100%' },
  { offset: 1, ...BG_PAN_DEFAULT, backgroundPosition: '0% 0%' }
];

export default {
  [ANIMATIONS.BG_PAN_LEFT]: BG_PAN_LEFT,
  [ANIMATIONS.BG_PAN_RIGHT]: BG_PAN_RIGHT,
  [ANIMATIONS.BG_PAN_TOP]: BG_PAN_TOP,
  [ANIMATIONS.BG_PAN_BOTTOM]: BG_PAN_BOTTOM,
  [ANIMATIONS.BG_PAN_TR]: BG_PAN_TR,
  [ANIMATIONS.BG_PAN_BR]: BG_PAN_BR,
  [ANIMATIONS.BG_PAN_BL]: BG_PAN_BL,
  [ANIMATIONS.BG_PAN_TL]: BG_PAN_TL
};
