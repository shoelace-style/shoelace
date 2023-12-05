---
meta:
  title: Border Radius
  description: Border radius tokens are used to give sharp edges a more subtle, rounded effect.
toc: false
---

# Border radius

> Border radius tokens and classes are used to give sharp edges a more subtle, rounded effect.

<sl-card class="token-style" style="margin-top: var(--ts-spacing-2x-large);">
  <div slot="header" class="token-style--header">
    <div>Example, value &amp; usage</div>
    <div>Tailwind class</div>
    <div>Figma variable</div>
    <div>Shoelace token</div>
  </div>
  <div class="token-style">
    <div><div class="border-radius-demo" style="border-radius: var(--ts-border-radius-x-small); width: 6rem; margin-bottom: var(--sl-spacing-small);"></div>
    <div style="font-weight: var(--ts-font-semibold)">0.25rem (4px)</div>
    <div>Used for small elements like checkbox, tag, tooltip</div>
  </div>
    <div><code>rounded</code></div>
    <div><code>x-small</code></div>
    <div><code>--ts-border-radius-x-small</code></div>
  </div>
  <div class="token-style">
    <div><div class="border-radius-demo" style="border-radius: var(--ts-border-radius-small); width: 6rem; margin-bottom: var(--sl-spacing-small);"></div>
    <div style="font-weight: var(--ts-font-semibold)">0.375rem (6px)</div>
    <div>Used for small inputs only</div>
  </div>
    <div><code>rounded-md</code></div>
    <div><code>small</code></div>
    <div><code>--ts-border-radius-small</code></div>
  </div>
  <div class="token-style">
    <div><div class="border-radius-demo" style="border-radius: var(--sl-border-radius-large); width: 6rem; margin-bottom: var(--sl-spacing-small);"></div>
    <div style="font-weight: var(--ts-font-semibold)">0.5rem (8px)</div>
    <div>Used for larger elements like cards, inputs, selects</div>
  </div>
    <div><code>rounded-lg</code></div>
    <div><code>large</code></div>
    <div><code>--sl-border-radius-large</code></div>
  </div>
  <div class="token-style">
    <div><div class="border-radius-demo" style="border-radius: var(--sl-border-radius-x-large); width: 6rem; margin-bottom: var(--sl-spacing-small);"></div>
    <div style="font-weight: var(--ts-font-semibold)">1rem (16px)</div>
    <div>Used for dialog (modal) only</div>
  </div>
    <div><code>rounded-2xl</code></div>
    <div><code>x-large</code></div>
    <div><code>--sl-border-radius-x-large</code></div>
  </div>
  <div class="token-style">
    <div><div class="border-radius-demo" style="border-radius: var(--sl-border-radius-pill); width: 6rem; margin-bottom: var(--sl-spacing-small);"></div>
    <div style="font-weight: var(--ts-font-semibold)">9999px</div>
    <div>Used for pill shaped elements like the button</div>
  </div>
    <div><code>rounded-full</code></div>
    <div><code>pill</code></div>
    <div><code>--sl-border-radius-pill</code></div>
  </div>
</sl-card>
