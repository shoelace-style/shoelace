import { Component, Method, Prop, State, Watch, h } from '@stencil/core';
import PopperJs from 'popper.js';

@Component({
  tag: 's-dropdown',
  styleUrl: 'dropdown.scss',
  scoped: true
})
export class Dropdown {
  items: [HTMLSDropdownItemElement];
  menu: HTMLElement;
  popper: PopperJs;
  trigger: HTMLElement;

  constructor() {
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.handleDocumentKeyDown = this.handleDocumentKeyDown.bind(this);
    this.handleMenuMouseDown = this.handleMenuMouseDown.bind(this);
    this.handleMenuMouseOver = this.handleMenuMouseOver.bind(this);
    this.handleMenuMouseOut = this.handleMenuMouseOut.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
  }

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
  }

  componentDidUnload() {
    if (this.popper) {
      this.popper.destroy();
    }
  }

  @Method()
  async open() {
    this.items = this.getAllItems();
    this.menu.hidden = false;
    this.popper.scheduleUpdate();
    requestAnimationFrame(() => (this.isOpen = true));

    document.addEventListener('click', this.handleDocumentClick);
    document.addEventListener('keydown', this.handleDocumentKeyDown);
  }

  @Method()
  async close() {
    this.isOpen = false;
    this.setSelectedItem(null);

    document.removeEventListener('click', this.handleDocumentClick);
    document.removeEventListener('keydown', this.handleDocumentKeyDown);
  }

  getAllItems() {
    return [...this.menu.querySelectorAll('s-dropdown-item:not([disabled])')] as [HTMLSDropdownItemElement];
  }

  getSelectedItem() {
    return this.items.filter(i => i.active)[0];
  }

  setSelectedItem(item: HTMLSDropdownItemElement) {
    this.items.map(i => (i.active = i === item));
  }

  handleDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const dropdown = target.closest('s-dropdown');
    const dropdownItem = target.closest('s-dropdown-item');

    // Close when clicking outside of the dropdown control
    if (!dropdown) {
      this.close();
      return;
    }

    // Close when clicking on a dropdown item
    if (dropdownItem && !dropdownItem.disabled) {
      this.close();
      return;
    }
  }

  handleDocumentKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape' || event.key === 'Tab') {
      this.close();
    }

    if (event.key === 'Enter') {
      const item = this.getSelectedItem();
      event.preventDefault();

      if (item) {
        item.click();
        this.close();
      }
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      const selectedItem = this.getSelectedItem();
      event.preventDefault();

      let index = this.items.indexOf(selectedItem) + (event.key === 'ArrowDown' ? 1 : -1);
      if (index < 0) index = this.items.length - 1;
      if (index > this.items.length - 1) index = 0;

      this.setSelectedItem(this.items[index]);
    }
  }

  handleMenuMouseDown(event: MouseEvent) {
    // Keep focus on the dropdown trigger when selecting menu items
    event.preventDefault();
  }

  handleMenuMouseOver(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const dropdownItem = target.closest('s-dropdown-item');

    if (dropdownItem) {
      this.setSelectedItem(dropdownItem);
    }
  }

  handleMenuMouseOut() {
    this.setSelectedItem(null);
  }

  handleTransitionEnd() {
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
        class={{
          's-dropdown': true,
          's-dropdown--open': this.isOpen
        }}
      >
        <span class="s-dropdown__trigger" ref={el => (this.trigger = el)} onClick={() => this.toggleMenu()}>
          <slot name="trigger" />
        </span>

        <div
          class="s-dropdown__menu"
          ref={el => (this.menu = el)}
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
