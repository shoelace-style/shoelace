import { css } from 'lit';

export default css`
  :host {
    --color: var(--sl-color-neutral-300);
    --width: var(--sl-panel-border-width);
    --spacing: var(--sl-spacing-medium);
  }

  :host(:not([vertical])) {
    display: block;
    border-top: solid var(--width) var(--color) !important; /* !important needed to override Tailwind's border resets */
    margin: var(--spacing) 0;
  }

  :host([vertical]) {
    display: inline-block;
    height: 100%;
    border-left: solid var(--width) var(--color) !important; /* !important needed to override Tailwind's border resets */
    margin: 0 var(--spacing);
  }
`;
