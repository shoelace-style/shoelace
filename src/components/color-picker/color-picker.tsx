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
  }

  @State() hue = 0;
  @State() saturation = 100;
  @State() lightness = 50;
  @State() alpha = 100;

  /** The current color. */
  @Prop({ mutable: true, reflect: true }) value = '';

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
    });
  }

  handleHueDrag(event: any) {
    const container = this.hueSlider;
    const { width } = container.getBoundingClientRect();

    this.hueHandle.focus();
    event.preventDefault();

    this.handleDrag(event, container, x => {
      this.hue = clamp(Math.round((x / width) * 360), 0, 360);
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

  setColor(color: string) {
    //
    // TODO:
    //
    // - detect what format the color is in
    // - parse it
    // - convert to HSL and update HSLA
    //
  }

  render() {
    const hsl = [this.hue, this.saturation, this.lightness];
    // const rgb = convert.hsl.rgb(hsl);
    const hex = convert.hsl.hex(hsl);
    const x = this.saturation;
    const y = 100 - this.lightness;

    return (
      <div ref={el => (this.trigger = el)} class="sl-color-picker">
        <div class="sl-color-picker__trigger">Trigger</div>
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
                  class="sl-color-picker__alpha sl-color-picker__slider"
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
              class="sl-color-picker__preview"
              style={{
                color: `hsla(${this.hue}deg, ${this.saturation}%, ${this.lightness}%, ${this.alpha}%)`
              }}
            />
          </div>

          <div class="sl-color-picker__inputs">
            <div class="sl-color-picker__input sl-color-picker__input--hex">
              <sl-input size="small" type="text" pattern="[a-fA-F\d]+" value={hex}>
                <span slot="prefix">#</span>
              </sl-input>
            </div>
          </div>

          {this.swatches && (
            <div class="sl-color-picker__swatches">
              {this.swatches.map(swatch => (
                <div class="sl-color-picker__swatch" style={{ backgroundColor: swatch }} tabIndex={0}></div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}
