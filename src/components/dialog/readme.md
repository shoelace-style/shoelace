# Dialog

```html preview
<sl-button data-dialog="dialog-1">Open Dialog</sl-button>

<sl-dialog id="dialog-1">
  This is a dialog
</sl-dialog>

<script>
  [...document.querySelectorAll('[data-dialog]')].map(button => {
    button.addEventListener('click', event => {
      document.getElementById(event.target.getAttribute('data-dialog')).open = true;
    });
  });
</script>
```



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type      | Default |
| -------- | --------- | ----------- | --------- | ------- |
| `open`   | `open`    |             | `boolean` | `false` |


----------------------------------------------


