import { SlCheckControl } from '../check-control/check-control.js';
import { html } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';
import { emit } from '../../internal/event';
import { watch } from '../../internal/watch';
import styles from './switch.styles';

let id = 0;

/**
 * @since 2.0
 * @status draft
 *
 * @csspart thumb - The switch position indicator.
 */
@customElement('sl-switch')
export default class SlSwitch extends SlCheckControl {
  static styles = styles;

  @query('input[type="checkbox"]') input: HTMLInputElement;

  private switchId = `switch-${++id}`;
  private labelId = `switch-label-${id}`;

  @state() private hasFocus = false;

  @watch('checked')
  handleCheckedChange() {
    if (this.input) {
      this.input.checked = this.checked;
      this.invalid = !this.input.checkValidity();
    }
  }

  handleClick() {
    this.checked = !this.checked;
    emit(this, 'sl-change');
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.checked = false;
      emit(this, 'sl-change');
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.checked = true;
      emit(this, 'sl-change');
    }
  }

  render() {
    return html`
      <label
        part="base"
        for=${this.switchId}
        class=${classMap({
          switch: true,
          'switch--checked': this.checked,
          'switch--disabled': this.disabled,
          'switch--focused': this.hasFocus
        })}
      >
        <input
          id=${this.switchId}
          class="switch__input"
          type="checkbox"
          name=${ifDefined(this.name)}
          value=${ifDefined(this.value)}
          .checked=${live(this.checked)}
          .disabled=${this.disabled}
          .required=${this.required}
          role="switch"
          aria-checked=${this.checked ? 'true' : 'false'}
          aria-labelledby=${this.labelId}
          @click=${this.handleClick}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
          @keydown=${this.handleKeyDown}
        />

        <span part="control" class="switch__control">
          <span part="thumb" class="switch__thumb"></span>
        </span>

        <span part="label" id=${this.labelId} class="switch__label">
          <slot></slot>
        </span>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-switch': SlSwitch;
  }
}
