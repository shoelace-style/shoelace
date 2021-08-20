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
  disable?boolean;/** disable ,不能选择状态 ***/
  [key:string]:unknown; /*自定义属性 */
  children?: TreeNodeData[]; /*下级节点 */
  _parent?: TreeNodeData ; //上级节点，内部使用
}
```

## nodeRender 
接收nodeData ，返回树节点自定返回数据
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
        return html`${data.value} ${data.children&&data.children.length>0? '('+data.children.length+')':''}`;
    };
   
    rootNode.addEventListener('sl-node-toogle',(event)=>{
        console.log(event.detail.node.nodeData);
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
        console.log(JSON.stringify(event.detail.nodeData.value));
    });
     rootNode.addEventListener('sl-node-click',(event)=>{
         const el=event.path[0];
         console.trace('当前点击的tree-node',el);
         console.log(event.detail.node.nodeData.value);
     })
  const request = fetch('/assets/examples/tree-node-demo.json').then(response=>response.json()).then((json)=>{
    rootNode.nodeData={
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
    setNodeID(rootNode.nodeData);

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
       }else{
           //tempData.close=true;
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
