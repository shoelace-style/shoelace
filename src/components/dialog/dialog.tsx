import { Component, Element, Event, EventEmitter, Host, Method, Prop, Watch, h } from '@stencil/core';
import { lockBodyScrolling, unlockBodyScrolling } from '../../utilities/scroll';

let id = 0;

/**
 * @since 1.0.0
 * @status ready
 *
 * @slot - The dialog's content.
 * @slot footer - The dialog's footer, usually one or more buttons representing various options.
 */
@Component({
  tag: 'sl-dialog',
  styleUrl: 'dialog.scss',
  shadow: true
})
export class Dialog {
  box: HTMLElement;
  overlay: HTMLElement;
  dialog: HTMLElement;
  id = `dialog-${++id}`;

  constructor() {
    this.keepDialogFocused = this.keepDialogFocused.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
    this.handleDocumentKeyDown = this.handleDocumentKeyDown.bind(this);
    this.handleOverlayClick = this.handleOverlayClick.bind(this);
  }

  @Element() host: HTMLSlDialogElement;

  /** Indicates whether or not the dialog is open. You can use this in lieu of the show/hide methods. */
  @Prop({ mutable: true, reflect: true }) open = false;

  /**
   * The dialog's label as displayed in the header. You should always include a relevant label even when using
   * `no-header`, as it is required for proper accessibility.
   */
  @Prop() label = '';

  /** When true, the dialog will not be dismissed when the user clicks on the overlay. */
  @Prop() ignoreOverlayClicks = false;

  /**
   * Set to true to disable the header. This will also remove the default close button, so please ensure you provide an
   * easy, accessible way for users to dismiss the dialog.
   */
  @Prop() noHeader = false;

  /** Set to true to disable the footer. */
  @Prop() noFooter = false;

  @Watch('open')
  handleOpenChange() {
    this.open ? this.show() : this.hide();
  }

  /** Emitted when the dialog opens. Calling `event.preventDefault()` will prevent it from being opened. */
  @Event() slShow: EventEmitter;

  /** Emitted after the dialog opens and all transitions are complete. */
  @Event() slAfterShow: EventEmitter;

  /** Emitted when the dialog closes. Calling `event.preventDefault()` will prevent it from being closed. */
  @Event() slHide: EventEmitter;

  /** Emitted after the dialog closes and all transitions are complete. */
  @Event() slAfterHide: EventEmitter;

  componentDidLoad() {
    // Show on init if open
    if (this.open) {
      this.show();
    }
  }

  componentDidUnload() {
    unlockBodyScrolling(this.host);
  }

  /** Shows the dialog */
  @Method()
  async show() {
    const slShow = this.slShow.emit();

    if (slShow.defaultPrevented) {
      return false;
    }

    this.host.hidden = false;
    this.host.clientWidth; // force a reflow
    this.open = true;
    this.box.focus();

    lockBodyScrolling(this.host);
    document.addEventListener('keydown', this.handleDocumentKeyDown);
    document.addEventListener('focusin', this.keepDialogFocused);
  }

  /** Hides the dialog */
  @Method()
  async hide() {
    const slHide = this.slHide.emit();

    if (slHide.defaultPrevented) {
      return false;
    }

    this.open = false;

    unlockBodyScrolling(this.host);
    document.removeEventListener('keydown', this.handleDocumentKeyDown);
    document.removeEventListener('focusin', this.keepDialogFocused);
  }

  handleCloseClick() {
    this.hide();
  }

  handleDocumentKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.hide();
    }
  }

  handleOverlayClick() {
    if (!this.ignoreOverlayClicks) {
      this.hide();
    }
  }

  handleTransitionEnd(event: TransitionEvent) {
    const target = event.target as HTMLElement;

    // Ensure we only handle one transition event on the target element
    if (event.propertyName === 'opacity' && target.classList.contains('sl-dialog__box')) {
      this.host.hidden = !this.open;
      this.open ? this.slAfterShow.emit() : this.slAfterHide.emit();
    }
  }

  keepDialogFocused(event: Event) {
    const target = event.target as HTMLElement;

    if (!target.closest('sl-dialog')) {
      this.box.focus();
    }
  }

  render() {
    return (
      <Host hidden>
        <div
          ref={el => (this.dialog = el)}
          class={{
            dialog: true,
            'dialog--open': this.open
          }}
          onTransitionEnd={this.handleTransitionEnd}
        >
          <div
            ref={el => (this.box = el)}
            class="dialog__box"
            role="dialog"
            aria-modal="true"
            aria-hidden={!this.open}
            aria-label={this.noHeader ? this.label : null}
            aria-labeledby={!this.noHeader ? `${this.id}-title` : null}
            tabIndex={0}
          >
            {!this.noHeader && (
              <div class="dialog__header">
                <span class="dialog__title" id={`${this.id}-title`}>
                  {/* If there's no label, use an invisible character to prevent the heading from collapsing */}
                  {this.label || String.fromCharCode(65279)}
                </span>
                <button class="dialog__close" type="button" onClick={this.handleCloseClick}>
                  <sl-icon name="x"></sl-icon>
                </button>
              </div>
            )}

            <div class="dialog__body">
              <slot />
            </div>

            {!this.noFooter && (
              <div class="dialog__footer">
                <slot name="footer" />
              </div>
            )}
          </div>

          <div ref={el => (this.overlay = el)} class="dialog__overlay" onClick={this.handleOverlayClick} />
        </div>
      </Host>
    );
  }
}
