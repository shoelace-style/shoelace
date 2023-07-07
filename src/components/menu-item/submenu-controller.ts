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

  private isConnected: boolean = false;
  private isPopupConnected: boolean = false;
  private skidding: number = 0;

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
      this.updateSkidding();
    } else {
      this.removeListeners();
    }
  }

  private addListeners() {
    if (!this.isConnected) {
      this.host.addEventListener('mouseover', this.handleMouseOver);
      this.host.addEventListener('keydown', this.handleKeyDown);
      this.host.addEventListener('click', this.handleClick);
      this.host.addEventListener('focusout', this.handleFocusOut);
      this.isConnected = true;
    }
    if (!this.isPopupConnected) {
      if (this.popupRef.value) {
        this.popupRef.value.addEventListener('mouseover', this.handlePopupMouseover);
        this.isPopupConnected = true;
      }
    }
  }

  private removeListeners() {
    if (this.isConnected) {
      this.host.removeEventListener('mouseover', this.handleMouseOver);
      this.host.removeEventListener('keydown', this.handleKeyDown);
      this.host.removeEventListener('click', this.handleClick);
      this.host.removeEventListener('focusout', this.handleFocusOut);
      this.isConnected = false;
    }
    if (this.isPopupConnected) {
      if (this.popupRef.value) {
        this.popupRef.value.removeEventListener('mouseover', this.handlePopupMouseover);
        this.isPopupConnected = false;
      }
    }
  }

  private handleMouseOver = (_: MouseEvent) => {
    if (this.hasSlotController.test('submenu')) {
      this.enableSubmenu();
    }
  };

  /** Focus on the first menu-item of a submenu. */
  private handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'Escape':
      case 'Tab':
        this.disableSubmenu();
        break;
      case 'ArrowLeft':
        // Either focus is currently on the host element or a child.
        if (event.target !== this.host) {
          event.preventDefault();
          event.stopPropagation();
          this.host.focus();
          this.disableSubmenu();
        }
        break;
      case 'ArrowRight':
      case 'Enter':
      case ' ':
        // Pass focus to the first menu-item in the submenu.
        const submenuSlot: HTMLSlotElement = this.host.renderRoot.querySelector(
          "slot[name='submenu']"
        ) as HTMLSlotElement;

        // Missing slot
        if (!submenuSlot) {
          console.error('Cannot activate a submenu if no corresponding menuitem can be found.', this);
          return;
        }

        // Menus
        //let firstMenuItem: HTMLElement | null = null;
        let menuItems: NodeListOf<Element> | null = null;
        for (var elt of submenuSlot.assignedElements()) {
          //firstMenuItem = elt.querySelector("sl-menu-item, [role^='menuitem']");
          menuItems = elt.querySelectorAll("sl-menu-item, [role^='menuitem']");
          if (menuItems.length !== 0) {
            break;
          }
        }

        if (!menuItems || menuItems.length === 0) {
          return;
        }

        menuItems[0].setAttribute('tabindex', '0');
        for (var i = 1; i !== menuItems.length; ++i) {
          menuItems[i].setAttribute('tabindex', '-1');
        }

        // Open the submenu (if not open), and set focus to first menuitem.
        if (this.popupRef.value) {
          event.preventDefault();
          event.stopPropagation();
          if (this.popupRef.value.active) {
            if (menuItems[0] instanceof HTMLElement) {
              menuItems[0].focus();
            }
          } else {
            this.enableSubmenu();
            this.host.updateComplete.then(() => {
              if (menuItems![0] instanceof HTMLElement) {
                menuItems![0].focus();
              }
            });
            this.host.requestUpdate();
          }
        }
        break;

      default:
        break;
    }
  };

  private handleClick = (event: MouseEvent) => {
    // Clicking on the item which heads the menu does nothing.
    if (event.target === this.host) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  /** Close this submenu on focus outside of the parent or any descendents. */
  private handleFocusOut = (event: FocusEvent) => {
    if (!event.relatedTarget || (event.relatedTarget instanceof Element && !this.host.contains(event.relatedTarget))) {
      this.disableSubmenu();
    }
  };

  /** Prevent the parent menu-item from getting focus on mouse movement on the submenu. */
  private handlePopupMouseover = (event: MouseEvent) => {
    event.stopPropagation();
  };

  private setSubmenuState(state: boolean) {
    if (this.popupRef.value) {
      if (this.popupRef.value.active !== state) {
        this.popupRef.value.active = state;
        this.host.requestUpdate();
      }
    }
  }

  private enableSubmenu() {
    this.setSubmenuState(true);
  }

  private disableSubmenu() {
    this.setSubmenuState(false);
  }

  /** Calculate the space the top of a menu takes-up, for aligning the popup menu-item with the activating element. */
  private updateSkidding(): void {
    // .computedStyleMap() not always available.
    if (!this.host.parentElement || !this.host.parentElement.computedStyleMap) {
      return;
    }
    const styleMap: StylePropertyMapReadOnly = this.host.parentElement!.computedStyleMap();
    const attrs: string[] = ['padding-top', 'border-top-width', 'margin-top'];

    const skidding = attrs.reduce((accum, attr) => {
      const styleValue: CSSStyleValue = styleMap.get(attr) ?? new CSSUnitValue(0, 'px');
      const unitValue = styleValue instanceof CSSUnitValue ? (styleValue as CSSUnitValue) : new CSSUnitValue(0, 'px');
      const pxValue = unitValue.to('px');
      return accum - pxValue.value;
    }, 0);

    this.skidding = skidding;
  }

  isExpanded(): boolean {
    return this.popupRef.value ? this.popupRef.value.active : false;
  }

  renderSubmenu() {
    // Always render the slot. Conditionally render the outer sl-popup.

    if (!this.isConnected) {
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
        skidding="${this.skidding}"
        strategy="fixed"
      >
        <slot name="submenu"></slot>
      </sl-popup>
    `;
  }
}
