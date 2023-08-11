import SlSplitPanel from './split-panel.component.js';

export * from './split-panel.component.js';
export default SlSplitPanel;

SlSplitPanel.define('sl-split-panel');

declare global {
  interface HTMLElementTagNameMap {
    'sl-split-panel': SlSplitPanel;
  }
}
