import { Instance as PopperInstance, createPopper } from '@popperjs/core';

export interface PopoverOptions {
  offset?: [number, number];
  placement?:
    | 'auto'
    | 'auto-start'
    | 'auto-end'
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
    | 'left-end';
  hideStyles?: {};
  showStyles?: {};
  onAfterShow?: () => any;
  onAfterHide?: () => any;
  onTransitionEnd?: () => any;
}

export default class Popover {
  anchor: HTMLElement;
  isVisible: boolean;
  popover: HTMLElement;
  popper: PopperInstance;
  options: PopoverOptions;

  constructor(anchor: HTMLElement, popover: HTMLElement, options: PopoverOptions) {
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);

    this.anchor = anchor;
    this.popover = popover;
    this.options = Object.assign(
      {
        offset: [0, 0],
        placement: 'bottom-start',
        hideStyles: {
          opacity: '0',
          transition: 'var(--sl-transition-fast) opacity'
        },
        showStyles: {
          opacity: '1',
          transition: 'var(--sl-transition-fast) opacity'
        },
        onAfterShow: () => {},
        onAfterHide: () => {},
        onTransitionEnd: () => {}
      },
      options
    );

    this.isVisible = false;
    this.applyStyles(this.options.hideStyles);

    this.popover.addEventListener('transitionend', this.handleTransitionEnd);
  }

  private applyStyles(styles: {}) {
    for (const [key, value] of Object.entries(styles)) {
      this.popover.style[key] = value;
    }
  }

  private handleTransitionEnd(event: TransitionEvent) {
    const target = event.target as HTMLElement;

    // Make sure the transition event comes from the popover and that we only handle it once (for opacity)
    if (target === this.popover && event.propertyName === 'opacity') {
      // Alway call onTransitionEnd before the element is actually hidden so users can do things like reset scroll
      this.options.onTransitionEnd.call(this, event);

      if (!this.isVisible) {
        this.popover.hidden = true;
        this.applyStyles(this.options.hideStyles);
        this.options.onAfterHide.call(this);
      }
    }
  }

  destroy() {
    this.popover.removeEventListener('transitionend', this.handleTransitionEnd);

    if (this.popper) {
      this.popper.destroy();
      this.popper = null;
    }
  }

  show() {
    this.isVisible = true;
    this.popover.hidden = false;
    this.popover.clientWidth; // force reflow
    this.applyStyles(this.options.showStyles);

    if (this.popper) {
      this.popper.destroy();
    }

    this.popper = createPopper(this.anchor, this.popover, {
      placement: this.options.placement,
      modifiers: [
        {
          name: 'flip',
          options: {
            boundary: 'viewport'
          }
        },
        {
          name: 'offset',
          options: {
            offset: this.options.offset
          }
        }
      ]
    });

    // Reposition the menu after it appears in case a modifier kicked in
    requestAnimationFrame(() => {
      this.popper.update();
      this.options.onAfterShow.call(this);
    });
  }

  hide() {
    // Apply the hidden styles and wait for the transition before hiding completely
    this.isVisible = false;
    this.applyStyles(this.options.hideStyles);
  }

  setOptions(options: PopoverOptions) {
    this.options = Object.assign(this.options, options);

    // Update popper options
    if (this.popper) {
      this.popper.setOptions({
        placement: this.options.placement
      });

      requestAnimationFrame(() => this.popper.update());
    }
  }
}
