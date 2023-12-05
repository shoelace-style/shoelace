---
meta:
  title: Typography
---

# Typography

> Inter is our brand typeface. It arranges information with a balance of light and strong weights.

## Type styles

### Applying the styles

<div class="panel-content">
  <div>Styles can be applied using a <code>.ts-<em>{style-name}</em></code> class. The classes are composed with Tailwind utility classes and are defined in this <a href="https://github.com/teamshares/shared-ui/blob/main/scss/includes/_typography.scss" class="ts-text-link" target="_blank">_typography.scss</a> file.</div>
</div>

```html:preview
<div class="ts-heading-1">Heading 1</div>
<div class="ts-heading-2">Heading 2</div>
<div class="ts-heading-3">Heading 3</div>
<div class="ts-heading-4">Heading 4</div>
<div class="ts-heading-5">Heading 5</div>
<div class="ts-heading-6">Heading 6</div>
<div class="ts-heading-7">Heading 7</div>
<div class="ts-heading-8">Heading 8</div>
<div class="ts-subheading">Subheading</div>
<div class="ts-body-large">Body large</div>
<div class="ts-body-1">Body 1</div>
<div class="ts-body-2">Body 2</div>
<div class="ts-body-3">Body 3</div>
```

```pug:slim
.ts-heading-1 Heading 1
.ts-heading-2 Heading 2
.ts-heading-3 Heading 3
.ts-heading-4 Heading 4
.ts-heading-5 Heading 5
.ts-heading-6 Heading 6
.ts-heading-7 Heading 7
.ts-heading-8 Heading 8
.ts-subheading Subheading
.ts-body-large Body large
.ts-body-1 Body 1
.ts-body-2 Body 2
.ts-body-3 Body 3
```

  <div class="panel-content">
    <h3>Style specs</h3>
    <div>The following are font size, line height, font weight, and letter spacing specs for the type styles with their <strong>Tailwind utility class</strong> and <strong>Shoelace custom token</strong> equivalents: </div>
    <h4>ts-heading-1</h4>
    <sl-card class="text-style">
      <div slot="header">
        <div class="ts-heading-1">Make things better</div>
        <code>.ts-heading-1</code>
      </div>
      <div class="text-specs">
        <div class="text-attr">Font size</div>
        <div>72px (4.5rem)</div>
        <div><code>.text-7xl</code></div>
        <div><code>--ts-font-7xl</code></div>
      </div>
      <div class="text-specs">
        <div class="text-attr">Line height (leading)</div>
        <div>72px (4.5rem)</div>
        <div><code>.leading-none</code></div>
        <div><code>--ts-leading-none</code></div>
      </div>
      <div class="text-specs">
        <div class="text-attr">Font weight</div>
        <div>700</div>
        <div><code>.font-bold</code></div>
        <div><code>--ts-font-bold</code></div>
      </div>
      <div class="text-specs">
        <div class="text-attr">Letter spacing (tracking)</div>
        <div>-0.025em</div>
        <div><code>.tracking-tight</code></div>
        <div><code>--ts-tracking-tight</code></div>
      </div>
    </sl-card>
  <h4>ts-heading-2</h4>  
    <sl-card class="text-style">
      <div slot="header">
        <div class="ts-heading-2">Make things better</div>
        <code>.ts-heading-2</code>
      </div>
      <div class="text-specs">
        <div class="text-attr">Font size</div>
        <div>60px (3.75rem)</div>
        <div><code>.text-6xl</code></div>
        <div><code>--ts-font-6xl</code></div>
      </div>
      <div class="text-specs">
        <div class="text-attr">Line height (leading)</div>
        <div>60px (3.75rem)</div>
        <div><code>.leading-none</code></div>
        <div><code>--ts-leading-none</code></div>
      </div>
      <div class="text-specs">
        <div class="text-attr">Font weight</div>
        <div>700</div>
        <div><code>.font-bold</code></div>
        <div><code>--ts-font-bold</code></div>
      </div>
      <div class="text-specs">
        <div class="text-attr">Letter spacing (tracking)</div>
        <div>-0.025em</div>
        <div><code>.tracking-tight</code></div>
        <div><code>--ts-tracking-tight</code></div>
      </div>
    </sl-card>
  <h4>ts-heading-3</h4>  
    <sl-card class="text-style">
      <div slot="header">
        <div class="ts-heading-3">Make things better</div>
        <code>.ts-heading-3</code>
      </div>
      <div class="text-specs">
        <div class="text-attr">Font size</div>
        <div>48px (3rem)</div>
        <div><code>.text-5xl</code></div>
        <div><code>--ts-font-5xl</code></div>
      </div>
      <div class="text-specs">
        <div class="text-attr">Line height (leading)</div>
        <div>48px (3rem)</div>
        <div><code>.leading-none</code></div>
        <div><code>--ts-leading-none</code></div>
      </div>
      <div class="text-specs">
        <div class="text-attr">Font weight</div>
        <div>700</div>
        <div><code>.font-bold</code></div>
        <div><code>--ts-font-bold</code></div>
      </div>
      <div class="text-specs">
        <div class="text-attr">Letter spacing (tracking)</div>
        <div>-0.025em</div>
        <div><code>.tracking-tight</code></div>
        <div><code>--ts-tracking-tight</code></div>
      </div>
    </sl-card>
  <h4>ts-heading-4</h4>  
    <sl-card class="text-style">
      <div slot="header">
        <div class="ts-heading-4">Make things better</div>
        <code>.ts-heading-4</code>
      </div>
      <div class="text-specs">
        <div class="text-attr">Font size</div>
        <div>36px (2.25rem)</div>
        <div><code>.text-4xl</code></div>
        <div><code>--ts-font-4xl</code></div>
      </div>
      <div class="text-specs">
        <div class="text-attr">Line height (leading)</div>
        <div>125%</div>
        <div><code>.leading-tight</code></div>
        <div><code>--ts-leading-tight</code></div>
      </div>
      <div class="text-specs">
        <div class="text-attr">Font weight</div>
        <div>700</div>
        <div><code>.font-bold</code></div>
        <div><code>--ts-font-bold</code></div>
      </div>
      <div class="text-specs">
        <div class="text-attr">Letter spacing (tracking)</div>
        <div>-0.025em</div>
        <div><code>.tracking-tight</code></div>
        <div><code>--ts-tracking-tight</code></div>
      </div>
    </sl-card>
  <h4>ts-heading-5</h4>  
    <sl-card class="text-style">
      <div slot="header">
        <div class="ts-heading-5">Make things better</div>
        <code>.ts-heading-5</code>
      </div>
      <div class="text-specs">
        <div class="text-attr">Font size</div>
        <div>24px (1.5rem)</div>
        <div><code>.text-2xl</code></div>
        <div><code>--ts-font-2xl</code></div>
      </div>
      <div class="text-specs">
        <div class="text-attr">Line height (leading)</div>
        <div>28px (1.75rem)</div>
        <div><code>.leading-7</code></div>
        <div><code>--ts-leading-7</code></div>
      </div>
      <div class="text-specs">
        <div class="text-attr">Font weight</div>
        <div>700</div>
        <div><code>.font-bold</code></div>
        <div><code>--ts-font-bold</code></div>
      </div>
      <div class="text-specs">
        <div class="text-attr">Letter spacing (tracking)</div>
        <div>-0.025em</div>
        <div><code>.tracking-tight</code></div>
        <div><code>--ts-tracking-tight</code></div>
      </div>
    </sl-card>
  <h4>ts-heading-6</h4>  
    <sl-card class="text-style">
      <div slot="header">
        <div class="ts-heading-6">Make things better</div>
        <code>.ts-heading-6</code>
      </div>
      <div class="text-specs">
        <div class="text-attr">Font size</div>
        <div>20px (1.25rem)</div>
        <div><code>.text-xl</code></div>
        <div><code>--ts-font-xl</code></div>
      </div>
      <div class="text-specs">
        <div class="text-attr">Line height (leading)</div>
        <div>24px (1.5rem)</div>
        <div><code>.leading-6</code></div>
        <div><code>--ts-leading-6</code></div>
      </div>
      <div class="text-specs">
        <div class="text-attr">Font weight</div>
        <div>500</div>
        <div><code>.font-medium</code></div>
        <div><code>--ts-font-medium</code></div>
      </div>
      <div class="text-specs">
        <div class="text-attr">Letter spacing (tracking)</div>
        <div>-0.025em</div>
        <div><code>.tracking-tight</code></div>
        <div><code>--ts-tracking-tight</code></div>
      </div>
    </sl-card>
  <h4>ts-heading-7</h4>  
    <sl-card class="text-style">
      <div slot="header">
        <div class="ts-heading-7">Make things better</div>
        <code>.ts-heading-7</code>
      </div>
      <div class="text-specs">
        <div class="text-attr">Font size</div>
        <div>16px (1rem)</div>
        <div><code>.text-base</code></div>
        <div><code>--ts-font-base</code></div>
      </div>
      <div class="text-specs">
        <div class="text-attr">Line height (leading)</div>
        <div>20px (1.25rem)</div>
        <div><code>.leading-5</code></div>
        <div><code>--ts-leading-5</code></div>
      </div>
      <div class="text-specs">
        <div class="text-attr">Font weight</div>
        <div>600</div>
        <div><code>.font-semibold</code></div>
        <div><code>--ts-font-semibold</code></div>
      </div>
      <div class="text-specs">
        <div class="text-attr">Letter spacing (tracking)</div>
        <div>-0.025em</div>
        <div><code>.tracking-tight</code></div>
        <div><code>--ts-tracking-tight</code></div>
      </div>
    </sl-card>
  <h4>ts-heading-8</h4>  
    <sl-card class="text-style">
      <div slot="header">
        <div class="ts-heading-8">Make things better</div>
        <code>.ts-heading-8</code>
      </div>
      <div class="text-specs">
        <div class="text-attr">Font size</div>
        <div>14px (0.875rem)</div>
        <div><code>.text-sm</code></div>
        <div><code>--ts-font-sm</code></div>
      </div>
      <div class="text-specs">
        <div class="text-attr">Line height (leading)</div>
        <div>20px (1.25rem)</div>
        <div><code>.leading-5</code></div>
        <div><code>--ts-leading-5</code></div>
      </div>
      <div class="text-specs">
        <div class="text-attr">Font weight</div>
        <div>600</div>
        <div><code>.font-semibold</code></div>
        <div><code>--ts-font-semibold</code></div>
      </div>
      <div class="text-specs">
        <div class="text-attr">Letter spacing (tracking)</div>
        <div>-0.025em</div>
        <div><code>.tracking-tight</code></div>
        <div><code>--ts-tracking-tight</code></div>
      </div>
    </sl-card>
  <h4>ts-subheading</h4>  
    <sl-card class="text-style">
      <div slot="header">
        <div class="ts-subheading">Make things better</div>
        <code>.ts-subheading</code>
      </div>
      <div class="text-specs">
        <div class="text-attr">Font size</div>
        <div>12px (0.75rem)</div>
        <div><code>.text-xs</code></div>
        <div><code>--ts-font-xs</code></div>
      </div>
      <div class="text-specs">
        <div class="text-attr">Line height (leading)</div>
        <div>16px (1rem)</div>
        <div><code>.leading-4</code></div>
        <div><code>--ts-leading-4</code></div>
      </div>
      <div class="text-specs">
        <div class="text-attr">Font weight</div>
        <div>600</div>
        <div><code>.font-semibold</code></div>
        <div><code>--ts-font-semibold</code></div>
      </div>
      <div class="text-specs">
        <div class="text-attr">Letter spacing (tracking)</div>
        <div>normal</div>
        <div><code>.tracking-normal</code></div>
        <div><code>--ts-tracking-normal</code></div>
      </div>
      <div class="text-specs">
        <div class="text-attr">Text transform</div>
        <div>uppercase</div>
        <div><code>.uppercase</code></div>
        <div><em>No token for this attribute</em></div>
      </div>
    </sl-card>
  <h4>ts-body-large</h4>  
    <sl-card class="text-style">
      <div slot="header">
        <div class="ts-body-large">Teamshares is an employee ownership platform for small business, driven by proprietary software, education, and financial products.</div>
        <code>.ts-body-large</code>
      </div>
      <div class="text-specs">
        <div class="text-attr">Font size</div>
        <div>20px (1.25rem)</div>
        <div><code>.text-xl</code></div>
        <div><code>--ts-font-xl</code></div>
      </div>
      <div class="text-specs">
        <div class="text-attr">Line height (leading)</div>
        <div>28px (1.75rem)</div>
        <div><code>.leading-7</code></div>
        <div><code>--ts-leading-7</code></div>
      </div>
      <div class="text-specs">
        <div class="text-attr">Font weight</div>
        <div>400</div>
        <div><code>.font-normal</code></div>
        <div><code>--ts-font-normal</code></div>
      </div>
      <div class="text-specs">
        <div class="text-attr">Letter spacing (tracking)</div>
        <div>normal</div>
        <div><code>.tracking-normal</code></div>
        <div><code>--ts-tracking-normal</code></div>
      </div>
    </sl-card>
  <h4>ts-body-1</h4>  
    <sl-card class="text-style">
      <div slot="header">
        <div class="ts-body-1">Teamshares is an employee ownership platform for small business, driven by proprietary software, education, and financial products.</div>
        <code>.ts-body-1</code>
      </div>
      <div class="text-specs">
        <div class="text-attr">Font size</div>
        <div>16px (1rem)</div>
        <div><code>.text-base</code></div>
        <div><code>--ts-font-base</code></div>
      </div>
      <div class="text-specs">
        <div class="text-attr">Line height (leading)</div>
        <div>24px (1.5rem)</div>
        <div><code>.leading-6</code></div>
        <div><code>--ts-leading-6</code></div>
      </div>
      <div class="text-specs">
        <div class="text-attr">Font weight</div>
        <div>400</div>
        <div><code>.font-normal</code></div>
        <div><code>--ts-font-normal</code></div>
      </div>
      <div class="text-specs">
        <div class="text-attr">Letter spacing (tracking)</div>
        <div>normal</div>
        <div><code>.tracking-normal</code></div>
        <div><code>--ts-tracking-normal</code></div>
      </div>
    </sl-card>
  <h4>ts-body-2</h4>  
    <sl-card class="text-style">
      <div slot="header">
        <div class="ts-body-2">Teamshares is an employee ownership platform for small business, driven by proprietary software, education, and financial products.</div>
        <code>.ts-body-2</code>
      </div>
      <div class="text-specs">
        <div class="text-attr">Font size</div>
        <div>14px (0.875rem)</div>
        <div><code>.text-sm</code></div>
        <div><code>--ts-font-sm</code></div>
      </div>
      <div class="text-specs">
        <div class="text-attr">Line height (leading)</div>
        <div>20px (1.25rem)</div>
        <div><code>.leading-5</code></div>
        <div><code>--ts-leading-5</code></div>
      </div>
      <div class="text-specs">
        <div class="text-attr">Font weight</div>
        <div>400</div>
        <div><code>.font-normal</code></div>
        <div><code>--ts-font-normal</code></div>
      </div>
      <div class="text-specs">
        <div class="text-attr">Letter spacing (tracking)</div>
        <div>normal</div>
        <div><code>.tracking-normal</code></div>
        <div><code>--ts-tracking-normal</code></div>
      </div>
    </sl-card>
  <h4>ts-body-3</h4>  
    <sl-card class="text-style">
      <div slot="header">
        <div class="ts-body-3">Teamshares is an employee ownership platform for small business, driven by proprietary software, education, and financial products.</div>
        <code>.ts-body-3</code>
      </div>
      <div class="text-specs">
        <div class="text-attr">Font size</div>
        <div>12px (0.75rem)</div>
        <div><code>.text-xs</code></div>
        <div><code>--ts-font-xs</code></div>
      </div>
      <div class="text-specs">
        <div class="text-attr">Line height (leading)</div>
        <div>16px (1rem)</div>
        <div><code>.leading-4</code></div>
        <div><code>--ts-leading-4</code></div>
      </div>
      <div class="text-specs">
        <div class="text-attr">Font weight</div>
        <div>400</div>
        <div><code>.font-normal</code></div>
        <div><code>--ts-font-normal</code></div>
      </div>
      <div class="text-specs">
        <div class="text-attr">Letter spacing (tracking)</div>
        <div>normal</div>
        <div><code>.tracking-normal</code></div>
        <div><code>--ts-tracking-normal</code></div>
      </div>
    </sl-card>
  </div>

## Using Inter

  <div class="panel-content">
  <h3>Download Inter</h3>
  <div>Download Inter for use locally in Figma files, etc. at <a href="https://rsms.me/inter/" target="_blank" class="ts-text-link">https://rsms.me/inter/</a>.</div>
  
  <h3>Prototype with Inter</h3>
  <div>To prototype with Inter, use the links available on Google Fonts at <a href="https://fonts.google.com/specimen/Inter" target="_blank" class="ts-text-link">https://fonts.google.com/specimen/Inter</a>.</div>
  </div>
