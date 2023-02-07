import '../button-group/button-group';
import '../button/button';
import '../dropdown/dropdown';
import '../icon/icon';
import '../input/input';
import '../visually-hidden/visually-hidden';
import { clamp } from '../../internal/math';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, query, state } from 'lit/decorators.js';
import { defaultValue } from '../../internal/default-value';
import { drag } from '../../internal/drag';
import { FormControlController } from '../../internal/form';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { LocalizeController } from '../../utilities/localize';
import { styleMap } from 'lit/directives/style-map.js';
import { TinyColor } from '@ctrl/tinycolor';
import { watch } from '../../internal/watch';
import ShoelaceElement from '../../internal/shoelace-element';
import styles from './color-picker.styles';
import type { CSSResultGroup } from 'lit';
import type { ShoelaceFormControl } from '../../internal/shoelace-element';
import type SlDropdown from '../dropdown/dropdown';
import type SlInput from '../input/input';

const hasEyeDropper = 'EyeDropper' in window;

interface EyeDropperConstructor {
  new (): EyeDropperInterface;
}

interface EyeDropperInterface {
  open: () => Promise<{ sRGBHex: string }>;
}

declare const EyeDropper: EyeDropperConstructor;

/**
 * @summary Color pickers allow the user to select a color.
 * @documentation https://shoelace.style/components/color-picker
 * @status stable
 * @since 2.0
 *
 * @dependency sl-button
 * @dependency sl-button-group
 * @dependency sl-dropdown
 * @dependency sl-input
 * @dependency sl-visually-hidden
 *
 * @slot label - The color picker's form label. Alternatively, you can use the `label` attribute.
 *
 * @event sl-change Emitted when the color picker's value changes.
 * @event sl-input Emitted when the color picker receives input.
 *
 * @csspart base - The component's base wrapper.
 * @csspart trigger - The color picker's dropdown trigger.
 * @csspart swatches - The container that holds the swatches.
 * @csspart swatch - Each individual swatch.
 * @csspart grid - The color grid.
 * @csspart grid-handle - The color grid's handle.
 * @csspart slider - Hue and opacity sliders.
 * @csspart slider-handle - Hue and opacity slider handles.
 * @csspart hue-slider - The hue slider.
 * @csspart hue-slider-handle - The hue slider's handle.
 * @csspart opacity-slider - The opacity slider.
 * @csspart opacity-slider-handle - The opacity slider's handle.
 * @csspart preview - The preview color.
 * @csspart input - The text input.
 * @csspart eye-dropper-button - The eye dropper button.
 * @csspart eye-dropper-button__base - The eye dropper button's exported `button` part.
 * @csspart eye-dropper-button__prefix - The eye dropper button's exported `prefix` part.
 * @csspart eye-dropper-button__label - The eye dropper button's exported `label` part.
 * @csspart eye-dropper-button__suffix - The eye dropper button's exported `suffix` part.
 * @csspart eye-dropper-button__caret - The eye dropper button's exported `caret` part.
 * @csspart format-button - The format button.
 * @csspart format-button__base - The format button's exported `button` part.
 * @csspart format-button__prefix - The format button's exported `prefix` part.
 * @csspart format-button__label - The format button's exported `label` part.
 * @csspart format-button__suffix - The format button's exported `suffix` part.
 * @csspart format-button__caret - The format button's exported `caret` part.
 *
 * @cssproperty --grid-width - The width of the color grid.
 * @cssproperty --grid-height - The height of the color grid.
 * @cssproperty --grid-handle-size - The size of the color grid's handle.
 * @cssproperty --slider-height - The height of the hue and alpha sliders.
 * @cssproperty --slider-handle-size - The diameter of the slider's handle.
 * @cssproperty --swatch-size - The size of each predefined color swatch.
 */
@customElement('sl-color-picker')
export default class SlColorPicker extends ShoelaceElement implements ShoelaceFormControl {
  static styles: CSSResultGroup = styles;

  private readonly formControlController = new FormControlController(this);
  private isSafeValue = false;
  private readonly localize = new LocalizeController(this);

  @query('[part~="input"]') input: SlInput;
  @query('[part~="preview"]') previewButton: HTMLButtonElement;
  @query('.color-dropdown') dropdown: SlDropdown;

  @state() private isDraggingGridHandle = false;
  @state() private isEmpty = false;
  @state() private inputValue = '';
  @state() private hue = 0;
  @state() private saturation = 100;
  @state() private brightness = 100;
  @state() private alpha = 100;

  /**
   * The current value of the color picker. The value's format will vary based the `format` attribute. To get the value
   * in a specific format, use the `getFormattedValue()` method. The value is submitted as a name/value pair with form
   * data.
   */
  @property() value = '';

  /** The default value of the form control. Primarily used for resetting the form control. */
  @defaultValue() defaultValue = '';

  /**
   * The color picker's label. This will not be displayed, but it will be announced by assistive devices. If you need to
   * display HTML, you can use the `label` slot` instead.
   */
  @property() label = '';

  /**
   * The format to use. If opacity is enabled, these will translate to HEXA, RGBA, HSLA, and HSVA respectively. The color
   * picker will accept user input in any format (including CSS color names) and convert it to the desired format.
   */
  @property() format: 'hex' | 'rgb' | 'hsl' | 'hsv' = 'hex';

  /** Renders the color picker inline rather than in a dropdown. */
  @property({ type: Boolean, reflect: true }) inline = false;

  /** Determines the size of the color picker's trigger. This has no effect on inline color pickers. */
  @property() size: 'small' | 'medium' | 'large' = 'medium';

  /** Removes the button that lets users toggle between format.   */
  @property({ attribute: 'no-format-toggle', type: Boolean }) noFormatToggle = false;

  /** The name of the form control, submitted as a name/value pair with form data. */
  @property() name = '';

  /** Disables the color picker. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * Enable this option to prevent the panel from being clipped when the component is placed inside a container with
   * `overflow: auto|scroll`. Hoisting uses a fixed positioning strategy that works in many, but not all, scenarios.
   */
  @property({ type: Boolean }) hoist = false;

  /** Shows the opacity slider. Enabling this will cause the formatted value to be HEXA, RGBA, or HSLA. */
  @property({ type: Boolean }) opacity = false;

  /** By default, values are lowercase. With this attribute, values will be uppercase instead. */
  @property({ type: Boolean }) uppercase = false;

  /**
   * One or more predefined color swatches to display as presets in the color picker. Can include any format the color
   * picker can parse, including HEX(A), RGB(A), HSL(A), HSV(A), and CSS color names. Each color must be separated by a
   * semicolon (`;`). Alternatively, you can pass an array of color values to this property using JavaScript.
   */
  @property() swatches: string | string[] = '';

  /**
   * By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you
   * to place the form control outside of a form and associate it with the form that has this `id`. The form must be in
   * the same document or shadow root for this to work.
   */
  @property({ reflect: true }) form = '';

  private handleCopy() {
    this.input.select();
    document.execCommand('copy');
    this.previewButton.focus();

    // Show copied animation
    this.previewButton.classList.add('color-picker__preview-color--copied');
    this.previewButton.addEventListener('animationend', () => {
      this.previewButton.classList.remove('color-picker__preview-color--copied');
    });
  }

  private handleFormatToggle() {
    const formats = ['hex', 'rgb', 'hsl', 'hsv'];
    const nextIndex = (formats.indexOf(this.format) + 1) % formats.length;
    this.format = formats[nextIndex] as 'hex' | 'rgb' | 'hsl' | 'hsv';
    this.setColor(this.value);
    this.emit('sl-change');
    this.emit('sl-input');
  }

  private handleAlphaDrag(event: PointerEvent) {
    const container = this.shadowRoot!.querySelector<HTMLElement>('.color-picker__slider.color-picker__alpha')!;
    const handle = container.querySelector<HTMLElement>('.color-picker__slider-handle')!;
    const { width } = container.getBoundingClientRect();
    let oldValue = this.value;

    handle.focus();
    event.preventDefault();

    drag(container, {
      onMove: x => {
        this.alpha = clamp((x / width) * 100, 0, 100);
        this.syncValues();

        if (this.value !== oldValue) {
          oldValue = this.value;
          this.emit('sl-change');
          this.emit('sl-input');
        }
      },
      initialEvent: event
    });
  }

  private handleHueDrag(event: PointerEvent) {
    const container = this.shadowRoot!.querySelector<HTMLElement>('.color-picker__slider.color-picker__hue')!;
    const handle = container.querySelector<HTMLElement>('.color-picker__slider-handle')!;
    const { width } = container.getBoundingClientRect();
    let oldValue = this.value;

    handle.focus();
    event.preventDefault();

    drag(container, {
      onMove: x => {
        this.hue = clamp((x / width) * 360, 0, 360);
        this.syncValues();

        if (this.value !== oldValue) {
          oldValue = this.value;
          this.emit('sl-change');
          this.emit('sl-input');
        }
      },
      initialEvent: event
    });
  }

  private handleGridDrag(event: PointerEvent) {
    const grid = this.shadowRoot!.querySelector<HTMLElement>('.color-picker__grid')!;
    const handle = grid.querySelector<HTMLElement>('.color-picker__grid-handle')!;
    const { width, height } = grid.getBoundingClientRect();
    let oldValue = this.value;

    handle.focus();
    event.preventDefault();

    this.isDraggingGridHandle = true;

    drag(grid, {
      onMove: (x, y) => {
        this.saturation = clamp((x / width) * 100, 0, 100);
        this.brightness = clamp(100 - (y / height) * 100, 0, 100);
        this.syncValues();

        if (this.value !== oldValue) {
          oldValue = this.value;
          this.emit('sl-change');
          this.emit('sl-input');
        }
      },
      onStop: () => (this.isDraggingGridHandle = false),
      initialEvent: event
    });
  }

  private handleAlphaKeyDown(event: KeyboardEvent) {
    const increment = event.shiftKey ? 10 : 1;
    const oldValue = this.value;

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

    if (this.value !== oldValue) {
      this.emit('sl-change');
      this.emit('sl-input');
    }
  }

  private handleHueKeyDown(event: KeyboardEvent) {
    const increment = event.shiftKey ? 10 : 1;
    const oldValue = this.value;

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

    if (this.value !== oldValue) {
      this.emit('sl-change');
      this.emit('sl-input');
    }
  }

  private handleGridKeyDown(event: KeyboardEvent) {
    const increment = event.shiftKey ? 10 : 1;
    const oldValue = this.value;

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
      this.brightness = clamp(this.brightness + increment, 0, 100);
      this.syncValues();
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.brightness = clamp(this.brightness - increment, 0, 100);
      this.syncValues();
    }

    if (this.value !== oldValue) {
      this.emit('sl-change');
      this.emit('sl-input');
    }
  }

  private handleInputChange(event: CustomEvent) {
    const target = event.target as HTMLInputElement;
    const oldValue = this.value;

    // Prevent the <sl-input>'s sl-change event from bubbling up
    event.stopPropagation();

    if (this.input.value) {
      this.setColor(target.value);
      target.value = this.value;
    } else {
      this.value = '';
    }

    if (this.value !== oldValue) {
      this.emit('sl-change');
      this.emit('sl-input');
    }
  }

  private handleInputInput(event: CustomEvent) {
    // Prevent the <sl-input>'s sl-input event from bubbling up
    event.stopPropagation();
  }

  private handleInputKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const oldValue = this.value;

      if (this.input.value) {
        this.setColor(this.input.value);
        this.input.value = this.value;

        if (this.value !== oldValue) {
          this.emit('sl-change');
          this.emit('sl-input');
        }

        setTimeout(() => this.input.select());
      } else {
        this.hue = 0;
      }
    }
  }

  private handleTouchMove(event: TouchEvent) {
    event.preventDefault();
  }

  private parseColor(colorString: string) {
    const color = new TinyColor(colorString);
    if (!color.isValid) {
      return null;
    }

    const hslColor = color.toHsl();
    // Adjust saturation and lightness from 0-1 to 0-100
    const hsl = {
      h: hslColor.h,
      s: hslColor.s * 100,
      l: hslColor.l * 100,
      a: hslColor.a
    };

    const rgb = color.toRgb();

    const hex = color.toHexString();
    const hexa = color.toHex8String();

    const hsvColor = color.toHsv();
    // Adjust saturation and value from 0-1 to 0-100
    const hsv = {
      h: hsvColor.h,
      s: hsvColor.s * 100,
      v: hsvColor.v * 100,
      a: hsvColor.a
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
          `hsla(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%, ${hsl.a.toFixed(2).toString()})`
        )
      },
      hsv: {
        h: hsv.h,
        s: hsv.s,
        v: hsv.v,
        string: this.setLetterCase(`hsv(${Math.round(hsv.h)}, ${Math.round(hsv.s)}%, ${Math.round(hsv.v)}%)`)
      },
      hsva: {
        h: hsv.h,
        s: hsv.s,
        v: hsv.v,
        a: hsv.a,
        string: this.setLetterCase(
          `hsva(${Math.round(hsv.h)}, ${Math.round(hsv.s)}%, ${Math.round(hsv.v)}%, ${hsv.a.toFixed(2).toString()})`
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
          `rgba(${Math.round(rgb.r)}, ${Math.round(rgb.g)}, ${Math.round(rgb.b)}, ${rgb.a.toFixed(2).toString()})`
        )
      },
      hex: this.setLetterCase(hex),
      hexa: this.setLetterCase(hexa)
    };
  }

  private setColor(colorString: string) {
    const newColor = this.parseColor(colorString);

    if (newColor === null) {
      return false;
    }

    this.hue = newColor.hsva.h;
    this.saturation = newColor.hsva.s;
    this.brightness = newColor.hsva.v;
    this.alpha = this.opacity ? newColor.hsva.a * 100 : 100;

    this.syncValues();

    return true;
  }

  private setLetterCase(string: string) {
    if (typeof string !== 'string') {
      return '';
    }
    return this.uppercase ? string.toUpperCase() : string.toLowerCase();
  }

  private async syncValues() {
    const currentColor = this.parseColor(
      `hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha / 100})`
    );

    if (currentColor === null) {
      return;
    }

    // Update the value
    if (this.format === 'hsl') {
      this.inputValue = this.opacity ? currentColor.hsla.string : currentColor.hsl.string;
    } else if (this.format === 'rgb') {
      this.inputValue = this.opacity ? currentColor.rgba.string : currentColor.rgb.string;
    } else if (this.format === 'hsv') {
      this.inputValue = this.opacity ? currentColor.hsva.string : currentColor.hsv.string;
    } else {
      this.inputValue = this.opacity ? currentColor.hexa : currentColor.hex;
    }

    // Setting this.value will trigger the watcher which parses the new value. We want to bypass that behavior because
    // we've already parsed the color here and conversion/rounding can lead to values changing slightly. When this
    // happens, dragging the grid handle becomes jumpy. After the next update, the usual behavior is restored.
    this.isSafeValue = true;
    this.value = this.inputValue;
    await this.updateComplete;
    this.isSafeValue = false;
  }

  private handleAfterHide() {
    this.previewButton.classList.remove('color-picker__preview-color--copied');
  }

  private handleEyeDropper() {
    if (!hasEyeDropper) {
      return;
    }

    const eyeDropper = new EyeDropper();

    eyeDropper
      .open()
      .then(colorSelectionResult => {
        const oldValue = this.value;

        this.setColor(colorSelectionResult.sRGBHex);

        if (this.value !== oldValue) {
          this.emit('sl-change');
          this.emit('sl-input');
        }
      })
      .catch(() => {
        // The user canceled, do nothing
      });
  }

  private selectSwatch(color: string) {
    const oldValue = this.value;

    if (!this.disabled) {
      this.setColor(color);

      if (this.value !== oldValue) {
        this.emit('sl-change');
        this.emit('sl-input');
      }
    }
  }

  /** Generates a hex string from HSV values. Hue must be 0-360. All other arguments must be 0-100. */
  private getHexString(hue: number, saturation: number, brightness: number, alpha = 100) {
    const color = new TinyColor(`hsva(${hue}, ${saturation}, ${brightness}, ${alpha / 100})`);
    if (!color.isValid) {
      return '';
    }

    return color.toHex8String();
  }

  @watch('format', { waitUntilFirstUpdate: true })
  handleFormatChange() {
    this.syncValues();
  }

  @watch('opacity', { waitUntilFirstUpdate: true })
  handleOpacityChange() {
    this.alpha = 100;
  }

  @watch('value')
  handleValueChange(oldValue: string | undefined, newValue: string) {
    this.isEmpty = !newValue;

    if (!newValue) {
      this.hue = 0;
      this.saturation = 0;
      this.brightness = 100;
      this.alpha = 100;
    }

    if (!this.isSafeValue) {
      const newColor = this.parseColor(newValue);

      if (newColor !== null) {
        this.inputValue = this.value;
        this.hue = newColor.hsva.h;
        this.saturation = newColor.hsva.s;
        this.brightness = newColor.hsva.v;
        this.alpha = newColor.hsva.a * 100;
        this.syncValues();
      } else {
        this.inputValue = oldValue ?? '';
      }
    }
  }

  /** Returns the current value as a string in the specified format. */
  getFormattedValue(format: 'hex' | 'hexa' | 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'hsv' | 'hsva' = 'hex') {
    const currentColor = this.parseColor(
      `hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha / 100})`
    );

    if (currentColor === null) {
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
      case 'hsv':
        return currentColor.hsv.string;
      case 'hsva':
        return currentColor.hsva.string;
      default:
        return '';
    }
  }

  /** Checks for validity but does not show the browser's validation message. */
  checkValidity() {
    return this.input.checkValidity();
  }

  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  reportValidity() {
    if (!this.inline && !this.checkValidity()) {
      // If the input is inline and invalid, show the dropdown so the browser can focus on it
      this.dropdown.show();
      this.addEventListener('sl-after-show', () => this.input.reportValidity(), { once: true });
      return this.checkValidity();
    }

    return this.input.reportValidity();
  }

  /** Sets a custom validation message. Pass an empty string to restore validity. */
  setCustomValidity(message: string) {
    this.input.setCustomValidity(message);
    this.formControlController.updateValidity();
  }

  render() {
    const gridHandleX = this.saturation;
    const gridHandleY = 100 - this.brightness;
    const swatches = Array.isArray(this.swatches)
      ? this.swatches // allow arrays for legacy purposes
      : this.swatches.split(';').filter(color => color.trim() !== '');

    const colorPicker = html`
      <div
        part="base"
        class=${classMap({
          'color-picker': true,
          'color-picker--inline': this.inline,
          'color-picker--disabled': this.disabled
        })}
        aria-disabled=${this.disabled ? 'true' : 'false'}
        aria-labelledby="label"
        tabindex=${this.inline ? '0' : '-1'}
      >
        ${this.inline
          ? html`
              <sl-visually-hidden id="label">
                <slot name="label">${this.label}</slot>
              </sl-visually-hidden>
            `
          : null}

        <div
          part="grid"
          class="color-picker__grid"
          style=${styleMap({ backgroundColor: this.getHexString(this.hue, 100, 100) })}
          @pointerdown=${this.handleGridDrag}
          @touchmove=${this.handleTouchMove}
        >
          <span
            part="grid-handle"
            class=${classMap({
              'color-picker__grid-handle': true,
              'color-picker__grid-handle--dragging': this.isDraggingGridHandle
            })}
            style=${styleMap({
              top: `${gridHandleY}%`,
              left: `${gridHandleX}%`,
              backgroundColor: this.getHexString(this.hue, this.saturation, this.brightness, this.alpha)
            })}
            role="application"
            aria-label="HSV"
            tabindex=${ifDefined(this.disabled ? undefined : '0')}
            @keydown=${this.handleGridKeyDown}
          ></span>
        </div>

        <div class="color-picker__controls">
          <div class="color-picker__sliders">
            <div
              part="slider hue-slider"
              class="color-picker__hue color-picker__slider"
              @pointerdown=${this.handleHueDrag}
              @touchmove=${this.handleTouchMove}
            >
              <span
                part="slider-handle hue-slider-handle"
                class="color-picker__slider-handle"
                style=${styleMap({
                  left: `${this.hue === 0 ? 0 : 100 / (360 / this.hue)}%`
                })}
                role="slider"
                aria-label="hue"
                aria-orientation="horizontal"
                aria-valuemin="0"
                aria-valuemax="360"
                aria-valuenow=${`${Math.round(this.hue)}`}
                tabindex=${ifDefined(this.disabled ? undefined : '0')}
                @keydown=${this.handleHueKeyDown}
              ></span>
            </div>

            ${this.opacity
              ? html`
                  <div
                    part="slider opacity-slider"
                    class="color-picker__alpha color-picker__slider color-picker__transparent-bg"
                    @pointerdown="${this.handleAlphaDrag}"
                    @touchmove=${this.handleTouchMove}
                  >
                    <div
                      class="color-picker__alpha-gradient"
                      style=${styleMap({
                        backgroundImage: `linear-gradient(
                          to right,
                          ${this.getHexString(this.hue, this.saturation, this.brightness, 0)} 0%
                          ${this.getHexString(this.hue, this.saturation, this.brightness, 100)} 100%
                        )`
                      })}
                    ></div>
                    <span
                      part="slider-handle opacity-slider-handle"
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
            aria-label=${this.localize.term('copy')}
            style=${styleMap({
              '--preview-color': this.getHexString(this.hue, this.saturation, this.brightness, this.alpha)
            })}
            @click=${this.handleCopy}
          ></button>
        </div>

        <div class="color-picker__user-input" aria-live="polite">
          <sl-input
            part="input"
            type="text"
            name=${this.name}
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            value=${this.isEmpty ? '' : this.inputValue}
            ?disabled=${this.disabled}
            aria-label=${this.localize.term('currentValue')}
            @keydown=${this.handleInputKeyDown}
            @sl-change=${this.handleInputChange}
            @sl-input=${this.handleInputInput}
          ></sl-input>

          <sl-button-group>
            ${!this.noFormatToggle
              ? html`
                  <sl-button
                    part="format-button"
                    aria-label=${this.localize.term('toggleColorFormat')}
                    exportparts="
                      base:format-button__base,
                      prefix:format-button__prefix,
                      label:format-button__label,
                      suffix:format-button__suffix,
                      caret:format-button__caret
                    "
                    @click=${this.handleFormatToggle}
                  >
                    ${this.setLetterCase(this.format)}
                  </sl-button>
                `
              : ''}
            ${hasEyeDropper
              ? html`
                  <sl-button
                    part="eye-dropper-button"
                    exportparts="
                      base:eye-dropper-button__base,
                      prefix:eye-dropper-button__prefix,
                      label:eye-dropper-button__label,
                      suffix:eye-dropper-button__suffix,
                      caret:eye-dropper-button__caret
                    "
                    @click=${this.handleEyeDropper}
                  >
                    <sl-icon
                      library="system"
                      name="eyedropper"
                      label=${this.localize.term('selectAColorFromTheScreen')}
                    ></sl-icon>
                  </sl-button>
                `
              : ''}
          </sl-button-group>
        </div>

        ${swatches.length > 0
          ? html`
              <div part="swatches" class="color-picker__swatches">
                ${swatches.map(swatch => {
                  const parsedColor = this.parseColor(swatch);

                  // If we can't parse it, skip it
                  if (!parsedColor) {
                    console.error(`Unable to parse swatch color: "${swatch}"`, this);
                    return '';
                  }

                  return html`
                    <div
                      part="swatch"
                      class="color-picker__swatch color-picker__transparent-bg"
                      tabindex=${ifDefined(this.disabled ? undefined : '0')}
                      role="button"
                      aria-label=${swatch}
                      @click=${() => this.selectSwatch(swatch)}
                      @keydown=${(event: KeyboardEvent) =>
                        !this.disabled && event.key === 'Enter' && this.setColor(parsedColor.hexa)}
                    >
                      <div
                        class="color-picker__swatch-color"
                        style=${styleMap({ backgroundColor: parsedColor.hexa })}
                      ></div>
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
        @sl-after-hide=${this.handleAfterHide}
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
            'color-dropdown__trigger--empty': this.isEmpty,
            'color-picker__transparent-bg': true
          })}
          style=${styleMap({
            color: this.getHexString(this.hue, this.saturation, this.brightness, this.alpha)
          })}
          type="button"
        >
          <sl-visually-hidden>
            <slot name="label">${this.label}</slot>
          </sl-visually-hidden>
        </button>
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
