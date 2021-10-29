import { css } from 'lit';
import componentStyles from '../../styles/component.styles';

export default css`
  ${componentStyles}

  :host {
    display: contents;
  }

  ::slotted(sl-menu) {
    min-width: 180px;
    background: rgb(var(--sl-panel-background-color));
    border: solid var(--sl-panel-border-width) rgb(var(--sl-panel-border-color));
    border-radius: var(--sl-border-radius-medium);
    box-shadow: var(--sl-shadow-large);
  }

  .context-menu {
    position: relative;
    z-index: var(--sl-z-index-dropdown);
  }

  .context-menu__locater {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    pointer-events: none;
  }

  .dropdown__positioner {
    position: absolute;
  }

  .context-menu__menu {
    position: relative;
    top: 0;
    left: 0;
    pointer-events: all;
  }
`;
