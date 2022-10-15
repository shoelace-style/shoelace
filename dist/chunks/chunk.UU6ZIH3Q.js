import {
  component_styles_default
} from "./chunk.NEPMPPIC.js";
import {
  i
} from "./chunk.BNCM3323.js";

// src/components/details/details.styles.ts
var details_styles_default = i`
  ${component_styles_default}

  :host {
    display: block;
  }

  .details {
    border: solid 1px var(--sl-color-neutral-200);
    border-radius: var(--sl-border-radius-medium);
    background-color: var(--sl-color-neutral-0);
    overflow-anchor: none;
  }

  .details--disabled {
    opacity: 0.5;
  }

  .details__header {
    display: flex;
    align-items: center;
    border-radius: inherit;
    padding: var(--sl-spacing-medium);
    user-select: none;
    cursor: pointer;
  }

  .details__header:focus {
    outline: none;
  }

  .details__header:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: calc(1px + var(--sl-focus-ring-offset));
  }

  .details--disabled .details__header {
    cursor: not-allowed;
  }

  .details--disabled .details__header:focus-visible {
    outline: none;
    box-shadow: none;
  }

  .details__summary {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
  }

  .details__summary-icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    transition: var(--sl-transition-medium) transform ease;
  }

  .details--open .details__summary-icon {
    transform: rotate(90deg);
  }

  .details__body {
    overflow: hidden;
  }

  .details__content {
    padding: var(--sl-spacing-medium);
  }
`;

export {
  details_styles_default
};
