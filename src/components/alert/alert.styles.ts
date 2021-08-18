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
    background-color: rgb(var(--sl-color-neutral-1000));
    border: solid 1px rgb(var(--sl-color-neutral-200));
    border-top-width: 3px;
    border-radius: var(--sl-border-radius-medium);
    box-shadow: var(--box-shadow);
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-normal);
    line-height: 1.6;
    color: rgb(var(--sl-color-neutral-700));
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
    border-top-color: rgb(var(--sl-color-primary-600));
  }

  .alert--primary .alert__icon {
    color: rgb(var(--sl-color-primary-600));
  }

  .alert--success {
    border-top-color: rgb(var(--sl-color-success-600));
  }

  .alert--success .alert__icon {
    color: rgb(var(--sl-color-success-600));
  }

  .alert--neutral {
    border-top-color: rgb(var(--sl-color-neutral-600));
  }

  .alert--neutral .alert__icon {
    color: rgb(var(--sl-color-neutral-600));
  }

  .alert--warning {
    border-top-color: rgb(var(--sl-color-warning-600));
  }

  .alert--warning .alert__icon {
    color: rgb(var(--sl-color-warning-600));
  }

  .alert--danger {
    border-top-color: rgb(var(--sl-color-danger-600));
  }

  .alert--danger .alert__icon {
    color: rgb(var(--sl-color-danger-600));
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
