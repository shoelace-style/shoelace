import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { live } from 'lit/directives/live.js';
import { when } from 'lit/directives/when.js';
import { animateTo, shimKeyframesHeightAuto, stopAnimations } from '../../internal/animate';
import ShoelaceElement from '../../internal/shoelace-element';
import { watch } from '../../internal/watch';
import { getAnimation, setDefaultAnimation } from '../../utilities/animation-registry';
import { LocalizeController } from '../../utilities/localize';
import '../checkbox/checkbox';
import '../icon/icon';
import '../spinner/spinner';
import styles from './tree-item.styles';
import type { CSSResultGroup, PropertyValueMap } from 'lit';

export function isTreeItem(element: Element) {
  return element && element?.getAttribute('role') === 'treeitem';
}

/**
 * @summary A tree item serves as a hierarchical node that lives inside a [tree](/components/tree).
 *
 * @since 2.0
 * @status experimental
 *
 * @dependency sl-checkbox
 * @dependency sl-icon
 * @dependency sl-spinner
 *
 * @event sl-expand - Emitted when the item expands.
 * @event sl-after-expand - Emitted after the item expands and all animations are complete.
 * @event sl-collapse - Emitted when the item collapses.
 * @event sl-after-collapse - Emitted after the item collapses and all animations are complete.
 * @event sl-lazy-change - Emitted when the item's lazy state changes.
 * @event sl-lazy-load - Emitted when a lazy item is selected. Use this event to asynchronously load data and append
 *  items to the tree before expanding. After appending new items, remove the `lazy` attribute to remove the loading
 *  state and update the tree.
 *
 * @slot - The default slot.
 * @slot expand-icon - The icon to show when the item is expanded.
 * @slot collapse-icon - The icon to show when the item is collapsed.
 *
 * @csspart base - The component's internal wrapper.
 * @csspart item - The item's main container.
 * @csspart item--disabled - Applied when the item is disabled.
 * @csspart item--expanded - Applied when the item is expanded.
 * @csspart item--indeterminate - Applied when the selection is indeterminate.
 * @csspart item--selected - Applied when the item is selected.
 * @csspart indentation - The item's indentation container.
 * @csspart expand-button - The item's expand button.
 * @csspart label - The item's label.
 * @csspart children - The item's children container.
 */
@customElement('sl-tree-item')
export default class SlTreeItem extends ShoelaceElement {
  static styles: CSSResultGroup = styles;

  private readonly localize = new LocalizeController(this);

  @state() indeterminate = false;
  @state() isLeaf = false;
  @state() loading = false;
  @state() selectable = false;

  /** Expands the tree item. */
  @property({ type: Boolean, reflect: true }) expanded = false;

  /** Draws the tree item in a selected state. */
  @property({ type: Boolean, reflect: true }) selected = false;

  /** Disables the tree item. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Enables lazy loading behavior. */
  @property({ type: Boolean, reflect: true }) lazy = false;

  @query('slot:not([name])') defaultSlot: HTMLSlotElement;
  @query('slot[name=children]') childrenSlot: HTMLSlotElement;
  @query('.tree-item__item') itemElement: HTMLDivElement;
  @query('.tree-item__children') childrenContainer: HTMLDivElement;
  @query('.tree-item__expand-button slot') expandButtonSlot: HTMLSlotElement;

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

    this.isLeaf = !this.lazy && this.getChildrenItems().length === 0;
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
    if (this.expandButtonSlot) {
      this.expandButtonSlot.name = this.expanded ? 'collapse-icon' : 'expand-icon';
    }

    if (this.expanded) {
      if (this.lazy) {
        this.loading = true;

        this.emit('sl-lazy-load');
      } else {
        this.animateExpand();
      }
    } else {
      this.animateCollapse();
    }
  }

  @watch('lazy', { waitUntilFirstUpdate: true })
  handleLazyChange() {
    this.emit('sl-lazy-change');
  }

  private async animateExpand() {
    this.emit('sl-expand');

    await stopAnimations(this.childrenContainer);
    this.childrenContainer.hidden = false;

    const { keyframes, options } = getAnimation(this, 'tree-item.expand', { dir: this.localize.dir() });
    await animateTo(
      this.childrenContainer,
      shimKeyframesHeightAuto(keyframes, this.childrenContainer.scrollHeight),
      options
    );
    this.childrenContainer.style.height = 'auto';

    this.emit('sl-after-expand');
  }

  private async animateCollapse() {
    this.emit('sl-collapse');

    await stopAnimations(this.childrenContainer);

    const { keyframes, options } = getAnimation(this, 'tree-item.collapse', { dir: this.localize.dir() });
    await animateTo(
      this.childrenContainer,
      shimKeyframesHeightAuto(keyframes, this.childrenContainer.scrollHeight),
      options
    );
    this.childrenContainer.hidden = true;

    this.emit('sl-after-collapse');
  }

  // Gets all the nested tree items
  getChildrenItems({ includeDisabled = true }: { includeDisabled?: boolean } = {}): SlTreeItem[] {
    return this.childrenSlot
      ? ([...this.childrenSlot.assignedElements({ flatten: true })].filter(
          (item: SlTreeItem) => isTreeItem(item) && (includeDisabled || !item.disabled)
        ) as SlTreeItem[])
      : [];
  }

  // Checks whether the item is nested into an item
  private isNestedItem(): boolean {
    const parent = this.parentElement;
    return !!parent && isTreeItem(parent);
  }

  handleChildrenSlotChange() {
    this.loading = false;
    this.isLeaf = !this.lazy && this.getChildrenItems().length === 0;
  }

  protected willUpdate(changedProperties: PropertyValueMap<SlTreeItem> | Map<PropertyKey, unknown>): void {
    if (changedProperties.has('selected') && !changedProperties.has('indeterminate')) {
      this.indeterminate = false;
    }
  }

  render() {
    const isRtl = this.localize.dir() === 'rtl';
    const showExpandButton = !this.loading && (!this.isLeaf || this.lazy);

    return html`
      <div
        part="base"
        class="${classMap({
          'tree-item': true,
          'tree-item--expanded': this.expanded,
          'tree-item--selected': this.selected,
          'tree-item--disabled': this.disabled,
          'tree-item--leaf': this.isLeaf,
          'tree-item--rtl': this.localize.dir() === 'rtl'
        })}"
      >
        <div
          class="tree-item__item"
          part="
            item
            ${this.disabled ? 'item--disabled' : ''}
            ${this.expanded ? 'item--expanded' : ''}
            ${this.indeterminate ? 'item--indeterminate' : ''}
            ${this.selected ? 'item--selected' : ''}
          "
        >
          <div class="tree-item__indentation" part="indentation"></div>

          <div
            part="expand-button"
            class=${classMap({
              'tree-item__expand-button': true,
              'tree-item__expand-button--visible': showExpandButton
            })}
            aria-hidden="true"
          >
            ${when(this.loading, () => html` <sl-spinner></sl-spinner> `)}
            ${when(
              showExpandButton,
              // This slot's name changes from `expand-icon` to `collapse-icon` when the tree item is expanded, but we
              // do that in the watch handler instead of here in the template because the transition breaks in Firefox.
              () => html`
                <slot class="tree-item__expand-icon-slot" name="expand-icon">
                  <sl-icon
                    class="tree-item__default-toggle-button"
                    library="system"
                    name=${isRtl ? 'chevron-left' : 'chevron-right'}
                  ></sl-icon>
                </slot>
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
