import { expect, fixture, html, waitUntil } from '@open-wc/testing';
// import sinon from 'sinon';

import '../../../dist/shoelace.js';
import type SlContextMenu from './context-menu';

describe('<sl-context-menu>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-context-menu></sl-context-menu> `);

    expect(el).to.exist;
  });
});
