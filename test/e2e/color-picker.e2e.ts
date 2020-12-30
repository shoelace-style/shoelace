import { newE2EPage } from '@stencil/core/testing';

const testContent = `
<sl-color-picker></sl-color-picker>
`;

describe('color-picker', () => {
  it('should emit slShow and slAfterShow events when opened', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const colorPicker = await page.find('sl-color-picker');
    const slShow = await colorPicker.spyOnEvent('slShow');
    const slAfterShow = await colorPicker.spyOnEvent('slAfterShow');

    const eventHappened = colorPicker.waitForEvent('slAfterShow');
    await colorPicker.click();

    await eventHappened;

    expect(slShow).toHaveReceivedEventTimes(1);
    expect(slAfterShow).toHaveReceivedEventTimes(1);
  });

  it('should emit slHide and slAfterHide events when color-picker is closed', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const colorPicker = await page.find('sl-color-picker');
    const slHide = await colorPicker.spyOnEvent('slHide');
    const slAfterHide = await colorPicker.spyOnEvent('slAfterHide');

    const eventHappened = colorPicker.waitForEvent('slAfterHide');
    await colorPicker.click();
    await colorPicker.click();

    await eventHappened;

    expect(slHide).toHaveReceivedEventTimes(1);
    expect(slAfterHide).toHaveReceivedEventTimes(1);
  });

  it('should emit slChange when value changes with click', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const colorPicker = await page.find('sl-color-picker');
    const colorPickerPicker = await page.find('sl-color-picker >>> .color-picker');

    const slChange = await colorPicker.spyOnEvent('slChange');

    await colorPicker.click();
    // click in center of picker
    await colorPickerPicker.click();

    expect(slChange).toHaveReceivedEventTimes(1);
  });

  it('should change value when changed with click', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const colorPicker = await page.find('sl-color-picker');
    const colorPickerPicker = await page.find('sl-color-picker >>> .color-picker');

    expect(await colorPicker.getProperty('value')).toBe('#ffffff');

    await colorPicker.click();
    // click in center of picker
    await colorPickerPicker.click();

    expect(await colorPicker.getProperty('value')).not.toBe('#ffffff');
  });
});
