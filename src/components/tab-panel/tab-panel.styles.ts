import { css } from 'lit';
import componentStyles from '../../styles/component.styles';

export default css`
  ${componentStyles}

  :host {
    --padding: 0;

    display: block;
  }

  .tab-panel {
    display: block;
    padding: var(--padding);
  }

  .tab-panel:not(.tab-panel--active) {
    display: none;
  }
`;
