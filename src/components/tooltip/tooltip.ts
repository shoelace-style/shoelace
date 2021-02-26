import { classMap, html, Shoemaker } from '@shoelace-style/shoemaker';
import styles from 'sass:./tooltip.scss';
import Popover from '../../internal/popover';

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
 * @emit sl-show - Emitted when the tooltip begins to show. Calling `event.preventDefault()` will prevent it from being shown.
 * @emit sl-after-show - Emitted after the tooltip has shown and all transitions are complete.
 * @emit sl-hide - Emitted when the tooltip begins to hide. Calling `event.preventDefault()` will prevent it from being hidden.
 * @emit sl-after-hide - Emitted after the tooltip has hidden and all transitions are complete.
 */
export default class SlTooltip extends Shoemaker {
  static tag = 'sl-tooltip';
  static props = ['content', 'placement', 'disabled', 'distance', 'open', 'skidding', 'trigger'];
  static reflect = ['disabled', 'open'];
  static styles = styles;

  private componentId = `tooltip-${++id}`;
  private isVisible = false;
  private popover: Popover;
  private positioner: HTMLElement;
  private target: HTMLElement;
  private tooltip: HTMLElement;

  /** The tooltip's content. Alternatively, you can use the content slot. */
  content = '';

  /**
   * The preferred placement of the tooltip. Note that the actual placement may vary as needed to keep the tooltip
   * inside of the viewport.
   */
  placement:
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
  disabled = false;

  /** The distance in pixels from which to offset the tooltip away from its target. */
  distance = 10;

  /** Indicates whether or not the tooltip is open. You can use this in lieu of the show/hide methods. */
  open = false;

  /** The distance in pixels from which to offset the tooltip along its target. */
  skidding = 0;

  /**
   * Controls how the tooltip is activated. Possible options include `click`, `hover`, `focus`, and `manual`. Multiple
   * options can be passed by separating them with a space. When manual is used, the tooltip must be activated
   * programmatically.
   */
  trigger: string = 'hover focus';

  onReady() {
    this.target = this.getTarget();
    this.popover = new Popover(this.target, this.positioner);
    this.syncOptions();

    this.addEventListener('blur', this.handleBlur.bind(this), true);
    this.addEventListener('click', this.handleClick.bind(this), true);
    this.addEventListener('focus', this.handleFocus.bind(this), true);
    this.addEventListener('keydown', this.handleKeyDown.bind(this), true);
    this.addEventListener('mouseover', this.handleMouseOver.bind(this), true);
    this.addEventListener('mouseout', this.handleMouseOut.bind(this), true);

    // Show on init if open
    this.positioner.hidden = !this.open;
    if (this.open) {
      this.show();
    }
  }

  onDisconnect() {
    this.popover.destroy();
    this.removeEventListener('blur', this.handleBlur, true);
    this.removeEventListener('click', this.handleClick, true);
    this.removeEventListener('focus', this.handleFocus, true);
  }

  /** Shows the tooltip. */
  show() {
    // Prevent subsequent calls to the method, whether manually or triggered by the `open` watcher
    if (this.isVisible) {
      return;
    }

    const slShow = this.emit('sl-show');
    if (slShow.defaultPrevented) {
      this.open = false;
      return;
    }

    this.isVisible = true;
    this.open = true;
    this.popover.show();
  }

  /** Shows the tooltip. */
  hide() {
    // Prevent subsequent calls to the method, whether manually or triggered by the `open` watcher
    if (!this.isVisible) {
      return;
    }

    const slHide = this.emit('sl-hide');
    if (slHide.defaultPrevented) {
      this.open = true;
      return;
    }

    this.isVisible = false;
    this.open = false;
    this.popover.hide();
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
      this.show();
    }
  }

  handleMouseOut() {
    if (this.hasTrigger('hover')) {
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
    this.popover.setOptions({
      placement: this.placement,
      distance: this.distance,
      skidding: this.skidding,
      transitionElement: this.tooltip,
      onAfterHide: () => this.emit('sl-after-hide'),
      onAfterShow: () => this.emit('sl-after-show')
    });
  }

  watchPlacement() {
    this.syncOptions();
  }

  watchDisabled() {
    this.syncOptions();
  }

  watchDistance() {
    this.syncOptions();
  }

  watchOpen() {
    this.open ? this.show() : this.hide();
  }

  watchSkidding() {
    this.syncOptions();
  }

  render() {
    return html`
      <slot onslotchange=${this.handleSlotChange.bind(this)} />

      ${!this.disabled
        ? html`
            <div ref=${(el: HTMLElement) => (this.positioner = el)} class="tooltip-positioner">
              <div
                ref=${(el: HTMLElement) => (this.tooltip = el)}
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
          `
        : ''}
    `;
  }
}
