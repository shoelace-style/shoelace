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

  .file-upload__content {
    padding: var(--sl-spacing-medium);
    border: var(--border-width) var(--border-style) var(--sl-color-neutral-300);
    border-radius: var(--border-radius);
  }

  .file-upload__content__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--sl-spacing-medium);
  }

  .file-upload--dragged .file-upload__content {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-100);
  }

  .file-upload__content__container__icon {
    font-size: 7rem;
    color: var(--sl-color-primary-600);
  }

  .file-upload--disabled .file-upload__content,
  .file-upload--no-drag .file-upload__content {
    cursor: no-drop;
  }

  .file-upload--disabled .file-upload__content {
    color: var(--sl-color-neutral-500);
  }

  .file-upload--disabled .file-upload__content__container__icon {
    color: var(--sl-color-neutral-300);
  }

  .file-upload--disabled sl-drop-handler[dragged] .file-upload__content,
  .file-upload--no-drag sl-drop-handler[dragged] .file-upload__content {
    border-color: var(--sl-color-neutral-300);
    background-color: unset;
  }

  .file-upload__file-items {
    display: flex;
    flex-direction: column;
    gap: var(--sl-spacing-small);
    margin-top: var(--sl-spacing-medium);
  }

  .file-upload--warning .file-upload__content {
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-warning-600);
  }

  .file-upload--warning .file-upload__content__container__icon {
    color: var(--sl-color-warning-500);
  }
`;
