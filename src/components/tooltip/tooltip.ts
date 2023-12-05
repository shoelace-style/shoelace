import SlTooltip from './tooltip.component.js';

export * from './tooltip.component.js';
export default SlTooltip;

SlTooltip.define('sl-tooltip');

declare global {
  interface HTMLElementTagNameMap {
    'sl-tooltip': SlTooltip;
  }
}
