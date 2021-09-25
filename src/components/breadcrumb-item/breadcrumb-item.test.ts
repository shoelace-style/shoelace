import { expect, fixture, html } from '@open-wc/testing';

import '../../../dist/shoelace.js';
import type SlBreadcrumbItem from './breadcrumb-item';

describe('<sl-breadcrumb-item>', () => {
  let el: SlBreadcrumbItem;

  it('should render a component', async () => {
    const el = await fixture(html` <sl-breadcrumb-item></sl-breadcrumb-item> `);

    expect(el).to.exist;
  });

  describe('when provided an element in the slot "prefix" to support prefix icons', async () => {
    before(async () => {
      el = await fixture<SlBreadcrumbItem>(html`
        <sl-breadcrumb-item>
          <span class="prefix-example" slot="prefix">/</span>
          Home
        </sl-breadcrumb-item>
      `);
    });

    it('should render a component that passes accessibility test', async () => {
      await expect(el).to.be.accessible();
    });

    it('should accept as an assigned child in the shadow root', () => {
      const slot = <HTMLSlotElement>el.shadowRoot.querySelector('slot[name=prefix]');
      const childNodes = slot.assignedNodes({ flatten: true });

      expect(childNodes.length).to.eq(1);
    });
  });

  describe('when provided an element in the slot "suffix" to support suffix icons', async () => {
    before(async () => {
      el = await fixture<SlBreadcrumbItem>(html`
        <sl-breadcrumb-item>
          <span class="prefix-example" slot="suffix">/</span>
          Security
        </sl-breadcrumb-item>
      `);
    });

    it('should render a component that passes accessibility test', async () => {
      await expect(el).to.be.accessible();
    });

    it('should accept as an assigned child in the shadow root', () => {
      const slot = <HTMLSlotElement>el.shadowRoot.querySelector('slot[name=suffix]');
      const childNodes = slot.assignedNodes({ flatten: true });

      expect(childNodes.length).to.eq(1);
    });
  });
});
