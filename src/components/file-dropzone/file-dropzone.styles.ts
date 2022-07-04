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

  .file-dropzone__content {
    padding: var(--sl-spacing-medium);
    border: var(--border-width) var(--border-style) var(--sl-color-neutral-300);
    border-radius: var(--border-radius);
  }

  .file-dropzone__content__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--sl-spacing-medium);
  }

  sl-drop-handler[dragged] .file-dropzone__content {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-100);
  }

  .file-dropzone__content__container__icon {
    font-size: 7rem;
    color: var(--sl-color-primary-600);
  }

  .file-dropzone--disabled .file-dropzone__content,
  .file-dropzone--no-drag .file-dropzone__content {
    cursor: no-drop;
  }

  .file-dropzone--disabled .file-dropzone__content {
    color: var(--sl-color-neutral-500);
  }

  .file-dropzone--disabled .file-dropzone__content__container__icon {
    color: var(--sl-color-neutral-300);
  }

  .file-dropzone--disabled sl-drop-handler[dragged] .file-dropzone__content,
  .file-dropzone--no-drag sl-drop-handler[dragged] .file-dropzone__content {
    border-color: var(--sl-color-neutral-300);
    background-color: unset;
  }

  .file-dropzone__file-items {
    display: flex;
    flex-direction: column;
    gap: var(--sl-spacing-small);
    margin-top: var(--sl-spacing-medium);
  }

  .file-dropzone--warning .file-dropzone__content {
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-warning-600);
  }

  .file-dropzone--warning .file-dropzone__content__container__icon {
    color: var(--sl-color-warning-500);
  }
`;
