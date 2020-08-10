import { IAnimatable } from './models/animatable';
import { KEYFRAMES } from './animations';
import { EasingType, EASING_FUNCTIONS } from './easing/easing';

function createAnimation(element: HTMLElement, context: IAnimatable): Animation {
  const newKeyFrames = context.keyFrames || (context.name && KEYFRAMES[context.name]) || [];
  const options = getAnimationOptions(context);
  const newAnimation = element.animate(newKeyFrames, options);
  newAnimation.pause();
  if (context.currentTime !== undefined) newAnimation.currentTime = context.currentTime;
  if (context.startTime !== undefined) newAnimation.startTime = context.startTime;

  return newAnimation;
}

function getAnimationOptions(context: IAnimatable): KeyframeAnimationOptions {
  const animationOptions: KeyframeAnimationOptions = context.options || {};
  if (context.delay !== undefined) animationOptions.delay = context.delay;
  if (context.duration !== undefined) animationOptions.duration = context.duration;
  if (context.direction !== undefined) animationOptions.direction = context.direction;
  if (context.composite !== undefined) animationOptions.composite = context.composite;
  const easingType = (context.easing || animationOptions.easing) as EasingType;
  animationOptions.easing = EASING_FUNCTIONS[easingType] || easingType;
  if (context.endDelay !== undefined) animationOptions.endDelay = context.endDelay;
  if (context.fill !== undefined) animationOptions.fill = context.fill;
  if (context.iterations !== undefined) animationOptions.iterations = context.iterations;
  if (context.iterationStart !== undefined) animationOptions.iterationStart = context.iterationStart;
  if (context.iterationComposite !== undefined) animationOptions.iterationComposite = context.iterationComposite;

  return animationOptions;
}

export class AnimationManager {
  private element: HTMLElement;
  private state: IAnimatable;
  private name: Animation = null;
  private isUpdatingState: boolean;

  constructor(initState: IAnimatable) {
    this.state = initState;
  }

  get currentAnimation(): Animation {
    return this.name || this.loadAnimation();
  }

  set currentAnimation(value: Animation) {
    this.name = value;
  }

  loadAnimation() {
    const { element, state } = this;
    const newAnimation = createAnimation(element, state);

    newAnimation.addEventListener('finish', this.onFinishAnimation);
    newAnimation.addEventListener('cancel', this.onCancelAnimation);

    return (this.name = newAnimation);
  }

  clearAnimation() {
    if (this.name === null) return;
    this.name.removeEventListener('finish', this.onFinishAnimation);
    this.name.removeEventListener('cancel', this.onCancelAnimation);
    this.name = null;
  }

  destroyAnimation() {
    if (this.name === null) return;
    const currentAnimation = this.name;
    this.clearAnimation();
    currentAnimation.cancel();
  }

  playAnimation() {
    // If the animation is playing, do nothing
    if (this.currentAnimation.playState === 'running' && !this.isUpdatingState) {
      return;
    }

    // Cancel current animation before creating another one
    if (this.isUpdatingState) {
      this.destroyAnimation();
    }

    this.currentAnimation.play();
    this.onStartAnimation();
  }

  setState(element: HTMLElement, newState: IAnimatable) {
    this.isUpdatingState = true;
    this.element = element;
    this.state = newState;
  }

  savedState() {
    // Check if `autoPlay` is enabled to play a new animation and emit the event.
    if (this.state.autoPlay) {
      this.playAnimation();
    }
    this.isUpdatingState = false;
  }

  onStartAnimation = () => {
    this.state.slStart.emit(this.element);
  };

  onCancelAnimation = () => {
    this.state.slCancel.emit(this.element);
  };

  onFinishAnimation = () => {
    const { element, state } = this;
    state.slFinish.emit(element);
  };
}
