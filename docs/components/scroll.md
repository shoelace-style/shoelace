# Scroll

[component-header:sl-scroll]

A scroll component .

```html preview
<sl-scroll style='width:80%;height:300px;border:1px solid #f2f2f2;'  id="sl-scrollDIV"></sl-scroll>
<script>
    var sl=document.querySelector('#sl-scrollDIV');
sl.addEventListener('sl-scroll-y',(event)=>{
    console.log(event.type ,event.detail);
});
sl.addEventListener('sl-scroll-x',(event)=>{
    console.log(event.type ,event.detail);
});
sl.addEventListener('sl-scroll-change',(event)=>{
  console.log(event.type ,event.detail);
});
sl.addEventListener('sl-scroll-x-end',(event)=>{
    console.log(event.type,event.detail);
});
sl.addEventListener('sl-scroll-y-end',(event)=>{
    console.log(event.type,event.detail);
});
    const result=document.createDocumentFragment();
    for(var i=0,j=500;i<j;i++){
        let html=document.createElement('div');
        html.textContent= (i+1)+' scroll div----->'+Math.random();
        result.appendChild(html);
        if(i>0&&i%100==0){
            html=document.createElement('div');
            html.style.width='900px';
            html.textContent=`<div style='width:900px'>{{ node: SlOrgNode,nodeData:OrgNodeDataType }} sl-org-tree-node-click {{ node: SlOrgNode,nodeData:OrgNodeDataType }} sl-org-tree-node-click {{ node: SlOrgNode,nodeData:OrgNodeDataType }} sl-org-tree-node-click </div>`;
            result.appendChild(html);
        }
    }
    sl.appendChild(result);
</script>
```


[component-metadata:sl-scroll]
