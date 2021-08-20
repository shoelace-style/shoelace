import { css } from 'lit';
export default css`
  :host {
    display: block;
    --sl-split-width: 2px;
    --sl-split-hover-color: var(--sl-color-neutral-200);
    border: 1px solid rgb(var(--sl-color-neutral-200));
    --sl-split-body-padding: var(--sl-spacing-x-small);
  }
  div[part='spliter'] {
    background-color: #fff;
    transition: background-color 0.2ms cubic-bezier(0.075, 0.82, 0.165, 1);
    flex: 0 0 auto;
  }
  div[part='spliter']:hover,
  div[part='spliter']:focus-visible {
    background-color: rgb(var(--sl-split-hover-color));
  }
  div[part='main'] {
    padding: var(--sl-split-body-padding);
    flex: 1 0 auto;
    overflow: auto;
  }
  div[part='exta'] {
    flex: 0 0 auto;
    overflow: auto;
  }
  div[part='base'] {
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;
  }
  div[part='base'][type='left'] div[part='exta'] {
    order: 0;
  }
  div[part='base'][type='left'] div[part='spliter'] {
    width: var(--sl-split-width);
    border-left: solid 1px rgb(var(--sl-color-neutral-200));
    order: 1;
    cursor: w-resize;
  }
  div[part='base'][type='left'] div[part='main'] {
    order: 2;
    flex: 1 1 auto;
  }
  div[part='base'][type='right'] div[part='exta'] {
    order: 2;
  }
  div[part='base'][type='right'] div[part='spliter'] {
    width: var(--sl-split-width);
    border-left: solid 1px rgb(var(--sl-color-neutral-200));
    order: 1;
    cursor: w-resize;
  }
  div[part='base'][type='right'] div[part='main'] {
    order: 0;
    flex: 1 1 auto;
  }
  div[part='base'][type='top'] {
    flex-direction: column;
  }
  div[part='base'][type='top'] div[part='exta'] {
    order: 0;
  }
  div[part='base'][type='top'] div[part='spliter'] {
    flex-basis: var(--sl-split-width);
    border-top: solid 1px rgb(var(--sl-color-neutral-200));
    order: 1;
    cursor: n-resize;
  }
  div[part='base'][type='top'] div[part='main'] {
    order: 2;
  }
  div[part='base'][type='bottom'] {
    flex-direction: column;
  }
  div[part='base'][type='bottom'] div[part='exta'] {
    flex: 0 0 auto;
    order: 2;
  }
  div[part='base'][type='bottom'] div[part='spliter'] {
    border-top: solid 1px rgb(var(--sl-color-neutral-200));
    flex-basis: var(--sl-split-width);
    flex: 0 0 auto;
    order: 1;
    cursor: n-resize;
  }
  div[part='base'][type='bottom'] div[part='main'] {
    flex: 1 1 auto;
    order: 0;
  }
`;
