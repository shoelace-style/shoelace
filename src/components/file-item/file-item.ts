import { html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { animateTo, stopAnimations } from '../../internal/animate';
import { emit, waitForEvent } from '../../internal/event';
import { HasSlotController } from '../../internal/slot';
import { watch } from '../../internal/watch';
import { getAnimation, setDefaultAnimation } from '../../utilities/animation-registry';
import { LocalizeController } from '../../utilities/localize';
import styles from './file-item.styles';

/**
 * @since 2.0
 * @status experimental
 *
 * @dependency sl-icon-button
 * @dependency sl-progress-bar
 *
 * @event sl-show - Emitted when the item opens.
 * @event sl-after-show - Emitted after the item opens and all animations are complete.
 * @event sl-hide - Emitted when the item closes.
 * @event sl-after-hide - Emitted after the item closes and all animations are complete.
 *
 * @slot - The file list item's label.
 * @slot icon - The file list item's icon.
 * @slot close-button - The file list item's close button.
 *
 * @csspart base - The component's internal wrapper.
 * @csspart icon - The file list item's icon.
 * @csspart label - The file list item's label.
 * @csspart close-button -  The file list item's close button.
 */
@customElement('sl-file-item')
export default class SlFileItem extends LitElement {
  static styles = styles;

  private readonly hasSlotController = new HasSlotController(this, 'icon', 'suffix');
  private readonly localize = new LocalizeController(this);

  @query('[part="base"]') base: HTMLElement;

  /** Draws the item in a loading state. */
  @property({ type: Boolean, reflect: true }) loading = false;

  /** The current progress, 0 to 100. Only respects is loading prop is true. */
  @property({ type: Number, reflect: true }) progress: number;

  /** A custom label for the progress bar's aria label. Only respects if loading prop is true. */
  @property() label: string;

  /** The locale to render the component in. */
  @property() lang: string;

  /** Draws the item in a warning state. */
  @property({ type: Boolean, reflect: true }) warning = false;

  /** Makes the item closable. */
  @property({ type: Boolean, reflect: true }) closable = false;

  /** A unique value to store in the menu item. This can be used as a way to identify menu items when selected. */
  @property() value = '';

  /** The size of the file in bytes as a read-only 64-bit integer. */
  @property({ type: Number, reflect: true }) size: number;

  /** Indicates whether or not the file list item is hidden. */
  @property({ type: Boolean, reflect: true }) hidden = false;

  firstUpdated() {
    this.base.hidden = this.hidden;
  }

  @watch('hidden', { waitUntilFirstUpdate: true })
  async handleHiddenChange() {
    if (!this.hidden) {
      // Show
      emit(this, 'sl-show');

      await stopAnimations(this.base);
      this.base.hidden = false;
      const { keyframes, options } = getAnimation(this, 'file-item.show', { dir: this.localize.dir() });
      await animateTo(this.base, keyframes, options);

      emit(this, 'sl-after-show');
    } else {
      // Hide
      emit(this, 'sl-hide');

      await stopAnimations(this.base);
      const { keyframes, options } = getAnimation(this, 'file-item.hide', { dir: this.localize.dir() });
      await animateTo(this.base, keyframes, options);
      this.base.hidden = true;

      emit(this, 'sl-after-hide');
    }
  }

  /** Shows the item. */
  async show() {
    if (!this.hidden) {
      return undefined;
    }

    this.hidden = false;
    return waitForEvent(this, 'sl-after-show');
  }

  /** Hides the item */
  async hide() {
    if (this.hidden) {
      return undefined;
    }

    this.hidden = true;
    return waitForEvent(this, 'sl-after-hide');
  }

  handleCloseClick() {
    this.hide();
  }

  handleTriggerKeyUp(event: KeyboardEvent) {
    // Prevent space from triggering a click event in Firefox
    if (event.key === '\xA0 ') {
      event.preventDefault();
    }
  }

  render() {
    return html`
      <div
        part="base"
        class=${classMap({
          'file-item': true,
          'file-item--hidden': this.hidden,
          'file-item--closable': this.closable,
          'file-item--warning': this.warning,
          'file-item--has-size': this.size,
          'file-item--is-loading': this.loading,
          'file-item--has-icon': this.hasSlotController.test('icon')
        })}
      >
        <span class="file-item__content">
          <span part="icon" class="file-item__icon">
            <slot name="icon"></slot>
          </span>

          <span part="label" class="file-item__label">
            <slot></slot>
            ${this.size ? html`<sl-format-bytes value="${this.size}"></sl-format-bytes>` : ''}
          </span>

          ${this.loading
            ? html`
                <span class="file-item__progress-bar__container">
                  <sl-progress-bar
                    class="file-item__progress-bar"
                    ?indeterminate=${this.progress === undefined}
                    value=${ifDefined(this.progress)}
                    label=${ifDefined(this.label)}
                  ></sl-progress-bar>
                </span>
              `
            : ''}
        </span>

        ${this.closable
          ? html`
              <span class="file-item__close-button" @click=${this.handleCloseClick} @keyup=${this.handleTriggerKeyUp}>
                <slot name="close-button">
                  <sl-icon-button
                    part="close-button"
                    exportparts="base:close-button__base"
                    name="x"
                    library="system"
                  ></sl-icon-button>
                </slot>
              </span>
            `
          : ''}
      </div>
    `;
  }
}

setDefaultAnimation('file-item.show', {
  keyframes: [
    { opacity: 0, transform: 'scale(0.8)' },
    { opacity: 1, transform: 'scale(1)' }
  ],
  options: { duration: 250, easing: 'ease' }
});

setDefaultAnimation('file-item.hide', {
  keyframes: [
    { opacity: 1, transform: 'scale(1)' },
    { opacity: 0, transform: 'scale(0.8)' }
  ],
  options: { duration: 250, easing: 'ease' }
});

declare global {
  interface HTMLElementTagNameMap {
    'sl-file-item': SlFileItem;
  }
}
