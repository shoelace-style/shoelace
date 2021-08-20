import { expect, fixture, html, waitUntil } from '@open-wc/testing';
// import sinon from 'sinon';

import '../../../dist/shoelace.js';
import type SlSplitter from './splitter';

describe('<sl-splitter>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-splitter></sl-splitter> `);

    expect(el).to.exist;
  });
});
