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
    const dialogPanel = await page.find('sl-dialog >>> .dialog__panel');

    expect(await dialogBase.isVisible()).toBe(false);

    await dialog.callMethod('show');
    await dialogPanel.waitForEvent('transitionend');
    expect(await dialogBase.isVisible()).toBe(true);

    await dialog.callMethod('hide');
    await dialogPanel.waitForEvent('transitionend');
    expect(await dialogBase.isVisible()).toBe(false);
  });

  it('should open/close with the open attribute added/removed', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentStartClosed);

    const dialog = await page.find('sl-dialog');
    const dialogBase = await page.find('sl-dialog >>> .dialog');
    const dialogPanel = await page.find('sl-dialog >>> .dialog__panel');

    expect(await dialogBase.isVisible()).toBe(false);

    dialog.setAttribute('open', '');
    await page.waitForChanges();
    await dialogPanel.waitForEvent('transitionend');
    expect(await dialogBase.isVisible()).toBe(true);

    dialog.removeAttribute('open');
    await page.waitForChanges();
    await dialogPanel.waitForEvent('transitionend');
    expect(await dialogBase.isVisible()).toBe(false);
  });

  it('should emit slShow and slAfterShow events when dialog is opened', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentStartClosed);

    const dialog = await page.find('sl-dialog');
    const dialogPanel = await page.find('sl-dialog >>> .dialog__panel');
    const slShow = await dialog.spyOnEvent('slShow');
    const slAfterShow = await dialog.spyOnEvent('slAfterShow');

    await dialog.callMethod('show');
    expect(slShow).toHaveReceivedEventTimes(1);

    await dialogPanel.waitForEvent('transitionend');
    expect(slAfterShow).toHaveReceivedEventTimes(1);
  });

  it('should emit slHide and slAfterHide events when dialog is closed', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentStartOpen);

    const dialog = await page.find('sl-dialog');
    const dialogPanel = await page.find('sl-dialog >>> .dialog__panel');
    const slHide = await dialog.spyOnEvent('slHide');
    const slAfterHide = await dialog.spyOnEvent('slAfterHide');

    await dialog.callMethod('hide');
    expect(slHide).toHaveReceivedEventTimes(1);

    await dialogPanel.waitForEvent('transitionend');
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
