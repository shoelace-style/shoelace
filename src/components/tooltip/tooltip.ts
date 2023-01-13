import '../popup/popup';
import { animateTo, parseDuration, stopAnimations } from '../../internal/animate';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, query } from 'lit/decorators.js';
import { getAnimation, setDefaultAnimation } from '../../utilities/animation-registry';
import { html } from 'lit';
import { LocalizeController } from '../../utilities/localize';
import { waitForEvent } from '../../internal/event';
import { watch } from '../../internal/watch';
import ShoelaceElement from '../../internal/shoelace-element';
import styles from './tooltip.styles';
import type { CSSResultGroup } from 'lit';
import type SlPopup from '../popup/popup';

/**
 * @summary Tooltips display additional information based on a specific action.
 * @documentation https://shoelace.style/components/tooltip
 * @status stable
 * @since 2.0
 *
 * @dependency sl-popup
 *
 * @slot - The tooltip's target element. Avoid slotting in more than one element, as subsequent ones will be ignored.
 * @slot content - The content to render in the tooltip. Alternatively, you can use the `content` attribute.
 *
 * @event sl-show - Emitted when the tooltip begins to show.
 * @event sl-after-show - Emitted after the tooltip has shown and all animations are complete.
 * @event sl-hide - Emitted when the tooltip begins to hide.
 * @event sl-after-hide - Emitted after the tooltip has hidden and all animations are complete.
 *
 * @csspart base - The component's base wrapper, an `<sl-popup>` element.
 * @csspart base__popup - The popup's exported `popup` part. Use this to target the tooltip's popup container.
 * @csspart base__arrow - The popup's exported `arrow` part. Use this to target the tooltip's arrow.
 * @csspart body - The tooltip's body where its content is rendered.
 *
 * @cssproperty --max-width - The maximum width of the tooltip before its content will wrap.
 * @cssproperty --hide-delay - The amount of time to wait before hiding the tooltip when hovering.
 * @cssproperty --show-delay - The amount of time to wait before showing the tooltip when hovering.
 *
 * @animation tooltip.show - The animation to use when showing the tooltip.
 * @animation tooltip.hide - The animation to use when hiding the tooltip.
 */
@customElement('sl-tooltip')
export default class SlTooltip extends ShoelaceElement {
  static styles: CSSResultGroup = styles;

  private hoverTimeout: number;
  private readonly localize = new LocalizeController(this);

  @query('slot:not([name])') defaultSlot: HTMLSlotElement;
  @query('.tooltip__body') body: HTMLElement;
  @query('sl-popup') popup: SlPopup;

  /** The tooltip's content. If you need to display HTML, use the `content` slot instead. */
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
  @property({ type: Number }) distance = 8;

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
   * `overflow: auto|hidden|scroll`. Hoisting uses a fixed positioning strategy that works in many, but not all,
   * scenarios.
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
    });
  }

  firstUpdated() {
    this.body.hidden = !this.open;

    // If the tooltip is visible on init, update its position
    if (this.open) {
      this.popup.active = true;
      this.popup.reposition();
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
  }

  private handleBlur() {
    if (this.hasTrigger('focus')) {
      this.hide();
    }
  }

  private handleClick() {
    if (this.hasTrigger('click')) {
      if (this.open) {
        this.hide();
      } else {
        this.show();
      }
    }
  }

  private handleFocus() {
    if (this.hasTrigger('focus')) {
      this.show();
    }
  }

  private handleKeyDown(event: KeyboardEvent) {
    // Pressing escape when the target element has focus should dismiss the tooltip
    if (this.open && event.key === 'Escape') {
      event.stopPropagation();
      this.hide();
    }
  }

  private handleMouseOver() {
    if (this.hasTrigger('hover')) {
      const delay = parseDuration(getComputedStyle(this).getPropertyValue('--show-delay'));
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = window.setTimeout(() => this.show(), delay);
    }
  }

  private handleMouseOut() {
    if (this.hasTrigger('hover')) {
      const delay = parseDuration(getComputedStyle(this).getPropertyValue('--hide-delay'));
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = window.setTimeout(() => this.hide(), delay);
    }
  }

  private hasTrigger(triggerType: string) {
    const triggers = this.trigger.split(' ');
    return triggers.includes(triggerType);
  }

  @watch('open', { waitUntilFirstUpdate: true })
  async handleOpenChange() {
    if (this.open) {
      if (this.disabled) {
        return;
      }

      // Show
      this.emit('sl-show');

      await stopAnimations(this.body);
      this.body.hidden = false;
      this.popup.active = true;
      const { keyframes, options } = getAnimation(this, 'tooltip.show', { dir: this.localize.dir() });
      await animateTo(this.popup.popup, keyframes, options);

      this.emit('sl-after-show');
    } else {
      // Hide
      this.emit('sl-hide');

      await stopAnimations(this.body);
      const { keyframes, options } = getAnimation(this, 'tooltip.hide', { dir: this.localize.dir() });
      await animateTo(this.popup.popup, keyframes, options);
      this.popup.active = false;
      this.body.hidden = true;

      this.emit('sl-after-hide');
    }
  }

  @watch(['content', 'distance', 'hoist', 'placement', 'skidding'])
  async handleOptionsChange() {
    if (this.hasUpdated) {
      await this.updateComplete;
      this.popup.reposition();
    }
  }

  @watch('disabled')
  handleDisabledChange() {
    if (this.disabled && this.open) {
      this.hide();
    }
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

  render() {
    return html`
      <sl-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${classMap({
          tooltip: true,
          'tooltip--open': this.open
        })}
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist ? 'fixed' : 'absolute'}
        flip
        shift
        arrow
      >
        <slot slot="anchor" aria-describedby="tooltip"></slot>

        <slot
          name="content"
          part="body"
          id="tooltip"
          class="tooltip__body"
          role="tooltip"
          aria-live=${this.open ? 'polite' : 'off'}
        >
          ${this.content}
        </slot>
      </sl-popup>
    `;
  }
}

setDefaultAnimation('tooltip.show', {
  keyframes: [
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1 }
  ],
  options: { duration: 150, easing: 'ease' }
});

setDefaultAnimation('tooltip.hide', {
  keyframes: [
    { opacity: 1, scale: 1 },
    { opacity: 0, scale: 0.8 }
  ],
  options: { duration: 150, easing: 'ease' }
});

declare global {
  interface HTMLElementTagNameMap {
    'sl-tooltip': SlTooltip;
  }
}
