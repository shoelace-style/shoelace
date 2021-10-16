import { expect, fixture, html, waitUntil } from '@open-wc/testing';
// import sinon from 'sinon';

import '../../../dist/shoelace.js';
import type SlAnimatedImage from './animated-image';

describe('<sl-animated-image>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-animated-image></sl-animated-image> `);

    expect(el).to.exist;
  });
});
