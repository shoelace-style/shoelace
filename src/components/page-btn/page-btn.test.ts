import { expect, fixture, html, waitUntil } from '@open-wc/testing';
// import sinon from 'sinon';

import '../../../dist/shoelace.js';
import type SlPageBtn from './page-btn';

describe('<sl-page-btn>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-page-btn></sl-page-btn> `);

    expect(el).to.exist;
  });
});
