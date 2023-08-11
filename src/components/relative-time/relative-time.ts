import SlRelativeTime from './relative-time.component.js';

export * from './relative-time.component.js';
export default SlRelativeTime;

SlRelativeTime.define('sl-relative-time');

declare global {
  interface HTMLElementTagNameMap {
    'sl-relative-time': SlRelativeTime;
  }
}
