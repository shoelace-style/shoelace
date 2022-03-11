import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
import { html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { animateTo, parseDuration, stopAnimations } from '~/internal/animate';
import { emit, waitForEvent } from '~/internal/event';
import { watch } from '~/internal/watch';
import { getAnimation, setDefaultAnimation } from '~/utilities/animation-registry';
import styles from './tooltip.styles';

/**
 * @since 2.0
 * @status stable
 *
 * @slot - The tooltip's target element. Only the first element will be used as the target.
 * @slot content - The tooltip's content. Alternatively, you can use the content prop.
 *
 * @event sl-show - Emitted when the tooltip begins to show.
 * @event sl-after-show - Emitted after the tooltip has shown and all animations are complete.
 * @event sl-hide - Emitted when the tooltip begins to hide.
 * @event sl-after-hide - Emitted after the tooltip has hidden and all animations are complete.
 *
 * @csspart base - The component's internal wrapper.
 *
 * @cssproperty --max-width - The maximum width of the tooltip.
 * @cssproperty --hide-delay - The amount of time to wait before hiding the tooltip when hovering.
 * @cssproperty --show-delay - The amount of time to wait before showing the tooltip when hovering.
 *
 * @animation tooltip.show - The animation to use when showing the tooltip.
 * @animation tooltip.hide - The animation to use when hiding the tooltip.
 */
@customElement('sl-tooltip')
export default class SlTooltip extends LitElement {
  static styles = styles;

  @query('.tooltip-positioner') positioner: HTMLElement;
  @query('.tooltip') tooltip: HTMLElement;
  @query('.tooltip__arrow') arrow: HTMLElement;

  private target: HTMLElement;
  private hoverTimeout: number;
  private positionerCleanup: ReturnType<typeof autoUpdate> | undefined;

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

  /**
   * Enable this option to prevent the tooltip from being clipped when the component is placed inside a container with
   * `overflow: auto|hidden|scroll`.
   */
  @property({ type: Boolean }) hoist = false;

  connectedCallback() {
    super.connectedCallback();
    this.handleBlur = this.handleBlur.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);

    this.updateComplete.then(() => {
      this.addEventListener('blur', this.handleBlur, true);
      this.addEventListener('focus', this.handleFocus, true);
      this.addEventListener('click', this.handleClick);
      this.addEventListener('keydown', this.handleKeyDown);
      this.addEventListener('mouseover', this.handleMouseOver);
      this.addEventListener('mouseout', this.handleMouseOut);
      this.target = this.getTarget();
    });
  }

  async firstUpdated() {
    this.tooltip.hidden = !this.open;

    // If the tooltip is visible on init, update its position
    if (this.open) {
      await this.updateComplete;
      this.updatePositioner();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('blur', this.handleBlur, true);
    this.removeEventListener('focus', this.handleFocus, true);
    this.removeEventListener('click', this.handleClick);
    this.removeEventListener('keydown', this.handleKeyDown);
    this.removeEventListener('mouseover', this.handleMouseOver);
    this.removeEventListener('mouseout', this.handleMouseOut);
    this.stopPositioner();
  }

  /** Shows the tooltip. */
  async show() {
    if (this.open) {
      return undefined;
    }

    this.open = true;
    return waitForEvent(this, 'sl-after-show');
  }

  /** Hides the tooltip */
  async hide() {
    if (!this.open) {
      return undefined;
    }

    this.open = false;
    return waitForEvent(this, 'sl-after-hide');
  }

  getTarget() {
    // Get the first child that isn't a <style> or content slot
    const target = [...this.children].find(
      el => el.tagName.toLowerCase() !== 'style' && el.getAttribute('slot') !== 'content'
    );

    if (!target) {
      throw new Error('Invalid tooltip target: no child element was found.');
    }

    return target as HTMLElement;
  }

  handleBlur() {
    if (this.hasTrigger('focus')) {
      this.hide();
    }
  }

  handleClick() {
    if (this.hasTrigger('click')) {
      if (this.open) {
        this.hide();
      } else {
        this.show();
      }
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
      this.hoverTimeout = window.setTimeout(() => void this.show(), delay);
    }
  }

  handleMouseOut() {
    if (this.hasTrigger('hover')) {
      const delay = parseDuration(getComputedStyle(this).getPropertyValue('--hide-delay'));
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = window.setTimeout(() => void this.hide(), delay);
    }
  }

  @watch('open', { waitUntilFirstUpdate: true })
  async handleOpenChange() {
    if (this.disabled) {
      return;
    }

    if (this.open) {
      // Show
      emit(this, 'sl-show');

      await stopAnimations(this.tooltip);
      this.startPositioner();
      this.tooltip.hidden = false;
      const { keyframes, options } = getAnimation(this, 'tooltip.show');
      await animateTo(this.tooltip, keyframes, options);

      emit(this, 'sl-after-show');
    } else {
      // Hide
      emit(this, 'sl-hide');

      await stopAnimations(this.tooltip);
      const { keyframes, options } = getAnimation(this, 'tooltip.hide');
      await animateTo(this.tooltip, keyframes, options);
      this.tooltip.hidden = true;
      this.stopPositioner();

      emit(this, 'sl-after-hide');
    }
  }

  @watch('content')
  @watch('distance')
  @watch('hoist')
  @watch('placement')
  @watch('skidding')
  handleOptionsChange() {
    this.updatePositioner();
  }

  @watch('disabled')
  handleDisabledChange() {
    if (this.disabled && this.open) {
      this.hide();
    }
  }

  hasTrigger(triggerType: string) {
    const triggers = this.trigger.split(' ');
    return triggers.includes(triggerType);
  }

  private startPositioner() {
    this.stopPositioner();
    this.updatePositioner();
    this.positionerCleanup = autoUpdate(this.target, this.positioner, this.updatePositioner.bind(this));
  }

  private updatePositioner() {
    if (!this.open || !this.target || !this.positioner) {
      return;
    }

    computePosition(this.target, this.positioner, {
      placement: this.placement,
      middleware: [
        offset({ mainAxis: this.distance, crossAxis: this.skidding }),
        flip(),
        shift(),
        arrow({
          element: this.arrow,
          padding: 10 // min distance from the edge
        })
      ],
      strategy: this.hoist ? 'fixed' : 'absolute'
    }).then(({ x, y, middlewareData, placement }) => {
      const arrowX = middlewareData.arrow!.x;
      const arrowY = middlewareData.arrow!.y;
      const staticSide = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' }[placement.split('-')[0]]!;

      this.positioner.setAttribute('data-placement', placement);

      Object.assign(this.positioner.style, {
        position: this.hoist ? 'fixed' : 'absolute',
        left: `${x}px`,
        top: `${y}px`
      });

      Object.assign(this.arrow.style, {
        left: typeof arrowX === 'number' ? `${arrowX}px` : '',
        top: typeof arrowY === 'number' ? `${arrowY}px` : '',
        right: '',
        bottom: '',
        [staticSide]: 'calc(var(--sl-tooltip-arrow-size) * -1)'
      });
    });
  }

  private stopPositioner() {
    if (this.positionerCleanup) {
      this.positionerCleanup();
      this.positionerCleanup = undefined;
      this.positioner.removeAttribute('data-placement');
    }
  }

  render() {
    return html`
      <div class="tooltip-target" aria-describedby="tooltip">
        <slot></slot>
      </div>

      <div class="tooltip-positioner">
        <div
          part="base"
          id="tooltip"
          class=${classMap({
            tooltip: true,
            'tooltip--open': this.open
          })}
          role="tooltip"
          aria-hidden=${this.open ? 'false' : 'true'}
        >
          <div class="tooltip__arrow"></div>
          <div class="tooltip__content">
            <slot name="content"> ${this.content} </slot>
          </div>
        </div>
      </div>
    `;
  }
}

setDefaultAnimation('tooltip.show', {
  keyframes: [
    { opacity: 0, transform: 'scale(0.8)' },
    { opacity: 1, transform: 'scale(1)' }
  ],
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
