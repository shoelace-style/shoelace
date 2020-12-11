import { Component, Prop, h, State, Watch, Event, EventEmitter, Method, Element } from '@stencil/core';
import { lockBodyScrolling, unlockBodyScrolling } from '../../utilities/scroll';

let id = 0;

/**
 * @since 2.0
 * @status stable
 * 
 *@slot - The component or element to be displayed on the backdrop 
 *
 * @part base - The component's base wrapper.
 * @part overlay - The overlay.
 * @part content - The content to be displayed on top of the overlay.
 */

@Component({
  tag: 'sl-backdrop',
  styleUrl: 'backdrop.scss',
  shadow: true
})

export class BackDrop {
  componentId = `backdrop-${++id}`
  backdrop: HTMLElement;
  willShow = false
  willHide = false

  @Element() host: HTMLSlBackdropElement;

  @State() isVisible = false;

  /** Indicates whether or not the backdrop is open. You can use this in lieu of the show/hide methods. */
  @Prop({ mutable: true, reflect: true }) open = false;

  /**
   * By default, the backdrop fills the whole screen (usually the view port). To make the backdrop fill just
   * its parent element, set this prop and add `position: relative` to the parent.
   */
  @Prop() contained = false;

  /**
   * Indicates whether the backdrop should center it's contents. It is centered by default
   */
  @Prop() isCentered = true

  @Watch('open')
  handleOpenChange() {
    this.open ? this.show() : this.hide();
  }

  /** Emitted when the backdrop opens. Calling `event.preventDefault()` will prevent it from being opened. */
  @Event({ eventName: 'sl-show' }) slShow: EventEmitter;

  /** Emitted after the backdrop opens and all transitions are complete. */
  @Event({ eventName: 'sl-after-show' }) slAfterShow: EventEmitter;

  /** Emitted when the backdrop closes. Calling `event.preventDefault()` will prevent it from being closed. */
  @Event({ eventName: 'sl-hide' }) slHide: EventEmitter;

  /** Emitted after the backdrop closes and all transitions are complete. */
  @Event({ eventName: 'sl-after-hide' }) slAfterHide: EventEmitter;

  /** Emitted when the overlay is clicked. Calling `event.preventDefault()` will prevent the backdrop from closing. */
  @Event({ eventName: 'sl-overlay-dismiss' }) slOverlayDismiss: EventEmitter;

  

  connectedCallback() {
    this.handleOverlayClick = this.handleOverlayClick.bind(this)
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
  }

  componentWillLoad() {
    // Show on init if open
    if (this.open) {
      this.show();
    }
  }

  disconnectedCallback() {
    unlockBodyScrolling(this.host);
  }

  /** Shows the backdrop overlay */
  @Method()
  async show() {
    if (this.willShow) {
      return
    }

    const slShow = this.slShow.emit();
    if (slShow.defaultPrevented) {
      this.open = false;
      return;
    }
    this.willShow = true;
    this.isVisible = true
    this.open = true;

    if(!this.contained) {
      lockBodyScrolling(this.host);
    }
  }

  /** Hides the backdrop overlay */
  @Method()
  async hide() {
    if (this.willHide) {
      return
    }

    const slHide = this.slHide.emit();
    if (slHide.defaultPrevented) {
      this.open = true;
      return;
    }

    this.willHide = true;
    this.open = false;

    unlockBodyScrolling(this.host);
  }

  handleOverlayClick() {
    const slOverlayDismiss = this.slOverlayDismiss.emit();

    if(!slOverlayDismiss.defaultPrevented) {
      this.hide()
    }
  }

  handleTransitionEnd(event: TransitionEvent) {

    // Ensure we only emit one event when the target element is no longer visible
    if (event.propertyName === 'opacity') {
      this.isVisible = this.open;
      this.willShow = false;
      this.willHide = false;
      this.open ? this.slAfterShow.emit() : this.slAfterHide.emit();
    }
  }
  
  render() {
    return (
      <div
        ref={el => (this.backdrop = el)}
        part="base"
        class={{
          backdrop: true,
          'backdrop--open': this.open,
          'backdrop--visible': this.isVisible,
          'backdrop--contained': this.contained,
          'backdrop--fixed': !this.contained,
          'backdrop--centered': this.isCentered
        }}
        onTransitionEnd={this.handleTransitionEnd}
      >
        <div part="overlay" class='backdrop__overlay' onClick={this.handleOverlayClick} />
        <div part="content" class="backdrop__content">
          <slot />
        </div>
      </div>
    )
  }
}