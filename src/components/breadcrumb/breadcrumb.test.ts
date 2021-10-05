import { expect, fixture, html } from '@open-wc/testing';

import '../../../dist/shoelace.js';
import type SlBreadcrumb from './breadcrumb';

describe('<sl-breadcrumb>', () => {
  let el: SlBreadcrumb;

  describe('when provided a standard list of el-breadcrumb-item children and no parameters', async () => {
    before(async () => {
      el = await fixture<SlBreadcrumb>(html`
        <sl-breadcrumb>
          <sl-breadcrumb-item>Catalog</sl-breadcrumb-item>
          <sl-breadcrumb-item>Clothing</sl-breadcrumb-item>
          <sl-breadcrumb-item>Women's</sl-breadcrumb-item>
          <sl-breadcrumb-item>Shirts &amp; Tops</sl-breadcrumb-item>
        </sl-breadcrumb>
      `);
    });

    it('should render a component that passes accessibility test', async () => {
      await expect(el).to.be.accessible();
    });

    it('should render sl-icon as separator', async () => {
      expect(el.querySelectorAll('sl-icon').length).to.eq(4);
    });

    it('should attach aria-current "page" on the last breadcrumb item.', async () => {
      const breadcrumbItems = el.querySelectorAll('sl-breadcrumb-item');
      const lastNode = breadcrumbItems[3];
      expect(lastNode).attribute('aria-current', 'page');
    });
  });

  describe('when provided a standard list of el-breadcrumb-item children and an element in the slot "seperator" to support Custom Separators', async () => {
    before(async () => {
      el = await fixture<SlBreadcrumb>(html`
        <sl-breadcrumb>
          <span class="replacement-separator" slot="separator">/</span>
          <sl-breadcrumb-item>First</sl-breadcrumb-item>
          <sl-breadcrumb-item>Second</sl-breadcrumb-item>
          <sl-breadcrumb-item>Third</sl-breadcrumb-item>
        </sl-breadcrumb>
      `);
    });

    it('should render a component that passes accessibility test', async () => {
      await expect(el).to.be.accessible();
    });

    it('should accept "separator" as an assigned child in the shadow root', async () => {
      const slot = <HTMLSlotElement>el.shadowRoot.querySelector('slot[name=separator]');
      const childNodes = slot.assignedNodes({ flatten: true });

      expect(childNodes.length).to.eq(1);
    });

    it('should replace the sl-icon separator with the provided separator', async () => {
      expect(el.querySelectorAll('.replacement-separator').length).to.eq(4);
      expect(el.querySelectorAll('sl-icon').length).to.eq(0);
    });
  });

  describe('when provided a standard list of el-breadcrumb-item children and an element in the slot "prefix" to support prefix icons', async () => {
    before(async () => {
      el = await fixture<SlBreadcrumb>(html`
        <sl-breadcrumb>
          <sl-breadcrumb-item>
            <span class="prefix-example" slot="prefix">/</span>
            Home
          </sl-breadcrumb-item>
          <sl-breadcrumb-item>First</sl-breadcrumb-item>
          <sl-breadcrumb-item>Second</sl-breadcrumb-item>
          <sl-breadcrumb-item>Third</sl-breadcrumb-item>
        </sl-breadcrumb>
      `);
    });

    it('should render a component that passes accessibility test', async () => {
      await expect(el).to.be.accessible();
    });
  });

  describe('when provided a standard list of el-breadcrumb-item children and an element in the slot "suffix" to support suffix icons', async () => {
    before(async () => {
      el = await fixture<SlBreadcrumb>(html`
        <sl-breadcrumb>
          <sl-breadcrumb-item>First</sl-breadcrumb-item>
          <sl-breadcrumb-item>Second</sl-breadcrumb-item>
          <sl-breadcrumb-item>Third</sl-breadcrumb-item>
          <sl-breadcrumb-item>
            <span class="prefix-example" slot="suffix">/</span>
            Security
          </sl-breadcrumb-item>
        </sl-breadcrumb>
      `);
    });

    it('should render a component that passes accessibility test', async () => {
      await expect(el).to.be.accessible();
    });
  });
});
