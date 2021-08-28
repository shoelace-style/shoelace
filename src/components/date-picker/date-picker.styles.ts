import { css } from 'lit';
import componentStyles from '../../styles/component.styles';

export default css`
  ${componentStyles}

  :host {
    display: inline-flex;
  }

  .container {
    display: flex;
    height: 40px;
    position: relative;
  }

  sl-calendar {
    min-width: 285.5px;
  }

  .dropdown td {
    width: var(--cell-dropdown-width, 2.2rem);
    height: var(--cell-dropdown-height, 2.2rem);
    font-size: var(--sl-font-size-small);
  }
`;
