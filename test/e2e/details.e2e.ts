import { newE2EPage } from '@stencil/core/testing';

const testContentStartClosed = `
<sl-details summary="Toggle Me">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
  aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
</sl-details>
`;

const testContentStartOpen = `
<sl-details summary="Toggle Me" open>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
  aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
</sl-details>
`;

describe('details', () => {
  it('should open/close when summary clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentStartClosed);

    const detailsHeader = await page.find('sl-details >>> header');
    const detailsBase = await page.find('sl-details >>> .details__body');

    let style = await detailsBase.getComputedStyle();
    expect(style.height).toBe('0px');

    await detailsHeader.click();
    await detailsBase.waitForEvent('transitionend');

    style = await detailsBase.getComputedStyle();
    expect(style.height).not.toBe('0px');

    await detailsHeader.click();
    await detailsBase.waitForEvent('transitionend');

    style = await detailsBase.getComputedStyle();
    expect(style.height).toBe('0px');
  });

  it('should open/close with the show/hide methods', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentStartClosed);

    const details = await page.find('sl-details');
    const detailsBase = await page.find('sl-details >>> .details__body');

    let style = await detailsBase.getComputedStyle();
    expect(style.height).toBe('0px');

    await details.callMethod('show');
    await detailsBase.waitForEvent('transitionend');

    style = await detailsBase.getComputedStyle();
    expect(style.height).not.toBe('0px');

    await details.callMethod('hide');
    await detailsBase.waitForEvent('transitionend');

    style = await detailsBase.getComputedStyle();
    expect(style.height).toBe('0px');
  });

  it('should open/close with the open attribute added/removed', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentStartClosed);

    const details = await page.find('sl-details');
    const detailsBase = await page.find('sl-details >>> .details__body');

    let style = await detailsBase.getComputedStyle();
    expect(style.height).toBe('0px');

    details.setAttribute('open', '');
    await page.waitForChanges();
    await detailsBase.waitForEvent('transitionend');

    style = await detailsBase.getComputedStyle();
    expect(style.height).not.toBe('0px');

    details.removeAttribute('open');
    await page.waitForChanges();
    await detailsBase.waitForEvent('transitionend');

    style = await detailsBase.getComputedStyle();
    expect(style.height).toBe('0px');
  });

  it('should emit slShow and slAfterShow events when opened', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentStartClosed);

    const details = await page.find('sl-details');
    const detailsBase = await page.find('sl-details >>> .details__body');
    const slShow = await details.spyOnEvent('slShow');
    const slAfterShow = await details.spyOnEvent('slAfterShow');

    await details.callMethod('show');
    expect(slShow).toHaveReceivedEventTimes(1);

    await detailsBase.waitForEvent('transitionend');
    expect(slAfterShow).toHaveReceivedEventTimes(1);
  });

  it('should emit slHide and slAfterHide events when details is closed', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentStartOpen);

    const details = await page.find('sl-details');
    const detailsBase = await page.find('sl-details >>> .details__body');
    const slHide = await details.spyOnEvent('slHide');
    const slAfterHide = await details.spyOnEvent('slAfterHide');

    await details.callMethod('hide');
    expect(slHide).toHaveReceivedEventTimes(1);

    await detailsBase.waitForEvent('transitionend');
    expect(slAfterHide).toHaveReceivedEventTimes(1);
  });
});
