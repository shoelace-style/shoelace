import { css } from 'lit';
import componentStyles from '../../styles/component.styles';

export default css`
  ${componentStyles}

  :host {
    display: block;
  }

  .menu {
    padding: var(--sl-spacing-x-small) 0;
  }
`;
