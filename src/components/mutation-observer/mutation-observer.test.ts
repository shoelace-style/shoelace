import { expect, fixture, html } from '@open-wc/testing';

describe('<sl-mutation-observer>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-mutation-observer></sl-mutation-observer> `);

    expect(el).to.exist;
  });
});
