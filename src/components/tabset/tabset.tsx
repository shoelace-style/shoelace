import { Component, Element, Event, EventEmitter, Method, Prop, h } from '@stencil/core';

@Component({
  tag: 'sl-tabset',
  styleUrl: 'tabset.scss',
  shadow: true
})
export class Tabset {
  activeTab: HTMLSlTabElement;
  body: HTMLElement;
  nav: HTMLElement;
  observer: MutationObserver;

  constructor() {
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  @Element() host: HTMLElement;

  /** The position of the tabs in the tabset. */
  @Prop() position: 'top' | 'right' | 'bottom' | 'left' = 'top';

  /** The type of tabs to draw. */
  @Prop() type: 'card' | 'pill' = 'card';

  /** Emitted when a tab is shown. */
  @Event() slTabShow: EventEmitter;

  /** Emitted when a tab is hidden. */
  @Event() slTabHide: EventEmitter;

  componentDidLoad() {
    // Set initial tab state
    this.setAriaLabels();
    this.setActiveTab(this.getActiveTab() || this.getAllTabs()[0], false);

    // Update aria labels id the DOM changes
    this.observer = new MutationObserver(() => setTimeout(() => this.setAriaLabels()));
    this.observer.observe(this.host, { attributes: true, childList: true });
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

  getAllTabs() {
    const slot = this.nav.querySelector('slot');
    return [...slot.assignedElements()].filter((el: any) => el.tagName.toLowerCase() === 'sl-tab' && !el.disabled) as [
      HTMLSlTabElement
    ];
  }

  getAllPanels() {
    const slot = this.body.querySelector('slot');
    return [...slot.assignedElements()].filter((el: any) => el.tagName.toLowerCase() === 'sl-tab-panel') as [
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

      // Emit events
      if (emitEvents) {
        if (previousTab) {
          this.slTabHide.emit({ name: previousTab.panel });
        }

        this.slTabShow.emit({ name: this.activeTab.panel });
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

  handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const tab = target.closest('sl-tab');

    if (tab) {
      this.setActiveTab(tab);
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    // Activate a tab
    if (['Enter', ' '].includes(event.key)) {
      const target = event.target as HTMLElement;
      const tab = target.closest('sl-tab');

      if (tab) {
        this.setActiveTab(tab);
        event.preventDefault();
      }
    }

    // Move focus left or right
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
      const activeEl = document.activeElement as any;

      if (activeEl && activeEl.tagName.toLowerCase() === 'sl-tab') {
        const tabs = this.getAllTabs();
        let index = tabs.indexOf(activeEl);
        index = index + (['ArrowLeft', 'ArrowUp'].includes(event.key) ? -1 : 1);
        if (index < 0) index = 0;
        if (index > tabs.length - 1) index = tabs.length - 1;
        tabs[index].setFocus();
        event.preventDefault();
      }
    }
  }

  render() {
    return (
      <div
        class={{
          'sl-tabset': true,

          // Positions
          'sl-tabset--top': this.position === 'top',
          'sl-tabset--right': this.position === 'right',
          'sl-tabset--bottom': this.position === 'bottom',
          'sl-tabset--left': this.position === 'left',

          // Types
          'sl-tabset--card': this.type === 'card',
          'sl-tabset--pill': this.type === 'pill'
        }}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
      >
        <div ref={el => (this.nav = el)} class="sl-tabset__nav" role="tablist">
          <slot name="nav" />
        </div>

        <div ref={el => (this.body = el)} class="sl-tabset__body">
          <slot />
        </div>
      </div>
    );
  }
}
