import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit-html/directives/class-map';
import { ifDefined } from 'lit-html/directives/if-defined';
import { styleMap } from 'lit-html/directives/style-map';
import { emit } from '../../internal/event';
import { watch } from '../../internal/watch';
import { clamp } from '../../internal/math';
import type SlDropdown from '../dropdown/dropdown';
import type SlInput from '../input/input';
import color from 'color';
import styles from 'sass:./color-picker.scss';

/**
 * @since 2.0
 * @status stable
 *
 * @dependency sl-button
 * @dependency sl-dropdown
 * @dependency sl-icon
 * @dependency sl-input
 *
 * @event sl-change Emitted when the color picker's value changes.
 *
 * @csspart base - The component's base wrapper
 * @csspart trigger - The color picker's dropdown trigger.
 * @csspart swatches - The container that holds swatches.
 * @csspart swatch - Each individual swatch.
 * @csspart grid - The color grid.
 * @csspart grid-handle - The color grid's handle.
 * @csspart hue-slider - The hue slider.
 * @csspart opacity-slider - The opacity slider.
 * @csspart slider - Hue and opacity sliders.
 * @csspart slider-handle - Hue and opacity slider handles.
 * @csspart preview - The preview color.
 * @csspart input - The text input.
 * @csspart format-button - The toggle format button's base.
 *
 * @cssproperty --grid-width - The width of the color grid.
 * @cssproperty --grid-height - The height of the color grid.
 * @cssproperty --grid-handle-size - The size of the color grid's handle.
 * @cssproperty --slider-height - The height of the hue and alpha sliders.
 * @cssproperty --slider-handle-size - The diameter of the slider's handle.
 */
@customElement('sl-color-picker')
export default class SlColorPicker extends LitElement {
  static styles = unsafeCSS(styles);

  @query('[part="input"]') input: SlInput;
  @query('[part="preview"]') previewButton: HTMLButtonElement;
  @query('.color-dropdown') dropdown: SlDropdown;

  private lastValueEmitted: string;

  @state() private inputValue = '';
  @state() private hue = 0;
  @state() private saturation = 100;
  @state() private lightness = 100;
  @state() private alpha = 100;
  @state() private showCopyFeedback = false;

  /** The current color. */
  @property() value = '#ffffff';

  /**
   * The format to use for the display value. If opacity is enabled, these will translate to HEXA, RGBA, and HSLA
   * respectively. The color picker will always accept user input in any format (including CSS color names) and convert
   * it to the desired format.
   */
  @property() format: 'hex' | 'rgb' | 'hsl' = 'hex';

  /** Renders the color picker inline rather than inside a dropdown. */
  @property({ type: Boolean, reflect: true }) inline = false;

  /** Determines the size of the color picker's trigger. This has no effect on inline color pickers. */
  @property() size: 'small' | 'medium' | 'large' = 'medium';

  /** Removes the format toggle. */
  @property({ attribute: 'no-format-toggle', type: Boolean }) noFormatToggle = false;

  /** The input's name attribute. */
  @property() name = '';

  /** Disables the color picker. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * This will be true when the control is in an invalid state. Validity is determined by the `setCustomValidity()`
   * method using the browser's constraint validation API.
   */
  @property({ type: Boolean, reflect: true }) invalid = false;

  /**
   * Enable this option to prevent the panel from being clipped when the component is placed inside a container with
   * `overflow: auto|scroll`.
   */
  @property({ type: Boolean }) hoist = false;

  /** Whether to show the opacity slider. */
  @property({ type: Boolean }) opacity = false;

  /** By default, the value will be set in lowercase. Set this to true to set it in uppercase instead. */
  @property({ type: Boolean }) uppercase = false;

  /**
   * An array of predefined color swatches to display. Can include any format the color picker can parse, including
   * HEX(A), RGB(A), HSL(A), and CSS color names.
   */
  @property({ attribute: false }) swatches: string[] = [
    '#d0021b',
    '#f5a623',
    '#f8e71c',
    '#8b572a',
    '#7ed321',
    '#417505',
    '#bd10e0',
    '#9013fe',
    '#4a90e2',
    '#50e3c2',
    '#b8e986',
    '#000',
    '#444',
    '#888',
    '#ccc',
    '#fff'
  ];

  connectedCallback() {
    super.connectedCallback();

    if (!this.setColor(this.value)) {
      this.setColor(`#ffff`);
    }

    this.inputValue = this.value;
    this.lastValueEmitted = this.value;
    this.syncValues();
  }

  /** Returns the current value as a string in the specified format. */
  getFormattedValue(format: 'hex' | 'hexa' | 'rgb' | 'rgba' | 'hsl' | 'hsla' = 'hex') {
    const currentColor = this.parseColor(
      `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.alpha / 100})`
    );

    if (!currentColor) {
      return '';
    }

    switch (format) {
      case 'hex':
        return currentColor.hex;
      case 'hexa':
        return currentColor.hexa;
      case 'rgb':
        return currentColor.rgb.string;
      case 'rgba':
        return currentColor.rgba.string;
      case 'hsl':
        return currentColor.hsl.string;
      case 'hsla':
        return currentColor.hsla.string;
      default:
        return '';
    }
  }

  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  reportValidity() {
    // If the input is invalid, show the dropdown so the browser can focus on it
    if (!this.inline && this.input.invalid) {
      return new Promise<void>(resolve => {
        this.dropdown.addEventListener(
          'sl-after-show',
          () => {
            this.input.reportValidity();
            resolve();
          },
          { once: true }
        );
        this.dropdown.show();
      });
    } else {
      return this.input.reportValidity();
    }
  }

  /** Sets a custom validation message. If `message` is not empty, the field will be considered invalid. */
  setCustomValidity(message: string) {
    this.input.setCustomValidity(message);
    this.invalid = this.input.invalid;
  }

  handleCopy() {
    this.input.select();
    document.execCommand('copy');
    this.previewButton.focus();
    this.showCopyFeedback = true;
    this.previewButton.addEventListener('animationend', () => (this.showCopyFeedback = false), { once: true });
  }

  handleFormatToggle() {
    const formats = ['hex', 'rgb', 'hsl'];
    const nextIndex = (formats.indexOf(this.format) + 1) % formats.length;
    this.format = formats[nextIndex] as 'hex' | 'rgb' | 'hsl';
  }

  handleAlphaDrag(event: any) {
    const container = this.shadowRoot!.querySelector('.color-picker__slider.color-picker__alpha') as HTMLElement;
    const handle = container.querySelector('.color-picker__slider-handle') as HTMLElement;
    const { width } = container.getBoundingClientRect();

    handle.focus();
    event.preventDefault();

    this.handleDrag(event, container, x => {
      this.alpha = clamp((x / width) * 100, 0, 100);
      this.syncValues();
    });
  }

  handleHueDrag(event: any) {
    const container = this.shadowRoot!.querySelector('.color-picker__slider.color-picker__hue') as HTMLElement;
    const handle = container.querySelector('.color-picker__slider-handle') as HTMLElement;
    const { width } = container.getBoundingClientRect();

    handle.focus();
    event.preventDefault();

    this.handleDrag(event, container, x => {
      this.hue = clamp((x / width) * 360, 0, 360);
      this.syncValues();
    });
  }

  handleGridDrag(event: any) {
    const grid = this.shadowRoot!.querySelector('.color-picker__grid') as HTMLElement;
    const handle = grid.querySelector('.color-picker__grid-handle') as HTMLElement;
    const { width, height } = grid.getBoundingClientRect();

    handle.focus();
    event.preventDefault();

    this.handleDrag(event, grid, (x, y) => {
      this.saturation = clamp((x / width) * 100, 0, 100);
      this.lightness = clamp(100 - (y / height) * 100, 0, 100);
      this.syncValues();
    });
  }

  handleDrag(event: any, container: HTMLElement, onMove: (x: number, y: number) => void) {
    if (this.disabled) {
      return;
    }

    const move = (event: any) => {
      const dims = container.getBoundingClientRect();
      const defaultView = container.ownerDocument.defaultView!;
      const offsetX = dims.left + defaultView.pageXOffset;
      const offsetY = dims.top + defaultView.pageYOffset;
      const x = (event.changedTouches ? event.changedTouches[0].pageX : event.pageX) - offsetX;
      const y = (event.changedTouches ? event.changedTouches[0].pageY : event.pageY) - offsetY;

      onMove(x, y);
    };

    // Move on init
    move(event);

    const stop = () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('touchmove', move);
      document.removeEventListener('mouseup', stop);
      document.removeEventListener('touchend', stop);
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('touchmove', move);
    document.addEventListener('mouseup', stop);
    document.addEventListener('touchend', stop);
  }

  handleAlphaKeyDown(event: KeyboardEvent) {
    const increment = event.shiftKey ? 10 : 1;

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.alpha = clamp(this.alpha - increment, 0, 100);
      this.syncValues();
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.alpha = clamp(this.alpha + increment, 0, 100);
      this.syncValues();
    }

    if (event.key === 'Home') {
      event.preventDefault();
      this.alpha = 0;
      this.syncValues();
    }

    if (event.key === 'End') {
      event.preventDefault();
      this.alpha = 100;
      this.syncValues();
    }
  }

  handleHueKeyDown(event: KeyboardEvent) {
    const increment = event.shiftKey ? 10 : 1;

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.hue = clamp(this.hue - increment, 0, 360);
      this.syncValues();
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.hue = clamp(this.hue + increment, 0, 360);
      this.syncValues();
    }

    if (event.key === 'Home') {
      event.preventDefault();
      this.hue = 0;
      this.syncValues();
    }

    if (event.key === 'End') {
      event.preventDefault();
      this.hue = 360;
      this.syncValues();
    }
  }

  handleGridKeyDown(event: KeyboardEvent) {
    const increment = event.shiftKey ? 10 : 1;

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.saturation = clamp(this.saturation - increment, 0, 100);
      this.syncValues();
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.saturation = clamp(this.saturation + increment, 0, 100);
      this.syncValues();
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.lightness = clamp(this.lightness + increment, 0, 100);
      this.syncValues();
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.lightness = clamp(this.lightness - increment, 0, 100);
      this.syncValues();
    }
  }

  handleInputChange(event: CustomEvent) {
    const target = event.target as HTMLInputElement;

    this.setColor(target.value);
    target.value = this.value;
    event.stopPropagation();
  }

  handleInputKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.setColor(this.input.value);
      this.input.value = this.value;
      setTimeout(() => this.input.select());
    }
  }

  handleDropdownAfterHide() {
    this.showCopyFeedback = false;
  }

  normalizeColorString(colorString: string) {
    //
    // The color module we're using doesn't parse % values for the alpha channel in RGBA and HSLA. It also doesn't parse
    // hex colors when the # is missing. This pre-parser tries to normalize these edge cases to provide a better
    // experience for users who type in color values.
    //
    if (/rgba?/i.test(colorString)) {
      const rgba = colorString
        .replace(/[^\d.%]/g, ' ')
        .split(' ')
        .map(val => val.trim())
        .filter(val => val.length);

      if (rgba.length < 4) {
        rgba[3] = '1';
      }

      if (rgba[3].indexOf('%') > -1) {
        rgba[3] = (Number(rgba[3].replace(/%/g, '')) / 100).toString();
      }

      return `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})`;
    }

    if (/hsla?/i.test(colorString)) {
      const hsla = colorString
        .replace(/[^\d.%]/g, ' ')
        .split(' ')
        .map(val => val.trim())
        .filter(val => val.length);

      if (hsla.length < 4) {
        hsla[3] = '1';
      }

      if (hsla[3].indexOf('%') > -1) {
        hsla[3] = (Number(hsla[3].replace(/%/g, '')) / 100).toString();
      }

      return `hsla(${hsla[0]}, ${hsla[1]}, ${hsla[2]}, ${hsla[3]})`;
    }

    if (/^[0-9a-f]+$/i.test(colorString)) {
      return `#${colorString}`;
    }

    return colorString;
  }

  parseColor(colorString: string) {
    function toHex(value: number) {
      const hex = Math.round(value).toString(16);
      return hex.length === 1 ? `0${hex}` : hex;
    }

    let parsed: any;

    // The color module has a weak parser, so we normalize certain things to make the user experience better
    colorString = this.normalizeColorString(colorString);

    try {
      parsed = color(colorString);
    } catch {
      return false;
    }

    const hsl = {
      h: parsed.hsl().color[0],
      s: parsed.hsl().color[1],
      l: parsed.hsl().color[2],
      a: parsed.hsl().valpha
    };

    const rgb = {
      r: parsed.rgb().color[0],
      g: parsed.rgb().color[1],
      b: parsed.rgb().color[2],
      a: parsed.rgb().valpha
    };

    const hex = {
      r: toHex(parsed.rgb().color[0]),
      g: toHex(parsed.rgb().color[1]),
      b: toHex(parsed.rgb().color[2]),
      a: toHex(parsed.rgb().valpha * 255)
    };

    return {
      hsl: {
        h: hsl.h,
        s: hsl.s,
        l: hsl.l,
        string: this.setLetterCase(`hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`)
      },
      hsla: {
        h: hsl.h,
        s: hsl.s,
        l: hsl.l,
        a: hsl.a,
        string: this.setLetterCase(
          `hsla(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%, ${Number(
            hsl.a.toFixed(2).toString()
          )})`
        )
      },
      rgb: {
        r: rgb.r,
        g: rgb.g,
        b: rgb.b,
        string: this.setLetterCase(`rgb(${Math.round(rgb.r)}, ${Math.round(rgb.g)}, ${Math.round(rgb.b)})`)
      },
      rgba: {
        r: rgb.r,
        g: rgb.g,
        b: rgb.b,
        a: rgb.a,
        string: this.setLetterCase(
          `rgba(${Math.round(rgb.r)}, ${Math.round(rgb.g)}, ${Math.round(rgb.b)}, ${Number(
            rgb.a.toFixed(2).toString()
          )})`
        )
      },
      hex: this.setLetterCase(`#${hex.r}${hex.g}${hex.b}`),
      hexa: this.setLetterCase(`#${hex.r}${hex.g}${hex.b}${hex.a}`)
    };
  }

  setColor(colorString: string) {
    const newColor = this.parseColor(colorString);

    if (!newColor) {
      return false;
    }

    this.hue = newColor.hsla.h;
    this.saturation = newColor.hsla.s;
    this.lightness = newColor.hsla.l;
    this.alpha = this.opacity ? newColor.hsla.a * 100 : 100;

    this.syncValues();

    return true;
  }

  setLetterCase(string: string) {
    if (typeof string !== 'string') return '';
    return this.uppercase ? string.toUpperCase() : string.toLowerCase();
  }

  syncValues() {
    const currentColor = this.parseColor(
      `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.alpha / 100})`
    );

    if (!currentColor) {
      return;
    }

    // Update the value
    if (this.format === 'hsl') {
      this.inputValue = this.opacity ? currentColor.hsla.string : currentColor.hsl.string;
    } else if (this.format === 'rgb') {
      this.inputValue = this.opacity ? currentColor.rgba.string : currentColor.rgb.string;
    } else {
      this.inputValue = this.opacity ? currentColor.hexa : currentColor.hex;
    }

    this.value = this.inputValue;
  }

  @watch('format')
  handleFormatChange() {
    this.syncValues();
  }

  @watch('opacity')
  handleOpacityChange() {
    this.alpha = 100;
  }

  @watch('value')
  handleValueChange(oldValue: string, newValue: string) {
    const newColor = this.parseColor(newValue);

    if (newColor) {
      this.inputValue = this.value;
      this.hue = newColor.hsla.h;
      this.saturation = newColor.hsla.s;
      this.lightness = newColor.hsla.l;
      this.alpha = newColor.hsla.a * 100;
    } else {
      this.inputValue = oldValue;
    }

    if (this.value !== this.lastValueEmitted) {
      emit(this, 'sl-change');
      this.lastValueEmitted = this.value;
    }
  }

  render() {
    const x = this.saturation;
    const y = 100 - this.lightness;

    const colorPicker = html`
      <div
        part="base"
        class=${classMap({
          'color-picker': true,
          'color-picker--inline': this.inline,
          'color-picker--disabled': this.disabled
        })}
        aria-disabled=${this.disabled ? 'true' : 'false'}
      >
        <div
          part="grid"
          class="color-picker__grid"
          style=${styleMap({ backgroundColor: `hsl(${this.hue}deg, 100%, 50%)` })}
          @mousedown=${this.handleGridDrag}
          @touchstart=${this.handleGridDrag}
        >
          <span
            part="grid-handle"
            class="color-picker__grid-handle"
            style=${styleMap({
              top: `${y}%`,
              left: `${x}%`,
              backgroundColor: `hsla(${this.hue}deg, ${this.saturation}%, ${this.lightness}%)`
            })}
            role="slider"
            aria-label="HSL"
            aria-valuetext=${`hsl(${Math.round(this.hue)}, ${Math.round(this.saturation)}%, ${Math.round(
              this.lightness
            )}%)`}
            tabindex=${ifDefined(this.disabled ? undefined : '0')}
            @keydown=${this.handleGridKeyDown}
          ></span>
        </div>

        <div class="color-picker__controls">
          <div class="color-picker__sliders">
            <div
              part="slider hue-slider"
              class="color-picker__hue color-picker__slider"
              @mousedown=${this.handleHueDrag}
              @touchstart=${this.handleHueDrag}
            >
              <span
                part="slider-handle"
                class="color-picker__slider-handle"
                style=${styleMap({
                  left: `${this.hue === 0 ? 0 : 100 / (360 / this.hue)}%`
                })}
                role="slider"
                aria-label="hue"
                aria-orientation="horizontal"
                aria-valuemin="0"
                aria-valuemax="360"
                aria-valuenow=${Math.round(this.hue)}
                tabindex=${ifDefined(this.disabled ? undefined : '0')}
                @keydown=${this.handleHueKeyDown}
              ></span>
            </div>

            ${this.opacity
              ? html`
                  <div
                    part="slider opacity-slider"
                    class="color-picker__alpha color-picker__slider color-picker__transparent-bg"
                    @mousedown="${this.handleAlphaDrag}"
                    @touchstart="${this.handleAlphaDrag}"
                  >
                    <div
                      class="color-picker__alpha-gradient"
                      style=${styleMap({
                        backgroundImage: `linear-gradient(
                          to right,
                          hsl(${this.hue}deg, ${this.saturation}%, ${this.lightness}%, 0%) 0%,
                          hsl(${this.hue}deg, ${this.saturation}%, ${this.lightness}%) 100%
                        )`
                      })}
                    ></div>
                    <span
                      part="slider-handle"
                      class="color-picker__slider-handle"
                      style=${styleMap({
                        left: `${this.alpha}%`
                      })}
                      role="slider"
                      aria-label="alpha"
                      aria-orientation="horizontal"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-valuenow=${Math.round(this.alpha)}
                      tabindex=${ifDefined(this.disabled ? undefined : '0')}
                      @keydown=${this.handleAlphaKeyDown}
                    ></span>
                  </div>
                `
              : ''}
          </div>

          <button
            type="button"
            part="preview"
            class="color-picker__preview color-picker__transparent-bg"
            style=${styleMap({
              '--preview-color': `hsla(${this.hue}deg, ${this.saturation}%, ${this.lightness}%, ${this.alpha / 100})`
            })}
            @click=${this.handleCopy}
          >
            <sl-icon
              name="check"
              library="system"
              class=${classMap({
                'color-picker__copy-feedback': true,
                'color-picker__copy-feedback--visible': this.showCopyFeedback,
                'color-picker__copy-feedback--dark': this.lightness > 50
              })}
            ></sl-icon>
          </button>
        </div>

        <div class="color-picker__user-input">
          <sl-input
            part="input"
            size="small"
            type="text"
            name=${this.name}
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            .value=${this.inputValue}
            ?disabled=${this.disabled}
            @keydown=${this.handleInputKeyDown}
            @sl-change=${this.handleInputChange}
          ></sl-input>

          ${!this.noFormatToggle
            ? html`
                <sl-button exportparts="base:format-button" size="small" @click=${this.handleFormatToggle}>
                  ${this.setLetterCase(this.format)}
                </sl-button>
              `
            : ''}
        </div>

        ${this.swatches
          ? html`
              <div part="swatches" class="color-picker__swatches">
                ${this.swatches.map(swatch => {
                  return html`
                    <div
                      part="swatch"
                      class="color-picker__swatch color-picker__transparent-bg"
                      tabindex=${ifDefined(this.disabled ? undefined : '0')}
                      role="button"
                      aria-label=${swatch}
                      @click=${() => !this.disabled && this.setColor(swatch)}
                      @keydown=${(event: KeyboardEvent) =>
                        !this.disabled && event.key === 'Enter' && this.setColor(swatch)}
                    >
                      <div class="color-picker__swatch-color" style=${styleMap({ backgroundColor: swatch })}></div>
                    </div>
                  `;
                })}
              </div>
            `
          : ''}
      </div>
    `;

    // Render inline
    if (this.inline) {
      return colorPicker;
    }

    // Render as a dropdown
    return html`
      <sl-dropdown
        class="color-dropdown"
        aria-disabled=${this.disabled ? 'true' : 'false'}
        .containing-element=${this}
        ?disabled=${this.disabled}
        ?hoist=${this.hoist}
        @sl-after-hide=${this.handleDropdownAfterHide}
      >
        <button
          part="trigger"
          slot="trigger"
          class=${classMap({
            'color-dropdown__trigger': true,
            'color-dropdown__trigger--disabled': this.disabled,
            'color-dropdown__trigger--small': this.size === 'small',
            'color-dropdown__trigger--medium': this.size === 'medium',
            'color-dropdown__trigger--large': this.size === 'large',
            'color-picker__transparent-bg': true
          })}
          style=${styleMap({
            color: `hsla(${this.hue}deg, ${this.saturation}%, ${this.lightness}%, ${this.alpha / 100})`
          })}
          type="button"
        ></button>
        ${colorPicker}
      </sl-dropdown>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-color-picker': SlColorPicker;
  }
}
