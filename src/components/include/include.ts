import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { emit } from '../../internal/event';
import { watch } from '../../internal/watch';
import styles from './include.styles';
import { requestInclude } from './request';

/**
 * @since 2.0
 * @status stable
 *
 * @event sl-load - Emitted when the included file is loaded.
 * @event {{ status: number }} sl-error - Emitted when the included file fails to load due to an error.
 */
@customElement('sl-include')
export default class SlInclude extends LitElement {
  static styles = styles;

  /**
   * The location of the HTML file to include.
   *
   * WARNING: Be sure you trust the content you are including as it will be executed as code and can result in XSS attacks.
   */
  @property() src: string;

  /** The fetch mode to use. */
  @property() mode: 'cors' | 'no-cors' | 'same-origin' = 'cors';

  /**
   * Allows included scripts to be executed. You must ensure the content you're including is trusted, otherwise this
   * option can lead to XSS vulnerabilities in your app!
   */
  @property({ attribute: 'allow-scripts', type: Boolean }) allowScripts = false;

  executeScript(script: HTMLScriptElement) {
    // Create a copy of the script and swap it out so the browser executes it
    const newScript = document.createElement('script');
    [...script.attributes].forEach(attr => newScript.setAttribute(attr.name, attr.value));
    newScript.textContent = script.textContent;
    script.parentNode!.replaceChild(newScript, script);
  }

  @watch('src')
  async handleSrcChange() {
    try {
      const src = this.src;
      const file = await requestInclude(src, this.mode);

      // If the src changed since the request started do nothing, otherwise we risk overwriting a subsequent response
      if (src !== this.src) {
        return;
      }

      if (!file.ok) {
        emit(this, 'sl-error', { detail: { status: file.status } });
        return;
      }

      this.innerHTML = file.html;

      if (this.allowScripts) {
        [...this.querySelectorAll('script')].forEach(script => this.executeScript(script));
      }

      emit(this, 'sl-load');
    } catch {
      emit(this, 'sl-error', { detail: { status: -1 } });
    }
  }

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-include': SlInclude;
  }
}
