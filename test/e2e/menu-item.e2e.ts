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

const testContentActive = `
<sl-button>Other element</sl-button>
<sl-menu
  style="max-width: 200px; border: solid 1px var(--sl-panel-border-color); border-radius: var(--sl-border-radius-medium);"
>
  <sl-menu-item value="undo" active>Undo</sl-menu-item>
  <sl-menu-item value="redo">Redo</sl-menu-item>
  <sl-menu-divider></sl-menu-divider>
  <sl-menu-item value="cut">Cut</sl-menu-item>
  <sl-menu-item value="copy">Copy</sl-menu-item>
  <sl-menu-item value="paste">Paste</sl-menu-item>
  <sl-menu-item value="delete">Delete</sl-menu-item>
</sl-menu>
`;

describe('menuItem', () => {
  it('should become active when active property set to true', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const menuItem = await page.find('sl-menu-item');
    const menuItemItem = await page.find('sl-menu-item >>> .menu-item');

    expect(menuItemItem).not.toHaveClass('menu-item--active');

    menuItem.setProperty('active', true);
    await page.waitForChanges();

    expect(menuItemItem).toHaveClass('menu-item--active');
  });

  it('should become inactive when active property set to false', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentActive);

    const menuItem = await page.find('sl-menu-item');
    const menuItemItem = await page.find('sl-menu-item >>> .menu-item');

    expect(menuItemItem).toHaveClass('menu-item--active');

    menuItem.setProperty('active', false);
    await page.waitForChanges();

    expect(menuItemItem).not.toHaveClass('menu-item--active');
  });

  it('should emit slActivate event when active property set to true', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const menuItem = await page.find('sl-menu-item');
    const slActivate = await menuItem.spyOnEvent('slActivate');

    menuItem.setProperty('active', true);
    await page.waitForChanges();

    expect(slActivate).toHaveReceivedEventTimes(1);
  });

  it('should emit slDeactivate event when active property set to false', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentActive);

    const menuItem = await page.find('sl-menu-item');
    const slDeactivate = await menuItem.spyOnEvent('slDeactivate');

    menuItem.setProperty('active', false);
    await page.waitForChanges();

    expect(slDeactivate).toHaveReceivedEventTimes(1);
  });

  it('should emit slActivate event when hovered', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const menuItem = await page.find('sl-menu-item');
    const slActivate = await menuItem.spyOnEvent('slActivate');

    await menuItem.hover();

    expect(slActivate).toHaveReceivedEventTimes(1);
  });

  it('should emit slDeactivate event when no longer hovered', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const menuItem = await page.find('sl-menu-item');
    const secondMenuItem = await page.find('sl-menu-item:nth-child(2)');
    const slDeactivate = await menuItem.spyOnEvent('slDeactivate');

    await menuItem.hover();
    await secondMenuItem.hover();

    expect(slDeactivate).toHaveReceivedEventTimes(1);
  });
});
