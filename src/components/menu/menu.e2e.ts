import { newE2EPage } from '@stencil/core/testing';

describe('<sl-menu>', () => {
  it('should emit sl-select when a menu item is selected', async () => {
    const page = await newE2EPage({
      html: `
        <sl-menu>
          <sl-menu-item value="1">Item 1</sl-menu-item>
          <sl-menu-item value="2">Item 2</sl-menu-item>
          <sl-menu-item value="3">Item 3</sl-menu-item>
        </sl-menu>
      `
    });
    const menu = await page.find('sl-menu');
    const menuItem = await page.find('sl-menu-item');
    const menuItemEl = await page.$eval('sl-menu-item', el => el);
    const slSelect = await menu.spyOnEvent('sl-select');

    await menuItem.click();

    expect(slSelect).toHaveReceivedEventTimes(1);
    expect(slSelect).toHaveReceivedEventDetail({
      item: menuItemEl
    });
  });
});
