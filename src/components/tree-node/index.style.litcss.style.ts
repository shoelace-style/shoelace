import { css } from 'lit';
export default css`
  :host {
    display: block;
  }
  .trigger-status {
    display: inline-block;
    position: relative;
    margin-right: var(--sl-spacing-xx-small);
    margin-left: var(--sl-spacing-xx-small);
    font-size: var(--sl-node-trigger-size, 12px);
    cursor: pointer;
  }
  .trigger-status[empty] {
    cursor: default;
    opacity: 0;
  }
  .node-icon {
    position: relative;
    vertical-align: middle;
    top: var(--node-icon-top, 0);
    color: var(--node-icon-color, inherit);
  }
  div[part='base'] {
    white-space: nowrap;
  }
  div[part='base'] div[part='node'] {
    display: flex;
    align-items: center;
    margin: 5px 0;
  }
  div[part='base'] div[part='node'] sl-icon[part='node-icon'] {
    margin-right: var(--sl-spacing-xx-small);
  }
  div[part='base'] div[part='node'] div[part='node-span'] {
    margin-left: var(--sl-spacing-xx-small);
  }
  div[part='base'] div[part='children'] {
    display: block;
    padding-left: var(--sl-spacing-small, 0.8em);
  }
  div[part='base'] div[part='children'].close {
    display: none;
  }
`;
