import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, query, state } from 'lit/decorators.js';
import { defaultValue } from '../../internal/default-value';
import { FormControlController } from '../../internal/form';
import { HasSlotController } from '../../internal/slot';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';
import { watch } from '../../internal/watch';
import ShoelaceElement from '../../internal/shoelace-element';
import styles from './textarea.styles';
import type { CSSResultGroup } from 'lit';
import type { ShoelaceFormControl } from '../../internal/shoelace-element';

/**
 * @summary Textareas collect data from the user and allow multiple lines of text.
 * @documentation https://shoelace.style/components/textarea
 * @status stable
 * @since 2.0
 *
 * @slot label - The textarea's label. Alternatively, you can use the `label` attribute.
 * @slot help-text - Text that describes how to use the input. Alternatively, you can use the `help-text` attribute.
 *
 * @event sl-blur - Emitted when the control loses focus.
 * @event sl-change - Emitted when an alteration to the control's value is committed by the user.
 * @event sl-focus - Emitted when the control gains focus.
 * @event sl-input - Emitted when the control receives input.
 *
 * @csspart form-control - The form control that wraps the label, input, and help text.
 * @csspart form-control-label - The label's wrapper.
 * @csspart form-control-input - The input's wrapper.
 * @csspart form-control-help-text - The help text's wrapper.
 * @csspart base - The component's base wrapper.
 * @csspart textarea - The internal `<textarea>` control.
 */
@customElement('sl-textarea')
export default class SlTextarea extends ShoelaceElement implements ShoelaceFormControl {
  static styles: CSSResultGroup = styles;

  private readonly formControlController = new FormControlController(this);
  private readonly hasSlotController = new HasSlotController(this, 'help-text', 'label');
  private resizeObserver: ResizeObserver;

  @query('.textarea__control') input: HTMLTextAreaElement;

  @state() private hasFocus = false;
  @property() title = ''; // make reactive to pass through

  /** The name of the textarea, submitted as a name/value pair with form data. */
  @property() name = '';

  /** The current value of the textarea, submitted as a name/value pair with form data. */
  @property() value = '';

  /** The textarea's size. */
  @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /** Draws a filled textarea. */
  @property({ type: Boolean, reflect: true }) filled = false;

  /** The textarea's label. If you need to display HTML, use the `label` slot instead. */
  @property() label = '';

  /** The textarea's help text. If you need to display HTML, use the `help-text` slot instead. */
  @property({ attribute: 'help-text' }) helpText = '';

  /** Placeholder text to show as a hint when the input is empty. */
  @property() placeholder = '';

  /** The number of rows to display by default. */
  @property({ type: Number }) rows = 4;

  /** Controls how the textarea can be resized. */
  @property() resize: 'none' | 'vertical' | 'auto' = 'vertical';

  /** Disables the textarea. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Makes the textarea readonly. */
  @property({ type: Boolean, reflect: true }) readonly = false;

  /**
   * By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you
   * to place the form control outside of a form and associate it with the form that has this `id`. The form must be in
   * the same document or shadow root for this to work.
   */
  @property({ reflect: true }) form = '';

  /** Makes the textarea a required field. */
  @property({ type: Boolean, reflect: true }) required = false;

  /** The minimum length of input that will be considered valid. */
  @property({ type: Number }) minlength: number;

  /** The maximum length of input that will be considered valid. */
  @property({ type: Number }) maxlength: number;

  /** Controls whether and how text input is automatically capitalized as it is entered by the user. */
  @property() autocapitalize: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters';

  /** Indicates whether the browser's autocorrect feature is on or off. */
  @property() autocorrect: string;

  /**
   * Specifies what permission the browser has to provide assistance in filling out form field values. Refer to
   * [this page on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) for available values.
   */
  @property() autocomplete: string;

  /** Indicates that the input should receive focus on page load. */
  @property({ type: Boolean }) autofocus: boolean;

  /** Used to customize the label or icon of the Enter key on virtual keyboards. */
  @property() enterkeyhint: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';

  /** Enables spell checking on the textarea. */
  @property({
    type: Boolean,
    converter: {
      // Allow "true|false" attribute values but keep the property boolean
      fromAttribute: value => (!value || value === 'false' ? false : true),
      toAttribute: value => (value ? 'true' : 'false')
    }
  })
  spellcheck = true;

  /**
   * Tells the browser what type of data will be entered by the user, allowing it to display the appropriate virtual
   * keyboard on supportive devices.
   */
  @property() inputmode: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';

  /** The default value of the form control. Primarily used for resetting the form control. */
  @defaultValue() defaultValue = '';

  connectedCallback() {
    super.connectedCallback();
    this.resizeObserver = new ResizeObserver(() => this.setTextareaHeight());

    this.updateComplete.then(() => {
      this.setTextareaHeight();
      this.resizeObserver.observe(this.input);
    });
  }

  firstUpdated() {
    this.formControlController.updateValidity();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver.unobserve(this.input);
  }

  private handleBlur() {
    this.hasFocus = false;
    this.emit('sl-blur');
  }

  private handleChange() {
    this.value = this.input.value;
    this.setTextareaHeight();
    this.emit('sl-change');
  }

  private handleFocus() {
    this.hasFocus = true;
    this.emit('sl-focus');
  }

  private handleInput() {
    this.value = this.input.value;
    this.emit('sl-input');
  }

  private setTextareaHeight() {
    if (this.resize === 'auto') {
      this.input.style.height = 'auto';
      this.input.style.height = `${this.input.scrollHeight}px`;
    } else {
      (this.input.style.height as string | undefined) = undefined;
    }
  }

  @watch('disabled', { waitUntilFirstUpdate: true })
  handleDisabledChange() {
    // Disabled form controls are always valid
    this.formControlController.setValidity(this.disabled);
  }

  @watch('rows', { waitUntilFirstUpdate: true })
  handleRowsChange() {
    this.setTextareaHeight();
  }

  @watch('value', { waitUntilFirstUpdate: true })
  async handleValueChange() {
    await this.updateComplete;
    this.formControlController.updateValidity();
    this.setTextareaHeight();
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
    start?: number,
    end?: number,
    selectMode?: 'select' | 'start' | 'end' | 'preserve'
  ) {
    // @ts-expect-error - start, end, and selectMode are optional
    this.input.setRangeText(replacement, start, end, selectMode);

    if (this.value !== this.input.value) {
      this.value = this.input.value;
    }

    if (this.value !== this.input.value) {
      this.value = this.input.value;
      this.setTextareaHeight();
    }
  }

  /** Checks for validity but does not show the browser's validation message. */
  checkValidity() {
    return this.input.checkValidity();
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
              textarea: true,
              'textarea--small': this.size === 'small',
              'textarea--medium': this.size === 'medium',
              'textarea--large': this.size === 'large',
              'textarea--standard': !this.filled,
              'textarea--filled': this.filled,
              'textarea--disabled': this.disabled,
              'textarea--focused': this.hasFocus,
              'textarea--empty': !this.value,
              'textarea--resize-none': this.resize === 'none',
              'textarea--resize-vertical': this.resize === 'vertical',
              'textarea--resize-auto': this.resize === 'auto'
            })}
          >
            <textarea
              part="textarea"
              id="input"
              class="textarea__control"
              title=${this.title /* An empty title prevents browser validation tooltips from appearing on hover */}
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

        <slot
          name="help-text"
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${hasHelpText ? 'false' : 'true'}
        >
          ${this.helpText}
        </slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-textarea': SlTextarea;
  }
}
