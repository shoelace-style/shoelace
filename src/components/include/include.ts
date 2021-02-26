import { html, Shoemaker } from '@shoelace-style/shoemaker';
import styles from 'sass:./include.scss';
import { requestInclude } from './request';

/**
 * @since 2.0
 * @status stable
 *
 * @emit sl-load - Emitted when the included file is loaded.
 * @emit sl-error - Emitted when the included file fails to load due to an error. Event details will include: `
 * { status: number}`
 */
export default class SlInclude extends Shoemaker {
  static tag = 'sl-include';
  static props = ['html', 'src', 'mode', ' allowScripts'];
  static styles = styles;

  /** The location of the HTML file to include. */
  src: string;

  /** The fetch mode to use. */
  mode: 'cors' | 'no-cors' | 'same-origin' = 'cors';

  /**
   * Allows included scripts to be executed. You must ensure the content you're including is trusted, otherwise this
   * option can lead to XSS vulnerabilities in your app!
   */
  allowScripts = false;

  watchSrc() {
    this.loadSource();
  }

  onConnect() {
    this.loadSource();
  }

  executeScript(script: HTMLScriptElement) {
    // Create a copy of the script and swap it out so the browser executes it
    const newScript = document.createElement('script');
    [...script.attributes].map(attr => newScript.setAttribute(attr.name, attr.value));
    newScript.textContent = script.textContent;
    script.parentNode!.replaceChild(newScript, script);
  }

  async loadSource() {
    try {
      const src = this.src;
      const file = await requestInclude(src, this.mode);

      // If the src changed since the request started do nothing, otherwise we risk overwriting a subsequent response
      if (src !== this.src) {
        return;
      }

      if (!file) {
        return;
      }

      if (!file.ok) {
        this.emit('sl-error', { detail: { status: file.status } });
        return;
      }

      this.innerHTML = file.html;

      if (this.allowScripts) {
        [...this.querySelectorAll('script')].map(script => this.executeScript(script));
      }

      this.emit('sl-load');
    } catch {
      this.emit('sl-error');
    }
  }

  render() {
    return html`<slot />`;
  }
}
