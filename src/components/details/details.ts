import { classMap, html, Shoemaker } from '@shoelace-style/shoemaker';
import styles from 'sass:./details.scss';
import { focusVisible } from '../../internal/focus-visible';

let id = 0;

/**
 * @since 2.0
 * @status stable
 *
 * @dependency sl-icon
 *
 * @slot - The details' content.
 * @slot summary - The details' summary. Alternatively, you can use the summary prop.
 *
 * @part base - The component's base wrapper.
 * @part header - The summary header.
 * @part summary - The details summary.
 * @part summary-icon - The expand/collapse summary icon.
 * @part content - The details content.
 *
 * @emit sl-show - Emitted when the details opens. Calling `event.preventDefault()` will prevent it from being opened.
 * @emit after-show - Emitted after the details opens and all transitions are complete.
 * @emit sl-hide - Emitted when the details closes. Calling `event.preventDefault()` will prevent it from being closed.
 * @emit after-hide - Emitted after the details closes and all transitions are complete.
 */
export default class SlDetails extends Shoemaker {
  static tag = 'sl-details';
  static props = ['open', 'summary', 'disabled'];
  static reflect = ['open', 'disabled'];
  static styles = styles;

  private body: HTMLElement;
  private componentId = `details-${++id}`;
  private details: HTMLElement;
  private header: HTMLElement;
  private isVisible = false;

  /** Indicates whether or not the details is open. You can use this in lieu of the show/hide methods. */
  open = false;

  /** The summary to show in the details header. If you need to display HTML, use the `summary` slot instead. */
  summary = '';

  /** Disables the details so it can't be toggled. */
  disabled = false;

  onReady() {
    focusVisible.observe(this.details);

    this.body.hidden = !this.open;

    // Show on init if open
    if (this.open) {
      this.show();
    }
  }

  onDisconnect() {
    focusVisible.unobserve(this.details);
  }

  /** Shows the alert. */
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

    this.body.hidden = false;

    if (this.body.scrollHeight === 0) {
      // When the scroll height can't be measured, use auto. This prevents a borked open state when the details is open
      // intitially, but not immediately visible (i.e. in a tab panel).
      this.body.style.height = 'auto';
      this.body.style.overflow = 'visible';
    } else {
      this.body.style.height = `${this.body.scrollHeight}px`;
      this.body.style.overflow = 'hidden';
    }

    this.isVisible = true;
    this.open = true;
  }

  /** Hides the alert */
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

    // We can't transition out of `height: auto`, so let's set it to the current height first
    this.body.style.height = `${this.body.scrollHeight}px`;
    this.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      this.body.clientWidth; // force a reflow
      this.body.style.height = '0';
    });

    this.isVisible = false;
    this.open = false;
  }

  handleBodyTransitionEnd(event: TransitionEvent) {
    const target = event.target as HTMLElement;

    // Ensure we only emit one event when the target element is no longer visible
    if (event.propertyName === 'height' && target.classList.contains('details__body')) {
      this.body.style.overflow = this.open ? 'visible' : 'hidden';
      this.body.style.height = this.open ? 'auto' : '0';
      this.open ? this.emit('sl-after-show') : this.emit('sl-after-hide');
      this.body.hidden = !this.open;
    }
  }

  handleSummaryClick() {
    if (!this.disabled) {
      this.open ? this.hide() : this.show();
      this.header.focus();
    }
  }

  handleSummaryKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.open ? this.hide() : this.show();
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault();
      this.hide();
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault();
      this.show();
    }
  }

  watchOpen() {
    this.open ? this.show() : this.hide();
  }

  render() {
    return html`
      <div
        ref=${(el: HTMLElement) => (this.details = el)}
        part="base"
        class=${classMap({
          details: true,
          'details--open': this.open,
          'details--disabled': this.disabled
        })}
      >
        <header
          ref=${(el: HTMLElement) => (this.header = el)}
          part="header"
          id=${`${this.componentId}-header`}
          class="details__header"
          role="button"
          aria-expanded=${this.open ? 'true' : 'false'}
          aria-controls=${`${this.componentId}-content`}
          aria-disabled=${this.disabled ? 'true' : 'false'}
          tabindex=${this.disabled ? '-1' : '0'}
          onclick=${this.handleSummaryClick.bind(this)}
          onkeydown=${this.handleSummaryKeyDown.bind(this)}
        >
          <div part="summary" class="details__summary">
            <slot name="summary">${this.summary}</slot>
          </div>

          <span part="summary-icon" class="details__summary-icon">
            <sl-icon name="chevron-right" />
          </span>
        </header>

        <div
          ref=${(el: HTMLElement) => (this.body = el)}
          class="details__body"
          ontransitionend=${this.handleBodyTransitionEnd.bind(this)}
        >
          <div
            part="content"
            id=${`${this.componentId}-content`}
            class="details__content"
            role="region"
            aria-labelledby=${`${this.componentId}-header`}
          >
            <slot />
          </div>
        </div>
      </div>
    `;
  }
}
