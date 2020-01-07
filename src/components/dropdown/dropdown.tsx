import { Component, Method, State, h } from '@stencil/core';

@Component({
  tag: 's-dropdown',
  styleUrl: 'dropdown.scss',
  scoped: true
})
export class Dropdown {
  menu: HTMLElement;

  constructor() {
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.handleDocumentKeyDown = this.handleDocumentKeyDown.bind(this);
    this.handleMenuMouseDown = this.handleMenuMouseDown.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
  }

  @State() isOpen = false;

  @Method()
  async open() {
    this.menu.hidden = false;
    requestAnimationFrame(() => (this.isOpen = true));

    document.addEventListener('click', this.handleDocumentClick);
    document.addEventListener('keydown', this.handleDocumentKeyDown);
  }

  @Method()
  async close() {
    this.isOpen = false;

    document.removeEventListener('click', this.handleDocumentClick);
    document.removeEventListener('keydown', this.handleDocumentKeyDown);
  }

  getDropdownItems() {
    return this.menu.querySelectorAll('s-dropdown-item:not([disabled])');
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
    if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      //
      // TODO:
      //
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      //
      // TODO:
      //
    }
  }

  handleMenuMouseDown(event: MouseEvent) {
    // Keep focus on the dropdown trigger when selecting a menu item
    event.preventDefault();
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
        <span class="s-dropdown__trigger" onClick={() => this.toggleMenu()}>
          <slot name="trigger" />
        </span>

        <div
          class="s-dropdown__menu"
          ref={el => (this.menu = el)}
          onMouseDown={this.handleMenuMouseDown}
          onTransitionEnd={this.handleTransitionEnd}
          hidden
        >
          <slot />
        </div>
      </div>
    );
  }
}
