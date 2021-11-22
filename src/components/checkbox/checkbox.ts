import { SlCheckControl } from '../check-control/check-control.js';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';
import { emit } from '../../internal/event';
import { watch } from '../../internal/watch';
import styles from './checkbox.styles';

let id = 0;

/**
 * @since 2.0
 * @status draft
 *
 * @csspart checked-icon - The container the wraps the checked icon.
 * @csspart indeterminate-icon - The container that wraps the indeterminate icon.
 */
@customElement('sl-checkbox')
export default class SlCheckbox extends SlCheckControl {
  static styles = styles;

  private inputId = `checkbox-${++id}`;
  private labelId = `checkbox-label-${id}`;

  /** Draws the checkbox in an indeterminate state. */
  @property({ type: Boolean, reflect: true }) indeterminate = false;

  handleClick() {
    this.checked = !this.checked;
    this.indeterminate = false;
    emit(this, 'sl-change');
  }

  @watch('checked', { waitUntilFirstUpdate: true })
  @watch('indeterminate', { waitUntilFirstUpdate: true })
  handleStateChange() {
    this.invalid = !this.input.checkValidity();
  }

  render() {
    return html`
      <label
        part="base"
        class=${classMap({
          checkbox: true,
          'checkbox--checked': this.checked,
          'checkbox--disabled': this.disabled,
          'checkbox--focused': this.hasFocus,
          'checkbox--indeterminate': this.indeterminate
        })}
        for=${this.inputId}
      >
        <input
          id=${this.inputId}
          class="checkbox__input"
          type="checkbox"
          name=${ifDefined(this.name)}
          value=${ifDefined(this.value)}
          .indeterminate=${live(this.indeterminate)}
          .checked=${live(this.checked)}
          .disabled=${this.disabled}
          .required=${this.required}
          role="checkbox"
          aria-checked=${this.checked ? 'true' : 'false'}
          aria-labelledby=${this.labelId}
          @click=${this.handleClick}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
        />

        <span part="control" class="checkbox__control">
          ${this.checked
            ? html`
                <span part="checked-icon" class="checkbox__icon">
                  <svg viewBox="0 0 16 16">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
                      <g stroke="currentColor" stroke-width="2">
                        <g transform="translate(3.428571, 3.428571)">
                          <path d="M0,5.71428571 L3.42857143,9.14285714"></path>
                          <path d="M9.14285714,0 L3.42857143,9.14285714"></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </span>
              `
            : ''}
          ${!this.checked && this.indeterminate
            ? html`
                <span part="indeterminate-icon" class="checkbox__icon">
                  <svg viewBox="0 0 16 16">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
                      <g stroke="currentColor" stroke-width="2">
                        <g transform="translate(2.285714, 6.857143)">
                          <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </span>
              `
            : ''}
        </span>

        <span part="label" id=${this.labelId} class="checkbox__label">
          <slot></slot>
        </span>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-checkbox': SlCheckbox;
  }
}
