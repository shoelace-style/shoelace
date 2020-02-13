import { Component, Element, Host, Prop, h } from '@stencil/core';
import DOMPurify from 'dompurify';
import marked from 'marked';

@Component({
  tag: 'sl-markdown',
  styleUrl: './markdown.scss',
  shadow: true
})
export class Markdown {
  output: HTMLElement;

  @Element() host: HTMLElement;

  /** A prefix url for any relative link in the source. */
  @Prop() baseUrl: string;

  /** Set to true to add ids to headings (e.g. h1 - h6). */
  @Prop() headingIds = false;

  /** A string to prepend to the heading id (requires `headingIds` to be `true`. */
  @Prop() headingPrefix = '';

  /** A string to prepend to the class name in `<code>` blocks. Useful for syntax highlighters. */
  @Prop() languagePrefix = 'language-';

  /**
   * For security purposes, the resulting HTML is sanitized using [DOMPurify](https://www.npmjs.com/package/dompurify).
   * Set to true to disable this behavior (not recommended).
   */
  @Prop() noSanitize = false;

  /**
   * The markdown source to render. This component uses the [marked](https://www.npmjs.com/package/marked) library under
   * the hood, which adheres to the [GFM specification](https://github.github.com/gfm/). The resulting markup is also
   * sanitized through [DOMPurify](https://www.npmjs.com/package/dompurify) for added security.
   */
  @Prop() source: string;

  componentDidLoad() {
    this.renderMarkdown();
  }

  componentDidUpdate() {
    this.renderMarkdown();
  }

  renderMarkdown() {
    const html = marked(this.source, {
      baseUrl: this.baseUrl,
      headerPrefix: this.headingPrefix,
      headerIds: this.headingIds,
      langPrefix: this.languagePrefix
    });

    this.output.innerHTML = this.noSanitize ? html : DOMPurify.sanitize(html);
  }

  render() {
    return (
      <Host>
        <div class="sl-markdown__output" ref={el => (this.output = el)} />
      </Host>
    );
  }
}
