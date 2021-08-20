# Org Tree

[component-header:sl-org-tree]

组织架构图.

```html preview
<div style='overflow:auto'>
    <sl-org-tree id="tree" ></sl-org-tree>
</div>
<sl-button id="changeTree">
    horizontal
</sl-button>
<script>
    var changeTree= document.querySelector('#changeTree');
     var tree= document.querySelector('#tree');
    changeTree.addEventListener('click',()=>{
            var tree=document.querySelector('#tree');
            tree.horizontal=!tree.horizontal;
        });

    var orgiData={key: '0',
        data: {roleName: 'EasyTrack'},styleClass:'p-person',
        collapsable:true,
        expanded:true,
        children: [
        {
            key: '0_0',
            data: {roleName:'CEO',userName: 'Tang'},
            collapsable:true,
            expanded:false,
            children: [
                {
                    data: {roleName:'CFO',userName: 'Chelsea F.C.'},styleClass:'p-person',
                    children:[
                        {
                            data:{roleName:'Tax',userName: 'F.C. Barcelona'},styleClass:'p-person'
                        },
                        {
                            data:{roleName:'Legal',userName: 'F.C. Barcelona'},styleClass:'p-person'
                        },
                        {
                            data:{roleName:'Operations',userName: 'F.C. Barcelona'},styleClass:'p-person'
                        }
                    ]
                },
                {
                    data: {roleName:'COO', userName:'F.C. Barcelona'},
                    children:[{
                        data:{roleName:'Operations'}

                    }]
                },
                {
                    data: {roleName:'CTO',userName: 'Jesse Pinkman'},children:[
                        {
                            data:{  roleName:'Development'},
                            children:[
                                {data:{roleName:'AnalySis'},styleClass:'p-person'},
                                {data:{roleName:'Front End'},styleClass:'p-person'},
                                {data:{roleName:'Back End'},styleClass:'p-person'}
                            ]
                        },
                        {
                            data:{  roleName:'QA'},children:[{data:{roleName:'B'}}]
                        },
                        {
                            data:{  roleName:'R&D'},
                        }
                    ]
                }
            ]
            
        },
        {
            key: '0_1',
            data: {roleName:'CEO 02',userName: 'F.C. Barcelona'},
        }
    ]
};
            tree.rootData=orgiData;
            tree.nodeRender=function(node){
                const data=node.data;
                const html=window.html;
                return html`<span class='p-person'>${data.roleName}</span>
                    ${data.userName?html`<span class='userName'>${data.userName}</span>`:''}
                `;
            };
           tree.customStyle=`.p-person{
               padding:10px;
               display:block;
           }
           .userName{
               color:red;
           }`;
           tree.addEventListener('sl-org-tree-node-click',function(event){
               console.log(event.detail.nodeData.data.roleName);
           })
            tree.addEventListener('sl-org-tree-node-toogle',function(event){
              console.log(event.detail.nodeData.data.roleName );
              console.log(event.detail.nodeData.expanded);
           })
</script>
```



[component-metadata:sl-org-tree]
