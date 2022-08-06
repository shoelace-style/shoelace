import { css } from 'lit';
import componentStyles from '../../styles/component.styles';

export default css`
  ${componentStyles}

  :host {
    display: flex;

    align-items: center;
    justify-content: center;
    flex-direction: column;

    scroll-snap-align: start;
    scroll-snap-stop: always;

    width: 100%;
    max-height: 100%;

    aspect-ratio: var(--aspect-ratio);
  }

  ::slotted(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
