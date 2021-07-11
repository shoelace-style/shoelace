import { css } from 'lit';

export default css`
  :host {
    position: relative;
    box-sizing: border-box;

    & *,
    & *:before,
    & *:after {
      box-sizing: inherit;
    }
  }

  [hidden] {
    display: none !important;
  }
`;
