import { newE2EPage } from '@stencil/core/testing';

const testContent = `
<button>Other Element</button>
<sl-select>
  <sl-menu-item value="option-1">Option 1</sl-menu-item>
  <sl-menu-item value="option-2">Option 2</sl-menu-item>
  <sl-menu-item value="option-3">Option 3</sl-menu-item>
  <sl-menu-divider></sl-menu-divider>
  <sl-menu-item value="option-4">Option 4</sl-menu-item>
  <sl-menu-item value="option-5">Option 5</sl-menu-item>
  <sl-menu-item value="option-6">Option 6</sl-menu-item>
</sl-select>
`;

describe('select', () => {
  it('should emit slFocus when gaining focus', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const select = await page.find('sl-select');

    const slFocus = await select.spyOnEvent('slFocus');

    // give focus
    await select.click();

    expect(slFocus).toHaveReceivedEventTimes(1);
  });

  it('should emit slBlur when losing focus', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const select = await page.find('sl-select');
    const otherElement = await page.find('button');

    const slBlur = await select.spyOnEvent('slBlur');

    //give focus
    await select.click();

    // remove focus by clicking on other element
    await otherElement.click();

    expect(slBlur).toHaveReceivedEventTimes(1);
  });

  it('should emit slChange when menu item selected', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const select = await page.find('sl-select');
    const menuItem = await page.find('sl-menu-item');

    const slChange = await select.spyOnEvent('slChange');

    await select.click();
    await menuItem.click();

    expect(slChange).toHaveReceivedEventTimes(1);
  });

  it('should change value when menu item selected', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const select = await page.find('sl-select');
    const menuItem = await page.find('sl-menu-item');

    expect(await select.getProperty('value')).toBe('');

    await select.click();
    await menuItem.click();

    expect(await select.getProperty('value')).toBe('option-1');
  });
});
