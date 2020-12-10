import { Component, Element, Event, EventEmitter, Method, Prop, Watch, h } from '@stencil/core';
import { scrollIntoView } from '../../utilities/scroll';
import { getNearestTabbableElement } from '../../utilities/tabbable';
import Popover from '../../utilities/popover';

let id = 0;

/**
 * @since 2.0
 * @status stable
 *
 * @slot trigger - The dropdown's trigger, usually a `<sl-button>` element.
 * @slot - The dropdown's content.
 *
 * @part base - The component's base wrapper.
 * @part trigger - The container that wraps the trigger.
 * @part panel - The panel that gets shown when the dropdown is open.
 */

@Component({
  tag: 'sl-dropdown',
  styleUrl: 'dropdown.scss',
  shadow: true
})
export class Dropdown {
  accessibleTrigger: HTMLElement;
  componentId = `dropdown-${++id}`;
  isVisible = false;
  panel: HTMLElement;
  positioner: HTMLElement;
  popover: Popover;
  trigger: HTMLElement;

  @Element() host: HTMLSlDropdownElement;

  /** Indicates whether or not the dropdown is open. You can use this in lieu of the show/hide methods. */
  @Prop({ mutable: true, reflect: true }) open = false;

  /**
   * The preferred placement of the dropdown panel. Note that the actual placement may vary as needed to keep the panel
   * inside of the viewport.
   */
  @Prop() placement:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'left'
    | 'left-start'
    | 'left-end' = 'bottom-start';

  /** Determines whether the dropdown should hide when a menu item is selected. */
  @Prop() closeOnSelect = true;

  /** The dropdown will close when the user interacts outside of this element (e.g. clicking). */
  @Prop() containingElement: HTMLElement;

  /** The distance in pixels from which to offset the panel away from its trigger. */
  @Prop() distance = 2;

  /** The distance in pixels from which to offset the panel along its trigger. */
  @Prop() skidding = 0;

  /**
   * Enable this option to prevent the panel from being clipped when the component is placed inside a container with
   * `overflow: auto|scroll`.
   */
  @Prop() hoist = false;

  /** Emitted when the dropdown opens. Calling `event.preventDefault()` will prevent it from being opened. */
  @Event({ eventName: 'sl-show' }) slShow: EventEmitter;

  /** Emitted after the dropdown opens and all transitions are complete. */
  @Event({ eventName: 'sl-after-show' }) slAfterShow: EventEmitter;

  /** Emitted when the dropdown closes. Calling `event.preventDefault()` will prevent it from being closed. */
  @Event({ eventName: 'sl-hide' }) slHide: EventEmitter;

  /** Emitted after the dropdown closes and all transitions are complete. */
  @Event({ eventName: 'sl-after-hide' }) slAfterHide: EventEmitter;

  @Watch('open')
  handleOpenChange() {
    this.open ? this.show() : this.hide();
    this.updateAccessibleTrigger();
  }

  @Watch('distance')
  @Watch('hoist')
  @Watch('placement')
  @Watch('skidding')
  handlePopoverOptionsChange() {
    this.popover.setOptions({
      strategy: this.hoist ? 'fixed' : 'absolute',
      placement: this.placement,
      distance: this.distance,
      skidding: this.skidding
    });
  }

  connectedCallback() {
    if (!this.containingElement) {
      this.containingElement = this.host;
    }

    this.handleDocumentKeyDown = this.handleDocumentKeyDown.bind(this);
    this.handleDocumentMouseDown = this.handleDocumentMouseDown.bind(this);
    this.handleMenuItemActivate = this.handleMenuItemActivate.bind(this);
    this.handlePanelSelect = this.handlePanelSelect.bind(this);
    this.handleTriggerClick = this.handleTriggerClick.bind(this);
    this.handleTriggerKeyDown = this.handleTriggerKeyDown.bind(this);
    this.handleTriggerKeyUp = this.handleTriggerKeyUp.bind(this);
    this.handleTriggerSlotChange = this.handleTriggerSlotChange.bind(this);
  }

  componentDidLoad() {
    this.popover = new Popover(this.trigger, this.positioner, {
      strategy: this.hoist ? 'fixed' : 'absolute',
      placement: this.placement,
      distance: this.distance,
      skidding: this.skidding,
      transitionElement: this.panel,
      onAfterHide: () => this.slAfterHide.emit(),
      onAfterShow: () => this.slAfterShow.emit(),
      onTransitionEnd: () => {
        if (!this.open) {
          this.panel.scrollTop = 0;
        }
      }
    });

    // Show on init if open
    if (this.open) {
      this.show();
    }
  }

  disconnectedCallback() {
    this.hide();
    this.popover.destroy();
  }

  /** Shows the dropdown panel */
  @Method()
  async show() {
    // Prevent subsequent calls to the method, whether manually or triggered by the `open` watcher
    if (this.isVisible) {
      return;
    }

    const slShow = this.slShow.emit();
    if (slShow.defaultPrevented) {
      this.open = false;
      return;
    }

    this.panel.addEventListener('sl-activate', this.handleMenuItemActivate);
    this.panel.addEventListener('sl-select', this.handlePanelSelect);
    document.addEventListener('keydown', this.handleDocumentKeyDown);
    document.addEventListener('mousedown', this.handleDocumentMouseDown);

    this.isVisible = true;
    this.open = true;
    this.popover.show();
  }

  /** Hides the dropdown panel */
  @Method()
  async hide() {
    // Prevent subsequent calls to the method, whether manually or triggered by the `open` watcher
    if (!this.isVisible) {
      return;
    }

    const slHide = this.slHide.emit();
    if (slHide.defaultPrevented) {
      this.open = true;
      return;
    }

    this.panel.removeEventListener('sl-activate', this.handleMenuItemActivate);
    this.panel.removeEventListener('sl-select', this.handlePanelSelect);
    document.addEventListener('keydown', this.handleDocumentKeyDown);
    document.removeEventListener('mousedown', this.handleDocumentMouseDown);

    this.isVisible = false;
    this.open = false;
    this.popover.hide();
  }

  focusOnTrigger() {
    const slot = this.trigger.querySelector('slot');
    const trigger = slot.assignedElements({ flatten: true })[0] as any;
    if (trigger) {
      if (typeof trigger.setFocus === 'function') {
        trigger.setFocus();
      } else if (typeof trigger.focus === 'function') {
        trigger.focus();
      }
    }
  }

  getMenu() {
    return this.panel
      .querySelector('slot')
      .assignedElements({ flatten: true })
      .filter(el => el.tagName.toLowerCase() === 'sl-menu')[0] as HTMLSlMenuElement;
  }

  handleDocumentKeyDown(event: KeyboardEvent) {
    // Close when escape is pressed
    if (event.key === 'Escape') {
      this.hide();
      this.focusOnTrigger();
      return;
    }

    // Handle tabbing
    if (event.key === 'Tab') {
      // Tabbing within an open menu should close the dropdown and refocus the trigger
      if (this.open && document.activeElement?.tagName.toLowerCase() === 'sl-menu-item') {
        event.preventDefault();
        this.hide();
        this.focusOnTrigger();
        return;
      }

      // Tabbing outside of the containing element closes the panel
      //
      // If the dropdown is used within a shadow DOM, we need to obtain the activeElement within that shadowRoot,
      // otherwise `document.activeElement` will only return the name of the parent shadow DOM element.
      setTimeout(() => {
        const activeElement =
          this.containingElement.getRootNode() instanceof ShadowRoot
            ? document.activeElement.shadowRoot?.activeElement
            : document.activeElement;

        if (activeElement?.closest(this.containingElement.tagName.toLowerCase()) !== this.containingElement) {
          this.hide();
          return;
        }
      });
    }
  }

  handleDocumentMouseDown(event: MouseEvent) {
    // Close when clicking outside of the containing element
    const path = event.composedPath() as Array<EventTarget>;
    if (!path.includes(this.containingElement)) {
      this.hide();
      return;
    }
  }

  handleMenuItemActivate(event: CustomEvent) {
    const item = event.target as HTMLSlMenuItemElement;
    scrollIntoView(item, this.panel);
  }

  handlePanelSelect(event: CustomEvent) {
    const target = event.target as HTMLElement;

    // Hide the dropdown when a menu item is selected
    if (this.closeOnSelect && target.tagName.toLowerCase() === 'sl-menu') {
      this.hide();
      this.focusOnTrigger();
    }
  }

  handleTriggerClick() {
    this.open ? this.hide() : this.show();
  }

  handleTriggerKeyDown(event: KeyboardEvent) {
    const menu = this.getMenu();
    const menuItems = menu ? [...menu.querySelectorAll('sl-menu-item')] : null;
    const firstMenuItem = menuItems[0];
    const lastMenuItem = menuItems[menuItems.length - 1];

    // Close when escape or tab is pressed
    if (event.key === 'Escape') {
      this.focusOnTrigger();
      this.hide();
      return;
    }

    // When spacebar/enter is pressed, show the panel but don't focus on the menu. This let's the user press the same
    // key again to hide the menu in case they don't want to make a selection.
    if ([' ', 'Enter'].includes(event.key)) {
      event.preventDefault();
      this.open ? this.hide() : this.show();
      return;
    }

    // When up/down is pressed, we make the assumption that the user is familiar with the menu and plans to make a
    // selection. Rather than toggle the panel, we focus on the menu (if one exists) and activate the first item for
    // faster navigation.
    if (['ArrowDown', 'ArrowUp'].includes(event.key)) {
      event.preventDefault();

      // Show the menu if it's not already open
      if (!this.open) {
        this.show();
      }

      // Focus on a menu item
      if (event.key === 'ArrowDown' && firstMenuItem) {
        firstMenuItem.setFocus();
        return;
      }

      if (event.key === 'ArrowUp' && lastMenuItem) {
        lastMenuItem.setFocus();
        return;
      }
    }

    // Other keys bring focus to the menu and initiate type-to-select behavior
    const ignoredKeys = ['Tab', 'Shift', 'Meta', 'Ctrl', 'Alt'];
    if (this.open && menu && !ignoredKeys.includes(event.key)) {
      menu.typeToSelect(event.key);
      return;
    }
  }

  handleTriggerKeyUp(event: KeyboardEvent) {
    // Prevent space from triggering a click event in Firefox
    if (event.key === ' ') {
      event.preventDefault();
    }
  }

  handleTriggerSlotChange() {
    this.updateAccessibleTrigger();
  }

  //
  // Slotted triggers can be arbitrary content, but we need to link them to the dropdown panel with `aria-haspopup` and
  // `aria-expanded`. These must be applied to the "accessible trigger" (the tabbable portion of the trigger element
  // that gets slotted in) so screen readers will understand them. The accessible trigger could be the slotted element,
  // a child of the slotted element, or an element in the slotted element's shadow root.
  //
  // For example, the accessible trigger of an <sl-button> is a <button> located inside its shadow root.
  //
  // To determine this, we assume the first tabbable element in the trigger slot is the "accessible trigger."
  //
  updateAccessibleTrigger() {
    const slot = this.trigger.querySelector('slot') as HTMLSlotElement;
    const assignedElements = slot.assignedElements({ flatten: true }) as HTMLElement[];
    const accessibleTrigger = assignedElements.map(getNearestTabbableElement)[0];

    if (accessibleTrigger) {
      accessibleTrigger.setAttribute('aria-haspopup', 'true');
      accessibleTrigger.setAttribute('aria-expanded', this.open ? 'true' : 'false');
    }
  }

  render() {
    return (
      <div
        part="base"
        id={this.componentId}
        class={{
          dropdown: true,
          'dropdown--open': this.open
        }}
      >
        <span
          part="trigger"
          class="dropdown__trigger"
          ref={el => (this.trigger = el)}
          onClick={this.handleTriggerClick}
          onKeyDown={this.handleTriggerKeyDown}
          onKeyUp={this.handleTriggerKeyUp}
        >
          <slot name="trigger" onSlotchange={this.handleTriggerSlotChange} />
        </span>

        {/* Position the panel with a wrapper since the popover makes use of `translate`. This let's us add transitions
        on the panel without interfering with the position. */}
        <div ref={el => (this.positioner = el)} class="dropdown__positioner">
          <div
            ref={el => (this.panel = el)}
            part="panel"
            class="dropdown__panel"
            role="menu"
            aria-hidden={this.open ? 'false' : 'true'}
            aria-labelledby={this.componentId}
          >
            <slot />
          </div>
        </div>
      </div>
    );
  }
}
