import { css } from 'lit';
import componentStyles from '../../styles/component.styles';

export default css`
  ${componentStyles}

  :host {
    --border-color: var(--sl-color-neutral-200);
    --border-radius: var(--sl-border-radius-medium);
    --border-width: 0;

    display: block;
  }

  .calendar__header {
    display: flex;
    align-items: center;
    margin-bottom: var(--sl-spacing-x-small);
  }

  .calendar__header sl-icon-button {
    flex: 0 0 auto;
  }

  .calendar__label {
    flex: 1 1 auto;
    text-align: center;
  }

  .calendar__days {
    isolation: isolate;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }

  .calendar__day {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border: solid var(--border-width) var(--border-color);
    border-bottom: none;
    background: none;
    background-color: var(--sl-color-neutral-0);
    font: inherit;
    color: var(--sl-color-neutral-900);
    min-height: 3rem;
    padding: 0;
    margin: 0;
  }

  .calendar__day:nth-child(1) {
    border-top-left-radius: var(--border-radius);
  }

  .calendar__day:nth-child(7) {
    border-top-right-radius: var(--border-radius);
  }

  .calendar__day:nth-last-child(1) {
    border-bottom-right-radius: var(--border-radius);
  }

  .calendar__day:nth-last-child(7) {
    border-bottom-left-radius: var(--border-radius);
  }

  .calendar__day:not(:nth-child(7n)) {
    border-right: none;
  }

  .calendar__day:nth-last-child(1),
  .calendar__day:nth-last-child(2),
  .calendar__day:nth-last-child(3),
  .calendar__day:nth-last-child(4),
  .calendar__day:nth-last-child(5),
  .calendar__day:nth-last-child(6),
  .calendar__day:nth-last-child(7) {
    border-bottom: solid var(--border-width) var(--border-color);
  }

  .calendar__day:focus-visible {
    outline: solid 2px var(--sl-color-primary-600);
    z-index: 1;
  }

  .calendar__day[part~='day-weekend'] {
    color: var(--sl-color-rose-600);
  }

  .calendar__day[part~='day-today'] {
    font-weight: var(--sl-font-weight-bold);
  }

  .calendar__day[part~='day-selected'] {
    background-color: var(--sl-color-primary-100);
  }

  .calendar__day[part~='day-selection-start'] {
    border-top-left-radius: var(--sl-border-radius-pill);
    border-bottom-left-radius: var(--sl-border-radius-pill);
  }

  .calendar__day[part~='day-selection-end'] {
    border-top-right-radius: var(--sl-border-radius-pill);
    border-bottom-right-radius: var(--sl-border-radius-pill);
  }

  .calendar__day .calendar__day[part~='day-previous-month'],
  .calendar__day[part~='day-next-month'] {
    color: var(--sl-color-neutral-400);
  }

  .calendar__day[part~='day-previous-month'][part~='day-weekend'],
  .calendar__day[part~='day-next-month'][part~='day-weekend'] {
    color: var(--sl-color-rose-400);
  }
`;
