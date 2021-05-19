export function prefersReducedMotion() {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)');
  return query?.matches;
}

//
// Performs a finite, keyframe-based animation. Returns a promise that resolves when the animation finishes or cancels.
//
export async function animateTo(
  el: HTMLElement,
  keyframes: Keyframe[] | PropertyIndexedKeyframes,
  options?: KeyframeAnimationOptions
) {
  return new Promise(async resolve => {
    if (options) {
      if (options.duration === Infinity) {
        throw new Error('Promise-based animations must be finite.');
      }

      if (prefersReducedMotion()) {
        options.duration = 0;
      }
    }

    const animation = el.animate(keyframes, options);
    animation.addEventListener('cancel', resolve, { once: true });
    animation.addEventListener('finish', resolve, { once: true });
  });
}

//
// Stops all active animations on the target element. Returns a promise that resolves when all animations are canceled.
//
export async function stopAnimations(el: HTMLElement) {
  await Promise.all(
    el.getAnimations().map(animation => {
      return new Promise(resolve => {
        animation.cancel();
        animation.addEventListener('cancel', resolve, { once: true });
        animation.addEventListener('finish', resolve, { once: true });
      });
    })
  );
}
