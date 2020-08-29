import { newE2EPage } from '@stencil/core/testing';

const testContentStartClosed = `
<sl-dialog label="Dialog" class="dialog-overview">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  <sl-button slot="footer" type="primary">Close</sl-button>
</sl-dialog>
`;

const testContentStartOpen = `
<sl-dialog label="Dialog" class="dialog-overview" open>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  <sl-button slot="footer" type="primary">Close</sl-button>
</sl-dialog>
`;

describe('dialog', () => {
  it('should open/close with the show/hide methods', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentStartClosed);

    const dialog = await page.find('sl-dialog');
    const dialogBase = await page.find('sl-dialog >>> .dialog');

    expect(await dialogBase.isVisible()).toBe(false);

    const showEventHappened = dialog.waitForEvent('slAfterShow');
    await dialog.callMethod('show');

    await showEventHappened;

    expect(await dialogBase.isVisible()).toBe(true);

    const hideEventHappened = dialog.waitForEvent('slAfterHide');
    await dialog.callMethod('hide');

    await hideEventHappened;

    expect(await dialogBase.isVisible()).toBe(false);
  });

  it('should open/close with the open attribute added/removed', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentStartClosed);

    const dialog = await page.find('sl-dialog');
    const dialogBase = await page.find('sl-dialog >>> .dialog');

    expect(await dialogBase.isVisible()).toBe(false);

    const showEventHappened = dialog.waitForEvent('slAfterShow');
    dialog.setAttribute('open', '');
    await page.waitForChanges();

    await showEventHappened;

    expect(await dialogBase.isVisible()).toBe(true);

    const hideEventHappened = dialog.waitForEvent('slAfterHide');
    dialog.removeAttribute('open');
    await page.waitForChanges();

    await hideEventHappened;

    expect(await dialogBase.isVisible()).toBe(false);
  });

  it('should emit slShow and slAfterShow events when dialog is opened', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentStartClosed);

    const dialog = await page.find('sl-dialog');
    const slShow = await dialog.spyOnEvent('slShow');
    const slAfterShow = await dialog.spyOnEvent('slAfterShow');

    const showEventHappened = dialog.waitForEvent('slAfterShow');
    await dialog.callMethod('show');

    await showEventHappened;

    expect(slShow).toHaveReceivedEventTimes(1);
    expect(slAfterShow).toHaveReceivedEventTimes(1);
  });

  it('should emit slHide and slAfterHide events when dialog is closed', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentStartOpen);

    const dialog = await page.find('sl-dialog');
    const slHide = await dialog.spyOnEvent('slHide');
    const slAfterHide = await dialog.spyOnEvent('slAfterHide');

    const hideEventHappened = dialog.waitForEvent('slAfterHide');
    await dialog.callMethod('hide');

    await hideEventHappened;

    expect(slHide).toHaveReceivedEventTimes(1);
    expect(slAfterHide).toHaveReceivedEventTimes(1);
  });

  it('should emit the slOverlayDismiss event when overlay is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentStartOpen);

    const dialog = await page.find('sl-dialog');
    const slOverlayDismiss = await dialog.spyOnEvent('slOverlayDismiss');

    // can't use click method on overlay element since is always clicks in
    // the middle of an element which in this case will be behind the panel
    await page.mouse.click(0, 0);
    await page.waitForChanges();
    expect(slOverlayDismiss).toHaveReceivedEventTimes(1);
  });
});
