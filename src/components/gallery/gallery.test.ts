import { expect, fixture, html, waitUntil } from '@open-wc/testing';
// import sinon from 'sinon';

import '../../../dist/shoelace.js';
import type SlGallery from './gallery';

describe('<sl-gallery>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-gallery></sl-gallery> `);

    expect(el).to.exist;
  });
});
