# React

React [doesn't play nice](https://custom-elements-everywhere.com/#react) with custom elements, so Shoelace offers a React version of its components to provide an idiomatic experience for React users. You can easily toggle between HTML and React examples throughout the documentation.

## Installation

To add Shoelace to your React app, install the package from npm.

```bash
npm install @shoelace-style/shoelace
```

Next, [include a theme](/getting-started/themes) and set the [base path](/getting-started/installation#setting-the-base-path) for icons and other assets. In this example, we'll import the light theme and use the CDN as a base path.

```jsx
// App.jsx
import '@shoelace-style/shoelace/dist/themes/light.css';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path';

setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@%VERSION%/dist/');
```

?> If you'd rather not use the CDN for assets, you can create a [copy task](https://webpack.js.org/plugins/copy-webpack-plugin/) to copy `node_modules/@shoelace-style/shoelace/dist/assets` into your app's `public` directory. Then you can point the base path to that folder instead.

Now you can start using components!

## Importing Components

Every Shoelace component is available to import as a React component. Note that we're importing the `<SlButton>` _React component_ instead of the `<sl-button>` _custom element_ in the example below.

```jsx
import { SlButton } from '@shoelace-style/shoelace/dist/react';

const MyComponent = () => (
  <SlButton type="primary">
    Click me
  </SlButton>
);

export default MyComponent;
```

You can find a copy + paste import for every component at the bottom of each page in the documentation.

## Event Handling

Many Shoelace components emit [custom events](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent). For example, the [input component](/components/input) emits the `sl-input` event when it receives input. In React, you can listen for the event using `onSlInput`.

Here's how you can bind the input's value to a state variable.

```jsx
import { useState } from 'react';
import { SlInput } from '@shoelace-style/shoelace/dist/react';

function MyComponent() {
  const [value, setValue] = useState('');

  return (
    <SlInput 
      value={value} 
      onSlInput={event => setValue(event.target.value)} 
    />
  )
};

export default MyComponent;
```

If you're using TypeScript, it's important to note that `event.target` will be a reference to the underlying custom element. You can use `(event.target as any).value` as a quick fix, or you can strongly type the event target as shown below.

```tsx
import { useState } from 'react';
import { SlInput } from '@shoelace-style/shoelace/dist/react';
import type SlInputElement from '@shoelace-style/shoelace/dist/components/input/input';

function MyComponent() {
  const [value, setValue] = useState('');

  return (
    <SlInput 
      value={value} 
      onSlInput={event => setValue((event.target as SlInputElement).value)} 
    />
  )
};

export default MyComponent;
```
