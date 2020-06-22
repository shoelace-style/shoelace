import { Component, Event, EventEmitter, Method, Prop, Watch, h } from '@stencil/core';

let id = 0;

/**
 * @since 1.0.0
 * @status ready
 *
 * @slot summary - The text to show in the details' header. Use the `summary` prop instead for plain-text summaries.
 */

@Component({
  tag: 'sl-details',
  styleUrl: 'details.scss',
  shadow: true
})
export class Details {
  header: HTMLElement;
  id = `details-${++id}`;
  body: HTMLElement;

  constructor() {
    this.handleBodyTransitionEnd = this.handleBodyTransitionEnd.bind(this);
    this.handleSummaryClick = this.handleSummaryClick.bind(this);
    this.handleSummaryKeyDown = this.handleSummaryKeyDown.bind(this);
  }

  /** Indicates whether or not the details is open. You can use this in lieu of the show/hide methods. */
  @Prop({ mutable: true, reflect: true }) open = false;

  /** The plain-text summary to show in the details header. To show an HTML summary, use the `summary` slot. */
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

  componentDidLoad() {
    // Show on init if open
    if (this.open) {
      this.show();
    }
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

    // Ensure we only handle one transition event on the target element
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
        class={{
          details: true,
          'details--open': this.open,
          'details--disabled': this.disabled
        }}
      >
        <div
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
          <div class="details__summary">
            <slot name="summary">{this.summary}</slot>
          </div>

          <span class="details__summary-icon">
            <sl-icon name="chevron-right" />
          </span>
        </div>

        <div ref={el => (this.body = el)} class="details__body" onTransitionEnd={this.handleBodyTransitionEnd}>
          <div id={`${this.id}-content`} class="details__content" role="region" aria-labeledby={`${this.id}-header`}>
            <slot />
          </div>
        </div>
      </div>
    );
  }
}
