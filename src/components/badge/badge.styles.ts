import { css } from 'lit';
import componentStyles from '../../styles/component.styles';

export default css`
  ${componentStyles}

  :host {
    display: inline-flex;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: var(--sl-font-size-x-small);
    font-weight: var(--sl-font-weight-semibold);
    letter-spacing: var(--sl-letter-spacing-normal);
    line-height: 1;
    border-radius: var(--sl-border-radius-small);
    white-space: nowrap;
    padding: 3px 6px;
    user-select: none;
    cursor: inherit;
  }

  /* Type modifiers */
  .badge--primary {
    background-color: var(--sl-color-primary-500);
    color: var(--sl-color-primary-text);
  }

  .badge--success {
    background-color: var(--sl-color-success-500);
    color: var(--sl-color-success-text);
  }

  .badge--info {
    background-color: var(--sl-color-info-500);
    color: var(--sl-color-info-text);
  }

  .badge--warning {
    background-color: var(--sl-color-warning-500);
    color: var(--sl-color-warning-text);
  }

  .badge--danger {
    background-color: var(--sl-color-danger-500);
    color: var(--sl-color-danger-text);
  }

  /* Pill modifier */
  .badge--pill {
    border-radius: var(--sl-border-radius-pill);
  }

  /* Pulse modifier */
  .badge--pulse {
    animation: pulse 1.5s infinite;
  }

  .badge--pulse.badge--primary {
    --pulse-color: var(--sl-color-primary-500);
  }

  .badge--pulse.badge--success {
    --pulse-color: var(--sl-color-success-500);
  }

  .badge--pulse.badge--info {
    --pulse-color: var(--sl-color-info-500);
  }

  .badge--pulse.badge--warning {
    --pulse-color: var(--sl-color-warning-500);
  }

  .badge--pulse.badge--danger {
    --pulse-color: var(--sl-color-danger-500);
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 var(--pulse-color);
    }
    70% {
      box-shadow: 0 0 0 0.5rem transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }
`;
