import { LitElement, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { debounce } from '../../internal/throttle';
import SlInput from '../input/input';
import SlMenuItem from '../menu-item/menu-item';
import type SlDropdown from '../dropdown/dropdown';
import type SlMenu from '../menu/menu';
import styles from './autocomplete.styles';
import { unsafeHTML, UnsafeHTMLDirective } from 'lit-html/directives/unsafe-html';

/**
 * @since 2.X
 * @status beta
 *
 * @dependency sl-icon
 * @dependency sl-dropdown
 * @dependency sl-menu
 * @dependency sl-menu-item
 *
 * @event {{ item: SlMenuItem }} sl-select - Emitted when a menu item is selected.
 * @event sl-change - Emitted when the input's value changes.
 * @event sl-clear - Emitted when the clear button is activated.
 * @event sl-input - Emitted when the input receives input.
 * @event sl-focus - Emitted when the input gains focus.
 * @event sl-blur - Emitted when the input loses focus.
 * @event sl-show - Emitted when the dropdown opens.
 * @event sl-after-show - Emitted after the dropdown opens and all animations are complete.
 * @event sl-hide - Emitted when the dropdown closes.
 * @event sl-after-hide - Emitted after the dropdown closes and all animations are complete.*
 *
 * @csspart base - The component's base wrapper.
 * @csspart label - The input label.
 * @csspart input - The input control.
 * @csspart clear-button - The clear button.
 * @csspart suffix - The input suffix container.
 * @csspart help-text - The input help text.
 *
 * @cssprop --focus-ring - The focus ring style to use when the control receives focus, a `box-shadow` property.
 */
@customElement('sl-autocomplete')
export default class SlAutocomplete extends LitElement {
  static styles = styles;

  private resizeObserver: ResizeObserver;
  private search: string = '';
  private firstItem: boolean = false;

  @query('sl-input') input: HTMLInputElement;
  @query('sl-dropdown') dropdown: SlDropdown;
  @query('sl-menu') menu: SlMenu;

  @state() suggestions: Array<{ text: string | UnsafeHTMLDirective; value: string }> = [];

  /** The autocomplete's size. */
  @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /** Draws a pill-style autocomplete with rounded edges. */
  @property({ type: Boolean, reflect: true }) pill: boolean = false;

  /** The autocomplete's label. */
  @property() label: string;

  /** The autocomplete's name attribute. */
  @property() name: string;

  /** The autocomplete's help text. */
  @property({ attribute: 'help-text' }) helpText: string = '';

  /** Adds a clear button when the input is populated. */
  @property({ type: Boolean }) clearable: boolean = false;

  /** Enable this option to prevent the panel from being clipped when the component is placed inside a container with `overflow: auto|scroll`. */
  @property({ type: Boolean }) hoist: boolean = false;

  /** The input's placeholder text. */
  @property() placeholder: string;

  /** The input's autofocus attribute. */
  @property({ type: Boolean }) autofocus: boolean;

  /** Disables the autocomplete component. */
  @property({ type: Boolean, reflect: true }) disabled: boolean = false;

  /** The minimum chars that will triggered the autocomplete suggestions. */
  @property({ type: Number, attribute: 'min-chars' }) minChars: number = 3;

  /** The delay in milliseconds between when a keystroke occurs and when a search is performed. */
  @property({ type: Number }) delay: number = 300;

  /** The maximum number of suggestions that will be displayed. */
  @property({ type: Number, attribute: 'max-results' }) maxResults: number = 20;

  /** Message displayed when no result found. */
  @property({ type: String, attribute: 'empty-message' }) EmptyMessage: string = 'no data found';

  /** Determines if performed searches should be cached. */
  @property({ type: Boolean, reflect: true }) cache = false;

  /** The source property is a function executed on user input. The search result is displayed in the suggestions list. */
  @property()
  source?: (search: string) => Promise<Array<{ text: string | UnsafeHTMLDirective; value: string }>>;

  connectedCallback() {
    super.connectedCallback();
    this.resizeObserver = new ResizeObserver(() => this.resizeMenu());
    this.updateComplete.then(() => this.resizeObserver.observe(this.input));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver.unobserve(this.input);
  }

  handleClearClick() {
    this.search = '';
    this.dropdown.hide();
  }

  handleClick(event: MouseEvent) {
    event.stopImmediatePropagation();
  }

  handleMenuSelect(event: CustomEvent) {
    const item = event.detail.item;
    this.input.value = item.textContent;
    this.search = item.textContent;
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.target instanceof SlInput) {
      if (event.key === 'ArrowDown') {
        this.dropdown.show();
        this.menu.getAllItems({ includeDisabled: false })[0].focus();
      }
    }

    if (event.target instanceof SlMenuItem) {
      if (event.key === 'ArrowUp') {
        const selectedItem = this.menu.getActiveItem();
        let index = selectedItem ? this.menu.getAllItems().indexOf(selectedItem) : 0;
        if (index === 0 && this.firstItem) {
          this.input.focus();
          this.firstItem = false;
        } else if (index === 0) this.firstItem = true;
      } else if (event.key === 'ArrowDown') {
        this.firstItem = false;
      } else {
        const ignoredKeys = ['Tab', 'Shift', 'Meta', 'Ctrl', 'Alt', 'Enter', 'Escape'];
        if (!ignoredKeys.includes(event.key)) this.input.focus();
      }
    }

    event.stopImmediatePropagation();
  }

  async handleKeyUp(event: KeyboardEvent) {
    await this.prepareSuggestions(this.input.value);
    event.stopImmediatePropagation();
  }

  resizeMenu() {
    this.menu.style.width = `${
      parseInt(getComputedStyle(this.input, null).width) -
      parseInt(getComputedStyle(this.input, null).marginLeft) -
      parseInt(getComputedStyle(this.input, null).marginRight)
    }px`;

    console.log(this.menu.style);

    if (this.dropdown) this.dropdown.reposition();
  }

  async prepareSuggestions(text: string) {
    if (this.source && this.input.value.length >= this.minChars && this.input.value !== this.search) {
      this.search = this.input.value;

      let items = await this.source(text);
      items.splice(this.maxResults);

      const regex = new RegExp(this.search, 'gi');
      items.forEach(item => {
        (item.text as any) = unsafeHTML(
          (item.text as string).replace(regex, `<span class="highlight">${this.search}</span>`)
        );
      });

      this.suggestions = [...items];

      // https://github.com/gustf/js-levenshtein/blob/master/index.js
      //
      // const regex = new RegExp(this.search, 'gi');
      // this.menu.innerHTML = items.map(item => template(item)).join('');
      // this.updateComplete.then(() => {
      //   this.getItems().forEach(item => {
      //     if (!item.dataset.label) {
      //       item.dataset.label = item.innerText;
      //     }
      //     if (this.highlight) {
      //       item.innerHTML = item.innerText.replace(regex, `<mark class="highlight">${this.search}</mark>`);
      //     }
      //   });
      // });

      this.dropdown.show();
    }
  }

  render() {
    return html`
      <sl-dropdown
        part="base"
        closeOnSelect="true"
        .containing-element=${this}
        ?hoist=${this.hoist}
        @keydown=${this.handleKeyDown}
      >
        <sl-input
          slot="trigger"
          type="text"
          size=${this.size}
          label=${this.label}
          placeholder=${this.placeholder}
          help-text=${this.helpText}
          ?clearable=${this.clearable}
          ?disabled=${this.disabled}
          ?pill=${this.pill}
          ?spellcheck=${false}
          autocapitalize="off"
          autocomplete="off"
          autocorrect="off"
          inputmode="search"
          @keyup=${debounce(this.handleKeyUp.bind(this), this.delay)}
          @click=${this.handleClick}
          @sl-clear=${this.handleClearClick}
        >
          <sl-icon slot="suffix" name="search" library="system"></sl-icon>
        </sl-input>

        <sl-menu @sl-select=${this.handleMenuSelect}>
          ${this.suggestions.length === 0
            ? html`<sl-menu-item disabled>${this.EmptyMessage}</sl-menu-item>`
            : this.suggestions.map(item => html`<sl-menu-item value="${item.value}">${item.text}</sl-menu-item>`)}
        </sl-menu>
      </sl-dropdown>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-autocomplete': SlAutocomplete;
  }
}
