import { Component, State, h } from '@stencil/core';
import convert from 'color-convert';
import { clamp } from '../../utilities/math';

@Component({
  tag: 'sl-color-picker',
  styleUrl: 'color-picker.scss',
  shadow: true
})
export class ColorPicker {
  menu: HTMLElement;
  trigger: HTMLElement;

  constructor() {
    this.handleHueInput = this.handleHueInput.bind(this);
    this.handleSaturationInput = this.handleSaturationInput.bind(this);
    this.handleLightnessInput = this.handleLightnessInput.bind(this);
    this.handleAlphaInput = this.handleAlphaInput.bind(this);
  }

  @State() hue = 0;
  @State() saturation = 100;
  @State() lightness = 50;
  @State() alpha = 100;

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

  render() {
    const hsl = [this.hue, this.saturation, this.lightness];
    const rgb = convert.hsl.rgb(hsl);
    const hex = convert.hsl.hex(hsl);

    const x = clamp(this.saturation, 0, 100);
    const y = clamp(100 - this.lightness, 0, 100);

    return (
      <div ref={el => (this.trigger = el)} class="sl-color-picker">
        <div class="sl-color-picker__trigger">Trigger</div>
        <div ref={el => (this.menu = el)} class="sl-color-picker__menu">
          <div
            class="sl-color-picker__grid"
            style={{
              backgroundColor: `hsl(${this.hue}deg, 100%, 50%)`
            }}
          >
            <span
              class="sl-color-picker__sight"
              style={{
                top: `${y}%`,
                left: `${x}%`
              }}
            />
          </div>

          <div class="sl-color-picker__controls">
            <div class="sl-color-picker__sliders">
              <div class="sl-color-picker__hue sl-color-picker__slider">
                <span
                  class="sl-color-picker__slider-handle"
                  style={{
                    left: `${this.hue === 0 ? 0 : 100 / (360 / this.hue)}%`
                  }}
                />
              </div>

              <div class="sl-color-picker__alpha sl-color-picker__slider">
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
                  class="sl-color-picker__slider-handle"
                  style={{
                    left: `${this.alpha}%`
                  }}
                />
              </div>
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
              <label>Hex</label>
              <sl-input size="small" type="text" pattern="[a-fA-F\d]+" value={hex}>
                <span slot="prefix">#</span>
              </sl-input>
            </div>

            <div class="sl-color-picker__input sl-color-picker__input--rgb">
              <label>R</label>
              <sl-input size="small" type="number" min={0} max={255} inputmode="numeric" value={rgb[0]} />
            </div>

            <div class="sl-color-picker__input sl-color-picker__input--rgb">
              <label>G</label>
              <sl-input size="small" type="number" min={0} max={255} inputmode="numeric" value={rgb[1]} />
            </div>

            <div class="sl-color-picker__input sl-color-picker__input--rgb">
              <label>B</label>
              <sl-input size="small" type="number" min={0} max={255} inputmode="numeric" value={rgb[2]} />
            </div>

            <div class="sl-color-picker__input sl-color-picker__input--hsl">
              <label>H</label>
              <sl-input
                size="small"
                type="number"
                min={0}
                max={360}
                inputmode="numeric"
                value={this.hue.toString()}
                onInput={this.handleHueInput}
              />
            </div>

            <div class="sl-color-picker__input sl-color-picker__input--hsl">
              <label>S</label>
              <sl-input
                size="small"
                type="number"
                min={0}
                max={100}
                inputmode="numeric"
                value={this.saturation.toString()}
                onInput={this.handleSaturationInput}
              />
            </div>

            <div class="sl-color-picker__input sl-color-picker__input--hsl">
              <label>L</label>
              <sl-input
                size="small"
                type="number"
                min={0}
                max={100}
                inputmode="numeric"
                value={this.lightness.toString()}
                onInput={this.handleLightnessInput}
              />
            </div>

            <div class="sl-color-picker__input sl-color-picker__input--alpha">
              <label>A</label>
              <sl-input
                size="small"
                type="number"
                min={0}
                max={100}
                inputmode="numeric"
                value={this.alpha.toString()}
                onInput={this.handleAlphaInput}
              />
            </div>
          </div>

          <div class="sl-color-picker__swatches">
            <div class="sl-color-picker__swatch" style={{ backgroundColor: '#d0021b' }}></div>
            <div class="sl-color-picker__swatch" style={{ backgroundColor: '#f5a623' }}></div>
            <div class="sl-color-picker__swatch" style={{ backgroundColor: '#f8e71c' }}></div>
            <div class="sl-color-picker__swatch" style={{ backgroundColor: '#8b572a' }}></div>
            <div class="sl-color-picker__swatch" style={{ backgroundColor: '#7ed321' }}></div>
            <div class="sl-color-picker__swatch" style={{ backgroundColor: '#417505' }}></div>
            <div class="sl-color-picker__swatch" style={{ backgroundColor: '#bd10e0' }}></div>
            <div class="sl-color-picker__swatch" style={{ backgroundColor: '#9013fe' }}></div>
            <div class="sl-color-picker__swatch" style={{ backgroundColor: '#4a90e2' }}></div>
            <div class="sl-color-picker__swatch" style={{ backgroundColor: '#50e3c2' }}></div>
            <div class="sl-color-picker__swatch" style={{ backgroundColor: '#b8e986' }}></div>
            <div class="sl-color-picker__swatch" style={{ backgroundColor: '#000' }}></div>
            <div class="sl-color-picker__swatch" style={{ backgroundColor: '#444' }}></div>
            <div class="sl-color-picker__swatch" style={{ backgroundColor: '#888' }}></div>
            <div class="sl-color-picker__swatch" style={{ backgroundColor: '#ccc' }}></div>
            <div class="sl-color-picker__swatch" style={{ backgroundColor: '#fff' }}></div>
          </div>
        </div>
      </div>
    );
  }
}
