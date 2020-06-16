import { Component, Event, EventEmitter, Prop, h } from '@stencil/core';

/**
 * @since 1.0.0
 * @status ready
 *
 * @slot - The tag's content.
 */

@Component({
  tag: 'sl-tag',
  styleUrl: 'tag.scss',
  shadow: true
})
export class Tag {
  tag: HTMLElement;

  constructor() {
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
  }

  /** The tag's type. */
  @Prop() type: 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'text' = 'primary';

  /** The tag's size. */
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';

  /** Set to true to make the tag removable. */
  @Prop() removable = false;

  /** Emitted when the remove button is activated. */
  @Event() slRemove: EventEmitter;

  handleRemoveClick() {
    this.slRemove.emit();
  }

  render() {
    return (
      <span
        ref={el => (this.tag = el)}
        class={{
          'sl-tag': true,

          // Types
          'sl-tag--primary': this.type === 'primary',
          'sl-tag--success': this.type === 'success',
          'sl-tag--info': this.type === 'info',
          'sl-tag--warning': this.type === 'warning',
          'sl-tag--danger': this.type === 'danger',
          'sl-tag--text': this.type === 'text',

          // Sizes
          'sl-tag--small': this.size === 'small',
          'sl-tag--medium': this.size === 'medium',
          'sl-tag--large': this.size === 'large',

          // Modifers
          'sl-tag--removable': this.removable
        }}
      >
        <span class="sl-tag__label">
          <slot />
        </span>

        {this.removable && (
          <span class="sl-tag__remove" role="button" tabIndex={1} onClick={this.handleRemoveClick}>
            <sl-icon name="x" />
          </span>
        )}
      </span>
    );
  }
}
