import { newE2EPage } from '@stencil/core/testing';

const testContentStartClosed = `
<sl-alert>
  <sl-icon slot="icon" name="info-circle"></sl-icon>
  This is a standard alert. You can customize its content and even the icon.
</sl-alert>
`;

const testContentStartOpen = `
<sl-alert open>
  <sl-icon slot="icon" name="info-circle"></sl-icon>
  This is a standard alert. You can customize its content and even the icon.
</sl-alert>>
`;

describe('alert', () => {
  it('should open/close with the show/hide methods', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentStartClosed);

    const alert = await page.find('sl-alert');
    const alertBase = await page.find('sl-alert >>> .alert');

    expect(await alertBase.isVisible()).toBe(false);

    const showEventHappened = alert.waitForEvent('slAfterShow');
    await alert.callMethod('show');

    await showEventHappened;

    expect(await alertBase.isVisible()).toBe(true);

    const hideEventHappened = alert.waitForEvent('slAfterHide');
    await alert.callMethod('hide');

    await hideEventHappened;

    expect(await alertBase.isVisible()).toBe(false);
  });

  it('should open/close with the open attribute added/removed', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentStartClosed);

    const alert = await page.find('sl-alert');
    const alertBase = await page.find('sl-alert >>> .alert');

    expect(await alertBase.isVisible()).toBe(false);

    const showEventHappened = alert.waitForEvent('slAfterShow');
    alert.setAttribute('open', '');
    await page.waitForChanges();

    await showEventHappened;

    expect(await alertBase.isVisible()).toBe(true);

    const hideEventHappened = alert.waitForEvent('slAfterHide');
    alert.removeAttribute('open');
    await page.waitForChanges();

    await hideEventHappened;

    expect(await alertBase.isVisible()).toBe(false);
  });

  it('should emit slShow and slAfterShow events when alert is opened', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentStartClosed);

    const alert = await page.find('sl-alert');
    const slShow = await alert.spyOnEvent('slShow');
    const slAfterShow = await alert.spyOnEvent('slAfterShow');

    const showEventHappened = alert.waitForEvent('slAfterShow');
    await alert.callMethod('show');

    await showEventHappened;

    expect(slShow).toHaveReceivedEventTimes(1);
    expect(slAfterShow).toHaveReceivedEventTimes(1);
  });

  it('should emit slHide and slAfterHide events when alert is closed', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentStartOpen);

    const alert = await page.find('sl-alert');
    const slHide = await alert.spyOnEvent('slHide');
    const slAfterHide = await alert.spyOnEvent('slAfterHide');

    const hideEventHappened = alert.waitForEvent('slAfterHide');
    await alert.callMethod('hide');

    await hideEventHappened;

    expect(slHide).toHaveReceivedEventTimes(1);
    expect(slAfterHide).toHaveReceivedEventTimes(1);
  });
});
