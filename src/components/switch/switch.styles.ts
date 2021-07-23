import { css } from 'lit';
import componentStyles from '../../styles/component.styles';

export default css`
  ${componentStyles}

  :host {
    --height: var(--sl-toggle-size);
    --thumb-size: calc(var(--sl-toggle-size) + 4px);
    --width: calc(var(--height) * 2);

    display: inline-block;
  }

  .switch {
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-input-font-family);
    font-size: var(--sl-input-font-size-medium);
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .switch__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--width);
    height: var(--height);
    background-color: var(--sl-color-gray-300);
    border: solid var(--sl-input-border-width) var(--sl-color-gray-300);
    border-radius: var(--height);
    transition: var(--sl-transition-fast) border-color, var(--sl-transition-fast) background-color;
  }

  .switch__control .switch__thumb {
    width: var(--thumb-size);
    height: var(--thumb-size);
    background-color: var(--sl-color-white);
    border-radius: 50%;
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
    transform: translateX(calc(var(--width) / -2 + var(--thumb-size) / 2 - (var(--thumb-size) - var(--height)) / 2));
    transition: var(--sl-transition-fast) transform ease, var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) border-color, var(--sl-transition-fast) box-shadow;
  }

  .switch__control input[type='checkbox'] {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  /* Hover */
  .switch:not(.switch--checked):not(.switch--disabled) .switch__control:hover {
    background-color: var(--sl-color-gray-200);
    border-color: var(--sl-color-gray-200);
  }
  .switch:not(.switch--checked):not(.switch--disabled) .switch__control:hover .switch__thumb {
    background-color: var(--sl-color-white);
    border-color: var(--sl-input-border-color);
  }

  /* Focus */
  .switch.switch--focused:not(.switch--checked):not(.switch--disabled) .switch__control {
    background-color: var(--sl-color-gray-200);
    border-color: var(--sl-color-gray-200);
  }

  .switch.switch--focused:not(.switch--checked):not(.switch--disabled) .switch__control .switch__thumb {
    background-color: var(--sl-color-white);
    border-color: var(--sl-color-primary-500);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-focus-ring-color-primary);
  }

  /* Checked */
  .switch--checked .switch__control {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
  }
  .switch--checked .switch__control .switch__thumb {
    background-color: var(--sl-color-white);
    border-color: var(--sl-color-primary-500);
    transform: translateX(calc(var(--width) / 2 - var(--thumb-size) / 2 + (var(--thumb-size) - var(--height)) / 2));
  }

  /* Checked + hover */
  .switch.switch--checked:not(.switch--disabled) .switch__control:hover {
    background-color: var(--sl-color-primary-400);
    border-color: var(--sl-color-primary-400);
  }
  .switch.switch--checked:not(.switch--disabled) .switch__control:hover .switch__thumb {
    background-color: var(--sl-color-white);
    border-color: var(--sl-color-primary-500);
  }

  /* Checked + focus */
  .switch.switch--checked:not(.switch--disabled).switch--focused .switch__control {
    background-color: var(--sl-color-primary-400);
    border-color: var(--sl-color-primary-400);
  }

  .switch.switch--checked:not(.switch--disabled).switch--focused .switch__control .switch__thumb {
    background-color: var(--sl-color-white);
    border-color: var(--sl-color-primary-500);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-focus-ring-color-primary);
  }

  /* Disabled */
  .switch--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .switch__label {
    line-height: var(--height);
    margin-left: 0.5em;
    user-select: none;
  }
`;
