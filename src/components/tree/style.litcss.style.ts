import { css } from 'lit';
export default css`
  :host {
    position: relative;
    display: block;
    --tree-body-spacing: var(--sl-spacing-x-small);
    --tree-footer-spacing: var(--sl-spacing-xx-small);
  }
  div[part='base'] {
    display: flex;
    flex-direction: column;
  }
  div[part='base'] div[part='filter'] {
    flex: 0 0 auto;
    align-items: center;
  }
  div[part='base'] div[part='filter'] sl-input {
    margin: 5px 10px;
    width: 98%;
  }
  div[part='base'] div[part='tree-body'] {
    flex: 1 1 auto;
    padding: var(--tree-body-spacing);
    overflow: auto;
  }
  div[part='base'].base-has-footer div[part='tree-footer'] {
    display: flex;
  }
  div[part='base'] div[part='tree-footer'] {
    display: none;
    flex: 0 0 auto;
    align-items: center;
    justify-content: flex-end;
    padding: var(--tree-footer-spacing);
  }
`;
