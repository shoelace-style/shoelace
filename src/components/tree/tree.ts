import { html, LitElement, nothing, PropertyValues } from 'lit';
import { classMap } from 'lit-html/directives/class-map';
import { customElement, property, state } from 'lit/decorators.js';
import { customStyle } from '../../internal/customStyle';
import { emit } from '../../internal/event';
import { hasSlot } from '../../internal/slot';
import { debounceWait } from '../../internal/throttle';
import { watch } from '../../internal/watch';
import { watchProps } from '../../internal/watchProps';
import { onEvent } from '../../utilities/common';
import SlCheckbox from '../checkbox/checkbox';
import SlRadio from '../radio/radio';
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
 * @event {{node: SlTreeNode,nodeData: TreeNodeData, parentData:TreeNodeData}} sl-tree-node-click - Emitted when tree-node-click.
 * @event {{node: SlTreeNode,nodeData: TreeNodeData, parentData:TreeNodeData}} sl-tree-node-toogle - Emitted when tree-node-state changed.
 * @event {{node: SlTreeNode,nodeData: TreeNodeData, parentData:TreeNodeData}} sl-tree-node-before-toogle - Emitted before tree-node-state change.
 * @event {{node: SlTreeNode,nodeData: TreeNodeData, parentData:TreeNodeData}} sl-tree-node-open - Emitted when tree-node-state change to opened.
 * @event {{node: SlTreeNode,nodeData: TreeNodeData, parentData:TreeNodeData}} sl-tree-node-close - Emitted when tree-node-state change closed.
 * @event {{node: SlTreeNode,nodeData: TreeNodeData, parentData:TreeNodeData}} sl-tree-node-before-open - Emitted before tree-node-state to open.
 * @event {{node: SlTreeNode,nodeData: TreeNodeData, parentData:TreeNodeData}} sl-tree-node-before-close - Emitted before tree-node-state to close.
 * @event {{node:SlTreeNode,checkKeyKeys:checkKeyKeys }} sl-tree-node-select-change - Emitted after tree select node change .
 * @event {{checkKeyKeys:checkKeyKeys }} sl-tree-checkKeys-change - Emitted when tree checkeys has changed .
 *
 *
 * @slot no-data - slot:when no tree has no data  or rootNodeData is undefined.
 * @slot loading - slot:when tree loading=true
 *
 * @csspart base - The tree's base wrapper.
 *
 * @cssproperty --example - An example CSS custom property.
 */
@customStyle()
@customElement('sl-tree')
export default class SlTree extends LitElement {
  static styles = styles;

  /** tree 选中方式 selectMode：支持的值为：check, radio,single,none （none,表示不支持选中,single) */
  @property({ reflect: true }) selectMode: 'check' | 'radio' | 'single' | 'none' = 'single';

  /** 选中的节点，是否高亮显示 */
  @property({ attribute:false, type: Boolean }) select_highlight = false;

  /** 是否显示根节点 */
  @property({ reflect: true, attribute: 'include_root', type: Boolean }) includeRoot = true;

  /** 当selectMode='check', 选中的时候是否支持级联选择（选中上级，下级自动选中） */
  @property({ reflect: true, attribute: 'check_casecade', type: Boolean }) checkCasecade = true;

   /** 当selectMode='check', 取消某个节点选中，下级节点是否也级联不选中 */
   @property({ reflect: true, attribute: 'check_off_casecade', type: Boolean }) checkOffCasecade = true;

  /** 设置是加载状态 */
  @property({ reflect: true, attribute: 'loading', type: Boolean }) loading = false;

  /** 树已经选中的节点，如果是多选，则为选中节点的ID值组成的数组，否则为选中节点的ID */
  @property({ reflect: true, attribute: false }) checkedKeys?: unknown | Array<unknown>;

  /** 树节点过滤 参数，当支持过滤时启用*/
  @property({ attribute: false }) filterString: string | unknown = '';

  /** 树内置过滤input 的placeHolder*/
  @property({ attribute: 'filter-input-placeholder' }) filterInputPlaceholder = '';
  /** 当支持过滤是， 节点过滤函数，接收TreeNodeData, 和 所有的其他参数，true,则节点满足过滤条件 */
  @property({ attribute: false }) filterMethod = DEFAULT_TREE_FILTER;

  /** 是否支持过滤 */
  @property({ reflect: true, attribute: 'enable-filter', type: Boolean }) enableFilter = false;

  /** 数据ID属性，用于内置选中节点 ,默认=id*/
  @property({ attribute: false }) nodeIDProperty = 'id';

  /** 节点渲染函数 */
  @property({ attribute: false }) nodeRender = DEFAULT_TREE_NODE_RENDER;

  /** 根节点数据源 */
  @property({ type: Object, attribute: false })
  rootNodeData?: TreeNodeData;

  /** 实际渲染的根节点数据 */
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
  matchFilterNodeSet?: Set<TreeNodeData>;

  @state()
  real_treeNodeRender = this.nodeRender;

  @watch('selectMode')
  watchSelectModeChange(_oldMode:string,newMode:string){
    if(newMode=='check'){
       if(!Array.isArray(this.checkedKeys)){
         let oldChecked=this.checkedKeys as string;
         let array=[];
         if(typeof oldChecked !='undefined'){
           array.push(oldChecked);
         }
         this.checkedKeys=array;
       }
    }else if(_oldMode=='check'){
      if(Array.isArray(this.checkedKeys)&& this.checkedKeys.length>0){
        let first=this.checkedKeys[0];
        this.checkedKeys=first;
      }
    }
  }
  @watch('checkedKeys')
  async watchSelectKeyChange(){
    let selectKey=this.checkedKeys;
    if(Array.isArray(selectKey)){
      (selectKey as Array<unknown>)=[...selectKey];
    }
    if(this.hasUpdated){
      await this.updateComplete;
      emit(this,'sl-tree-checkKeys-change',{
        detail:selectKey
      })
    }
  }
  /** 实现树内部过滤逻辑 */
  @watchProps(['filter', 'filterString', 'filterMethod', 'rootNodeData'])
  doFilter() {
    const rootNodeData = this.rootNodeData;
    const treeEl = this;
    if (rootNodeData && this.filterMethod && this.enableFilter) {
      const filterArray = Array.isArray(this.filterString) ? this.filterString : [this.filterString];
      const matchNodeSet = new Set<TreeNodeData>();
      const hightLightNodeSet = (this.matchFilterNodeSet = new Set<TreeNodeData>());
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
  constructor() {
    super();
    this.handerCheckEvent = this.handerCheckEvent.bind(this);
    this.handerRadioEvent = this.handerRadioEvent.bind(this);
  }
  /**
   * 获取上级数据源
   * @data :节点数据源
   */
  public getParentNodeData(data: TreeNodeData) {
    return (data as any)[parentSymobl] as TreeNodeData;
  }

  private renderAllTreeNode() {
    if (!this.renderRootNodeData) {
      return html`<slot name="no-data"></slot>`;
    } else {
      if (this.includeRoot) {
        return this.renderNodeDataTemplate(this.renderRootNodeData,0);
      } else {
        const children = this.renderRootNodeData.children;
        return children ? children.map((item: TreeNodeData,index:number) => this.renderNodeDataTemplate(item,index,this.renderRootNodeData)) : nothing;
      }
    }
  }
  
  private renderNodeDataTemplate(data: TreeNodeData,index:number,parentData?:TreeNodeData) {
    const tree = this as SlTree;
    return html`<sl-tree-node
      .customStyle=${(this as any).customStyle}
      .tree=${tree}
      .nodeData=${data}
      index=${index}
      .parentNodeData=${parentData}
      .nodeRender=${this.real_treeNodeRender}
    ></sl-tree-node>`;
  }
  private _emitTreeEvent(event: CustomEvent) {
    const node = (event as any).delegateTarget as SlTreeNode;
    if (!event.defaultPrevented) {
      const oldType = event.type;
      const type = oldType.replace('sl-node', 'sl-tree-node');
      const nodeData = node.nodeData;
      emit(this, type, {
        detail: {
          node: node,
          nodeData: nodeData,
          parentData:node.parentNodeData
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
    onEvent(div, 'sl-tree-node', 'sl-node-click', (event:CustomEvent)=>{
       const tree_node=(event.detail.node) as SlTreeNode;
       if(this.selectMode=='single'&&tree_node.nodeData){
         this.checkedKeys=tree_node.nodeData[this.nodeIDProperty];
         emit(this, 'sl-tree-node-select-change', {
          detail: {
            node: tree_node,
            checkKeyKeys:this.checkedKeys
          }
        });
       }
    });
  }
  render() {
    const baseClass = {
      'base-has-footer': this.hasFooter
    };
    return html`<div part="base" class=${classMap(baseClass)}>
      ${this.enableFilter
        ? html`<div part="filter">
            <slot name="filter">
              <sl-input
                part="filter-input"
                .placeholder=${this.filterInputPlaceholder}
                @sl-input=${this.inputFilterHanlder}
                .value=${String(this.filterString)}
              ></sl-input
            ></slot>
          </div>`
        : ''}
      <div part="tree-body">${this.renderAllTreeNode()}</div>
      <div part="tree-footer"><slot name="footer" @slotchange=${this.slotChangeHandler}></slot></div>
    </div>`;
  }
  private slotChangeHandler(){
    this.hasFooter=hasSlot(this,'footer');
  }
  private inputChangeHander = debounceWait((inputString: string) => {
    this.filterString = inputString;
  }, 30);
  private inputFilterHanlder(event: Event) {
    var inputString = (event.target as any).value;
    this.inputChangeHander(inputString);
  }
  private async handerCheckEvent(event: Event) {
    let checked = (event.target as any).checked as boolean;
    let array=this.checkedKeys as Array<unknown>;
    let node = this.getClosetTreeNode(event.target as HTMLElement) as SlTreeNode;
    let nodeData = node.nodeData as TreeNodeData;
    let nodeIDValue=nodeData[this.nodeIDProperty];
    if (checked && typeof nodeIDValue != 'undefined') {
        const iteratorSubData=(node:TreeNodeData)=>{
          let nodeID=node[this.nodeIDProperty];
          if(typeof nodeID!='undefined'){
              if(!array.includes(nodeID)){
                array.push(nodeID);
              }
          }
        }
        if(this.checkCasecade){
          iteratorNodeData(nodeData,iteratorSubData);
        }else{
          iteratorSubData(nodeData);
        }
       
    }else if(typeof nodeIDValue != 'undefined'){
      const iteratorSubData=(node:TreeNodeData)=>{
        let nodeID=node[this.nodeIDProperty];
        if(typeof nodeID!='undefined'){
          let index=array.indexOf(nodeID);
          if(index>=0){
            array.splice(index,1);
          }
        }
      }
      if(this.checkOffCasecade){
        iteratorNodeData(nodeData,iteratorSubData);
      }else{
        iteratorSubData(nodeData);
      }
    }
    this.checkedKeys=[...array];
    await this.updateComplete;
    emit(this, 'sl-tree-node-select-change', {
      detail: {
        node: node,
        checkKeyKeys:array
      }
    });
  }
  private async handerRadioEvent(event: Event) {
    let node = this.getClosetTreeNode(event.target as HTMLElement) as SlTreeNode;
    let checked = (event.target as any).checked as boolean;
    let tempChecke='';
    if (Array.isArray(this.checkedKeys)) {
      tempChecke = this.checkedKeys[0] as string ;
    }
    let nodeData = node.nodeData as TreeNodeData;
    if (checked && typeof nodeData[this.nodeIDProperty] != 'undefined') {
       tempChecke= nodeData[this.nodeIDProperty] as string;
    }else{
      tempChecke='';
    }
     this.checkedKeys=tempChecke;
     await this.updateComplete;
    emit(this, 'sl-tree-node-select-change', {
      detail: {
        node: node,
        checkKeyKeys:tempChecke
      }
    });
  }

  @watchProps(['nodeRender', 'selectMode', 'select_highlight', 'checkedKeys'])
  watchNodeRenderChange() {
    const handerNodeSelect=(event:Event)=>{
      const node=event.target as HTMLElement;
      if(node.tagName.toLocaleUpperCase()=='sl-checkbox'||node.tagName.toLocaleUpperCase()=='sl-radio'){
        return ;
      }
      if(this.selectMode=='check'){
        let checkBox=node.querySelector(':scope > sl-checkbox')  as SlCheckbox;
        if(checkBox){
          checkBox.checked=!checkBox.checked;
          emit(checkBox,'sl-change');
        }
        
      }else if(this.selectMode=='radio'){
        let checkBox=node.querySelector(':scope > sl-radio')  as SlRadio;
        if(checkBox){
          checkBox.checked=true;
          emit(checkBox,'sl-change');
        }
      }
    }
    this.real_treeNodeRender = (node: TreeNodeData,index?:number,parentNodeData?:TreeNodeData) => {
      const result = this.nodeRender(node,index,parentNodeData);
      const array = [];
      if (this.selectMode == 'check') {
        array.push(
          html`<sl-checkbox
            .nodeData=${node}
            @sl-change=${this.handerCheckEvent}
            class="selectCheckbox"
            .checked=${typeof node[this.nodeIDProperty] != 'undefined' &&
            (this.checkedKeys as Array<unknown>).includes(node[this.nodeIDProperty])}
          >${result}</sl-checkbox>`
        );
      } else if (this.selectMode == 'radio') {
        array.push(
          html`<sl-radio
            .nodeData=${node}
            @sl-change=${this.handerRadioEvent}
            class="selectRadio"
            .checked=${typeof node[this.nodeIDProperty] != 'undefined' && this.checkedKeys == node[this.nodeIDProperty]}
          >${result}</sl-radio>`
        );
      }else{
        array.push(result);
      }
      return html`<div part='select-part' @click=${handerNodeSelect}>${array}</div>`;
    };
  }

  /**
   *  获取 DOM 最近的TreeNode: 
   * @param el tree shadowRoot 内部元素
   * @throws when el getRootNode()==document 
   */
   public getClosetTreeNode(el:HTMLElement):SlTreeNode|null{
    if(el.getRootNode()==document){
      throw new Error('el should  in tree ShadowRoot !');
    }
    if(el instanceof SlTreeNode){
      return el;
    }else{
      let root=el.getRootNode() as ShadowRoot;
      let temp;
      while(root!=null ){
         temp=root.host;
         if(temp instanceof SlTreeNode){
           return temp;
         }
         root=temp.getRootNode() as ShadowRoot;
      }
    }
    return null;
  }
}
const parentSymobl = Symbol('parent');
declare global {
  interface HTMLElementTagNameMap {
    'sl-tree': SlTree;
  }
}
