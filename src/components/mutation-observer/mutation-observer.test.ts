import { expect, fixture, html, waitUntil } from '@open-wc/testing';
// import sinon from 'sinon';

import '../../../dist/shoelace.js';
import type SlMutationObserver from './mutation-observer';

describe('<sl-mutation-observer>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-mutation-observer></sl-mutation-observer> `);

    expect(el).to.exist;
  });
});
