import '../../internal/scrollend-polyfill.js';
import { classMap } from 'lit/directives/class-map.js';
import { eventOptions, property, query, state } from 'lit/decorators.js';
import { html } from 'lit';
import { LocalizeController } from '../../utilities/localize.js';
import { scrollIntoView } from '../../internal/scroll.js';
import { watch } from '../../internal/watch.js';
import componentStyles from '../../styles/component.styles.js';
import ShoelaceElement from '../../internal/shoelace-element.js';
import SlIconButton from '../icon-button/icon-button.component.js';
import SlResizeObserver from '../resize-observer/resize-observer.component.js';
import styles from './tab-group.styles.js';
import type { CSSResultGroup } from 'lit';
import type SlTab from '../tab/tab.js';
import type SlTabPanel from '../tab-panel/tab-panel.js';

/**
 * @summary Tab groups organize content into a container that shows one section at a time.
 * @documentation https://shoelace.style/components/tab-group
 * @status stable
 * @since 2.0
 *
 * @dependency sl-icon-button
 *
 * @slot - Used for grouping tab panels in the tab group. Must be `<sl-tab-panel>` elements.
 * @slot nav - Used for grouping tabs in the tab group. Must be `<sl-tab>` elements.
 *
 * @event {{ name: String }} sl-tab-show - Emitted when a tab is shown.
 * @event {{ name: String }} sl-tab-hide - Emitted when a tab is hidden.
 *
 * @csspart base - The component's base wrapper.
 * @csspart nav - The tab group's navigation container where tabs are slotted in.
 * @csspart tabs - The container that wraps the tabs.
 * @csspart active-tab-indicator - The line that highlights the currently selected tab.
 * @csspart body - The tab group's body where tab panels are slotted in.
 * @csspart scroll-button - The previous/next scroll buttons that show when tabs are scrollable, an `<sl-icon-button>`.
 * @csspart scroll-button--start - The starting scroll button.
 * @csspart scroll-button--end - The ending scroll button.
 * @csspart scroll-button__base - The scroll button's exported `base` part.
 *
 * @cssproperty --indicator-color - The color of the active tab indicator.
 * @cssproperty --track-color - The color of the indicator's track (the line that separates tabs from panels).
 * @cssproperty --track-width - The width of the indicator's track (the line that separates tabs from panels).
 */
export default class SlTabGroup extends ShoelaceElement {
  static styles: CSSResultGroup = [componentStyles, styles];
  static dependencies = { 'sl-icon-button': SlIconButton, 'sl-resize-observer': SlResizeObserver };

  private activeTab?: SlTab;
  private mutationObserver: MutationObserver;
  private resizeObserver: ResizeObserver;
  private tabs: SlTab[] = [];
  private focusableTabs: SlTab[] = [];
  private panels: SlTabPanel[] = [];
  private readonly localize = new LocalizeController(this);

  @query('.tab-group') tabGroup: HTMLElement;
  @query('.tab-group__body') body: HTMLSlotElement;
  @query('.tab-group__nav') nav: HTMLElement;
  @query('.tab-group__indicator') indicator: HTMLElement;

  @state() private hasScrollControls = false;

  @state() private shouldHideScrollStartButton = false;
  @state() private shouldHideScrollEndButton = false;

  /** The placement of the tabs. */
  @property() placement: 'top' | 'bottom' | 'start' | 'end' = 'top';

  /**
   * When set to auto, navigating tabs with the arrow keys will instantly show the corresponding tab panel. When set to
   * manual, the tab will receive focus but will not show until the user presses spacebar or enter.
   */
  @property() activation: 'auto' | 'manual' = 'auto';

  /** Disables the scroll arrows that appear when tabs overflow. */
  @property({ attribute: 'no-scroll-controls', type: Boolean }) noScrollControls = false;

  /** Prevent scroll buttons from being hidden when inactive. */
  @property({ attribute: 'fixed-scroll-controls', type: Boolean }) fixedScrollControls = false;

  connectedCallback() {
    const whenAllDefined = Promise.all([
      customElements.whenDefined('sl-tab'),
      customElements.whenDefined('sl-tab-panel')
    ]);

    super.connectedCallback();

    this.resizeObserver = new ResizeObserver(() => {
      this.repositionIndicator();
      this.updateScrollControls();
    });

    this.mutationObserver = new MutationObserver(mutations => {
      // Update aria labels when the DOM changes
      if (mutations.some(m => !['aria-labelledby', 'aria-controls'].includes(m.attributeName!))) {
        setTimeout(() => this.setAriaLabels());
      }

      // Sync tabs when disabled states change
      if (mutations.some(m => m.attributeName === 'disabled')) {
        this.syncTabsAndPanels();
      }
    });

    // After the first update...
    this.updateComplete.then(() => {
      this.syncTabsAndPanels();
      this.mutationObserver.observe(this, { attributes: true, childList: true, subtree: true });
      this.resizeObserver.observe(this.nav);

      // Wait for tabs and tab panels to be registered
      whenAllDefined.then(() => {
        // Set initial tab state when the tabs become visible
        const intersectionObserver = new IntersectionObserver((entries, observer) => {
          if (entries[0].intersectionRatio > 0) {
            this.setAriaLabels();
            this.setActiveTab(this.getActiveTab() ?? this.tabs[0], { emitEvents: false });
            observer.unobserve(entries[0].target);
          }
        });
        intersectionObserver.observe(this.tabGroup);
      });
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.mutationObserver?.disconnect();

    if (this.nav) {
      this.resizeObserver?.unobserve(this.nav);
    }
  }

  private getAllTabs() {
    const slot = this.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="nav"]')!;

    return slot.assignedElements() as SlTab[];
  }

  private getAllPanels() {
    return [...this.body.assignedElements()].filter(el => el.tagName.toLowerCase() === 'sl-tab-panel') as [SlTabPanel];
  }

  private getActiveTab() {
    return this.tabs.find(el => el.active);
  }

  private handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const tab = target.closest('sl-tab');
    const tabGroup = tab?.closest('sl-tab-group');

    // Ensure the target tab is in this tab group
    if (tabGroup !== this) {
      return;
    }

    if (tab !== null) {
      this.setActiveTab(tab, { scrollBehavior: 'smooth' });
    }
  }

  private handleKeyDown(event: KeyboardEvent) {
    const target = event.target as HTMLElement;
    const tab = target.closest('sl-tab');
    const tabGroup = tab?.closest('sl-tab-group');

    // Ensure the target tab is in this tab group
    if (tabGroup !== this) {
      return;
    }

    // Activate a tab
    if (['Enter', ' '].includes(event.key)) {
      if (tab !== null) {
        this.setActiveTab(tab, { scrollBehavior: 'smooth' });
        event.preventDefault();
      }
    }

    // Move focus left or right
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) {
      const activeEl = this.tabs.find(t => t.matches(':focus'));
      const isRtl = this.localize.dir() === 'rtl';
      let nextTab: null | SlTab = null;

      if (activeEl?.tagName.toLowerCase() === 'sl-tab') {
        if (event.key === 'Home') {
          nextTab = this.focusableTabs[0];
        } else if (event.key === 'End') {
          nextTab = this.focusableTabs[this.focusableTabs.length - 1];
        } else if (
          (['top', 'bottom'].includes(this.placement) && event.key === (isRtl ? 'ArrowRight' : 'ArrowLeft')) ||
          (['start', 'end'].includes(this.placement) && event.key === 'ArrowUp')
        ) {
          const currentIndex = this.tabs.findIndex(el => el === activeEl);
          nextTab = this.findNextFocusableTab(currentIndex, 'backward');
        } else if (
          (['top', 'bottom'].includes(this.placement) && event.key === (isRtl ? 'ArrowLeft' : 'ArrowRight')) ||
          (['start', 'end'].includes(this.placement) && event.key === 'ArrowDown')
        ) {
          const currentIndex = this.tabs.findIndex(el => el === activeEl);
          nextTab = this.findNextFocusableTab(currentIndex, 'forward');
        }

        if (!nextTab) {
          return;
        }

        nextTab.tabIndex = 0;
        nextTab.focus({ preventScroll: true });

        if (this.activation === 'auto') {
          this.setActiveTab(nextTab, { scrollBehavior: 'smooth' });
        } else {
          this.tabs.forEach(tabEl => {
            tabEl.tabIndex = tabEl === nextTab ? 0 : -1;
          });
        }

        if (['top', 'bottom'].includes(this.placement)) {
          scrollIntoView(nextTab, this.nav, 'horizontal');
        }

        event.preventDefault();
      }
    }
  }

  private handleScrollToStart() {
    this.nav.scroll({
      left:
        this.localize.dir() === 'rtl'
          ? this.nav.scrollLeft + this.nav.clientWidth
          : this.nav.scrollLeft - this.nav.clientWidth,
      behavior: 'smooth'
    });
  }

  private handleScrollToEnd() {
    this.nav.scroll({
      left:
        this.localize.dir() === 'rtl'
          ? this.nav.scrollLeft - this.nav.clientWidth
          : this.nav.scrollLeft + this.nav.clientWidth,
      behavior: 'smooth'
    });
  }

  private setActiveTab(tab: SlTab, options?: { emitEvents?: boolean; scrollBehavior?: 'auto' | 'smooth' }) {
    options = {
      emitEvents: true,
      scrollBehavior: 'auto',
      ...options
    };

    if (tab !== this.activeTab && !tab.disabled) {
      const previousTab = this.activeTab;
      this.activeTab = tab;

      // Sync active tab and panel
      this.tabs.forEach(el => {
        el.active = el === this.activeTab;
        el.tabIndex = el === this.activeTab ? 0 : -1;
      });
      this.panels.forEach(el => (el.active = el.name === this.activeTab?.panel));
      this.syncIndicator();

      if (['top', 'bottom'].includes(this.placement)) {
        scrollIntoView(this.activeTab, this.nav, 'horizontal', options.scrollBehavior);
      }

      // Emit events
      if (options.emitEvents) {
        if (previousTab) {
          this.emit('sl-tab-hide', { detail: { name: previousTab.panel } });
        }

        this.emit('sl-tab-show', { detail: { name: this.activeTab.panel } });
      }
    }
  }

  private setAriaLabels() {
    // Link each tab with its corresponding panel
    this.tabs.forEach(tab => {
      const panel = this.panels.find(el => el.name === tab.panel);
      if (panel) {
        tab.setAttribute('aria-controls', panel.getAttribute('id')!);
        panel.setAttribute('aria-labelledby', tab.getAttribute('id')!);
      }
    });
  }

  private repositionIndicator() {
    const currentTab = this.getActiveTab();

    if (!currentTab) {
      return;
    }

    const width = currentTab.clientWidth;
    const height = currentTab.clientHeight;
    const isRtl = this.localize.dir() === 'rtl';

    // We can't used offsetLeft/offsetTop here due to a shadow parent issue where neither can getBoundingClientRect
    // because it provides invalid values for animating elements: https://bugs.chromium.org/p/chromium/issues/detail?id=920069
    const allTabs = this.getAllTabs();
    const precedingTabs = allTabs.slice(0, allTabs.indexOf(currentTab));
    const offset = precedingTabs.reduce(
      (previous, current) => ({
        left: previous.left + current.clientWidth,
        top: previous.top + current.clientHeight
      }),
      { left: 0, top: 0 }
    );

    switch (this.placement) {
      case 'top':
      case 'bottom':
        this.indicator.style.width = `${width}px`;
        this.indicator.style.height = 'auto';
        this.indicator.style.translate = isRtl ? `${-1 * offset.left}px` : `${offset.left}px`;
        break;

      case 'start':
      case 'end':
        this.indicator.style.width = 'auto';
        this.indicator.style.height = `${height}px`;
        this.indicator.style.translate = `0 ${offset.top}px`;
        break;
    }
  }

  // This stores tabs and panels so we can refer to a cache instead of calling querySelectorAll() multiple times.
  private syncTabsAndPanels() {
    this.tabs = this.getAllTabs();
    this.focusableTabs = this.tabs.filter(el => !el.disabled);

    this.panels = this.getAllPanels();
    this.syncIndicator();

    // After updating, show or hide scroll controls as needed
    this.updateComplete.then(() => this.updateScrollControls());
  }

  private findNextFocusableTab(currentIndex: number, direction: 'forward' | 'backward') {
    let nextTab = null;
    const iterator = direction === 'forward' ? 1 : -1;
    let nextIndex = currentIndex + iterator;

    while (currentIndex < this.tabs.length) {
      nextTab = this.tabs[nextIndex] || null;

      if (nextTab === null) {
        // This is where wrapping happens. If we're moving forward and get to the end, then we jump to the beginning. If we're moving backward and get to the start, then we jump to the end.
        if (direction === 'forward') {
          nextTab = this.focusableTabs[0];
        } else {
          nextTab = this.focusableTabs[this.focusableTabs.length - 1];
        }
        break;
      }

      if (!nextTab.disabled) {
        break;
      }

      nextIndex += iterator;
    }

    return nextTab;
  }

  /**
   * The reality of the browser means that we can't expect the scroll position to be exactly what we want it to be, so
   * we add one pixel of wiggle room to our calculations.
   */
  private scrollOffset = 1;

  @eventOptions({ passive: true })
  private updateScrollButtons() {
    if (this.hasScrollControls && !this.fixedScrollControls) {
      this.shouldHideScrollStartButton = this.scrollFromStart() <= this.scrollOffset;
      this.shouldHideScrollEndButton = this.isScrolledToEnd();
    }
  }

  private isScrolledToEnd() {
    return this.scrollFromStart() + this.nav.clientWidth >= this.nav.scrollWidth - this.scrollOffset;
  }

  private scrollFromStart() {
    return this.localize.dir() === 'rtl' ? -this.nav.scrollLeft : this.nav.scrollLeft;
  }

  @watch('noScrollControls', { waitUntilFirstUpdate: true })
  updateScrollControls() {
    if (this.noScrollControls) {
      this.hasScrollControls = false;
    } else {
      // In most cases, we can compare scrollWidth to clientWidth to determine if scroll controls should show. However,
      // Safari appears to calculate this incorrectly when zoomed at 110%, causing the controls to toggle indefinitely.
      // Adding a single pixel to the comparison seems to resolve it.
      //
      // See https://github.com/shoelace-style/shoelace/issues/1839
      this.hasScrollControls =
        ['top', 'bottom'].includes(this.placement) && this.nav.scrollWidth > this.nav.clientWidth + 1;
    }

    this.updateScrollButtons();
  }

  @watch('placement', { waitUntilFirstUpdate: true })
  syncIndicator() {
    const tab = this.getActiveTab();

    if (tab) {
      this.indicator.style.display = 'block';
      this.repositionIndicator();
    } else {
      this.indicator.style.display = 'none';
    }
  }

  /** Shows the specified tab panel. */
  show(panel: string) {
    const tab = this.tabs.find(el => el.panel === panel);

    if (tab) {
      this.setActiveTab(tab, { scrollBehavior: 'smooth' });
    }
  }

  render() {
    const isRtl = this.localize.dir() === 'rtl';

    return html`
      <div
        part="base"
        class=${classMap({
          'tab-group': true,
          'tab-group--top': this.placement === 'top',
          'tab-group--bottom': this.placement === 'bottom',
          'tab-group--start': this.placement === 'start',
          'tab-group--end': this.placement === 'end',
          'tab-group--rtl': this.localize.dir() === 'rtl',
          'tab-group--has-scroll-controls': this.hasScrollControls
        })}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        <div class="tab-group__nav-container" part="nav">
          ${this.hasScrollControls
            ? html`
                <sl-icon-button
                  part="scroll-button scroll-button--start"
                  exportparts="base:scroll-button__base"
                  class=${classMap({
                    'tab-group__scroll-button': true,
                    'tab-group__scroll-button--start': true,
                    'tab-group__scroll-button--start--hidden': this.shouldHideScrollStartButton
                  })}
                  name=${isRtl ? 'chevron-right' : 'chevron-left'}
                  library="system"
                  tabindex="-1"
                  aria-hidden="true"
                  label=${this.localize.term('scrollToStart')}
                  @click=${this.handleScrollToStart}
                ></sl-icon-button>
              `
            : ''}

          <div class="tab-group__nav" @scrollend=${this.updateScrollButtons}>
            <div part="tabs" class="tab-group__tabs" role="tablist">
              <div part="active-tab-indicator" class="tab-group__indicator"></div>
              <sl-resize-observer @sl-resize=${this.syncIndicator}>
                <slot name="nav" @slotchange=${this.syncTabsAndPanels}></slot>
              </sl-resize-observer>
            </div>
          </div>

          ${this.hasScrollControls
            ? html`
                <sl-icon-button
                  part="scroll-button scroll-button--end"
                  exportparts="base:scroll-button__base"
                  class=${classMap({
                    'tab-group__scroll-button': true,
                    'tab-group__scroll-button--end': true,
                    'tab-group__scroll-button--end--hidden': this.shouldHideScrollEndButton
                  })}
                  name=${isRtl ? 'chevron-left' : 'chevron-right'}
                  library="system"
                  tabindex="-1"
                  aria-hidden="true"
                  label=${this.localize.term('scrollToEnd')}
                  @click=${this.handleScrollToEnd}
                ></sl-icon-button>
              `
            : ''}
        </div>

        <slot part="body" class="tab-group__body" @slotchange=${this.syncTabsAndPanels}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-tab-group': SlTabGroup;
  }
}
