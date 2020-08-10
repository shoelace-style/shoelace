import { h, Component, Element, Prop, Event, EventEmitter, Method, Watch } from '@stencil/core';
import { IAnimatableComponent } from './models/animatable';
import { AnimationsType, getKeyFramesByAnimation } from './animations';
import { AnimationManager } from './manager';

//
// TODO:
//
// - combine manager and remove utils
// - reorder watchers and methods
// - support case-insensitive "infinity" in `iterations`
// - document and provide CDN link for the Web Animations polyfill (which browsers actually require it?) https://github.com/web-animations/web-animations-js
// - clean up animation and easing exports
//

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
  @Prop({ mutable: true }) direction?: PlaybackDirection = 'normal';

  /**
   * Determines how values are combined between this animation and other, separate animations that do not specify their
   * own specific composite operation. Defaults to `replace`.
   */
  @Prop({ mutable: true }) composite: CompositeOperation = 'replace';

  /** The easing effect to use. */
  @Prop({ mutable: true }) easing = 'none';

  /**
   * Defines how the element to which the animation is applied should look when the animation sequence is not actively
   * running, such as before the time specified by iterationStart or after animation's end time.
   */
  @Prop({ mutable: true }) fill?: FillMode = 'none';

  /**
   * The number of times the animation should repeat. Defaults to `1`, and can also take a value of `Infinity` to make
   * it repeat for as long as the element exists.
   */
  @Prop({ mutable: true }) iterations = 1;

  /** Describes at what point in the iteration the animation should start. */
  @Prop({ mutable: true }) iterationStart = 0;

  /** Determines how values build from iteration to iteration in this animation. */
  @Prop({ mutable: true }) iterationComposite?: IterationCompositeOperation;

  /** Start the animation when the component is mounted. */
  @Prop({ attribute: 'autoplay', reflect: true }) autoPlay? = false;

  /** Sets the current time value of the animation in milliseconds, whether running or paused. */
  @Prop() currentTime = 0;

  /** Sets the playback rate of the animation. */
  @Prop() playbackRate = 1;

  /** Sets the scheduled time when an animation's playback should begin. */
  @Prop() startTime = 0;

  @Watch('name')
  handleNameChange(name: AnimationsType) {
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

  /** Emitted when the animation starts playing. */
  @Event() slStart!: EventEmitter<HTMLElement>;

  /** Emitted when the animation finishes. */
  @Event() slFinish!: EventEmitter<HTMLElement>;

  /** Emitted when the animation is canceled. */
  @Event() slCancel!: EventEmitter<HTMLElement>;

  /** Cancels the animation. */
  @Method()
  async cancel(): Promise<void> {
    this.manager.currentAnimation.cancel();
  }

  /** Sets the playback time to the end of the animation corresponding to the playback direction. */
  @Method()
  async finish(): Promise<void> {
    this.manager.currentAnimation.finish();
  }

  /** Pauses the animation. */
  @Method()
  async pause(): Promise<void> {
    this.manager.currentAnimation.pause();
  }

  /** Starts or resumes the animation. */
  @Method()
  async play(): Promise<void> {
    this.manager.playAnimation();
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
