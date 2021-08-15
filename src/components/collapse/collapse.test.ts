import { expect, fixture, html, waitUntil } from '@open-wc/testing';
// import sinon from 'sinon';

import '../../../dist/shoelace.js';
import type SlCollapse from './collapse';

describe('<sl-collapse>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-collapse></sl-collapse> `);

    expect(el).to.exist;
  });
});
