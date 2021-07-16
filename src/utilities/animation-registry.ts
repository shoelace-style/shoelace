interface ElementAnimation {
  keyframes: Keyframe[];
  options?: KeyframeAnimationOptions;
}

interface ElementAnimationMap {
  [animationName: string]: ElementAnimation;
}

const defaultAnimationRegistry = new Map<String, ElementAnimation>();
const customAnimationRegistry = new WeakMap<Element, ElementAnimationMap>();

function ensureAnimation(animation: ElementAnimation | null) {
  return animation ?? { keyframes: [], options: { duration: 0 } };
}

//
// Sets a default animation. Components should use the `name.animation` for primary animations and `name.part.animation`
// for secondary animations, e.g. `dialog.show` and `dialog.overlay.show`. For modifiers, use `drawer.showTop`.
//
export function setDefaultAnimation(animationName: string, animation: ElementAnimation | null) {
  defaultAnimationRegistry.set(animationName, ensureAnimation(animation));
}

//
// Sets a custom animation for the specified element.
//
export function setAnimation(el: Element, animationName: string, animation: ElementAnimation | null) {
  customAnimationRegistry.set(
    el,
    Object.assign({}, customAnimationRegistry.get(el), {
      [animationName]: ensureAnimation(animation)
    })
  );
}

//
// Gets an element's animation. Falls back to the default if no animation is found.
//
export function getAnimation(el: Element, animationName: string) {
  const customAnimation = customAnimationRegistry.get(el);

  // Check for a custom animation
  if (customAnimation && customAnimation[animationName]) {
    return customAnimation[animationName];
  }

  // Check for a default animation
  const defaultAnimation = defaultAnimationRegistry.get(animationName);
  if (defaultAnimation) {
    return defaultAnimation;
  }

  // Fall back to an empty animation
  return {
    keyframes: [],
    options: { duration: 0 }
  };
}
