---
meta:
  title: JSX
  description: Tips for using Shoelace in JSX.
---

# JSX Integration

Shoelace provides comprehensive JSX/TSX support with full TypeScript definitions. This makes it easy to use Shoelace components in any JSX-based framework like React (19+), Preact, or Solid.js.

## Installation

First, install Shoelace:

```bash
npm install @shoelace-style/shoelace
```

## TypeScript Setup

In order for teams to take advantage of this, all they need to do is import the types in their project. There are two ways to configure the JSX types:

### Add Types to Config

Add the types to your tsconfig.json:

```json
{
  "compilerOptions": {
    "types": ["@shoelace-style/shoelace/dist/types/jsx"]
  }
}
```

### Manual Type Extension

Alternatively, you can manually extend the JSX namespace in your own type definition file:

```tsx
// types/jsx.d.ts
import type { CustomElements } from '@shoelace-style/shoelace/dist/types/jsx';

// The module name is typically something like 'react', 'preact'
// or whatever the package name is that provides JSX support.
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements extends CustomElements {}
  }
}
```

## Basic Usage

Import the components you need and use them like any other JSX element:

```tsx
import '@shoelace-style/shoelace/dist/themes/light.css';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';

function App() {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <sl-card>
      <h2 slot="header">Welcome to Shoelace</h2>
      <p>This is a Shoelace card component used in JSX.</p>
      <sl-button variant="primary" size="medium" onClick={handleClick}>
        <sl-icon slot="prefix" name="star"></sl-icon>
        Star
      </sl-button>
    </sl-card>
  );
}
```

## Event Handling

Shoelace components emit custom events. The JSX types provide properly typed event handlers:

```tsx
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/select/select.js';

function FormComponent() {
  const handleInput = (event: Event) => {
    const input = event.target as HTMLInputElement;
    console.log('Input value:', input.value);
  };

  const handleChange = (event: CustomEvent) => {
    console.log('Selection changed:', event.detail.item.value);
  };

  return (
    <div>
      <sl-input placeholder="Type something..." onsl-input={handleInput} />

      <sl-select placeholder="Choose an option" onsl-change={handleChange}>
        <sl-option value="option1">Option 1</sl-option>
        <sl-option value="option2">Option 2</sl-option>
        <sl-option value="option3">Option 3</sl-option>
      </sl-select>
    </div>
  );
}
```

## Slots

Use the `slot` attribute to place content in named slots:

```tsx
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';

function DialogExample() {
  return (
    <sl-dialog label="Dialog Title" open>
      <p>This content goes in the default slot.</p>

      <sl-button slot="footer" variant="default">
        Cancel
      </sl-button>
      <sl-button slot="footer" variant="primary">
        Confirm
      </sl-button>
    </sl-dialog>
  );
}
```

## Type Safety

The JSX types provide full IntelliSense support and type checking:

```tsx
// ✅ Valid - all properties are properly typed
<sl-button
  variant="primary"    // Type: "default" | "primary" | "success" | "neutral" | "warning" | "danger" | "text"
  size="large"         // Type: "small" | "medium" | "large"
  disabled={false}     // Type: boolean
  loading={true}       // Type: boolean
/>

// ❌ Invalid - TypeScript will catch these errors
<sl-button
  variant="invalid"    // Error: Type '"invalid"' is not assignable
  size="huge"          // Error: Type '"huge"' is not assignable
  disabled="false"     // Error: Type 'string' is not assignable to type 'boolean'
/>
```
