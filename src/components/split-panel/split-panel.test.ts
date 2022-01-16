import { expect, fixture, html } from '@open-wc/testing';

describe('<sl-split-panel>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-split-panel></sl-split-panel> `);

    expect(el).to.exist;
  });
});
