---
meta:
  title: Spacing
  description: Spacing tokens are used to provide consistent spacing between content in your app.
toc: false
---

# Spacing

> Spacing tokens and classes are used to create consistent spacing between components and content. We use a base-4 progressive scale.

<sl-card class="token-style" style="margin-top: var(--ts-spacing-2x-large);">
  <div slot="header" class="token-style--header">
    <div>Example &amp; value</div>
    <div>Tailwind classes</div>
    <div>Figma variable</div>
    <div>Shoelace token</div>
  </div>
  <div class="token-style">
    <div><div class="spacing-demo" style="width: var(--sl-spacing-3x-small); height: var(--sl-spacing-3x-small); margin-bottom: var(--sl-spacing-x-small);"></div>
    <span style="font-weight: var(--ts-font-semibold);">0.125rem (2px)</span></div>
    <div><code>p-0.5</code>, <code>m-0.5</code>...</div>
    <div><code>3x-small</code></div>
    <div><code>--sl-spacing-3x-small</code></div>
  </div>
  <div class="token-style">
    <div><div class="spacing-demo" style="width: var(--sl-spacing-2x-small); height: var(--sl-spacing-2x-small); margin-bottom: var(--sl-spacing-x-small);"></div>
    <span style="font-weight: var(--ts-font-semibold);">0.25rem (4px)</span></div>
    <div><code>p-1</code>, <code>m-1</code>...</div>
    <div><code>2x-small</code></div>
    <div><code>--sl-spacing-2x-small</code></div>
  </div>
  <div class="token-style">
    <div><div class="spacing-demo" style="width: var(--sl-spacing-x-small); height: var(--sl-spacing-x-small); margin-bottom: var(--sl-spacing-x-small);"></div>
    <span style="font-weight: var(--ts-font-semibold);">0.5rem (8px)</span></div>
    <div><code>p-2</code>, <code>m-2</code>...</div>
    <div><code>x-small</code></div>
    <div><code>--sl-spacing-x-small</code></div>
  </div>
  <div class="token-style">
    <div><div class="spacing-demo" style="width: var(--sl-spacing-small); height: var(--sl-spacing-small); margin-bottom: var(--sl-spacing-x-small);"></div>
    <span style="font-weight: var(--ts-font-semibold);">0.75rem (12px)</span></div>
    <div><code>p-3</code>, <code>m-3</code>...</div>
    <div><code>small</code></div>
    <div><code>--sl-spacing-small</code></div>
  </div>
  <div class="token-style">
    <div><div class="spacing-demo" style="width: var(--sl-spacing-medium); height: var(--sl-spacing-medium); margin-bottom: var(--sl-spacing-x-small);"></div>
    <span style="font-weight: var(--ts-font-semibold);">1rem (16px)</span></div>
    <div><code>p-4</code>, <code>m-4</code>...</div>
    <div><code>medium</code></div>
    <div><code>--sl-spacing-medium</code></div>
  </div>
  <div class="token-style">
    <div><div class="spacing-demo" style="width: var(--sl-spacing-large); height: var(--sl-spacing-large); margin-bottom: var(--sl-spacing-x-small);"></div>
    <span style="font-weight: var(--ts-font-semibold);">1.25rem (20px)</span></div>
    <div><code>p-5</code>, <code>m-5</code>...</div>
    <div><code>large</code></div>
    <div><code>--sl-spacing-large</code></div>
  </div>
  <div class="token-style">
    <div><div class="spacing-demo" style="width: var(--ts-spacing-large); height: var(--ts-spacing-large); margin-bottom: var(--sl-spacing-x-small);"></div>
    <span style="font-weight: var(--ts-font-semibold);">1.5rem (24px)</span></div>
    <div><code>p-6</code>, <code>m-6</code>...</div>
    <div><code>ts-large</code></div>
    <div><code>--ts-spacing-large</code> (Shoelace <code>x-large</code> token is 28px and not in our scale)</div>
  </div>
  <div class="token-style">
    <div><div class="spacing-demo" style="width: var(--ts-spacing-2x-large); height: var(--ts-spacing-2x-large); margin-bottom: var(--sl-spacing-x-small);"></div>
    <span style="font-weight: var(--ts-font-semibold);">2rem (32px)</span></div>
    <div><code>p-8</code>, <code>m-8</code>...</div>
    <div><code>2x-large</code></div>
    <div><code>--ts-spacing-2x-large</code> (Shoelace <code>2x-large</code> token is 36px and not in our scale)</div>
  </div>
  <div class="token-style">
    <div><div class="spacing-demo" style="width: var(--sl-spacing-3x-large); height: var(--sl-spacing-3x-large); margin-bottom: var(--sl-spacing-x-small);"></div>
    <span style="font-weight: var(--ts-font-semibold);">3rem (48px)</span></div>
    <div><code>p-12</code>, <code>m-12</code>...</div>
    <div><code>3x-large</code></div>
    <div><code>--sl-spacing-3x-large</code></div>
  </div>
  <div class="token-style">
    <div><div class="spacing-demo" style="width: var(--ts-spacing-4x-large); height: var(--ts-spacing-4x-large); margin-bottom: var(--sl-spacing-x-small);"></div>
    <span style="font-weight: var(--ts-font-semibold);">4rem (64px)</span></div>
    <div><code>p-16</code>, <code>m-16</code>...</div>
    <div><code>4x-large</code></div>
    <div><code>--ts-spacing-4x-large</code> (Shoelace <code>4x-large</code> token is 72px and not in our scale)</div>
  </div>
  <div class="token-style">
    <div><div class="spacing-demo" style="width: var(--ts-spacing-5x-large); height: var(--ts-spacing-5x-large); margin-bottom: var(--sl-spacing-x-small);"></div>
    <span style="font-weight: var(--ts-font-semibold);">5rem (80px)</span></div>
    <div><code>p-20</code>, <code>m-20</code>...</div>
    <div><code>5x-large</code></div>
    <div><code>--ts-spacing-5x-large</code></div>
  </div>
</sl-card>
