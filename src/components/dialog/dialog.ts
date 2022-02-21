import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import styles from './dialog.styles';
import '~/components/icon-button/icon-button';
import { animateTo, stopAnimations } from '~/internal/animate';
import { emit, waitForEvent } from '~/internal/event';
import Modal from '~/internal/modal';
import { lockBodyScrolling, unlockBodyScrolling } from '~/internal/scroll';
import { HasSlotController } from '~/internal/slot';
import { isPreventScrollSupported } from '~/internal/support';
import { watch } from '~/internal/watch';
import { setDefaultAnimation, getAnimation } from '~/utilities/animation-registry';
import { LocalizeController } from '~/utilities/localize';

const hasPreventScroll = isPreventScrollSupported();

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
 * @event sl-show - Emitted when the dialog opens.
 * @event sl-after-show - Emitted after the dialog opens and all animations are complete.
 * @event sl-hide - Emitted when the dialog closes.
 * @event sl-after-hide - Emitted after the dialog closes and all animations are complete.
 * @event sl-initial-focus - Emitted when the dialog opens and the panel gains focus. Calling `event.preventDefault()`
 *   will prevent focus and allow you to set it on a different element in the dialog, such as an input or button.
 * @event {{ source: 'close-button' | 'keyboard' | 'overlay' }} sl-request-close - Emitted when the user attempts to
 *   close the dialog by clicking the close button, clicking the overlay, or pressing escape. Calling
 *   `event.preventDefault()` will keep the dialog open. Avoid using this unless closing the dialog will result in
 *   destructive behavior such as data loss.
 *
 * @csspart base - The component's base wrapper.
 * @csspart overlay - The overlay.
 * @csspart panel - The dialog panel (where the dialog and its content is rendered).
 * @csspart header - The dialog header.
 * @csspart title - The dialog title.
 * @csspart close-button - The close button.
 * @csspart body - The dialog body.
 * @csspart footer - The dialog footer.
 *
 * @cssproperty --width - The preferred width of the dialog. Note that the dialog will shrink to accommodate smaller screens.
 * @cssproperty --header-spacing - The amount of padding to use for the header.
 * @cssproperty --body-spacing - The amount of padding to use for the body.
 * @cssproperty --footer-spacing - The amount of padding to use for the footer.
 *
 * @animation dialog.show - The animation to use when showing the dialog.
 * @animation dialog.hide - The animation to use when hiding the dialog.
 * @animation dialog.denyClose - The animation to use when a request to close the dialog is denied.
 * @animation dialog.overlay.show - The animation to use when showing the dialog's overlay.
 * @animation dialog.overlay.hide - The animation to use when hiding the dialog's overlay.
 */
@customElement('sl-dialog')
export default class SlDialog extends LitElement {
  static styles = styles;

  @query('.dialog') dialog: HTMLElement;
  @query('.dialog__panel') panel: HTMLElement;
  @query('.dialog__overlay') overlay: HTMLElement;

  private readonly hasSlotController = new HasSlotController(this, 'footer');
  private readonly localize = new LocalizeController(this);
  private modal: Modal;
  private originalTrigger: HTMLElement | null;

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

  connectedCallback() {
    super.connectedCallback();
    this.modal = new Modal(this);
  }

  firstUpdated() {
    this.dialog.hidden = !this.open;

    if (this.open) {
      this.modal.activate();
      lockBodyScrolling(this);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    unlockBodyScrolling(this);
  }

  /** Shows the dialog. */
  async show() {
    if (this.open) {
      return undefined;
    }

    this.open = true;
    return waitForEvent(this, 'sl-after-show');
  }

  /** Hides the dialog */
  async hide() {
    if (!this.open) {
      return undefined;
    }

    this.open = false;
    return waitForEvent(this, 'sl-after-hide');
  }

  private requestClose(source: 'close-button' | 'keyboard' | 'overlay') {
    const slRequestClose = emit(this, 'sl-request-close', {
      cancelable: true,
      detail: { source }
    });

    if (slRequestClose.defaultPrevented) {
      const animation = getAnimation(this, 'dialog.denyClose');
      animateTo(this.panel, animation.keyframes, animation.options);
      return;
    }

    this.hide();
  }

  // Sets focus on the first child element with autofocus, falling back to the panel if one isn't found
  private setInitialFocus() {
    const target = this.querySelector('[autofocus]');

    if (target) {
      (target as HTMLElement).focus({ preventScroll: true });
    } else {
      this.panel.focus({ preventScroll: true });
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.stopPropagation();
      this.requestClose('keyboard');
    }
  }

  @watch('open', { waitUntilFirstUpdate: true })
  async handleOpenChange() {
    if (this.open) {
      // Show
      emit(this, 'sl-show');
      this.originalTrigger = document.activeElement as HTMLElement;
      this.modal.activate();

      lockBodyScrolling(this);

      await Promise.all([stopAnimations(this.dialog), stopAnimations(this.overlay)]);
      this.dialog.hidden = false;

      // Browsers that support el.focus({ preventScroll }) can set initial focus immediately
      if (hasPreventScroll) {
        requestAnimationFrame(() => {
          const slInitialFocus = emit(this, 'sl-initial-focus', { cancelable: true });
          if (!slInitialFocus.defaultPrevented) {
            this.setInitialFocus();
          }
        });
      }

      const panelAnimation = getAnimation(this, 'dialog.show');
      const overlayAnimation = getAnimation(this, 'dialog.overlay.show');
      await Promise.all([
        animateTo(this.panel, panelAnimation.keyframes, panelAnimation.options),
        animateTo(this.overlay, overlayAnimation.keyframes, overlayAnimation.options)
      ]);

      // Browsers that don't support el.focus({ preventScroll }) have to wait for the animation to finish before initial
      // focus to prevent scrolling issues. See: https://caniuse.com/mdn-api_htmlelement_focus_preventscroll_option
      if (!hasPreventScroll) {
        requestAnimationFrame(() => {
          const slInitialFocus = emit(this, 'sl-initial-focus', { cancelable: true });
          if (!slInitialFocus.defaultPrevented) {
            this.setInitialFocus();
          }
        });
      }

      emit(this, 'sl-after-show');
    } else {
      // Hide
      emit(this, 'sl-hide');
      this.modal.deactivate();

      await Promise.all([stopAnimations(this.dialog), stopAnimations(this.overlay)]);
      const panelAnimation = getAnimation(this, 'dialog.hide');
      const overlayAnimation = getAnimation(this, 'dialog.overlay.hide');
      await Promise.all([
        animateTo(this.panel, panelAnimation.keyframes, panelAnimation.options),
        animateTo(this.overlay, overlayAnimation.keyframes, overlayAnimation.options)
      ]);
      this.dialog.hidden = true;

      unlockBodyScrolling(this);

      // Restore focus to the original trigger
      const trigger = this.originalTrigger;
      if (typeof trigger?.focus === 'function') {
        setTimeout(() => trigger.focus());
      }

      emit(this, 'sl-after-hide');
    }
  }

  render() {
    /* eslint-disable lit-a11y/click-events-have-key-events */
    return html`
      <div
        part="base"
        class=${classMap({
          dialog: true,
          'dialog--open': this.open,
          'dialog--has-footer': this.hasSlotController.test('footer')
        })}
        @keydown=${this.handleKeyDown}
      >
        <div part="overlay" class="dialog__overlay" @click=${() => this.requestClose('overlay')} tabindex="-1"></div>

        <div
          part="panel"
          class="dialog__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open ? 'false' : 'true'}
          aria-label=${ifDefined(this.noHeader ? this.label : undefined)}
          aria-labelledby=${ifDefined(!this.noHeader ? 'title' : undefined)}
          tabindex="0"
        >
          ${!this.noHeader
            ? html`
                <header part="header" class="dialog__header">
                  <h2 part="title" class="dialog__title" id="title">
                    <slot name="label"> ${this.label.length > 0 ? this.label : String.fromCharCode(65279)} </slot>
                  </h2>
                  <sl-icon-button
                    exportparts="base:close-button"
                    class="dialog__close"
                    name="x"
                    label=${this.localize.term('close')}
                    library="system"
                    @click="${() => this.requestClose('close-button')}"
                  ></sl-icon-button>
                </header>
              `
            : ''}

          <div part="body" class="dialog__body">
            <slot></slot>
          </div>

          <footer part="footer" class="dialog__footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    `;
    /* eslint-enable lit-a11y/click-events-have-key-events */
  }
}

setDefaultAnimation('dialog.show', {
  keyframes: [
    { opacity: 0, transform: 'scale(0.8)' },
    { opacity: 1, transform: 'scale(1)' }
  ],
  options: { duration: 250, easing: 'ease' }
});

setDefaultAnimation('dialog.hide', {
  keyframes: [
    { opacity: 1, transform: 'scale(1)' },
    { opacity: 0, transform: 'scale(0.8)' }
  ],
  options: { duration: 250, easing: 'ease' }
});

setDefaultAnimation('dialog.denyClose', {
  keyframes: [{ transform: 'scale(1)' }, { transform: 'scale(1.02)' }, { transform: 'scale(1)' }],
  options: { duration: 250 }
});

setDefaultAnimation('dialog.overlay.show', {
  keyframes: [{ opacity: 0 }, { opacity: 1 }],
  options: { duration: 250 }
});

setDefaultAnimation('dialog.overlay.hide', {
  keyframes: [{ opacity: 1 }, { opacity: 0 }],
  options: { duration: 250 }
});

declare global {
  interface HTMLElementTagNameMap {
    'sl-dialog': SlDialog;
  }
}
