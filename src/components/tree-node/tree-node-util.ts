import { html, TemplateResult } from 'lit';

export type TreeNodeData = {
  id?: string | number /* ID  */;
  parentID?: string | number /** 父节点ID**/;
  name?: string /*节点名称*/;
  icon?: string /*节点图标 */;
  close?: boolean /* 是否关闭 */;
  disable?:boolean /** 是否是disable 状态 ，此时不能选中*/
  closeable?: boolean /*false,表示节点不能折叠起来 */;
  [key: string]: unknown /*自定义属性 */;
  children?: TreeNodeData[] /*下级节点 */;
};
/**
 * 节点自定义渲染 
 * (data: TreeNodeData, index?:number, parentData?:TreeNodeData,): TemplateResult<1>;
 */
export interface NodeRenderInterface {
  /** data:节点数据源， index: 在上层的顺序号，parentData:父节点数据 */
  (data: TreeNodeData, index?:number, parentData?:TreeNodeData,): TemplateResult<1>;
}
/* 默认树节点渲染器*/
export const DEFAULT_TREE_NODE_RENDER: NodeRenderInterface = (data: TreeNodeData) => {
  return html`${data == null ? '' : data.name}`;
};

/**
 * 判断数据parent 是否包含了findChild,入股parent==findChild false, 如果parent 包含findChild 则为true
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
/** 节点遍历器  (node: TreeNodeData, parentNode?: TreeNodeData) */
export interface NodeVistor {
  /** @node:遍历的节点， paretNode:上级节点 */
  (node: TreeNodeData, parentNode?: TreeNodeData): NODE_VISTOR_RESULT | unknown;
}
/**
 * 遍历 TreeNodeData
 * @param data 节点数据
 * @param callback  节点遍历器 (node: TreeNodeData, parentNode?: TreeNodeData):unkown
 * @param parentNode:上级节点(根节点不用设置)
 */
export const iteratorNodeData = (data: TreeNodeData, callback: NodeVistor, parentData?: TreeNodeData) => {
  let result = callback(data, parentData);
  if (result == NODE_VISTOR_RESULT.EXIST) {
    return;
  } else {
    const children = data.children;
    if (children) {
      label: for (let k of children) {
        result = iteratorNodeData(k, callback, data);
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
 * 节点数据 是否满足匹配条件 : (data: TreeNodeData, ...searchData: unknown[])
 */
export interface TreeNodeFilter {
  /**
   * data:需要匹配的数据，开发者不用去递归孩子数据
   */
  (data: TreeNodeData, ...searchData: unknown[]): boolean;
}
export const DEFAULT_TREE_FILTER: TreeNodeFilter = function (data: TreeNodeData, searchString: string) {
  if (typeof searchString == 'undefined' || searchString.trim() == '') {
    return true;
  }
  const index = data && data.name && data.name?.toLowerCase().indexOf(searchString.toLowerCase());
  return typeof index != 'undefined' && index > 0;
};

/**
 * 复制节点数据， 排除指定的属性，children
 * @param data 需要复制的节点数据
 * @param excludePropertiyes, 需要排除的属性，默认['children']
 */
export const cloneTreeNodeData = (data: TreeNodeData, excludePropertiyes: string[] = ['children']) => {
  if (data == null || typeof data == 'undefined') {
    throw new Error('NULL数据不能复制');
  }
  const temp = {};
  for (let key in data) {
    if (excludePropertiyes.includes(key)) {
      continue;
    }
    (temp as any)[key] = data[key];
  }
  (temp as any).children = [];
  return temp as TreeNodeData;
};
type  DataType={
  [key:string]:unknown;
}
/**
 * 将id,parentID 的树节点数据，转化为TreeNodeData。
 * @param list :节点数组列表
 * @param root :根节点,注意根节点id值
 * @param option: 转化参数 ，指定id,parentID 所属属性。
 */
export const convertListToTreeNodeData=(list:Array<DataType>,root:TreeNodeData, option:{idProp:string,parentIDPro:string,childrenPro:string}={idProp:'id',parentIDPro:'parentID',childrenPro:'children'}):TreeNodeData =>{
   
    const idProp=option.idProp;
    const parentProp=option.parentIDPro;
    const childProp=option.childrenPro;

    // const map=new Map(); //key :ID ,value：节点数据
    const parentMap=new Map<unknown,Array<DataType>>(); //key:parentID, value:子节点列表
    for(let i=0,j=list.length;i<j;i++){
        const tempNode=list[i];
        const idValue=tempNode[idProp];
        const parentValue=tempNode[parentProp];
        if(idValue===parentValue){
          throw new Error(`${tempNode} id,parentID 属性值完全相等，会造成死循环...`);
        }
       let childArray:Array<DataType>;
       if(parentMap.has(parentValue)){
           childArray=parentMap.get(parentValue)  as Array<DataType>;
       }else{
           childArray=[];
           parentMap.set(parentValue,childArray);
       }
       childArray.push(tempNode);
    }
    let rootChildren=parentMap.get(root[idProp]);
    if(rootChildren==null){
          console.warn(`not found root nodes child nodes. No nodes  ${parentProp}值=${root[idProp]}` );
    }else {
      const funIterator=(id:unknown,parentData:DataType)=>{
          let subChild=parentMap.get(id);
          if(subChild){
            let children=parentData[childProp] as DataType[];
            if(!children){
              children=[] ;
              parentData[childProp]=children;
            }
            for(let k of subChild){
              children.push(k);
              funIterator(k[idProp],k);
            }
          }
      }
      funIterator(root[idProp],root);
    }
    return root;
}