import { css } from 'lit';
import componentStyles from '../../styles/component.styles.js';

export default css`
  ${componentStyles}

  :host {
    display: inline-flex;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: max(12px, 0.75em);
    font-weight: var(--ts-font-semibold);
    letter-spacing: var(--sl-letter-spacing-normal);
    line-height: 1;
    border-radius: var(--sl-border-radius-pill);
    border: solid 1px var(--sl-color-neutral-0);
    white-space: nowrap;
    padding: var(--sl-spacing-2x-small) var(--sl-spacing-x-small);
    user-select: none;
    -webkit-user-select: none;
    cursor: inherit;
  }

  /* Variant modifiers */
  .badge--primary {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--success {
    background-color: var(--sl-color-success-700);
    color: var(--sl-color-neutral-0);
  }

  .badge--neutral {
    border-color: var(--sl-color-neutral-400);
    background-color: var(--sl-color-neutral-0);
    color: var(--sl-color-neutral-900);
  }

  .badge--warning {
    background-color: var(--sl-color-warning-800);
    color: var(--sl-color-neutral-0);
  }

  .badge--danger {
    border-color: var(--sl-color-danger-900);
    background-color: var(--sl-color-danger-700);
    color: var(--sl-color-neutral-0);
  }

  /* Square modifier */
  .badge--square {
    border-radius: var(--sl-border-radius-small);
  }

  /* Pulse modifier */
  .badge--pulse {
    animation: pulse 1.5s infinite;
  }

  .badge--pulse.badge--primary {
    --pulse-color: var(--sl-color-primary-600);
  }

  .badge--pulse.badge--success {
    --pulse-color: var(--sl-color-success-600);
  }

  .badge--pulse.badge--neutral {
    --pulse-color: var(--sl-color-neutral-600);
  }

  .badge--pulse.badge--warning {
    --pulse-color: var(--sl-color-warning-600);
  }

  .badge--pulse.badge--danger {
    --pulse-color: var(--sl-color-danger-600);
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
