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
  .clipboard--copy #default {
    display: none;
  }
  .clipboard--copy slot[name='copied'] {
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
  slot[name='copy-error'] {
    display: none;
  }
  .clipboard--copy-error #default {
    display: none;
  }
  .clipboard--copy-error slot[name='copy-error'] {
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
