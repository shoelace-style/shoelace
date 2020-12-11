import { Component, Element, Event, EventEmitter, Method, Prop, State, Watch, h } from '@stencil/core';
import color from 'color';
import { clamp } from '../../utilities/math';

/**
 * @since 2.0
 * @status stable
 *
 * @part base - The component's base wrapper.
 * @part trigger - The color picker's dropdown trigger.
 * @part swatches - The container that holds swatches.
 * @part swatch - Each individual swatch.
 * @part grid - The color grid.
 * @part grid-handle - The color grid's handle.
 * @part hue-slider - The hue slider.
 * @part opacity-slider - The opacity slider.
 * @part slider - Hue and opacity sliders.
 * @part slider-handle - Hue and opacity slider handles.
 * @part preview - The preview color.
 * @part input - The text input.
 * @part format-button - The toggle format button.
 */

@Component({
  tag: 'sl-color-picker',
  styleUrl: 'color-picker.scss',
  shadow: true
})
export class ColorPicker {
  bypassValueParse = false;
  dropdown: HTMLSlDropdownElement;
  input: HTMLSlInputElement;
  lastValueEmitted: string;
  menu: HTMLElement;
  previewButton: HTMLButtonElement;
  trigger: HTMLButtonElement;

  @Element() host: HTMLSlColorPickerElement;

  @State() inputValue = '';
  @State() hue = 0;
  @State() saturation = 100;
  @State() lightness = 100;
  @State() alpha = 100;
  @State() showCopyFeedback = false;

  /** The current color. */
  @Prop({ mutable: true, reflect: true }) value = '#ffffff';

  /**
   * The format to use for the display value. If opacity is enabled, these will translate to HEXA, RGBA, and HSLA
   * respectively. The color picker will always accept user input in any format (including CSS color names) and convert
   * it to the desired format.
   */
  @Prop({ mutable: true }) format: 'hex' | 'rgb' | 'hsl' = 'hex';

  /** Set to true to render the color picker inline rather than inside a dropdown. */
  @Prop() inline = false;

  /** Determines the size of the color picker's trigger. This has no effect on inline color pickers. */
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';

  /** Removes the format toggle. */
  @Prop() noToggle = false;

  /** The input's name attribute. */
  @Prop({ reflect: true }) name = '';

  /** Set to true to disable the color picker. */
  @Prop() disabled = false;

  /**
   * This will be true when the control is in an invalid state. Validity is determined by the `setCustomValidity()`
   * method using the browser's constraint validation API.
   */
  @Prop({ mutable: true, reflect: true }) invalid = false;

  /**
   * Enable this option to prevent the panel from being clipped when the component is placed inside a container with
   * `overflow: auto|scroll`.
   */
  @Prop() hoist = false;

  /** Whether to show the opacity slider. */
  @Prop() opacity = false;

  /** By default, the value will be set in lowercase. Set this to true to set it in uppercase instead. */
  @Prop() uppercase = false;

  /**
   * An array of predefined color swatches to display. Can include any format the color picker can parse, including
   * HEX(A), RGB(A), HSL(A), and CSS color names.
   */
  @Prop() swatches = [
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

  /** Emitted when the color picker's value changes. */
  @Event({ eventName: 'sl-change' }) slChange: EventEmitter;

  /** Emitted when the color picker opens. Calling `event.preventDefault()` will prevent it from being opened. */
  @Event({ eventName: 'sl-show' }) slShow: EventEmitter;

  /** Emitted after the color picker opens and all transitions are complete. */
  @Event({ eventName: 'sl-after-show' }) slAfterShow: EventEmitter;

  /** Emitted when the color picker closes. Calling `event.preventDefault()` will prevent it from being closed. */
  @Event({ eventName: 'sl-hide' }) slHide: EventEmitter;

  /** Emitted after the color picker closes and all transitions are complete. */
  @Event({ eventName: 'sl-after-hide' }) slAfterHide: EventEmitter;

  @Watch('format')
  handleFormatChange() {
    this.syncValues();
  }

  @Watch('opacity')
  handleOpacityChange() {
    this.alpha = 100;
  }

  @Watch('value')
  handleValueChange(newValue: string, oldValue: string) {
    if (!this.bypassValueParse) {
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
    }

    if (this.value !== this.lastValueEmitted) {
      this.slChange.emit();
      this.lastValueEmitted = this.value;
    }
  }

  connectedCallback() {
    this.handleAlphaDrag = this.handleAlphaDrag.bind(this);
    this.handleAlphaInput = this.handleAlphaInput.bind(this);
    this.handleAlphaKeyDown = this.handleAlphaKeyDown.bind(this);
    this.handleCopy = this.handleCopy.bind(this);
    this.handleFormatToggle = this.handleFormatToggle.bind(this);
    this.handleDocumentMouseDown = this.handleDocumentMouseDown.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleDropdownAfterHide = this.handleDropdownAfterHide.bind(this);
    this.handleDropdownAfterShow = this.handleDropdownAfterShow.bind(this);
    this.handleDropdownHide = this.handleDropdownHide.bind(this);
    this.handleDropdownShow = this.handleDropdownShow.bind(this);
    this.handleGridDrag = this.handleGridDrag.bind(this);
    this.handleGridKeyDown = this.handleGridKeyDown.bind(this);
    this.handleHueDrag = this.handleHueDrag.bind(this);
    this.handleHueInput = this.handleHueInput.bind(this);
    this.handleHueKeyDown = this.handleHueKeyDown.bind(this);
    this.handleLightnessInput = this.handleLightnessInput.bind(this);
    this.handleSaturationInput = this.handleSaturationInput.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
  }

  componentWillLoad() {
    if (!this.setColor(this.value)) {
      this.setColor(`#ffff`);
    }

    this.inputValue = this.value;
    this.lastValueEmitted = this.value;
    this.syncValues();
  }

  /** Returns the current value as a string in the specified format. */
  @Method()
  async getFormattedValue(format: 'hex' | 'hexa' | 'rgb' | 'rgba' | 'hsl' | 'hsla' = 'hex') {
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
  @Method()
  async reportValidity() {
    // If the input is invalid, show the dropdown so the browser can focus on it
    if (!this.inline && this.input.invalid) {
      return new Promise(resolve => {
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
  @Method()
  async setCustomValidity(message: string) {
    await this.input.setCustomValidity(message);
    this.invalid = this.input.invalid;
  }

  handleCopy() {
    this.input.select().then(() => {
      document.execCommand('copy');
      this.previewButton.focus();
      this.showCopyFeedback = true;
      this.previewButton.addEventListener('animationend', () => (this.showCopyFeedback = false), { once: true });
    });
  }

  handleFormatToggle() {
    const formats = ['hex', 'rgb', 'hsl'];
    const nextIndex = (formats.indexOf(this.format) + 1) % formats.length;
    this.format = formats[nextIndex] as 'hex' | 'rgb' | 'hsl';
  }

  handleHueInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.hue = clamp(Number(target.value), 0, 360);
  }

  handleSaturationInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.saturation = clamp(Number(target.value), 0, 100);
  }

  handleLightnessInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.lightness = clamp(Number(target.value), 0, 100);
  }

  handleAlphaInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.alpha = clamp(Number(target.value), 0, 100);
  }

  handleAlphaDrag(event: any) {
    const container = this.host.shadowRoot.querySelector('.color-picker__slider.color-picker__alpha') as HTMLElement;
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
    const container = this.host.shadowRoot.querySelector('.color-picker__slider.color-picker__hue') as HTMLElement;
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
    const grid = this.host.shadowRoot.querySelector('.color-picker__grid') as HTMLElement;
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
      return false;
    }

    const move = (event: any) => {
      const dims = container.getBoundingClientRect();
      const offsetX = dims.left + container.ownerDocument.defaultView.pageXOffset;
      const offsetY = dims.top + container.ownerDocument.defaultView.pageYOffset;
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

  handleDocumentMouseDown(event: MouseEvent) {
    const target = event.target as HTMLElement;

    // Close when clicking outside of the dropdown
    if (target.closest('sl-color-picker') !== this.host) {
      this.dropdown.hide();
    }
  }

  handleDropdownShow(event: CustomEvent) {
    event.stopPropagation();
    this.slShow.emit();
  }

  handleDropdownAfterShow(event: CustomEvent) {
    event.stopPropagation();
    this.slAfterShow.emit();
  }

  handleDropdownHide(event: CustomEvent) {
    event.stopPropagation();
    this.slHide.emit();
  }

  handleDropdownAfterHide(event: CustomEvent) {
    event.stopPropagation();
    this.slAfterHide.emit();
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
      return false;
    }

    // Update the value
    if (this.format === 'hsl') {
      this.inputValue = this.opacity ? currentColor.hsla.string : currentColor.hsl.string;
    } else if (this.format === 'rgb') {
      this.inputValue = this.opacity ? currentColor.rgba.string : currentColor.rgb.string;
    } else {
      this.inputValue = this.opacity ? currentColor.hexa : currentColor.hex;
    }

    // Setting this.value will trigger the watcher which parses the new color. We want to bypass that behavior because
    // a) we've already done it in this function and b) conversion/rounding can lead to values changing slightly.
    this.bypassValueParse = true;
    this.value = this.inputValue;
    this.bypassValueParse = false;
  }

  render() {
    const x = this.saturation;
    const y = 100 - this.lightness;

    const ColorPicker = () => {
      return (
        <div
          part="base"
          class={{
            'color-picker': true,
            'color-picker--inline': this.inline,
            'color-picker--disabled': this.disabled
          }}
          aria-disabled={this.disabled ? 'true' : 'false'}
        >
          <div
            part="grid"
            class="color-picker__grid"
            style={{
              backgroundColor: `hsl(${this.hue}deg, 100%, 50%)`
            }}
            onMouseDown={this.handleGridDrag}
            onTouchStart={this.handleGridDrag}
          >
            <span
              part="grid-handle"
              class="color-picker__grid-handle"
              style={{
                top: `${y}%`,
                left: `${x}%`,
                backgroundColor: `hsla(${this.hue}deg, ${this.saturation}%, ${this.lightness}%)`
              }}
              role="slider"
              aria-label="HSL"
              aria-valuetext={`hsl(${Math.round(this.hue)}, ${Math.round(this.saturation)}%, ${Math.round(
                this.lightness
              )}%)`}
              tabIndex={this.disabled ? null : 0}
              onKeyDown={this.handleGridKeyDown}
            />
          </div>

          <div class="color-picker__controls">
            <div class="color-picker__sliders">
              <div
                part="slider hue-slider"
                class="color-picker__hue color-picker__slider"
                onMouseDown={this.handleHueDrag}
                onTouchStart={this.handleHueDrag}
              >
                <span
                  part="slider-handle"
                  class="color-picker__slider-handle"
                  style={{
                    left: `${this.hue === 0 ? 0 : 100 / (360 / this.hue)}%`
                  }}
                  role="slider"
                  aria-label="hue"
                  aria-orientation="horizontal"
                  aria-valuemin="0"
                  aria-valuemax="360"
                  aria-valuenow={Math.round(this.hue)}
                  tabIndex={this.disabled ? null : 0}
                  onKeyDown={this.handleHueKeyDown}
                />
              </div>

              {this.opacity && (
                <div
                  part="slider opacity-slider"
                  class="color-picker__alpha color-picker__slider color-picker__transparent-bg"
                  onMouseDown={this.handleAlphaDrag}
                  onTouchStart={this.handleAlphaDrag}
                >
                  <div
                    class="color-picker__alpha-gradient"
                    style={{
                      backgroundImage: `linear-gradient(
                      to right,
                      hsl(${this.hue}deg, ${this.saturation}%, ${this.lightness}%, 0%) 0%,
                      hsl(${this.hue}deg, ${this.saturation}%, ${this.lightness}%) 100%
                      )`
                    }}
                  />
                  <span
                    part="slider-handle"
                    class="color-picker__slider-handle"
                    style={{
                      left: `${this.alpha}%`
                    }}
                    role="slider"
                    aria-label="alpha"
                    aria-orientation="horizontal"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow={Math.round(this.alpha)}
                    tabIndex={this.disabled ? null : 0}
                    onKeyDown={this.handleAlphaKeyDown}
                  />
                </div>
              )}
            </div>

            <button
              ref={el => (this.previewButton = el)}
              type="button"
              part="preview"
              class="color-picker__preview color-picker__transparent-bg"
              style={{
                '--preview-color': `hsla(${this.hue}deg, ${this.saturation}%, ${this.lightness}%, ${this.alpha / 100})`
              }}
              onClick={this.handleCopy}
            >
              <sl-icon
                name="check"
                class={{
                  'color-picker__copy-feedback': true,
                  'color-picker__copy-feedback--visible': this.showCopyFeedback,
                  'color-picker__copy-feedback--dark': this.lightness > 50
                }}
              />
            </button>
          </div>

          <div class="color-picker__user-input">
            <sl-input
              ref={el => (this.input = el)}
              part="input"
              size="small"
              type="text"
              name={this.name}
              autocomplete="off"
              autocorrect="off"
              autocapitalize="off"
              spellcheck={false}
              value={this.inputValue}
              disabled={this.disabled}
              onKeyDown={this.handleInputKeyDown}
              onSl-change={this.handleInputChange}
            />

            {!this.noToggle && (
              <sl-button part="format-button" size="small" onClick={this.handleFormatToggle}>
                {this.setLetterCase(this.format)}
              </sl-button>
            )}
          </div>

          {this.swatches && (
            <div part="swatches" class="color-picker__swatches">
              {this.swatches.map(swatch => (
                <div
                  part="swatch"
                  class="color-picker__swatch color-picker__transparent-bg"
                  tabIndex={this.disabled ? null : 0}
                  role="button"
                  aria-label={swatch}
                  onClick={() => !this.disabled && this.setColor(swatch)}
                  onKeyDown={event => !this.disabled && event.key === 'Enter' && this.setColor(swatch)}
                >
                  <div class="color-picker__swatch-color" style={{ backgroundColor: swatch }} />
                </div>
              ))}
            </div>
          )}
        </div>
      );
    };

    // Render inline
    if (this.inline) {
      return <ColorPicker />;
    }

    // Render as a dropdown
    return (
      <sl-dropdown
        ref={el => (this.dropdown = el)}
        class="color-dropdown"
        aria-disabled={this.disabled ? 'true' : 'false'}
        containingElement={this.host}
        hoist={this.hoist}
        onSl-show={this.handleDropdownShow}
        onSl-after-show={this.handleDropdownAfterShow}
        onSl-hide={this.handleDropdownHide}
        onSl-after-hide={this.handleDropdownAfterHide}
      >
        <button
          ref={el => (this.trigger = el)}
          part="trigger"
          slot="trigger"
          class={{
            'color-dropdown__trigger': true,
            'color-dropdown__trigger--disabled': this.disabled,
            'color-dropdown__trigger--small': this.size === 'small',
            'color-dropdown__trigger--medium': this.size === 'medium',
            'color-dropdown__trigger--large': this.size === 'large',
            'color-picker__transparent-bg': true
          }}
          style={{
            color: `hsla(${this.hue}deg, ${this.saturation}%, ${this.lightness}%, ${this.alpha / 100})`
          }}
          type="button"
        />
        <ColorPicker />
      </sl-dropdown>
    );
  }
}
