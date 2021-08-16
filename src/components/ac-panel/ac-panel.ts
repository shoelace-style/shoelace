import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../icon/icon';
import { emit } from '../../internal/event';
import styles from './ac-panel.styles';
import SlCollapse from '../collapse/collapse';
import { animateTo, animate_hide, animate_show, shimKeyframesHeightAuto } from '../../internal/animate';
import { getCssValue } from '../../utilities/common';

const duration = 120;
/**
 * @since 2.0
 * @status experimental
 * @dependency  sl-collapse
 *
 * @slot - The content slot.
 * @slot header-extra - header-extra slot ,use for header right icon
 * @slot trigger-icon - slot used  before title
 * @slot header - header title slot
 *
 * @csspart base - The component's base wrapper.
 * @csspart trigger-icon - The header icon part.
 * @csspart content - The component content div.
 *
 * @cssproperty --ac-tab-active-background-color - header active background-color.
 * @cssproperty --ac-header-color - header font color.
 * @cssproperty --ac-header-font-size - header font size.
 * @cssproperty --ac-header-padding - header padding.
 * @cssproperty --ac-content-padding - the component content  container padding.
 */
@customElement('sl-ac-panel')
export default class SlAcPanel extends LitElement {
  static styles = styles;
  @property({ type: Boolean, reflect: true }) active = false;
  @property({ type: String, reflect: true }) key: string;
  @property({ type: String, reflect: true }) header: string;
  renderHeader() {
    return html`<header class="ac-tab-header" part="header" @click=${this._clickHeader}>
      <slot name="trigger-icon"
        ><sl-icon
          library="system"
          exportparts="base:trigger-icon"
          name="${this.active ? 'chevron-down' : 'chevron-right'}"
        ></sl-icon
      ></slot>
      <slot name="header"> <span part="header-span">${this.header}&nbsp;</span></slot>
      <slot name="header-extra"></slot>
    </header>`;
  }
  render() {
    return html`<div part="base">
      ${this.renderHeader()}
      <div part="content" class="${!this.active ? 'close' : ''}"><slot></slot></div>
    </div>`;
  }
  get collapsePane(): SlCollapse | null {
    return this.closest('sl-collapse');
  }
  private async _clickHeader(_e: Event) {
    const tab = this;
    const panel = this.collapsePane;
    if (panel) {
      const event = emit(panel, 'sl-before-tab-change', {
        cancelable: true
      });
      if (!event.defaultPrevented) {
        panel.setTabToActive(tab, !tab.active);
        await panel.updateComplete;
        this.contentElement.style.display = 'block';
        const currentHeight = parseInt(getCssValue(this.contentElement, 'height'));
        await animateTo(
          this.contentElement,
          shimKeyframesHeightAuto(this.active ? animate_show : animate_hide, currentHeight),
          {
            duration: duration,
            easing: 'ease'
          }
        );
        this.contentElement.style.removeProperty('display');
        emit(panel, 'tab-change', {
          detail: {
            tab: tab
          }
        });
      }
    }
  }
  get contentElement(): HTMLElement {
    return this.renderRoot.querySelector('div[part=content]') as HTMLElement;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-ac-panel': SlAcPanel;
  }
}
