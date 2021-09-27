import { css } from 'lit';
import componentStyles from '../../styles/component.styles';

export default css`
  ${componentStyles}

  :host {
    display: block;
  }

  .menu-divider {
    border-top: solid var(--sl-panel-border-width) rgb(var(--sl-panel-border-color));
    margin: var(--sl-spacing-x-small) 0;
  }
`;
