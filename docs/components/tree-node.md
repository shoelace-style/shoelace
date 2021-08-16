# Tree Node

[component-header:sl-tree-node]

 TreeNode : 有两个属性，`nodeData`,`nodeRender`

## nodeData 节点数据源
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

## nodeRender 接收nodeData ，返回树节点自定返回数据
```javascript
 export interface NodeRenderInterface{
  (data:TreeNodeData):TemplateResult<1>;
}
```

```html preview
<sl-tree-node id='rootNode'></sl-tree-node>
<script>
    let rootNode=document.querySelector('#rootNode');
    rootNode.nodeRender=(data)=>{
        const html=window.html;
        return html`${data.value}`;
    };
   
    rootNode.addEventListener('sl-node-open',(event)=>{
        let openData=localStorage.getItem('tree-data');//存储所有打开的节点
        if(!openData){
            openData=[];
        }else{
            openData=JSON.parse(openData);
        }
        openData.push(event.detail.value);
        localStorage.setItem('tree-data',JSON.stringify(openData));
        console.log(`${event.detail.value}`);
    });
    rootNode.addEventListener('sl-node-close',(event)=>{
        let openData=localStorage.getItem('tree-data');
        if(!openData){
            openData=[];
        }else{
            openData=JSON.parse(openData);
        }
        let index=openData.indexOf(event.detail.value);
        if(index>=0){
            openData.splice(index,1);
        }
        localStorage.setItem('tree-data',JSON.stringify(openData));
        console.log(`${event.detail.value}`);
    });
  const request = fetch('/assets/examples/tree-node-demo.json').then(response=>response.json()).then((json)=>{
    rootNode.nodeData={
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
    iteratorNodeData(rootNode.nodeData,callFun);
});

    
  

</script>
```

## Examples

### First Example

TODO

### Second Example

TODO

[component-metadata:sl-tree-node]
