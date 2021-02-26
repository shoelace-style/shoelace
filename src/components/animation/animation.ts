import { html, Shoemaker } from '@shoelace-style/shoemaker';
import styles from 'sass:./animation.scss';
import { animations } from './animations';

/**
 * @since 2.0
 * @status stable
 *
 * @slot - The element to animate. If multiple elements are to be animated, wrap them in a single container.
 *
 * @emit sl-cancel - Emitted when the animation is canceled.
 * @emit sl-finish - Emitted when the animation finishes.
 * @emit sl-start - Emitted when the animation starts or restarts.
 */
export default class SlAnimation extends Shoemaker {
  static tag = 'sl-animation';
  static props = [
    'name',
    'delay',
    'direction',
    'duration',
    'easing',
    'endDelay',
    'fill',
    'iterations',
    'iterationStart',
    'keyframes',
    'playbackRate',
    'pause'
  ];
  static reflect = ['name', 'pause'];
  static styles = styles;

  private animation: Animation;
  private defaultSlot: HTMLSlotElement;
  private hasStarted = false;

  /** The name of the built-in animation to use. For custom animations, use the `keyframes` prop. */
  name = 'none';

  /** The number of milliseconds to delay the start of the animation. */
  delay = 0;

  /** Determines the direction of playback as well as the behavior when reaching the end of an iteration. */
  direction: PlaybackDirection = 'normal';

  /** The number of milliseconds each iteration of the animation takes to complete. */
  duration = 1000;

  /**
   * The easing function to use for the animation. This can be a Shoelace easing function or a custom easing function
   * such as `cubic-bezier(0, 1, .76, 1.14)`.
   */
  easing = 'linear';

  /** The number of milliseconds to delay after the active period of an animation sequence. */
  endDelay = 0;

  /** Sets how the animation applies styles to its target before and after its execution. */
  fill: FillMode = 'auto';

  /** The number of iterations to run before the animation completes. Defaults to `Infinity`, which loops. */
  iterations: number = Infinity;

  /** The offset at which to start the animation, usually between 0 (start) and 1 (end). */
  iterationStart = 0;

  /** The keyframes to use for the animation. If this is set, `name` will be ignored. */
  keyframes: Keyframe[];

  /**
   * Sets the animation's playback rate. The default is `1`, which plays the animation at a normal speed. Setting this
   * to `2`, for example, will double the animation's speed. A negative value can be used to reverse the animation. This
   * value can be changed without causing the animation to restart.
   */
  playbackRate = 1;

  /** Pauses the animation. The animation will resume when this prop is removed. */
  pause = false;

  onReady() {
    this.createAnimation();
  }

  onDisconnect() {
    this.destroyAnimation();
  }

  handleAnimationFinish() {
    this.emit('sl-finish');
  }

  handleAnimationCancel() {
    this.emit('sl-cancel');
  }

  handlePlaybackRateChange() {
    this.animation.playbackRate = this.playbackRate;
  }

  handleSlotChange() {
    this.destroyAnimation();
    this.createAnimation();
  }

  createAnimation() {
    const easing = animations.easings[this.easing] || this.easing;
    const keyframes: Keyframe[] = this.keyframes ? this.keyframes : (animations as any)[this.name];
    const element = this.defaultSlot.assignedElements({ flatten: true })[0] as HTMLElement;

    if (!element) {
      return;
    }

    this.destroyAnimation();
    this.animation = element.animate(keyframes, {
      delay: this.delay,
      direction: this.direction,
      duration: this.duration,
      easing,
      endDelay: this.endDelay,
      fill: this.fill,
      iterationStart: this.iterationStart,
      iterations: this.iterations
    });
    this.animation.playbackRate = this.playbackRate;
    this.animation.addEventListener('cancel', this.handleAnimationCancel);
    this.animation.addEventListener('finish', this.handleAnimationFinish);

    if (this.pause) {
      this.animation.pause();
    } else {
      this.hasStarted = true;
      this.emit('sl-start');
    }
  }

  destroyAnimation() {
    if (this.animation) {
      this.animation.cancel();
      this.animation.removeEventListener('cancel', this.handleAnimationCancel);
      this.animation.removeEventListener('finish', this.handleAnimationFinish);
      this.hasStarted = false;
    }
  }

  // Restart the animation when any of these properties change
  watchDelay() {
    this.createAnimation();
  }

  watchDirection() {
    this.createAnimation();
  }

  watchEasing() {
    this.createAnimation();
  }

  watchEndDelay() {
    this.createAnimation();
  }

  watchFill() {
    this.createAnimation();
  }

  watchIterations() {
    this.createAnimation();
  }

  watchIterationStart() {
    this.createAnimation();
  }

  watchKeyframes() {
    this.createAnimation();
  }

  watchName() {
    this.createAnimation();
  }

  watchPause() {
    this.pause ? this.animation.pause() : this.animation.play();

    if (!this.pause && !this.hasStarted) {
      this.hasStarted = true;
      this.emit('sl-start');
    }
  }

  watchPlaybackRate() {
    this.animation.playbackRate = this.playbackRate;
  }

  /** Clears all KeyframeEffects caused by this animation and aborts its playback. */
  cancel() {
    try {
      this.animation.cancel();
    } catch {}
  }

  /** Sets the playback time to the end of the animation corresponding to the current playback direction. */
  finish() {
    try {
      this.animation.finish();
    } catch {}
  }

  /** Gets the current time of the animation in milliseconds. */
  getCurrentTime() {
    return this.animation.currentTime;
  }

  /** Sets the current time of the animation in milliseconds. */
  setCurrentTime(time: number) {
    this.animation.currentTime = time;
  }

  render() {
    return html`
      <slot ref=${(el: HTMLSlotElement) => (this.defaultSlot = el)} onslotchange=${this.handleSlotChange.bind(this)} />
    `;
  }
}
