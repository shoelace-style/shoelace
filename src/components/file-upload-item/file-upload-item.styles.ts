import { css } from 'lit';
import componentStyles from '../../styles/component.styles';

export default css`
  ${componentStyles}

  :host {
    display: contents;

    /* For better Developer Experience, we'll reset the margin here so the base part can inherit it */
    margin: 0;
  }

  .file-upload-item {
    position: relative;
    display: flex;
    background-color: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-normal);
    color: var(--sl-color-neutral-700);
    margin: inherit;
  }

  .file-upload-item__content {
    position: relative;
    display: flex;
    flex: 1;
    overflow: hidden;
  }

  .file-upload-item:not(.file-upload-item--has-icon) .file-upload-item__icon,
  .file-upload-item:not(.file-upload-item--closable) .file-upload-item__close-button {
    display: none;
  }

  .file-upload-item--is-loading .file-upload-item__icon,
  .file-upload-item--is-loading .file-upload-item__label {
    visibility: hidden;
  }

  .file-upload-item__icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-x-large);
    padding-left: var(--sl-spacing-large);
    color: var(--sl-color-primary-600);
  }

  .file-upload-item--has-size .file-upload-item__icon {
    font-size: var(--sl-font-size-2x-large);
  }

  .file-upload-item__progress-bar__container {
    inset: 0;
    position: absolute;
    display: flex;
    padding: var(--sl-spacing-large);
    align-items: center;
  }

  .file-upload-item__progress-bar {
    flex: 1;
  }

  .file-upload-item__label {
    flex: 1 1 auto;
    padding: var(--sl-spacing-large);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .file-upload-item__close-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-large);
    padding-right: var(--sl-spacing-medium);
  }

  .file-upload-item--warning {
    border-color: var(--sl-color-warning-600);
  }

  .file-upload-item--warning,
  .file-upload-item--warning .file-upload-item__icon {
    color: var(--sl-color-warning-600);
  }
`;
