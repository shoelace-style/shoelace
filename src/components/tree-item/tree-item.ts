import { LocalizeController } from '@shoelace-style/localize';
import { LitElement, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { live } from 'lit/directives/live.js';
import { when } from 'lit/directives/when.js';
import { animateTo, shimKeyframesHeightAuto, stopAnimations } from 'src/internal/animate';
import { stringMap } from 'src/internal/string';
import { getAnimation, setDefaultAnimation } from 'src/utilities/animation-registry';
import '../../components/checkbox/checkbox';
import '../../components/spinner/spinner';
import { emit } from '../../internal/event';
import { watch } from '../../internal/watch';
import styles from './tree-item.styles';
import type { PropertyValueMap } from 'lit';

export function isTreeItem(element: Element) {
  return element && element.getAttribute('role') === 'treeitem';
}

/**
 * @since 2.0
 * @status experimental
 *
 * @dependency sl-checkbox
 * @dependency sl-spinner
 *
 * @event sl-expand - Emitted when the item expands.
 * @event sl-after-expand - Emitted after the item expands and all animations are complete.
 * @event sl-collapse - Emitted when the item collapses.
 * @event sl-after-collapse - Emitted after the item collapses and all animations are complete.
 * @event sl-lazy-load - Emitted when a lazy item is selected. Use this event to asynchronously load data and append items to the tree before expanding.
 *
 * @slot - The default slot.
 *
 * @csspart base - The component's internal wrapper.
 * @csspart item - The item main container.
 * @csspart item--selected - The `selected` state of the main container.
 * @csspart item--disabled - The `disabled` state of the main container.
 * @csspart indentation - The item indentation.
 * @csspart label - The item label.
 * @csspart children - The item children container.
 *
 * @cssproperty --indentation-size - The size of the indentation for nested items. (Default: --sl-spacing-medium)
 */
@customElement('sl-tree-item')
export default class SlTreeItem extends LitElement {
  static styles = styles;

  private readonly localize = new LocalizeController(this);

  /** Expands the item when is set */
  @property({ type: Boolean, reflect: true }) expanded = false;

  /** Sets the treeitem's selected state */
  @property({ type: Boolean, reflect: true }) selected = false;

  /** Disables the treeitem */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** When set, enables the lazy mode behavior */
  @property({ type: Boolean, reflect: true }) lazy = false;

  /** Shows the checkbox when set */
  @property({ type: Boolean }) selectable = false;

  /** Draws the checkbox in a indeterminate state. */
  @state() indeterminate = false;

  /** Specifies whether the node has children nodes */
  @state() isLeaf = false;

  /** Draws the expand button in a loading state. */
  @state() loading = false;

  @query('slot:not([name])') defaultSlot: HTMLSlotElement;
  @query('slot[name=children]') childrenSlot: HTMLSlotElement;
  @query('.tree-item__item') itemElement: HTMLDivElement;
  @query('.tree-item__children') childrenContainer: HTMLDivElement;

  connectedCallback(): void {
    super.connectedCallback();

    this.setAttribute('role', 'treeitem');
    this.setAttribute('tabindex', '-1');

    if (this.isNestedItem()) {
      this.slot = 'children';
    }
  }

  firstUpdated() {
    this.childrenContainer.hidden = !this.expanded;
    this.childrenContainer.style.height = this.expanded ? 'auto' : '0';

    this.isLeaf = this.getChildrenItems().length === 0;
    this.handleExpandedChange();
  }

  @watch('loading', { waitUntilFirstUpdate: true })
  handleLoadingChange() {
    this.setAttribute('aria-busy', this.loading ? 'true' : 'false');

    if (!this.loading) {
      this.animateExpand();
    }
  }

  @watch('disabled')
  handleDisabledChange() {
    this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
  }

  @watch('selected')
  handleSelectedChange() {
    this.setAttribute('aria-selected', this.selected ? 'true' : 'false');
  }

  @watch('expanded', { waitUntilFirstUpdate: true })
  handleExpandedChange() {
    if (!this.isLeaf) {
      this.setAttribute('aria-expanded', this.expanded ? 'true' : 'false');
    } else {
      this.removeAttribute('aria-expanded');
    }
  }

  @watch('expanded', { waitUntilFirstUpdate: true })
  handleExpandAnimation() {
    if (this.expanded) {
      if (this.lazy) {
        this.loading = true;

        emit(this, 'sl-lazy-load');
      } else {
        this.animateExpand();
      }
    } else {
      this.animateCollapse();
    }
  }

  private async animateExpand() {
    emit(this, 'sl-expand');

    await stopAnimations(this.childrenContainer);
    this.childrenContainer.hidden = false;

    const { keyframes, options } = getAnimation(this, 'tree-item.expand', { dir: this.localize.dir() });
    await animateTo(
      this.childrenContainer,
      shimKeyframesHeightAuto(keyframes, this.childrenContainer.scrollHeight),
      options
    );
    this.childrenContainer.style.height = 'auto';

    emit(this, 'sl-after-expand');
  }

  private async animateCollapse() {
    emit(this, 'sl-collapse');

    await stopAnimations(this.childrenContainer);

    const { keyframes, options } = getAnimation(this, 'tree-item.collapse', { dir: this.localize.dir() });
    await animateTo(
      this.childrenContainer,
      shimKeyframesHeightAuto(keyframes, this.childrenContainer.scrollHeight),
      options
    );
    this.childrenContainer.hidden = true;

    emit(this, 'sl-after-collapse');
  }

  /**
   * @internal Gets all the nested tree items
   */
  getChildrenItems({ includeDisabled = true }: { includeDisabled?: boolean } = {}): SlTreeItem[] {
    return this.childrenSlot
      ? ([...this.childrenSlot.assignedElements({ flatten: true })].filter(
          (item: SlTreeItem) => isTreeItem(item) && (includeDisabled || !item.disabled)
        ) as SlTreeItem[])
      : [];
  }

  /**
   * @internal Checks whether the item is nested into an item
   */
  private isNestedItem(): boolean {
    const parent = this.parentElement;
    return !!parent && isTreeItem(parent);
  }

  handleToggleExpand(e: Event) {
    e.preventDefault();
    e.stopImmediatePropagation();

    if (!this.disabled) {
      this.expanded = !this.expanded;
    }
  }

  handleChildrenSlotChange() {
    this.loading = false;

    this.isLeaf = this.getChildrenItems().length === 0;
  }

  protected willUpdate(changedProperties: PropertyValueMap<SlTreeItem> | Map<PropertyKey, unknown>): void {
    if (changedProperties.has('selected') && !changedProperties.has('indeterminate')) {
      this.indeterminate = false;
    }
  }

  render() {
    return html`
      <div part="base" class="tree-item">
        <div
          class="${classMap({
            'tree-item__item': true,
            'tree-item__item--selected': this.selected,
            'tree-item__item--disabled': this.disabled
          })}"
          part="${stringMap({
            item: true,
            'item--selected': this.selected,
            'item--disabled': this.disabled
          })}"
        >
          <div class="tree-item__indentation" part="indentation"></div>

          <div class="tree-item__expand-button" aria-hidden="true" @click="${this.handleToggleExpand}">
            ${when(this.loading, () => html` <sl-spinner></sl-spinner> `)}
            ${when(
              !this.loading && (!this.isLeaf || this.lazy),
              () => html`
                <sl-icon library="system" name="${this.expanded ? 'chevron-down' : 'chevron-right'}"></sl-icon>
              `
            )}
          </div>

          ${when(
            this.selectable,
            () =>
              html`
                <sl-checkbox
                  tabindex="-1"
                  class="tree-item__checkbox"
                  ?disabled="${this.disabled}"
                  ?checked="${live(this.selected)}"
                  ?indeterminate="${this.indeterminate}"
                >
                  <div class="tree-item__label" part="label">
                    <slot></slot>
                  </div>
                </sl-checkbox>
              `,
            () => html`
              <div class="tree-item__label" part="label">
                <slot></slot>
              </div>
            `
          )}
        </div>

        <div class="tree-item__children" part="children" role="group">
          <slot name="children" @slotchange="${this.handleChildrenSlotChange}"></slot>
        </div>
      </div>
    `;
  }
}

setDefaultAnimation('tree-item.expand', {
  keyframes: [
    { height: '0', opacity: '0', overflow: 'hidden' },
    { height: 'auto', opacity: '1', overflow: 'hidden' }
  ],
  options: { duration: 250, easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)' }
});

setDefaultAnimation('tree-item.collapse', {
  keyframes: [
    { height: 'auto', opacity: '1', overflow: 'hidden' },
    { height: '0', opacity: '0', overflow: 'hidden' }
  ],
  options: { duration: 200, easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)' }
});

declare global {
  interface HTMLElementTagNameMap {
    'sl-tree-item': SlTreeItem;
  }
}
