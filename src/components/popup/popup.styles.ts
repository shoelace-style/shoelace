import { css } from 'lit';
import componentStyles from '../../styles/component.styles';

export default css`
  ${componentStyles}

  :host {
    --arrow-size: 4px;
    --arrow-color: var(--sl-color-neutral-0);
    --arrow-shadow: none;

    display: inline;
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
    box-shadow: var(--arrow-shadow);
    z-index: -1;
  }
`;
