import SlTabPanel from './tab-panel.component.js';

export * from './tab-panel.component.js';
export default SlTabPanel;

SlTabPanel.define('sl-tab-panel');

declare global {
  interface HTMLElementTagNameMap {
    'sl-tab-panel': SlTabPanel;
  }
}
