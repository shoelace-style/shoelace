import { expect, fixture, html, waitUntil } from '@open-wc/testing';
// import sinon from 'sinon';

import '../../../dist/shoelace.js';
import type SlTreeNode from './tree-node';

describe('<sl-tree-node>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-tree-node></sl-tree-node> `);

    expect(el).to.exist;
  });
});
