import { Component, Element, Event, EventEmitter, Method, Prop, State, Watch, h } from '@stencil/core';

import { getOffset } from '../../utilities/offset';
import { scrollIntoView } from '../../utilities/scroll';

/**
 * @slot nav - Used for grouping tabs in the tabs.
 * @slot - Used for grouping tab panels in the tabs.
 */

@Component({
  tag: 'sh-tabs',
  styleUrl: 'tabs.scss',
  shadow: true
})
export class Tab {
  activeTab: HTMLSlTabElement;
  activeTabIndicator: HTMLElement;
  body: HTMLElement;
  nav: HTMLElement;
  tabs: HTMLElement;
  observer: MutationObserver;

  constructor() {
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
  }

  @Element() host: HTMLElement;

  @State() isUsingMouse = false;

  /** The position of the tabs. */
  @Prop() position: 'top' | 'bottom' | 'left' | 'right' = 'top';

  @Watch('position')
  handlePositionChange() {
    this.syncActiveTabIndicator();
  }

  /** Emitted when a tab is shown. */
  @Event() shTabShow: EventEmitter;

  /** Emitted when a tab is hidden. */
  @Event() shTabHide: EventEmitter;

  componentDidLoad() {
    // Set initial tab state
    this.setAriaLabels();
    this.setActiveTab(this.getActiveTab() || this.getAllTabs()[0], false);

    // Update aria labels if the DOM changes
    this.observer = new MutationObserver(() => setTimeout(() => this.setAriaLabels()));
    this.observer.observe(this.host, { attributes: true, childList: true, subtree: true });
  }

  componentDidUnload() {
    this.observer.disconnect();
  }

  /** Shows the specified tab panel. */
  @Method()
  async show(panel: string) {
    const tabs = this.getAllTabs();
    const tab = tabs.find(el => el.panel === panel);

    if (tab) {
      this.setActiveTab(tab);
    }
  }

  getAllTabs(includeDisabled = false) {
    const slot = this.tabs.querySelector('slot');
    return [...slot.assignedElements()].filter((el: any) => {
      return includeDisabled
        ? el.tagName.toLowerCase() === 'sh-tab'
        : el.tagName.toLowerCase() === 'sh-tab' && !el.disabled;
    }) as [HTMLSlTabElement];
  }

  getAllPanels() {
    const slot = this.body.querySelector('slot');
    return [...slot.assignedElements()].filter((el: any) => el.tagName.toLowerCase() === 'sh-tab-panel') as [
      HTMLSlTabPanelElement
    ];
  }

  getActiveTab() {
    return this.getAllTabs().find(el => el.active);
  }

  setActiveTab(tab: HTMLSlTabElement, emitEvents = true) {
    if (tab && tab !== this.activeTab && !tab.disabled) {
      const previousTab = this.activeTab;
      this.activeTab = tab;

      // Sync tabs and panels
      this.getAllTabs().map(el => (el.active = el === this.activeTab));
      this.getAllPanels().map(el => (el.active = el.name === this.activeTab.panel));
      this.syncActiveTabIndicator();

      if (['top', 'bottom'].includes(this.position)) {
        scrollIntoView(this.activeTab, this.nav, 'horizontal');
      }

      // Emit events
      if (emitEvents) {
        if (previousTab) {
          this.shTabHide.emit({ name: previousTab.panel });
        }

        this.shTabShow.emit({ name: this.activeTab.panel });
      }
    }
  }

  setAriaLabels() {
    const tabs = this.getAllTabs();
    const panels = this.getAllPanels();

    // Link each tab with its corresponding panel
    tabs.map(tab => {
      const panel = panels.find(el => el.name === tab.panel);
      if (panel) {
        tab.setAttribute('aria-controls', panel.getAttribute('id'));
        panel.setAttribute('arial-labeledby', tab.getAttribute('id'));
      }
    });
  }

  syncActiveTabIndicator() {
    const tab = this.getActiveTab();
    const width = tab.clientWidth;
    const height = tab.clientHeight;
    const offset = getOffset(tab, this.nav);
    const offsetTop = offset.top + this.nav.scrollTop;
    const offsetLeft = offset.left + this.nav.scrollLeft;

    switch (this.position) {
      case 'top':
      case 'bottom':
        this.activeTabIndicator.style.width = `${width}px`;
        this.activeTabIndicator.style.height = null;
        this.activeTabIndicator.style.transform = `translateX(${offsetLeft}px)`;
        break;

      case 'left':
      case 'right':
        this.activeTabIndicator.style.width = null;
        this.activeTabIndicator.style.height = `${height}px`;
        this.activeTabIndicator.style.transform = `translateY(${offsetTop}px)`;
        break;
    }
  }

  handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const tab = target.closest('sh-tab');

    if (tab) {
      this.setActiveTab(tab);
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    this.isUsingMouse = false;

    // Activate a tab
    if (['Enter', ' '].includes(event.key)) {
      const target = event.target as HTMLElement;
      const tab = target.closest('sh-tab');

      if (tab) {
        this.setActiveTab(tab);
        event.preventDefault();
      }
    }

    // Move focus left or right
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
      const activeEl = document.activeElement as any;

      if (activeEl && activeEl.tagName.toLowerCase() === 'sh-tab') {
        const tabs = this.getAllTabs();
        let index = tabs.indexOf(activeEl);
        index = index + (['ArrowLeft', 'ArrowUp'].includes(event.key) ? -1 : 1);
        if (index < 0) index = 0;
        if (index > tabs.length - 1) index = tabs.length - 1;
        tabs[index].setFocus();

        if (['top', 'bottom'].includes(this.position)) {
          scrollIntoView(tabs[index], this.nav, 'horizontal');
        }

        event.preventDefault();
      }
    }
  }

  handleKeyUp() {
    this.isUsingMouse = false;
  }

  handleMouseDown() {
    this.isUsingMouse = true;
  }

  render() {
    return (
      <div
        class={{
          'sh-tabs': true,
          'sh-tabs--using-mouse': this.isUsingMouse,

          // Positions
          'sh-tabs--top': this.position === 'top',
          'sh-tabs--bottom': this.position === 'bottom',
          'sh-tabs--left': this.position === 'left',
          'sh-tabs--right': this.position === 'right'
        }}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.handleKeyUp}
        onMouseDown={this.handleMouseDown}
      >
        <div ref={el => (this.nav = el)} class="sh-tabs__nav" tabindex="-1">
          <div ref={el => (this.tabs = el)} class="sh-tabs__tabs" role="tablist">
            <div ref={el => (this.activeTabIndicator = el)} class="sh-tabs__active-tab-indicator" />
            <slot name="nav" />
          </div>
        </div>

        <div ref={el => (this.body = el)} class="sh-tabs__body">
          <slot />
        </div>
      </div>
    );
  }
}
