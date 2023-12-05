import { css } from 'lit';
import componentStyles from '../../styles/component.styles.js';

export default css`
  ${componentStyles}

  :host {
    --width: 30rem;
    --header-spacing: var(--ts-spacing-large) var(--ts-spacing-large) var(--sl-spacing-medium);
    --body-spacing: var(--sl-spacing-x-small) var(--ts-spacing-large);
    --footer-spacing: var(--ts-spacing-large);

    display: contents;
  }

  .dialog {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: var(--sl-z-index-dialog);
  }

  .dialog--small {
    --width: 25rem;
  }

  .dialog--medium {
    --width: 30rem;
  }

  .dialog--large {
    --width: 37.5rem;
  }

  .dialog__panel {
    display: flex;
    flex-direction: column;
    z-index: 2;
    width: var(--width);
    max-width: calc(100% - var(--sl-spacing-2x-large));
    max-height: calc(100% - var(--sl-spacing-2x-large));
    background-color: var(--sl-panel-background-color);
    border-radius: var(--sl-border-radius-x-large);
    box-shadow: var(--sl-shadow-x-large);
  }

  .dialog__panel:focus {
    outline: none;
  }

  .dialog--open .dialog__panel {
    display: flex;
    opacity: 1;
  }

  .dialog__header {
    flex: 0 0 auto;
    display: flex;
  }

  .dialog--default .dialog__title,
  .dialog--warning .dialog__title {
    display: flex;
    flex: 1 1 auto;
    align-items: center;
    font: inherit;
    /* ts-heading-6 */
    font-size: var(--ts-font-xl); /* 20px */
    font-weight: var(--ts-font-medium); /* 500 */
    letter-spacing: var(--ts-tracking-tight); /* -0.025em */
    line-height: var(--ts-leading-6); /* 1.5rem * 24px */
    padding: var(--header-spacing);
    margin: 0;
  }

  .dialog--announcement .dialog__title {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* ts-heading-5 */
    font-size: var(--ts-font-2xl); /* 24px */
    font-weight: var(--ts-font-bold); /* 700 */
    line-height: var(--ts-leading-7); /* 1.75rem * 28px */
    letter-spacing: var(--ts-tracking-tight); /* -0.025em */
    padding: var(--header-spacing);
    margin: 0;
  }

  .dialog--default .dialog__title ::slotted(sl-icon),
  .dialog--warning .dialog__title ::slotted(sl-icon) {
    border-radius: var(--sl-border-radius-pill);
    padding: var(--sl-spacing-x-small);
    margin-right: var(--sl-spacing-medium);
  }

  .dialog--announcement .dialog__title ::slotted(sl-icon) {
    font-size: var(--sl-font-size-3x-large);
    border-radius: var(--sl-border-radius-pill);
    padding: var(--ts-spacing-large);
    margin-bottom: var(--sl-spacing-medium);
  }

  .dialog--default .dialog__title ::slotted(sl-icon),
  .dialog--announcement .dialog__title ::slotted(sl-icon) {
    background-color: var(--sl-color-primary-100);
    color: var(--sl-color-primary-600);
  }

  .dialog--announcement .dialog__title ::slotted([slot='announcement-intro']) {
    color: var(--ts-color-text-subdued);
    /* ts-heading-6 */
    font-size: var(--ts-font-xl); /* 20px */
    font-weight: var(--ts-font-medium); /* 500 */
    letter-spacing: var(--ts-tracking-tight); /* -0.025em */
    line-height: var(--ts-leading-6); /* 1.5rem * 24px */
    padding: var(--sl-spacing-medium) 0;
  }

  .dialog--warning .dialog__title ::slotted(sl-icon) {
    background-color: var(--sl-color-warning-100);
    color: var(--sl-color-warning-800);
  }

  .dialog__header-actions {
    flex-shrink: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: end;
    align-items: center;
    gap: var(--sl-spacing-x-small);
    padding: var(--header-spacing);
  }

  .dialog__header-actions sl-icon-button,
  .dialog__header-actions ::slotted(sl-icon-button) {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-medium);
  }

  .dialog__close {
    align-items: center;
    display: flex;
    flex: none;
  }

  .dialog--announcement .dialog__header-actions {
    display: none;
  }

  .dialog__body {
    flex: 1 1 auto;
    display: block;
    padding: var(--body-spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    color: var(--ts-color-text-subdued);
    /* ts-body-1 */
    font-size: var(--ts-font-base); /* 16px */
    font-weight: var(--ts-font-normal); /* 400 */
    letter-spacing: var(--ts-tracking-normal); /* normal */
    line-height: var(--ts-leading-6); /* 1.5rem * 24px */
  }

  .dialog--has-header-icon .dialog__body {
    padding: var(--sl-spacing-x-small) var(--ts-spacing-2x-large) var(--sl-spacing-x-small) var(--ts-spacing-5x-large);
  }

  .dialog--announcement .dialog__body {
    padding: var(--sl-spacing-x-small) var(--sl-spacing-2x-large);
  }

  .dialog__footer {
    flex: 0 0 auto;
    text-align: right;
    padding: var(--footer-spacing);
  }

  .dialog--announcement .dialog__title,
  .dialog--announcement .dialog__body,
  .dialog--announcement .dialog__footer {
    text-align: center;
  }

  .dialog--small .dialog__body,
  .dialog--announcement .dialog__footer ::slotted([slot='footer-text']) {
    color: var(--ts-color-text-subdued);
    /* ts-body-2 */
    font-size: var(--ts-font-sm); /* 14px */
    font-weight: var(--ts-font-normal); /* 400 */
    line-height: var(--ts-leading-5); /* 1.25rem * 20px */
    letter-spacing: var(--ts-tracking-normal); /* normal */
  }

  .dialog--small .dialog__body {
    padding: var(--body-spacing);
  }

  .dialog--announcement .dialog__footer ::slotted([slot='footer-text']) {
    padding: var(--sl-spacing-large);
  }

  .dialog__footer ::slotted(sl-button:not(:first-of-type)) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  .dialog:not(.dialog--has-footer) .dialog__footer {
    display: none;
  }

  .dialog__overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--sl-overlay-background-color);
  }

  @media screen and (max-width: 420px) {
    :host {
      --header-spacing: var(--sl-spacing-large) var(--sl-spacing-large) var(--sl-spacing-small);
      --body-spacing: var(--sl-spacing-x-small) var(--sl-spacing-large);
      --footer-spacing: var(--sl-spacing-large);
    }

    .dialog--default .dialog__title,
    .dialog--warning .dialog__title {
      padding: var(--header-spacing);
    }

    .dialog--has-header-icon {
      padding: var(--body-spacing);
    }

    .dialog--has-header-icon .dialog__title {
      flex-direction: column;
    }

    .dialog--has-header-icon .dialog__title ::slotted(sl-icon) {
      font-size: var(--sl-font-size-x-large);
      margin-right: 0;
      margin-bottom: var(--sl-spacing-large);
      padding: var(--sl-spacing-medium);
    }

    .dialog--announcement .dialog__title ::slotted([slot='announcement-intro']) {
      padding: var(--sl-spacing-x-small) 0;
    }

    .dialog__header-actions {
      display: none;
    }

    /* Ensure there's enough vertical padding for phones that don't update vh when chrome appears (e.g. iPhone) */

    .dialog__panel {
      height: max-content;
      max-height: 80vh;
    }

    .dialog--has-header-icon .dialog__body {
      text-align: center;
      padding: var(--body-spacing);
    }

    .dialog__body {
      /* ts-body-2 */
      font-size: var(--ts-font-sm); /* 14px */
      font-weight: var(--ts-font-normal); /* 400 */
      line-height: var(--ts-leading-5); /* 1.25rem * 20px */
      letter-spacing: var(--ts-tracking-normal); /* normal */
    }

    .dialog__footer {
      display: flex;
      gap: var(--sl-spacing-x-small);
      justify-content: flex-end;
      flex: 1 0 100%;
      flex-direction: column-reverse;
      flex-wrap: wrap;
    }

    .dialog--announcement .dialog__footer {
      flex-direction: column;
    }

    .dialog--announcement .dialog__footer ::slotted([slot='footer-text']) {
      padding: var(--body-spacing);
    }

    .dialog__footer ::slotted(sl-button:not(:first-of-type)) {
      margin-inline-start: 0;
    }
  }

  @media (forced-colors: active) {
    .dialog__panel {
      border: solid 1px var(--sl-color-neutral-0);
    }
  }
`;
