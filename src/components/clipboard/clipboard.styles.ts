import { css } from 'lit';
import componentStyles from '../../styles/component.styles.js';

export default css`
  ${componentStyles}

  :host {
    display: inline-block;
  }

  .clipboard--copy sl-icon-button::part(base) {
    color: var(--sl-color-success-600);
  }

  .clipboard--copy sl-icon-button::part(base):hover,
  .clipboard--copy sl-icon-button::part(base):focus {
    color: var(--sl-color-success-600);
  }

  .clipboard--copy sl-icon-button::part(base):active {
    color: var(--sl-color-success-600);
  }
`;
