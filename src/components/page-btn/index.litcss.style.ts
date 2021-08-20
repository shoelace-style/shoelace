import { css } from 'lit';
export default css`
  :host {
    display: block;
    font-size: inherit;
  }
  div[part='base'] {
    display: flex;
    white-space: nowrap;
    align-items: center;
  }
  div[part='base'][page-align='left'] {
    justify-content: flex-start;
  }
  div[part='base'][page-align='center'] {
    justify-content: center;
  }
  div[part='base'][page-align='right'] {
    justify-content: flex-end;
  }
  .pageCountSpan {
    margin: 0 3px;
  }
  div[part='pageWrap'] {
    display: inline-flex;
  }
  div[part='no-data'] {
    margin: 0 1em;
    color: rgb(var(--sl-color-gray-300));
  }
  sl-button {
    margin: 0 3px;
    color: inherit;
    cursor: pointer;
  }
  sl-button[disabled] {
    cursor: not-allowed;
    pointer-events: none;
  }
  sl-button sl-icon {
    color: rgb(var(--sl-color-neutral-600));
  }
  sl-button::part(base) {
    height: var(--sl-input-height-small);
    line-height: var(--sl-input-height-small);
  }
  sl-select,
  sl-input {
    display: inline-flex;
    margin: 0 3px;
  }
`;
