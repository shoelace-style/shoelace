import { expect, fixture, html } from '@open-wc/testing';

describe('<sl-split-panel>', () => {
  it('should render a component', async () => {
    const splitPanel = await fixture(html` <sl-split-panel></sl-split-panel> `);

    expect(splitPanel).to.exist;
  });

  it('should be accessible', async () => {
    const splitPanel = await fixture(html`<sl-split-panel>
      <div slot="start">Start</div>
      <div slot="end">End</div>
    </sl-split-panel>`);

    await expect(splitPanel).to.be.accessible();
  });
});
