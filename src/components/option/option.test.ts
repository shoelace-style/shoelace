import { expect, fixture, html } from '@open-wc/testing';

describe('<sl-option>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-option></sl-option> `);

    expect(el).to.exist;
  });
});
