import { Component, Event, EventEmitter, Prop, Watch, h } from '@stencil/core';

/**
 * @slot - The alert's content.
 * @slot icon - An icon to show in the alert.
 */

@Component({
  tag: 'sh-alert',
  styleUrl: 'alert.scss',
  shadow: true
})
export class Tab {
  alert: HTMLElement;

  constructor() {
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
  }

  /** The type of alert to draw. */
  @Prop() type = 'primary';

  /** Set to true to make the alert closable. */
  @Prop() closable = false;

  /** Set to true to close the alert. */
  @Prop({ mutable: true }) closed = false;

  /** Emitted when the alert is closed. */
  @Event() shClose: EventEmitter;

  @Watch('closed')
  handleClosedChange() {
    // Remove the hidden attribute so the transition can run
    this.alert.removeAttribute('hidden');

    if (this.closed) {
      this.shClose.emit();
    }
  }

  handleTransitionEnd() {
    // Hide the alert when the transition ends
    if (this.closed) {
      this.alert.setAttribute('hidden', 'true');
    }
  }

  render() {
    return (
      <div
        ref={el => (this.alert = el)}
        class={{
          'sh-alert': true,
          'sh-alert--closable': this.closable,
          'sh-alert--closed': this.closed,

          // States
          'sh-alert--primary': this.type === 'primary',
          'sh-alert--success': this.type === 'success',
          'sh-alert--info': this.type === 'info',
          'sh-alert--warning': this.type === 'warning',
          'sh-alert--danger': this.type === 'danger'
        }}
        role="alert"
        aria-hidden={this.closed}
        onTransitionEnd={this.handleTransitionEnd}
      >
        <span class="sh-alert__icon">
          <slot name="icon" />
        </span>

        <span class="sh-alert__body">
          <slot />
        </span>

        {this.closable && (
          <button type="button" class="sh-alert__close" onClick={() => (this.closed = true)}>
            <svg
              viewBox="0 0 16 16"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
                <g stroke="currentColor" stroke-width="2">
                  <path d="M3.5,12.5 L12.3466797,3.65332031"></path>
                  <path
                    d="M3.5,12.5 L12.3466797,3.65332031"
                    transform="translate(8.000000, 8.000000) scale(-1, 1) translate(-8.000000, -8.000000) "
                  ></path>
                </g>
              </g>
            </svg>
          </button>
        )}
      </div>
    );
  }
}
