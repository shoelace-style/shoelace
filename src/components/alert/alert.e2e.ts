import { newE2EPage } from '@stencil/core/testing';

describe('<sl-alert>', () => {
  it('should open when the open attribute is set', async () => {
    const page = await newE2EPage({
      html: `
        <sl-alert>This is an alert</sl-alert>
      `
    });
    const alert = await page.find('sl-alert');
    const base = await page.find('sl-alert >>> .alert');
    const slShow = await alert.spyOnEvent('sl-show');
    const slAfterShow = await alert.spyOnEvent('sl-after-show');

    expect(await base.isVisible()).toBe(false);

    const showEventHappened = alert.waitForEvent('sl-after-show');
    alert.setAttribute('open', '');
    await page.waitForChanges();
    await showEventHappened;

    expect(await base.isVisible()).toBe(true);
    expect(slShow).toHaveReceivedEventTimes(1);
    expect(slAfterShow).toHaveReceivedEventTimes(1);
  });

  it('should close when the open attribute is removed', async () => {
    const page = await newE2EPage({
      html: `
        <sl-alert open>This is an alert</sl-alert>
      `
    });
    const alert = await page.find('sl-alert');
    const base = await page.find('sl-alert >>> .alert');
    const slHide = await alert.spyOnEvent('sl-hide');
    const slAfterHide = await alert.spyOnEvent('sl-after-hide');

    expect(await base.isVisible()).toBe(true);

    const hideEventHappened = alert.waitForEvent('sl-after-hide');
    alert.removeAttribute('open');
    await page.waitForChanges();
    await hideEventHappened;

    expect(await base.isVisible()).toBe(false);
    expect(slHide).toHaveReceivedEventTimes(1);
    expect(slAfterHide).toHaveReceivedEventTimes(1);
  });

  it('should open with the show() method', async () => {
    const page = await newE2EPage({
      html: `
        <sl-alert>This is an alert</sl-alert>
      `
    });
    const alert = await page.find('sl-alert');
    const base = await page.find('sl-alert >>> .alert');
    const slShow = await alert.spyOnEvent('sl-show');
    const slAfterShow = await alert.spyOnEvent('sl-after-show');

    expect(await base.isVisible()).toBe(false);

    const showEventHappened = alert.waitForEvent('sl-after-show');
    await alert.callMethod('show');
    await showEventHappened;

    expect(await base.isVisible()).toBe(true);
    expect(slShow).toHaveReceivedEventTimes(1);
    expect(slAfterShow).toHaveReceivedEventTimes(1);
  });

  it('should close with the hide() method', async () => {
    const page = await newE2EPage({
      html: `
        <sl-alert open>This is an alert</sl-alert>
      `
    });
    const alert = await page.find('sl-alert');
    const base = await page.find('sl-alert >>> .alert');
    const slHide = await alert.spyOnEvent('sl-hide');
    const slAfterHide = await alert.spyOnEvent('sl-after-hide');

    expect(await base.isVisible()).toBe(true);

    const hideEventHappened = alert.waitForEvent('sl-after-hide');
    await alert.callMethod('hide');
    await hideEventHappened;

    expect(await base.isVisible()).toBe(false);
    expect(slHide).toHaveReceivedEventTimes(1);
    expect(slAfterHide).toHaveReceivedEventTimes(1);
  });
});
