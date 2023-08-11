import '../format-bytes/format-bytes.js';
import '../icon-button/icon-button.js';
import { classMap } from 'lit/directives/class-map.js';
import { defaultValue } from '../../internal/default-value.js';
import { FormControlController } from '../../internal/form.js';
import { HasSlotController } from '../../internal/slot.js';
import { html } from 'lit';
import { LocalizeController } from '../../utilities/localize.js';
import { property, query, state } from 'lit/decorators.js';
// import { watch } from '../../internal/watch';
import ShoelaceElement from '../../internal/shoelace-element.js';
import styles from './file-input.styles';
import type { CSSResultGroup } from 'lit';
import type { ShoelaceFormControl } from '../../internal/shoelace-element';

//
// TODO
//
//  - button-only version
//  - drag and drop support
//  - localization
//

/**
 * @summary Short summary of the component's intended use.
 * @documentation https://shoelace.style/components/file-input
 * @status experimental
 * @since 2.0
 *
 * @dependency sl-format-bytes
 * @dependency sl-icon-button
 *
 * @event sl-input - Emitted when the form control receives input.
 *
 * @slot label - The input's label. Alternatively, you can use the `label` attribute.
 * @slot help-text - Text that describes how to use the input. Alternatively, you can use the `help-text` attribute.

 * @csspart base - The component's base wrapper.
 */
export default class SlFileInput extends ShoelaceElement implements ShoelaceFormControl {
  static styles: CSSResultGroup = styles;

  private readonly formControlController = new FormControlController(this, {
    value: (control: SlFileInput) => control.files,
    assumeInteractionOn: ['sl-input']
  });
  private readonly hasSlotController = new HasSlotController(this, 'help-text', 'label');
  private readonly localize = new LocalizeController(this);

  @query('input[type="file"]') input: HTMLInputElement;

  @state() private files: File[] = [];
  @state() private hasFocus = false;

  /** The name of the input, submitted as a name/value pair with form data. */
  @property() name = '';

  /** The current value of the input, submitted as a name/value pair with form data. */
  @property() value = '';

  /** The default value of the form control. Primarily used for resetting the form control. */
  @defaultValue() defaultValue = '';

  /** The input's size. */
  @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /** Draws a filled input. */
  @property({ type: Boolean, reflect: true }) filled = false;

  /** Draws a pill-style input with rounded edges. */
  @property({ type: Boolean, reflect: true }) pill = false;

  /** The input's label. If you need to display HTML, use the `label` slot instead. */
  @property() label = '';

  /** The input's help text. If you need to display HTML, use the `help-text` slot instead. */
  @property({ attribute: 'help-text' }) helpText = '';

  /** Disables the input. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** A list of acceptable file types. Must be a comma-separated list of [unique file type specifiers](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#unique_file_type_specifiers). */
  @property() accept = false;

  /** Allows more than one file to be selected. */
  @property({ type: Boolean }) multiple = false;

  /** Gets the validity state object */
  get validity() {
    return this.input.validity;
  }

  /** Gets the validation message */
  get validationMessage() {
    return this.input.validationMessage;
  }

  private handleInput() {
    // Append selected files
    if (this.input.files) {
      this.files = this.files.concat([...this.input.files]);
    }

    // Reset the input
    this.input.value = '';

    this.emit('sl-input');
  }

  private handleRemoveClick(_: MouseEvent, indexToRemove: number) {
    this.files = this.files.filter((__, index) => index !== indexToRemove);
  }

  private isImage(file: File) {
    return ['image/gif', 'image/jpeg', 'image/png', 'image/svg+xml', 'image/webp'].includes(file.type);
  }

  /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
  checkValidity() {
    return this.input.checkValidity();
  }

  /** Gets the associated form, if one exists. */
  getForm(): HTMLFormElement | null {
    return this.formControlController.getForm();
  }

  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  reportValidity() {
    return this.input.reportValidity();
  }

  /** Sets a custom validation message. Pass an empty string to restore validity. */
  setCustomValidity(message: string) {
    this.input.setCustomValidity(message);
    this.formControlController.updateValidity();
  }

  render() {
    const hasLabelSlot = this.hasSlotController.test('label');
    const hasHelpTextSlot = this.hasSlotController.test('help-text');
    const hasLabel = this.label ? true : !!hasLabelSlot;
    const hasHelpText = this.helpText ? true : !!hasHelpTextSlot;

    return html`
      <div
        part="form-control"
        class=${classMap({
          'form-control': true,
          'form-control--small': this.size === 'small',
          'form-control--medium': this.size === 'medium',
          'form-control--large': this.size === 'large',
          'form-control--has-label': hasLabel,
          'form-control--has-help-text': hasHelpText
        })}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${hasLabel ? 'false' : 'true'}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${classMap({
              input: true,

              // Sizes
              'input--small': this.size === 'small',
              'input--medium': this.size === 'medium',
              'input--large': this.size === 'large',

              // States
              'input--pill': this.pill,
              'input--standard': !this.filled,
              'input--filled': this.filled,
              'input--disabled': this.disabled,
              'input--focused': this.hasFocus,
              'input--empty': !this.value
            })}
          >
            <input
              id="input"
              class="input__control"
              name=${this.name}
              type="file"
              aria-describedby="help-text"
              ?multiple=${this.multiple}
              @input=${this.handleInput}
            />

            <sl-button @click=${() => this.input.click()}>Choose Files</sl-button>

            <div class="input__files">
              ${this.files.map((file, index) => {
                const isImage = this.isImage(file);

                return html`
                  <div class="input__file">
                    <span class="input__file-preview">
                      ${isImage
                        ? html`<img
                            class="input__file-preview-image input__file-preview--image"
                            src=${URL.createObjectURL(file)}
                            alt="${file.name}"
                          />`
                        : html``}
                    </span>
                    <span class="input__file-name">${file.name}</span>
                    <span class="input__file-size">
                      <sl-format-bytes
                        value=${file.size}
                        display="short"
                        lang=${this.localize.lang()}
                      ></sl-format-bytes>
                    </span>
                    <sl-icon-button
                      class="input__file-remove"
                      name="x-lg"
                      library="system"
                      label=${this.localize.term('remove')}
                      @click=${(event: MouseEvent) => this.handleRemoveClick(event, index)}
                    ></sl-icon-button>
                  </div>
                `;
              })}
            </div>
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${hasHelpText ? 'false' : 'true'}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `;
  }
}
