import { Component, Prop, h } from '@stencil/core';

/**
 * @since 2.0
 * @status stable
 *
 * @slot - One or more `<sl-button>` elements to display in the button group.
 *
 * @part base - The component's base wrapper.
 */

@Component({
  tag: 'sl-button-group',
  styleUrl: 'button-group.scss',
  shadow: true
})
export class ButtonGroup {
  buttonGroup: HTMLElement;

  /** A label to use for the button groups `aria-label` attribute. */
  @Prop() label = '';

  connectedCallback() {
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentDidLoad() {
    this.buttonGroup.addEventListener('slFocus', this.handleFocus);
    this.buttonGroup.addEventListener('slBlur', this.handleBlur);
  }

  disconnectedCallback() {
    this.buttonGroup.removeEventListener('slFocus', this.handleFocus);
    this.buttonGroup.removeEventListener('slBlur', this.handleBlur);
  }

  handleFocus(event: CustomEvent) {
    const button = event.target as HTMLElement;
    button.classList.add('sl-focus');
  }

  handleBlur(event: CustomEvent) {
    const button = event.target as HTMLElement;
    button.classList.remove('sl-focus');
  }

  render() {
    return (
      <div ref={el => (this.buttonGroup = el)} part="base" class="button-group" aria-label={this.label}>
        <slot />
      </div>
    );
  }
}
