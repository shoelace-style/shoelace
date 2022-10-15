import { expect, fixture, html } from '@open-wc/testing';
import type SlMenuLabel from './menu-label';

describe('<sl-menu-label>', () => {
  it('passes accessibility test', async () => {
    const el = await fixture<SlMenuLabel>(html` <sl-menu-label>Test</sl-menu-label> `);
    await expect(el).to.be.accessible();
  });
});
