import { css } from 'lit';
import componentStyles from '../../styles/component.styles';

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
    background-color: var(--sl-color-white);
    border: solid 1px var(--sl-color-gray-200);
    border-top-width: 3px;
    border-radius: var(--sl-border-radius-medium);
    box-shadow: var(--box-shadow);
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-normal);
    line-height: 1.6;
    color: var(--sl-color-gray-700);
    margin: inherit;
  }

  .alert__icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-large);
  }

  .alert__icon ::slotted(*) {
    margin-left: var(--sl-spacing-large);
  }

  .alert--primary {
    border-top-color: var(--sl-color-primary-500);
  }

  .alert--primary .alert__icon {
    color: var(--sl-color-primary-500);
  }

  .alert--success {
    border-top-color: var(--sl-color-success-500);
  }

  .alert--success .alert__icon {
    color: var(--sl-color-success-500);
  }

  .alert--info {
    border-top-color: var(--sl-color-info-500);
  }

  .alert--info .alert__icon {
    color: var(--sl-color-info-500);
  }

  .alert--warning {
    border-top-color: var(--sl-color-warning-500);
  }

  .alert--warning .alert__icon {
    color: var(--sl-color-warning-500);
  }

  .alert--danger {
    border-top-color: var(--sl-color-danger-500);
  }

  .alert--danger .alert__icon {
    color: var(--sl-color-danger-500);
  }

  .alert__message {
    flex: 1 1 auto;
    padding: var(--sl-spacing-large);
    overflow: hidden;
  }

  .alert__close {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-large);
    padding-right: var(--sl-spacing-medium);
  }
`;
