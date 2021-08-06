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
    background-color: rgb(var(--sl-color-primary-500));
    color: rgb(var(--sl-color-1000));
  }

  .badge--success {
    background-color: rgb(var(--sl-color-success-500));
    color: rgb(var(--sl-color-1000));
  }

  .badge--neutral {
    background-color: rgb(var(--sl-color-neutral-500));
    color: rgb(var(--sl-color-1000));
  }

  .badge--warning {
    background-color: rgb(var(--sl-color-warning-500));
    color: rgb(var(--sl-color-1000));
  }

  .badge--danger {
    background-color: rgb(var(--sl-color-danger-500));
    color: rgb(var(--sl-color-1000));
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
    --pulse-color: rgb(var(--sl-color-primary-500));
  }

  .badge--pulse.badge--success {
    --pulse-color: rgb(var(--sl-color-success-500));
  }

  .badge--pulse.badge--neutral {
    --pulse-color: rgb(var(--sl-color-neutral-500));
  }

  .badge--pulse.badge--warning {
    --pulse-color: rgb(var(--sl-color-warning-500));
  }

  .badge--pulse.badge--danger {
    --pulse-color: rgb(var(--sl-color-danger-500));
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
