import { css } from 'lit';
import componentStyles from '../../styles/component.styles';

export default css`
  ${componentStyles}

  :host {
    display: inline-block;
  }

  .tag {
    display: flex;
    align-items: center;
    border: solid 1px;
    line-height: 1;
    white-space: nowrap;
    user-select: none;
    cursor: default;
  }

  .tag__clear::part(base) {
    color: inherit;
    padding: 0;
  }

  /*
   * Type modifiers
   */

  .tag--primary {
    background-color: var(--sl-color-primary-100);
    border-color: var(--sl-color-primary-200);
    color: var(--sl-color-primary-700);
  }

  .tag--success {
    background-color: var(--sl-color-success-100);
    border-color: var(--sl-color-success-200);
    color: var(--sl-color-success-700);
  }

  .tag--info {
    background-color: var(--sl-color-info-100);
    border-color: var(--sl-color-info-200);
    color: var(--sl-color-info-700);
  }

  .tag--warning {
    background-color: var(--sl-color-warning-100);
    border-color: var(--sl-color-warning-200);
    color: var(--sl-color-warning-700);
  }

  .tag--danger {
    background-color: var(--sl-color-danger-100);
    border-color: var(--sl-color-danger-200);
    color: var(--sl-color-danger-700);
  }

  /*
   * Size modifiers
   */

  .tag--small {
    font-size: var(--sl-button-font-size-small);
    height: calc(var(--sl-input-height-small) * 0.8);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
    padding: 0 var(--sl-spacing-x-small);
  }

  .tag--small .tag__clear {
    margin-left: var(--sl-spacing-xx-small);
    margin-right: calc(-1 * var(--sl-spacing-xxx-small));
  }

  .tag--medium {
    font-size: var(--sl-button-font-size-medium);
    height: calc(var(--sl-input-height-medium) * 0.8);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
    padding: 0 var(--sl-spacing-small);
  }

  .tag__clear {
    margin-left: var(--sl-spacing-xx-small);
    margin-right: calc(-1 * var(--sl-spacing-xx-small));
  }

  .tag--large {
    font-size: var(--sl-button-font-size-large);
    height: calc(var(--sl-input-height-large) * 0.8);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
    padding: 0 var(--sl-spacing-medium);
  }

  .tag__clear {
    margin-left: var(--sl-spacing-xx-small);
    margin-right: calc(-1 * var(--sl-spacing-x-small));
  }

  /*
   * Pill modifier
   */

  .tag--pill {
    border-radius: var(--sl-border-radius-pill);
  }
`;
