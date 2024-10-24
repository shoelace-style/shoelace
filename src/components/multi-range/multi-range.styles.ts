import { css } from 'lit';

export default css`
  :host {
    --thumb-size: 20px;
    --tooltip-offset: 10px;
    --track-color-active: var(--sl-color-primary-300);
    --track-color-inactive: var(--sl-color-neutral-200);
    --track-height: 6px;
  }

  .form-control {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    box-sizing: border-box;
    writing-mode: horizontal-tb;
  }

  .base {
    display: block;
    position: relative;
    height: var(--thumb-size);
  }

  :host([disabled]) .base {
    opacity: 0.5;
  }

  .track {
    display: inline-block;
    height: var(--track-height);
    width: calc(100% + 6px - var(--thumb-size));
    border-radius: 3px;
    margin: calc((var(--thumb-size) - var(--track-height)) / 2) calc(var(--thumb-size) / 2 - 3px);
    background-color: var(--track-color-inactive);
  }

  .active-track {
    position: absolute;
    top: calc((var(--thumb-size) - var(--track-height)) / 2);
    height: var(--track-height);
    background-color: var(--track-color-active);
    z-index: 2;
  }

  .handle {
    display: block;
    position: absolute;
    top: 0;
    width: var(--thumb-size);
    height: var(--thumb-size);
    border-radius: 50%;
    background-color: var(--sl-color-primary-600);
    z-index: 3;
    cursor: pointer;
  }

  .handle:hover,
  .handle.grabbed {
    background-color: var(--sl-color-primary-500);
  }

  .handle.grabbed {
    cursor: grabbing;
  }

  .handle:focus-visible,
  .keyboard-focus .handle:focus {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  :host([disabled]) .handle,
  :host([disabled]) .handle.grabbed {
    cursor: not-allowed;
  }

  .tooltip {
    position: absolute;
    z-index: var(--sl-z-index-tooltip);
    left: 0;
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    color: var(--sl-tooltip-color);
    opacity: 0;
    padding: var(--sl-tooltip-padding);
    transition: var(--sl-transition-fast) opacity;
    pointer-events: none;
  }

  .tooltip:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    left: 50%;
    translate: calc(-1 * var(--sl-tooltip-arrow-size));
  }

  .tooltip-visible .tooltip {
    opacity: 1;
  }

  /* Tooltip on top */
  .tooltip-top .tooltip {
    top: calc(-1 * var(--thumb-size) - var(--tooltip-offset));
  }

  .tooltip-top .tooltip:after {
    border-top: var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);
    border-left: var(--sl-tooltip-arrow-size) solid transparent;
    border-right: var(--sl-tooltip-arrow-size) solid transparent;
    top: 100%;
  }

  /* Tooltip on bottom */
  .tooltip-bottom .tooltip {
    bottom: calc(-1 * var(--thumb-size) - var(--tooltip-offset));
  }

  .tooltip-bottom .tooltip:after {
    border-bottom: var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);
    border-left: var(--sl-tooltip-arrow-size) solid transparent;
    border-right: var(--sl-tooltip-arrow-size) solid transparent;
    bottom: 100%;
  }
`;
