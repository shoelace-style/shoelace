import { ANIMATIONS } from './common';

const TEXT_SHADOW_DROP_DEFAULT: Keyframe = {
  fillMode: 'both'
};

const TEXT_SHADOW_DROP_CENTER: Keyframe[] = [
  { offset: 0, ...TEXT_SHADOW_DROP_DEFAULT, textShadow: '0 0 0 rgba(0, 0, 0, 0)' },
  { offset: 1, ...TEXT_SHADOW_DROP_DEFAULT, textShadow: '0 0 18px rgba(0, 0, 0, 0.35)' }
];

const TEXT_SHADOW_DROP_TOP: Keyframe[] = [
  { offset: 0, ...TEXT_SHADOW_DROP_DEFAULT, textShadow: '0 0 0 rgba(0, 0, 0, 0)' },
  { offset: 1, ...TEXT_SHADOW_DROP_DEFAULT, textShadow: '0 -6px 18px rgba(0, 0, 0, 0.35)' }
];

const TEXT_SHADOW_DROP_TR: Keyframe[] = [
  { offset: 0, ...TEXT_SHADOW_DROP_DEFAULT, textShadow: '0 0 0 rgba(0, 0, 0, 0)' },
  { offset: 1, ...TEXT_SHADOW_DROP_DEFAULT, textShadow: '6px -6px 18px rgba(0, 0, 0, 0.35)' }
];

const TEXT_SHADOW_DROP_RIGHT: Keyframe[] = [
  { offset: 0, ...TEXT_SHADOW_DROP_DEFAULT, textShadow: '0 0 0 rgba(0, 0, 0, 0)' },
  { offset: 1, ...TEXT_SHADOW_DROP_DEFAULT, textShadow: '6px 0 18px rgba(0, 0, 0, 0.35)' }
];

const TEXT_SHADOW_DROP_BR: Keyframe[] = [
  { offset: 0, ...TEXT_SHADOW_DROP_DEFAULT, textShadow: '0 0 0 rgba(0, 0, 0, 0)' },
  { offset: 1, ...TEXT_SHADOW_DROP_DEFAULT, textShadow: '6px 6px 18px rgba(0, 0, 0, 0.35)' }
];

const TEXT_SHADOW_DROP_BOTTOM: Keyframe[] = [
  { offset: 0, ...TEXT_SHADOW_DROP_DEFAULT, textShadow: '0 0 0 rgba(0, 0, 0, 0)' },
  { offset: 1, ...TEXT_SHADOW_DROP_DEFAULT, textShadow: '0 6px 18px rgba(0, 0, 0, 0.35)' }
];

const TEXT_SHADOW_DROP_BL: Keyframe[] = [
  { offset: 0, ...TEXT_SHADOW_DROP_DEFAULT, textShadow: '0 0 0 rgba(0, 0, 0, 0)' },
  { offset: 1, ...TEXT_SHADOW_DROP_DEFAULT, textShadow: '-6px 6px 18px rgba(0, 0, 0, 0.35)' }
];

const TEXT_SHADOW_DROP_LEFT: Keyframe[] = [
  { offset: 0, ...TEXT_SHADOW_DROP_DEFAULT, textShadow: '0 0 0 rgba(0, 0, 0, 0)' },
  { offset: 1, ...TEXT_SHADOW_DROP_DEFAULT, textShadow: '-6px 0 18px rgba(0, 0, 0, 0.35)' }
];

const TEXT_SHADOW_DROP_TL: Keyframe[] = [
  { offset: 0, ...TEXT_SHADOW_DROP_DEFAULT, textShadow: '0 0 0 rgba(0, 0, 0, 0)' },
  { offset: 1, ...TEXT_SHADOW_DROP_DEFAULT, textShadow: '-6px -6px 18px rgba(0, 0, 0, 0.35)' }
];

export default {
  [ANIMATIONS.TEXT_SHADOW_DROP_CENTER]: TEXT_SHADOW_DROP_CENTER,
  [ANIMATIONS.TEXT_SHADOW_DROP_TOP]: TEXT_SHADOW_DROP_TOP,
  [ANIMATIONS.TEXT_SHADOW_DROP_TR]: TEXT_SHADOW_DROP_TR,
  [ANIMATIONS.TEXT_SHADOW_DROP_RIGHT]: TEXT_SHADOW_DROP_RIGHT,
  [ANIMATIONS.TEXT_SHADOW_DROP_BR]: TEXT_SHADOW_DROP_BR,
  [ANIMATIONS.TEXT_SHADOW_DROP_BOTTOM]: TEXT_SHADOW_DROP_BOTTOM,
  [ANIMATIONS.TEXT_SHADOW_DROP_BL]: TEXT_SHADOW_DROP_BL,
  [ANIMATIONS.TEXT_SHADOW_DROP_LEFT]: TEXT_SHADOW_DROP_LEFT,
  [ANIMATIONS.TEXT_SHADOW_DROP_TL]: TEXT_SHADOW_DROP_TL
};
