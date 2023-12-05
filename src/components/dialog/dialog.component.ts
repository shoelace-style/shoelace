import { animateTo, stopAnimations } from '../../internal/animate.js';
import { classMap } from 'lit/directives/class-map.js';
import { getAnimation, setDefaultAnimation } from '../../utilities/animation-registry.js';
import { HasSlotController } from '../../internal/slot.js';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { LocalizeController } from '../../utilities/localize.js';
import { lockBodyScrolling, unlockBodyScrolling } from '../../internal/scroll.js';
import { property, query } from 'lit/decorators.js';
import { waitForEvent } from '../../internal/event.js';
import { watch } from '../../internal/watch.js';
import Modal from '../../internal/modal.js';
import ShoelaceElement from '../../internal/shoelace-element.js';
import SlIconButton from '../icon-button/icon-button.component.js';
import styles from './dialog.styles.js';
import type { CSSResultGroup } from 'lit';

/**
 * @summary Dialogs, also called "modals", appear above the page and require the user's immediate attention.
 * @documentation https://shoelace.style/components/dialog
 * @status stable
 * @since 2.0
 * @pattern stable
 * @figma draft
 *
 * @dependency sl-icon-button
 *
 * @slot - The dialog's main content.
 * @slot label - The dialog's label. Alternatively, you can use the `label` attribute.
 * @slot header-icon - Optional icon to add to the left of the dialog's label (title). A color will be applied to the icon depending on the dialog variant.
 * @slot announcement-intro - Optional intro text to display below the icon when using the variant `announcement`.
 * @slot header-actions - Optional actions to add to the header. Works best with `<sl-icon-button>`.
 * @slot footer - The dialog's footer, usually one or more buttons representing various options.
 * @slot footer-text - Optional text to include below the footer buttons when using the variant `announcement`.
 *
 * @event sl-show - Emitted when the dialog opens.
 * @event sl-after-show - Emitted after the dialog opens and all animations are complete.
 * @event sl-hide - Emitted when the dialog closes.
 * @event sl-after-hide - Emitted after the dialog closes and all animations are complete.
 * @event sl-initial-focus - Emitted when the dialog opens and is ready to receive focus. Calling
 *   `event.preventDefault()` will prevent focusing and allow you to set it on a different element, such as an input.
 * @event {{ source: 'close-button' | 'keyboard' | 'overlay' }} sl-request-close - Emitted when the user attempts to
 *   close the dialog by clicking the close button, clicking the overlay, or pressing escape. Calling
 *   `event.preventDefault()` will keep the dialog open. Avoid using this unless closing the dialog will result in
 *   destructive behavior such as data loss.
 *
 * @csspart base - The component's base wrapper.
 * @csspart overlay - The overlay that covers the screen behind the dialog.
 * @csspart panel - The dialog's panel (where the dialog and its content are rendered).
 * @csspart header - The dialog's header. This element wraps the title and header actions.
 * @csspart header-actions - Optional actions to add to the header. Works best with `<sl-icon-button>`.
 * @csspart title - The dialog's title.
 * @csspart close-button - The close button, an `<sl-icon-button>`.
 * @csspart close-button__base - The close button's exported `base` part.
 * @csspart body - The dialog's body.
 * @csspart footer - The dialog's footer.
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
 *
 * @property modal - Exposes the internal modal utility that controls focus trapping. To temporarily disable focus
 *   trapping and allow third-party modals spawned from an active Shoelace modal, call `modal.activateExternal()` when
 *   the third-party modal opens. Upon closing, call `modal.deactivateExternal()` to restore Shoelace's focus trapping.
 */
export default class SlDialog extends ShoelaceElement {
  static styles: CSSResultGroup = styles;
  static dependencies = {
    'sl-icon-button': SlIconButton
  };

  private readonly hasSlotController = new HasSlotController(this, 'footer');
  private readonly localize = new LocalizeController(this);
  private originalTrigger: HTMLElement | null;
  public modal = new Modal(this);

  @query('.dialog') dialog: HTMLElement;
  @query('.dialog__panel') panel: HTMLElement;
  @query('.dialog__overlay') overlay: HTMLElement;

  /** The dialog's theme variant. */
  @property({ reflect: true }) variant: 'default' | 'warning' | 'announcement' = 'default';

  /** The dialog's size. */
  @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * Indicates whether or not the dialog is open. You can toggle this attribute to show and hide the dialog, or you can
   * use the `show()` and `hide()` methods and this attribute will reflect the dialog's open state.
   */
  @property({ type: Boolean, reflect: true }) open = false;

  /**
   * The dialog's label as displayed in the header. You should always include a relevant label even when using
   * `no-header`, as it is required for proper accessibility. If you need to display HTML, use the `label` slot instead.
   */
  @property({ reflect: true }) label = '';

  /**
   * Indicates whether or not the dialog is open. You can toggle this attribute to show and hide the dialog, or you can
   * use the `show()` and `hide()` methods and this attribute will reflect the dialog's open state.
   */
  @property({ type: Boolean, reflect: true }) icon = false;

  /**
   * Disables the header. This will also remove the default close button, so please ensure you provide an easy,
   * accessible way for users to dismiss the dialog.
   */
  @property({ attribute: 'no-header', type: Boolean, reflect: true }) noHeader = false;

  firstUpdated() {
    this.dialog.hidden = !this.open;

    if (this.open) {
      this.addOpenListeners();
      this.modal.activate();
      lockBodyScrolling(this);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.modal.deactivate();
    unlockBodyScrolling(this);
  }

  private requestClose(source: 'close-button' | 'keyboard' | 'overlay') {
    const slRequestClose = this.emit('sl-request-close', {
      cancelable: true,
      detail: { source }
    });

    if (slRequestClose.defaultPrevented) {
      const animation = getAnimation(this, 'dialog.denyClose', { dir: this.localize.dir() });
      animateTo(this.panel, animation.keyframes, animation.options);
      return;
    }

    this.hide();
  }

  private addOpenListeners() {
    document.addEventListener('keydown', this.handleDocumentKeyDown);
  }

  private removeOpenListeners() {
    document.removeEventListener('keydown', this.handleDocumentKeyDown);
  }

  private handleDocumentKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.modal.isActive() && this.open) {
      event.stopPropagation();
      this.requestClose('keyboard');
    }
  };

  @watch('open', { waitUntilFirstUpdate: true })
  async handleOpenChange() {
    if (this.open) {
      // Show
      this.emit('sl-show');
      this.addOpenListeners();
      this.originalTrigger = document.activeElement as HTMLElement;
      this.modal.activate();

      lockBodyScrolling(this);

      // When the dialog is shown, Safari will attempt to set focus on whatever element has autofocus. This can cause
      // the dialogs's animation to jitter (if it starts offscreen), so we'll temporarily remove the attribute, call
      // `focus({ preventScroll: true })` ourselves, and add the attribute back afterwards.
      //
      // Related: https://github.com/shoelace-style/shoelace/issues/693
      //
      const autoFocusTarget = this.querySelector('[autofocus]');
      if (autoFocusTarget) {
        autoFocusTarget.removeAttribute('autofocus');
      }

      await Promise.all([stopAnimations(this.dialog), stopAnimations(this.overlay)]);
      this.dialog.hidden = false;

      // Set initial focus
      requestAnimationFrame(() => {
        const slInitialFocus = this.emit('sl-initial-focus', { cancelable: true });

        if (!slInitialFocus.defaultPrevented) {
          // Set focus to the autofocus target and restore the attribute
          if (autoFocusTarget) {
            (autoFocusTarget as HTMLInputElement).focus({ preventScroll: true });
          } else {
            this.panel.focus({ preventScroll: true });
          }
        }

        // Restore the autofocus attribute
        if (autoFocusTarget) {
          autoFocusTarget.setAttribute('autofocus', '');
        }
      });

      const panelAnimation = getAnimation(this, 'dialog.show', { dir: this.localize.dir() });
      const overlayAnimation = getAnimation(this, 'dialog.overlay.show', { dir: this.localize.dir() });
      await Promise.all([
        animateTo(this.panel, panelAnimation.keyframes, panelAnimation.options),
        animateTo(this.overlay, overlayAnimation.keyframes, overlayAnimation.options)
      ]);

      this.emit('sl-after-show');
    } else {
      // Hide
      this.emit('sl-hide');
      this.removeOpenListeners();
      this.modal.deactivate();

      await Promise.all([stopAnimations(this.dialog), stopAnimations(this.overlay)]);
      const panelAnimation = getAnimation(this, 'dialog.hide', { dir: this.localize.dir() });
      const overlayAnimation = getAnimation(this, 'dialog.overlay.hide', { dir: this.localize.dir() });

      // Animate the overlay and the panel at the same time. Because animation durations might be different, we need to
      // hide each one individually when the animation finishes, otherwise the first one that finishes will reappear
      // unexpectedly. We'll unhide them after all animations have completed.
      await Promise.all([
        animateTo(this.overlay, overlayAnimation.keyframes, overlayAnimation.options).then(() => {
          this.overlay.hidden = true;
        }),
        animateTo(this.panel, panelAnimation.keyframes, panelAnimation.options).then(() => {
          this.panel.hidden = true;
        })
      ]);

      this.dialog.hidden = true;

      // Now that the dialog is hidden, restore the overlay and panel for next time
      this.overlay.hidden = false;
      this.panel.hidden = false;

      unlockBodyScrolling(this);

      // Restore focus to the original trigger
      const trigger = this.originalTrigger;
      if (typeof trigger?.focus === 'function') {
        setTimeout(() => trigger.focus());
      }

      this.emit('sl-after-hide');
    }
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

  render() {
    return html`
      <div
        part="base"
        class=${classMap({
          dialog: true,
          'dialog--open': this.open,
          'dialog--has-header-icon': this.hasSlotController.test('header-icon'),
          'dialog--has-footer': this.hasSlotController.test('footer'),
          'dialog--default': this.variant === 'default',
          'dialog--warning': this.variant === 'warning',
          'dialog--announcement': this.variant === 'announcement',
          'dialog--small': this.size === 'small',
          'dialog--medium': this.size === 'medium',
          'dialog--large': this.size === 'large'
        })}
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
          tabindex="-1"
        >
          ${!this.noHeader
            ? html`
                <header part="header" class="dialog__header">
                  <h2 part="title" class="dialog__title" id="title">
                    <slot name="header-icon"></slot>
                    <slot name="announcement-intro"></slot>
                    <slot name="label"> ${this.label.length > 0 ? this.label : String.fromCharCode(65279)} </slot>
                  </h2>
                  <div part="header-actions" class="dialog__header-actions">
                    <slot name="header-actions"></slot>
                    <sl-icon-button
                      part="close-button"
                      exportparts="base:close-button__base"
                      class="dialog__close"
                      name="x-lg"
                      label=${this.localize.term('close')}
                      library="system"
                      @click="${() => this.requestClose('close-button')}"
                    ></sl-icon-button>
                  </div>
                </header>
              `
            : ''}
          ${
            '' /* The tabindex="-1" is here because the body is technically scrollable if overflowing. However, if there's no focusable elements inside, you won't actually be able to scroll it via keyboard. */
          }
          <slot part="body" class="dialog__body" tabindex="-1"></slot>

          <footer part="footer" class="dialog__footer">
            <slot name="footer"></slot>
            <slot name="footer-text"></slot>
          </footer>
        </div>
      </div>
    `;
  }
}

setDefaultAnimation('dialog.show', {
  keyframes: [
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1 }
  ],
  options: { duration: 250, easing: 'ease' }
});

setDefaultAnimation('dialog.hide', {
  keyframes: [
    { opacity: 1, scale: 1 },
    { opacity: 0, scale: 0.8 }
  ],
  options: { duration: 250, easing: 'ease' }
});

setDefaultAnimation('dialog.denyClose', {
  keyframes: [{ scale: 1 }, { scale: 1.02 }, { scale: 1 }],
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
