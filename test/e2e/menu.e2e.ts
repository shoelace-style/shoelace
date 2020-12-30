import { newE2EPage } from '@stencil/core/testing';

const testContent = `
<sl-button>Other element</sl-button>
<sl-menu
  style="max-width: 200px; border: solid 1px var(--sl-panel-border-color); border-radius: var(--sl-border-radius-medium);"
>
  <sl-menu-item value="undo">Undo</sl-menu-item>
  <sl-menu-item value="redo">Redo</sl-menu-item>
  <sl-menu-divider></sl-menu-divider>
  <sl-menu-item value="cut">Cut</sl-menu-item>
  <sl-menu-item value="copy">Copy</sl-menu-item>
  <sl-menu-item value="paste">Paste</sl-menu-item>
  <sl-menu-item value="delete">Delete</sl-menu-item>
</sl-menu>
`;

describe('menu', () => {
  it('should emit slFocus when gaining focus', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const menu = await page.find('sl-menu');
    const button = await page.find('sl-button');

    const slFocus = await menu.spyOnEvent('slFocus');

    // give focus to button
    await button.click();
    // tab to menu
    await button.press('Tab');

    expect(slFocus).toHaveReceivedEventTimes(1);
  });

  it('should emit slBlur when losing focus', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const menu = await page.find('sl-menu');

    const slBlur = await menu.spyOnEvent('slBlur');

    //give focus
    await menu.callMethod('setFocus');
    // remove focus by tabbing to other element
    await menu.press('Tab');

    expect(slBlur).toHaveReceivedEventTimes(1);
  });

  it('should emit slFocus on setFocus', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const menu = await page.find('sl-menu');

    const slFocus = await menu.spyOnEvent('slFocus');

    await menu.callMethod('setFocus');

    expect(slFocus).toHaveReceivedEventTimes(1);
  });

  it('should emit slBlur on removeFocus', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const menu = await page.find('sl-menu');

    const slBlur = await menu.spyOnEvent('slBlur');

    await menu.callMethod('setFocus');
    await menu.callMethod('removeFocus');

    expect(slBlur).toHaveReceivedEventTimes(1);
  });

  it('should emit slSelect when menu item selected', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const menu = await page.find('sl-menu');
    const menuItem = await page.find('sl-menu-item');
    const menuItemEl = await page.$eval('sl-menu-item', el => el);

    const slSelect = await menu.spyOnEvent('slSelect');

    await menuItem.click();

    expect(slSelect).toHaveReceivedEventTimes(1);
    expect(slSelect).toHaveReceivedEventDetail({
      item: menuItemEl
    });
  });
});
