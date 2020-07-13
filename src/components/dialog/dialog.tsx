import { Component, Element, Event, EventEmitter, Method, Prop, Watch, h } from '@stencil/core';
import { lockBodyScrolling, unlockBodyScrolling } from '../../utilities/scroll';
import { focusVisible } from '../../utilities/focus-visible';

let id = 0;

/**
 * @since 1.0
 * @status stable
 *
 * @slot - The dialog's content.
 * @slot footer - The dialog's footer, usually one or more buttons representing various options.
 *
 * @part base - The base dialog element.
 * @part overlay - The overlay.
 * @part panel - The dialog panel (where the dialog and its is rendered).
 * @part header - The dialog header.
 * @part title - The dialog title.
 * @part close-button - The close button.
 * @part body - The dialog body.
 * @part footer - The dialog footer.
 *
 */
@Component({
  tag: 'sl-dialog',
  styleUrl: 'dialog.scss',
  shadow: true
})
export class Dialog {
  constructor() {
    this.handleDocumentFocusIn = this.handleDocumentFocusIn.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleOverlayClick = this.handleOverlayClick.bind(this);
  }

  panel: HTMLElement;
  dialog: HTMLElement;
  id = `dialog-${++id}`;

  @Element() host: HTMLSlDialogElement;

  /** Indicates whether or not the dialog is open. You can use this in lieu of the show/hide methods. */
  @Prop({ mutable: true, reflect: true }) open = false;

  /**
   * The dialog's label as displayed in the header. You should always include a relevant label even when using
   * `no-header`, as it is required for proper accessibility.
   */
  @Prop() label = '';

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

  /** Emitted when the overlay is clicked. Calling `event.preventDefault()` will prevent the dialog from closing. */
  @Event() slOverlayDismiss: EventEmitter;

  componentDidLoad() {
    focusVisible.observe(this.dialog);

    // Show on init if open
    if (this.open) {
      this.show();
    }
  }

  componentDidUnload() {
    focusVisible.unobserve(this.dialog);
    unlockBodyScrolling(this.host);
  }

  /** Shows the dialog */
  @Method()
  async show() {
    const slShow = this.slShow.emit();

    if (slShow.defaultPrevented) {
      return false;
    }

    this.dialog.hidden = false;
    this.host.clientWidth; // force a reflow
    this.open = true;

    lockBodyScrolling(this.host);
    document.addEventListener('focusin', this.handleDocumentFocusIn);
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
    document.removeEventListener('focusin', this.handleDocumentFocusIn);
  }

  handleCloseClick() {
    this.hide();
  }

  handleDocumentFocusIn(event: Event) {
    const target = event.target as HTMLElement;

    if (target.closest('sl-dialog') !== this.host) {
      this.panel.focus();
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.hide();
    }
  }

  handleOverlayClick() {
    const slOverlayDismiss = this.slOverlayDismiss.emit();

    if (!slOverlayDismiss.defaultPrevented) {
      this.hide();
    }
  }

  handleTransitionEnd(event: TransitionEvent) {
    const target = event.target as HTMLElement;

    // Ensure we only emit one event when the target element is no longer visible
    if (event.propertyName === 'opacity' && target.classList.contains('dialog__panel')) {
      this.dialog.hidden = !this.open;
      this.open ? this.slAfterShow.emit() : this.slAfterHide.emit();

      if (this.open) {
        this.panel.focus();
      }
    }
  }

  render() {
    return (
      <div
        ref={el => (this.dialog = el)}
        part="base"
        class={{
          dialog: true,
          'dialog--open': this.open
        }}
        onKeyDown={this.handleKeyDown}
        onTransitionEnd={this.handleTransitionEnd}
        hidden
      >
        <div part="overlay" class="dialog__overlay" onClick={this.handleOverlayClick} />

        <div
          ref={el => (this.panel = el)}
          part="panel"
          class="dialog__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden={!this.open}
          aria-label={this.noHeader ? this.label : null}
          aria-labeledby={!this.noHeader ? `${this.id}-title` : null}
          tabIndex={0}
        >
          {!this.noHeader && (
            <header part="header" class="dialog__header">
              <span part="title" class="dialog__title" id={`${this.id}-title`}>
                {/* If there's no label, use an invisible character to prevent the heading from collapsing */}
                {this.label || String.fromCharCode(65279)}
              </span>
              <button part="close-button" class="dialog__close" type="button" onClick={this.handleCloseClick}>
                <sl-icon name="x"></sl-icon>
              </button>
            </header>
          )}

          <div part="body" class="dialog__body">
            <slot />
          </div>

          {!this.noFooter && (
            <footer part="footer" class="dialog__footer">
              <slot name="footer" />
            </footer>
          )}
        </div>
      </div>
    );
  }
}
