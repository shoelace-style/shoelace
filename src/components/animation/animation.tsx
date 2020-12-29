import { Component, Element, Event, EventEmitter, Method, Prop, Watch, h } from '@stencil/core';
import { animations } from './animations';
import { easings } from './easings';

/**
 * @since 2.0
 * @status stable
 *
 * @slot - The element to animate. If multiple elements are to be animated, wrap them in a single container.
 */
@Component({
  tag: 'sl-animation',
  styleUrl: 'animation.scss',
  shadow: true
})
export class Animate {
  animation: Animation;
  hasStarted = false;

  @Element() host: HTMLSlAnimationElement;

  /** The name of the built-in animation to use. For custom animations, use the `keyframes` prop. */
  @Prop() name = 'none';

  /** The number of milliseconds to delay the start of the animation. */
  @Prop() delay = 0;

  /** Determines the direction of playback as well as the behavior when reaching the end of an iteration. */
  @Prop() direction: PlaybackDirection = 'normal';

  /** The number of milliseconds each iteration of the animation takes to complete. */
  @Prop() duration = 1000;

  /**
   * The easing function to use for the animation. This can be a Shoelace easing function or a custom easing function
   * such as `cubic-bezier(0, 1, .76, 1.14)`.
   */
  @Prop() easing = 'linear';

  /** The number of milliseconds to delay after the active period of an animation sequence. */
  @Prop() endDelay = 0;

  /** Sets how the animation applies styles to its target before and after its execution. */
  @Prop() fill: FillMode = 'auto';

  /** The number of iterations to run before the animation completes. Defaults to `Infinity`, which loops. */
  @Prop() iterations: number = Infinity;

  /** The offset at which to start the animation, usually between 0 (start) and 1 (end). */
  @Prop() iterationStart = 0;

  /** The keyframes to use for the animation. If this is set, `name` will be ignored. */
  @Prop({ mutable: true }) keyframes: Keyframe[];

  /**
   * Sets the animation's playback rate. The default is `1`, which plays the animation at a normal speed. Setting this
   * to `2`, for example, will double the animation's speed. A negative value can be used to reverse the animation. This
   * value can be changed without causing the animation to restart.
   */
  @Prop() playbackRate = 1;

  /** Pauses the animation. The animation will resume when this prop is removed. */
  @Prop() pause = false;

  // Restart the animation when any of these properties change
  @Watch('delay')
  @Watch('direction')
  @Watch('easing')
  @Watch('endDelay')
  @Watch('fill')
  @Watch('iterations')
  @Watch('iterationStart')
  @Watch('keyframes')
  @Watch('name')
  handleRestartAnimation() {
    this.createAnimation();
  }

  @Watch('pause')
  handlePauseChange() {
    this.pause ? this.animation.pause() : this.animation.play();

    if (!this.pause && !this.hasStarted) {
      this.hasStarted = true;
      this.slStart.emit();
    }
  }

  @Watch('playbackRate')
  handlePlaybackRateChange() {
    this.animation.playbackRate = this.playbackRate;
  }

  /** Emitted when the animation is canceled. */
  @Event({ eventName: 'sl-cancel' }) slCancel: EventEmitter;

  /** Emitted when the animation finishes. */
  @Event({ eventName: 'sl-finish' }) slFinish: EventEmitter;

  /** Emitted when the animation starts or restarts. */
  @Event({ eventName: 'sl-start' }) slStart: EventEmitter;

  connectedCallback() {
    this.handleAnimationFinish = this.handleAnimationFinish.bind(this);
    this.handleAnimationCancel = this.handleAnimationCancel.bind(this);
    this.handleSlotChange = this.handleSlotChange.bind(this);
  }

  componentDidLoad() {
    this.createAnimation();
  }

  disconnectedCallback() {
    this.destroyAnimation();
  }

  handleAnimationFinish() {
    this.slFinish.emit();
  }

  handleAnimationCancel() {
    this.slCancel.emit();
  }

  handleSlotChange() {
    this.destroyAnimation();
    this.createAnimation();
  }

  createAnimation() {
    const easing = easings[this.easing] || this.easing;
    const keyframes: Keyframe[] = this.keyframes ? this.keyframes : animations[this.name];
    const slot = this.host.shadowRoot.querySelector('slot');
    const element = slot.assignedElements({ flatten: true })[0] as HTMLElement;

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
      this.slStart.emit();
    }
  }

  destroyAnimation() {
    if (this.animation) {
      this.animation.cancel();
      this.animation.removeEventListener('cancel', this.handleAnimationCancel);
      this.animation.removeEventListener('finish', this.handleAnimationFinish);
      this.animation = null;
      this.hasStarted = false;
    }
  }

  /** Clears all KeyframeEffects caused by this animation and aborts its playback. */
  @Method()
  async cancel() {
    try {
      this.animation.cancel();
    } catch {}
  }

  /** Sets the playback time to the end of the animation corresponding to the current playback direction. */
  @Method()
  async finish() {
    try {
      this.animation.finish();
    } catch {}
  }

  /** Gets a list of all supported animation names. */
  @Method()
  async getAnimationNames() {
    return Object.entries(animations).map(([name]) => name);
  }

  /** Gets a list of all supported easing function names. */
  @Method()
  async getEasingNames() {
    return Object.entries(easings).map(([name]) => name);
  }

  /** Gets the current time of the animation in milliseconds. */
  @Method()
  async getCurrentTime() {
    return this.animation.currentTime;
  }

  /** Sets the current time of the animation in milliseconds. */
  @Method()
  async setCurrentTime(time: number) {
    this.animation.currentTime = time;
  }

  render() {
    return <slot onSlotchange={this.handleSlotChange} />;
  }
}
