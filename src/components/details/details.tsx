import { Component, Event, EventEmitter, Method, Prop, Watch, h } from '@stencil/core';
import { focusVisible } from '../../utilities/focus-visible';

let id = 0;

/**
 * @since 2.0
 * @status stable
 *
 * @slot - The details' content.
 * @slot summary - The details' summary. Alternatively, you can use the summary prop.
 *
 * @part base - The component's base wrapper.
 * @part summary - The details summary.
 * @part summary-icon - The expand/collapse summary icon.
 * @part content - The details content.
 */

@Component({
  tag: 'sl-details',
  styleUrl: 'details.scss',
  shadow: true
})
export class Details {
  details: HTMLElement;
  header: HTMLElement;
  id = `details-${++id}`;
  body: HTMLElement;

  /** Indicates whether or not the details is open. You can use this in lieu of the show/hide methods. */
  @Prop({ mutable: true, reflect: true }) open = false;

  /** The summary to show in the details header. */
  @Prop() summary = '';

  /** Set to true to prevent the user from toggling the details. */
  @Prop() disabled = false;

  @Watch('open')
  handleOpenChange() {
    this.open ? this.show() : this.hide();
  }

  /** Emitted when the details opens. Calling `event.preventDefault()` will prevent it from being opened. */
  @Event() slShow: EventEmitter;

  /** Emitted after the details opens and all transitions are complete. */
  @Event() slAfterShow: EventEmitter;

  /** Emitted when the details closes. Calling `event.preventDefault()` will prevent it from being closed. */
  @Event() slHide: EventEmitter;

  /** Emitted after the details closes and all transitions are complete. */
  @Event() slAfterHide: EventEmitter;

  connectedCallback() {
    this.handleBodyTransitionEnd = this.handleBodyTransitionEnd.bind(this);
    this.handleSummaryClick = this.handleSummaryClick.bind(this);
    this.handleSummaryKeyDown = this.handleSummaryKeyDown.bind(this);
  }

  componentDidLoad() {
    focusVisible.observe(this.details);

    // Show on init if open
    if (this.open) {
      this.show();
    }
  }

  componentDidUnload() {
    focusVisible.observe(this.details);
  }

  /** Shows the alert. */
  @Method()
  async show() {
    const slShow = this.slShow.emit();

    if (slShow.defaultPrevented) {
      return false;
    }

    this.body.style.height = `${this.body.scrollHeight}px`;
    this.body.style.overflow = 'hidden';

    this.open = true;
  }

  /** Hides the alert */
  @Method()
  async hide() {
    const slHide = this.slHide.emit();

    if (slHide.defaultPrevented) {
      return false;
    }

    // We can't transition out of `height: auto`, so let's set it to the current height first
    this.body.style.height = `${this.body.scrollHeight}px`;
    this.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      this.body.clientWidth; // force a reflow
      this.body.style.height = '0';
    });

    this.open = false;
  }

  handleBodyTransitionEnd(event: TransitionEvent) {
    const target = event.target as HTMLElement;

    // Ensure we only emit one event when the target element is no longer visible
    if (event.propertyName === 'height' && target.classList.contains('details__body')) {
      this.body.style.overflow = this.open ? 'visible' : 'hidden';
      this.body.style.height = this.open ? 'auto' : '0';
      this.open ? this.slAfterShow.emit() : this.slAfterHide.emit();
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

  render() {
    return (
      <div
        ref={el => (this.details = el)}
        part="base"
        class={{
          details: true,
          'details--open': this.open,
          'details--disabled': this.disabled
        }}
      >
        <header
          ref={el => (this.header = el)}
          id={`${this.id}-header`}
          class="details__header"
          role="button"
          aria-expanded={this.open}
          aria-controls={`${this.id}-content`}
          aria-disabled={this.disabled}
          tabIndex={this.disabled ? -1 : 0}
          onClick={this.handleSummaryClick}
          onKeyDown={this.handleSummaryKeyDown}
        >
          <div part="summary" class="details__summary">
            <slot name="summary">{this.summary}</slot>
          </div>

          <span part="summary-icon" class="details__summary-icon">
            <sl-icon name="chevron-right" />
          </span>
        </header>

        <div ref={el => (this.body = el)} class="details__body" onTransitionEnd={this.handleBodyTransitionEnd}>
          <div
            part="content"
            id={`${this.id}-content`}
            class="details__content"
            role="region"
            aria-labeledby={`${this.id}-header`}
          >
            <slot />
          </div>
        </div>
      </div>
    );
  }
}
