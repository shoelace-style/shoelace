import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { emit } from '../../internal/event';
import { animateCss, getOffset } from '../../utilities/common';
import styles from './ripple.styles';

/**
 * @since 2.0
 * @status experimental
 *
 *
 *
 * @event sl-ripple-end - Emitted when ripple effect end
 *
 * @slot - The default slot wrap node for ripplie effect.
 *
 *
 * @cssproperty --sl-ripple-color - An ripple animate background color
 */
@customElement('sl-ripple')
export default class SlRipple extends LitElement {
  static styles = styles;

  /** disable animate. */
  @property({ type: Boolean }) disabled = false;

  render() {
    return html`<slot></slot>
      <div class="ripple" part="ripple"></div> `;
  }

  firstUpdated() {
    this.addEventListener('click', async (e: MouseEvent) => {
      if (this.disabled) {
        return;
      }
      const offset = getOffset(this);
      const touchStartX = e.pageX;
      const touchStartY = e.pageY;
      const height = this.clientHeight;
      const width = this.clientWidth;
      const center = {
        x: touchStartX - offset.left,
        y: touchStartY - offset.top
      };
      const ripple = this.renderRoot.querySelector('div.ripple') as HTMLElement;
      ripple.classList.remove('show');
      const diameter = Math.round(Math.max(Math.pow(Math.pow(height, 2) + Math.pow(width, 2), 0.5), 48));
      //  const target=e.target as HTMLElement;
      //  const borderRadius= getCssValue(target,'border-top-left-radius')
      //          + ' ' +getCssValue(target,'border-top-right-radius')
      //          + ' ' +getCssValue(target,'border-bottom-right-radius')
      //          + ' ' +getCssValue(target,'border-bottom-left-radius');

      //    // 涟漪扩散动画
      // const translate =
      //           `translate3d(${-center.x + width / 2}px,` +
      //         `${-center.y + height / 2}px, 0) scale(1)`;
      ripple.setAttribute(
        'style',
        `width:${diameter}px;height:${diameter}px;` +
          `margin-top:-${diameter / 2}px;margin-left:-${diameter / 2}px;` +
          `left:${center.x}px;top:${center.y}px;`
      );
      animateCss(ripple, 'show').then(() => {
        // ripple.setAttribute('style','');
        ripple.classList.remove('show');
        emit(this, 'sl-ripple-end');
      });
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-ripple': SlRipple;
  }
}
