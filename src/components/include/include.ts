import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators';
import { event, EventEmitter, watch } from '../../internal/decorators';
import { requestInclude } from './request';
import styles from 'sass:./include.scss';

/**
 * @since 2.0
 * @status stable
 */
@customElement('sl-include')
export default class SlInclude extends LitElement {
  static styles = unsafeCSS(styles);

  /** The location of the HTML file to include. */
  @property() src: string;

  /** The fetch mode to use. */
  @property() mode: 'cors' | 'no-cors' | 'same-origin' = 'cors';

  /**
   * Allows included scripts to be executed. You must ensure the content you're including is trusted, otherwise this
   * option can lead to XSS vulnerabilities in your app!
   */
  @property({ attribute: 'allow-scripts', type: Boolean }) allowScripts = false;

  /** Emitted when the included file is loaded. */
  @event('sl-load') slLoad: EventEmitter<void>;

  /** Emitted when the included file fails to load due to an error. */
  @event('sl-error') slError: EventEmitter<{ status: number }>;

  connectedCallback() {
    super.connectedCallback();
    this.loadSource();
  }

  executeScript(script: HTMLScriptElement) {
    // Create a copy of the script and swap it out so the browser executes it
    const newScript = document.createElement('script');
    [...script.attributes].map(attr => newScript.setAttribute(attr.name, attr.value));
    newScript.textContent = script.textContent;
    script.parentNode!.replaceChild(newScript, script);
  }

  @watch('src')
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
        this.slError.emit({ detail: { status: file.status } });
        return;
      }

      this.innerHTML = file.html;

      if (this.allowScripts) {
        [...this.querySelectorAll('script')].map(script => this.executeScript(script));
      }

      this.slLoad.emit();
    } catch {
      this.slError.emit({ detail: { status: -1 } });
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
