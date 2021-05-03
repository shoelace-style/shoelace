import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property, queryAsync } from 'lit/decorators';
import { event, EventEmitter, watch } from '../../internal/decorators';
import { animations } from './animations';
import styles from 'sass:./animation.scss';

/**
 * @since 2.0
 * @status stable
 *
 * @slot - The element to animate. If multiple elements are to be animated, wrap them in a single container.
 */
@customElement('sl-animation')
export default class SlAnimation extends LitElement {
  static styles = unsafeCSS(styles);

  private animation: Animation;
  private hasStarted = false;

  @queryAsync('slot') defaultSlot: Promise<HTMLSlotElement>;

  /** The name of the built-in animation to use. For custom animations, use the `keyframes` prop. */
  @property() name = 'none';

  /** The number of milliseconds to delay the start of the animation. */
  @property({ type: Number }) delay = 0;

  /** Determines the direction of playback as well as the behavior when reaching the end of an iteration. */
  @property() direction: PlaybackDirection = 'normal';

  /** The number of milliseconds each iteration of the animation takes to complete. */
  @property({ type: Number }) duration = 1000;

  /**
   * The easing function to use for the animation. This can be a Shoelace easing function or a custom easing function
   * such as `cubic-bezier(0, 1, .76, 1.14)`.
   */
  @property() easing = 'linear';

  /** The number of milliseconds to delay after the active period of an animation sequence. */
  @property({ attribute: 'end-delay', type: Number }) endDelay = 0;

  /** Sets how the animation applies styles to its target before and after its execution. */
  @property() fill: FillMode = 'auto';

  /** The number of iterations to run before the animation completes. Defaults to `Infinity`, which loops. */
  @property({ type: Number }) iterations: number = Infinity;

  /** The offset at which to start the animation, usually between 0 (start) and 1 (end). */
  @property({ attribute: 'iteration-start', type: Number }) iterationStart = 0;

  /** The keyframes to use for the animation. If this is set, `name` will be ignored. */
  @property({ attribute: false }) keyframes: Keyframe[];

  /**
   * Sets the animation's playback rate. The default is `1`, which plays the animation at a normal speed. Setting this
   * to `2`, for example, will double the animation's speed. A negative value can be used to reverse the animation. This
   * value can be changed without causing the animation to restart.
   */
  @property({ attribute: 'playback-rate', type: Number }) playbackRate = 1;

  /** Pauses the animation. The animation will resume when this prop is removed. */
  @property({ type: Boolean }) pause = false;

  /** Emitted when the animation is canceled. */
  @event('sl-cancel') slCancel: EventEmitter<void>;

  /** Emitted when the animation finishes. */
  @event('sl-finish') slFinish: EventEmitter<void>;

  /** Emitted when the animation starts or restarts. */
  @event('sl-start') slStart: EventEmitter<void>;

  connectedCallback() {
    super.connectedCallback();
    this.createAnimation();
    this.handleAnimationCancel = this.handleAnimationCancel.bind(this);
    this.handleAnimationFinish = this.handleAnimationFinish.bind(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.destroyAnimation();
  }

  @watch('name')
  @watch('delay')
  @watch('direction')
  @watch('duration')
  @watch('easing')
  @watch('endDelay')
  @watch('fill')
  @watch('iterations')
  @watch('iterationsStart')
  @watch('keyframes')
  handleAnimationChange() {
    this.createAnimation();
  }

  handleAnimationFinish() {
    this.slFinish.emit();
  }

  handleAnimationCancel() {
    this.slCancel.emit();
  }

  @watch('pause')
  handlePauseChange() {
    if (this.animation) {
      this.pause ? this.animation.pause() : this.animation.play();

      if (!this.pause && !this.hasStarted) {
        this.hasStarted = true;
        this.slStart.emit();
      }

      return true;
    } else {
      return false;
    }
  }

  @watch('playbackRate')
  handlePlaybackRateChange() {
    if (this.animation) {
      this.animation.playbackRate = this.playbackRate;
    }
  }

  handleSlotChange() {
    this.destroyAnimation();
    this.createAnimation();
  }

  async createAnimation() {
    const easing = animations.easings[this.easing] || this.easing;
    const keyframes: Keyframe[] = this.keyframes ? this.keyframes : (animations as any)[this.name];
    const slot = await this.defaultSlot;
    const element = slot.assignedElements()[0] as HTMLElement;

    if (!element) {
      return false;
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

    return true;
  }

  destroyAnimation() {
    if (this.animation) {
      this.animation.cancel();
      this.animation.removeEventListener('cancel', this.handleAnimationCancel);
      this.animation.removeEventListener('finish', this.handleAnimationFinish);
      this.hasStarted = false;
    }
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
    return html` <slot @slotchange=${this.handleSlotChange}></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-animation': SlAnimation;
  }
}
