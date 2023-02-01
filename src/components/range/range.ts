import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, query, state } from 'lit/decorators.js';
import { defaultValue } from '../../internal/default-value';
import { FormControlController } from '../../internal/form';
import { HasSlotController } from '../../internal/slot';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';
import { LocalizeController } from '../../utilities/localize';
import { watch } from '../../internal/watch';
import ShoelaceElement from '../../internal/shoelace-element';
import styles from './range.styles';
import type { CSSResultGroup } from 'lit';
import type { ShoelaceFormControl } from '../../internal/shoelace-element';

/**
 * @summary Ranges allow the user to select a single value within a given range using a slider.
 * @documentation https://shoelace.style/components/range
 * @status stable
 * @since 2.0
 *
 * @slot label - The range's label. Alternatively, you can use the `label` attribute.
 * @slot help-text - Text that describes how to use the input. Alternatively, you can use the `help-text` attribute.
 *
 * @event sl-blur - Emitted when the control loses focus.
 * @event sl-change - Emitted when an alteration to the control's value is committed by the user.
 * @event sl-focus - Emitted when the control gains focus.
 * @event sl-input - Emitted when the control receives input.
 *
 * @csspart form-control - The form control that wraps the label, input, and help text.
 * @csspart form-control-label - The label's wrapper.
 * @csspart form-control-input - The range's wrapper.
 * @csspart form-control-help-text - The help text's wrapper.
 * @csspart base - The component's base wrapper.
 * @csspart input - The internal `<input>` element.
 * @csspart tooltip - The range's tooltip.
 *
 * @cssproperty --thumb-size - The size of the thumb.
 * @cssproperty --tooltip-offset - The vertical distance the tooltip is offset from the track.
 * @cssproperty --track-color-active - The color of the portion of the track that represents the current value.
 * @cssproperty --track-color-inactive - The of the portion of the track that represents the remaining value.
 * @cssproperty --track-height - The height of the track.
 * @cssproperty --track-active-offset - The point of origin of the active track.
 */
@customElement('sl-range')
export default class SlRange extends ShoelaceElement implements ShoelaceFormControl {
  static styles: CSSResultGroup = styles;

  private readonly formControlController = new FormControlController(this);
  private readonly hasSlotController = new HasSlotController(this, 'help-text', 'label');
  private readonly localize = new LocalizeController(this);
  private resizeObserver: ResizeObserver;

  @query('.range__control') input: HTMLInputElement;
  @query('.range__tooltip') output: HTMLOutputElement | null;

  @state() private hasFocus = false;
  @state() private hasTooltip = false;
  @property() title = ''; // make reactive to pass through

  /** The name of the range, submitted as a name/value pair with form data. */
  @property() name = '';

  /** The current value of the range, submitted as a name/value pair with form data. */
  @property({ type: Number }) value = 0;

  /** The range's label. If you need to display HTML, use the `label` slot instead. */
  @property() label = '';

  /** The range's help text. If you need to display HTML, use the help-text slot instead. */
  @property({ attribute: 'help-text' }) helpText = '';

  /** Disables the range. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** The minimum acceptable value of the range. */
  @property({ type: Number }) min = 0;

  /** The maximum acceptable value of the range. */
  @property({ type: Number }) max = 100;

  /** The interval at which the range will increase and decrease. */
  @property({ type: Number }) step = 1;

  /** The preferred placement of the range's tooltip. */
  @property() tooltip: 'top' | 'bottom' | 'none' = 'top';

  /**
   * A function used to format the tooltip's value. The range's value is passed as the first and only argument. The
   * function should return a string to display in the tooltip.
   */
  @property({ attribute: false }) tooltipFormatter: (value: number) => string = (value: number) => value.toString();

  /**
   * By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you
   * to place the form control outside of a form and associate it with the form that has this `id`. The form must be in
   * the same document or shadow root for this to work.
   */
  @property({ reflect: true }) form = '';

  /** The default value of the form control. Primarily used for resetting the form control. */
  @defaultValue() defaultValue = 0;

  connectedCallback() {
    super.connectedCallback();
    this.resizeObserver = new ResizeObserver(() => this.syncRange());

    if (this.value < this.min) {
      this.value = this.min;
    }
    if (this.value > this.max) {
      this.value = this.max;
    }

    this.updateComplete.then(() => {
      this.syncRange();
      this.resizeObserver.observe(this.input);
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver.unobserve(this.input);
  }

  private handleChange() {
    this.emit('sl-change');
  }

  private handleInput() {
    this.value = parseFloat(this.input.value);
    this.emit('sl-input');
    this.syncRange();
  }

  private handleBlur() {
    this.hasFocus = false;
    this.hasTooltip = false;
    this.emit('sl-blur');
  }

  private handleFocus() {
    this.hasFocus = true;
    this.hasTooltip = true;
    this.emit('sl-focus');
  }

  private handleThumbDragStart() {
    this.hasTooltip = true;
  }

  private handleThumbDragEnd() {
    this.hasTooltip = false;
  }

  private syncProgress(percent: number) {
    this.input.style.setProperty('--percent', `${percent * 100}%`);
  }

  private syncTooltip(percent: number) {
    if (this.output !== null) {
      const inputWidth = this.input.offsetWidth;
      const tooltipWidth = this.output.offsetWidth;
      const thumbSize = getComputedStyle(this.input).getPropertyValue('--thumb-size');
      const isRtl = this.localize.dir() === 'rtl';
      const percentAsWidth = inputWidth * percent;

      // The calculations are used to "guess" where the thumb is located. Since we're using the native range control
      // under the hood, we don't have access to the thumb's true coordinates. These measurements can be a pixel or two
      // off depending on the size of the control, thumb, and tooltip dimensions.
      if (isRtl) {
        const x = `${inputWidth - percentAsWidth}px + ${percent} * ${thumbSize}`;
        this.output.style.translate = `calc((${x} - ${tooltipWidth / 2}px - ${thumbSize} / 2))`;
      } else {
        const x = `${percentAsWidth}px - ${percent} * ${thumbSize}`;
        this.output.style.translate = `calc(${x} - ${tooltipWidth / 2}px + ${thumbSize} / 2)`;
      }
    }
  }

  @watch('value', { waitUntilFirstUpdate: true })
  handleValueChange() {
    this.formControlController.updateValidity();

    // The value may have constraints, so we set the native control's value and sync it back to ensure it adhere's to
    // min, max, and step properly
    this.input.value = this.value.toString();
    this.value = parseFloat(this.input.value);

    this.syncRange();
  }

  @watch('disabled', { waitUntilFirstUpdate: true })
  handleDisabledChange() {
    // Disabled form controls are always valid
    this.formControlController.setValidity(this.disabled);
  }

  @watch('hasTooltip', { waitUntilFirstUpdate: true })
  syncRange() {
    const percent = Math.max(0, (this.value - this.min) / (this.max - this.min));

    this.syncProgress(percent);

    if (this.tooltip !== 'none') {
      this.syncTooltip(percent);
    }
  }

  /** Sets focus on the range. */
  focus(options?: FocusOptions) {
    this.input.focus(options);
  }

  /** Removes focus from the range. */
  blur() {
    this.input.blur();
  }

  /** Increments the value of the range by the value of the step attribute. */
  stepUp() {
    this.input.stepUp();
    if (this.value !== Number(this.input.value)) {
      this.value = Number(this.input.value);
    }
  }

  /** Decrements the value of the range by the value of the step attribute. */
  stepDown() {
    this.input.stepDown();
    if (this.value !== Number(this.input.value)) {
      this.value = Number(this.input.value);
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

    // NOTE - always bind value after min/max, otherwise it will be clamped
    return html`
      <div
        part="form-control"
        class=${classMap({
          'form-control': true,
          'form-control--medium': true, // range only has one size
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
              range: true,
              'range--disabled': this.disabled,
              'range--focused': this.hasFocus,
              'range--rtl': this.localize.dir() === 'rtl',
              'range--tooltip-visible': this.hasTooltip,
              'range--tooltip-top': this.tooltip === 'top',
              'range--tooltip-bottom': this.tooltip === 'bottom'
            })}
            @mousedown=${this.handleThumbDragStart}
            @mouseup=${this.handleThumbDragEnd}
            @touchstart=${this.handleThumbDragStart}
            @touchend=${this.handleThumbDragEnd}
          >
            <input
              part="input"
              id="input"
              class="range__control"
              title=${this.title /* An empty title prevents browser validation tooltips from appearing on hover */}
              type="range"
              name=${ifDefined(this.name)}
              ?disabled=${this.disabled}
              min=${ifDefined(this.min)}
              max=${ifDefined(this.max)}
              step=${ifDefined(this.step)}
              .value=${live(this.value.toString())}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />
            ${this.tooltip !== 'none' && !this.disabled
              ? html`
                  <output part="tooltip" class="range__tooltip">
                    ${typeof this.tooltipFormatter === 'function' ? this.tooltipFormatter(this.value) : this.value}
                  </output>
                `
              : ''}
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
    'sl-range': SlRange;
  }
}
