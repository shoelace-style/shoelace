import { LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';

type Constructor<T> = new (...args: any[]) => T;

export declare interface ILocalize {
  lang?: string;
  setLocale: (value: string) => void;
}

export const Localize = <T extends Constructor<LitElement>>(superClass: T) => {
  class LocalizeElement extends superClass {
    // locale is the internal language
    // used by components if the
    // lang attribute is not specified
    private _locale: string = 'en-US';
    private _lang?: string;

    @property({ type: String, reflect: true })
    get lang() {
      return this._lang ? this._lang : this._locale;
    }

    set lang(value: string) {
      let old = this._lang;
      this._lang = value;
      this._locale = value;
      this.requestUpdate('lang', old);
    }

    setLocale(value: string) {
      if (!this.hasAttribute('lang')) {
        this._locale = value;
        this.requestUpdate();
      } else this.lang = value;
    }

    connectedCallback() {
      super.connectedCallback();

      // this event listener is attached
      // to the document (listen on global language change)
      // but I don't think it is the better solution
      this.getRootNode().addEventListener('sl-language', this.handleLocale.bind(this));
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      this.getRootNode().removeEventListener('sl-language', this.handleLocale.bind(this));
    }

    private handleLocale(e: Event) {
      const lang = (e as CustomEvent).detail.lang;
      if (!this.hasAttribute('lang')) this.setLocale(lang);
    }
  }

  return LocalizeElement as Constructor<ILocalize> & T;
};
