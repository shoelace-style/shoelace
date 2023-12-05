---
meta:
  title: Elevation
  description: Elevation tokens are used to give elements the appearance of being raised off the page.
toc: false
---

# Elevation

> Elevation tokens and styles are used to give elements the appearance of being raised off the page. This adds a sense of depth to the UI and gives users cues for how to interact with elements on the page.

<sl-card class="token-style" style="margin-top: var(--ts-spacing-2x-large);">
  <div slot="header" class="token-style--header">
    <div>Example &amp; value</div>
    <div>Usage</div>
    <div>Figma effect style</div>
    <div>Shoelace token</div>
  </div>
  <div class="token-style">
    <div><div class="elevation-demo" style="box-shadow: var(--ts-shadow-x-small); border: 1px solid var(--ts-color-gray-300); margin-bottom: var(--ts-spacing-large);"></div>
    <span><code>box-shadow: 0 0 4px 0 rgb(0 0 0 / 0.04)</code></span></div>
    <div>Used for cards and details (collapsible card), combined with <code>gray 300</code> border</div>
    <div><code>ts-shadow-x-small</code></div>
    <div><code>--ts-shadow-x-small</code></div>
  </div>
  <div class="token-style">
    <div><div class="elevation-demo" style="box-shadow: var(--ts-shadow-small); border: 1px solid var(--ts-color-gray-400); margin-bottom: var(--ts-spacing-large);"></div>
    <span><code>box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05)</code></span></div>
    <div>Used for inputs, selects, dropdowns, with <code>gray 400</code> border</div>
    <div><code>ts-shadow-small</code></div>
    <div><code>--ts-shadow-small</code></div>
  </div>
  <div class="token-style">
    <div><div class="elevation-demo" style="box-shadow: var(--ts-shadow-medium); border: 1px solid var(--ts-color-gray-300); margin-bottom: var(--ts-spacing-large);"></div>
    <span><code>box-shadow: 0 8px 10px -6px rgb(0 0 0 / 0.1)</code></span></div>
    <div>Used for toast alerts</div>
    <div><code>ts-shadow-medium</code></div>
    <div><code>--ts-shadow-medium</code></div>
  </div>
  <div class="token-style">
    <div><div class="elevation-demo" style="box-shadow: var(--ts-shadow-large); border: 1px solid var(--ts-color-gray-300); margin-bottom: var(--ts-spacing-large);"></div>
    <span><code>box-shadow: 0 4px 6px -4px rgb(0 0 0 / 0.1),<br /> 0 10px 15px -3px<br /> rgb(0 0 0 / 0.1)</code></span></div>
    <div>Used for dropdown and select menu panels</div>
    <div><code>ts-shadow-large</code></div>
    <div><code>--ts-shadow-large</code></div>
  </div>
  <div class="token-style">
    <div><div class="elevation-demo" style="box-shadow: var(--ts-shadow-x-large); border: 1px solid var(--ts-color-gray-300); margin-bottom: var(--ts-spacing-large);"></div>
    <span><code>box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25)</code></span></div>
    <div>Used for dialogs (modals)</div>
    <div><code>ts-shadow-x-large</code></div>
    <div><code>--ts-shadow-x-large</code></div>
  </div>
</sl-card>
