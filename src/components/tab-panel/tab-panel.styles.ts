import { css } from 'lit';
import componentStyles from '../../styles/component.styles';

export default css`
  ${componentStyles}

  :host {
    display: block;
  }

  .tab-panel {
    border: solid 1px transparent;
    padding: 20px 20px;
  }
`;
