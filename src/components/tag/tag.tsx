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
  tag: HTMLElement;

  /** The tag's type. */
  @Prop({ reflect: true }) type: 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'text' = 'primary';

  /** The tag's size. */
  @Prop({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /** Set to true to draw a pill-style tag with rounded edges. */
  @Prop({ reflect: true }) pill = false;

  /** Set to true to make the tag clearable. */
  @Prop({ reflect: true }) clearable = false;

  /** Emitted when the clear button is activated. */
  @Event({ eventName: 'sl-clear' }) slClear: EventEmitter;

  connectedCallback() {
    this.handleClearClick = this.handleClearClick.bind(this);
  }

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
          <sl-icon-button exportparts="base:clear-button" name="x" class="tag__clear" onClick={this.handleClearClick} />
        )}
      </span>
    );
  }
}
