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
    <sl-button type='primary' value='single'>single</sl-button>
    
    <sl-checkbox style='margin-left:20px' id='checkFilter'>是否启用过滤</sl-checkbox>
    <sl-checkbox style='margin-left:20px' id='select_hight'>选中高亮</sl-checkbox>
</sl-button-group>
 <div style='margin:10px 0;' id='checkGroup'>
     <sl-checkbox checked style='margin-left:20px' id='includeRoot' > 是否包含根节点</sl-checkbox>
    <sl-checkbox checked style='margin-left:20px' id='checkCasecade' > 选中是否向下级联</sl-checkbox>
    <sl-checkbox checked style='margin-left:20px' id='checkOffCasecade' >取消选中是否向下级联</sl-checkbox>
 </div>
<div id='checkTreeValue' style='margin:10px 0;max-height:60px;overflow:hidden;' ></div>
<sl-tree id='sl-tree-div' filter-input-placeholder='请输入城市名称'>
    <div slot='no-data'>没有数据</div>
    <sl-button slot='footer'>footer</sl-button>
</sl-tree>
<style >
#sl-tree-div::part(base){
    max-height:600px;
}
</style>
<script>
    let treeDiv=document.querySelector('#sl-tree-div');
    let groupDIV=document.querySelector('#buttonGroup');
    let group=groupDIV.querySelectorAll('sl-button');
    for(let k of group){
        k.addEventListener('click',(e)=>{
            let target=e.target;
            treeDiv.selectMode=target.getAttribute('value');
            for(let k of group){
                k.type='default';
                if(k==target){
                    k.type='primary';
                }
            }
        })
    }
    document.querySelector('#checkGroup').addEventListener('sl-change',(event)=>{
        let target=event.target;
        if(target.id=='checkCasecade'){
            treeDiv.checkCasecade=target.checked;
        }else if(target.id=='checkOffCasecade'){
            treeDiv.checkOffCasecade=target.checked;
        }
    })
    document.querySelector('#includeRoot').addEventListener('sl-change',(event)=>{
        let target=event.target;
        treeDiv.includeRoot=target.checked;
    });
    document.querySelector('#select_hight').addEventListener('sl-change',(event)=>{
        let target=event.target;
        treeDiv.select_highlight=target.checked;
    });
 //   treeDiv.customStyle='.redColor{color:red}';
    treeDiv.nodeRender=(data,index,parentData)=>{
        const html=window.html;
        return html`<span class='redColor'>${parentData?index+1:''} ${data.value} ${data.children&&data.children.length>0? '('+data.children.length+')':''}</span>`;
    };
    treeDiv.filterMethod=function(data,filterString){
        return data.value.indexOf(filterString)>=0;
    }
    treeDiv.addEventListener('sl-tree-node-toogle',(event)=>{
        let openData=localStorage.getItem('tree-data');//存储所有打开的节点
        if(!openData){
            openData=[];
        }else{
            openData=JSON.parse(openData);
        }
        const data=event.detail.nodeData;
        if(data.close){//关闭
            let index=openData.indexOf(data.id);
            if(index>=0){
                openData.splice(index,1);
            }
        }else{
            openData.push(data.id);
        }
        localStorage.setItem('tree-data',JSON.stringify(openData));
        console.log(JSON.stringify(event.detail.nodeData.id));
    });
     treeDiv.addEventListener('sl-tree-node-click',(event)=>{
         const el=event.path[0];
         //console.trace('当前点击的tree-node',el);
         console.log(event.detail.node.nodeData.value);
     });
     treeDiv.addEventListener('sl-tree-checkKeys-change',(event)=>{
         document.querySelector('#checkTreeValue').textContent=JSON.stringify(treeDiv.checkedKeys);
     })
  const request = fetch('/assets/examples/tree-node-demo.json').then(response=>response.json()).then((json)=>{
    treeDiv.rootNodeData={
        value:'中国',
        children:json
    };
    //规范数据， 这个json 源id 不唯一，现在调整下。
    const setNodeID=(node,parent)=>{
        if(parent){
            node.id=parent.id+'/'+node.value;
        }else{
            node.id=node.value;
        }
        const children=node.children;
        if(children){
          for(let k of children){
            setNodeID(k,node);
          }
        }
    }
    setNodeID(treeDiv.rootNodeData);


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
       if(openData.indexOf(tempData.id)>=0){
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
