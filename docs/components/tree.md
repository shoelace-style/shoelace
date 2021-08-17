# Tree

[component-header:sl-tree]

Tree 组件，Tree 最重要的是定义数据源`rootNodeData`，渲染函数 `nodeRender`, 选择模式 支持 `checkbox`,`radio`,`default`,`node`

### 节点数据源 `nodeData` 
```javascript
 export type TreeNodeData = {
  id?: string | number; /* ID  */
  parentID?:string|number;/** 父节点ID**/
  name?: string; /*节点名称*/
  icon?: string; /*节点图标 */
  close?: boolean; /* 是否关闭 */
  closeable?: boolean; /*false,表示节点不能折叠起来 */
  [key:string]:unknown; /*自定义属性 */
  children?: TreeNodeData[]; /*下级节点 */
  _parent?: TreeNodeData ; //上级节点，内部使用
}
```

### 自定义渲染 `nodeRender`
接收nodeData ，返回树节点自定返回数据
```javascript
 export interface NodeRenderInterface{
  (data:TreeNodeData):TemplateResult<1>;
}
```

### 内置过滤
 `filter`：是否启用过滤，如果启用，默认多一个input 过滤器（也可以slot=[name=filter] 替换自定义的内部过滤器）
 `filterString`:过滤参数
 `filterMethod`:过滤函数    接收nodeData ，判断节点是
 否匹配
```javascript
 export interface TreeNodeFilter{
    /**
     * data:需要匹配的数据，开发者不用去递归孩子数据
     */
    (data:TreeNodeData, ...searchData:unknown[]):boolean;
  }
```



```html preview
<sl-button-group id='buttonGroup'>
    <sl-button value='check'>Checkbox</sl-button>
    <sl-button value='radio'>Radio</sl-button>
    <sl-button value='none'>None</sl-button>
    <sl-button value='default'>Default</sl-button>
    
    <sl-checkbox style='margin-left:20px' id='checkFilter'>是否启用过滤</sl-checkbox>
</sl-button-group>

<sl-tree id='sl-tree-div' filter-input-placeholder='请输入城市名称'></sl-tree>
<style >
#sl-tree-div::part(base){
    max-height:600px;
}
</style>
<script>
    let group=document.querySelectorAll('#buttonGroup sl-button');
    for(let k of group){
        k.addEventListener('click',(e)=>{
            console.trace(e);
            treeDiv.selectMode=e.target.getAttribute('value');
        })
    }
let treeDiv=document.querySelector('#sl-tree-div');
treeDiv.nodeIDProperty='value';
    treeDiv.nodeRender=(data)=>{
        const html=window.html;
        return html`${data.value} ${data.children&&data.children.length>0? '('+data.children.length+')':''}`;
    };
    treeDiv.filterMethod=function(data,filterString){
        return data.value.indexOf(filterString)>=0;
    }
    treeDiv.addEventListener('sl-tree-node-toogle',(event)=>{
        console.log(event.detail.node.nodeData);
        let openData=localStorage.getItem('tree-data');//存储所有打开的节点
        if(!openData){
            openData=[];
        }else{
            openData=JSON.parse(openData);
        }
        const data=event.detail.nodeData;
        if(data.close){//关闭
            let index=openData.indexOf(data.value);
            if(index>=0){
                openData.splice(index,1);
            }
        }else{
            openData.push(data.value);
        }
        localStorage.setItem('tree-data',JSON.stringify(openData));
        console.log(JSON.stringify(event.detail.nodeData.value));
    });
     treeDiv.addEventListener('sl-tree-node-click',(event)=>{
         const el=event.path[0];
         console.trace('当前点击的tree-node',el);
         console.log(event.detail.node.nodeData.value);
     })
  const request = fetch('/assets/examples/tree-node-demo.json').then(response=>response.json()).then((json)=>{
    treeDiv.rootNodeData={
        value:'中国',
        children:json
    };
    /*遍历恢复 节点收缩状态*/
    const iteratorNodeData=(data,callback)=>{
        callback(data);
        const children=data.children;
        if(children){
          for(let k of children){
            iteratorNodeData(k,callback);
          }
        }
    }
    let openData=localStorage.getItem('tree-data');
    if(!openData){
        openData=[];
    }else{
        openData=JSON.parse(openData);
     }
    const callFun=function(tempData){
       if(openData.indexOf(tempData.value)>=0){
           tempData.close=false;
       }
    }
    iteratorNodeData(treeDiv.rootNodeData,callFun);
});
 document.querySelector('#checkFilter').addEventListener('sl-change',(event)=>{
        treeDiv.enableFilter=event.target.checked;
    });
</script>
```
TODO

### Second Example

TODO

[component-metadata:sl-tree]
