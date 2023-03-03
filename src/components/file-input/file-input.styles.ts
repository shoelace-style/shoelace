import { css } from 'lit';
import componentStyles from '../../styles/component.styles';

export default css`
  ${componentStyles}

  :host {
    --preview-size: 4rem;

    display: block;
  }

  .input__control {
    position: absolute;
    width: 1px;
    height: 1px;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    border: none;
    overflow: hidden;
    white-space: nowrap;
    padding: 0;
  }

  .input__files:not(:empty) {
    margin-block-start: var(--sl-spacing-medium);
  }

  .input__file {
    display: flex;
    align-items: center;
  }

  .input__file-preview {
    position: relative;
    width: var(--preview-size);
    height: var(--preview-size);
    margin-inline-end: var(--sl-spacing-medium);
  }

  .input__file-preview-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .input__file-name {
  }

  .input__file-size {
    font-size: var(--sl-font-size-small);
    color: var(--sl-color-neutral-800);
  }

  .input__file-size::before {
    content: '(';
  }

  .input__file-size::after {
    content: ')';
  }
`;
