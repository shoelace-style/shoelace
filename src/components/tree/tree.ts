import { html, LitElement, nothing, PropertyValues } from 'lit';
import { classMap } from 'lit-html/directives/class-map';
import { customElement, property, state } from 'lit/decorators.js';
import { emit } from '../../internal/event';
import { hasSlot } from '../../internal/slot';
import { debounce } from '../../internal/throttle';
import { watchProps } from '../../internal/watchProps';
import { onEvent } from '../../utilities/common';
import SlTreeNode from '../tree-node/tree-node';
import {
  cloneTreeNodeData,
  DEFAULT_TREE_FILTER,
  DEFAULT_TREE_NODE_RENDER,
  iteratorNodeData,
  TreeNodeData
} from '../tree-node/tree-node-util';
import styles from './tree.styles';

/**
 * @since 2.0
 * @status experimental
 *
 * @dependency
 *
 * @event sl-tree-node-click - Emitted when tree-node-click.
 * @event sl-tree-node-toogle - Emitted when tree-node-state changed.
 * @event sl-tree-node-before-toogle - Emitted before tree-node-state change.
 * @event sl-tree-node-open - Emitted when tree-node-state change to opened.
 * @event sl-tree-node-close - Emitted when tree-node-state change closed.
 * @event sl-tree-node-before-open - Emitted before tree-node-state to open.
 * @event sl-tree-node-before-close - Emitted before tree-node-state to close.
 *
 *
 * @slot no-data - slot:when no tree has no data  or rootNodeData is undefined.
 * @slot loading - slot:when tree loading=true
 *
 * @csspart base - The tree's base wrapper.
 *
 * @cssproperty --example - An example CSS custom property.
 */
@customElement('sl-tree')
export default class SlTree extends LitElement {
  static styles = styles;

  /** tree 选中方式 selectMode：支持的值为：check, radio,none 或者 默认（none,表示不支持选中) */
  @property({ reflect: true }) selectMode: 'check' | 'radio' | 'default' | 'none' = 'default';

  /** 选中的节点，是否高亮显示 */
  @property({ reflect: true, attribute: 'select_highlight', type: Boolean }) select_highlight = false;

  /** 是否显示根节点 */
  @property({ reflect: true, attribute: 'include_root', type: Boolean }) includeRoot = true;

  /** 设置是加载状态 */
  @property({ reflect: true, attribute: 'loading', type: Boolean }) loading = false;

  /** 树已经选中的节点，如果是多选，则为选中节点的ID值组成的数组，否则为选中节点的ID */
  @property({ reflect: true, attribute: false }) checkedKeys?: unknown | Array<unknown>;

  /** 树节点过滤 参数，当支持过滤时启用*/
  @property({ attribute: false }) filterString: string | string[] = '';

  /** 树内置过滤input 的placeHolder*/
  @property({ attribute: 'filter-input-placeholder' }) filterInputPlaceholder = '';
  /** 当支持过滤是， 节点过滤函数，接收TreeNodeData, 和 所有的其他参数，true,则节点满足过滤条件 */
  @property({ attribute: false }) filterMethod = DEFAULT_TREE_FILTER;

  /** 是否支持过滤 */
  @property({ reflect: true, attribute: 'enable-filter', type: Boolean }) enableFilter = false;

  /** 数据ID属性，用于内置选中节点 */
  @property({ attribute: false }) nodeIDProperty = 'id';

  /** 节点渲染函数 */
  @property({ attribute: false }) nodeRender = DEFAULT_TREE_NODE_RENDER;

  /** 根节点数据源 */
  @property({ type: Object, attribute: false })
  rootNodeData?: TreeNodeData;

  /** 实际渲染的节点数据 */
  @state()
  renderRootNodeData?: TreeNodeData;

  /** 存储过滤后的 节点数据的映射关系 ，key:过滤后的节点，value:原始的节点 */
  @state()
  nodeCacheMap?: WeakMap<TreeNodeData, TreeNodeData>;

  /** 存储过滤后的 节点数据的映射关系 ，key:原始数据，value:过滤后产生的数据 */
  @state()
  nodeFilterCacheMap?: WeakMap<TreeNodeData, TreeNodeData>;

  /** 存储 过滤后真实匹配的TreeNodeData */
  @state()
  hightLightNodeSet?: Set<TreeNodeData>;

  @state()
  real_treeNodeRender = this.nodeRender;
  //  @watchProps(['nodeRender','selectMode','filter','filterString','filterMethod','rootNodeData'])

  /** 实现树内部过滤逻辑 */
  @watchProps(['filter', 'filterString', 'filterMethod', 'rootNodeData'])
  doFilter() {
    const rootNodeData = this.rootNodeData;
    const treeEl = this;
    if (rootNodeData && this.filterMethod && this.enableFilter) {
      const filterArray = Array.isArray(this.filterString) ? this.filterString : [this.filterString];
      const matchNodeSet = new Set<TreeNodeData>();
      const hightLightNodeSet = (this.hightLightNodeSet = new Set<TreeNodeData>());
      const nodeVistor = (tempData: TreeNodeData, _parentNode: TreeNodeData) => {
        (tempData as any)[parentSymobl] = _parentNode; //给每一节点父节点给值。
        const match = this.filterMethod.apply(treeEl, [tempData, ...filterArray]);
        //过滤函数 绑定上下文为：当前树SLTree
        if (match) {
          hightLightNodeSet.add(tempData);
          matchNodeSet.add(tempData);
          if (_parentNode) {
            let tempParent = _parentNode; //
            while (tempParent && !matchNodeSet.has(tempParent)) {
              matchNodeSet.add(tempParent);
              console.log(tempParent.value);
              tempParent = (tempParent as any)[parentSymobl];
            }
          }
        }
      };
      iteratorNodeData(rootNodeData, nodeVistor);
      const cloneRootData = cloneTreeNodeData(rootNodeData);
      const nodeCacheMap = (this.nodeCacheMap = new WeakMap());
      nodeCacheMap.set(cloneRootData, rootNodeData);
      const nodeFilterCacheMap = (this.nodeFilterCacheMap = new WeakMap());
      nodeFilterCacheMap.set(rootNodeData, cloneRootData);
      const nodeVistor2 = (tempData: TreeNodeData, _parentNode: TreeNodeData) => {
        const newData = cloneTreeNodeData(tempData);
        nodeCacheMap.set(newData, tempData);
        nodeFilterCacheMap.set(tempData, newData);
        if (matchNodeSet.has(tempData)) {
          nodeFilterCacheMap.get(_parentNode)?.children?.push(newData);
        }
      };
      if (rootNodeData.children) {
        for (let k of rootNodeData.children) {
          iteratorNodeData(k, nodeVistor2, rootNodeData);
        }
      }
      if (matchNodeSet.size > 0) {
        this.renderRootNodeData = cloneRootData;
      } else {
        this.renderRootNodeData = undefined;
      }
    } else {
      if (this.rootNodeData) {
        const nodeVistor = (tempData: TreeNodeData, _parentNode: TreeNodeData) => {
          (tempData as any)[parentSymobl] = _parentNode; //给每一节点父节点给值。
        };
        iteratorNodeData(this.rootNodeData, nodeVistor);
      }
      this.renderRootNodeData = this.rootNodeData;
    }
  }
  /**
   * 获取上级数据源对象
   * @data :数据对象
   */
  public getParentNodeData(data: TreeNodeData) {
    return (data as any)[parentSymobl] as TreeNodeData;
  }

  private renderAllTreeNode() {
    if (!this.renderRootNodeData) {
      return html`<slot name="no-data"></slot>`;
    } else {
      if (this.includeRoot) {
        return this.renderNodeDataTemplate(this.renderRootNodeData);
      } else {
        const children = this.renderRootNodeData.children;
        return children ? children.map((item: TreeNodeData) => this.renderNodeDataTemplate(item)) : nothing;
      }
    }
  }

  private renderNodeDataTemplate(data: TreeNodeData) {
    const tree = this as SlTree;
    return html`<sl-tree-node
      selectMode=${this.selectMode}
      .tree=${tree}
      .nodeData=${data}
      .nodeRender=${this.real_treeNodeRender}
    ></sl-tree-node>`;
  }
  handSlotChange() {
    this.hasFooter = hasSlot(this, 'footer');
  }
  private _emitTreeEvent(event: CustomEvent) {
    const node = (event as any).delegateTarget as SlTreeNode;
    if (!event.defaultPrevented) {
      const oldType = event.type;
      const type = oldType.replace('sl-node', 'sl-tree-node');
      const nodeData = event.detail.nodeData;
      if (this.enableFilter && this.filterMethod) {
        const realData = this.nodeCacheMap?.get(nodeData);
        if (realData) {
          for (let k in nodeData) {
            if (k != 'children') {
              realData[k] = nodeData[k];
            }
          }
        }
      }
      emit(this, type, {
        detail: {
          node: node,
          nodeData: event.detail.nodeData
        }
      });
    }
  }
  @state()
  hasFooter = false;
  firstUpdated(map: PropertyValues) {
    super.firstUpdated(map);
    let handerTreeNode = (event: CustomEvent) => {
      this._emitTreeEvent(event);
    };
    let eventArray = [
      'sl-node-click',
      'sl-node-before-open',
      'sl-node-before-close',
      'sl-node-before-toogle',
      'sl-node-close',
      'sl-node-open',
      'sl-node-toogle'
    ];
    let div = this.renderRoot.querySelector('div[part]') as HTMLElement;
    for (let eventType of eventArray) {
      onEvent(div, 'sl-tree-node', eventType, handerTreeNode);
    }
  }
  render() {
    const baseClass = {
      'base-has-footer': this.hasFooter
    };
    return html`<div part="base" class=${classMap(baseClass)}>
      ${this.enableFilter
        ? html`<div part="filter">
            <slot name="filter"
              ><sl-input
                part="filter-input"
                .placeholder=${this.filterInputPlaceholder}
                @sl-input=${this.inputFilterHanlder}
                .value=${String(this.filterString)}
              ></sl-input
            ></slot>
          </div>`
        : ''}
      <div part="tree-body">${this.renderAllTreeNode()}</div>
      <div part="tree-footer"><slot name="footer"></slot></div>
    </div>`;
  }

  private inputChangeHander = debounce((inputString: string) => {
    this.filterString = inputString;
  }, 60);
  private inputFilterHanlder(event: Event) {
    var inputString = (event.target as any).value;
    this.inputChangeHander(inputString);
  }
  private handerCheckEvent(event: Event) {
    debugger;
    let checked = (event.target as any).checked as boolean;
    if (!Array.isArray(this.checkedKeys)) {
      this.checkedKeys = new Array<string | number | unknown>();
    }
    let node = (event.target as any).getRootNode().host as SlTreeNode;
    let nodeData = (event.target as any)['nodeData'] as TreeNodeData;
    if (checked && typeof nodeData[this.nodeIDProperty] != 'undefined') {
      (this.checkedKeys as any).push(nodeData[this.nodeIDProperty]);
    }
    emit(this, 'sl-tree-node-check-select', {
      detail: {
        node: node,
        nodeData: nodeData
      }
    });
  }
  private handerRadioEvent(event: Event) {
    let checked = (event.target as any).checked as boolean;
    if (Array.isArray(this.checkedKeys)) {
      this.checkedKeys = this.checkedKeys[0];
    }
    let node = (event.target as any).getRootNode().host as SlTreeNode;
    let nodeData = (event.target as any)['nodeData'] as TreeNodeData;
    if (checked && typeof nodeData[this.nodeIDProperty] != 'undefined') {
      this.checkedKeys = nodeData[this.nodeIDProperty];
    }
    emit(this, 'sl-tree-node-radio-select', {
      detail: {
        node: node,
        nodeData: nodeData
      }
    });
  }

  @watchProps(['nodeRender', 'selectMode', 'select_highlight', 'checkedKeys'])
  doNodeRenderChange() {
    this.real_treeNodeRender = (node: TreeNodeData) => {
      const result = this.nodeRender(node);
      const array = [];
      if (this.selectMode == 'check') {
        if (typeof this.checkedKeys != 'undefined') {
          if (!Array.isArray(this.checkedKeys)) {
            this.checkedKeys = [];
          }
        } else {
          this.checkedKeys = [];
        }
        array.push(
          html`<sl-checkbox
            .nodeData=${node}
            @sl-change=${this.handerCheckEvent.bind(this)}
            class="selectCheckbox"
            .checked=${typeof node[this.nodeIDProperty] != 'undefined' &&
            this.checkedKeys.includes(node[this.nodeIDProperty])}
          ></sl-checkbox>`
        );
      } else if (this.selectMode == 'radio') {
        array.push(
          html`<sl-radio
            .nodeData=${node}
            @sl-change=${this.handerRadioEvent.bind(this)}
            class="selectRadio"
            .checked=${typeof node[this.nodeIDProperty] != 'undefined' && this.checkedKeys == node[this.nodeIDProperty]}
          ></sl-radio>`
        );
      }
      array.push(result);
      return html`<div>${array}</div>`;
    };
  }
}
const parentSymobl = Symbol('parent');
declare global {
  interface HTMLElementTagNameMap {
    'sl-tree': SlTree;
  }
}
