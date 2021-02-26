import { classMap, html, Shoemaker } from '@shoelace-style/shoemaker';
import styles from 'sass:./dialog.scss';
import { lockBodyScrolling, unlockBodyScrolling } from '../../internal/scroll';
import { hasSlot } from '../../internal/slot';
import { isPreventScrollSupported } from '../../internal/support';
import Modal from '../../internal/modal';

const hasPreventScroll = isPreventScrollSupported();

let id = 0;

/**
 * @since 2.0
 * @status stable
 *
 * @dependency sl-icon-button
 *
 * @slot - The dialog's content.
 * @slot label - The dialog's label. Alternatively, you can use the label prop.
 * @slot footer - The dialog's footer, usually one or more buttons representing various options.
 *
 * @part base - The component's base wrapper.
 * @part overlay - The overlay.
 * @part panel - The dialog panel (where the dialog and its content is rendered).
 * @part header - The dialog header.
 * @part title - The dialog title.
 * @part close-button - The close button.
 * @part body - The dialog body.
 * @part footer - The dialog footer.
 *
 * @emit sl-show - Emitted when the dialog opens. Calling `event.preventDefault()` will prevent it from being opened.
 * @emit sl-after-show - Emitted after the dialog opens and all transitions are complete.
 * @emit sl-hide - Emitted when the dialog closes. Calling `event.preventDefault()` will prevent it from being closed.
 * @emit sl-after-hide - Emitted after the dialog closes and all transitions are complete.
 * @emit sl-initial-focus - Emitted when the dialog opens and the panel gains focus. Calling `event.preventDefault()`
 *  will prevent focus and allow you to set it on a different element in the dialog, such as an input or button.
 * @emit sl-overlay-dismiss - Emitted when the overlay is clicked. Calling `event.preventDefault()` will prevent the
 *  dialog from closing.
 */
export default class SlDialog extends Shoemaker {
  static tag = 'sl-dialog';
  static props = ['hasFooter', 'isVisible', 'open', 'label', 'noHeader'];
  static reflect = ['open'];
  static styles = styles;

  private componentId = `dialog-${++id}`;
  private dialog: HTMLElement;
  private hasFooter = false;
  private isVisible = false;
  private modal: Modal;
  private panel: HTMLElement;
  private willShow = false;
  private willHide = false;

  /** Indicates whether or not the dialog is open. You can use this in lieu of the show/hide methods. */
  open = false;

  /**
   * The dialog's label as displayed in the header. You should always include a relevant label even when using
   * `no-header`, as it is required for proper accessibility.
   */
  label = '';

  /**
   * Disables the header. This will also remove the default close button, so please ensure you provide an easy,
   * accessible way for users to dismiss the dialog.
   */
  noHeader = false;

  onConnect() {
    this.modal = new Modal(this, {
      onfocusOut: () => this.panel.focus()
    });

    this.handleSlotChange();

    // Show on init if open
    if (this.open) {
      this.show();
    }
  }

  onDisconnect() {
    unlockBodyScrolling(this);
  }

  /** Shows the dialog */
  show() {
    if (this.willShow) {
      return;
    }

    const slShow = this.emit('sl-show');
    if (slShow.defaultPrevented) {
      this.open = false;
      return;
    }

    this.willShow = true;
    this.isVisible = true;
    this.open = true;
    this.modal.activate();

    lockBodyScrolling(this);

    if (this.open) {
      if (hasPreventScroll) {
        // Wait for the next frame before setting initial focus so the dialog is technically visible
        requestAnimationFrame(() => {
          const slInitialFocus = this.emit('sl-initial-focus');
          if (!slInitialFocus.defaultPrevented) {
            this.panel.focus({ preventScroll: true });
          }
        });
      } else {
        // Once Safari supports { preventScroll: true } we can remove this nasty little hack, but until then we need to
        // wait for the transition to complete before setting focus, otherwise the panel may render in a buggy way its
        // out of view initially.
        //
        // Fiddle: https://jsfiddle.net/g6buoafq/1/
        // Safari: https://bugs.webkit.org/show_bug.cgi?id=178583
        //
        this.dialog.addEventListener(
          'transitionend',
          () => {
            const slInitialFocus = this.emit('sl-initial-focus');
            if (!slInitialFocus.defaultPrevented) {
              this.panel.focus();
            }
          },
          { once: true }
        );
      }
    }
  }

  /** Hides the dialog */
  hide() {
    if (this.willHide) {
      return;
    }

    const slHide = this.emit('sl-hide');
    if (slHide.defaultPrevented) {
      this.open = true;
      return;
    }

    this.willHide = true;
    this.open = false;
    this.modal.deactivate();

    unlockBodyScrolling(this);
  }

  handleCloseClick() {
    this.hide();
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.hide();
    }
  }

  handleOverlayClick() {
    const slOverlayDismiss = this.emit('sl-overlay-dismiss');

    if (!slOverlayDismiss.defaultPrevented) {
      this.hide();
    }
  }

  handleSlotChange() {
    this.hasFooter = hasSlot(this, 'footer');
  }

  handleTransitionEnd(event: TransitionEvent) {
    const target = event.target as HTMLElement;

    // Ensure we only emit one event when the target element is no longer visible
    if (event.propertyName === 'opacity' && target.classList.contains('dialog__panel')) {
      this.isVisible = this.open;
      this.willShow = false;
      this.willHide = false;
      this.open ? this.emit('sl-after-show') : this.emit('sl-after-hide');
    }
  }

  watchOpen() {
    this.open ? this.show() : this.hide();
  }

  render() {
    return html`
      <div
        ref=${(el: HTMLElement) => (this.dialog = el)}
        part="base"
        class=${classMap({
          dialog: true,
          'dialog--open': this.open,
          'dialog--visible': this.isVisible,
          'dialog--has-footer': this.hasFooter
        })}
        onkeydown=${this.handleKeyDown.bind(this)}
        ontransitionend=${this.handleTransitionEnd.bind(this)}
      >
        <div part="overlay" class="dialog__overlay" onclick=${this.handleOverlayClick.bind(this)} tabindex="-1" />

        <div
          ref=${(el: HTMLElement) => (this.panel = el)}
          part="panel"
          class="dialog__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open ? 'false' : 'true'}
          aria-label=${this.noHeader ? this.label : null}
          aria-labelledby=${!this.noHeader ? `${this.componentId}-title` : null}
          tabindex="0"
        >
          ${!this.noHeader
            ? html`
                <header part="header" class="dialog__header">
                  <span part="title" class="dialog__title" id=${`${this.componentId}-title`}>
                    <slot name="label"> ${this.label || String.fromCharCode(65279)} </slot>
                  </span>
                  <sl-icon-button
                    exportparts="base:close-button"
                    class="dialog__close"
                    name="x"
                    onclick="${this.handleCloseClick.bind(this)}"
                  />
                </header>
              `
            : ''}

          <div part="body" class="dialog__body">
            <slot />
          </div>

          <footer part="footer" class="dialog__footer">
            <slot name="footer" onslotchange=${this.handleSlotChange.bind(this)} />
          </footer>
        </div>
      </div>
    `;
  }
}
