import { expect, fixture, html, waitUntil } from '@open-wc/testing';
// import sinon from 'sinon';

import '../../../dist/shoelace.js';
import type SlOrgTree from './org-tree';

describe('<sl-org-tree>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-org-tree></sl-org-tree> `);

    expect(el).to.exist;
  });
});
