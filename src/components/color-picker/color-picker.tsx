import { Component, Prop, State, h } from '@stencil/core';
import convert from 'color-convert';
import { clamp } from '../../utilities/math';

@Component({
  tag: 'sl-color-picker',
  styleUrl: 'color-picker.scss',
  shadow: true
})
export class ColorPicker {
  alphaSlider: HTMLElement;
  alphaHandle: HTMLElement;
  grid: HTMLElement;
  gridHandle: HTMLElement;
  hueSlider: HTMLElement;
  hueHandle: HTMLElement;
  menu: HTMLElement;
  trigger: HTMLElement;

  constructor() {
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
    this.handleUserInput = this.handleUserInput.bind(this);
  }

  @State() hue = 0;
  @State() saturation = 100;
  @State() lightness = 100;
  @State() alpha = 100;

  /** The current color. */
  @Prop({ mutable: true, reflect: true }) value = '';

  /**
   * The format to use for the generated color `value`. If opacity is enabled, these will translate to HEXA, RGBA, and
   * HSLA respectively. Note that browser support for HEXA doesn't include pre-Chromium Edge, so it's usually safer to
   * use RGBA or HSLA when using opacity.
   */
  @Prop() format: 'hex' | 'rgb' | 'hsl' = 'hex';

  /** Whether to show the opacity slider. */
  @Prop() opacity = false;

  /** An array of predefined color swatches to display. */
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

  componentDidLoad() {
    this.syncValue();
  }

  getHex() {
    const hsl = [this.hue, this.saturation, this.lightness];
    const hex = convert.hsl.hex(hsl);
    const alpha = Math.ceil((this.alpha * 255) / 100 + 0x10000)
      .toString(16)
      .substr(-2)
      .toUpperCase();

    if (this.opacity) {
      return `#${hex}${alpha}`;
    } else {
      return `#${hex}`;
    }
  }

  getRGB() {
    const hsl = [this.hue, this.saturation, this.lightness];
    const rgb = convert.hsl.rgb(hsl);

    if (this.opacity) {
      return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${this.alpha}%)`;
    } else {
      return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    }
  }

  getHSL() {
    const hsl = [this.hue, this.saturation, this.lightness];

    if (this.opacity) {
      return `hsla(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%, ${this.alpha}%)`;
    } else {
      return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
    }
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
      this.alpha = clamp(Math.round((x / width) * 100), 0, 100);
      this.syncValue();
    });
  }

  handleHueDrag(event: any) {
    const container = this.hueSlider;
    const { width } = container.getBoundingClientRect();

    this.hueHandle.focus();
    event.preventDefault();

    this.handleDrag(event, container, x => {
      this.hue = clamp(Math.round((x / width) * 360), 0, 360);
      this.syncValue();
    });
  }

  handleGridDrag(event: any) {
    const container = this.grid;
    const { width, height } = container.getBoundingClientRect();

    this.gridHandle.focus();
    event.preventDefault();

    this.handleDrag(event, container, (x, y) => {
      this.saturation = clamp(Math.round((x / width) * 100), 0, 100);
      this.lightness = clamp(Math.round(100 - (y / height) * 100), 0, 100);
      this.syncValue();
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
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.alpha = clamp(this.alpha + increment, 0, 100);
    }

    if (event.key === 'Home') {
      event.preventDefault();
      this.alpha = 0;
    }

    if (event.key === 'End') {
      event.preventDefault();
      this.alpha = 100;
    }
  }

  handleHueKeyDown(event: KeyboardEvent) {
    const increment = event.shiftKey ? 10 : 1;

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.hue = clamp(this.hue - increment, 0, 360);
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.hue = clamp(this.hue + increment, 0, 360);
    }

    if (event.key === 'Home') {
      event.preventDefault();
      this.hue = 0;
    }

    if (event.key === 'End') {
      event.preventDefault();
      this.hue = 360;
    }
  }

  handleGridKeyDown(event: KeyboardEvent) {
    const increment = event.shiftKey ? 10 : 1;

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.saturation = clamp(this.saturation - increment, 0, 100);
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.saturation = clamp(this.saturation + increment, 0, 100);
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.lightness = clamp(this.lightness + increment, 0, 100);
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.lightness = clamp(this.lightness - increment, 0, 100);
    }
  }

  handleUserInput(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;
    // this.setColor(target.value);
  }

  parseColor(color: string) {
    const hexPattern = /#?([a-f0-9]{1,2})([a-f0-9]{1,2})([a-f0-9]{1,2})([a-f0-9]{1,2})?/i;
    let hue = 0;
    let saturation = 0;
    let lightness = 0;
    let alpha = 100;

    color = color.trim().toLowerCase();

    // Parse RGB
    if (/^rgba?/i.test(color)) {
      const rgb = color.replace(/[^\d,.%]/g, '').split(',');
      [hue, saturation, lightness] = convert.rgb.hsl(rgb);

      if (rgb[3] && rgb[3].indexOf('%') > -1) {
        alpha = Number(rgb[3].replace('%', ''));
      } else if (rgb[3]) {
        alpha = Number(rgb[3]) * 100;
      }
    }

    // Parse HSL
    if (/^hsla?/i.test(color)) {
      const hsl = color.replace(/[^\d,.%]/g, '').split(',');
      hue = Number(hsl[0]);
      saturation = Number(hsl[0]);
      lightness = Number(hsl[0]);

      if (hsl[3] && hsl[3].indexOf('%') > -1) {
        alpha = Number(hsl[3].replace('%', ''));
      } else if (hsl[3]) {
        alpha = Number(hsl[3]) * 100;
      }
    }

    // Parse hex
    if (hexPattern.test(color)) {
      const hex = color.match(hexPattern).slice(1, 5);
      [hue, saturation, lightness] = convert.hex.hsl(hex.join(''));

      if (hex[3]) {
        alpha = Math.round((parseInt(hex[3], 16) / 255) * 100);
        console.log(hex[3], alpha);

        // const alpha = (Math.round((this.alpha * 255) / 100) + 0x10000).toString(16).substr(-2).toUpperCase();
      }
    }

    return {
      hue,
      saturation,
      lightness,
      alpha
    };
  }

  setColor(color: string) {
    const hsla = this.parseColor(color);
    this.hue = hsla.hue;
    this.saturation = hsla.saturation;
    this.lightness = hsla.lightness;
    this.alpha = this.opacity ? hsla.alpha : 100;
    this.syncValue();
  }

  syncValue() {
    if (this.format === 'hsl') {
      this.value = this.getHSL();
    } else if (this.format === 'rgb') {
      this.value = this.getRGB();
    } else {
      this.value = this.getHex();
    }
  }

  render() {
    const x = this.saturation;
    const y = 100 - this.lightness;

    return (
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
              aria-valuetext={`hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`}
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
                  aria-orientation="horizontal"
                  aria-valuemin="0"
                  aria-valuemax="360"
                  aria-valuenow={this.hue}
                  tabIndex={0}
                  onKeyDown={this.handleHueKeyDown}
                />
              </div>

              {this.opacity && (
                <div
                  ref={el => (this.alphaSlider = el)}
                  class="sl-color-picker__alpha sl-color-picker__slider  sl-color-picker__transparent-bg"
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
                    aria-orientation="horizontal"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow={this.alpha}
                    tabIndex={0}
                    onKeyDown={this.handleAlphaKeyDown}
                  />
                </div>
              )}
            </div>

            <div
              class="sl-color-picker__preview  sl-color-picker__transparent-bg"
              style={{
                color: `hsla(${this.hue}deg, ${this.saturation}%, ${this.lightness}%, ${this.alpha}%)`
              }}
            />
          </div>

          <div class="sl-color-picker__inputs">
            <div class="sl-color-picker__input">
              <sl-input
                size="small"
                type="text"
                pattern="[a-fA-F\d]+"
                value={this.value}
                onInput={this.handleUserInput}
              />
            </div>
          </div>

          {this.swatches && (
            <div class="sl-color-picker__swatches">
              {this.swatches.map(swatch => (
                // @ts-ignore
                <div
                  class="sl-color-picker__swatch sl-color-picker__transparent-bg"
                  tabIndex={0}
                  onClick={() => this.setColor(swatch)} // eslint-disable-line
                >
                  <div class="sl-color-picker__swatch-color" style={{ backgroundColor: swatch }} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}
