import { html, LitElement, nothing, PropertyValues, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { emit } from '../../internal/event';
import resourceLocal from '../../internal/resourceLocal';
import { watchProps } from '../../internal/watchProps';
import { onEvent } from '../../utilities/common';
import { getResouceValue } from '../../utilities/getResouce';
import SlButton from '../button/button';
import '../icon/icon';
import '../select/select';
import styles from './page-btn.styles';

/**
 * @since 2.0
 * @status experimental
 *
 * @dependency sl-button,sl-select,sl-icon
 *
 * @event sl-page-change - Emitted when current page changed   .
 * @event sl-page-before-change - Emitted before  page changed,use can defaultPrevented ,then sl-page-change can not be emit    .
 *
 * @slot prefix The prefix slot.
 * @slot no-data - when total=0 to show .
 * @slot default - tool bar end to show .
 
 * @csspart base - The component's base wrapper.
 * @csspart pageWrap - The component's to page button  wrapper.
 *
 *
 */
@resourceLocal()
@customElement('sl-page-btn')
export default class SlPageBtn extends LitElement {
  static styles = styles;
  /** 当前页 */
  @property({ type: Number, reflect: true, attribute: 'value' }) value = 1;
  /** 分页大小 */
  @property({ type: Number, attribute: 'page-size', reflect: true }) pageSize = 20;
  /** 是否调整 分页大小 组件*/
  @property({ type: Boolean, attribute: 'show-size-change', reflect: true }) showSizeChange = false;

  /** 是否允许直接调整第几页 */
  @property({ type: Boolean, attribute: 'show-page-change', reflect: true }) showPageChange = false;

  /** 是否允许 简化分页模式 */
  @property({ type: Boolean }) simple = false;
  /**布局对齐方式 */
  @property({ type: String, attribute: 'align', reflect: true }) align: 'left' | 'right' | 'center' = 'right';

  /** 总数大小 */
  @property({ type: Number, attribute: 'total', reflect: true }) total: number;
  /** 支持调整的分页大小 */
  @property({ type: Array, attribute: false }) pageSizeOptions: Array<Number> = Array.from(
    { length: 10 },
    (_item, value) => 10 + value * 10
  );
  /** 是否显示 直接跳转到第一页 */
  @property({ type: Boolean, attribute: false}) showFirst = false;
  /** 是否显示 直接跳转到最后一页 */
  @property({ type: Boolean,attribute:false }) showLast = false;
  get pageCount() {
    return Math.ceil(this.total / this.pageSize);
  }

  @watchProps(['value', 'pageSize', 'total'])
  watchPageChange() {
    if (this.total < 0) {
      this.total = 0;
    }
    if (this.value > this.pageCount) {
      this.value = this.pageCount;
    }
    if (this.value <= 0) {
      this.value = 1;
    }
  }
  _renderSimple() {
    return html`<sl-input
        size="small"
        type="number"
        step="1"
        min="1"
        max=${this.pageCount}
        .value=${this.value + ''}
      ></sl-input
      ><span class="pageCountSpan">共${this.pageCount}页</span>`;
  }
  _renderPageButton() {
    const pageCount = this.pageCount;
    const current = this.value;
    let prev = current - 3;
    let size = 3;
    if (prev <= 1) {
      prev = 1;
      size = current - prev;
    }
    let next = current + (7 - size);
    if (next > pageCount) {
      next = pageCount;
    }
    if (next - prev < 7) {
      prev = next - 7;
      if (prev < 1) {
        prev = 1;
      }
    }
    const array = [];
    for (let i = prev; i <= next; i++) {
      array.push(i);
    }
    return html`${repeat(
      array,
      item =>
        html`<sl-button size="small" data-page-no=${item} .type=${this.value == item ? 'primary' : 'default'}
          >${item}</sl-button
        > `
    )}`;
  }

  _renderPage() {
    const result: Array<TemplateResult<1>> = [];
    result.push(this._renderPageButton());
    if (this.showPageChange) {
      result.push(this._renderSimple());
    }
    if (this.showSizeChange) {
      result.push(html`<sl-select size="small" .hoist=${true} part="show-size-change" .value=${this.pageSize + ''}>
        ${repeat(
          this.pageSizeOptions,
          (value, _index) => html`<sl-menu-item .value=${value + ''}>${value}条</sl-menu-item>`
        )}
      </sl-select>`);
    }
    return result;
  }
  private _eventDispose1: {
    dispose: () => void;
  };
  private _eventDispose2: {
    dispose: () => void;
  };
  firstUpdated(map: PropertyValues) {
    super.firstUpdated(map);
    let baseDiv = this.renderRoot.querySelector('div[part=base]') as HTMLElement;
    this._eventDispose1 = onEvent(baseDiv, 'sl-button[data-page-no]', 'click', async (event: MouseEvent) => {
      let pageNo = ((event as any).delegateTarget as SlButton).getAttribute('data-page-no');
      let tempNo = parseInt(pageNo as string, 10);
      if (isNaN(tempNo)) {
        this.goToPageByKey(pageNo as string);
      } else {
        this.goToPage(tempNo);
      }
      this._eventDispose2 = onEvent(
        baseDiv,
        'sl-input,sl-select[part=show-size-change]',
        'sl-change',
        (event: Event) => {
          let el = (event as any).delegateTarget as HTMLElement;
          const beforeEvent=emit(this,'sl-page-before-change');
          if(!beforeEvent.defaultPrevented){
            if (el.matches('sl-select[part=show-size-change]')) {
              this.pageSize = Number((el as any).value);
            } else {
                this.watchPageChange();
                let value = (el as any).value;
                if (isNaN(value)) {
                  value = 1;
                }
                value = Number(value);
                if (value > this.pageCount) {
                  value = this.pageCount;
                }
                (el as any).value = value;
                this.value = value;
            }
            emit(this, 'sl-page-change', {
              detail: { value: this.value }
            });
          }
        }
      );
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this._eventDispose1?.dispose();
    this._eventDispose2?.dispose();
  }
  private goToPageByKey(pageKey: string) {
    let result = 1;
    pageKey = pageKey.toLowerCase();
    switch (pageKey) {
      case 'first':
        result = 1;
        break;
      case 'prev':
        result = this.value - 1;
        break;
      case 'next':
        result = this.value + 1;
        break;
      case 'last':
        result = this.pageCount;
        break;
      default:
        result = this.value;
    }
    this.goToPage(result);
  }
  goToPage(pageNo: number) {
    const event=emit(this,'sl-page-before-change');
    if(!event.defaultPrevented){
      if (!isNaN(pageNo)) {
        let tempValue = pageNo;
        if (tempValue <= 0) {
          tempValue = 1;
        } else if (tempValue > this.pageCount) {
          tempValue = this.pageCount;
        }
        this.value = tempValue;
        emit(this, 'sl-page-change', {
          detail: { value: this.value }
        });
      }
    }
  }

  render() {
    return html`<div part="base" page-align=${this.align}>
      <slot name="prefix"></slot>
      ${this.total == 0
        ? html`<div part="no-data"><slot name="no-data">${getResouceValue('noData')}</slot></div>`
        : html`
            ${this.showFirst
              ? html`<sl-tooltip content="${getResouceValue('pageBtn.first')}"
                  ><sl-button size="small" ?disabled=${this.value == 1} data-page-no="first" type="text"
                    ><sl-icon part="first" name="chevron-bar-left"></sl-icon></sl-button
                ></sl-tooltip>`
              : nothing}
            <sl-tooltip content="${getResouceValue('pageBtn.prev')}">
              <sl-button ?disabled=${this.value == 1} data-page-no="prev" size="small" left type="text"
                ><sl-icon part="prev" name="chevron-left" ?disabled=${this.value <= 1}></sl-icon></sl-button
            ></sl-tooltip>
            <div part="pageWrap">${this.simple ? this._renderSimple() : this._renderPage()}</div>
            <sl-tooltip content="${getResouceValue('pageBtn.next')}"
              ><sl-button
                size="small"
                ?disabled=${this.value + 1 > this.pageCount}
                data-page-no="next"
                right
                type="text"
                ><sl-icon part="next" name="chevron-right" ?disabled=${this.value <= 1}></sl-icon></sl-button
            ></sl-tooltip>
            ${this.showLast
              ? html`<sl-tooltip content="${getResouceValue('pageBtn.last')}"
                  ><sl-button size="small" ?disabled=${this.value == this.pageCount} data-page-no="last" type="text"
                    ><sl-icon part="part" name="chevron-bar-right"></sl-icon></sl-button
                ></sl-tooltip>`
              : nothing}
          `}
      <slot></slot>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-page-btn': SlPageBtn;
  }
}
