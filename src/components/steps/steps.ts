import { html, LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { customStyle } from '../../internal/customStyle';
import { emit } from '../../internal/event';
import '../icon/icon';
import SlStep from '../step/step';
import styles from './steps.styles';

/**
 * @since 2.0
 * @status experimental
 *
 * @dependency sl-step,sl-icon
 *
 * @event sl-change - Emitted as current step change.
 *
 * @slot - The default slot accept <sl-step> chilldrens.
 *
 * @csspart container - The component's container wrapper.
 *
 * @cssproperty --example - An example CSS custom property.
 */
@customElement('sl-steps')
@customStyle()
export default class SlSteps extends LitElement {
  static styles = styles;

  /**
   * 当前步骤，默认从0
   */
  @property({ type: Number, reflect: true }) current: number = 0;
  /**
   * 是否为竖直
   */
  @property({ type: Boolean, reflect: true }) vertical = false;
  /**
   * 起始节点显示 序号，默认为1
   */
  @property({ type: Number, reflect: true }) startIndex: number = 1;
  /**
   *  进度点 圆圈大小
   */
  @property({ type: String, reflect: true }) size: 'small' | 'mid' | 'larger';

  firstUpdated(_changedProperties: Map<string | number | symbol, unknown>) {
    super.firstUpdated(_changedProperties);
    const slotItem = this.renderRoot.querySelector('#slot') as HTMLSlotElement;
    slotItem.addEventListener('slotchange', () => {
      this._setChildStepCss();
    });
  }
  private _setChildStepCss() {
    const childItems = this.childStep;
    const length = childItems.length;
    childItems.forEach((item: SlStep, index: number) => {
      if (index === 0) {
        item.setAttribute('first', '');
      } else {
        item.removeAttribute('first');
      }
      if (index === this.current) {
        item.setAttribute('current', '');
      } else {
        item.removeAttribute('current');
      }
      if (index < this.current) {
        item.setAttribute('finished', '');
      } else {
        item.removeAttribute('finished');
      }
      item.index = this.startIndex + index;
      if (index === length - 1) {
        item.setAttribute('last', '');
      } else {
        item.removeAttribute('last');
      }
      if (this.vertical) {
        item.setAttribute('direction', 'vertical');
      } else {
        item.removeAttribute('direction');
      }
    });
  }
  updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);
    if (this.hasUpdated) {
      if (_changedProperties.has('vertical') || _changedProperties.has('current')) {
        this._setChildStepCss();
        if (_changedProperties.has('current')) {
          emit(this, 'sl-change', { detail: this.current });
        }
      }
    }
  }
  get childStep(): Array<SlStep> {
    const children = Array.from(this.children);
    return children.filter(item => {
      return item.tagName.toLowerCase() == 'sl-step';
    }) as Array<SlStep>;
  }
  render() {
    return html`<div part="container">
      <slot id="slot"></slot>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-steps': SlSteps;
  }
}
