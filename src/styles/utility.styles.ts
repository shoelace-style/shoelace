import { css } from 'lit';

export default css`
  .sl-scroll-lock {
    overflow: hidden !important;
  }

  .sl-toast-stack {
    position: fixed;
    top: 0;
    right: 0;
    z-index: var(--sl-z-index-toast);
    width: 28rem;
    max-width: 100%;
    max-height: 100%;
    overflow: auto;
  }

  .sl-toast-stack sl-alert {
    --box-shadow: var(--sl-shadow-large);
    margin: var(--sl-spacing-medium);
  }

  .sl-kbd {
    font-family: var(--sl-font-mono);
    font-size: 87.5%;
    background-color: var(--sl-color-neutral-50);
    border-radius: var(--sl-border-radius-small);
    border: solid 1px var(--sl-color-neutral-200);
    box-shadow: inset 0 1px 0 var(--sl-color-neutral-0);
    padding: 2px 5px;
  }
`;
