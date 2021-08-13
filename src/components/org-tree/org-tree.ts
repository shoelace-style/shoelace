import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { emit } from '../../internal/event';
import { watch } from '../../internal/watch';
import styles from './org-tree.styles';

/**
 * @since 2.0
 * @status experimental
 *
 * @dependency sl-example
 *
 * @event sl-event-name - Emitted as an example.
 *
 * @slot - The default slot.
 * @slot example - An example slot.
 *
 * @csspart base - The component's base wrapper.
 *
 * @cssproperty --example - An example CSS custom property.
 */
@customElement('sl-org-tree')
export default class SlOrgTree extends LitElement {
  static styles = styles;

  /** An example property. */
  @property() prop = 'example';

  @watch('someProp')
  doSomething() {
    // Example event
    emit(this, 'sl-event-name');
  }

  render() {
    return html` <slot><div>ADDSD</div></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-org-tree': SlOrgTree;
  }
}
