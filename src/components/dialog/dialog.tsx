// Overlay appended to the body

// Dialog wrapper position: fixed

// Dialog is centered in that

// Multiple dialogs can show, but only one overlay will ever appear

import { Component, Element, Prop, Watch, h } from '@stencil/core';

const overlay = document.createElement('div');
overlay.classList.add('sl-dialog-overlay');

let openDialogs = [];

@Component({
  tag: 'sl-dialog',
  styleUrl: 'dialog.scss',
  shadow: true
})
export class Dialog {
  constructor() {
    this.handleOverlayClick = this.handleOverlayClick.bind(this);
  }

  @Element() host: HTMLElement;

  @Prop() open = false;

  @Watch('open')
  handleOpenChange() {
    this.open ? this.show() : this.hide();
  }

  handleOverlayClick() {
    this.hide();
  }

  show() {
    openDialogs.map(dialog => (dialog.open = false));
    document.body.appendChild(overlay);
    openDialogs.push(this.host);
    this.open = true;

    overlay.addEventListener('click', this.handleOverlayClick);
  }

  hide() {
    this.open = false;
    document.body.removeChild(overlay);
    openDialogs = openDialogs.filter(dialog => this.host !== dialog);
    overlay.removeEventListener('click', this.handleOverlayClick);
  }

  render() {
    return (
      <div
        class={{
          'sl-dialog': true,
          'sl-dialog--open': this.open
        }}
      >
        <div class="sl-dialog__overlay" onClick={() => (this.open = false)}>
          <div class="sl-dialog__box">
            <header class="sl-dialog__header">
              <slot name="header" />
            </header>

            <div class="sl-dialog__body">
              <slot />
            </div>

            <footer class="sl-dialog__footer">
              <slot name="footer" />
            </footer>
          </div>
        </div>
      </div>
    );
  }
}
