# Tab Group

[component-header:sl-tab-group]

Tab groups organize content into a container that shows one section at a time.

Tab groups make use of [tabs](/components/tab) and [tab panels](/components/tab-panel). Each tab must be slotted into the `nav` slot and its `panel` must refer to a tab panel of the same name.

```html preview
<sl-tab-group>
  <sl-tab slot="nav" panel="general">General</sl-tab>
  <sl-tab slot="nav" panel="custom">Custom</sl-tab>
  <sl-tab slot="nav" panel="advanced">Advanced</sl-tab>
  <sl-tab slot="nav" panel="disabled" disabled>Disabled</sl-tab>

  <sl-tab-panel name="general">This is the general tab panel.</sl-tab-panel>
  <sl-tab-panel name="custom">This is the custom tab panel.</sl-tab-panel>
  <sl-tab-panel name="advanced">This is the advanced tab panel.</sl-tab-panel>
  <sl-tab-panel name="disabled">This is a disabled tab panel.</sl-tab-panel>
</sl-tab-group>
```

```jsx react
import { SlTab, SlTabGroup, SlTabPanel } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlTabGroup>
    <SlTab slot="nav" panel="general">General</SlTab>
    <SlTab slot="nav" panel="custom">Custom</SlTab>
    <SlTab slot="nav" panel="advanced">Advanced</SlTab>
    <SlTab slot="nav" panel="disabled" disabled>Disabled</SlTab>

    <SlTabPanel name="general">This is the general tab panel.</SlTabPanel>
    <SlTabPanel name="custom">This is the custom tab panel.</SlTabPanel>
    <SlTabPanel name="advanced">This is the advanced tab panel.</SlTabPanel>
    <SlTabPanel name="disabled">This is a disabled tab panel.</SlTabPanel>
  </SlTabGroup>
);
```

## Examples

### Tabs on Bottom

Tabs can be shown on the bottom by setting `placement` to `bottom`.

```html preview
<sl-tab-group placement="bottom">
  <sl-tab slot="nav" panel="general">General</sl-tab>
  <sl-tab slot="nav" panel="custom">Custom</sl-tab>
  <sl-tab slot="nav" panel="advanced">Advanced</sl-tab>
  <sl-tab slot="nav" panel="disabled" disabled>Disabled</sl-tab>

  <sl-tab-panel name="general">This is the general tab panel.</sl-tab-panel>
  <sl-tab-panel name="custom">This is the custom tab panel.</sl-tab-panel>
  <sl-tab-panel name="advanced">This is the advanced tab panel.</sl-tab-panel>
  <sl-tab-panel name="disabled">This is a disabled tab panel.</sl-tab-panel>
</sl-tab-group>
```

```jsx react
import { SlTab, SlTabGroup, SlTabPanel } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlTabGroup placement="bottom">
    <SlTab slot="nav" panel="general">General</SlTab>
    <SlTab slot="nav" panel="custom">Custom</SlTab>
    <SlTab slot="nav" panel="advanced">Advanced</SlTab>
    <SlTab slot="nav" panel="disabled" disabled>Disabled</SlTab>

    <SlTabPanel name="general">This is the general tab panel.</SlTabPanel>
    <SlTabPanel name="custom">This is the custom tab panel.</SlTabPanel>
    <SlTabPanel name="advanced">This is the advanced tab panel.</SlTabPanel>
    <SlTabPanel name="disabled">This is a disabled tab panel.</SlTabPanel>
  </SlTabGroup>
);
```

### Tabs on Start

Tabs can be shown on the starting side by setting `placement` to `start`.

```html preview
<sl-tab-group placement="start">
  <sl-tab slot="nav" panel="general">General</sl-tab>
  <sl-tab slot="nav" panel="custom">Custom</sl-tab>
  <sl-tab slot="nav" panel="advanced">Advanced</sl-tab>
  <sl-tab slot="nav" panel="disabled" disabled>Disabled</sl-tab>

  <sl-tab-panel name="general">This is the general tab panel.</sl-tab-panel>
  <sl-tab-panel name="custom">This is the custom tab panel.</sl-tab-panel>
  <sl-tab-panel name="advanced">This is the advanced tab panel.</sl-tab-panel>
  <sl-tab-panel name="disabled">This is a disabled tab panel.</sl-tab-panel>
</sl-tab-group>
```


```jsx react
import { SlTab, SlTabGroup, SlTabPanel } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlTabGroup placement="start">
    <SlTab slot="nav" panel="general">General</SlTab>
    <SlTab slot="nav" panel="custom">Custom</SlTab>
    <SlTab slot="nav" panel="advanced">Advanced</SlTab>
    <SlTab slot="nav" panel="disabled" disabled>Disabled</SlTab>

    <SlTabPanel name="general">This is the general tab panel.</SlTabPanel>
    <SlTabPanel name="custom">This is the custom tab panel.</SlTabPanel>
    <SlTabPanel name="advanced">This is the advanced tab panel.</SlTabPanel>
    <SlTabPanel name="disabled">This is a disabled tab panel.</SlTabPanel>
  </SlTabGroup>
);
```

### Tabs on End

Tabs can be shown on the ending side by setting `placement` to `end`.

```html preview
<sl-tab-group placement="end">
  <sl-tab slot="nav" panel="general">General</sl-tab>
  <sl-tab slot="nav" panel="custom">Custom</sl-tab>
  <sl-tab slot="nav" panel="advanced">Advanced</sl-tab>
  <sl-tab slot="nav" panel="disabled" disabled>Disabled</sl-tab>

  <sl-tab-panel name="general">This is the general tab panel.</sl-tab-panel>
  <sl-tab-panel name="custom">This is the custom tab panel.</sl-tab-panel>
  <sl-tab-panel name="advanced">This is the advanced tab panel.</sl-tab-panel>
  <sl-tab-panel name="disabled">This is a disabled tab panel.</sl-tab-panel>
</sl-tab-group>
```


```jsx react
import { SlTab, SlTabGroup, SlTabPanel } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlTabGroup placement="end">
    <SlTab slot="nav" panel="general">General</SlTab>
    <SlTab slot="nav" panel="custom">Custom</SlTab>
    <SlTab slot="nav" panel="advanced">Advanced</SlTab>
    <SlTab slot="nav" panel="disabled" disabled>Disabled</SlTab>

    <SlTabPanel name="general">This is the general tab panel.</SlTabPanel>
    <SlTabPanel name="custom">This is the custom tab panel.</SlTabPanel>
    <SlTabPanel name="advanced">This is the advanced tab panel.</SlTabPanel>
    <SlTabPanel name="disabled">This is a disabled tab panel.</SlTabPanel>
  </SlTabGroup>
);
```

### Closable Tabs

Add the `closable` attribute to a tab to show a close button. This example shows how you can dynamically remove tabs from the DOM when the close button is activated.

```html preview
<sl-tab-group class="tabs-closable">
  <sl-tab slot="nav" panel="general">General</sl-tab>
  <sl-tab slot="nav" panel="closable-1" closable>Closable 1</sl-tab>
  <sl-tab slot="nav" panel="closable-2" closable>Closable 2</sl-tab>
  <sl-tab slot="nav" panel="closable-3" closable>Closable 3</sl-tab>

  <sl-tab-panel name="general">This is the general tab panel.</sl-tab-panel>
  <sl-tab-panel name="closable-1">This is the first closable tab panel.</sl-tab-panel>
  <sl-tab-panel name="closable-2">This is the second closable tab panel.</sl-tab-panel>
  <sl-tab-panel name="closable-3">This is the third closable tab panel.</sl-tab-panel>
</sl-tab-group>

<script>
  const tabGroup = document.querySelector('.tabs-closable');

  tabGroup.addEventListener('sl-close', async event => {
    const tab = event.target;
    const panel = tabGroup.querySelector(`sl-tab-panel[name="${tab.panel}"]`);

    // Show the previous tab if the tab is currently active
    if (tab.active) {
      tabGroup.show(tab.previousElementSibling.panel);
    }

    // Remove the tab + panel
    tab.remove();
    panel.remove();
  });
</script>
```

```jsx react
import { SlTab, SlTabGroup, SlTabPanel } from '@shoelace-style/shoelace/dist/react';

const App = () => {
  function handleClose(event) {
    //
    // This is a crude example that removes the tab and its panel from the DOM. 
    // There are better ways to manage tab creation/removal in React, but that
    // would significantly complicate the example.
    //
    const tab = event.target;
    const tabGroup = tab.closest('sl-tab-group');
    const tabPanel = tabGroup.querySelector(`[aria-labelledby="${tab.id}"]`);
    
    tab.remove();
    tabPanel.remove();
  }

  return (
    <SlTabGroup className="tabs-closable" onSlClose={handleClose}>
      <SlTab slot="nav" panel="general">General</SlTab>
      <SlTab slot="nav" panel="closable-1" closable onSlClose={handleClose}>Closable 1</SlTab>
      <SlTab slot="nav" panel="closable-2" closable onSlClose={handleClose}>Closable 2</SlTab>
      <SlTab slot="nav" panel="closable-3" closable onSlClose={handleClose}>Closable 3</SlTab>

      <SlTabPanel name="general">This is the general tab panel.</SlTabPanel>
      <SlTabPanel name="closable-1">This is the first closable tab panel.</SlTabPanel>
      <SlTabPanel name="closable-2">This is the second closable tab panel.</SlTabPanel>
      <SlTabPanel name="closable-3">This is the third closable tab panel.</SlTabPanel>
    </SlTabGroup>
  );
};
```

### Scrolling Tabs

When there are more tabs than horizontal space allows, the nav will be scrollable.

```html preview
<sl-tab-group>
  <sl-tab slot="nav" panel="tab-1">Tab 1</sl-tab>
  <sl-tab slot="nav" panel="tab-2">Tab 2</sl-tab>
  <sl-tab slot="nav" panel="tab-3">Tab 3</sl-tab>
  <sl-tab slot="nav" panel="tab-4">Tab 4</sl-tab>
  <sl-tab slot="nav" panel="tab-5">Tab 5</sl-tab>
  <sl-tab slot="nav" panel="tab-6">Tab 6</sl-tab>
  <sl-tab slot="nav" panel="tab-7">Tab 7</sl-tab>
  <sl-tab slot="nav" panel="tab-8">Tab 8</sl-tab>
  <sl-tab slot="nav" panel="tab-9">Tab 9</sl-tab>
  <sl-tab slot="nav" panel="tab-10">Tab 10</sl-tab>
  <sl-tab slot="nav" panel="tab-11">Tab 11</sl-tab>
  <sl-tab slot="nav" panel="tab-12">Tab 12</sl-tab>
  <sl-tab slot="nav" panel="tab-13">Tab 13</sl-tab>
  <sl-tab slot="nav" panel="tab-14">Tab 14</sl-tab>
  <sl-tab slot="nav" panel="tab-15">Tab 15</sl-tab>
  <sl-tab slot="nav" panel="tab-16">Tab 16</sl-tab>
  <sl-tab slot="nav" panel="tab-17">Tab 17</sl-tab>
  <sl-tab slot="nav" panel="tab-18">Tab 18</sl-tab>
  <sl-tab slot="nav" panel="tab-19">Tab 19</sl-tab>
  <sl-tab slot="nav" panel="tab-20">Tab 20</sl-tab>

  <sl-tab-panel name="tab-1">Tab panel 1</sl-tab-panel>
  <sl-tab-panel name="tab-2">Tab panel 2</sl-tab-panel>
  <sl-tab-panel name="tab-3">Tab panel 3</sl-tab-panel>
  <sl-tab-panel name="tab-4">Tab panel 4</sl-tab-panel>
  <sl-tab-panel name="tab-5">Tab panel 5</sl-tab-panel>
  <sl-tab-panel name="tab-6">Tab panel 6</sl-tab-panel>
  <sl-tab-panel name="tab-7">Tab panel 7</sl-tab-panel>
  <sl-tab-panel name="tab-8">Tab panel 8</sl-tab-panel>
  <sl-tab-panel name="tab-9">Tab panel 9</sl-tab-panel>
  <sl-tab-panel name="tab-10">Tab panel 10</sl-tab-panel>
  <sl-tab-panel name="tab-11">Tab panel 11</sl-tab-panel>
  <sl-tab-panel name="tab-12">Tab panel 12</sl-tab-panel>
  <sl-tab-panel name="tab-13">Tab panel 13</sl-tab-panel>
  <sl-tab-panel name="tab-14">Tab panel 14</sl-tab-panel>
  <sl-tab-panel name="tab-15">Tab panel 15</sl-tab-panel>
  <sl-tab-panel name="tab-16">Tab panel 16</sl-tab-panel>
  <sl-tab-panel name="tab-17">Tab panel 17</sl-tab-panel>
  <sl-tab-panel name="tab-18">Tab panel 18</sl-tab-panel>
  <sl-tab-panel name="tab-19">Tab panel 19</sl-tab-panel>
  <sl-tab-panel name="tab-20">Tab panel 20</sl-tab-panel>
</sl-tab-group>
```

```jsx react
import { SlTab, SlTabGroup, SlTabPanel } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlTabGroup>
    <SlTab slot="nav" panel="tab-1">Tab 1</SlTab>
    <SlTab slot="nav" panel="tab-2">Tab 2</SlTab>
    <SlTab slot="nav" panel="tab-3">Tab 3</SlTab>
    <SlTab slot="nav" panel="tab-4">Tab 4</SlTab>
    <SlTab slot="nav" panel="tab-5">Tab 5</SlTab>
    <SlTab slot="nav" panel="tab-6">Tab 6</SlTab>
    <SlTab slot="nav" panel="tab-7">Tab 7</SlTab>
    <SlTab slot="nav" panel="tab-8">Tab 8</SlTab>
    <SlTab slot="nav" panel="tab-9">Tab 9</SlTab>
    <SlTab slot="nav" panel="tab-10">Tab 10</SlTab>
    <SlTab slot="nav" panel="tab-11">Tab 11</SlTab>
    <SlTab slot="nav" panel="tab-12">Tab 12</SlTab>
    <SlTab slot="nav" panel="tab-13">Tab 13</SlTab>
    <SlTab slot="nav" panel="tab-14">Tab 14</SlTab>
    <SlTab slot="nav" panel="tab-15">Tab 15</SlTab>
    <SlTab slot="nav" panel="tab-16">Tab 16</SlTab>
    <SlTab slot="nav" panel="tab-17">Tab 17</SlTab>
    <SlTab slot="nav" panel="tab-18">Tab 18</SlTab>
    <SlTab slot="nav" panel="tab-19">Tab 19</SlTab>
    <SlTab slot="nav" panel="tab-20">Tab 20</SlTab>

    <SlTabPanel name="tab-1">Tab panel 1</SlTabPanel>
    <SlTabPanel name="tab-2">Tab panel 2</SlTabPanel>
    <SlTabPanel name="tab-3">Tab panel 3</SlTabPanel>
    <SlTabPanel name="tab-4">Tab panel 4</SlTabPanel>
    <SlTabPanel name="tab-5">Tab panel 5</SlTabPanel>
    <SlTabPanel name="tab-6">Tab panel 6</SlTabPanel>
    <SlTabPanel name="tab-7">Tab panel 7</SlTabPanel>
    <SlTabPanel name="tab-8">Tab panel 8</SlTabPanel>
    <SlTabPanel name="tab-9">Tab panel 9</SlTabPanel>
    <SlTabPanel name="tab-10">Tab panel 10</SlTabPanel>
    <SlTabPanel name="tab-11">Tab panel 11</SlTabPanel>
    <SlTabPanel name="tab-12">Tab panel 12</SlTabPanel>
    <SlTabPanel name="tab-13">Tab panel 13</SlTabPanel>
    <SlTabPanel name="tab-14">Tab panel 14</SlTabPanel>
    <SlTabPanel name="tab-15">Tab panel 15</SlTabPanel>
    <SlTabPanel name="tab-16">Tab panel 16</SlTabPanel>
    <SlTabPanel name="tab-17">Tab panel 17</SlTabPanel>
    <SlTabPanel name="tab-18">Tab panel 18</SlTabPanel>
    <SlTabPanel name="tab-19">Tab panel 19</SlTabPanel>
    <SlTabPanel name="tab-20">Tab panel 20</SlTabPanel>
  </SlTabGroup>
);
```

### Manual Activation

When focused, keyboard users can press <kbd>Left</kbd> or <kbd>Right</kbd> to select the desired tab. By default, the corresponding tab panel will be shown immediately (automatic activation). You can change this behavior by setting `activation="manual"` which will require the user to press <kbd>Space</kbd> or <kbd>Enter</kbd> before showing the tab panel (manual activation).

```html preview
<sl-tab-group activation="manual">
  <sl-tab slot="nav" panel="general">General</sl-tab>
  <sl-tab slot="nav" panel="custom">Custom</sl-tab>
  <sl-tab slot="nav" panel="advanced">Advanced</sl-tab>
  <sl-tab slot="nav" panel="disabled" disabled>Disabled</sl-tab>

  <sl-tab-panel name="general">This is the general tab panel.</sl-tab-panel>
  <sl-tab-panel name="custom">This is the custom tab panel.</sl-tab-panel>
  <sl-tab-panel name="advanced">This is the advanced tab panel.</sl-tab-panel>
  <sl-tab-panel name="disabled">This is a disabled tab panel.</sl-tab-panel>
</sl-tab-group>
```

```jsx react
import { SlTab, SlTabGroup, SlTabPanel } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlTabGroup activation="manual">
    <SlTab slot="nav" panel="general">General</SlTab>
    <SlTab slot="nav" panel="custom">Custom</SlTab>
    <SlTab slot="nav" panel="advanced">Advanced</SlTab>
    <SlTab slot="nav" panel="disabled" disabled>Disabled</SlTab>

    <SlTabPanel name="general">This is the general tab panel.</SlTabPanel>
    <SlTabPanel name="custom">This is the custom tab panel.</SlTabPanel>
    <SlTabPanel name="advanced">This is the advanced tab panel.</SlTabPanel>
    <SlTabPanel name="disabled">This is a disabled tab panel.</SlTabPanel>
  </SlTabGroup>
);
```

[component-metadata:sl-tab-group]
