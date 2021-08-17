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
  :host([selected]) div[part='node'] {
    cursor: pointer;
  }
  div[part='base'] {
    white-space: nowrap;
  }
  div[part='base'] div[part='node'] {
    display: flex;
    position: relative;
    align-items: center;
    margin: 5px 0;
    padding-left: calc(var(--sl-node-level, 0) * 0.8em);
    transition: background-color ease 0.3ms;
  }
  div[part='base'] div[part='node'] sl-icon[part='node-icon'] {
    margin-right: var(--sl-spacing-xx-small);
  }
  div[part='base'] div[part='node'] div[part='node-span'] {
    margin-left: var(--sl-spacing-xx-small);
  }
  div[part='base'] div[part='node']:hover,
  div[part='base'] div[part='node'].selected {
    background-color: rgb(var(--sl-color-sky-200));
  }
  div[part='base'] div[part='node']:hover::before,
  div[part='base'] div[part='node'].selected::before {
    position: absolute;
    inset: 0 auto 0 0;
    border-left: 2px solid rgb(var(--sl-color-blue-500));
    content: '';
  }
  div[part='base'] div[part='children'] {
    display: block;
    opacity: 1;
    transition: opacity ease 0.5ms;
  }
  div[part='base'] div[part='children'].close {
    transition: opacity ease 0.5ms;
    opacity: 0;
    display: none;
  }
`;
