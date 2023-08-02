import { css } from 'lit';
import componentStyles from '../../styles/component.styles.js';

export default css`
  ${componentStyles}

  :host {
    display: inline-block;
    cursor: pointer;
  }

  slot {
    display: inline-flex;
  }

  .copy {
    background: none;
    border: none;
    font: inherit;
    color: inherit;
    padding: 0;
    margin: 0;
  }
`;
