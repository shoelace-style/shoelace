import { newE2EPage } from '@stencil/core/testing';

describe('<sl-select>', () => {
  it('should emit sl-focus when gaining focus', async () => {
    const page = await newE2EPage({
      html: `
        <sl-select>
          <sl-menu-item value="option-1">Option 1</sl-menu-item>
          <sl-menu-item value="option-2">Option 2</sl-menu-item>
          <sl-menu-item value="option-3">Option 3</sl-menu-item>
        </sl-select>
      `
    });
    const select = await page.find('sl-select');
    const slFocus = await select.spyOnEvent('sl-focus');

    await select.click();

    expect(slFocus).toHaveReceivedEventTimes(1);
  });

  it('should emit sl-blur when losing focus', async () => {
    const page = await newE2EPage({
      html: `
        <button>Other Element</button>
        <sl-select>
          <sl-menu-item value="option-1">Option 1</sl-menu-item>
          <sl-menu-item value="option-2">Option 2</sl-menu-item>
          <sl-menu-item value="option-3">Option 3</sl-menu-item>
        </sl-select>
      `
    });
    const select = await page.find('sl-select');
    const button = await page.find('button');
    const slBlur = await select.spyOnEvent('sl-blur');

    await select.click();
    await button.click();

    expect(slBlur).toHaveReceivedEventTimes(1);
  });

  it('should emit sl-change when a menu item is selected', async () => {
    const page = await newE2EPage({
      html: `
        <sl-select>
          <sl-menu-item value="option-1">Option 1</sl-menu-item>
          <sl-menu-item value="option-2">Option 2</sl-menu-item>
          <sl-menu-item value="option-3">Option 3</sl-menu-item>
        </sl-select>
      `
    });
    const select = await page.find('sl-select');
    const menuItem = await page.find('sl-menu-item');
    const slChange = await select.spyOnEvent('sl-change');

    await select.click();
    await menuItem.click();

    expect(slChange).toHaveReceivedEventTimes(1);
  });

  it('should change value when menu item selected', async () => {
    const page = await newE2EPage({
      html: `
        <sl-select>
          <sl-menu-item value="option-1">Option 1</sl-menu-item>
          <sl-menu-item value="option-2">Option 2</sl-menu-item>
          <sl-menu-item value="option-3">Option 3</sl-menu-item>
        </sl-select>
      `
    });
    const select = await page.find('sl-select');
    const menuItem = await page.find('sl-menu-item');

    expect(await select.getProperty('value')).toBe('');

    await select.click();
    await menuItem.click();

    expect(await select.getProperty('value')).toBe('option-1');
  });
});
