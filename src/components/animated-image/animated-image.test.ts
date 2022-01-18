import { expect, fixture, html } from '@open-wc/testing';

describe('<sl-animated-image>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-animated-image></sl-animated-image> `);

    expect(el).to.exist;
  });
});
