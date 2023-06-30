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
      this.host.addEventListener('keydown', (event) => { this.handleKeyDown(event) });
      this.isActive = true;
    }
  }

  private removeListeners() {
    if (this.isActive) {
      this.host.removeEventListener('mouseover', this.handleMouseOver);
      this.host.removeEventListener('mouseout', this.handleMouseOut);
      this.host.removeEventListener('keydown', this.handleKeyDown);
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
    if (this.popupRef.value && this.popupRef.value.active) {
      this.mouseOutTimer = window.setTimeout(() => {
        if (this.popupRef.value && this.popupRef.value.active) {
          this.popupRef.value.active = false;
          //this.isMouseOver = false;
        }
      }, 100);
    }
  };
  
  private isMenuItem(item: HTMLElement) {
    return (
      item.tagName.toLowerCase() === 'sl-menu-item' ||
      ['menuitem', 'menuitemcheckbox', 'menuitemradio'].includes(item.getAttribute('role') ?? '')
    );
  }

  /** @internal Gets all slotted menu items, ignoring dividers, headers, and other elements. */
  getAllItems() {
    const rr = this.host.renderRoot;
    const slotQS : HTMLSlotElement = rr.querySelector("slot[name='submenu']") as HTMLSlotElement;
    console.log(slotQS);
    const aEs = slotQS.assignedElements({ flatten: true });
    console.log(aEs[0]);
    const menuItems = aEs.filter((el: HTMLElement) => {
      if (el.inert || !this.isMenuItem(el)) {
        return false;
      }
      return true;
    }) as SlMenuItem[];
    return [...menuItems];
  }  

/*
    return [...this.host.renderRoot.querySelector("slot[name='submenu']").assignedElements({ flatten: true }).filter((el: HTMLElement) => {
      if (el.inert || !this.isMenuItem(el)) {
        return false;
      }
      return true;
    }) as SlMenuItem[];
  }
  */

  private handleKeyDown(event: KeyboardEvent) {
    console.log(`submenuController.handleKeyDown: ${event.key}`);
    switch(event.key) {
      case "ArrowRight":
        console.log("ArrowRight detected.");
        //let items = this.getAllItems();
        // find *a* menu-item
        // let item = this.host.renderRoot.querySelector("sl-menu-item, [role='menuitem'], [role='menuitemcheckbox'], [role='menuitemradio']")
        //let item = this.host.renderRoot.querySelector("sl-menu-item");
        let item : HTMLSlotElement = this.host.renderRoot.querySelector("slot[name='submenu']") as HTMLSlotElement;
        console.log(item);
        console.log(item!.assignedElements()[0]);
        console.log(item!.assignedElements()[0].querySelector("sl-menu-item"));
        item!.assignedElements()[0].querySelector("sl-menu-item")!.focus();
        break;
    }
  } 
  
  show() {
   
  }

  hide() {

  }

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
        flip-fallback-strategy="best-fit"
        strategy="fixed"
      >
        <slot name="submenu"></slot>
      </sl-popup>
    `;
  }
}
