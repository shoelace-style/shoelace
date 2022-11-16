import { expect, fixture, html } from '@open-wc/testing';

describe('<sl-popup>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-popup></sl-popup> `);

    expect(el).to.exist;
  });
});
