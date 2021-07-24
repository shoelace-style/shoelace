import { css } from 'lit';
import componentStyles from '../../styles/component.styles';

export default css`
  ${componentStyles}

  sl-menu-item .highlight {
    color: var(--sl-color-primary-500);
  }

  sl-menu::part(base) {
    padding: 0;
  }

  sl-menu-item:hover .highlight,
  sl-menu-item:focus[tabindex='0'] .highlight {
    color: var(--sl-color-white);
  }
`;
