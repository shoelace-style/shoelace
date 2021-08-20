import { html, LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { emit } from '../../internal/event';
import { watch } from '../../internal/watch';
import { getCssValue } from '../../utilities/common';
import { dragHandler } from '../../utilities/dragHelper';
import styles from './splitter.styles';

/**
 * @since 2.0
 * @status experimental
 *
 *
 *
 * @event {{oldType:string,newType:string}} sl-split-type-change - Emitted when splitType change.
 *
 * @slot - The default slot.
 * @slot  exta - 需要被拖动的小部分容器.
 *
 * @csspart base - The component's base wrapper.
 * @csspart exta - The component's base exta wrapper.
 * @csspart main - The component's base main wrapper.
 *
 * @cssproperty --sl-split-width - spit div width.
 * @cssproperty --sl-split-hover-color- spit div hover color.
 */
@customElement('sl-splitter')
export default class SlSplitter extends LitElement {
  static styles = styles;

  /** Split 切割位置. */
  @property({ type: String, attribute: true }) splitType: 'left' | 'right' | 'top' | 'bottom' = 'left';
  /** 是否允许拖动改变位置 */
  @property({ type: Boolean, attribute: 'split-able' }) splitAble = true;
  /**分隔允许的最小位置  */
  @property({ type: Number, attribute: 'min-size', reflect: true }) minSize?: number;
  @property({ type: Number, attribute: 'max-size', reflect: true }) maxSize?: number;

  /**整体是否显示边框  */
  @property({ type: Boolean, attribute: true }) border: boolean = true;

  @watch('splitType', { waitUntilFirstUpdate: true })
  changeSplitType(old: string, newType: string) {
    const exta = this.renderRoot.querySelector('div[part=exta]') as HTMLElement;
    if (exta) {
      if ((old == 'left' || old == 'right') && (newType == 'top' || newType == 'bottom')) {
        exta.style.flexBasis = 'auto';
      }
      if ((newType == 'left' || newType == 'right') && (old == 'top' || old == 'bottom')) {
        exta.style.flexBasis = 'auto';
      }
    }
    emit(this, 'sl-split-type-change', {
      detail: {
        oldType: old,
        newType: newType
      }
    });
  }

  firstUpdated(map: PropertyValues) {
    super.firstUpdated(map);
    const spliter = this.renderRoot.querySelector('div[part=spliter]') as HTMLElement;
    const exta = this.renderRoot.querySelector('div[part=exta]') as HTMLElement;
    const base = this.renderRoot.querySelector('div[part=base]') as HTMLElement;
    dragHandler(spliter, change => {
      if (!this.splitAble) {
        return;
      }
      let baseWidth = parseInt(getCssValue(base, 'width'));
      let baseheight = parseInt(getCssValue(base, 'height'));
      let type = this.splitType;
      let value: number;
      let width: number;
      let height: number;
      switch (type) {
        case 'left':
          width = parseInt(getCssValue(exta, 'width'));
          value = width + change.x;
          if (value > baseWidth) {
            value = baseWidth - 10;
          }
          break;
        case 'right':
          width = parseInt(getCssValue(exta, 'width'));
          value = width - change.x;
          if (value > baseWidth) {
            value = baseWidth - 10;
          }
          break;
        case 'top':
          height = parseInt(getCssValue(exta, 'height'));
          value = height + change.y;
          if (value > baseheight) {
            value = baseheight - 10;
          }
          break;
        case 'bottom':
          height = parseInt(getCssValue(exta, 'height'));
          value = height - change.y;
          if (value > baseheight) {
            value = baseheight - 10;
          }
          break;
      }
      if (this.minSize && value < this.minSize) {
        value = this.minSize;
      }
      if (this.maxSize && value > this.maxSize) {
        value = this.maxSize;
      }
      exta.style.flexBasis = value + 'px';
      emit(this, 'sl-splitter-change', {
        detail: {
          size: value
        }
      });
    });
  }
  render() {
    return html`<div part="base" class="base" type=${this.splitType}>
      <div part="exta">
        <slot name="exta"></slot>
      </div>
      <div part="spliter"></div>
      <div part="main"><slot></slot></div>
    </div> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-splitter': SlSplitter;
  }
}
