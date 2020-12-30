import { newE2EPage } from '@stencil/core/testing';

describe('<sl-drawer>', () => {
  it('should open when the open attribute added', async () => {
    const page = await newE2EPage({
      html: `
        <sl-drawer>This is a drawer.</sl-drawer>
      `
    });
    const drawer = await page.find('sl-drawer');
    const base = await page.find('sl-drawer >>> .drawer');
    const slShow = await drawer.spyOnEvent('sl-show');
    const slAfterShow = await drawer.spyOnEvent('sl-after-show');

    expect(await base.isVisible()).toBe(false);

    const showEventHappened = drawer.waitForEvent('sl-after-show');
    drawer.setAttribute('open', '');
    await page.waitForChanges();
    await showEventHappened;

    expect(await base.isVisible()).toBe(true);
    expect(slShow).toHaveReceivedEventTimes(1);
    expect(slAfterShow).toHaveReceivedEventTimes(1);
  });

  it('should close when the open attribute is removed', async () => {
    const page = await newE2EPage({
      html: `
        <sl-drawer open>This is a drawer.</sl-drawer>
      `
    });
    const drawer = await page.find('sl-drawer');
    const base = await page.find('sl-drawer >>> .drawer');
    const slHide = await drawer.spyOnEvent('sl-hide');
    const slAfterHide = await drawer.spyOnEvent('sl-after-hide');

    expect(await base.isVisible()).toBe(true);

    const hideEventHappened = drawer.waitForEvent('sl-after-hide');
    drawer.removeAttribute('open');
    await page.waitForChanges();
    await hideEventHappened;

    expect(await base.isVisible()).toBe(false);
    expect(slHide).toHaveReceivedEventTimes(1);
    expect(slAfterHide).toHaveReceivedEventTimes(1);
  });

  it('should open when the show() method is called', async () => {
    const page = await newE2EPage({
      html: `
        <sl-drawer>This is a drawer.</sl-drawer>
      `
    });
    const drawer = await page.find('sl-drawer');
    const base = await page.find('sl-drawer >>> .drawer');
    const slShow = await drawer.spyOnEvent('sl-show');
    const slAfterShow = await drawer.spyOnEvent('sl-after-show');

    expect(await base.isVisible()).toBe(false);

    const showEventHappened = drawer.waitForEvent('sl-after-show');
    await drawer.callMethod('show');
    await showEventHappened;

    expect(await base.isVisible()).toBe(true);
    expect(slShow).toHaveReceivedEventTimes(1);
    expect(slAfterShow).toHaveReceivedEventTimes(1);
  });

  it('should close when the hide() method is called', async () => {
    const page = await newE2EPage({
      html: `
        <sl-drawer open>This is a drawer.</sl-drawer>
      `
    });
    const drawer = await page.find('sl-drawer');
    const base = await page.find('sl-drawer >>> .drawer');
    const slHide = await drawer.spyOnEvent('sl-hide');
    const slAfterHide = await drawer.spyOnEvent('sl-after-hide');

    expect(await base.isVisible()).toBe(true);

    const hideEventHappened = drawer.waitForEvent('sl-after-hide');
    await drawer.callMethod('hide');
    await hideEventHappened;

    expect(await base.isVisible()).toBe(false);
    expect(slHide).toHaveReceivedEventTimes(1);
    expect(slAfterHide).toHaveReceivedEventTimes(1);
  });

  it('should emit sl-overlay-dismiss when the overlay is clicked', async () => {
    const page = await newE2EPage({
      html: `
        <sl-drawer open>This is a drawer.</sl-drawer>
      `
    });
    const drawer = await page.find('sl-drawer');
    const slOverlayDismiss = await drawer.spyOnEvent('sl-overlay-dismiss');

    // We can't use the click method on the overlay since the click is in the middle, which will be behind the panel
    await page.mouse.click(0, 0);
    await page.waitForChanges();

    expect(slOverlayDismiss).toHaveReceivedEventTimes(1);
  });
});
