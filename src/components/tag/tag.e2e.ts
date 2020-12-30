import { newE2EPage } from '@stencil/core/testing';

describe('<sl-tag>', () => {
  it('should emit sl-clear when cleared', async () => {
    const page = await newE2EPage({
      html: `
        <sl-tag clearable>Tag</sl-input>
      `
    });
    const tag = await page.find('sl-tag');
    const tagClear = await page.find('sl-tag >>> .tag__clear');
    const slClear = await tag.spyOnEvent('sl-clear');

    await tagClear.click();

    expect(slClear).toHaveReceivedEventTimes(1);
  });
});
