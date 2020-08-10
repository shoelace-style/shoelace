import { h, Component, Element, Prop, Event, EventEmitter, Method, Watch } from '@stencil/core';
import { IAnimatableComponent } from './models/animatable';
import { AnimationsType, getKeyFramesByAnimation } from './animations';
import { AnimationManager } from './manager';

/**
 * @since 2.0
 * @status experimental
 *
 * @slot - The element to animate. If multiple elements are to be animated, wrap them in a single container.
 */
@Component({
  tag: 'sl-animation',
  styleUrl: 'animation.scss',
  shadow: true
})
export class Animate implements IAnimatableComponent {
  manager?: AnimationManager = null;

  get container() {
    return this.host.shadowRoot.querySelector('slot').assignedElements({ flatten: true })[0] as HTMLElement;
  }

  @Element() host: HTMLSlAnimationElement;

  /** Name of the animation to get the keyFrames */
  @Prop({ reflect: true }) name?: AnimationsType;

  /** Keyframes of the animation. */
  @Prop({ mutable: true, reflect: true }) keyFrames?: Keyframe[];

  /** Default options of the animation. */
  @Prop({ mutable: true, reflect: true }) options?: KeyframeAnimationOptions;

  /** The number of milliseconds to delay the start of the animation. */
  @Prop({ mutable: true }) delay = 0;

  /** The number of milliseconds to delay after the end of an animation. */
  @Prop({ mutable: true }) endDelay = 0;

  /** The number of milliseconds each iteration of the animation takes to complete. */
  @Prop({ mutable: true }) duration = 0;

  /** Direction of the animation. */
  @Prop({ mutable: true }) direction?: PlaybackDirection;

  /**
   * Determines how values are combined between this animation and other, separate animations that do not specify their
   * own specific composite operation. Defaults to `replace`.
   */
  @Prop({ mutable: true }) composite: CompositeOperation = 'replace';

  /** The rate of the animation's change over time. */
  @Prop({ mutable: true }) easing?: string;

  /**
   * Dictates whether the animation's effects should be reflected by the element(s) prior to playing ("backwards"),
   * retained after the animation has completed playing ("forwards"), or both. Defaults to "none".
   */
  @Prop({ mutable: true }) fill?: FillMode;

  /**
   * The number of times the animation should repeat. Defaults to `1`, and can also take a value of `Infinity` to make
   * it repeat for as long as the element exists.
   */
  @Prop({ mutable: true }) iterations: any = 1;

  /** Describes at what point in the iteration the animation should start. */
  @Prop({ mutable: true }) iterationStart?: number;

  /** Determines how values build from iteration to iteration in this animation. */
  @Prop({ mutable: true }) iterationComposite?: IterationCompositeOperation;

  /** Start the animation when the component is mounted. */
  @Prop({ attribute: 'autoplay', reflect: true }) autoPlay? = false;

  /** Sets the current time value of the animation in milliseconds, whether running or paused. */
  @Prop() currentTime = 0;

  /** Sets the playback rate of the animation. */
  @Prop() playbackRate?: number;

  /** Sets the scheduled time when an animation's playback should begin. */
  @Prop() startTime?: number;

  @Watch('name')
  handleAnimationChange(name: AnimationsType) {
    this.keyFrames = getKeyFramesByAnimation(name);
  }

  @Watch('currentTime')
  setCurrenTime(newValue: number) {
    this.manager.currentAnimation.currentTime = newValue;
  }

  @Watch('playbackRate')
  setPlaybackRate(newValue: number) {
    this.manager.currentAnimation.playbackRate = newValue;
  }

  /** Returns the current time value of the animation in milliseconds, whether running or paused. */
  @Method()
  async getCurrentTime(): Promise<number> {
    return Promise.resolve(this.manager.currentAnimation.currentTime);
  }

  @Watch('startTime')
  setStartTime(newValue: number) {
    this.manager.currentAnimation.startTime = newValue;
  }

  /**
   * Returns the scheduled time when an animation's playback should begin.
   */
  @Method()
  async getStartTime(): Promise<number> {
    return Promise.resolve(this.manager.currentAnimation.startTime);
  }

  /**
   * Indicates whether the animation is currently waiting for an asynchronous operation such as initiating playback or
   * pausing a running animation.
   */
  @Method()
  async getPending(): Promise<boolean> {
    return Promise.resolve(this.manager.currentAnimation.pending);
  }

  /** Returns the playback rate of the animation. */
  @Method()
  async getPlaybackRate(): Promise<number> {
    return Promise.resolve(this.manager.currentAnimation.playbackRate);
  }

  /** Returns an enumerated value describing the playback state of an animation. */
  @Method()
  async getPlayState(): Promise<AnimationPlayState> {
    return Promise.resolve(this.manager.currentAnimation.playState);
  }

  /** This event is sent when the animation is going to play. */
  @Event({ bubbles: false }) slStart!: EventEmitter<HTMLElement>;

  /** This event is sent when the animation finishes playing. */
  @Event({ bubbles: false }) slFinish!: EventEmitter<HTMLElement>;

  /** This event is sent when the animation is cancelled. */
  @Event({ bubbles: false }) slCancel!: EventEmitter<HTMLElement>;

  /** Clears all `KeyframeEffects` caused by this animation and aborts its playback. */
  @Method()
  async cancel(): Promise<void> {
    this.manager.currentAnimation.cancel();
  }

  /** Sets the current playback time to the end of the animation corresponding to the current playback direction. */
  @Method()
  async finish(): Promise<void> {
    this.manager.currentAnimation.finish();
  }

  /** Suspends playback of the animation. */
  @Method()
  async pause(): Promise<void> {
    this.manager.currentAnimation.pause();
  }

  /** Starts or resumes playing of an animation. */
  @Method()
  async play(): Promise<void> {
    this.manager.playAnimation();
  }

  /** Reverses the playback direction, meaning the animation ends at its beginning. */
  @Method()
  async reverse(): Promise<void> {
    this.manager.currentAnimation.reverse();
  }

  /** Clear the current animation */
  @Method()
  async clear(): Promise<void> {
    this.manager.clearAnimation();
  }

  /** Destroy the current animation */
  @Method()
  async destroy(): Promise<void> {
    if (this.manager !== null) {
      this.manager.destroyAnimation();
    }
  }

  componentDidLoad() {
    this.manager = new AnimationManager(this);
    this.manager.setState(this.container, this);
    this.manager.savedState();
  }

  componentWillUpdate() {
    this.manager.setState(this.container, this);
  }

  componentDidUpdate() {
    this.manager.savedState();
  }

  disconnectedCallback() {
    this.destroy();
  }

  render() {
    return <slot />;
  }
}
