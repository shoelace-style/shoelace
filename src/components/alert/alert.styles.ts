import { css } from 'lit';
import componentStyles from '../../styles/component.styles.js';

export default css`
  ${componentStyles}

  :host {
    display: contents;

    /* For better DX, we'll reset the margin here so the base part can inherit it */
    margin: 0;
  }

  .alert {
    position: relative;
    display: flex;
    align-items: stretch;
    background-color: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-top-width: calc(var(--sl-panel-border-width) * 3);
    border-radius: var(--sl-border-radius-medium);
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    line-height: var(--ts-leading-5);
    color: var(--ts-color-text-default);
    margin: inherit;
  }

  .alert:not(.alert--has-icon) .alert__icon,
  .alert:not(.alert--has-header) .alert__header,
  .alert:not(.alert--closable) .alert__close-button {
    display: none;
  }

  .alert__icon {
    flex: 0 0 auto;
    display: flex;
    align-items: flex-start;
    font-size: var(--sl-font-size-medium);
    margin-top: var(--sl-spacing-3x-small);
    padding: var(--sl-spacing-medium) 0 var(--sl-spacing-medium) var(--sl-spacing-medium);
  }

  .alert--primary {
    background-color: var(--sl-color-primary-50);
    border: 1px solid var(--sl-color-primary-200);
  }

  .alert--primary .alert__icon {
    color: var(--sl-color-primary-600);
  }

  .alert--success {
    background-color: var(--sl-color-success-100);
    border: 1px solid var(--sl-color-success-200);
  }

  .alert--success .alert__icon {
    color: var(--sl-color-success-700);
  }

  .alert--neutral {
    background-color: var(--sl-color-neutral-100);
    border: 1px solid var(--sl-color-neutral-400);
  }

  .alert--neutral .alert__icon {
    color: var(--sl-color-neutral-700);
  }

  .alert--warning {
    background-color: var(--sl-color-warning-50);
    border: 1px solid var(--sl-color-warning-300);
  }

  .alert--warning .alert__icon {
    color: var(--sl-color-warning-700);
  }

  .alert--danger {
    background-color: var(--sl-color-danger-100);
    border: 1px solid var(--sl-color-danger-300);
  }

  .alert--danger .alert__icon {
    color: var(--sl-color-danger-600);
  }

  .alert__message {
    flex: 1 1 auto;
    display: block;
    padding: var(--sl-spacing-medium);
    overflow: hidden;
  }

  .alert__header {
    /* ts-heading-8 */
    font-size: var(--sl-font-size-small);
    font-weight: var(--ts-font-semibold);
    line-height: var(--ts-leading-5);
    letter-spacing: var(--sl-letter-spacing-dense);
  }

  .alert__close-button {
    color: var(--sl-color-neutral-700);
    flex: 0 0 auto;
    display: flex;
    align-items: flex-start;
    font-size: var(--sl-font-size-medium);
    padding: var(--sl-spacing-x-small);
    margin-top: 2px;
  }

  .alert__close-button:hover {
    color: var(--sl-color-neutral-800);
  }

  .alert__close-button:active {
    color: var(--sl-color-neutral-900);
  }
`;
