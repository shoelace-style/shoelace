import { css } from 'lit';
import componentStyles from '../../styles/component.styles.js';

export default css`
  ${componentStyles}

  :host {
    --track-width: 3.5px;
    --track-color: var(--sl-color-primary-100);
    --indicator-color: var(--sl-color-primary-600);
    --speed: 4s;

    display: inline-flex;
  }

  .spinner {
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
  }

  .spinner__track,
  .spinner__indicator {
    fill: none;
    stroke-width: var(--track-width);
    r: calc(0.5em - var(--track-width) / 2);
    cx: 0.5em;
    cy: 0.5em;
    transform-origin: 50% 50%;
  }

  .spinner__track {
    stroke: var(--track-color);
    transform-origin: 0% 0%;
  }

  .spinner__indicator {
    stroke: white;
    stroke-linecap: round;
    animation: spin var(--speed) linear infinite;
  }

  .indicator__gradient {
    background: conic-gradient(
      from 270deg,
      var(--indicator-color) 5%,
      var(--track-color) 35% 60%,
      var(--indicator-color) 95%
    );
    width: 100%;
    height: 100%;
    transform-origin: 50% 50%;
    animation: spin-gradient var(--speed) linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      stroke-dasharray: 1.375em, 1.375em;
    }

    50% {
      transform: rotate(450deg);
      stroke-dasharray: 1.375em, 1.375em;
    }

    100% {
      transform: rotate(1080deg);
      stroke-dasharray: 1.375em, 1.375em;
    }
  }

  @keyframes spin-gradient {
    0% {
      transform: rotate(0deg);
    }

    50% {
      transform: rotate(180deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;
