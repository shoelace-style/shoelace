# Menu

[component-header:sl-menu]

Menus provide a list of options for the user to choose from.

You can use [menu items](/components/menu-item), [menu dividers](/components/menu-divider), and [menu labels](/components/menu-label) to compose a menu. Menus support keyboard interactions, including type-to-select an option.

```html preview
<sl-menu id="menuID" style="max-width: 200px; border: solid 1px var(--sl-panel-border-color); border-radius: var(--sl-border-radius-medium);">
  <sl-menu-item value="undo" disabled>Undo</sl-menu-item>
  <sl-menu-item value="redo">Redo</sl-menu-item>
  <sl-menu-divider></sl-menu-divider>
  <sl-menu-item value="cut">Cut</sl-menu-item>
  <sl-menu-item value="copy">Copy</sl-menu-item>
  <sl-menu-item value="paste">Paste</sl-menu-item>
  <sl-menu-item value="delete">Delete</sl-menu-item>
</sl-menu>
<span id='selectedMenu-item'></span>
<script type='text/javasript'>
  document.querySelector('#menuID').addEventListener('sl-select',function(ev){
    document.querySelector('#selectedMenu-item').textContent=ev.detail.item.getAttribute('value');
    document.querySelector('#menuID').querySelectorAll('sl-menu-item').forEach((item)=> item.checked=false);
    ev.detail.item.checked=true;
  });
</script>
```


?> Menus are intended for system menus (dropdown menus, select menus, context menus, etc.). They should not be mistaken for navigation menus which serve a different purpose and have a different semantic meaning. If you're building navigation, use `<nav>` and `<a>` elements instead.

[component-metadata:sl-menu]
