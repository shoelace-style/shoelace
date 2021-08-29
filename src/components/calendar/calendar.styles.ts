import { css } from 'lit';
import componentStyles from '../../styles/component.styles';

export default css`
  ${componentStyles}

  :host {
    display: inline-flex;
    flex-direction: column;
    border-radius: var(--sl-border-radius-medium);
    box-shadow: var(--sl-shadow-medium);
    overflow: hidden;
    user-select: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-touch-callout: none;

    --table-cell-width: 2.3rem;
    --table-cell-height: 2.3rem;
  }

  .header {
    height: 45px;
    padding-right: 5px;
    padding-left: 5px;
    background: var(--sl-color-primary-500);
    flex-direction: row;
    align-items: center;
    display: flex;
    color: var(--sl-color-white);
  }

  .calendar {
    position: relative;
    display: inline-flex;
    background: var(--sl-input-background-color);
    padding: 0px 10px 5px;
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
    background-color: var(--sl-color--white);
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
    display: flex;
    flex-grow: 1;
    align-items: center;
    position: relative;
    height: 35px;
  }

  .navigation sl-icon {
    cursor: pointer;
    height: 100%;
    font-size: 25px;
    border-radius: var(--sl-input-border-radius-medium);
  }

  .navigation .spinner {
    width: 0;
    display: flex;
    flex-grow: 1;
    border-radius: var(--sl-input-border-radius-medium);
    position: relative;
    height: 100%;
  }

  .navigation .spinner input {
    color: transparent;
    background: transparent;
    text-shadow: 0 0 0 #fff;
    cursor: text;
    margin: 0;
    font-size: 20px;
    font-weight: var(--sl-font-weight-light);
    height: 100%;
    border: 0;
    -webkit-appearance: textfield;
    -moz-appearance: textfield;
    appearance: textfield;
    text-align: center;
    width: 100%;
  }

  .navigation .spinner input:focus {
    outline: 0;
  }

  .navigation select {
    appearance: menulist;
    background: transparent;
    border: none;
    border-radius: var(--sl-input-border-radius-medium);
    color: #fff;
    cursor: pointer;
    font-size: 20px;
    font-weight: var(--sl-font-weight-light);
    height: 100%;
    outline: none;
    position: relative;
    -moz-appearance: none;
    -webkit-appearance: none;
    text-align: center;
    width: 45%;
  }

  .navigation select:focus,
  .navigation select:active {
    outline: none;
  }

  .navigation .spinner input::-ms-clear {
    display: none;
  }

  .navigation .spinner input::-webkit-outer-spin-button,
  .navigation .spinner input::-webkit-inner-spin-button {
    margin: 0;
    -webkit-appearance: none;
  }

  .navigation .spinner span:after {
    display: block;
    content: '';
    position: absolute;
  }

  .navigation .spinner span.up {
    top: 0;
    border-bottom: 0;
  }

  .navigation .spinner span.down {
    top: 50%;
  }

  .navigation .spinner span.up:after {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #fff;
    top: 40%;
  }

  .navigation .spinner span.down:after {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #fff;
    top: 40%;
  }

  .navigation .spinner span {
    position: absolute;
    right: 0;
    width: 20px;
    height: 50%;
    opacity: 0;
    cursor: pointer;
    display: flex;
    justify-content: center;
  }

  .navigation sl-icon:hover,
  .navigation select:hover,
  .navigation .spinner:hover {
    background-color: var(--sl-color-primary-400);
    border-color: var(--sl-color-primary-400);
    color: var(--sl-color-primary-text);
  }

  .navigation .spinner:hover span {
    opacity: 1;
  }
`;
