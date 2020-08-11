import { newE2EPage } from '@stencil/core/testing';

const testContentStartClosed = `
<sl-drawer label="Drawer" class="drawer-overview">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  <sl-button slot="footer" type="primary">Close</sl-button>
</sl-drawer>
`;

const testContentStartOpen = `
<sl-drawer label="Drawer" class="drawer-overview" open>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  <sl-button slot="footer" type="primary">Close</sl-button>
</sl-drawer>
`;

describe('drawer', () => {
  it('should open/close with the show/hide methods', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentStartClosed);

    const drawer = await page.find('sl-drawer');
    const drawerBase = await page.find('sl-drawer >>> .drawer');

    expect(await drawerBase.isVisible()).toBe(false);

    await drawer.callMethod('show');
    await page.waitFor(500); // wait for transition to end
    expect(await drawerBase.isVisible()).toBe(true);

    await drawer.callMethod('hide');
    await page.waitFor(500); // wait for transition to end
    expect(await drawerBase.isVisible()).toBe(false);
  });

  it('should open/close with the open attribute added/removed', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentStartClosed);

    const drawer = await page.find('sl-drawer');
    const drawerBase = await page.find('sl-drawer >>> .drawer');

    expect(await drawerBase.isVisible()).toBe(false);

    drawer.setAttribute('open', '');
    await page.waitForChanges();
    await page.waitFor(500); // wait for transition to end
    expect(await drawerBase.isVisible()).toBe(true);

    drawer.removeAttribute('open');
    await page.waitForChanges();
    await page.waitFor(500); // wait for transition to end
    expect(await drawerBase.isVisible()).toBe(false);
  });

  it('should emit slShow and slAfterShow events when drawer is opened', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentStartClosed);

    const drawer = await page.find('sl-drawer');
    const slShow = await drawer.spyOnEvent('slShow');
    const slAfterShow = await drawer.spyOnEvent('slAfterShow');

    await drawer.callMethod('show');
    expect(slShow).toHaveReceivedEventTimes(1);

    await page.waitFor(500); // wait for transition to end
    expect(slAfterShow).toHaveReceivedEventTimes(1);
  });

  it('should emit slHide and slAfterHide events when drawer is closed', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentStartOpen);

    const drawer = await page.find('sl-drawer');
    const slHide = await drawer.spyOnEvent('slHide');
    const slAfterHide = await drawer.spyOnEvent('slAfterHide');

    await drawer.callMethod('hide');
    expect(slHide).toHaveReceivedEventTimes(1);

    await page.waitFor(500); // wait for transition to end
    expect(slAfterHide).toHaveReceivedEventTimes(1);
  });

  it('should emit the slOverlayDismiss event when overlay is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentStartOpen);

    const drawer = await page.find('sl-drawer');
    const slOverlayDismiss = await drawer.spyOnEvent('slOverlayDismiss');

    // can't use click method on overlay element since is always clicks in
    // the middle of an element which in this case will be behind the panel
    await page.mouse.click(0, 0);
    await page.waitForChanges();
    expect(slOverlayDismiss).toHaveReceivedEventTimes(1);
  });
});
