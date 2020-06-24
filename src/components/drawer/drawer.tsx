import { Component, Element, Event, EventEmitter, Method, Prop, Watch, h } from '@stencil/core';
import { lockBodyScrolling, unlockBodyScrolling } from '../../utilities/scroll';
import { focusVisible } from '../../utilities/focus-visible';

let id = 0;

/**
 * @since 1.0.0
 * @status ready
 *
 * @slot - The drawer's content.
 * @slot footer - The drawer's footer, usually one or more buttons representing various options.
 */
@Component({
  tag: 'sl-drawer',
  styleUrl: 'drawer.scss',
  shadow: true
})
export class Drawer {
  panel: HTMLElement;
  drawer: HTMLElement;
  id = `drawer-${++id}`;

  constructor() {
    this.keepdrawerFocused = this.keepdrawerFocused.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
    this.handleDocumentKeyDown = this.handleDocumentKeyDown.bind(this);
    this.handleDocumentMouseDown = this.handleDocumentMouseDown.bind(this);
    this.handleOverlayClick = this.handleOverlayClick.bind(this);
  }

  @Element() host: HTMLSlDrawerElement;

  /** Indicates whether or not the drawer is open. You can use this in lieu of the show/hide methods. */
  @Prop({ mutable: true, reflect: true }) open = false;

  /**
   * The drawer's label as displayed in the header. You should always include a relevant label even when using
   * `no-header`, as it is required for proper accessibility.
   */
  @Prop() label = '';

  /** The direction from which the drawer will open. */
  @Prop() placement: 'left' | 'right' = 'right';

  /** When true, the drawer will not be dismissed when the user clicks outside of it. */
  @Prop() pinned = false;

  /**
   * Removes the header. This will also remove the default close button, so please ensure you provide an easy,
   * accessible way for users to dismiss the drawer.
   */
  @Prop() noHeader = false;

  /** Removes the footer. */
  @Prop() noFooter = false;

  /** Adds an overlay when the drawer is open. */
  @Prop() overlay = false;

  @Watch('open')
  handleOpenChange() {
    this.open ? this.show() : this.hide();
  }

  @Watch('overlay')
  handleOverlayChange() {
    // Body scrolling should only be locked when the drawer is open and the overlay is enabled
    if (this.open) {
      this.overlay ? lockBodyScrolling(this.host) : unlockBodyScrolling(this.host);
    }
  }

  /** Emitted when the drawer opens. Calling `event.preventDefault()` will prevent it from being opened. */
  @Event() slShow: EventEmitter;

  /** Emitted after the drawer opens and all transitions are complete. */
  @Event() slAfterShow: EventEmitter;

  /** Emitted when the drawer closes. Calling `event.preventDefault()` will prevent it from being closed. */
  @Event() slHide: EventEmitter;

  /** Emitted after the drawer closes and all transitions are complete. */
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
    unlockBodyScrolling(this.host);
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
    this.open = true;
    this.panel.focus();

    if (this.overlay) {
      lockBodyScrolling(this.host);
    }

    document.addEventListener('focusin', this.keepdrawerFocused);
    document.addEventListener('keydown', this.handleDocumentKeyDown);
    document.addEventListener('mousedown', this.handleDocumentMouseDown);
  }

  /** Hides the drawer */
  @Method()
  async hide() {
    const slHide = this.slHide.emit();

    if (slHide.defaultPrevented) {
      return false;
    }

    this.open = false;

    if (this.overlay) {
      unlockBodyScrolling(this.host);
    }

    document.removeEventListener('focusin', this.keepdrawerFocused);
    document.removeEventListener('keydown', this.handleDocumentKeyDown);
    document.removeEventListener('mousedown', this.handleDocumentMouseDown);
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
    if (!this.pinned && target.closest('sl-drawer') !== this.host) {
      this.hide();
    }
  }

  handleOverlayClick() {
    if (!this.pinned) {
      this.hide();
    }
  }

  handleTransitionEnd(event: TransitionEvent) {
    const target = event.target as HTMLElement;

    // Ensure we only handle one transition event on the target element
    if (event.propertyName === 'transform' && target.classList.contains('drawer__panel')) {
      this.drawer.hidden = !this.open;
      this.open ? this.slAfterShow.emit() : this.slAfterHide.emit();
    }
  }

  keepdrawerFocused(event: Event) {
    const target = event.target as HTMLElement;

    if (!target.closest('sl-drawer')) {
      this.panel.focus();
    }
  }

  render() {
    return (
      <div
        ref={el => (this.drawer = el)}
        class={{
          drawer: true,
          'drawer--open': this.open,
          'drawer--left': this.placement === 'left',
          'drawer--right': this.placement === 'right'
        }}
        onTransitionEnd={this.handleTransitionEnd}
        hidden
      >
        <div
          ref={el => (this.panel = el)}
          class="drawer__panel"
          role="drawer"
          aria-modal="true"
          aria-hidden={!this.open}
          aria-label={this.noHeader ? this.label : null}
          aria-labeledby={!this.noHeader ? `${this.id}-title` : null}
          tabIndex={0}
        >
          {!this.noHeader && (
            <header class="drawer__header">
              <span class="drawer__title" id={`${this.id}-title`}>
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

        {this.overlay && <div class="drawer__overlay" onClick={this.handleOverlayClick} />}
      </div>
    );
  }
}
