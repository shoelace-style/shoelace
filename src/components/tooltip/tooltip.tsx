import { Component, Element, Event, EventEmitter, Host, Method, Prop, State, Watch, h } from '@stencil/core';
import Popover from '../../utilities/popover';

/**
 * @since 1.0.0
 * @status experimental
 *
 * @slot - The tooltip's content.
 */

@Component({
  tag: 'sl-tooltip',
  styleUrl: 'tooltip.scss',
  shadow: true
})
export class Tooltip {
  popover: Popover;
  target: HTMLElement;
  tooltip: any;

  constructor() {
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);

    this.syncSettings = this.syncSettings.bind(this);
  }

  @Element() host: HTMLSlTooltipElement;

  /** The tooltip's content. */
  @Prop() content = '';

  /** Set to true to disable the tooltip so it won't show when triggered. */
  @Prop() disabled = false;

  /** The distance in pixels from which to offset the tooltip away from its target. */
  @Prop() distance = 10;

  /** The distance in pixels from which to offset the tooltip along its target. */
  @Prop() skidding = 0;

  /** The delay in ms before the tooltip hides. */
  @Prop() hideDelay = 0;

  /** The duration in ms of the tooltip's hide transition. */
  @Prop() hideDuration = 250;

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

  /** Emitted when the tooltip begins to show. Calling `event.preventDefault()` will prevent it from being shown. */
  @Event() slShow: EventEmitter;

  /** Emitted after the tooltip has shown and all transitions are complete. */
  @Event() slAfterShow: EventEmitter;

  /** Emitted when the tooltip begins to hide. Calling `event.preventDefault()` will prevent it from being hidden. */
  @Event() slHide: EventEmitter;

  /** Emitted after the tooltip has hidden and all transitions are complete. */
  @Event() slAfterHide: EventEmitter;

  componentDidLoad() {
    this.target = this.getTarget();

    this.popover = new Popover(this.target, this.tooltip, {
      placement: this.placement,
      offset: [this.skidding, this.distance],
      onAfterHide: () => this.slAfterHide.emit(),
      onAfterShow: () => this.slAfterShow.emit()
    });

    this.host.shadowRoot.querySelector('slot').addEventListener('slotchange', this.syncSettings);
  }

  componentDidUpdate() {
    this.syncSettings();
  }

  componentDidUnload() {
    this.popover.destroy();
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
    const target = this.host.querySelector('*:not(style)') as HTMLElement;
    if (!target) {
      throw new Error('Invalid tooltip target: no child element was found.');
    }

    return target;
  }

  handleMouseOver() {
    this.popover.show();
  }

  handleMouseOut() {
    this.popover.hide();
  }

  syncSettings() {
    this.target = this.getTarget();

    // this.tooltip.setProps({
    //   allowHTML: true,
    //   animation: 'fade',
    //   arrow: this.arrow,
    //   content: this.host.innerHTML,
    //   delay: [this.showDelay, this.hideDelay],
    //   distance: this.distance,
    //   duration: [this.showDuration, this.hideDuration],
    //   ignoreAttributes: true,
    //   maxWidth: this.maxWidth,
    //   placement: this.placement,
    //   trigger: this.trigger,
    //   onShow: () => {
    //     const slShow = this.slShow.emit();
    //     if (slShow.defaultPrevented) {
    //       return false;
    //     }
    //   },
    //   onShown: () => this.slAfterShow.emit(),
    //   onHide: () => {
    //     const slHide = this.slHide.emit();
    //     if (slHide.defaultPrevented) {
    //       return false;
    //     }
    //   },
    //   onHidden: () => this.slAfterHide.emit()
    // });
    // if (this.disabled) {
    //   this.tooltip.disable();
    // } else {
    //   this.tooltip.enable();
    // }
  }

  render() {
    return (
      <Host onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
        <slot />

        <div ref={el => (this.tooltip = el)} class="sl-tooltip" hidden>
          {this.content}
        </div>
      </Host>
    );
  }
}
