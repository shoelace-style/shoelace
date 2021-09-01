import { expect, fixture, html, waitUntil } from '@open-wc/testing';
// import sinon from 'sinon';

import '../../../dist/shoelace.js';
import type SlBreadcrumbItem from './breadcrumb-item';

describe('<sl-breadcrumb-item>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-breadcrumb-item></sl-breadcrumb-item> `);

    expect(el).to.exist;
  });
});
