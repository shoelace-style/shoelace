import '../../../dist/shoelace.js';
import { expect, fixture, html } from '@open-wc/testing';

describe('<sl-carousel-item>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-carousel-item></sl-carousel-item> `);

    expect(el).to.exist;
  });

  it('should pass accessibility tests', async () => {
    // Arrange
    const el = await fixture(html` <div role="list"><sl-carousel-item></sl-carousel-item></div> `);

    // Assert
    await expect(el).to.be.accessible();
  });
});
