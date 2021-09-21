import { expect, fixture, html, waitUntil } from '@open-wc/testing';
// import sinon from 'sinon';

import '../../../dist/shoelace.js';
import type SlBreadcrumb from './breadcrumb';

describe('<sl-breadcrumb>', () => {
  let el;

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

    it.only('should render sl-icon as separator', async () => {
      expect(el.querySelectorAll('sl-icon').length).to.eq(4);
    });
  });

  describe('when provided a standard list of el-breadcrumb-item children and an element in the slot "seperator"', async () => {
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

    it('should replace the sl-icon separator with the provided separator', async () => {
      expect(el.querySelectorAll('.replacement-separator').length).to.eq(4);
      expect(el.querySelectorAll('sl-icon').length).to.eq(0);
    });
  });
});
