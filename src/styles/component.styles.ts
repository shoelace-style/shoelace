import { css } from 'lit';
import utilityStyles from '../styles/utility.styles';

export default css`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`;

// All components import this file, so it's a good place to ensure utility styles are applied to the light DOM
const style = document.createElement('style');
style.textContent = utilityStyles.toString();
document.head.append(style);
