import { Component, Element, Event, EventEmitter, Prop, State, Watch, h } from '@stencil/core';
import color from 'color';
import { clamp } from '../../utilities/math';

@Component({
  tag: 'sl-color-picker',
  styleUrl: 'color-picker.scss',
  shadow: true
})
export class ColorPicker {
  alphaSlider: HTMLElement;
  alphaHandle: HTMLElement;
  bypassValueParse = false;
  dropdown: HTMLSlDropdownElement;
  grid: HTMLElement;
  gridHandle: HTMLElement;
  hueSlider: HTMLElement;
  hueHandle: HTMLElement;
  lastValueEmitted: string;
  menu: HTMLElement;
  textInput: HTMLSlInputElement;
  trigger: HTMLElement;

  constructor() {
    this.handleCopy = this.handleCopy.bind(this);
    this.handleHueInput = this.handleHueInput.bind(this);
    this.handleSaturationInput = this.handleSaturationInput.bind(this);
    this.handleLightnessInput = this.handleLightnessInput.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleAlphaInput = this.handleAlphaInput.bind(this);
    this.handleAlphaDrag = this.handleAlphaDrag.bind(this);
    this.handleAlphaKeyDown = this.handleAlphaKeyDown.bind(this);
    this.handleGridDrag = this.handleGridDrag.bind(this);
    this.handleGridKeyDown = this.handleGridKeyDown.bind(this);
    this.handleHueDrag = this.handleHueDrag.bind(this);
    this.handleHueKeyDown = this.handleHueKeyDown.bind(this);
    this.handleTextInputChange = this.handleTextInputChange.bind(this);
  }

  @Element() host: HTMLSlColorPickerElement;

  @State() textInputValue = '';
  @State() hue = 0;
  @State() saturation = 100;
  @State() lightness = 100;
  @State() alpha = 100;

  /** The current color. */
  @Prop({ mutable: true, reflect: true }) value = '#ffffff';

  /**
   * The format to use for the generated color `value`. If opacity is enabled, these will translate to HEXA, RGBA, and
   * HSLA respectively. Note that browser support for HEXA doesn't include pre-Chromium Edge, so it's usually safer to
   * use RGBA or HSLA when using opacity.
   */
  @Prop() format: 'hex' | 'rgb' | 'hsl' = 'hex';

  /** The color picker's trigger size. Only applies when `inline` is false. */
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';

  /** When true, the color picker will be rendered inline instead of in a dropdown. */
  @Prop() inline = false;

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
  @Event() slChange: EventEmitter;

  @Watch('value')
  handleValueChange(newValue: string, oldValue: string) {
    if (!this.bypassValueParse) {
      const newColor = this.parseColor(newValue);

      if (newColor) {
        this.textInputValue = this.value;
        this.hue = newColor.hsla.h;
        this.saturation = newColor.hsla.s;
        this.lightness = newColor.hsla.l;
        this.alpha = newColor.hsla.a * 100;
      } else {
        this.textInputValue = oldValue;
      }
    }

    if (this.value !== this.lastValueEmitted) {
      this.slChange.emit();
      this.lastValueEmitted = this.value;
    }
  }

  componentWillLoad() {
    if (!this.setColor(this.value)) {
      this.setColor(`#ffff`);
    }

    this.textInputValue = this.value;
    this.lastValueEmitted = this.value;
    this.syncValues();
  }

  componentDidLoad() {
    this.host.addEventListener('slShow', event => {});

    this.host.addEventListener('slHide', event => {
      //
      // TODO:
      //

      event.preventDefault();
    });
  }

  handleCopy() {
    this.textInput
      .select()
      .then(() => document.execCommand('copy'))
      .then(() => this.textInput.removeFocus());
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
    const container = this.alphaSlider;
    const { width } = container.getBoundingClientRect();

    this.alphaHandle.focus();
    event.preventDefault();

    this.handleDrag(event, container, x => {
      this.alpha = clamp((x / width) * 100, 0, 100);
      this.syncValues();
    });
  }

  handleHueDrag(event: any) {
    const container = this.hueSlider;
    const { width } = container.getBoundingClientRect();

    this.hueHandle.focus();
    event.preventDefault();

    this.handleDrag(event, container, x => {
      this.hue = clamp((x / width) * 360, 0, 360);
      this.syncValues();
    });
  }

  handleGridDrag(event: any) {
    const container = this.grid;
    const { width, height } = container.getBoundingClientRect();

    this.gridHandle.focus();
    event.preventDefault();

    this.handleDrag(event, container, (x, y) => {
      this.saturation = clamp((x / width) * 100, 0, 100);
      this.lightness = clamp(100 - (y / height) * 100, 0, 100);
      this.syncValues();
    });
  }

  handleDrag(event: any, container: HTMLElement, onMove: (x: number, y: number) => void) {
    const move = (event: any) => {
      const dims = container.getBoundingClientRect();
      const x = event.pageX - (dims.left + container.ownerDocument.defaultView.pageXOffset);
      const y = event.pageY - (dims.top + container.ownerDocument.defaultView.pageYOffset);
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

  handleTextInputChange(event: CustomEvent) {
    const target = event.target as HTMLInputElement;

    this.setColor(target.value);
    target.value = this.value;
    event.stopPropagation();
  }

  normalizeColorString(colorString: string) {
    //
    // The color module we're using doesn't parse % values for the alpha channel in RGBA and HSLA. It also doesn't parse
    // hex colors when the # is missing. This pre-parser tries to normalize these edge cases to provide a better
    // experience for users who type in color values.
    //
    if (/rgba?/.test(colorString)) {
      const rgba = colorString
        .replace(/[^\d.%]/g, ' ')
        .split(' ')
        .map(val => val.trim())
        .filter(val => val.length);

      if (rgba[3] && rgba[3].indexOf('%') > -1) {
        rgba[3] = (Number(rgba[3].replace(/%/g, '')) / 100).toString();
      }

      return `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})`;
    }

    if (/hsla?/.test(colorString)) {
      const hsla = colorString
        .replace(/[^\d.%]/g, ' ')
        .split(' ')
        .map(val => val.trim())
        .filter(val => val.length);

      if (hsla[3] && hsla[3].indexOf('%') > -1) {
        hsla[3] = (Number(hsla[3].replace(/%/g, '')) / 100).toString();
      }

      return `hsla(${hsla[0]}, ${hsla[1]}, ${hsla[2]}, ${hsla[3]})`;
    }

    if (/^[0-9a-f]+$/.test(colorString)) {
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
      this.textInputValue = this.opacity ? currentColor.hsla.string : currentColor.hsl.string;
    } else if (this.format === 'rgb') {
      this.textInputValue = this.opacity ? currentColor.rgba.string : currentColor.rgb.string;
    } else {
      this.textInputValue = this.opacity ? currentColor.hexa : currentColor.hex;
    }

    // Setting this.value will trigger the watcher which parses the new color. We want to bypass that behavior because
    // a) we've already done it in this function and b) conversion/rounding can lead to values changing slightly.
    this.bypassValueParse = true;
    this.value = this.textInputValue;
    this.bypassValueParse = false;
  }

  render() {
    const x = this.saturation;
    const y = 100 - this.lightness;

    const colorPicker = (
      <div ref={el => (this.trigger = el)} class="sl-color-picker">
        <div ref={el => (this.menu = el)} class="sl-color-picker__menu">
          <div
            ref={el => (this.grid = el)}
            class="sl-color-picker__grid"
            style={{
              backgroundColor: `hsl(${this.hue}deg, 100%, 50%)`
            }}
            onMouseDown={this.handleGridDrag}
            onTouchStart={this.handleGridDrag}
          >
            <span
              ref={el => (this.gridHandle = el)}
              class="sl-color-picker__grid-handle"
              style={{
                top: `${y}%`,
                left: `${x}%`
              }}
              role="slider"
              aria-label="HSL"
              aria-valuetext={`hsl(${Math.round(this.hue)}, ${Math.round(this.saturation)}%, ${Math.round(
                this.lightness
              )}%)`}
              tabIndex={0}
              onKeyDown={this.handleGridKeyDown}
            />
          </div>

          <div class="sl-color-picker__controls">
            <div class="sl-color-picker__sliders">
              <div
                ref={el => (this.hueSlider = el)}
                class="sl-color-picker__hue sl-color-picker__slider"
                onMouseDown={this.handleHueDrag}
                onTouchStart={this.handleHueDrag}
              >
                <span
                  ref={el => (this.hueHandle = el)}
                  class="sl-color-picker__slider-handle"
                  style={{
                    left: `${this.hue === 0 ? 0 : 100 / (360 / this.hue)}%`
                  }}
                  role="slider"
                  aria-label="hue"
                  aria-orientation="horizontal"
                  aria-valuemin="0"
                  aria-valuemax="360"
                  aria-valuenow={Math.round(this.hue)}
                  tabIndex={0}
                  onKeyDown={this.handleHueKeyDown}
                />
              </div>

              {this.opacity && (
                <div
                  ref={el => (this.alphaSlider = el)}
                  class="sl-color-picker__alpha sl-color-picker__slider sl-color-picker__transparent-bg"
                  onMouseDown={this.handleAlphaDrag}
                  onTouchStart={this.handleAlphaDrag}
                >
                  <div
                    class="sl-color-picker__alpha-gradient"
                    style={{
                      backgroundImage: `linear-gradient(
                        to right,
                        hsl(${this.hue}deg, ${this.saturation}%, ${this.lightness}%, 0%) 0%,
                        hsl(${this.hue}deg, ${this.saturation}%, ${this.lightness}%) 100%
                        )`
                    }}
                  />
                  <span
                    ref={el => (this.alphaHandle = el)}
                    class="sl-color-picker__slider-handle"
                    style={{
                      left: `${this.alpha}%`
                    }}
                    role="slider"
                    aria-label="alpha"
                    aria-orientation="horizontal"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow={Math.round(this.alpha)}
                    tabIndex={0}
                    onKeyDown={this.handleAlphaKeyDown}
                  />
                </div>
              )}
            </div>

            <div
              class="sl-color-picker__preview sl-color-picker__transparent-bg"
              role="button"
              aria-label="copy"
              style={{
                color: `hsla(${this.hue}deg, ${this.saturation}%, ${this.lightness}%, ${this.alpha / 100})`
              }}
              onClick={this.handleCopy}
            >
              <div class="sl-color-picker__copy">
                <sl-icon name="clipboard" />
              </div>
            </div>
          </div>

          <div class="sl-color-picker__text-input">
            <sl-input
              ref={el => (this.textInput = el)}
              size="small"
              type="text"
              pattern="[a-fA-F\d]+"
              value={this.textInputValue}
              onSlChange={this.handleTextInputChange}
            />
          </div>

          {this.swatches && (
            <div class="sl-color-picker__swatches">
              {this.swatches.map(swatch => (
                <div
                  class="sl-color-picker__swatch sl-color-picker__transparent-bg"
                  tabIndex={0}
                  role="button"
                  aria-label={swatch}
                  onClick={() => this.setColor(swatch)}
                  onKeyDown={event => event.key === 'Enter' && this.setColor(swatch)}
                >
                  <div class="sl-color-picker__swatch-color" style={{ backgroundColor: swatch }} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );

    if (this.inline) {
      return colorPicker;
    } else {
      return (
        <sl-dropdown ref={el => (this.dropdown = el)}>
          <span
            slot="trigger"
            class={{
              'sl-color-picker__trigger': true,
              'sl-color-picker__transparent-bg': true,

              'sl-color-picker__trigger--small': this.size === 'small',
              'sl-color-picker__trigger--medium': this.size === 'medium',
              'sl-color-picker__trigger--large': this.size === 'large'
            }}
            role="button"
            style={{
              color: `hsla(${this.hue}deg, ${this.saturation}%, ${this.lightness}%, ${this.alpha / 100})`
            }}
          />
          {colorPicker}
        </sl-dropdown>
      );
    }
  }
}
