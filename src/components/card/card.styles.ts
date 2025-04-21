import { css } from 'lit';

export default css`
  :host {
    --border-color: var(--sl-color-neutral-300);
    --border-radius: var(--sl-border-radius-medium);
    --border-width: 1px;
    --padding: var(--ts-spacing-large);

    display: inline-block;
  }

  .card {
    display: flex;
    flex-direction: column;
    background-color: var(--sl-panel-background-color);
    box-shadow: var(--sl-shadow-x-small);
    border: solid var(--border-width) var(--border-color);
    border-radius: var(--border-radius);
  }

  .card--loading {
    position: relative;
  }

  .card--no-shadow {
    box-shadow: none;
  }

  .card--empty-state {
    background-color: transparent;
    border-color: rgba(205, 207, 209, 0.6); /* gray-400 at 60% */
  }

  .card__image {
    display: flex;
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
    margin: calc(-1 * var(--border-width));
    overflow: hidden;
  }

  .card__image::slotted(img) {
    display: block;
    width: 100%;
  }

  .card:not(.card--has-image) .card__image {
    display: none;
  }

  .card--has-header .card__header {
    display: block;
    border-bottom: solid var(--border-width) var(--border-color);
    padding: var(--padding);
  }

  .card--compact .card__header {
    border-bottom: none;
    padding-bottom: 0;
  }

  .card--action-header .card__header::slotted(*) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card:not(.card--has-header) .card__header {
    display: none;
  }

  .card:not(.card--has-image) .card__header {
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
  }

  .card__body {
    display: block;
    padding: var(--padding);
  }

  .card--has-footer .card__footer {
    display: block;
    border-top: solid var(--border-width) var(--border-color);
    padding: var(--padding);
  }

  .card--compact .card__footer {
    border-top: none;
    padding-top: 0;
  }

  .card--button-footer .card__footer::slotted(*) {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: var(--sl-spacing-x-small);
  }

  .card:not(.card--has-footer) .card__footer {
    display: none;
  }

  .spinner-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--border-radius);
  }
`;
