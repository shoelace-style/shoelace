import { css } from 'lit';
import componentStyles from '../../styles/component.styles';

export default css`
  ${componentStyles}

  :host {
    display: block;
    outline: 0;
  }

  :host(:focus) {
    outline: 0;
  }

  .tree-item {
    position: relative;
    display: flex;
    align-items: stretch;
    flex-direction: column;

    color: var(--sl-color-neutral-700);

    user-select: none;
    white-space: nowrap;
    cursor: pointer;
  }

  .tree-item__checkbox {
    pointer-events: none;
  }

  .tree-item__expand-button,
  .tree-item__checkbox,
  .tree-item__label {
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
  }

  .tree-item__checkbox::part(base) {
    display: flex;
    align-items: center;
  }

  .tree-item__indentation {
    display: block;
    width: 1em;
    flex-shrink: 0;
  }

  .tree-item__expand-button {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--sl-color-neutral-400);
    padding: var(--sl-spacing-x-small);
    width: 2rem;
    height: 2rem;
  }

  .tree-item__item {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .tree-item__item--disabled {
    color: var(--sl-color-neutral-400);
    outline: none;
    cursor: not-allowed;
  }

  :host(:not([aria-disabled='true']):focus-visible) .tree-item__item {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  :host(:not([aria-disabled='true'])) .tree-item__item--selected,
  :host(:not([aria-disabled='true'])) .tree-item__item:hover,
  :host(:not([aria-disabled='true'])) .tree-item__item:hover sl-checkbox::part(label) {
    color: var(--sl-color-primary-600);
  }

  .tree-item__label {
    display: flex;
    align-items: center;
    transition: var(--sl-transition-fast) color;
  }

  .tree-item__children {
    font-size: calc(1em + var(--indentation-size, var(--sl-spacing-medium)));
  }
`;
