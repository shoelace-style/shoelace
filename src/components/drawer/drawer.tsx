import { Component, Element, Event, EventEmitter, Method, Prop, Watch, h } from '@stencil/core';
import { focusVisible } from '../../utilities/focus-visible';

/**
 * @since 1.0.0
 * @status ready
 */

@Component({
  tag: 'sl-drawer',
  styleUrl: 'drawer.scss',
  shadow: true
})
export class Drawer {
  drawer: HTMLElement;

  constructor() {
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleDocumentKeyDown = this.handleDocumentKeyDown.bind(this);
    this.handleDocumentMouseDown = this.handleDocumentMouseDown.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
  }

  @Element() host: HTMLSlDrawerElement;

  /** The location from which the drawer will slide out. */
  @Prop() placement: 'left' | 'right' = 'right';

  /**
   * The drawer's position. Use `fixed` to make the drawer slide out from the viewport. To make the drawer slide out
   * of an arbitrary element, use `absolute` and place the drawer inside a `position: relative` container and set
   * `overflow: hidden` on it.
   */
  @Prop() position: 'absolute' | 'fixed' = 'fixed';

  /**
   * The dialog's label as displayed in the header. You should always include a relevant label even when using
   * `no-header`, as it is required for proper accessibility.
   */
  @Prop() label = '';

  /**
   * Prevents the drawer from closing automatically when the user interacts outside of it (e.g. clicks something outside
   * of it).
   */
  @Prop() pinned = false;

  /**
   * Set to true to disable the header. This will also remove the default close button, so please ensure you provide an
   * easy, accessible way for users to dismiss the dialog.
   */
  @Prop() noHeader = false;

  /** Set to true to disable the footer. */
  @Prop() noFooter = false;

  /** Indicates whether or not the dialog is open. You can use this in lieu of the show/hide methods. */
  @Prop({ mutable: true, reflect: true }) open = false;

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
    focusVisible.observe(this.drawer);

    // Show on init if open
    if (this.open) {
      this.show();
    }
  }

  componentDidUnload() {
    focusVisible.unobserve(this.drawer);
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

    document.addEventListener('keydown', this.handleDocumentKeyDown);
    document.addEventListener('mousedown', this.handleDocumentMouseDown);
  }

  /** Hides the dialog */
  @Method()
  async hide() {
    const slHide = this.slHide.emit();

    if (slHide.defaultPrevented) {
      return false;
    }

    this.open = false;

    document.removeEventListener('keydown', this.handleDocumentKeyDown);
    document.addEventListener('mousedown', this.handleDocumentMouseDown);
  }

  handleCloseClick() {
    this.hide();
  }

  handleDocumentKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.hide();
    }
  }

  handleDocumentMouseDown(event: MouseEvent) {
    const target = event.target as HTMLElement;

    // Close when clicking outside of the drawer
    if (!this.pinned && target.closest('sl-drawer') !== this.host) {
      this.hide();
    }
  }

  handleTransitionEnd(event: TransitionEvent) {
    const target = event.target as HTMLElement;

    // Ensure we only handle one transition event on the target element
    if (event.propertyName === 'transform' && target.classList.contains('drawer')) {
      this.host.hidden = !this.open;
      this.open ? this.slAfterShow.emit() : this.slAfterHide.emit();
    }
  }

  render() {
    return (
      <div
        ref={el => (this.drawer = el)}
        class={{
          drawer: true,
          'drawer--open': this.open,

          // Position
          'drawer--absolute': this.position === 'absolute',
          'drawer--fixed': this.position === 'fixed',

          // Placement
          'drawer--left': this.placement === 'left',
          'drawer--right': this.placement === 'right'
        }}
        aria-hidden={!this.open}
        onTransitionEnd={this.handleTransitionEnd}
      >
        {!this.noHeader && (
          <header class="drawer__header">
            <span class="drawer__title">
              {/* If there's no label, use an invisible character to prevent the heading from collapsing */}
              {this.label || String.fromCharCode(65279)}
            </span>
            <button class="drawer__close" type="button" onClick={this.handleCloseClick}>
              <sl-icon name="x"></sl-icon>
            </button>
          </header>
        )}

        <div class="drawer__body">
          <slot />
        </div>

        {!this.noFooter && (
          <footer class="drawer__footer">
            <slot name="footer" />
          </footer>
        )}
      </div>
    );
  }
}
