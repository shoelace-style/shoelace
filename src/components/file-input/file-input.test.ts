import { expect, fixture, html } from '@open-wc/testing';

describe('<sl-file-input>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-file-input></sl-file-input> `);

    expect(el).to.exist;
  });
});
