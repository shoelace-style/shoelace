import { expect, fixture, html, waitUntil } from '@open-wc/testing';
// import sinon from 'sinon';

import '../../../dist/shoelace.js';
import type SlVisuallyHidden from './visually-hidden';

describe('<sl-visually-hidden>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-visually-hidden></sl-visually-hidden> `);

    expect(el).to.exist;
  });
});
