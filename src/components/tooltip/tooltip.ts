import { LitElement, customElement, html, property, query, unsafeCSS } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { event, EventEmitter } from '../../internal/event';
import { watch } from '../../internal/watch';
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
 */
@customElement('sl-tooltip')
export class SlTooltip extends LitElement {
  static styles = unsafeCSS(styles);

  @query('.tooltip-positioner') positioner: HTMLElement;
  @query('.tooltip') tooltip: HTMLElement;

  private componentId = `tooltip-${++id}`;
  private target: HTMLElement;
  private popover: Popover;

  private isVisible = false;

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
  @property({ type: Boolean }) disabled = false;

  /** The distance in pixels from which to offset the tooltip away from its target. */
  @property({ type: Number }) distance = 10;

  /** Indicates whether or not the tooltip is open. You can use this in lieu of the show/hide methods. */
  @property({ type: Boolean }) open = false;

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

  firstUpdated() {
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

  disconnectedCallback() {
    super.disconnectedCallback();
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

    const slShow = this.slShow.emit();
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

    const slHide = this.slHide.emit();
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

  @watch('open')
  handleOpenChange() {
    this.open ? this.show() : this.hide();
  }

  @watch('placement')
  @watch('disabled')
  @watch('distance')
  @watch('skidding')
  handleOptionsChange() {
    this.syncOptions();
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
        distance: this.distance,
        skidding: this.skidding,
        transitionElement: this.tooltip,
        onAfterHide: () => this.slAfterHide.emit(),
        onAfterShow: () => this.slAfterShow.emit()
      });
    }
  }

  render() {
    return html`
      <slot @slotchange=${this.handleSlotChange.bind(this)}></slot>

      ${!this.disabled
        ? html`
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
          `
        : ''}
    `;
  }
}
