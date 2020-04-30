import { Component, h } from '@stencil/core';

@Component({
  tag: 'sl-color-picker',
  styleUrl: 'color-picker.scss',
  shadow: true
})
export class ColorPicker {
  menu: HTMLElement;
  trigger: HTMLElement;

  render() {
    return (
      <div ref={el => (this.trigger = el)} class="sl-color-picker">
        <div class="sl-color-picker__trigger">Trigger</div>

        <div ref={el => (this.menu = el)} class="sl-color-picker__menu">
          <div class="sl-color-picker__grid" style={{ backgroundColor: 'red' }}>
            <div class="sl-color-picker__grid-gradient" />
            <span
              class="sl-color-picker__sight"
              style={{
                transform: `translate(100px, 100px)`
              }}
            />
          </div>

          <div class="sl-color-picker__hue">
            <span
              class="sl-color-picker__slider"
              style={{
                transform: 'translateX(20px)'
              }}
            />
          </div>

          <div class="sl-color-picker__alpha">
            <div
              class="sl-color-picker__alpha-gradient"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(255, 0, 0, 0) 0%, rgb(255, 0, 0) 100%)`
              }}
            />
            <span
              class="sl-color-picker__slider"
              style={{
                transform: 'translateX(60px)'
              }}
            />
          </div>

          <div class="sl-color-picker__preview"></div>

          <div class="sl-color-picker__inputs">
            <div class="sl-color-picker__input sl-color-picker__input--hex">
              <label>Hex</label>
              <input type="text" pattern="[a-fA-F\d]+" />
            </div>

            <div class="sl-color-picker__input sl-color-picker__input--rgba">
              <label>R</label>
              <input type="number" min="0" max="255" />
            </div>

            <div class="sl-color-picker__input sl-color-picker__input--rgba">
              <label>G</label>
              <input type="number" min="0" max="255" />
            </div>

            <div class="sl-color-picker__input sl-color-picker__input--rgba">
              <label>B</label>
              <input type="number" min="0" max="255" />
            </div>

            <div class="sl-color-picker__input sl-color-picker__input--hsl">
              <label>H</label>
              <input type="number" min="0" max="255" />
            </div>

            <div class="sl-color-picker__input sl-color-picker__input--hsl">
              <label>S</label>
              <input type="number" min="0" max="255" />
            </div>

            <div class="sl-color-picker__input sl-color-picker__input--hsl">
              <label>L</label>
              <input type="number" min="0" max="255" />
            </div>

            <div class="sl-color-picker__input sl-color-picker__input--rgba">
              <label>A</label>
              <input type="number" min="0" max="100" />
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
