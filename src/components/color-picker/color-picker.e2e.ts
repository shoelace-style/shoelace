import { newE2EPage } from '@stencil/core/testing';

describe('<sl-color-picker>', () => {
  it('should emit sl-show and sl-after-show events when opened', async () => {
    const page = await newE2EPage({
      html: `
        <sl-color-picker></sl-color-picker>
      `
    });
    const colorPicker = await page.find('sl-color-picker');
    const slShow = await colorPicker.spyOnEvent('sl-show');
    const slAfterShow = await colorPicker.spyOnEvent('sl-after-show');
    const eventHappened = colorPicker.waitForEvent('sl-after-show');

    await colorPicker.click();
    await eventHappened;

    expect(slShow).toHaveReceivedEventTimes(1);
    expect(slAfterShow).toHaveReceivedEventTimes(1);
  });

  it('should emit sl-hide and sl-after-hide events when closed', async () => {
    const page = await newE2EPage({
      html: `
        <sl-color-picker></sl-color-picker>
      `
    });
    const colorPicker = await page.find('sl-color-picker');
    const slHide = await colorPicker.spyOnEvent('sl-hide');
    const slAfterHide = await colorPicker.spyOnEvent('sl-after-hide');
    const eventHappened = colorPicker.waitForEvent('sl-after-hide');

    await colorPicker.click(); // open
    await colorPicker.click(); // close
    await eventHappened;

    expect(slHide).toHaveReceivedEventTimes(1);
    expect(slAfterHide).toHaveReceivedEventTimes(1);
  });

  it('should emit sl-change when value changes with click', async () => {
    const page = await newE2EPage({
      html: `
        <sl-color-picker></sl-color-picker>
      `
    });
    const colorPicker = await page.find('sl-color-picker');
    const colorPickerPicker = await page.find('sl-color-picker >>> .color-picker');
    const slChange = await colorPicker.spyOnEvent('sl-change');

    await colorPicker.click();
    await colorPickerPicker.click();

    expect(slChange).toHaveReceivedEventTimes(1);
  });

  it('should change value when clicking the color grid', async () => {
    const page = await newE2EPage({
      html: `
        <sl-color-picker></sl-color-picker>
      `
    });
    const colorPicker = await page.find('sl-color-picker');
    const colorPickerPicker = await page.find('sl-color-picker >>> .color-picker');

    expect(await colorPicker.getProperty('value')).toBe('#ffffff');

    await colorPicker.click();
    await colorPickerPicker.click();

    expect(await colorPicker.getProperty('value')).not.toBe('#ffffff');
  });
});
