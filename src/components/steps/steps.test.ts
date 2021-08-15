import { expect, fixture, html, waitUntil } from '@open-wc/testing';
// import sinon from 'sinon';

import '../../../dist/shoelace.js';
import type SlSteps from './steps';

describe('<sl-steps>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-steps></sl-steps> `);

    expect(el).to.exist;
  });
});
