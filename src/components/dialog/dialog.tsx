import { Component, Element, Event, EventEmitter, Host, Method, Prop, State, Watch, h } from '@stencil/core';
import { KeyboardDetector } from '../../utilities/keyboard-detector';

let id = 0;

/**
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
  id = `sl-dialog-${++id}`;
  keyboardDetector: KeyboardDetector;

  constructor() {
    this.keepDialogFocused = this.keepDialogFocused.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
    this.handleDocumentKeyDown = this.handleDocumentKeyDown.bind(this);
    this.handleOverlayClick = this.handleOverlayClick.bind(this);
  }

  @Element() host: HTMLSlDialogElement;

  @State() isUsingKeyboard = false;

  /** Indicates whether or not the dialog is open. */
  @Prop({ mutable: true, reflect: true }) open = false;

  /**
   * The dialog's label as displayed in the header. You should always include a relevant label even when using
   * `no-header`, as it is required for proper accessibility.
   */
  @Prop() label = '';

  /** When true, clicking on the overlay will close the dialog. */
  @Prop() closeOnClick = false;

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
    this.keyboardDetector = new KeyboardDetector({
      whenUsing: () => (this.isUsingKeyboard = true),
      whenNotUsing: () => (this.isUsingKeyboard = false)
    });
    this.keyboardDetector.observe(this.dialog);

    // Show the dialog on init
    if (this.open) {
      this.show();
    }
  }

  componentDidUnload() {
    document.body.style.overflow = null;
    this.keyboardDetector.unobserve(this.dialog);
  }

  /** Shows the dialog */
  @Method()
  async show() {
    const slShow = this.slShow.emit();

    if (slShow.defaultPrevented) {
      return false;
    }

    this.host.hidden = false;
    this.open = true;
    this.box.focus();

    document.body.style.overflow = 'hidden';
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

    document.body.style.overflow = null;
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
    if (this.closeOnClick) {
      this.hide();
    }
  }

  handleTransitionEnd(event: TransitionEvent) {
    const target = event.target as HTMLElement;

    this.host.hidden = !this.open;

    // Ensure we only handle one transition event
    if (event.propertyName === 'opacity' && target.classList.contains('sl-dialog__box')) {
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
            'sl-dialog': true,
            'sl-dialog--open': this.open,
            'sl-dialog--using-keyboard': this.isUsingKeyboard
          }}
          onTransitionEnd={this.handleTransitionEnd}
        >
          <div
            ref={el => (this.box = el)}
            class="sl-dialog__box"
            role="dialog"
            aria-modal="true"
            aria-hidden={!this.open}
            aria-label={this.noHeader ? this.label : null}
            aria-labeledby={!this.noHeader ? `${this.id}-title` : null}
            tabIndex={0}
          >
            {!this.noHeader && (
              <div class="sl-dialog__header">
                <span class="sl-dialog__title" id={`${this.id}-title`}>
                  {/* If there's no label, use an invisible character to prevent the heading from collapsing */}
                  {this.label || String.fromCharCode(65279)}
                </span>
                <button class="sl-dialog__close" type="button" onClick={this.handleCloseClick}>
                  <sl-icon name="x"></sl-icon>
                </button>
              </div>
            )}

            <div class="sl-dialog__body">
              <slot />
            </div>

            {!this.noFooter && (
              <div class="sl-dialog__footer">
                <slot name="footer" />
              </div>
            )}
          </div>

          <div ref={el => (this.overlay = el)} class="sl-dialog__overlay" onClick={this.handleOverlayClick} />
        </div>
      </Host>
    );
  }
}
