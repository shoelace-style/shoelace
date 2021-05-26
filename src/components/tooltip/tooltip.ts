import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property, query } from 'lit/decorators';
import { classMap } from 'lit-html/directives/class-map';
import { animateTo, parseDuration, stopAnimations } from '../../internal/animate';
import { Instance as PopperInstance, createPopper } from '@popperjs/core/dist/esm';
import { event, EventEmitter, watch } from '../../internal/decorators';
import { setDefaultAnimation, getAnimation } from '../../utilities/animation-registry';
import styles from 'sass:./tooltip.scss';

let id = 0;

/**
 * @since 2.0
 * @status stable
 *
 * @slot - The tooltip's target element. Only the first element will be used as the target.
 * @slot content - The tooltip's content. Alternatively, you can use the content prop.
 *
 * @part base - The component's base wrapper.
 *
 * @customProperty --max-width - The maximum width of the tooltip.
 * @customProperty --hide-delay - The amount of time to wait before hiding the tooltip (hover only).
 * @customProperty --show-delay - The amount of time to wait before showing the tooltip (hover only).
 *
 * @animation tooltip.show - The animation to use when showing the tooltip.
 * @animation tooltip.hide - The animation to use when hiding the tooltip.
 */
@customElement('sl-tooltip')
export default class SlTooltip extends LitElement {
  static styles = unsafeCSS(styles);

  @query('.tooltip-positioner') positioner: HTMLElement;
  @query('.tooltip') tooltip: HTMLElement;

  private componentId = `tooltip-${++id}`;
  private hasInitialized = false;
  private target: HTMLElement;
  private popover: PopperInstance;
  private hoverTimeout: any;

  /** The tooltip's content. Alternatively, you can use the content slot. */
  @property() content = '';

  /**
   * The preferred placement of the tooltip. Note that the actual placement may vary as needed to keep the tooltip
   * inside of the viewport.
   */
  @property() placement:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end' = 'top';

  /** Disables the tooltip so it won't show when triggered. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** The distance in pixels from which to offset the tooltip away from its target. */
  @property({ type: Number }) distance = 10;

  /** Indicates whether or not the tooltip is open. You can use this in lieu of the show/hide methods. */
  @property({ type: Boolean, reflect: true }) open = false;

  /** The distance in pixels from which to offset the tooltip along its target. */
  @property({ type: Number }) skidding = 0;

  /**
   * Controls how the tooltip is activated. Possible options include `click`, `hover`, `focus`, and `manual`. Multiple
   * options can be passed by separating them with a space. When manual is used, the tooltip must be activated
   * programmatically.
   */
  @property() trigger = 'hover focus';

  /** Emitted when the tooltip begins to show. Calling `event.preventDefault()` will prevent it from being shown. */
  @event('sl-show') slShow: EventEmitter<void>;

  /** Emitted after the tooltip has shown and all transitions are complete. */
  @event('sl-after-show') slAfterShow: EventEmitter<void>;

  /** Emitted when the tooltip begins to hide. Calling `event.preventDefault()` will prevent it from being hidden. */
  @event('sl-hide') slHide: EventEmitter<void>;

  /** Emitted after the tooltip has hidden and all transitions are complete. */
  @event('sl-after-hide') slAfterHide: EventEmitter<void>;

  connectedCallback() {
    super.connectedCallback();

    this.handleBlur = this.handleBlur.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  async firstUpdated() {
    this.target = this.getTarget();
    this.syncOptions();

    this.addEventListener('blur', this.handleBlur, true);
    this.addEventListener('focus', this.handleFocus, true);
    this.addEventListener('click', this.handleClick);
    this.addEventListener('keydown', this.handleKeyDown);
    this.addEventListener('mouseover', this.handleMouseOver);
    this.addEventListener('mouseout', this.handleMouseOut);

    // Set initial visibility
    this.tooltip.hidden = !this.open;

    // Set the initialized flag after the first update is complete
    await this.updateComplete;
    this.hasInitialized = true;
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    if (this.popover) {
      this.popover.destroy();
    }

    this.removeEventListener('blur', this.handleBlur, true);
    this.removeEventListener('focus', this.handleFocus, true);
    this.removeEventListener('click', this.handleClick);
    this.removeEventListener('keydown', this.handleKeyDown);
    this.removeEventListener('mouseover', this.handleMouseOver);
    this.removeEventListener('mouseout', this.handleMouseOut);
  }

  /** Shows the tooltip. */
  async show() {
    // Prevent subsequent calls to the method, whether manually or triggered by the `open` watcher
    if (!this.hasInitialized || this.open || this.disabled) {
      return;
    }

    const slShow = this.slShow.emit();
    if (slShow.defaultPrevented) {
      this.open = false;
      return;
    }

    this.open = true;

    await stopAnimations(this.tooltip);

    if (this.popover) {
      this.popover.destroy();
    }

    this.popover = createPopper(this.target, this.positioner, {
      placement: this.placement,
      strategy: 'absolute',
      modifiers: [
        {
          name: 'flip',
          options: {
            boundary: 'viewport'
          }
        },
        {
          name: 'offset',
          options: {
            offset: [this.skidding, this.distance]
          }
        }
      ]
    });

    this.tooltip.hidden = false;
    const { keyframes, options } = getAnimation(this, 'tooltip.show');
    await animateTo(this.tooltip, keyframes, options);

    this.slAfterShow.emit();
  }

  /** Shows the tooltip. */
  async hide() {
    // Prevent subsequent calls to the method, whether manually or triggered by the `open` watcher
    if (!this.hasInitialized || !this.open) {
      return;
    }

    const slHide = this.slHide.emit();
    if (slHide.defaultPrevented) {
      this.open = true;
      return;
    }

    this.open = false;

    await stopAnimations(this.tooltip);
    const { keyframes, options } = getAnimation(this, 'tooltip.hide');
    await animateTo(this.tooltip, keyframes, options);
    this.tooltip.hidden = true;

    if (this.popover) {
      this.popover.destroy();
    }

    this.slAfterHide.emit();
  }

  getTarget() {
    // Get the first child that isn't a <style> or content slot
    const target = [...this.children].find(
      el => el.tagName.toLowerCase() !== 'style' && el.getAttribute('slot') !== 'content'
    ) as HTMLElement;

    if (!target) {
      throw new Error('Invalid tooltip target: no child element was found.');
    }

    return target;
  }

  handleBlur() {
    if (this.hasTrigger('focus')) {
      this.hide();
    }
  }

  handleClick() {
    if (this.hasTrigger('click')) {
      this.open ? this.hide() : this.show();
    }
  }

  handleFocus() {
    if (this.hasTrigger('focus')) {
      this.show();
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    // Pressing escape when the target element has focus should dismiss the tooltip
    if (this.open && event.key === 'Escape') {
      event.stopPropagation();
      this.hide();
    }
  }

  handleMouseOver() {
    if (this.hasTrigger('hover')) {
      const delay = parseDuration(getComputedStyle(this).getPropertyValue('--show-delay'));
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = setTimeout(() => this.show(), delay);
    }
  }

  handleMouseOut() {
    if (this.hasTrigger('hover')) {
      const delay = parseDuration(getComputedStyle(this).getPropertyValue('--hide-delay'));
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = setTimeout(() => this.hide(), delay);
    }
  }

  @watch('open')
  handleOpenChange() {
    this.open ? this.show() : this.hide();
  }

  @watch('placement')
  @watch('distance')
  @watch('skidding')
  handleOptionsChange() {
    this.syncOptions();
  }

  @watch('disabled')
  handleDisabledChange() {
    if (this.disabled && this.open) {
      this.hide();
    }
  }

  handleSlotChange() {
    const oldTarget = this.target;
    const newTarget = this.getTarget();

    if (newTarget !== oldTarget) {
      if (oldTarget) {
        oldTarget.removeAttribute('aria-describedby');
      }
      newTarget.setAttribute('aria-describedby', this.componentId);
    }
  }

  hasTrigger(triggerType: string) {
    const triggers = this.trigger.split(' ');
    return triggers.includes(triggerType);
  }

  syncOptions() {
    if (this.popover) {
      this.popover.setOptions({
        placement: this.placement,
        strategy: 'absolute',
        modifiers: [
          {
            name: 'flip',
            options: {
              boundary: 'viewport'
            }
          },
          {
            name: 'offset',
            options: {
              offset: [this.skidding, this.distance]
            }
          }
        ]
      });
    }
  }

  render() {
    return html`
      <slot @slotchange=${this.handleSlotChange.bind(this)}></slot>

      <div class="tooltip-positioner">
        <div
          part="base"
          id=${this.componentId}
          class=${classMap({
            tooltip: true,
            'tooltip--open': this.open
          })}
          role="tooltip"
          aria-hidden=${this.open ? 'false' : 'true'}
        >
          <slot name="content">${this.content}</slot>
        </div>
      </div>
    `;
  }
}

setDefaultAnimation('tooltip.show', {
  keyframes: [{ opacity: 0 }, { opacity: 0, transform: 'scale(0.8)' }, { opacity: 1, transform: 'scale(1)' }],
  options: { duration: 150, easing: 'ease' }
});

setDefaultAnimation('tooltip.hide', {
  keyframes: [
    { opacity: 1, transform: 'scale(1)' },
    { opacity: 0, transform: 'scale(0.8)' }
  ],
  options: { duration: 150, easing: 'ease' }
});

declare global {
  interface HTMLElementTagNameMap {
    'sl-tooltip': SlTooltip;
  }
}
