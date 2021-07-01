import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit-html/directives/class-map';
import { ifDefined } from 'lit-html/directives/if-defined';
import { animateTo, stopAnimations } from '../../internal/animate';
import { emit } from '../../internal/event';
import { watch } from '../../internal/watch';
import { waitForEvent } from '../../internal/event';
import { lockBodyScrolling, unlockBodyScrolling } from '../../internal/scroll';
import { hasSlot } from '../../internal/slot';
import { uppercaseFirstLetter } from '../../internal/string';
import { isPreventScrollSupported } from '../../internal/support';
import Modal from '../../internal/modal';
import { setDefaultAnimation, getAnimation } from '../../utilities/animation-registry';
import styles from 'sass:./drawer.scss';

const hasPreventScroll = isPreventScrollSupported();

let id = 0;

/**
 * @since 2.0
 * @status stable
 *
 * @dependency sl-icon-button
 *
 * @slot - The drawer's content.
 * @slot label - The drawer's label. Alternatively, you can use the label prop.
 * @slot footer - The drawer's footer, usually one or more buttons representing various options.
 *
 * @event sl-show - Emitted when the drawer opens.
 * @event sl-after-show - Emitted after the drawer opens and all transitions are complete.
 * @event sl-hide - Emitted when the drawer closes.
 * @event sl-after-hide - Emitted after the drawer closes and all transitions are complete.
 * @event sl-initial-focus - Emitted when the drawer opens and the panel gains focus. Calling `event.preventDefault()` will
 *   prevent focus and allow you to set it on a different element in the drawer, such as an input or button.
 * @event sl-request-close - Emitted when the user attempts to close the drawer by clicking the close button, clicking the
 *   overlay, or pressing the escape key. Calling `event.preventDefault()` will prevent the drawer from closing. Avoid
 *   using this unless closing the drawer will result in destructive behavior such as data loss.
 *
 * @csspart base - The component's base wrapper.
 * @csspart overlay - The overlay.
 * @csspart panel - The drawer panel (where the drawer and its content is rendered).
 * @csspart header - The drawer header.
 * @csspart title - The drawer title.
 * @csspart close-button - The close button.
 * @csspart body - The drawer body.
 * @csspart footer - The drawer footer.
 *
 * @cssproperty --size - The preferred size of the drawer. This will be applied to the drawer's width or height
 *   depending on its `placement`. Note that the drawer will shrink to accommodate smaller screens.
 * @cssproperty --header-spacing - The amount of padding to use for the header.
 * @cssproperty --body-spacing - The amount of padding to use for the body.
 * @cssproperty --footer-spacing - The amount of padding to use for the footer.
 *
 * @animation drawer.showTop - The animation to use when showing a drawer with `top` placement.
 * @animation drawer.showEnd - The animation to use when showing a drawer with `end` placement.
 * @animation drawer.showBottom - The animation to use when showing a drawer with `bottom` placement.
 * @animation drawer.showStart - The animation to use when showing a drawer with `start` placement.
 * @animation drawer.hideTop - The animation to use when hiding a drawer with `top` placement.
 * @animation drawer.hideEnd - The animation to use when hiding a drawer with `end` placement.
 * @animation drawer.hideBottom - The animation to use when hiding a drawer with `bottom` placement.
 * @animation drawer.hideStart - The animation to use when hiding a drawer with `start` placement.
 * @animation drawer.denyClose - The animation to use when a request to close the drawer is denied.
 * @animation drawer.overlay.show - The animation to use when showing the drawer's overlay.
 * @animation drawer.overlay.hide - The animation to use when hiding the drawer's overlay.
 */
@customElement('sl-drawer')
export default class SlDrawer extends LitElement {
  static styles = unsafeCSS(styles);

  @query('.drawer') drawer: HTMLElement;
  @query('.drawer__panel') panel: HTMLElement;
  @query('.drawer__overlay') overlay: HTMLElement;

  private componentId = `drawer-${++id}`;
  private modal: Modal;
  private originalTrigger: HTMLElement | null;

  @state() private hasFooter = false;

  /** Indicates whether or not the drawer is open. You can use this in lieu of the show/hide methods. */
  @property({ type: Boolean, reflect: true }) open = false;

  /**
   * The drawer's label as displayed in the header. You should always include a relevant label even when using
   * `no-header`, as it is required for proper accessibility.
   */
  @property({ reflect: true }) label = '';

  /** The direction from which the drawer will open. */
  @property({ reflect: true }) placement: 'top' | 'end' | 'bottom' | 'start' = 'end';

  /**
   * By default, the drawer slides out of its containing block (usually the viewport). To make the drawer slide out of
   * its parent element, set this prop and add `position: relative` to the parent.
   */
  @property({ type: Boolean, reflect: true }) contained = false;

  /**
   * Removes the header. This will also remove the default close button, so please ensure you provide an easy,
   * accessible way for users to dismiss the drawer.
   */
  @property({ attribute: 'no-header', type: Boolean, reflect: true }) noHeader = false;

  connectedCallback() {
    super.connectedCallback();

    this.modal = new Modal(this);
    this.handleSlotChange();
  }

  firstUpdated() {
    this.drawer.hidden = !this.open;

    if (this.open && !this.contained) {
      this.modal.activate();
      lockBodyScrolling(this);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    unlockBodyScrolling(this);
  }

  /** Shows the drawer. */
  async show() {
    if (this.open) {
      return;
    }

    this.open = true;
    return waitForEvent(this, 'sl-after-show');
  }

  /** Hides the drawer */
  async hide() {
    if (!this.open) {
      return;
    }

    this.open = false;
    return waitForEvent(this, 'sl-after-hide');
  }

  private requestClose() {
    const slRequestClose = emit(this, 'sl-request-close', { cancelable: true });
    if (slRequestClose.defaultPrevented) {
      const animation = getAnimation(this, 'drawer.denyClose');
      animateTo(this.panel, animation.keyframes, animation.options);
      return;
    }

    this.hide();
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.stopPropagation();
      this.requestClose();
    }
  }

  @watch('open', { waitUntilFirstUpdate: true })
  async handleOpenChange() {
    if (this.open) {
      // Show
      emit(this, 'sl-show');
      this.originalTrigger = document.activeElement as HTMLElement;

      // Lock body scrolling only if the drawer isn't contained
      if (!this.contained) {
        this.modal.activate();
        lockBodyScrolling(this);
      }

      await Promise.all([stopAnimations(this.drawer), stopAnimations(this.overlay)]);
      this.drawer.hidden = false;

      // Browsers that support el.focus({ preventScroll }) can set initial focus immediately
      if (hasPreventScroll) {
        const slInitialFocus = emit(this, 'sl-initial-focus', { cancelable: true });
        if (!slInitialFocus.defaultPrevented) {
          this.panel.focus({ preventScroll: true });
        }
      }

      const panelAnimation = getAnimation(this, `drawer.show${uppercaseFirstLetter(this.placement)}`);
      const overlayAnimation = getAnimation(this, 'drawer.overlay.show');
      await Promise.all([
        animateTo(this.panel, panelAnimation.keyframes, panelAnimation.options),
        animateTo(this.overlay, overlayAnimation.keyframes, overlayAnimation.options)
      ]);

      // Browsers that don't support el.focus({ preventScroll }) have to wait for the animation to finish before initial
      // focus to prevent scrolling issues. See: https://caniuse.com/mdn-api_htmlelement_focus_preventscroll_option
      if (!hasPreventScroll) {
        const slInitialFocus = emit(this, 'sl-initial-focus', { cancelable: true });
        if (!slInitialFocus.defaultPrevented) {
          this.panel.focus({ preventScroll: true });
        }
      }

      emit(this, 'sl-after-show');
    } else {
      // Hide
      emit(this, 'sl-hide');
      this.modal.deactivate();
      unlockBodyScrolling(this);

      await Promise.all([stopAnimations(this.drawer), stopAnimations(this.overlay)]);
      const panelAnimation = getAnimation(this, `drawer.hide${uppercaseFirstLetter(this.placement)}`);
      const overlayAnimation = getAnimation(this, 'drawer.overlay.hide');
      await Promise.all([
        animateTo(this.panel, panelAnimation.keyframes, panelAnimation.options),
        animateTo(this.overlay, overlayAnimation.keyframes, overlayAnimation.options)
      ]);

      this.drawer.hidden = true;

      // Restore focus to the original trigger
      const trigger = this.originalTrigger;
      if (trigger && typeof trigger.focus === 'function') {
        setTimeout(() => trigger.focus());
      }

      emit(this, 'sl-after-hide');
    }
  }

  handleSlotChange() {
    this.hasFooter = hasSlot(this, 'footer');
  }

  render() {
    return html`
      <div
        part="base"
        class=${classMap({
          drawer: true,
          'drawer--open': this.open,
          'drawer--top': this.placement === 'top',
          'drawer--end': this.placement === 'end',
          'drawer--bottom': this.placement === 'bottom',
          'drawer--start': this.placement === 'start',
          'drawer--contained': this.contained,
          'drawer--fixed': !this.contained,
          'drawer--has-footer': this.hasFooter
        })}
        @keydown=${this.handleKeyDown}
      >
        <div part="overlay" class="drawer__overlay" @click=${this.requestClose} tabindex="-1"></div>

        <div
          part="panel"
          class="drawer__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open ? 'false' : 'true'}
          aria-label=${ifDefined(this.noHeader ? this.label : undefined)}
          aria-labelledby=${ifDefined(!this.noHeader ? `${this.componentId}-title` : undefined)}
          tabindex="0"
        >
          ${!this.noHeader
            ? html`
                <header part="header" class="drawer__header">
                  <span part="title" class="drawer__title" id=${`${this.componentId}-title`}>
                    <!-- If there's no label, use an invisible character to prevent the heading from collapsing -->
                    <slot name="label"> ${this.label || String.fromCharCode(65279)} </slot>
                  </span>
                  <sl-icon-button
                    exportparts="base:close-button"
                    class="drawer__close"
                    name="x"
                    library="system"
                    @click=${this.requestClose}
                  ></sl-icon-button>
                </header>
              `
            : ''}

          <div part="body" class="drawer__body">
            <slot></slot>
          </div>

          <footer part="footer" class="drawer__footer">
            <slot name="footer" @slotchange=${this.handleSlotChange}></slot>
          </footer>
        </div>
      </div>
    `;
  }
}

// Top
setDefaultAnimation('drawer.showTop', {
  keyframes: [
    { opacity: 0, transform: 'translateY(-100%)' },
    { opacity: 1, transform: 'translateY(0)' }
  ],
  options: { duration: 250, easing: 'ease' }
});

setDefaultAnimation('drawer.hideTop', {
  keyframes: [
    { opacity: 1, transform: 'translateY(0)' },
    { opacity: 0, transform: 'translateY(-100%)' }
  ],
  options: { duration: 250, easing: 'ease' }
});

// End
setDefaultAnimation('drawer.showEnd', {
  keyframes: [
    { opacity: 0, transform: 'translateX(100%)' },
    { opacity: 1, transform: 'translateX(0)' }
  ],
  options: { duration: 250, easing: 'ease' }
});

setDefaultAnimation('drawer.hideEnd', {
  keyframes: [
    { opacity: 1, transform: 'translateX(0)' },
    { opacity: 0, transform: 'translateX(100%)' }
  ],
  options: { duration: 250, easing: 'ease' }
});

// Bottom
setDefaultAnimation('drawer.showBottom', {
  keyframes: [
    { opacity: 0, transform: 'translateY(100%)' },
    { opacity: 1, transform: 'translateY(0)' }
  ],
  options: { duration: 250, easing: 'ease' }
});

setDefaultAnimation('drawer.hideBottom', {
  keyframes: [
    { opacity: 1, transform: 'translateY(0)' },
    { opacity: 0, transform: 'translateY(100%)' }
  ],
  options: { duration: 250, easing: 'ease' }
});

// Start
setDefaultAnimation('drawer.showStart', {
  keyframes: [
    { opacity: 0, transform: 'translateX(-100%)' },
    { opacity: 1, transform: 'translateX(0)' }
  ],
  options: { duration: 250, easing: 'ease' }
});

setDefaultAnimation('drawer.hideStart', {
  keyframes: [
    { opacity: 1, transform: 'translateX(0)' },
    { opacity: 0, transform: 'translateX(-100%)' }
  ],
  options: { duration: 250, easing: 'ease' }
});

// Deny close
setDefaultAnimation('drawer.denyClose', {
  keyframes: [{ transform: 'scale(1)' }, { transform: 'scale(1.01)' }, { transform: 'scale(1)' }],
  options: { duration: 250 }
});

// Overlay
setDefaultAnimation('drawer.overlay.show', {
  keyframes: [{ opacity: 0 }, { opacity: 1 }],
  options: { duration: 250 }
});

setDefaultAnimation('drawer.overlay.hide', {
  keyframes: [{ opacity: 1 }, { opacity: 0 }],
  options: { duration: 250 }
});

declare global {
  interface HTMLElementTagNameMap {
    'sl-drawer': SlDrawer;
  }
}
