import { css } from 'lit';
import componentStyles from '../../styles/component.styles';

export default css`
  ${componentStyles}

  :host {
    --padding: 0;

    display: none;
  }

  :host([active]) {
    display: block;
  }

  .tab-panel {
    display: block;
    padding: var(--padding);
  }
`;
