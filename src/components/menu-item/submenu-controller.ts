import { createRef, ref, type Ref } from 'lit/directives/ref.js';
import { type HasSlotController } from '../../internal/slot.js';
import { html } from 'lit';
import { type LocalizeController } from '../../utilities/localize.js';
import type { ReactiveController, ReactiveControllerHost } from 'lit';
import type SlMenuItem from './menu-item.js';
import type SlPopup from '../popup/popup.js';

/** A reactive controller to manage the registration of event listeners for submenus. */
export class SubmenuController implements ReactiveController {
  private host: ReactiveControllerHost & SlMenuItem;
  private popupRef: Ref<SlPopup> = createRef();
  private enableSubmenuTimer = -1;
  private isConnected = false;
  private isPopupConnected = false;
  private skidding = 0;
  private readonly hasSlotController: HasSlotController;
  private readonly localize: LocalizeController;
  private readonly submenuOpenDelay = 100;

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
      this.host.addEventListener('mousemove', this.handleMouseMove);
      this.host.addEventListener('mouseover', this.handleMouseOver);
      this.host.addEventListener('keydown', this.handleKeyDown);
      this.host.addEventListener('click', this.handleClick);
      this.host.addEventListener('focusout', this.handleFocusOut);
      this.isConnected = true;
    }

    // The popup does not seem to get wired when the host is
    // connected, so manage its listeners separately.
    if (!this.isPopupConnected) {
      if (this.popupRef.value) {
        this.popupRef.value.addEventListener('mouseover', this.handlePopupMouseover);
        this.popupRef.value.addEventListener('sl-reposition', this.handlePopupReposition);
        this.isPopupConnected = true;
      }
    }
  }

  private removeListeners() {
    if (this.isConnected) {
      this.host.removeEventListener('mousemove', this.handleMouseMove);
      this.host.removeEventListener('mouseover', this.handleMouseOver);
      this.host.removeEventListener('keydown', this.handleKeyDown);
      this.host.removeEventListener('click', this.handleClick);
      this.host.removeEventListener('focusout', this.handleFocusOut);
      this.isConnected = false;
    }
    if (this.isPopupConnected) {
      if (this.popupRef.value) {
        this.popupRef.value.removeEventListener('mouseover', this.handlePopupMouseover);
        this.popupRef.value.removeEventListener('sl-reposition', this.handlePopupReposition);
        this.isPopupConnected = false;
      }
    }
  }

  // Set the safe triangle cursor position
  private handleMouseMove = (event: MouseEvent) => {
    this.host.style.setProperty('--safe-triangle-cursor-x', `${event.clientX}px`);
    this.host.style.setProperty('--safe-triangle-cursor-y', `${event.clientY}px`);
  };

  private handleMouseOver = () => {
    if (this.hasSlotController.test('submenu')) {
      this.enableSubmenu();
    }
  };

  private handleSubmenuEntry(event: KeyboardEvent) {
    // Pass focus to the first menu-item in the submenu.
    const submenuSlot: HTMLSlotElement | null = this.host.renderRoot.querySelector("slot[name='submenu']");

    // Missing slot
    if (!submenuSlot) {
      console.error('Cannot activate a submenu if no corresponding menuitem can be found.', this);
      return;
    }

    // Menus
    let menuItems: NodeListOf<Element> | null = null;
    for (const elt of submenuSlot.assignedElements()) {
      menuItems = elt.querySelectorAll("sl-menu-item, [role^='menuitem']");
      if (menuItems.length !== 0) {
        break;
      }
    }

    if (!menuItems || menuItems.length === 0) {
      return;
    }

    menuItems[0].setAttribute('tabindex', '0');
    for (let i = 1; i !== menuItems.length; ++i) {
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
        this.enableSubmenu(false);
        this.host.updateComplete.then(() => {
          if (menuItems![0] instanceof HTMLElement) {
            menuItems![0].focus();
          }
        });
        this.host.requestUpdate();
      }
    }
  }

  // Focus on the first menu-item of a submenu.
  private handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'Escape':
      case 'Tab':
        this.disableSubmenu();
        break;
      case 'ArrowLeft':
        // Either focus is currently on the host element or a child
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
        this.handleSubmenuEntry(event);
        break;
      default:
        break;
    }
  };

  private handleClick = (event: MouseEvent) => {
    // Clicking on the item which heads the menu does nothing, otherwise hide submenu and propagate
    if (event.target === this.host) {
      event.preventDefault();
      event.stopPropagation();
    } else if (
      event.target instanceof Element &&
      (event.target.tagName === 'sl-menu-item' || event.target.role?.startsWith('menuitem'))
    ) {
      this.disableSubmenu();
    }
  };

  // Close this submenu on focus outside of the parent or any descendants.
  private handleFocusOut = (event: FocusEvent) => {
    if (event.relatedTarget && event.relatedTarget instanceof Element && this.host.contains(event.relatedTarget)) {
      return;
    }
    this.disableSubmenu();
  };

  // Prevent the parent menu-item from getting focus on mouse movement on the submenu
  private handlePopupMouseover = (event: MouseEvent) => {
    event.stopPropagation();
  };

  // Set the safe triangle values for the submenu when the position changes
  private handlePopupReposition = () => {
    const submenuSlot: HTMLSlotElement | null = this.host.renderRoot.querySelector("slot[name='submenu']");
    const menu = submenuSlot?.assignedElements({ flatten: true }).filter(el => el.localName === 'sl-menu')[0];
    const isRtl = this.localize.dir() === 'rtl';

    if (!menu) {
      return;
    }

    const { left, top, width, height } = menu.getBoundingClientRect();

    this.host.style.setProperty('--safe-triangle-submenu-start-x', `${isRtl ? left + width : left}px`);
    this.host.style.setProperty('--safe-triangle-submenu-start-y', `${top}px`);
    this.host.style.setProperty('--safe-triangle-submenu-end-x', `${isRtl ? left + width : left}px`);
    this.host.style.setProperty('--safe-triangle-submenu-end-y', `${top + height}px`);
  };

  private setSubmenuState(state: boolean) {
    if (this.popupRef.value) {
      if (this.popupRef.value.active !== state) {
        this.popupRef.value.active = state;
        this.host.requestUpdate();
      }
    }
  }

  // Shows the submenu. Supports disabling the opening delay, e.g. for keyboard events that want to set the focus to the
  // newly opened menu.
  private enableSubmenu(delay = true) {
    if (delay) {
      window.clearTimeout(this.enableSubmenuTimer);
      this.enableSubmenuTimer = window.setTimeout(() => {
        this.setSubmenuState(true);
      }, this.submenuOpenDelay);
    } else {
      this.setSubmenuState(true);
    }
  }

  private disableSubmenu() {
    window.clearTimeout(this.enableSubmenuTimer);
    this.setSubmenuState(false);
  }

  // Calculate the space the top of a menu takes-up, for aligning the popup menu-item with the activating element.
  private updateSkidding(): void {
    // .computedStyleMap() not always available.
    if (!this.host.parentElement?.computedStyleMap) {
      return;
    }
    const styleMap: StylePropertyMapReadOnly = this.host.parentElement.computedStyleMap();
    const attrs: string[] = ['padding-top', 'border-top-width', 'margin-top'];

    const skidding = attrs.reduce((accumulator, attr) => {
      const styleValue: CSSStyleValue = styleMap.get(attr) ?? new CSSUnitValue(0, 'px');
      const unitValue = styleValue instanceof CSSUnitValue ? styleValue : new CSSUnitValue(0, 'px');
      const pxValue = unitValue.to('px');
      return accumulator - pxValue.value;
    }, 0);

    this.skidding = skidding;
  }

  isExpanded(): boolean {
    return this.popupRef.value ? this.popupRef.value.active : false;
  }

  renderSubmenu() {
    const isLtr = this.localize.dir() === 'ltr';

    // Always render the slot, but conditionally render the outer <sl-popup>
    if (!this.isConnected) {
      return html` <slot name="submenu" hidden></slot> `;
    }

    return html`
      <sl-popup
        ${ref(this.popupRef)}
        placement=${isLtr ? 'right-start' : 'left-start'}
        anchor="anchor"
        flip
        flip-fallback-strategy="best-fit"
        skidding="${this.skidding}"
        strategy="fixed"
        auto-size="vertical"
        auto-size-padding="10"
      >
        <slot name="submenu"></slot>
      </sl-popup>
    `;
  }
}
