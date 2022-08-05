import { css } from 'lit';
import componentStyles from '../../styles/component.styles';

export default css`
  ${componentStyles}

  :host {
    --arrow-size: 4px;
    --arrow-color: var(--sl-color-neutral-1000);

    display: inline-block;
  }

  .popup {
    display: block;
    position: absolute;
    isolation: isolate;
  }

  .popup--fixed {
    position: fixed;
  }

  .popup:not(.popup--active) {
    display: none;
  }

  .popup__arrow {
    position: absolute;
    width: calc(var(--arrow-size) * 2);
    height: calc(var(--arrow-size) * 2);
    transform: rotate(45deg);
    background: var(--arrow-color);
    z-index: -1;
  }
`;
