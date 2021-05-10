import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators';
import { classMap } from 'lit-html/directives/class-map';
import { ifDefined } from 'lit-html/directives/if-defined';
import { event, EventEmitter, watch } from '../../internal/decorators';
import { lockBodyScrolling, unlockBodyScrolling } from '../../internal/scroll';
import { hasSlot } from '../../internal/slot';
import { isPreventScrollSupported } from '../../internal/support';
import Modal from '../../internal/modal';
import styles from 'sass:./dialog.scss';

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
 */
@customElement('sl-dialog')
export default class SlDialog extends LitElement {
  static styles = unsafeCSS(styles);

  @query('.dialog') dialog: HTMLElement;
  @query('.dialog__panel') panel: HTMLElement;

  private componentId = `dialog-${++id}`;
  private modal: Modal;
  private originalTrigger: HTMLElement | null;
  private willShow = false;
  private willHide = false;

  @state() private hasFooter = false;
  @state() private isVisible = false;

  /** Indicates whether or not the dialog is open. You can use this in lieu of the show/hide methods. */
  @property({ type: Boolean, reflect: true }) open = false;

  /**
   * The dialog's label as displayed in the header. You should always include a relevant label even when using
   * `no-header`, as it is required for proper accessibility.
   */
  @property({ reflect: true }) label = '';

  /**
   * Disables the header. This will also remove the default close button, so please ensure you provide an easy,
   * accessible way for users to dismiss the dialog.
   */
  @property({ attribute: 'no-header', type: Boolean, reflect: true }) noHeader = false;

  /** Emitted when the dialog opens. Calling `event.preventDefault()` will prevent it from being opened. */
  @event('sl-show') slShow: EventEmitter<void>;

  /** Emitted after the dialog opens and all transitions are complete. */
  @event('sl-after-show') slAfterShow: EventEmitter<void>;

  /** Emitted when the dialog closes. Calling `event.preventDefault()` will prevent it from being closed. */
  @event('sl-hide') slHide: EventEmitter<void>;

  /** Emitted after the dialog closes and all transitions are complete. */
  @event('sl-after-hide') slAfterHide: EventEmitter<void>;

  /**
   * Emitted when the dialog opens and the panel gains focus. Calling `event.preventDefault()` will prevent focus and
   * allow you to set it on a different element in the dialog, such as an input or button.
   */
  @event('sl-initial-focus') slInitialFocus: EventEmitter<void>;

  /** Emitted when the overlay is clicked. Calling `event.preventDefault()` will prevent the dialog from closing. */
  @event('sl-overlay-dismiss') slOverlayDismiss: EventEmitter<void>;

  connectedCallback() {
    super.connectedCallback();

    this.modal = new Modal(this);
    this.handleSlotChange();

    // Show on init if open
    if (this.open) {
      this.show();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    unlockBodyScrolling(this);
  }

  /** Shows the dialog */
  show() {
    if (this.willShow) {
      return;
    }

    const slShow = this.slShow.emit();
    if (slShow.defaultPrevented) {
      this.open = false;
      return;
    }

    this.originalTrigger = document.activeElement as HTMLElement;
    this.willShow = true;
    this.isVisible = true;
    this.open = true;
    this.modal.activate();

    lockBodyScrolling(this);

    if (this.open) {
      if (hasPreventScroll) {
        // Wait for the next frame before setting initial focus so the dialog is technically visible
        requestAnimationFrame(() => {
          const slInitialFocus = this.slInitialFocus.emit();
          if (!slInitialFocus.defaultPrevented) {
            this.panel.focus({ preventScroll: true });
          }
        });
      } else {
        // Once Safari supports { preventScroll: true } we can remove this nasty little hack, but until then we need to
        // wait for the transition to complete before setting focus, otherwise the panel may render in a buggy way
        // that's out of view initially.
        //
        // Fiddle: https://jsfiddle.net/g6buoafq/1/
        // Safari: https://bugs.webkit.org/show_bug.cgi?id=178583
        //
        this.dialog.addEventListener(
          'transitionend',
          () => {
            const slInitialFocus = this.slInitialFocus.emit();
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

    const slHide = this.slHide.emit();
    if (slHide.defaultPrevented) {
      this.open = true;
      return;
    }

    this.willHide = true;
    this.open = false;
    this.modal.deactivate();

    // Restore focus to the original trigger
    const trigger = this.originalTrigger;
    if (trigger && typeof trigger.focus === 'function') {
      setTimeout(() => trigger.focus());
    }
  }

  handleCloseClick() {
    this.hide();
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.stopPropagation();
      this.hide();
    }
  }

  @watch('open')
  handleOpenChange() {
    this.open ? this.show() : this.hide();
  }

  handleOverlayClick() {
    const slOverlayDismiss = this.slOverlayDismiss.emit();
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
      this.open ? this.slAfterShow.emit() : this.slAfterHide.emit();

      if (!this.open) {
        unlockBodyScrolling(this);
      }
    }
  }

  render() {
    return html`
      <div
        part="base"
        class=${classMap({
          dialog: true,
          'dialog--open': this.open,
          'dialog--visible': this.isVisible,
          'dialog--has-footer': this.hasFooter
        })}
        @keydown=${this.handleKeyDown}
        @transitionend=${this.handleTransitionEnd}
      >
        <div part="overlay" class="dialog__overlay" @click=${this.handleOverlayClick} tabindex="-1"></div>

        <div
          part="panel"
          class="dialog__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open ? 'false' : 'true'}
          aria-label=${ifDefined(this.noHeader ? this.label : undefined)}
          aria-labelledby=${ifDefined(!this.noHeader ? `${this.componentId}-title` : undefined)}
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
                    library="system"
                    @click="${this.handleCloseClick}"
                  ></sl-icon-button>
                </header>
              `
            : ''}

          <div part="body" class="dialog__body">
            <slot></slot>
          </div>

          <footer part="footer" class="dialog__footer">
            <slot name="footer" @slotchange=${this.handleSlotChange}></slot>
          </footer>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-dialog': SlDialog;
  }
}
