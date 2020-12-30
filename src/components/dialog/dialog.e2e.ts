import { newE2EPage } from '@stencil/core/testing';

describe('<sl-dialog>', () => {
  it('should open when the open attribute added', async () => {
    const page = await newE2EPage({
      html: `
        <sl-dialog>This is a dialog.</sl-dialog>
      `
    });
    const dialog = await page.find('sl-dialog');
    const base = await page.find('sl-dialog >>> .dialog');
    const slShow = await dialog.spyOnEvent('sl-show');
    const slAfterShow = await dialog.spyOnEvent('sl-after-show');

    expect(await base.isVisible()).toBe(false);

    const showEventHappened = dialog.waitForEvent('sl-after-show');
    dialog.setAttribute('open', '');
    await page.waitForChanges();
    await showEventHappened;

    expect(await base.isVisible()).toBe(true);
    expect(slShow).toHaveReceivedEventTimes(1);
    expect(slAfterShow).toHaveReceivedEventTimes(1);
  });

  it('should close when the open attribute is removed', async () => {
    const page = await newE2EPage({
      html: `
        <sl-dialog open>This is a dialog.</sl-dialog>
      `
    });
    const dialog = await page.find('sl-dialog');
    const base = await page.find('sl-dialog >>> .dialog');
    const slHide = await dialog.spyOnEvent('sl-hide');
    const slAfterHide = await dialog.spyOnEvent('sl-after-hide');

    expect(await base.isVisible()).toBe(true);

    const hideEventHappened = dialog.waitForEvent('sl-after-hide');
    dialog.removeAttribute('open');
    await page.waitForChanges();
    await hideEventHappened;

    expect(await base.isVisible()).toBe(false);
    expect(slHide).toHaveReceivedEventTimes(1);
    expect(slAfterHide).toHaveReceivedEventTimes(1);
  });

  it('should open when the show() method is called', async () => {
    const page = await newE2EPage({
      html: `
        <sl-dialog>This is a dialog.</sl-dialog>
      `
    });
    const dialog = await page.find('sl-dialog');
    const base = await page.find('sl-dialog >>> .dialog');
    const slShow = await dialog.spyOnEvent('sl-show');
    const slAfterShow = await dialog.spyOnEvent('sl-after-show');

    expect(await base.isVisible()).toBe(false);

    const showEventHappened = dialog.waitForEvent('sl-after-show');
    await dialog.callMethod('show');
    await showEventHappened;

    expect(await base.isVisible()).toBe(true);
    expect(slShow).toHaveReceivedEventTimes(1);
    expect(slAfterShow).toHaveReceivedEventTimes(1);
  });

  it('should close when the hide() method is called', async () => {
    const page = await newE2EPage({
      html: `
        <sl-dialog open>This is a dialog.</sl-dialog>
      `
    });
    const dialog = await page.find('sl-dialog');
    const base = await page.find('sl-dialog >>> .dialog');
    const slHide = await dialog.spyOnEvent('sl-hide');
    const slAfterHide = await dialog.spyOnEvent('sl-after-hide');

    expect(await base.isVisible()).toBe(true);

    const hideEventHappened = dialog.waitForEvent('sl-after-hide');
    await dialog.callMethod('hide');
    await hideEventHappened;

    expect(await base.isVisible()).toBe(false);
    expect(slHide).toHaveReceivedEventTimes(1);
    expect(slAfterHide).toHaveReceivedEventTimes(1);
  });

  it('should emit sl-overlay-dismiss when the overlay is clicked', async () => {
    const page = await newE2EPage({
      html: `
        <sl-dialog open>This is a dialog.</sl-dialog>
      `
    });
    const dialog = await page.find('sl-dialog');
    const slOverlayDismiss = await dialog.spyOnEvent('sl-overlay-dismiss');

    // We can't use the click method on the overlay since the click is in the middle, which will be behind the panel
    await page.mouse.click(0, 0);
    await page.waitForChanges();

    expect(slOverlayDismiss).toHaveReceivedEventTimes(1);
  });
});
