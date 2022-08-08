import { css } from 'lit';
import componentStyles from '../../styles/component.styles';

export default css`
  ${componentStyles}

  :host {
    --max-width: 20rem;
    --hide-delay: 0ms;
    --show-delay: 150ms;

    display: contents;
  }

  .tooltip {
    --arrow-size: var(--sl-tooltip-arrow-size);
    --arrow-color: var(--sl-tooltip-background-color);
  }

  .tooltip__body {
    max-width: var(--max-width);
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    color: var(--sl-tooltip-color);
    padding: var(--sl-tooltip-padding);
    pointer-events: none;
    z-index: var(--sl-z-index-tooltip);
  }

  :host([placement^='top']) .tooltip-popup::part(popup) {
    transform-origin: bottom;
  }

  :host([placement^='bottom']) .tooltip-popup::part(popup) {
    transform-origin: top;
  }

  :host([placement^='left']) .tooltip-popup::part(popup) {
    transform-origin: right;
  }

  :host([placement^='right']) .tooltip-popup::part(popup) {
    transform-origin: left;
  }
`;
