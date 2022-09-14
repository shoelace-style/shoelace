import { html, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { HasSlotController } from '../../internal/slot';
import '../dropdown/dropdown';
import '../menu-item/menu-item';
import '../menu/menu';
import styles from './autocomplete.styles';
import type SlDropdown from '../dropdown/dropdown';
import type SlInput from '../input/input';
import type SlMenuItem from '../menu-item/menu-item';
import type SlMenu from '../menu/menu';
import type { CSSResultGroup } from 'lit';

const escapeRegExp = (text: string) => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

/**
 * @summary Autocompletes displays suggestions as you type.
 *
 * @since unreleased
 * @status unknown
 *
 * @dependency sl-dropdown
 * @dependency sl-menu
 *
 * @slot - The content that includes an input.
 * @slot empty-text - The text or content that is displayed when there is no suggestion based on the input.
 * @slot lading-text - The text or content that is displayed when the `loading` attribute evaluates to true.
 *
 * @csspart base - The component's internal wrapper.
 * @csspart trigger - The wrapper for the trigger slot.
 * @csspart empty-text - The empty text's wrapper.
 * @csspart loading-test - The loading text's wrapper.
 *
 */

@customElement('sl-autocomplete')
export default class SlAutocomplete extends LitElement {
  static styles: CSSResultGroup = styles;

  @query('sl-menu') menu: SlMenu;
  @query('sl-dropdown') dropdown: SlDropdown;
  @query('slot:not([name])') defaultSlot: HTMLSlotElement;

  private readonly hasSlotController = new HasSlotController(this, 'loading-text', 'empty-text');

  @state() private value = '';
  @state() private hasFocus = false;

  @property({ type: String, reflect: true }) emptyText: string;

  @property({ type: Boolean, reflect: true }) loading = false;

  @property({ type: String, reflect: true }) loadingText: string;

  @property({ type: Boolean, reflect: true }) autofilter = false;

  @property({ type: Boolean, reflect: true }) highlight = false;

  @property({ type: Number, reflect: true }) threshold = 1;

  handleSlInput(event: CustomEvent) {
    const { value } = event.target as SlInput;

    if (this.autofilter) {
      this.options.forEach(option => {
        const shouldDisplay = new RegExp(`(${escapeRegExp(value ?? '')})`, 'ig').test(option.getTextLabel());

        if (shouldDisplay) {
          option.style.display = 'block';
          option.disabled = false;
          option.ariaHidden = 'false';
        } else {
          option.style.display = 'none';
          option.disabled = true;
          option.ariaHidden = 'true';
        }
      });
    }

    this.hasFocus = true;
    this.value = value;
  }

  handleKeydown(event: KeyboardEvent) {
    if (!this.shouldDisplayAutoComplete || event.ctrlKey || event.metaKey) {
      return;
    }

    const options = this.visibleOptions;

    if (options.length === 0) {
      return;
    }

    const firstItem = options[0];
    const lastItem = options[options.length - 1];

    switch (event.key) {
      case 'Tab':
      case 'Escape':
        this.hasFocus = false;
        break;

      case 'ArrowDown':
        event.preventDefault();
        this.menu.setCurrentItem(firstItem);
        firstItem.focus();
        break;

      case 'ArrowUp':
        event.preventDefault();
        this.menu.setCurrentItem(lastItem);
        lastItem.focus();
        break;
    }
  }

  handleSlFocus() {
    if (this.value.length >= this.threshold) {
      this.hasFocus = true;
      this.show();
    }
  }

  handleSlAfterHide() {
    this.hasFocus = false;
  }

  show() {
    this.dropdown?.show();
  }

  hide() {
    this.dropdown?.hide();
  }

  reset() {
    this.value = '';
  }

  get options(): SlMenuItem[] {
    return (this.defaultSlot?.assignedElements() || []) as SlMenuItem[];
  }

  get visibleOptions() {
    return this.options.filter(option => option.style.display !== 'none');
  }

  get hasResults() {
    return this.visibleOptions.length > 0;
  }

  get shouldDisplayLoadingText() {
    return this.loading && (this.loadingText || this.hasSlotController.test('loading-text'));
  }

  get shouldDisplayEmptyText() {
    return (
      !this.shouldDisplayLoadingText &&
      !this.hasResults &&
      (this.emptyText || this.hasSlotController.test('empty-text'))
    );
  }

  get shouldDisplayAutoComplete() {
    return (
      this.hasFocus &&
      ((this.value.length >= this.threshold && this.hasResults) ||
        this.shouldDisplayLoadingText ||
        this.shouldDisplayEmptyText)
    );
  }

  render() {
    const { shouldDisplayLoadingText } = this;

    return html`
      <div part="base">
        <div
          part="trigger"
          @sl-focus=${this.handleSlFocus}
          @sl-input=${this.handleSlInput}
          @keydown=${this.handleKeydown}
        >
          <slot name="trigger"></slot>
        </div>

        <sl-dropdown ?open=${this.shouldDisplayAutoComplete} @sl-after-hide=${this.handleSlAfterHide}>
          <sl-menu>
            <slot
              aria-hidden=${shouldDisplayLoadingText ? 'true' : 'false'}
              style="${styleMap({ display: shouldDisplayLoadingText ? 'none' : 'block' })}"
            >
            </slot>

            <div
              part="loading-text"
              id="loading-text"
              class="loading-text"
              aria-hidden=${shouldDisplayLoadingText ? 'false' : 'true'}
              style="${styleMap({ display: shouldDisplayLoadingText ? 'block' : 'none' })}"
            >
              <slot name="loading-text">${this.loadingText}</slot>
            </div>

            <div
              part="empty-text"
              id="empty-text"
              class="empty-text"
              aria-hidden=${this.shouldDisplayEmptyText ? 'false' : 'true'}
              style="${styleMap({ display: this.shouldDisplayEmptyText ? 'block' : 'none' })}"
            >
              <slot name="empty-text">${this.emptyText}</slot>
            </div>

            <div aria-hidden="true" style=${styleMap({ width: `${this.clientWidth}px` })}></div>
          </sl-menu>
        </sl-dropdown>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-autocomplete': SlAutocomplete;
  }
}
