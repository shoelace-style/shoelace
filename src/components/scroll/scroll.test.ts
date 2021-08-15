import { expect, fixture, html, waitUntil } from '@open-wc/testing';
// import sinon from 'sinon';

import '../../../dist/shoelace.js';
import type SlScroll from './scroll';

describe('<sl-scroll>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-scroll></sl-scroll> `);

    expect(el).to.exist;
  });
});
