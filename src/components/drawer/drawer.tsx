import { Component, Element, Event, EventEmitter, Method, Prop, State, Watch, h } from '@stencil/core';
import { lockBodyScrolling, unlockBodyScrolling } from '../../utilities/scroll';
import { hasSlot } from '../../utilities/slot';

let id = 0;

/**
 * @since 2.0
 * @status stable
 *
 * @slot - The drawer's content.
 * @slot footer - The drawer's footer, usually one or more buttons representing various options.
 *
 * @part base - The component's base wrapper.
 * @part overlay - The overlay.
 * @part panel - The drawer panel (where the drawer and its is rendered).
 * @part header - The drawer header.
 * @part title - The drawer title.
 * @part close-button - The close button.
 * @part body - The drawer body.
 * @part footer - The drawer footer.
 */
@Component({
  tag: 'sl-drawer',
  styleUrl: 'drawer.scss',
  shadow: true
})
export class Drawer {
  panel: HTMLElement;
  drawer: HTMLElement;
  componentId = `drawer-${++id}`;

  @Element() host: HTMLSlDrawerElement;

  @State() hasFooter = false;

  /** Indicates whether or not the drawer is open. You can use this in lieu of the show/hide methods. */
  @Prop({ mutable: true, reflect: true }) open = false;

  /**
   * The drawer's label as displayed in the header. You should always include a relevant label even when using
   * `no-header`, as it is required for proper accessibility.
   */
  @Prop() label = '';

  /** The direction from which the drawer will open. */
  @Prop() placement: 'top' | 'right' | 'bottom' | 'left' = 'right';

  /**
   * By default, the drawer slides out of its containing block (usually the viewport). To make the drawer slide out of
   * its parent element, set this prop and add `position: relative` to the parent.
   */
  @Prop() contained = false;

  /**
   * Removes the header. This will also remove the default close button, so please ensure you provide an easy,
   * accessible way for users to dismiss the drawer.
   */
  @Prop() noHeader = false;

  @Watch('open')
  handleOpenChange() {
    this.open ? this.show() : this.hide();
  }

  /** Emitted when the drawer opens. Calling `event.preventDefault()` will prevent it from being opened. */
  @Event() slShow: EventEmitter;

  /** Emitted after the drawer opens and all transitions are complete. */
  @Event() slAfterShow: EventEmitter;

  /** Emitted when the drawer closes. Calling `event.preventDefault()` will prevent it from being closed. */
  @Event() slHide: EventEmitter;

  /** Emitted after the drawer closes and all transitions are complete. */
  @Event() slAfterHide: EventEmitter;

  /** Emitted when the overlay is clicked. Calling `event.preventDefault()` will prevent the drawer from closing. */
  @Event() slOverlayDismiss: EventEmitter;

  connectedCallback() {
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
    this.handleDocumentFocusIn = this.handleDocumentFocusIn.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleOverlayClick = this.handleOverlayClick.bind(this);
  }

  componentWillLoad() {
    this.updateSlots();
    this.host.shadowRoot.addEventListener('slotchange', this.updateSlots);
  }

  componentDidLoad() {
    // Show on init if open
    if (this.open) {
      this.show();
    }
  }

  componentDidUnload() {
    unlockBodyScrolling(this.host);

    this.host.shadowRoot.removeEventListener('slotchange', this.updateSlots);
  }

  /** Shows the drawer */
  @Method()
  async show() {
    const slShow = this.slShow.emit();

    if (slShow.defaultPrevented) {
      return false;
    }

    this.drawer.hidden = false;
    this.host.clientWidth; // force a reflow
    requestAnimationFrame(() => (this.open = true));

    // Lock body scrolling only if the drawer isn't contained
    if (!this.contained) {
      lockBodyScrolling(this.host);
    }

    document.addEventListener('focusin', this.handleDocumentFocusIn);
  }

  /** Hides the drawer */
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

    // Trap focus only if the drawer is NOT contained
    if (!this.contained && target.closest('sl-drawer') !== this.host) {
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
    if (event.propertyName === 'transform' && target.classList.contains('drawer__panel')) {
      this.drawer.hidden = !this.open;
      this.open ? this.slAfterShow.emit() : this.slAfterHide.emit();

      if (this.open) {
        this.panel.focus();
      }
    }
  }

  updateSlots() {
    this.hasFooter = hasSlot(this.host, 'footer');
  }

  render() {
    return (
      <div
        ref={el => (this.drawer = el)}
        part="base"
        class={{
          drawer: true,
          'drawer--open': this.open,
          'drawer--top': this.placement === 'top',
          'drawer--right': this.placement === 'right',
          'drawer--bottom': this.placement === 'bottom',
          'drawer--left': this.placement === 'left',
          'drawer--contained': this.contained,
          'drawer--fixed': !this.contained,
          'drawer--has-footer': this.hasFooter
        }}
        onKeyDown={this.handleKeyDown}
        onTransitionEnd={this.handleTransitionEnd}
        hidden
      >
        <div part="overlay" class="drawer__overlay" onClick={this.handleOverlayClick} />

        <div
          ref={el => (this.panel = el)}
          part="panel"
          class="drawer__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden={!this.open}
          aria-label={this.noHeader ? this.label : null}
          aria-labeledby={!this.noHeader ? `${this.componentId}-title` : null}
          tabIndex={0}
        >
          {!this.noHeader && (
            <header part="header" class="drawer__header">
              <span part="title" class="drawer__title" id={`${this.componentId}-title`}>
                {/* If there's no label, use an invisible character to prevent the heading from collapsing */}
                {this.label || String.fromCharCode(65279)}
              </span>
              <sl-icon-button part="close-button" class="drawer__close" name="x" onClick={this.handleCloseClick} />
            </header>
          )}

          <div part="body" class="drawer__body">
            <slot />
          </div>

          <footer part="footer" class="drawer__footer">
            <slot name="footer" />
          </footer>
        </div>
      </div>
    );
  }
}
