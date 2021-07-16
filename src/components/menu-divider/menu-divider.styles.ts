import { css } from 'lit';
import componentStyles from '../../styles/component.styles';

export default css`
  ${componentStyles}

  :host {
    display: block;
  }

  .menu-divider {
    border-top: solid 1px var(--sl-panel-border-color);
    margin: var(--sl-spacing-x-small) 0;
  }
`;
