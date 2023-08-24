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
    border: none;
    border-radius: var(--ts-border-radius-x-small);
    line-height: 1;
    white-space: nowrap;
    user-select: none;
  }

  .tag:active > sl-icon-button {
    color: var(--sl-color-neutral-900);
  }

  .tag__remove::part(base) {
    color: var(--sl-color-neutral-700);
    padding: 0;
  }

  /*
   * Variant modifiers
   */

  .tag--blue {
    background-color: var(--sl-color-primary-100);
    color: var(--sl-color-primary-800);
  }

  .tag--green {
    background-color: var(--sl-color-success-100);
    color: var(--sl-color-success-800);
  }

  .tag--gray {
    background-color: var(--sl-color-neutral-200);
    color: var(--sl-color-neutral-800);
  }

  .tag--yellow {
    background-color: var(--sl-color-warning-100);
    color: var(--sl-color-warning-800);
  }

  .tag--red {
    background-color: var(--sl-color-danger-100);
    color: var(--sl-color-danger-800);
  }

  .tag--teal {
    background-color: var(--sl-color-teal-100);
    color: var(--sl-color-teal-800);
  }

  .tag--fuchsia {
    background-color: var(--sl-color-fuchsia-100);
    color: var(--sl-color-fuchsia-700);
  }

  .tag--purple {
    background-color: var(--sl-color-purple-100);
    color: var(--sl-color-purple-700);
  }

  /*
   * Size modifiers
   */

  .tag--small {
    font-size: var(--sl-button-font-size-medium);
    height: calc(var(--sl-input-height-small) * 0.9);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-spacing-x-small);
  }

  .tag--medium {
    font-size: var(--sl-button-font-size-medium);
    height: calc(var(--sl-input-height-medium) * 0.8);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-spacing-small);
  }

  .tag--large {
    font-size: var(--sl-button-font-size-large);
    height: calc(var(--sl-input-height-large) * 0.8);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-spacing-medium);
  }

  .tag--small > .tag__remove {
    font-size: var(--sl-font-size-x-small);
  }

  .tag__remove {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  /*
   * Pill modifier
   */

  .tag--pill {
    border-radius: var(--sl-border-radius-pill);
  }
`;
