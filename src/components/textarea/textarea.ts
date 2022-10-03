import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';
import { defaultValue } from '../../internal/default-value';
import { FormSubmitController } from '../../internal/form';
import ShoelaceElement from '../../internal/shoelace-element';
import { HasSlotController } from '../../internal/slot';
import { watch } from '../../internal/watch';
import styles from './textarea.styles';
import type { CSSResultGroup } from 'lit';

/**
 * @since 2.0
 * @status stable
 *
 * @slot label - The textarea's label. Alternatively, you can use the `label` attribute.
 * @slot help-text - Help text that describes how to use the input. Alternatively, you can use the `help-text` attribute.
 *
 * @event sl-change - Emitted when an alteration to the control's value is committed by the user.
 * @event sl-input - Emitted when the control receives input and its value changes.
 * @event sl-focus - Emitted when the control gains focus.
 * @event sl-blur - Emitted when the control loses focus.
 *
 * @csspart form-control - The form control that wraps the label, input, and help-text.
 * @csspart form-control-label - The label's wrapper.
 * @csspart form-control-input - The input's wrapper.
 * @csspart form-control-help-text - The help text's wrapper.
 * @csspart base - The component's internal wrapper.
 * @csspart textarea - The textarea control.
 */
@customElement('sl-textarea')
export default class SlTextarea extends ShoelaceElement {
  static styles: CSSResultGroup = styles;

  @query('.textarea__control') input: HTMLTextAreaElement;

  // @ts-expect-error -- Controller is currently unused
  private readonly formSubmitController = new FormSubmitController(this);
  private readonly hasSlotController = new HasSlotController(this, 'help-text', 'label');
  private resizeObserver: ResizeObserver;

  @state() private hasFocus = false;

  /** The textarea's size. */
  @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /** The textarea's name attribute. */
  @property() name: string;

  /** The textarea's value attribute. */
  @property() value = '';

  /** Draws a filled textarea. */
  @property({ type: Boolean, reflect: true }) filled = false;

  /** The textarea's label. If you need to display HTML, you can use the `label` slot instead. */
  @property() label = '';

  /** The textarea's help text. If you need to display HTML, you can use the `help-text` slot instead. */
  @property({ attribute: 'help-text' }) helpText = '';

  /** The textarea's placeholder text. */
  @property() placeholder: string;

  /** The number of rows to display by default. */
  @property({ type: Number }) rows = 4;

  /** Controls how the textarea can be resized. */
  @property() resize: 'none' | 'vertical' | 'auto' = 'vertical';

  /** Disables the textarea. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Makes the textarea readonly. */
  @property({ type: Boolean, reflect: true }) readonly = false;

  /** The minimum length of input that will be considered valid. */
  @property({ type: Number }) minlength: number;

  /** The maximum length of input that will be considered valid. */
  @property({ type: Number }) maxlength: number;

  /** Makes the textarea a required field. */
  @property({ type: Boolean, reflect: true }) required = false;

  /**
   * This will be true when the control is in an invalid state. Validity is determined by props such as `type`,
   * `required`, `minlength`, and `maxlength` using the browser's constraint validation API.
   */
  @property({ type: Boolean, reflect: true }) invalid = false;

  /** The textarea's autocapitalize attribute. */
  @property() autocapitalize: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters';

  /** The textarea's autocorrect attribute. */
  @property() autocorrect: string;

  /** The textarea's autocomplete attribute. */
  @property() autocomplete: string;

  /** The textarea's autofocus attribute. */
  @property({ type: Boolean }) autofocus: boolean;

  /**
   * The input's enterkeyhint attribute. This can be used to customize the label or icon of the Enter key on virtual
   * keyboards.
   */
  @property() enterkeyhint: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';

  /** Enables spell checking on the textarea. */
  @property({ type: Boolean }) spellcheck: boolean;

  /** The textarea's inputmode attribute. */
  @property() inputmode: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';

  /** Gets or sets the default value used to reset this element. The initial value corresponds to the one originally specified in the HTML that created this element. */
  @defaultValue()
  defaultValue = '';

  @state() protected validationMessage = '';

  connectedCallback() {
    super.connectedCallback();
    this.resizeObserver = new ResizeObserver(() => this.setTextareaHeight());

    this.updateComplete.then(() => {
      this.setTextareaHeight();
      this.resizeObserver.observe(this.input);
    });
  }

  firstUpdated() {
    this.invalid = !this.input.checkValidity();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver.unobserve(this.input);
  }

  /** Sets focus on the textarea. */
  focus(options?: FocusOptions) {
    this.input.focus(options);
  }

  /** Removes focus from the textarea. */
  blur() {
    this.input.blur();
  }

  /** Selects all the text in the textarea. */
  select() {
    this.input.select();
  }

  /** Gets or sets the textarea's scroll position. */
  scrollPosition(position?: { top?: number; left?: number }): { top: number; left: number } | undefined {
    if (position) {
      if (typeof position.top === 'number') this.input.scrollTop = position.top;
      if (typeof position.left === 'number') this.input.scrollLeft = position.left;
      return undefined;
    }

    return {
      top: this.input.scrollTop,
      left: this.input.scrollTop
    };
  }

  /** Sets the start and end positions of the text selection (0-based). */
  setSelectionRange(
    selectionStart: number,
    selectionEnd: number,
    selectionDirection: 'forward' | 'backward' | 'none' = 'none'
  ) {
    this.input.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
  }

  /** Replaces a range of text with a new string. */
  setRangeText(
    replacement: string,
    start: number,
    end: number,
    selectMode: 'select' | 'start' | 'end' | 'preserve' = 'preserve'
  ) {
    this.input.setRangeText(replacement, start, end, selectMode);

    if (this.value !== this.input.value) {
      this.value = this.input.value;
      this.emit('sl-input');
    }

    if (this.value !== this.input.value) {
      this.value = this.input.value;
      this.setTextareaHeight();
      this.emit('sl-input');
      this.emit('sl-change');
    }
  }

  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  reportValidity() {
    this.invalid = !this.checkValidity()

    this.validationMessage = this.input.validationMessage

    this.requestUpdate()

    return !this.invalid
  }

  checkValidity() {
    return this.input.checkValidity()
  }

  /** Sets a custom validation message. If `message` is not empty, the field will be considered invalid. */
  setCustomValidity(message: string) {
    this.input.setCustomValidity(message);
    this.invalid = !this.input.checkValidity();
  }

  handleBlur() {
    this.hasFocus = false;
    this.emit('sl-blur');
  }

  handleChange() {
    this.value = this.input.value;
    this.setTextareaHeight();
    this.emit('sl-change');
  }

  @watch('disabled', { waitUntilFirstUpdate: true })
  handleDisabledChange() {
    // Disabled form controls are always valid, so we need to recheck validity when the state changes
    this.input.disabled = this.disabled;
    this.invalid = !this.input.checkValidity();
  }

  handleFocus() {
    this.hasFocus = true;
    this.emit('sl-focus');
  }

  handleInput() {
    this.value = this.input.value;
    this.emit('sl-input');
  }

  @watch('rows', { waitUntilFirstUpdate: true })
  handleRowsChange() {
    this.setTextareaHeight();
  }

  @watch('value', { waitUntilFirstUpdate: true })
  handleValueChange() {
    this.invalid = !this.input.checkValidity();
    this.updateComplete.then(() => this.setTextareaHeight());
  }

  setTextareaHeight() {
    if (this.resize === 'auto') {
      this.input.style.height = 'auto';
      this.input.style.height = `${this.input.scrollHeight}px`;
    } else {
      (this.input.style.height as string | undefined) = undefined;
    }
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
              textarea: true,
              'textarea--small': this.size === 'small',
              'textarea--medium': this.size === 'medium',
              'textarea--large': this.size === 'large',
              'textarea--standard': !this.filled,
              'textarea--filled': this.filled,
              'textarea--disabled': this.disabled,
              'textarea--focused': this.hasFocus,
              'textarea--empty': !this.value,
              'textarea--invalid': this.invalid,
              'textarea--resize-none': this.resize === 'none',
              'textarea--resize-vertical': this.resize === 'vertical',
              'textarea--resize-auto': this.resize === 'auto'
            })}
          >
            <textarea
              part="textarea"
              id="input"
              class="textarea__control"
              name=${ifDefined(this.name)}
              .value=${live(this.value)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${ifDefined(this.placeholder)}
              rows=${ifDefined(this.rows)}
              minlength=${ifDefined(this.minlength)}
              maxlength=${ifDefined(this.maxlength)}
              autocapitalize=${ifDefined(this.autocapitalize)}
              autocorrect=${ifDefined(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${ifDefined(this.spellcheck)}
              enterkeyhint=${ifDefined(this.enterkeyhint)}
              inputmode=${ifDefined(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            ></textarea>
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

        ${this.invalid ? html`<div class="form-control__error-text">${this.validationMessage}</div>` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-textarea': SlTextarea;
  }
}
