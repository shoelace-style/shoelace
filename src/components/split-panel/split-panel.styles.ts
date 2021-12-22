import { css } from 'lit';
import componentStyles from '../../styles/component.styles';
import { focusVisibleSelector } from '../../internal/focus-visible';

export default css`
  ${componentStyles}

  :host {
    --divider-width: 4px;
    --divider-hit-area: 12px;
    --start-min: 0%;
    --start-max: 100%;
    --end-min: 0%;
    --end-max: 100%;

    display: flex;
  }

  .start,
  .end {
    overflow: hidden;
  }

  .start {
    background: var(--sl-color-blue-50);
  }

  .end {
    background: var(--sl-color-orange-50);
  }

  .divider {
    position: relative;
    flex: 0 0 var(--divider-width);
    background-color: var(--sl-color-neutral-200);
    z-index: 1;
  }

  .divider:focus {
    outline: none;
  }

  :host(:not([disabled])) .divider${focusVisibleSelector} {
    background-color: var(--sl-color-primary-600);
  }

  :host([disabled]) .divider {
    cursor: not-allowed;
  }

  /* Horizontal */
  :host(:not([vertical])) .start {
    min-width: var(--start-min);
    max-width: var(--start-max);
  }

  :host(:not([vertical])) .end {
    min-width: var(--end-min);
    max-width: var(--end-max);
  }

  :host(:not([vertical], [disabled])) .divider {
    cursor: col-resize;
  }

  :host(:not([vertical])) .divider::after {
    content: '';
    position: absolute;
    height: 100%;
    left: calc(var(--divider-hit-area) / -2 + var(--divider-width) / 2);
    width: var(--divider-hit-area);
  }

  /* Vertical */
  :host([vertical]) {
    flex-direction: column;
  }

  :host([vertical]) .start {
    min-height: var(--start-min);
    max-height: var(--start-max);
  }

  :host([vertical]) .end {
    min-height: var(--end-min);
    max-height: var(--end-max);
  }

  :host([vertical]:not([disabled])) .divider {
    cursor: row-resize;
  }

  :host([vertical]) .divider::after {
    content: '';
    position: absolute;
    width: 100%;
    top: calc(var(--divider-hit-area) / -2 + var(--divider-width) / 2);
    height: var(--divider-hit-area);
  }
`;
