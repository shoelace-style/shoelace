import { css } from 'lit';
import componentStyles from '../../styles/component.styles';

export default css`
  ${componentStyles}

  :host {
    user-select: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-touch-callout: none;
    position: relative;
    display: inline-flex;
  }

  .hide {
    opacity: 0;
    pointer-events: none;
  }

  table {
    border-spacing: 3px;
    border-color: #0000;
  }

  td {
    text-align: center;
    vertical-align: middle;
    width: var(--cell-inline-width, 2.3rem);
    height: var(--cell-inline-height, 2.3rem);
    font-size: var(--sl-font-size-medium);
    border-radius: var(--sl-border-radius-medium);
    cursor: pointer;
  }

  td.week-day {
    cursor: default;
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-bold);
    text-transform: uppercase;
  }

  td.today {
    color: var(--sl-color-success-text) !important;
    background-color: var(--sl-color-success-400) !important;
  }

  td.today:focus {
    border-color: var(--sl-color-success-400) !important;
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-focus-ring-color-success) !important;
  }

  td.start,
  td.end,
  td.start.selected,
  td.end.selected {
    color: var(--sl-color-white) !important;
    background-color: var(--sl-color-primary-500) !important;
  }

  td.selected,
  td.sibling-months.selected {
    color: var(--sl-color-primary-500) !important;
    background-color: var(--sl-color-primary-100) !important;
  }

  td.range {
    color: var(--sl-color-primary-500) !important;
    background-color: var(--sl-color-primary-100) !important;
  }

  td.sibling-months {
    visibility: var(--sibling-months-visibility);
    color: var(--sl-color-gray-300);
    background-color: var(--sl-color--white);
  }

  td.month:focus,
  td.year:focus,
  td.day:focus {
    outline: none;
    color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-300);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-focus-ring-color-primary);
  }

  td.disabled {
    pointer-events: none;
  }

  td.disabled,
  td.not-allowed {
    color: var(--sl-color-gray-300) !important;
    background-color: var(--sl-color-gray-100);
  }

  td.not-allowed:focus {
    color: var(--sl-color-gray-400) !important;
    border-color: var(--sl-color-gray-400);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-color-gray-400);
  }

  td.readonly {
    pointer-events: none !important;
  }

  .container {
    display: flex;
  }

  .container .date-picker-wrap {
    display: inline-grid;
    position: relative;
    background: var(--sl-color-white);
    padding: 0px 10px 5px;
  }

  .container .grid {
    display: inline-grid;
  }

  .container .grid.months,
  .container .grid.years {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: var(--sl-color-white);
  }

  .container .grid.months table,
  .container .grid.years table {
    margin: 10px;
    width: calc(100% - 20px);
    height: calc(100% - 20px);
  }

  .container sl-button.months-button,
  .container sl-button.years-button {
    width: 100%;
  }

  .container sl-button-group {
    width: 100%;
    margin-right: 2px;
    margin-left: 2px;
  }

  .inline {
    flex-direction: column;
    overflow-x: hidden;
    border-radius: var(--sl-border-radius-medium);
    box-shadow: var(--sl-shadow-medium);
  }

  .inline .header-wrap {
    min-height: 50px;
    padding-right: 5px;
    padding-left: 5px;
    background: var(--sl-color-primary-500);
    flex-direction: row;
    align-items: center;
    display: flex;
    color: var(--sl-color-white);
  }

  .inline .header-wrap sl-button::part(base) {
    font-size: var(--sl-font-size-x-large);
    color: var(--sl-color-white);
  }

  .inline .header-wrap sl-button::part(base)::after {
    border-left: 0;
  }

  .inline .header-wrap sl-button.next-button::part(base),
  .inline .header-wrap sl-button.prev-button::part(base) {
    width: 30px;
  }

  .inline .header {
    display: flex;
    flex-grow: 1;
  }

  .inline td.month.selected,
  .inline td.year.selected {
    color: var(--sl-color-white) !important;
    background-color: var(--sl-color-primary-500) !important;
  }

  .dropdown {
    min-width: max-content;
    flex-direction: column;
    overflow-x: hidden;
  }

  .dropdown .date-picker-wrap {
    display: inline-grid;
    position: relative;
    padding: 0px 10px 5px;
  }

  .dropdown .header-wrap {
    flex-grow: 1;
    background: var(--sl-color-primary-100);
    padding: 5px;
    border-top-left-radius: var(--sl-border-radius-medium);;
    border-top-right-radius: var(--sl-border-radius-medium);;
    flex-direction: row;
    align-items: center;
    display: flex;
  }

  .dropdown .header-wrap sl-button::part(base) {
    font-size: var(--sl-font-size-large);
    background-color: var(--sl-color-primary-100);
    border-color: var(--sl-color-primary-100);
    color: var(--sl-color-primary-500);
  }

  .dropdown .header-wrap sl-button::part(base)::after {
    border-left: 0;
  }

  .dropdown .header-wrap sl-button.prev-button {
    margin-right: 3px;
  }

  .dropdown .header-wrap sl-button.next-button {
    margin-left: 3px;
  }

  .dropdown .header-wrap sl-button.next-button::part(base),
  .dropdown .header-wrap sl-button.prev-button::part(base) {
    width: 30px;
  }

  .dropdown .header {
    display: flex;
    flex-grow: 1;
  }

  .dropdown td {
    width: var(--cell-dropdown-width, 2.2rem);
    height: var(--cell-dropdown-height, 2.2rem);
    font-size: var(--sl-font-size-small);
  }
`;
