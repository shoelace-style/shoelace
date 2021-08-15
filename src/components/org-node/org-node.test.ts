import { expect, fixture, html, waitUntil } from '@open-wc/testing';
// import sinon from 'sinon';

import '../../../dist/shoelace.js';
import type SlOrgNode from './org-node';

describe('<sl-org-node>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-org-node></sl-org-node> `);

    expect(el).to.exist;
  });
});
