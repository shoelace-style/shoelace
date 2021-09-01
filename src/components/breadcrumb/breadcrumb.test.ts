import { expect, fixture, html, waitUntil } from '@open-wc/testing';
// import sinon from 'sinon';

import '../../../dist/shoelace.js';
import type SlBreadcrumb from './breadcrumb';

describe('<sl-breadcrumb>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-breadcrumb></sl-breadcrumb> `);

    expect(el).to.exist;
  });
});
