import { css } from 'lit';
import componentStyles from '../../styles/component.styles';
import { focusVisibleSelector } from '../../internal/focus-visible';

export default css`
  ${componentStyles}

  :host {
    display: inline-block;
    width: auto;
    cursor: pointer;
  }

  .button {
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    border-style: solid;
    border-width: var(--sl-input-border-width);
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-font-weight-semibold);
    text-decoration: none;
    user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0;
    transition: var(--sl-transition-fast) background-color, var(--sl-transition-fast) color,
      var(--sl-transition-fast) border, var(--sl-transition-fast) box-shadow;
    cursor: inherit;
  }

  .button::-moz-focus-inner {
    border: 0;
  }

  .button:focus {
    outline: none;
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When disabled, prevent mouse events from bubbling up */
  .button--disabled * {
    pointer-events: none;
  }

  /* Clicks on icons shouldn't prevent the button from gaining focus */
  .button::slotted(sl-icon) {
    pointer-events: none;
  }

  .button__prefix,
  .button__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .button__label ::slotted(sl-icon) {
    vertical-align: -2px;
  }

  /*
   * Standard buttons
   */

  /* Default */
  .button--standard.button--default {
    background-color: rgb(var(--sl-color-neutral-0));
    border-color: rgb(var(--sl-color-neutral-300));
    color: rgb(var(--sl-color-neutral-700));
  }

  .button--standard.button--default:hover:not(.button--disabled) {
    background-color: rgb(var(--sl-color-primary-50));
    border-color: rgb(var(--sl-color-primary-300));
    color: rgb(var(--sl-color-primary-700));
  }

  .button--standard.button--default${focusVisibleSelector}:not(.button--disabled) {
    background-color: rgb(var(--sl-color-primary-50));
    border-color: rgb(var(--sl-color-primary-400));
    color: rgb(var(--sl-color-primary-700));
    box-shadow: 0 0 0 var(--sl-focus-ring-width) rgb(var(--sl-color-primary-500) / var(--sl-focus-ring-alpha));
  }

  .button--standard.button--default:active:not(.button--disabled) {
    background-color: rgb(var(--sl-color-primary-100));
    border-color: rgb(var(--sl-color-primary-400));
    color: rgb(var(--sl-color-primary-700));
  }

  /* Primary */
  .button--standard.button--primary {
    background-color: rgb(var(--sl-color-primary-600));
    border-color: rgb(var(--sl-color-primary-600));
    color: rgb(var(--sl-color-neutral-0));
  }

  .button--standard.button--primary:hover:not(.button--disabled) {
    background-color: rgb(var(--sl-color-primary-500));
    border-color: rgb(var(--sl-color-primary-500));
    color: rgb(var(--sl-color-neutral-0));
  }

  .button--standard.button--primary${focusVisibleSelector}:not(.button--disabled) {
    background-color: rgb(var(--sl-color-primary-500));
    border-color: rgb(var(--sl-color-primary-500));
    color: rgb(var(--sl-color-neutral-0));
    box-shadow: 0 0 0 var(--sl-focus-ring-width) rgb(var(--sl-color-primary-500) / var(--sl-focus-ring-alpha));
  }

  .button--standard.button--primary:active:not(.button--disabled) {
    background-color: rgb(var(--sl-color-primary-600));
    border-color: rgb(var(--sl-color-primary-600));
    color: rgb(var(--sl-color-neutral-0));
  }

  /* Success */
  .button--standard.button--success {
    background-color: rgb(var(--sl-color-success-600));
    border-color: rgb(var(--sl-color-success-600));
    color: rgb(var(--sl-color-neutral-0));
  }

  .button--standard.button--success:hover:not(.button--disabled) {
    background-color: rgb(var(--sl-color-success-500));
    border-color: rgb(var(--sl-color-success-500));
    color: rgb(var(--sl-color-neutral-0));
  }

  .button--standard.button--success${focusVisibleSelector}:not(.button--disabled) {
    background-color: rgb(var(--sl-color-success-600));
    border-color: rgb(var(--sl-color-success-600));
    color: rgb(var(--sl-color-neutral-0));
    box-shadow: 0 0 0 var(--sl-focus-ring-width) rgb(var(--sl-color-success-500) / var(--sl-focus-ring-alpha));
  }

  .button--standard.button--success:active:not(.button--disabled) {
    background-color: rgb(var(--sl-color-success-600));
    border-color: rgb(var(--sl-color-success-600));
    color: rgb(var(--sl-color-neutral-0));
  }

  /* Neutral */
  .button--standard.button--neutral {
    background-color: rgb(var(--sl-color-neutral-600));
    border-color: rgb(var(--sl-color-neutral-600));
    color: rgb(var(--sl-color-neutral-0));
  }

  .button--standard.button--neutral:hover:not(.button--disabled) {
    background-color: rgb(var(--sl-color-neutral-500));
    border-color: rgb(var(--sl-color-neutral-500));
    color: rgb(var(--sl-color-neutral-0));
  }

  .button--standard.button--neutral${focusVisibleSelector}:not(.button--disabled) {
    background-color: rgb(var(--sl-color-neutral-500));
    border-color: rgb(var(--sl-color-neutral-500));
    color: rgb(var(--sl-color-neutral-0));
    box-shadow: 0 0 0 var(--sl-focus-ring-width) rgb(var(--sl-color-neutral-500) / var(--sl-focus-ring-alpha));
  }

  .button--standard.button--neutral:active:not(.button--disabled) {
    background-color: rgb(var(--sl-color-neutral-600));
    border-color: rgb(var(--sl-color-neutral-600));
    color: rgb(var(--sl-color-neutral-0));
  }

  /* Warning */
  .button--standard.button--warning {
    background-color: rgb(var(--sl-color-warning-600));
    border-color: rgb(var(--sl-color-warning-600));
    color: rgb(var(--sl-color-neutral-0));
  }
  .button--standard.button--warning:hover:not(.button--disabled) {
    background-color: rgb(var(--sl-color-warning-500));
    border-color: rgb(var(--sl-color-warning-500));
    color: rgb(var(--sl-color-neutral-0));
  }

  .button--standard.button--warning${focusVisibleSelector}:not(.button--disabled) {
    background-color: rgb(var(--sl-color-warning-500));
    border-color: rgb(var(--sl-color-warning-500));
    color: rgb(var(--sl-color-neutral-0));
    box-shadow: 0 0 0 var(--sl-focus-ring-width) rgb(var(--sl-color-warning-500) / var(--sl-focus-ring-alpha));
  }

  .button--standard.button--warning:active:not(.button--disabled) {
    background-color: rgb(var(--sl-color-warning-600));
    border-color: rgb(var(--sl-color-warning-600));
    color: rgb(var(--sl-color-neutral-0));
  }

  /* Danger */
  .button--standard.button--danger {
    background-color: rgb(var(--sl-color-danger-600));
    border-color: rgb(var(--sl-color-danger-600));
    color: rgb(var(--sl-color-neutral-0));
  }

  .button--standard.button--danger:hover:not(.button--disabled) {
    background-color: rgb(var(--sl-color-danger-500));
    border-color: rgb(var(--sl-color-danger-500));
    color: rgb(var(--sl-color-neutral-0));
  }

  .button--standard.button--danger${focusVisibleSelector}:not(.button--disabled) {
    background-color: rgb(var(--sl-color-danger-500));
    border-color: rgb(var(--sl-color-danger-500));
    color: rgb(var(--sl-color-neutral-0));
    box-shadow: 0 0 0 var(--sl-focus-ring-width) rgb(var(--sl-color-danger-500) / var(--sl-focus-ring-alpha));
  }

  .button--standard.button--danger:active:not(.button--disabled) {
    background-color: rgb(var(--sl-color-danger-600));
    border-color: rgb(var(--sl-color-danger-600));
    color: rgb(var(--sl-color-neutral-0));
  }

  /*
   * Outline buttons
   */

  .button--outline {
    background: none;
    border: solid 1px;
  }

  /* Default */
  .button--outline.button--default {
    border-color: rgb(var(--sl-color-neutral-300));
    color: rgb(var(--sl-color-neutral-700));
  }

  .button--outline.button--default:hover:not(.button--disabled) {
    border-color: rgb(var(--sl-color-primary-600));
    background-color: rgb(var(--sl-color-primary-600));
    color: rgb(var(--sl-color-neutral-0));
  }

  .button--outline.button--default${focusVisibleSelector}:not(.button--disabled) {
    border-color: rgb(var(--sl-color-primary-500));
    box-shadow: 0 0 0 var(--sl-focus-ring-width) rgb(var(--sl-color-primary-500) / var(--sl-focus-ring-alpha));
  }

  .button--outline.button--default:active:not(.button--disabled) {
    border-color: rgb(var(--sl-color-primary-700));
    background-color: rgb(var(--sl-color-primary-700));
    color: rgb(var(--sl-color-neutral-0));
  }

  /* Primary */
  .button--outline.button--primary {
    border-color: rgb(var(--sl-color-primary-600));
    color: rgb(var(--sl-color-primary-600));
  }

  .button--outline.button--primary:hover:not(.button--disabled) {
    background-color: rgb(var(--sl-color-primary-600));
    color: rgb(var(--sl-color-neutral-0));
  }

  .button--outline.button--primary${focusVisibleSelector}:not(.button--disabled) {
    border-color: rgb(var(--sl-color-primary-500));
    box-shadow: 0 0 0 var(--sl-focus-ring-width) rgb(var(--sl-color-primary-500) / var(--sl-focus-ring-alpha));
  }

  .button--outline.button--primary:active:not(.button--disabled) {
    border-color: rgb(var(--sl-color-primary-700));
    background-color: rgb(var(--sl-color-primary-700));
    color: rgb(var(--sl-color-neutral-0));
  }

  /* Success */
  .button--outline.button--success {
    border-color: rgb(var(--sl-color-success-600));
    color: rgb(var(--sl-color-success-600));
  }

  .button--outline.button--success:hover:not(.button--disabled) {
    background-color: rgb(var(--sl-color-success-600));
    color: rgb(var(--sl-color-neutral-0));
  }

  .button--outline.button--success${focusVisibleSelector}:not(.button--disabled) {
    border-color: rgb(var(--sl-color-success-500));
    box-shadow: 0 0 0 var(--sl-focus-ring-width) rgb(var(--sl-color-success-500) / var(--sl-focus-ring-alpha));
  }

  .button--outline.button--success:active:not(.button--disabled) {
    border-color: rgb(var(--sl-color-success-700));
    background-color: rgb(var(--sl-color-success-700));
    color: rgb(var(--sl-color-neutral-0));
  }

  /* Neutral */
  .button--outline.button--neutral {
    border-color: rgb(var(--sl-color-neutral-600));
    color: rgb(var(--sl-color-neutral-600));
  }

  .button--outline.button--neutral:hover:not(.button--disabled) {
    background-color: rgb(var(--sl-color-neutral-600));
    color: rgb(var(--sl-color-neutral-0));
  }

  .button--outline.button--neutral${focusVisibleSelector}:not(.button--disabled) {
    border-color: rgb(var(--sl-color-neutral-500));
    box-shadow: 0 0 0 var(--sl-focus-ring-width) rgb(var(--sl-color-neutral-500) / var(--sl-focus-ring-alpha));
  }

  .button--outline.button--neutral:active:not(.button--disabled) {
    border-color: rgb(var(--sl-color-neutral-700));
    background-color: rgb(var(--sl-color-neutral-700));
    color: rgb(var(--sl-color-neutral-0));
  }

  /* Warning */
  .button--outline.button--warning {
    border-color: rgb(var(--sl-color-warning-600));
    color: rgb(var(--sl-color-warning-600));
  }

  .button--outline.button--warning:hover:not(.button--disabled) {
    background-color: rgb(var(--sl-color-warning-600));
    color: rgb(var(--sl-color-neutral-0));
  }

  .button--outline.button--warning${focusVisibleSelector}:not(.button--disabled) {
    border-color: rgb(var(--sl-color-warning-500));
    box-shadow: 0 0 0 var(--sl-focus-ring-width) rgb(var(--sl-color-warning-500) / var(--sl-focus-ring-alpha));
  }

  .button--outline.button--warning:active:not(.button--disabled) {
    border-color: rgb(var(--sl-color-warning-700));
    background-color: rgb(var(--sl-color-warning-700));
    color: rgb(var(--sl-color-neutral-0));
  }

  /* Danger */
  .button--outline.button--danger {
    border-color: rgb(var(--sl-color-danger-600));
    color: rgb(var(--sl-color-danger-600));
  }

  .button--outline.button--danger:hover:not(.button--disabled) {
    background-color: rgb(var(--sl-color-danger-600));
    color: rgb(var(--sl-color-neutral-0));
  }

  .button--outline.button--danger${focusVisibleSelector}:not(.button--disabled) {
    border-color: rgb(var(--sl-color-danger-500));
    box-shadow: 0 0 0 var(--sl-focus-ring-width) rgb(var(--sl-color-danger-500) / var(--sl-focus-ring-alpha));
  }

  .button--outline.button--danger:active:not(.button--disabled) {
    border-color: rgb(var(--sl-color-danger-700));
    background-color: rgb(var(--sl-color-danger-700));
    color: rgb(var(--sl-color-neutral-0));
  }

  /*
   * Text buttons
   */

  .button--text {
    background-color: transparent;
    border-color: transparent;
    color: rgb(var(--sl-color-primary-600));
  }

  .button--text:hover:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: rgb(var(--sl-color-primary-500));
  }

  .button--text${focusVisibleSelector}:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: rgb(var(--sl-color-primary-500));
    box-shadow: 0 0 0 var(--sl-focus-ring-width) rgb(var(--sl-color-primary-500) / var(--sl-focus-ring-alpha));
  }

  .button--text:active:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: rgb(var(--sl-color-primary-700));
  }

  /*
   * Size modifiers
   */

  .button--small {
    font-size: var(--sl-button-font-size-small);
    height: var(--sl-input-height-small);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
  }

  .button--medium {
    font-size: var(--sl-button-font-size-medium);
    height: var(--sl-input-height-medium);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
  }

  .button--large {
    font-size: var(--sl-button-font-size-large);
    height: var(--sl-input-height-large);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
  }

  /*
   * Pill modifier
   */

  .button--pill.button--small {
    border-radius: var(--sl-input-height-small);
  }

  .button--pill.button--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .button--pill.button--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Circle modifier
   */

  .button--circle {
    padding-left: 0;
    padding-right: 0;
  }

  .button--circle.button--small {
    width: var(--sl-input-height-small);
    border-radius: 50%;
  }

  .button--circle.button--medium {
    width: var(--sl-input-height-medium);
    border-radius: 50%;
  }

  .button--circle.button--large {
    width: var(--sl-input-height-large);
    border-radius: 50%;
  }

  .button--circle .button__prefix,
  .button--circle .button__suffix,
  .button--circle .button__caret {
    display: none;
  }

  /*
   * Caret modifier
   */

  .button--caret .button__suffix {
    display: none;
  }

  .button--caret .button__caret {
    display: flex;
    align-items: center;
  }

  .button--caret .button__caret svg {
    width: 1em;
    height: 1em;
  }

  /*
   * Loading modifier
   */

  .button--loading {
    position: relative;
    cursor: wait;
  }

  .button--loading .button__prefix,
  .button--loading .button__label,
  .button--loading .button__suffix,
  .button--loading .button__caret {
    visibility: hidden;
  }

  .button--loading sl-spinner {
    --indicator-color: currentColor;
    position: absolute;
    font-size: 1em;
    height: 1em;
    width: 1em;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
  }

  /*
   * Badges
   */

  .button ::slotted(sl-badge) {
    position: absolute;
    top: 0;
    right: 0;
    transform: translateY(-50%) translateX(50%);
    pointer-events: none;
  }

  /*
   * Button spacing
   */

  .button--has-label.button--small .button__label {
    padding: 0 var(--sl-spacing-small);
  }

  .button--has-label.button--medium .button__label {
    padding: 0 var(--sl-spacing-medium);
  }

  .button--has-label.button--large .button__label {
    padding: 0 var(--sl-spacing-large);
  }

  .button--has-prefix.button--small {
    padding-left: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--small .button__label {
    padding-left: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--medium {
    padding-left: var(--sl-spacing-small);
  }

  .button--has-prefix.button--medium .button__label {
    padding-left: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large {
    padding-left: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large .button__label {
    padding-left: var(--sl-spacing-small);
  }

  .button--has-suffix.button--small,
  .button--caret.button--small {
    padding-right: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--small .button__label,
  .button--caret.button--small .button__label {
    padding-right: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--medium,
  .button--caret.button--medium {
    padding-right: var(--sl-spacing-small);
  }

  .button--has-suffix.button--medium .button__label,
  .button--caret.button--medium .button__label {
    padding-right: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large,
  .button--caret.button--large {
    padding-right: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large .button__label,
  .button--caret.button--large .button__label {
    padding-right: var(--sl-spacing-small);
  }

  /*
   * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
   * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
   * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
   * buttons and we style them here instead.
   */

  :host(.sl-button-group__button--first:not(.sl-button-group__button--last)) .button {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  :host(.sl-button-group__button--inner) .button {
    border-radius: 0;
  }

  :host(.sl-button-group__button--last:not(.sl-button-group__button--first)) .button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  /* All except the first */
  :host(.sl-button-group__button:not(.sl-button-group__button--first)) {
    margin-left: calc(-1 * var(--sl-input-border-width));
  }

  /* Add a visual separator between solid buttons */
  :host(.sl-button-group__button:not(.sl-button-group__button--focus, .sl-button-group__button--first, [type='default']):not(:hover, :active, :focus))
    .button:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    border-left: solid 1px rgb(var(--sl-color-neutral-0) / 20%);
  }

  /* Bump focused buttons up so their focus ring isn't clipped */
  :host(.sl-button-group__button--hover) {
    z-index: 1;
  }

  :host(.sl-button-group__button--focus) {
    z-index: 2;
  }
`;
