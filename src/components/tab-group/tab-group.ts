import { LitElement, customElement, html, internalProperty, property, query, unsafeCSS } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { event, EventEmitter } from '../../internal/event';
import { watch } from '../../internal/watch';
import styles from 'sass:./tab-group.scss';
import { SlTab, SlTabPanel } from '../../shoelace';
import { getOffset } from '../../internal/offset';
import { scrollIntoView } from '../../internal/scroll';
import { focusVisible } from '../../internal/focus-visible';

/**
 * @since 2.0
 * @status stable
 *
 * @dependency sl-icon-button
 *
 * @slot nav - Used for grouping tabs in the tab group.
 * @slot - Used for grouping tab panels in the tab group.
 *
 * @part base - The component's base wrapper.
 * @part nav - The tab group navigation container.
 * @part tabs - The container that wraps the slotted tabs.
 * @part active-tab-indicator - An element that displays the currently selected tab. This is a child of the tabs container.
 * @part body - The tab group body where tab panels are slotted in.
 * @part scroll-button - The previous and next scroll buttons that appear when tabs are scrollable.
 */
@customElement('sl-tab-group')
export class SlTabGroup extends LitElement {
  static styles = unsafeCSS(styles);

  @query('.tab-group') tabGroup: HTMLElement;
  @query('.tab-group__body') body: HTMLElement;
  @query('.tab-group__nav') nav: HTMLElement;
  @query('.tab-group__active-tab-indicator') activeTabIndicator: HTMLElement;

  private activeTab: SlTab;
  private mutationObserver: MutationObserver;
  private resizeObserver: ResizeObserver;
  private tabs: SlTab[] = [];
  private panels: SlTabPanel[] = [];

  @internalProperty() private hasScrollControls = false;

  /** The placement of the tabs. */
  @property() placement: 'top' | 'bottom' | 'left' | 'right' = 'top';

  /** Disables the scroll arrows that appear when tabs overflow. */
  @property({ attribute: 'no-scroll-controls', type: Boolean }) noScrollControls = false;

  /** Emitted when a tab is shown. */
  @event('sl-tab-show') slTabShow: EventEmitter<{ tab: string }>;

  /** Emitted when a tab is hidden. */
  @event('sl-tab-hide') slTabHide: EventEmitter<{ tab: string }>;

  firstUpdated() {
    this.syncTabsAndPanels();

    // Set initial tab state when the tabs first become visible
    const observer = new IntersectionObserver((entries, observer) => {
      if (entries[0].intersectionRatio > 0) {
        this.setAriaLabels();
        this.setActiveTab(this.getActiveTab() || this.tabs[0], false);
        observer.unobserve(entries[0].target);
      }
    });
    observer.observe(this);

    focusVisible.observe(this.tabGroup);

    this.resizeObserver = new ResizeObserver(() => this.updateScrollControls());
    this.resizeObserver.observe(this.nav);
    requestAnimationFrame(() => this.updateScrollControls());

    // Update aria labels if the DOM changes
    this.mutationObserver = new MutationObserver(mutations => {
      if (
        mutations.some(mutation => {
          return !['aria-labelledby', 'aria-controls'].includes(mutation.attributeName as string);
        })
      ) {
        setTimeout(() => this.setAriaLabels());
      }
    });
    this.mutationObserver.observe(this, { attributes: true, childList: true, subtree: true });
  }

  disconnectedCallback() {
    this.mutationObserver.disconnect();
    focusVisible.unobserve(this.tabGroup);
    this.resizeObserver.unobserve(this.nav);
  }

  /** Shows the specified tab panel. */
  show(panel: string) {
    const tab = this.tabs.find(el => el.panel === panel) as SlTab;

    if (tab) {
      this.setActiveTab(tab);
    }
  }

  getAllTabs(includeDisabled = false) {
    const slot = this.shadowRoot!.querySelector('slot[name="nav"]') as HTMLSlotElement;

    return [...slot.assignedElements()].filter((el: any) => {
      return includeDisabled
        ? el.tagName.toLowerCase() === 'sl-tab'
        : el.tagName.toLowerCase() === 'sl-tab' && !el.disabled;
    }) as SlTab[];
  }

  getAllPanels() {
    const slot = this.body.querySelector('slot')!;
    return [...slot.assignedElements()].filter((el: any) => el.tagName.toLowerCase() === 'sl-tab-panel') as [
      SlTabPanel
    ];
  }

  getActiveTab() {
    return this.tabs.find(el => el.active);
  }

  handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const tab = target.closest('sl-tab') as SlTab;
    const tabGroup = tab?.closest('sl-tab-group');

    // Ensure the target tab is in this tab group
    if (tabGroup !== this) {
      return;
    }

    if (tab) {
      this.setActiveTab(tab);
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    const target = event.target as HTMLElement;
    const tab = target.closest('sl-tab') as SlTab;
    const tabGroup = tab?.closest('sl-tab-group');

    // Ensure the target tab is in this tab group
    if (tabGroup !== this) {
      return;
    }

    // Activate a tab
    if (['Enter', ' '].includes(event.key)) {
      if (tab) {
        this.setActiveTab(tab);
        event.preventDefault();
      }
    }

    // Move focus left or right
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) {
      const activeEl = document.activeElement as any;

      if (activeEl && activeEl.tagName.toLowerCase() === 'sl-tab') {
        let index = this.tabs.indexOf(activeEl);

        if (event.key === 'Home') {
          index = 0;
        } else if (event.key === 'End') {
          index = this.tabs.length - 1;
        } else if (event.key === 'ArrowLeft') {
          index = Math.max(0, index - 1);
        } else if (event.key === 'ArrowRight') {
          index = Math.min(this.tabs.length - 1, index + 1);
        }

        this.tabs[index].setFocus({ preventScroll: true });

        if (['top', 'bottom'].includes(this.placement)) {
          scrollIntoView(this.tabs[index], this.nav, 'horizontal');
        }

        event.preventDefault();
      }
    }
  }

  handleScrollLeft() {
    this.nav.scroll({
      left: this.nav.scrollLeft - this.nav.clientWidth,
      behavior: 'smooth'
    });
  }

  handleScrollRight() {
    this.nav.scroll({
      left: this.nav.scrollLeft + this.nav.clientWidth,
      behavior: 'smooth'
    });
  }

  @watch('noScrollControls')
  updateScrollControls() {
    if (this.noScrollControls) {
      this.hasScrollControls = false;
    } else {
      this.hasScrollControls =
        ['top', 'bottom'].includes(this.placement) && this.nav.scrollWidth > this.nav.clientWidth;
    }
  }

  setActiveTab(tab: SlTab, emitEvents = true) {
    if (tab && tab !== this.activeTab && !tab.disabled) {
      const previousTab = this.activeTab;
      this.activeTab = tab;

      // Sync active tab and panel
      this.tabs.map(el => (el.active = el === this.activeTab));
      this.panels.map(el => (el.active = el.name === this.activeTab.panel));
      this.syncActiveTabIndicator();

      if (['top', 'bottom'].includes(this.placement)) {
        scrollIntoView(this.activeTab, this.nav, 'horizontal');
      }

      // Emit events
      if (emitEvents) {
        if (previousTab) {
          this.slTabHide.emit({ detail: { name: previousTab.panel } });
        }

        this.slTabShow.emit({ detail: { name: this.activeTab.panel } });
      }
    }
  }

  setAriaLabels() {
    // Link each tab with its corresponding panel
    this.tabs.map(tab => {
      const panel = this.panels.find(el => el.name === tab.panel) as SlTabPanel;
      if (panel) {
        tab.setAttribute('aria-controls', panel.getAttribute('id') as string);
        panel.setAttribute('aria-labelledby', tab.getAttribute('id') as string);
      }
    });
  }

  @watch('placement')
  syncActiveTabIndicator() {
    const tab = this.getActiveTab();

    if (tab) {
      this.activeTabIndicator.style.display = 'block';
    } else {
      this.activeTabIndicator.style.display = 'none';
      return;
    }

    const width = tab.clientWidth;
    const height = tab.clientHeight;
    const offset = getOffset(tab, this.nav);
    const offsetTop = offset.top + this.nav.scrollTop;
    const offsetLeft = offset.left + this.nav.scrollLeft;

    switch (this.placement) {
      case 'top':
      case 'bottom':
        this.activeTabIndicator.style.width = `${width}px`;
        (this.activeTabIndicator.style.height as string | undefined) = undefined;
        this.activeTabIndicator.style.transform = `translateX(${offsetLeft}px)`;
        break;

      case 'left':
      case 'right':
        (this.activeTabIndicator.style.width as string | undefined) = undefined;
        this.activeTabIndicator.style.height = `${height}px`;
        this.activeTabIndicator.style.transform = `translateY(${offsetTop}px)`;
        break;
    }
  }

  syncTabsAndPanels() {
    this.tabs = this.getAllTabs();
    this.panels = this.getAllPanels();
    this.syncActiveTabIndicator();
  }

  render() {
    return html`
      <div
        part="base"
        class=${classMap({
          'tab-group': true,
          'tab-group--top': this.placement === 'top',
          'tab-group--bottom': this.placement === 'bottom',
          'tab-group--left': this.placement === 'left',
          'tab-group--right': this.placement === 'right',
          'tab-group--has-scroll-controls': this.hasScrollControls
        })}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        <div class="tab-group__nav-container">
          ${this.hasScrollControls
            ? html`
                <sl-icon-button
                  class="tab-group__scroll-button tab-group__scroll-button--left"
                  exportparts="base:scroll-button"
                  name="chevron-left"
                  @click=${this.handleScrollLeft}
                ></sl-icon-button>
              `
            : ''}

          <div part="nav" class="tab-group__nav">
            <div part="tabs" class="tab-group__tabs" role="tablist">
              <div part="active-tab-indicator" class="tab-group__active-tab-indicator"></div>
              <slot name="nav" @slotchange=${this.syncTabsAndPanels}></slot>
            </div>
          </div>

          ${this.hasScrollControls
            ? html`
                <sl-icon-button
                  class="tab-group__scroll-button tab-group__scroll-button--right"
                  exportparts="base:scroll-button"
                  name="chevron-right"
                  @click=${this.handleScrollRight}
                ></sl-icon-button>
              `
            : ''}
        </div>

        <div part="body" class="tab-group__body">
          <slot @slotchange=${this.syncTabsAndPanels}></slot>
        </div>
      </div>
    `;
  }
}
