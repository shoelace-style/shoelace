import { css } from 'lit';
import componentStyles from '../../styles/component.styles.js';

export default css`
  ${componentStyles}

  :host {
    display: inline-block;
  }

  /* successful copy */
  slot[name='copied'] {
    display: none;
  }
  .clipboard--copied #default {
    display: none;
  }
  .clipboard--copied slot[name='copied'] {
    display: block;
  }

  .green::part(base) {
    color: var(--sl-color-success-600);
  }
  .green::part(base):hover,
  .green::part(base):focus {
    color: var(--sl-color-success-600);
  }
  .green::part(base):active {
    color: var(--sl-color-success-600);
  }

  /* failed to copy */
  slot[name='error'] {
    display: none;
  }
  .clipboard--error #default {
    display: none;
  }
  .clipboard--error slot[name='error'] {
    display: block;
  }

  .red::part(base) {
    color: var(--sl-color-danger-600);
  }
  .red::part(base):hover,
  .red::part(base):focus {
    color: var(--sl-color-danger-600);
  }
  .red::part(base):active {
    color: var(--sl-color-danger-600);
  }
`;
