import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../icon/icon';
import { emit } from '../../internal/event';
import styles from './ac-panel.styles';
import SlCollapse from '../collapse/collapse';
import { animateTo } from '../../internal/animate';
const fadeIn = [
  { opacity: '0' ,scale:0},
  { opacity: '1',scale:1 }
];
const fadeOut = [
  {  opacity: '1' ,scale:1},
  {  opacity: '0' ,scale:0}
];
const duration=160;
/**
 * @since 2.0
 * @status experimental
 * @dependency  sl-collapse
 *
 * @slot - The content slot.
 * @slot header-extra - header-extra slot ,use for header right icon
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
  @property({ type: String, reflect: true }) key: string ;
  @property({ type: String, reflect: true }) header: string;
  renderHeader() {
    return html`<header class='ac-tab-header' part='header'  @click=${this._clickHeader}  >
      <sl-icon library="system"  exportparts="base:trigger-icon" name='${this.active ? 'chevron-down' : 'chevron-right'}'></sl-icon>
      <slot name='header'> <span part='header-span'>${this.header}&nbsp;</span></slot>
      <slot name='header-extra'></slot>
</header>`;
}

get collapsePane(): SlCollapse|null{
   return this.closest('sl-collapse');
}
private async _clickHeader(_e: Event) {
  const tab = this;
  const panel = this.collapsePane;
  if (panel) {
     let  event =emit(panel,'sl-before-tab-change',{
        cancelable:true
     });
     if(!event.defaultPrevented){
       await  animateTo(this.contentElement,this.active?fadeOut:fadeIn,{
          duration:duration,
          easing:this.active?'ease-out':'ease-in'
        })
            panel.setTabToActive(tab, !tab.active);
            emit(panel,'tab-change',{
              detail:{
                tab:tab
              }
            })
        
        
    }
  }
}
get contentElement():HTMLElement{
  return this.renderRoot.querySelector('div[part=content]') as HTMLElement;
}
  render() {
    return html`<div part='base'>
      ${this.renderHeader()}
      <div part='content'  class='${!this.active ? 'close' : ''}'><slot></slot></div>
  </div>`;
  }
}


declare global {
  interface HTMLElementTagNameMap {
    'sl-ac-panel': SlAcPanel;
  }
}
