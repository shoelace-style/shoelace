# Splitter

[component-header:sl-splitter]

 Splitter   component: 用于布局，支持左右分隔，上下分隔

```html preview
<sl-splitter style='height:400px;' min-size='100' id='spliter' max-size='300'>
    <div slot='exta'>
        <sl-menu id='menuDiv'>
            <sl-menu-label>
                Menu Label
            </sl-menu-label>
            <sl-menu-item>left</sl-menu-item>
            <sl-menu-item>right</sl-menu-item>
            <sl-menu-item>top</sl-menu-item>
            <sl-menu-item>bottom</sl-menu-item>
        </sl-menu>    
    </div>
    <div>
        我是主体内容，随便拖动分隔条看看
        我是主体内容，随便拖动分隔条看看
        我是主体内容，随便拖动分隔条看看
    </div>
</sl-splitter>
<script >
    let menuDiv=document.querySelector('#menuDiv');
    let spliter=document.querySelector('#spliter');
    menuDiv.addEventListener('sl-select',(event)=>{
        menuDiv.querySelectorAll('sl-menu-item').forEach((item)=>{
            if(event.detail.item==item){
                item.type='primary';
            }else{
                item.type='default';
            }
        })
        spliter.splitType=event.detail.item.textContent;
    });

</script>
```

## Examples

### First Example

TODO

### Second Example

TODO

[component-metadata:sl-splitter]
