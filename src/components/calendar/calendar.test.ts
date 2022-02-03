import { expect, fixture, html, waitUntil } from '@open-wc/testing';

describe('<sl-calendar>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-calendar></sl-calendar> `);

    expect(el).to.exist;
  });
});
