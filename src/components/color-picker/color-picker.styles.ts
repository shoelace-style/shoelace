import { css } from 'lit';
import componentStyles from '../../styles/component.styles';

export default css`
  ${componentStyles}

  :host {
    --grid-width: 260px;
    --grid-height: 200px;
    --grid-handle-size: 16px;
    --slider-height: 12px;
    --slider-handle-size: 14px;

    display: inline-block;
  }

  .color-picker {
    width: var(--grid-width);
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    color: var(--color);
    background-color: var(--sl-panel-background-color);
    border-radius: var(--sl-border-radius-medium);
    user-select: none;
  }

  .color-picker--inline {
    border: solid 1px var(--sl-panel-border-color);
    box-shadow: var(--sl-shadow-small);
  }

  .color-picker__grid {
    position: relative;
    height: var(--grid-height);
    background-image: linear-gradient(
        to bottom,
        hsl(0, 0%, 100%) 0%,
        hsla(0, 0%, 100%, 0) 50%,
        hsla(0, 0%, 0%, 0) 50%,
        hsl(0, 0%, 0%) 100%
      ),
      linear-gradient(to right, hsl(0, 0%, 50%) 0%, hsla(0, 0%, 50%, 0) 100%);
    border-top-left-radius: var(--sl-border-radius-medium);
    border-top-right-radius: var(--sl-border-radius-medium);
    cursor: crosshair;
  }

  .color-picker__grid-handle {
    position: absolute;
    width: var(--grid-handle-size);
    height: var(--grid-handle-size);
    border-radius: 50%;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
    border: solid 2px white;
    margin-top: calc(var(--grid-handle-size) / -2);
    margin-left: calc(var(--grid-handle-size) / -2);
  }

  .color-picker__grid-handle:focus {
    outline: none;
    box-shadow: 0 0 0 1px var(--sl-color-primary-500),
      0 0 0 var(--sl-focus-ring-width) var(--sl-focus-ring-color-primary);
  }

  .color-picker__controls {
    padding: var(--sl-spacing-small);
    display: flex;
    align-items: center;
  }

  .color-picker__sliders {
    flex: 1 1 auto;
  }

  .color-picker__slider {
    position: relative;
    height: var(--slider-height);
    border-radius: var(--sl-border-radius-pill);
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);
  }

  .color-picker__slider:not(:last-of-type) {
    margin-bottom: var(--sl-spacing-small);
  }

  .color-picker__slider-handle {
    position: absolute;
    top: calc(50% - var(--slider-handle-size) / 2);
    width: var(--slider-handle-size);
    height: var(--slider-handle-size);
    background-color: white;
    border-radius: 50%;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
    margin-left: calc(var(--slider-handle-size) / -2);
  }

  .color-picker__slider-handle:focus {
    outline: none;
    box-shadow: 0 0 0 1px var(--sl-color-primary-500),
      0 0 0 var(--sl-focus-ring-width) var(--sl-focus-ring-color-primary);
  }

  .color-picker__hue {
    background-image: linear-gradient(
      to right,
      rgb(255, 0, 0) 0%,
      rgb(255, 255, 0) 17%,
      rgb(0, 255, 0) 33%,
      rgb(0, 255, 255) 50%,
      rgb(0, 0, 255) 67%,
      rgb(255, 0, 255) 83%,
      rgb(255, 0, 0) 100%
    );
  }

  .color-picker__alpha {
    .color-picker__alpha-gradient {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: inherit;
    }
  }

  .color-picker__preview {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 3.125rem;
    height: var(--sl-input-height-small);
    border: none;
    border-radius: var(--sl-input-border-radius-small);
    background: none;
    margin-left: var(--sl-spacing-small);
    cursor: copy;
  }

  .color-picker__preview:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);

    /* We use a custom property in lieu of currentColor because of https://bugs.webkit.org/show_bug.cgi?id=216780 */
    background-color: var(--preview-color);
  }

  .color-picker__preview:focus {
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-focus-ring-color-primary);
    outline: none;
  }

  .color-picker__preview-color {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: solid 1px rgba(0, 0, 0, 0.125);
  }

  .color-picker__copy-feedback {
    width: calc(var(--sl-input-height-small) / 2);
    height: calc(var(--sl-input-height-small) / 2);
    color: white;
    background-color: var(--sl-color-gray-900);
    border-radius: var(--sl-border-radius-circle);
    opacity: 0;
  }

  .color-picker__copy-feedback.color-picker__copy-feedback--visible {
    animation: copied 1s;
  }

  @keyframes copied {
    0% {
      transform: scale(0.8);
      opacity: 0;
    }

    30% {
      transform: scale(1.2);
      opacity: 1;
    }

    70% {
      transform: scale(1.2);
      opacity: 1;
    }

    100% {
      transform: scale(1.4);
      opacity: 0;
    }
  }

  .color-picker__user-input {
    display: flex;
    padding: 0 var(--sl-spacing-small) var(--sl-spacing-small) var(--sl-spacing-small);
  }

  .color-picker__user-input sl-input {
    min-width: 0; /* fix input width in Safari */
    flex: 1 1 auto;
  }

  .color-picker__user-input sl-button {
    min-width: 3.125rem;
    max-width: 3.125rem;
    font-size: 1rem;
    margin-left: var(--sl-spacing-small);
  }

  .color-picker__swatches {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-gap: 6px;
    justify-items: center;
    border-top: solid 1px var(--sl-color-gray-200);
    padding: var(--sl-spacing-small);
  }

  .color-picker__swatch {
    position: relative;
    width: 20px;
    height: 20px;
    border-radius: 2px;
  }

  .color-picker__swatch .color-picker__swatch-color {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: solid 1px rgba(0, 0, 0, 0.125);
    border-radius: inherit;
    cursor: pointer;
  }

  .color-picker__swatch:focus {
    outline: none;
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-focus-ring-color-primary);
  }

  .color-picker__transparent-bg {
    background-image: linear-gradient(45deg, #eee 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #eee 75%), linear-gradient(45deg, transparent 75%, #eee 75%),
      linear-gradient(45deg, #eee 25%, transparent 25%);
    background-size: 10px 10px;
    background-position: 0 0, 0 0, -5px -5px, 5px 5px;
  }

  .color-picker--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .color-picker--disabled .color-picker__grid,
  .color-picker--disabled .color-picker__grid-handle,
  .color-picker--disabled .color-picker__slider,
  .color-picker--disabled .color-picker__slider-handle,
  .color-picker--disabled .color-picker__preview,
  .color-picker--disabled .color-picker__swatch,
  .color-picker--disabled .color-picker__swatch-color {
    pointer-events: none;
  }

  /*
   * Color dropdown
   */

  .color-dropdown::part(panel) {
    max-height: none;
    overflow: visible;
  }

  .color-dropdown__trigger {
    display: inline-block;
    position: relative;
    background-color: transparent;
    border: none;
    cursor: pointer;
    transition: var(--sl-transition-fast) box-shadow;
  }

  .color-dropdown__trigger.color-dropdown__trigger--small {
    width: var(--sl-input-height-small);
    height: var(--sl-input-height-small);
    border-radius: var(--sl-border-radius-circle);
  }

  .color-dropdown__trigger.color-dropdown__trigger--medium {
    width: var(--sl-input-height-medium);
    height: var(--sl-input-height-medium);
    border-radius: var(--sl-border-radius-circle);
  }

  .color-dropdown__trigger.color-dropdown__trigger--large {
    width: var(--sl-input-height-large);
    height: var(--sl-input-height-large);
    border-radius: var(--sl-border-radius-circle);
  }

  .color-dropdown__trigger:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background-color: currentColor;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.25);
    transition: inherit;
  }

  .color-dropdown__trigger:focus {
    outline: none;
  }

  .color-dropdown__trigger:focus:not(.color-dropdown__trigger--disabled) {
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-focus-ring-color-primary);
    outline: none;
  }

  .color-dropdown__trigger:focus:not(.color-dropdown__trigger--disabled):before {
    box-shadow: inset 0 0 0 1px var(--sl-color-primary-500);
  }

  .color-dropdown__trigger.color-dropdown__trigger--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
