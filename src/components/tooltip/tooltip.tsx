import { Component, Element, Event, EventEmitter, Host, Method, Prop, Watch, h } from '@stencil/core';
import tippy from 'tippy.js';

/** @slot - The tooltip's content. */

@Component({
  tag: 'sl-tooltip',
  shadow: true
})
export class Tooltip {
  tooltipTarget: HTMLElement;
  tooltip: any;

  constructor() {
    this.syncSettings = this.syncSettings.bind(this);
  }

  @Element() host: HTMLSlTooltipElement;

  /** Set to true to draw the the tooltip with an arrow. */
  @Prop() arrow = false;

  /** Set to true to disable the tooltip so it won't show when triggered. */
  @Prop() disabled = false;

  /** The distance in pixels from which to draw the tooltip from its target element. */
  @Prop() distance = 10;

  /** The delay in ms before the tooltip hides. */
  @Prop() hideDelay = 0;

  /** The duration in ms of the tooltip's hide transition. */
  @Prop() hideDuration = 250;

  /** The maximum width in pixels the tooltip can be before its content wraps. */
  @Prop() maxWidth = 350;

  /**
   * The preferred placement of the tooltip. Note that the actual placement may vary as needed to keep the tooltip
   * inside of the viewport.
   */
  @Prop() placement:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end' = 'top';

  /** The delay in ms before showing the tooltip. */
  @Prop() showDelay = 0;

  /** The duration in ms of the tooltip's show transition. */
  @Prop() showDuration = 275;

  /**
   * The events that cause a tooltip to show, separated by a space. Possible values include any combination of
   * `mouseenter`, `focus`, `click`, and `manual`. Use `manual` if you only want to show and hide the tooltip
   * programmatically.
   */
  @Prop() trigger = 'mouseenter focus';

  /**
   * A selector or element to use as the tooltip's target. This is the element that will trigger the tooltip to show
   * upon interaction. If no target is specified, the previous sibling element of the tooltip will be used. A common way
   * to link a tooltip to a target is to give the target an `id` and pass `#id` to the `target` prop.
   */
  @Prop() target: string | HTMLElement;

  @Watch('target')
  handleTargetChange() {
    this.tooltip.destroy();
    this.tooltip = tippy(this.getTarget());
    this.syncSettings();
  }

  /** Emitted when the tooltip begins to show. Calling `event.preventDefault()` will prevent it from being shown. */
  @Event() slShow: EventEmitter;

  /** Emitted after the tooltip has shown and all transitions are complete. */
  @Event() slAfterShow: EventEmitter;

  /** Emitted when the tooltip begins to hide. Calling `event.preventDefault()` will prevent it from being hidden. */
  @Event() slHide: EventEmitter;

  /** Emitted after the tooltip has hidden and all transitions are complete. */
  @Event() slAfterHide: EventEmitter;

  componentDidLoad() {
    this.tooltip = tippy(this.getTarget());
    this.host.shadowRoot.querySelector('slot').addEventListener('slotchange', this.syncSettings);
  }

  componentDidUpdate() {
    this.syncSettings();
  }

  componentDidUnload() {
    this.tooltip.destroy();
    this.host.shadowRoot.querySelector('slot').removeEventListener('slotchange', this.syncSettings);
  }

  /** Shows the tooltip. */
  @Method()
  async show() {
    this.tooltip.show();
  }

  /** Shows the tooltip. */
  @Method()
  async hide() {
    this.tooltip.hide();
  }

  getTarget() {
    if (typeof this.target === 'string' && this.target.length) {
      const target = document.querySelector(this.target);
      if (!target) {
        throw new Error('Invalid tooltip target: no element was returned by the specified selector.');
      }
      return target;
    } else if (this.target instanceof HTMLElement) {
      return this.target;
    } else {
      const target = this.host.previousElementSibling;
      if (!target) {
        throw new Error('Invalid tooltip target: no previous sibling element was found.');
      }
      return target;
    }
  }

  syncSettings() {
    this.tooltip.setProps({
      allowHTML: true,
      animation: 'fade',
      arrow: this.arrow,
      content: this.host.innerHTML,
      delay: [this.showDelay, this.hideDelay],
      distance: this.distance,
      duration: [this.showDuration, this.hideDuration],
      ignoreAttributes: true,
      maxWidth: this.maxWidth,
      placement: this.placement,
      trigger: this.trigger,

      onShow: () => {
        const slShow = this.slShow.emit();

        if (slShow.defaultPrevented) {
          return false;
        }
      },
      onShown: () => this.slAfterShow.emit(),
      onHide: () => {
        const slHide = this.slHide.emit();

        if (slHide.defaultPrevented) {
          return false;
        }
      },
      onHidden: () => this.slAfterHide.emit()
    });

    if (this.disabled) {
      this.tooltip.disable();
    } else {
      this.tooltip.enable();
    }
  }

  render() {
    return (
      <Host aria-hidden="true" hidden>
        <slot />
      </Host>
    );
  }
}
