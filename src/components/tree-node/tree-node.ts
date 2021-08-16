import { html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { cache } from 'lit/directives/cache.js';
import { animateTo, shimKeyframesHeightAuto } from '../../internal/animate';
import { customStyle } from '../../internal/customStyle';
import { emit } from '../../internal/event';
import { watch } from '../../internal/watch';
import { getCssValue } from '../../utilities/common';
import '../../components/icon/icon';
import SlTree from '../tree/tree';
import styles from './tree-node.styles';

const animate_show = [{ height: 0 }, { height: 'auto' }];
/**
 * 隐藏动画
 */
const animate_hide = [{ height: 'auto' }, { height: 0 }];
export type TreeNodeData = {
  id?: string | number /* ID  */;
  parentID?: string | number /** 父节点ID**/;
  name?: string /*节点名称*/;
  icon?: string /*节点图标 */;
  close?: boolean /* 是否关闭 */;
  closeable?: boolean /*false,表示节点不能折叠起来 */;

  [key: string]: unknown /*自定义属性 */;
  children?: TreeNodeData[] /*下级节点 */;
  _parent?: TreeNodeData; //上级节点，内部使用
};

export interface NodeRenderInterface {
  (data: TreeNodeData): TemplateResult<1>;
}
/* 默认树节点渲染器*/
const defaultNodeRender: NodeRenderInterface = (data: TreeNodeData) => {
  return html`${data == null ? '' : data.name}`;
};

/**
 * 判断数据parent 是否包含了findChild
 * @param parent: TreeNodeData
 * @param findChild: TreeNodeData
 */
export const containsNodeData = (parent: TreeNodeData, findChild: TreeNodeData) => {
  const iteratorFun = (temp: TreeNodeData, child: TreeNodeData) => {
    if (temp == child) {
      return true;
    }
    const children = temp.children;
    if (children) {
      for (let k of children) {
        if (iteratorFun(k, child)) {
          return true;
        }
      }
    }
    return false;
  };
  if (parent == findChild) {
    return false;
  }
  return iteratorFun(parent, findChild);
};
export enum NODE_VISTOR_RESULT {
  EXIST = 1 /**标识遍历到此节点退出 */,
  CONTINUE = 2 /** 标识不在遍历后续的兄弟节点 */
}
export interface NodeVistor {
  (node: TreeNodeData): NODE_VISTOR_RESULT | unknown;
}
/**
 * 遍历 TreeNodeData
 * @param data
 * @param callback
 */
export const iteratorNodeData = (data: TreeNodeData, callback: NodeVistor) => {
  let result = callback(data);
  if (result == NODE_VISTOR_RESULT.EXIST) {
    return;
  } else {
    const children = data.children;
    if (children) {
      label: for (let k of children) {
        result = iteratorNodeData(k, callback);
        if (result == NODE_VISTOR_RESULT.CONTINUE) {
          continue label;
        } else if (result == NODE_VISTOR_RESULT.EXIST) {
          return;
        }
      }
    }
  }
};

/**
 * @since 2.0
 * @status experimental
 *
 * @dependency sl-icon
 *
 * @event {{detail:TreeNodeData}} sl-node-click - Emitted when node name click.
 * @event {{detail:TreeNodeData}} sl-node-before-open - Emitted before node open .
 * @event {{detail:TreeNodeData}} sl-node-before-close - Emitted before node close .
 * @event {{detail:TreeNodeData}} sl-node-before-toogle - Emitted before node state change :open or close.
 * @event {{detail:TreeNodeData}} sl-node-close - Emitted after node state close.
 * @event {{detail:TreeNodeData}} sl-node-open - Emitted after node state opened.
 * @event {{detail:TreeNodeData}} sl-node-toogle - Emitted when node state toogle.
 * 
 *
 *

 *
 * @csspart base - The component's base wrapper.
 * @csspart node - The component's node self wrapper.
 * @csspart children - The component's children wrapper.
 * @csspart node_toogle_icon - The component's toogle icon.
 * @csspart node_toogle_icon - The component's toogle icon.
 * @csspart node-span - The component's node render wrapper .
 *
 * @cssproperty --example - An example CSS custom property.
 */
@customStyle()
@customElement('sl-tree-node')
export default class SlTreeNode extends LitElement {
  static styles = styles;

  /**
   * 节点数据源
   */
  @property({ type: Object })
  nodeData?: TreeNodeData;

  @watch('nodeData')
  _watchOnSetNodeData() {
    if (this.nodeData) {
      //默认关闭
      if (typeof this.nodeData.close == 'undefined') {
        this.nodeData.close = true;
      }
      //默认允许关闭
      if (typeof this.nodeData.closeable == 'undefined') {
        this.nodeData.closeable = true;
      }
    }
  }
  /**
   * 绑定树对象
   */
  @property({ type: Object })
  tree?: SlTree;

  /**
   * 树节点渲染器
   */
  @property({ type: Object })
  nodeRender: NodeRenderInterface = defaultNodeRender;

  private renderChildren() {
    return html`${cache(
      !this.isClose && this.nodeData?.children
        ? this.nodeData.children.map(data => {
            return html`<sl-tree-node
              .nodeData=${data}
              .nodeRender=${this.nodeRender}
              .tree=${this.tree}
            ></sl-tree-node>`;
          })
        : ''
    )}`;
  }
  get subChildSize() {
    return this.nodeData && this.nodeData.children ? this.nodeData.children.length : 0;
  }
  get isClose() {
    return this.nodeData && this.nodeData.close;
  }
  render() {
    if (!this.nodeData) {
      return nothing;
    }
    return html`<div part="base">
      <div part="node">${this.renderNodeData()}</div>
      <div part="children" class="${this.isClose ? 'close' : 'open'}">${this.renderChildren()}</div>
    </div>`;
  }
  @query('div[part=children]', true)
  private childTreeNodeElement: HTMLElement;
  private async _clickTrigerHander(_event: Event) {
    if (this.subChildSize > 0) {
      let isClosed = this.nodeData?.close;
      let custEvent = emit(this, `sl-node-before-${isClosed ? 'open' : 'close'}`, {
        detail: this.nodeData
      });
      let custToogleEvent = emit(this, `sl-node-before-toogle`, {
        detail: this.nodeData
      });
      if (!custEvent.defaultPrevented && !custToogleEvent.defaultPrevented) {
        this.setNodeData('close', !this.nodeData?.close);
        await this.updateComplete;
        this.childTreeNodeElement.style.display = 'block';
        const height = parseInt(getCssValue(this.childTreeNodeElement, 'height'));
        await animateTo(
          this.childTreeNodeElement,
          shimKeyframesHeightAuto(isClosed ? animate_show : animate_hide, height),
          {
            duration: 120,
            easing: 'ease'
          }
        );
        this.childTreeNodeElement.style.removeProperty('display');
        emit(this, `sl-node-${isClosed ? 'open' : 'close'}`, {
          detail: this.nodeData
        });
        emit(this, `sl-node-toogle`, {
          detail: this.nodeData
        });
      }
    }
  }
  static NODE_OPEN_ICON = 'caret-down-fill';
  static NODE_CLOSE_ICON = 'caret-right';
  private renderNodeData() {
    const result = [];
    if (this.nodeData) {
      if (this.nodeData.closeable) {
        result.push(html`<sl-icon
          @click=${this._clickTrigerHander}
          part="node_toogle_icon"
          class="trigger-status"
          ?empty=${this.subChildSize === 0}
          .name=${this.isClose ? SlTreeNode.NODE_CLOSE_ICON : SlTreeNode.NODE_OPEN_ICON}
        >
        </sl-icon>`);
      }
      if (this.nodeData.icon) {
        result.push(
          html`<sl-icon class="node-icon" part="node-icon" name=${this.nodeData.icon} library="system"> </sl-icon>`
        );
      }
      result.push(html`<div part="node-span" @click=${this._clickNodeHandler}>${this.nodeRender(this.nodeData)}</div>`);
    }
    return result;
  }
  private _clickNodeHandler() {
    emit(this, 'sl-node-click', {
      detail: this.nodeData
    });
  }
  /**
   * 设置节点nodeData 的属性，同时触发DOM更新
   * @param key 属性
   * @param value  值
   */
  public setNodeData(key: string, value: unknown) {
    (this.nodeData as any)[key] = value;
    this.requestUpdate();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-tree-node': SlTreeNode;
  }
}
