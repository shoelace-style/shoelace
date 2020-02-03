import { Component, Element, Method, Prop, State, Watch, h } from '@stencil/core';
import PopperJs from 'popper.js';

import { scrollIntoView } from '../../utilities/scroll';

let id = 0;
let openDropdowns = [];

/** @slot trigger - The dropdown's trigger, usually a `<sl-button>` element. */
/** @slot - Used to group the dropdown's menu items. */

@Component({
  tag: 'sl-dropdown',
  styleUrl: 'dropdown.scss',
  shadow: true
})
export class Dropdown {
  id = `sl-dropdown-${++id}`;
  menu: HTMLElement;
  popper: PopperJs;
  trigger: HTMLElement;

  constructor() {
    this.handleDocumentKeyDown = this.handleDocumentKeyDown.bind(this);
    this.handleDocumentMouseDown = this.handleDocumentMouseDown.bind(this);
    this.handleTriggerKeyDown = this.handleTriggerKeyDown.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleMenuMouseDown = this.handleMenuMouseDown.bind(this);
    this.handleMenuMouseOver = this.handleMenuMouseOver.bind(this);
    this.handleMenuMouseOut = this.handleMenuMouseOut.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
  }

  @Element() host: HTMLElement;

  @State() isOpen = false;

  /**
   * The preferred placement of the dropdown menu. Note that the actual placement may vary as needed to keep the menu
   * inside of the viewport.
   */
  @Prop() placement: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' = 'bottom-start';

  @Watch('placement')
  handlePlacementChange() {
    if (this.popper) {
      this.popper.options.placement = this.placement;
    }
  }

  componentDidLoad() {
    this.popper = new PopperJs(this.trigger, this.menu, {
      placement: this.placement,
      modifiers: {
        offset: {
          offset: '0, 2px'
        }
      }
    });

    // PopperJs.Defaults.modifiers.computeStyle.enabled = false;
  }

  componentDidUnload() {
    if (this.popper) {
      this.popper.destroy();
    }
  }

  @Method()
  async open() {
    this.closeOpenDropdowns();
    this.menu.hidden = false;
    this.isOpen = true;
    this.popper.scheduleUpdate();

    openDropdowns.push(this.host);

    document.addEventListener('mousedown', this.handleDocumentMouseDown);
    document.addEventListener('keydown', this.handleDocumentKeyDown);
  }

  @Method()
  async close() {
    this.isOpen = false;
    this.setSelectedItem(null);

    openDropdowns = openDropdowns.filter(dropdown => this.host !== dropdown);

    document.removeEventListener('mousedown', this.handleDocumentMouseDown);
    document.removeEventListener('keydown', this.handleDocumentKeyDown);
  }

  closeOpenDropdowns() {
    openDropdowns = openDropdowns.filter(dropdown => {
      if (this.host === dropdown) {
        return true;
      } else {
        dropdown.close();
        return false;
      }
    });
  }

  getAllItems() {
    const slot = this.menu.querySelector('slot');
    return [...slot.assignedElements()].filter(
      (el: any) => el.tagName.toLowerCase() === 'sl-dropdown-item' && !el.disabled
    ) as [HTMLSlDropdownItemElement];
  }

  getSelectedItem() {
    return this.getAllItems().find(i => i.active);
  }

  setSelectedItem(item: HTMLSlDropdownItemElement) {
    this.getAllItems().map(i => (i.active = i === item));
  }

  scrollItemIntoView(item: HTMLSlDropdownItemElement) {
    if (item) {
      scrollIntoView(item, this.menu);
    }
  }

  handleDocumentKeyDown(event: KeyboardEvent) {
    // Close when pressing escape or tab
    if (event.key === 'Escape' || event.key === 'Tab') {
      this.close();
    }

    // Make a selection when pressing enter
    if (event.key === 'Enter') {
      const item = this.getSelectedItem();
      event.preventDefault();

      if (item && !item.disabled) {
        item.click();
        this.close();
      }
    }

    // Move the selection when pressing down or up
    if (['ArrowDown', 'ArrowUp'].includes(event.key)) {
      const items = this.getAllItems();
      const selectedItem = this.getSelectedItem();
      event.preventDefault();

      let index = items.indexOf(selectedItem) + (event.key === 'ArrowDown' ? 1 : -1);
      if (index < 0) index = items.length - 1;
      if (index > items.length - 1) index = 0;
      this.setSelectedItem(items[index]);
      this.scrollItemIntoView(items[index]);
    }
  }

  handleDocumentMouseDown(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const dropdown = target.closest('sl-dropdown');

    // Close when clicking outside of the dropdown control
    if (!dropdown) {
      this.close();
      return;
    }
  }

  handleTriggerKeyDown(event: KeyboardEvent) {
    // Open the menu when pressing down or up while focused on the trigger
    if (!this.isOpen && ['ArrowDown', 'ArrowUp'].includes(event.key)) {
      this.open();
      event.preventDefault();
      event.stopPropagation();
    }
  }

  handleMenuClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const dropdownItem = target.closest('sl-dropdown-item');

    // Close when clicking on a dropdown item
    if (dropdownItem && !dropdownItem.disabled) {
      this.close();
      console.log(dropdownItem);
      return;
    }
  }

  handleMenuMouseDown(event: MouseEvent) {
    // Keep focus on the dropdown trigger when selecting menu items
    event.preventDefault();
  }

  handleMenuMouseOver(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const dropdownItem = target.closest('sl-dropdown-item');

    if (dropdownItem) {
      this.setSelectedItem(dropdownItem);
    }
  }

  handleMenuMouseOut() {
    this.setSelectedItem(null);
  }

  handleTransitionEnd() {
    // Reset the menu's scroll position before it gets hidden
    if (!this.isOpen) {
      this.menu.scrollTop = 0;
    }

    this.menu.hidden = !this.isOpen;
  }

  toggleMenu() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  render() {
    return (
      <div
        id={this.id}
        class={{
          'sl-dropdown': true,
          'sl-dropdown--open': this.isOpen
        }}
        aria-expanded={this.isOpen}
        aria-haspopup="true"
      >
        <span
          class="sl-dropdown__trigger"
          ref={el => (this.trigger = el)}
          onKeyDown={this.handleTriggerKeyDown}
          onClick={() => this.toggleMenu()}
        >
          <slot name="trigger" />
        </span>

        <div
          class="sl-dropdown__menu"
          ref={el => (this.menu = el)}
          role="menu"
          aria-hidden={!this.isOpen}
          aria-labeledby={this.id}
          onClick={this.handleMenuClick}
          onMouseDown={this.handleMenuMouseDown}
          onMouseOver={this.handleMenuMouseOver}
          onMouseOut={this.handleMenuMouseOut}
          onTransitionEnd={this.handleTransitionEnd}
          hidden
        >
          <slot />
        </div>
      </div>
    );
  }
}
