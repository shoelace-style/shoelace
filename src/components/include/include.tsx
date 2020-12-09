import { Component, Element, Event, EventEmitter, Prop, State, Watch, h } from '@stencil/core';
import { requestInclude } from './request';

/**
 * @since 2.0
 * @status stable
 */

@Component({
  tag: 'sl-include',
  styleUrl: 'include.scss',
  shadow: true
})
export class Include {
  @Element() host: HTMLSlIncludeElement;

  @State() html = '';

  /** The location of the HTML file to include. */
  @Prop() src: string;

  /** The fetch mode to use. */
  @Prop() mode: 'cors' | 'no-cors' | 'same-origin' = 'cors';

  /**
   * Allows included scripts to be executed. You must ensure the content you're including is trusted, otherwise this
   * option can lead to XSS vulnerabilities in your app!
   */
  @Prop() allowScripts = false;

  /** Emitted when the included file is loaded. */
  @Event({ eventName: 'sl-load' }) slLoad: EventEmitter;

  /** Emitted when the included file fails to load due to an error. */
  @Event({ eventName: 'sl-error' }) slError: EventEmitter<{ status?: number }>;

  @Watch('src')
  handleSrcChange() {
    this.loadSource();
  }

  componentWillLoad() {
    this.loadSource();
  }

  executeScript(script: HTMLScriptElement) {
    // Create a copy of the script and swap it out so the browser executes it
    const newScript = document.createElement('script');
    [...script.attributes].map(attr => newScript.setAttribute(attr.name, attr.value));
    newScript.textContent = script.textContent;
    script.parentNode.replaceChild(newScript, script);
  }

  async loadSource() {
    try {
      const src = this.src;
      const file = await requestInclude(src, this.mode);

      // If the src changed since the request started do nothing, otherwise we risk overwriting a subsequent response
      if (src !== this.src) {
        return;
      }

      if (!file.ok) {
        this.slError.emit({ status: file.status });
        return;
      }

      this.host.innerHTML = file.html;

      if (this.allowScripts) {
        [...this.host.querySelectorAll('script')].map(script => this.executeScript(script));
      }

      this.slLoad.emit();
    } catch {
      this.slError.emit();
    }
  }

  render() {
    return <slot />;
  }
}
