import { css } from 'lit';
import componentStyles from '../../styles/component.styles';

export default css`
  ${componentStyles}

  .highlight {
    color: var(--sl-color-primary-500);
  }

  sl-menu-item::part(label).menu-item--focused {
    background-color: red !important;
  }

  sl-menu::part(base) {
    padding: 0;
  }
`;
