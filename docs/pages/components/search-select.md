---
meta:
  title: Search Select
  description: Search selects combine a text field with a dropdown of options—ideal for remote search and async filtering.
layout: component
---

```html:preview
<sl-search-select placeholder="Type to filter…">
  <sl-option value="apple">Apple</sl-option>
  <sl-option value="banana">Banana</sl-option>
  <sl-option value="cherry">Cherry</sl-option>
</sl-search-select>
```

```jsx:react
import SlOption from '@shoelace-style/shoelace/dist/react/option';
import SlSearchSelect from '@shoelace-style/shoelace/dist/react/search-select';

const App = () => (
  <SlSearchSelect placeholder="Type to filter…">
    <SlOption value="apple">Apple</SlOption>
    <SlOption value="banana">Banana</SlOption>
    <SlOption value="cherry">Cherry</SlOption>
  </SlSearchSelect>
);
```

:::tip
This component works with standard `<form>` elements. Please refer to the section on [form controls](/getting-started/form-controls) to learn more about form submission and client-side validation.
:::

:::warning
`<sl-search-select>` is **experimental**. It shares the same visual styles as [`<sl-select>`](/components/select) but only supports a single string `value` and is always “searchable”—use it when you mainly need typing + async options rather than the full select feature set.
:::

## Examples

### Labels & help text

```html:preview
<sl-search-select
  label="Pick a fruit"
  help-text="Results can be loaded asynchronously while you type."
  placeholder="Search…"
>
  <sl-option value="apple">Apple</sl-option>
  <sl-option value="orange">Orange</sl-option>
</sl-search-select>
```

```jsx:react
import SlOption from '@shoelace-style/shoelace/dist/react/option';
import SlSearchSelect from '@shoelace-style/shoelace/dist/react/search-select';

const App = () => (
  <SlSearchSelect
    label="Pick a fruit"
    help-text="Results can be loaded asynchronously while you type."
    placeholder="Search…"
  >
    <SlOption value="apple">Apple</SlOption>
    <SlOption value="orange">Orange</SlOption>
  </SlSearchSelect>
);
```

### Clearable

```html:preview
<sl-search-select placeholder="Select or type…" clearable value="beta">
  <sl-option value="alpha">Alpha</sl-option>
  <sl-option value="beta">Beta</sl-option>
  <sl-option value="gamma">Gamma</sl-option>
</sl-search-select>
```

```jsx:react
import SlOption from '@shoelace-style/shoelace/dist/react/option';
import SlSearchSelect from '@shoelace-style/shoelace/dist/react/search-select';

const App = () => (
  <SlSearchSelect placeholder="Select or type…" clearable value="beta">
    <SlOption value="alpha">Alpha</SlOption>
    <SlOption value="beta">Beta</SlOption>
    <SlOption value="gamma">Gamma</SlOption>
  </SlSearchSelect>
);
```

### Filtering a fixed list

Define a fixed array of `{ value, label }` objects, render `<sl-option>` elements from that data, and on each `sl-input` re-run the filter and re-render the options. Listen to `sl-after-show` as well so the list is rebuilt when the menu opens again (for example after `searchQuery` was cleared on close).

```html:preview
<sl-search-select id="search-select-fixed-list-demo" placeholder="Filter..."></sl-search-select>
<script>
  const DEV_TEAM = [
    { value: 'brendan', label: 'Brendan Eich (JavaScript)' },
    { value: 'ryan', label: 'Ryan Dahl (Node.js)' },
    { value: 'anders', label: 'Anders Hejlsberg (TypeScript)' },
    { value: 'dennis', label: 'Dennis Ritchie (C)' },
    { value: 'bjarne', label: 'Bjarne Stroustrup (C++)' },
    { value: 'niklaus', label: 'Niklaus Wirth (Pascal)' },
    { value: 'jose', label: 'José Valim (Elixir)' },
    { value: 'james', label: 'James Gosling (Java)' },
    { value: 'joe', label: 'Joe Armstrong (Erlang)' },
    { value: 'guido', label: 'Guido van Rossum (Python)' },
  ];

  function customFilter(query) {
    const q = (query || '').trim().toLowerCase();
    return q === '' ? DEV_TEAM : DEV_TEAM.filter(option => option.label.toLowerCase().includes(q));
  }

  function renderOptions(selectElement, options) {
    selectElement.replaceChildren();
    for (const option of options) {
      const opt = document.createElement('sl-option');
      opt.value = option.value;
      opt.textContent = option.label;
      selectElement.appendChild(opt);
    }
  }

  Promise.all([customElements.whenDefined('sl-search-select'), customElements.whenDefined('sl-option')]).then(() => {
    const selectElement = document.getElementById('search-select-fixed-list-demo');
    if (!selectElement) return;

    function syncOptions() {
      renderOptions(selectElement, customFilter(selectElement.searchQuery));
    }

    selectElement.addEventListener('sl-input', syncOptions);
    selectElement.addEventListener('sl-after-show', syncOptions);
    syncOptions();
  });
</script>
```

```jsx:react
import { useMemo, useState } from 'react';
import SlOption from '@shoelace-style/shoelace/dist/react/option';
import SlSearchSelect from '@shoelace-style/shoelace/dist/react/search-select';

const DEV_TEAM = [
  { value: 'brendan', label: 'Brendan Eich (JavaScript)' },
  { value: 'ryan', label: 'Ryan Dahl (Node.js)' },
  { value: 'anders', label: 'Anders Hejlsberg (TypeScript)' },
  { value: 'dennis', label: 'Dennis Ritchie (C)' },
  { value: 'bjarne', label: 'Bjarne Stroustrup (C++)' },
  { value: 'niklaus', label: 'Niklaus Wirth (Pascal)' },
  { value: 'jose', label: 'José Valim (Elixir)' },
  { value: 'james', label: 'James Gosling (Java)' },
  { value: 'joe', label: 'Joe Armstrong (Erlang)' },
  { value: 'guido', label: 'Guido van Rossum (Python)' },
];

const App = () => {
  const [query, setQuery] = useState('');

  const options = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q === '' ? DEV_TEAM : DEV_TEAM.filter(option => option.label.toLowerCase().includes(q));
  }, [query]);

  return (
    <SlSearchSelect
      placeholder="Filter..."
      onSlInput={event => setQuery(event.target.searchQuery)}
    >
      {options.map(option => (
        <SlOption key={option.value} value={option.value}>
          {option.label}
        </SlOption>
      ))}
    </SlSearchSelect>
  );
};
```

### Async filtering

Listen to `sl-input` and update the default slot (or swap `<sl-option>` nodes) when your API returns. The typed string is available as `event.target.searchQuery` on the host element.

```html
<sl-search-select id="async-example" placeholder="Search users…">
  <sl-option value="1">Jane Doe</sl-option>
  <sl-option value="2">John Smith</sl-option>
</sl-search-select>
<script>
  const el = document.getElementById('async-example');
  el.addEventListener('sl-input', () => {
    const q = el.searchQuery;
    // fetch(`/api/users?q=${encodeURIComponent(q)}`) … then replace options
    console.log('searchQuery:', q);
  });
</script>
```

## Search query vs. value

- **`searchQuery`** — current text in the field while the user types (use for filtering).
- **`value`** — committed option value after the user picks an item (or `''` when cleared).

When the menu closes, the control restores the display from the selection and clears `searchQuery`; listen to `sl-input` if you need to reset remote results.
