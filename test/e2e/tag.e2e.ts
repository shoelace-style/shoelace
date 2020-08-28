import { newE2EPage } from '@stencil/core/testing';

const testContent = `
<sl-tag clearable>Tag</sl-input>
`;

describe('tag', () => {
  it('should emit slClear when cleared', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const tag = await page.find('sl-tag');
    const tagClear = await page.find('sl-tag >>> .tag__clear');

    const slClear = await tag.spyOnEvent('slClear');

    await tagClear.click();

    expect(slClear).toHaveReceivedEventTimes(1);
  });
});
