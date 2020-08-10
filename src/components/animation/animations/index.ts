import { ANIMATIONS, AnimationsType } from './common';
import ANIMATE from './animate';
import ANIMISTA from './animista';

export const ANIMATION_KEY_ERROR = 'Animation not supported';
export { ANIMATIONS, AnimationsType };
export const KEYFRAMES = {
  [ANIMATIONS.NONE]: [] as Keyframe[],
  ...ANIMATE,
  ...ANIMISTA
} as const;

export function getKeyFramesByAnimation(animation: AnimationsType) {
  const keyFrames = KEYFRAMES[animation];
  if (keyFrames !== undefined) {
    return keyFrames;
  } else {
    throw new Error(ANIMATION_KEY_ERROR);
  }
}
