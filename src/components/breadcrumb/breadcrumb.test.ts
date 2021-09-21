import { expect, fixture, html } from '@open-wc/testing';
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

    it('should render a component that passes accessibility test', async () => {
      await expect(el).to.be.accessible();
    });

    // it('should render the child content provided', async () => {
    //   expect(el.innerText).to.eq('Badge');
    // });

    // it('should default to square styling, with the primary color', async () => {
    //   const part = el.shadowRoot?.querySelector('[part="base"]') as HTMLElement;
    //   expect(part.classList.value).to.eq('badge badge--primary');
    // });
  });
});
