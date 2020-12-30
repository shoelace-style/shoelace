import { newE2EPage } from '@stencil/core/testing';

describe('<sl-details>', () => {
  it('should open and close when summary is clicked', async () => {
    const page = await newE2EPage({
      html: `
        <sl-details summary="Toggle Me">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </sl-details>
      `
    });
    const details = await page.find('sl-details');
    const header = await page.find('sl-details >>> header');
    const base = await page.find('sl-details >>> .details__body');

    let style = await base.getComputedStyle();
    expect(style.height).toBe('0px');

    const showEventHappened = details.waitForEvent('sl-after-show');
    await header.click();
    await showEventHappened;
    style = await base.getComputedStyle();
    expect(style.height).not.toBe('0px');

    const hideEventHappened = details.waitForEvent('sl-after-hide');
    await header.click();
    await hideEventHappened;
    style = await base.getComputedStyle();
    expect(style.height).toBe('0px');
  });

  it('should open and close with the show() and hide() methods', async () => {
    const page = await newE2EPage({
      html: `
        <sl-details summary="Toggle Me">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </sl-details>
      `
    });
    const details = await page.find('sl-details');
    const base = await page.find('sl-details >>> .details__body');

    let style = await base.getComputedStyle();
    expect(style.height).toBe('0px');

    const showEventHappened = details.waitForEvent('sl-after-show');
    await details.callMethod('show');
    await showEventHappened;
    style = await base.getComputedStyle();
    expect(style.height).not.toBe('0px');

    const hideEventHappened = details.waitForEvent('sl-after-hide');
    await details.callMethod('hide');
    await hideEventHappened;
    style = await base.getComputedStyle();
    expect(style.height).toBe('0px');
  });

  it('should open and close when the open attribute is added and removed', async () => {
    const page = await newE2EPage({
      html: `
        <sl-details summary="Toggle Me">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </sl-details>
      `
    });
    const details = await page.find('sl-details');
    const base = await page.find('sl-details >>> .details__body');

    let style = await base.getComputedStyle();
    expect(style.height).toBe('0px');

    const showEventHappened = details.waitForEvent('sl-after-show');
    details.setAttribute('open', '');
    await page.waitForChanges();
    await showEventHappened;
    style = await base.getComputedStyle();
    expect(style.height).not.toBe('0px');

    const hideEventHappened = details.waitForEvent('sl-after-hide');
    details.removeAttribute('open');
    await page.waitForChanges();
    await hideEventHappened;
    style = await base.getComputedStyle();
    expect(style.height).toBe('0px');
  });

  it('should emit sl-show and sl-after-show events when opened', async () => {
    const page = await newE2EPage({
      html: `
        <sl-details summary="Toggle Me">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </sl-details>
      `
    });
    const details = await page.find('sl-details');
    const slShow = await details.spyOnEvent('sl-show');
    const slAfterShow = await details.spyOnEvent('sl-after-show');
    const showEventHappened = details.waitForEvent('sl-after-show');

    await details.callMethod('show');
    await showEventHappened;

    expect(slShow).toHaveReceivedEventTimes(1);
    expect(slAfterShow).toHaveReceivedEventTimes(1);
  });

  it('should emit sl-hide and sl-after-hide events when closed', async () => {
    const page = await newE2EPage({
      html: `
        <sl-details summary="Toggle Me" open>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </sl-details>
      `
    });
    const details = await page.find('sl-details');
    const slHide = await details.spyOnEvent('sl-hide');
    const slAfterHide = await details.spyOnEvent('sl-after-hide');
    const hideEventHappened = details.waitForEvent('sl-after-hide');

    await details.callMethod('hide');
    await hideEventHappened;

    expect(slHide).toHaveReceivedEventTimes(1);
    expect(slAfterHide).toHaveReceivedEventTimes(1);
  });
});
