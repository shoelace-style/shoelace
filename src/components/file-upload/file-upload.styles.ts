import { css } from 'lit';
import componentStyles from '../../styles/component.styles';

export default css`
  ${componentStyles}

  :host {
    --border-radius: var(--sl-border-radius-medium);
    --border-width: var(--sl-input-border-width);
    --border-style: dashed;

    display: block;
  }

  .file-upload__label {
    padding: var(--sl-spacing-large);
    border: var(--border-width) var(--border-style) var(--sl-color-neutral-300);
    border-radius: var(--border-radius);
  }

  .file-upload__label__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--sl-spacing-medium);
  }

  .file-upload--dragged:not(.file-upload--disabled) .file-upload__label {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-100);
  }

  .file-upload__label__container__image {
    height: 6rem;
    color: var(--sl-color-primary-600);
  }

  .file-upload--disabled .file-upload__label,
  .file-upload--no-drag .file-upload__label {
    cursor: no-drop;
  }

  .file-upload--disabled .file-upload__label {
    color: var(--sl-color-neutral-500);
  }

  .file-upload--disabled .file-upload__label__container__image {
    color: var(--sl-color-neutral-300);
  }

  .file-upload__file-items {
    display: flex;
    flex-direction: column;
    gap: var(--sl-spacing-small);
    margin-top: var(--sl-spacing-medium);
  }

  .file-upload--warning .file-upload__label {
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-warning-600);
  }

  .file-upload--warning .file-upload__label__container__image {
    color: var(--sl-color-warning-500);
  }
`;
