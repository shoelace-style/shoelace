import { css } from 'lit';
import componentStyles from '../../styles/component.styles';
import { focusVisibleSelector } from '../../internal/focus-visible';

export default css`
  ${componentStyles}

  :host {
    --divider-width: 4px;
    --divider-hit-area: 12px;

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
    flex: 0 0 var(--divider-width);
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
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
  :host(:not([vertical])) .start,
  :host(:not([vertical])) .end {
    max-width: 100%;
  }

  :host(:not([vertical], [disabled])) .divider {
    cursor: col-resize;
  }

  :host(:not([vertical])) .divider::after {
    display: flex;
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

  :host([vertical]) .start,
  :host([vertical]) .end {
    max-height: 100%;
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
