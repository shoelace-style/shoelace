import { expect, fixture, html, waitUntil } from '@open-wc/testing';
// import sinon from 'sinon';

import '../../../dist/shoelace.js';
import type SlSplitPanel from './split-panel';

describe('<sl-split-panel>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-split-panel></sl-split-panel> `);

    expect(el).to.exist;
  });
});
