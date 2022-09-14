import { css } from 'lit';
import componentStyles from '../../styles/component.styles';
import formControlStyles from '../../styles/form-control.styles';

export default css`
  ${componentStyles}
  ${formControlStyles}

  :host {
    display: inline-block;
    width: 100%;
  }

  sl-dropdown {
    display: block;
    width: 100%;
  }

  sl-dropdown::part(panel) {
    display: block;
    width: 100%;
  }
`;
