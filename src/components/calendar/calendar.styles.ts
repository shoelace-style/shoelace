import { css } from 'lit';
import componentStyles from '../../styles/component.styles';

export default css`
  ${componentStyles}

  :host {
    --table-cell-width: 2.3rem;
    --table-cell-height: 2.3rem;
    --header-navigation-height: 45px;
    display: inline-flex;
  }

  .container {
    position: relative;
    display: block;
    border-radius: var(--sl-border-radius-medium);
    box-shadow: var(--sl-shadow-medium);
    overflow: hidden;
    user-select: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-touch-callout: none;
  }

  .calendar {
    position: relative;
    display: block;
    background: var(--sl-input-background-color);
    padding: 5px;
    margin-top: var(--header-navigation-height);
  }

  table {
    border-spacing: 3px;
    border-color: #0000;
  }

  th,
  td {
    text-align: center;
    vertical-align: middle;
    width: var(--table-cell-width);
    height: var(--table-cell-height);
    font-size: var(--sl-font-size-medium);
    border-radius: var(--sl-border-radius-medium);
    cursor: pointer;
    position: relative;
  }

  th.week-day {
    cursor: default;
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-bold);
    text-transform: uppercase;
  }

  td.today {
    color: var(--sl-color-success-text);
    background-color: var(--sl-color-success-400);
  }

  td.today:hover:not(td.range):not(td.start):not(td.end),
  td.today:focus:not(td.range):not(td.start):not(td.end) {
    color: var(--sl-color-success-text);
    border-color: var(--sl-color-success-400);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-focus-ring-color-success);
  }

  td.start,
  td.end,
  td.start.today,
  td.start.sibling,
  td.end.sibling,
  td.end.sibling {
    color: var(--sl-color-white) !important;
    background-color: var(--sl-color-primary-500) !important;
  }

  td.start-range {
    border-radius: 25% 0 0 25%;
  }

  td.end,
  td.end.sibling,
  td.end.sibling {
    border-radius: 0 25% 25% 0;
  }

  td.range,
  td.sibling.range {
    color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-100);
    border-radius: 0;
    -webkit-box-shadow: -3px 0 0 var(--sl-color-primary-100), 3px 0 0 var(--sl-color-primary-100);
    box-shadow: -3px 0 0 var(--sl-color-primary-100), 3px 0 0 var(--sl-color-primary-100);
  }

  td.sibling {
    color: var(--sl-color-gray-300);
    background-color: var(--sl-color-white);
  }

  td.day:hover,
  td.month:hover,
  td.year:hover,
  td.month:focus,
  td.year:focus,
  td.day:focus {
    outline: none;
    color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-300);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-focus-ring-color-primary);
    z-index: 1;
  }

  td.disabled,
  td.outside {
    pointer-events: none;
    color: var(--sl-color-gray-300);
    background-color: var(--sl-color-gray-100);
  }

  td.outside:hover,
  td.outside:focus,
  td.disabled:hover,
  td.disabled:focus {
    border-color: var(--sl-color-gray-300);
    color: var(--sl-color-gray-300);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-focus-ring-color-info);
  }

  .navigation {
    color: var(--sl-color-white);
    position: absolute;
    background: var(--sl-color-primary-500);
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  .navigation .buttons {
    display: flex;
    align-items: center;
    height: var(--header-navigation-height);
    padding: 5px;
  }

  .navigation .dropdowns {
    display: flex;
    padding: 10px 15px 10px 15px;
    background: #fff;
    height: 100%;
  }

  .navigation.open,
  .navigation.open .dropdowns,
  .navigation.open .buttons {
    z-index: 2;
  }

  .navigation select {
    border: 0;
    padding: 0;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: var(--sl-color-white);
    cursor: pointer;
    color: var(--sl-color-black);
    font-size: var(--sl-font-size-large);
    font-weight: var(--sl-font-weight-light);
    width: 100%;
    outline: none;
    scrollbar-width: none;
    position: relative;
    text-align-last: center;
    text-align: center;
  }

  .navigation select::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }

  .navigation select::-ms-expand {
    display: none;
  }

  .navigation select:focus::-ms-value {
    background: transparent;
  }

  .navigation select option {
    padding: 10px 0px;
    margin: 5px;
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-normal);
    border-radius: var(--sl-border-radius-medium);
  }

  .navigation select:disabled,
  .navigation optgroup:disabled,
  .navigation option:disabled,
  .navigation select[disabled] > option {
    pointer-events: none;
    color: var(--sl-color-gray-400);
  }

  .navigation select:focus,
  .navigation select:active,
  .navigation select option:focus,
  .navigation select option:active {
    outline: none !important;
  }

  .navigation select option:checked {
    color: var(--sl-color-white);
    background: var(--sl-color-primary-500)
      linear-gradient(0deg, var(--sl-color-primary-500) 0%, var(--sl-color-primary-500) 100%);
    border-color: var(--sl-color-primary-300);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-focus-ring-color-primary);
  }

  .navigation select option:hover {
    color: var(--sl-color-primary-500);
    background-color: var(--sl-color-white);
    border-color: var(--sl-color-primary-300);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-focus-ring-color-primary);
  }

  .navigation .button {
    display: flex;
    justify-content: center;
    position: relative;
    font-size: var(--sl-font-size-large);
    color: var(--sl-color-white);
    cursor: pointer;
    border-radius: var(--sl-input-border-radius-medium);
    font-weight: var(--sl-font-weight-light);
    height: 100%;
    width: 50%;
    /* line-height: 42px; */
  }

  .navigation .button:hover,
  .navigation .button:focus,
  .navigation sl-icon:hover,
  .navigation sl-icon:focus {
    outline: none;
    background-color: var(--sl-color-primary-400);
    border: none;
    box-shadow: none;
  }

  .navigation sl-icon {
    cursor: pointer;
    height: 100%;
    width: 30px;
    border-radius: var(--sl-input-border-radius-medium);
    position: relative;
    display: flex;
    justify-content: center;
  }

  .navigation sl-icon::part(base) {
    width: 80%;
  }
`;
