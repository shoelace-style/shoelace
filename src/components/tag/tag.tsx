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
  constructor() {
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
  }

  tag: HTMLElement;

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
          tag: true,

          // Types
          'tag--primary': this.type === 'primary',
          'tag--success': this.type === 'success',
          'tag--info': this.type === 'info',
          'tag--warning': this.type === 'warning',
          'tag--danger': this.type === 'danger',
          'tag--text': this.type === 'text',

          // Sizes
          'tag--small': this.size === 'small',
          'tag--medium': this.size === 'medium',
          'tag--large': this.size === 'large',

          // Modifers
          'tag--removable': this.removable
        }}
      >
        <span class="tag__content">
          <slot />
        </span>

        {this.removable && (
          <span class="tag__remove" role="button" tabIndex={-1} onClick={this.handleRemoveClick}>
            <sl-icon name="x" />
          </span>
        )}
      </span>
    );
  }
}
