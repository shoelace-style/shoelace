import { classMap, html, Shoemaker } from '@shoelace-style/shoemaker';
import styles from 'sass:./drawer.scss';
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
 * @slot - The drawer's content.
 * @slot label - The drawer's label. Alternatively, you can use the label prop.
 * @slot footer - The drawer's footer, usually one or more buttons representing various options.
 *
 * @part base - The component's base wrapper.
 * @part overlay - The overlay.
 * @part panel - The drawer panel (where the drawer and its content is rendered).
 * @part header - The drawer header.
 * @part title - The drawer title.
 * @part close-button - The close button.
 * @part body - The drawer body.
 * @part footer - The drawer footer.
 *
 * @emit sl-show - Emitted when the drawer opens. Calling `event.preventDefault()` will prevent it from being opened.
 * @emit sl-after-show - Emitted after the drawer opens and all transitions are complete.
 * @emit sl-hide - Emitted when the drawer closes. Calling `event.preventDefault()` will prevent it from being closed.
 * @emit sl-after-hide - Emitted after the drawer closes and all transitions are complete.
 * @emit sl-initial-focus - Emitted when the drawer opens and the panel gains focus. Calling `event.preventDefault()`
 *  will prevent focus and allow you to set it on a different element in the drawer, such as an input or button.
 * @emit sl-overlay-dismiss - Emitted when the overlay is clicked. Calling `event.preventDefault()` will prevent the
 *  drawer from closing.
 */
export default class SlDrawer extends Shoemaker {
  static tag = 'sl-drawer';
  static props = ['hasFooter', 'isVisible', 'open', 'label', 'placement', 'contained', 'noHeader'];
  static reflect = ['open'];
  static styles = styles;

  private componentId = `drawer-${++id}`;
  private drawer: HTMLElement;
  private hasFooter = false;
  private isVisible = false;
  private modal: Modal;
  private panel: HTMLElement;
  private willShow = false;
  private willHide = false;

  /** Indicates whether or not the drawer is open. You can use this in lieu of the show/hide methods. */
  open = false;

  /**
   * The drawer's label as displayed in the header. You should always include a relevant label even when using
   * `no-header`, as it is required for proper accessibility.
   */
  label = '';

  /** The direction from which the drawer will open. */
  placement: 'top' | 'right' | 'bottom' | 'left' = 'right';

  /**
   * By default, the drawer slides out of its containing block (usually the viewport). To make the drawer slide out of
   * its parent element, set this prop and add `position: relative` to the parent.
   */
  contained = false;

  /**
   * Removes the header. This will also remove the default close button, so please ensure you provide an easy,
   * accessible way for users to dismiss the drawer.
   */
  noHeader = false;

  onConnect() {
    this.modal = new Modal(this, {
      onfocusOut: () => (this.contained ? null : this.panel.focus())
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

  /** Shows the drawer */
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

    // Lock body scrolling only if the drawer isn't contained
    if (!this.contained) {
      this.modal.activate();
      lockBodyScrolling(this);
    }

    if (this.open) {
      if (hasPreventScroll) {
        // Wait for the next frame before setting initial focus so the drawer is technically visible
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
        this.drawer.addEventListener(
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

  /** Hides the drawer */
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
    if (event.propertyName === 'transform' && target.classList.contains('drawer__panel')) {
      this.isVisible = this.open;
      this.willShow = false;
      this.willHide = false;
      this.open ? this.emit('sl-after-show') : this.emit('sl-after-hide');
    }
  }

  render() {
    return html`
      <div
        ref=${(el: HTMLElement) => (this.drawer = el)}
        part="base"
        class=${classMap({
          drawer: true,
          'drawer--open': this.open,
          'drawer--visible': this.isVisible,
          'drawer--top': this.placement === 'top',
          'drawer--right': this.placement === 'right',
          'drawer--bottom': this.placement === 'bottom',
          'drawer--left': this.placement === 'left',
          'drawer--contained': this.contained,
          'drawer--fixed': !this.contained,
          'drawer--has-footer': this.hasFooter
        })}
        onkeydown=${this.handleKeyDown.bind(this)}
        ontransitionend=${this.handleTransitionEnd.bind(this)}
      >
        <div part="overlay" class="drawer__overlay" onclick=${this.handleOverlayClick.bind(this)} tabindex="-1" />

        <div
          ref=${(el: HTMLElement) => (this.panel = el)}
          part="panel"
          class="drawer__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open ? 'false' : 'true'}
          aria-label=${this.noHeader ? this.label : null}
          aria-labelledby=${!this.noHeader ? `${this.componentId}-title` : null}
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
                    onclick=${this.handleCloseClick.bind(this)}
                  />
                </header>
              `
            : ''}

          <div part="body" class="drawer__body">
            <slot />
          </div>

          <footer part="footer" class="drawer__footer">
            <slot name="footer" onslotchange=${this.handleSlotChange.bind(this)} />
          </footer>
        </div>
      </div>
    `;
  }
}
