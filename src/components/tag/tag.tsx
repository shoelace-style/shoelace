import { Component, Event, EventEmitter, Prop, h } from '@stencil/core';

/**
 * @since 2.0
 * @status stable
 *
 * @slot - The tag's content.
 *
 * @part base - The component's base wrapper.
 * @part content - The tag content.
 * @part clear-button - The clear button.
 */

@Component({
  tag: 'sl-tag',
  styleUrl: 'tag.scss',
  shadow: true
})
export class Tag {
  constructor() {
    this.handleClearClick = this.handleClearClick.bind(this);
  }

  tag: HTMLElement;

  /** The tag's type. */
  @Prop() type: 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'text' = 'primary';

  /** The tag's size. */
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';

  /** Set to true to draw a pill-style tag with rounded edges. */
  @Prop() pill = false;

  /** Set to true to make the tag clearable. */
  @Prop() clearable = false;

  /** Emitted when the clear button is activated. */
  @Event() slClear: EventEmitter;

  handleClearClick() {
    this.slClear.emit();
  }

  render() {
    return (
      <span
        ref={el => (this.tag = el)}
        part="base"
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
          'tag--pill': this.pill,
          'tag--clearable': this.clearable
        }}
      >
        <span part="content" class="tag__content">
          <slot />
        </span>

        {this.clearable && (
          <span part="clear-button" class="tag__clear" role="button" tabIndex={-1} onClick={this.handleClearClick}>
            <sl-icon name="x" />
          </span>
        )}
      </span>
    );
  }
}
