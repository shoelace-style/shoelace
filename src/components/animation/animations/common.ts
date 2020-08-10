/**
 * Animate.css Animations
 */
import { ANIMATIONS as ANIMATIONS_ANIMATE_CSS } from './animate/common';

/**
 * Animista Animations
 */
import { ANIMATIONS as ANIMATIONS_ANIMISTA } from './animista/common';

export const ANIMATIONS = {
  /**
   * DEFAULT ANIMATION
   */
  NONE: 'none',
  ...ANIMATIONS_ANIMATE_CSS,
  ...ANIMATIONS_ANIMISTA
} as const;

export type AnimationsType = typeof ANIMATIONS[keyof typeof ANIMATIONS];
