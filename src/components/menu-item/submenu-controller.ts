import '../popup/popup.js';

import { createRef, ref, Ref } from 'lit/directives/ref.js';
import { HasSlotController } from '../../internal/slot.js';
import { html } from 'lit';
import { LocalizeController } from '../../utilities/localize.js';
import SlMenuItem from './menu-item.js';
import SlPopup from '../popup/popup.js';
import type { ReactiveController, ReactiveControllerHost } from 'lit';

/** A reactive controller to manage the registration of event listeners for submenus. */
export class SubmenuController implements ReactiveController {
  private host: ReactiveControllerHost & SlMenuItem;
  private popupRef: Ref<SlPopup> = createRef();
  private mouseOutTimer: number = -1;
  private isActive: boolean = false;

  private readonly hasSlotController: HasSlotController;
  private readonly localize: LocalizeController;

  constructor(
    host: ReactiveControllerHost & SlMenuItem,
    hasSlotController: HasSlotController,
    localize: LocalizeController
  ) {
    (this.host = host).addController(this);
    this.hasSlotController = hasSlotController;
    this.localize = localize;
  }

  hostConnected() {
    if (this.hasSlotController.test('submenu') && !this.host.disabled) {
      this.addListeners();
    }
  }

  hostDisconnected() {
    this.removeListeners();
  }

  hostUpdated() {
    if (this.hasSlotController.test('submenu') && !this.host.disabled) {
      this.addListeners();
    } else {
      this.removeListeners();
    }
  }

  private addListeners() {
    if (!this.isActive) {
      this.host.addEventListener('mouseover', this.handleMouseOver);
      this.host.addEventListener('mouseout', this.handleMouseOut);
      this.isActive = true;
    }
  }

  private removeListeners() {
    if (this.isActive) {
      this.host.removeEventListener('mouseover', this.handleMouseOver);
      this.host.removeEventListener('mouseout', this.handleMouseOut);
      this.isActive = false;
    }
  }

  private handleMouseOver = () => {
    clearTimeout(this.mouseOutTimer);
    if (this.hasSlotController.test('submenu') && this.popupRef.value) {
      this.popupRef.value.active = true;
    }
  };

  private handleMouseOut = () => {
    console.log('mouseOut');
    if (this.popupRef.value && this.popupRef.value.active) {
      this.mouseOutTimer = window.setTimeout(() => {
        if (this.popupRef.value && this.popupRef.value.active) {
          this.popupRef.value.active = false;
          //this.isMouseOver = false;
        }
      }, 100);
    }
  };

  renderSubmenu() {
    // Always render the slot. Conditionally render the outer sl-popup.

    if (!this.isActive) {
      return html` <slot name="submenu" hidden></slot> `;
    }

    const isLtr = this.localize.dir() === 'ltr';
    return html`
      <style>
        ::part(popup) {
          z-index: var(--sl-z-index-dropdown);
        }
      </style>
      <sl-popup
        ${ref(this.popupRef)}
        placement=${isLtr ? 'right-start' : 'left-start'}
        anchor="anchor"
        flip
        strategy="fixed"
      >
        <slot name="submenu"></slot>
      </sl-popup>
    `;
  }
}
