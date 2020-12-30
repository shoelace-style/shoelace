import { newE2EPage } from '@stencil/core/testing';

describe('<sl-radio>', () => {
  it('should emit sl-focus when gaining focus', async () => {
    const page = await newE2EPage({
      html: `
        <sl-radio>Radio</sl-radio>
      `
    });
    const radio = await page.find('sl-radio');
    const slFocus = await radio.spyOnEvent('sl-focus');

    await radio.click();

    expect(slFocus).toHaveReceivedEventTimes(1);
  });

  it('should emit sl-blur when losing focus', async () => {
    const page = await newE2EPage({
      html: `
        <sl-radio>Radio</sl-radio>
        <button>Button</button>
        `
    });
    const radio = await page.find('sl-radio');
    const button = await page.find('button');
    const slBlur = await radio.spyOnEvent('sl-blur');

    await radio.click();
    await button.click();

    expect(slBlur).toHaveReceivedEventTimes(1);
  });

  it('should emit sl-focus when calling setFocus()', async () => {
    const page = await newE2EPage({
      html: `
        <sl-radio>Radio</sl-radio>
      `
    });
    const radio = await page.find('sl-radio');
    const slFocus = await radio.spyOnEvent('sl-focus');

    await radio.callMethod('setFocus');

    expect(slFocus).toHaveReceivedEventTimes(1);
  });

  it('should emit sl-blur when calling removeFocus()', async () => {
    const page = await newE2EPage({
      html: `
        <sl-radio>Radio</sl-radio>
      `
    });
    const radio = await page.find('sl-radio');
    const slBlur = await radio.spyOnEvent('sl-blur');

    await radio.callMethod('setFocus');
    await radio.callMethod('removeFocus');

    expect(slBlur).toHaveReceivedEventTimes(1);
  });

  it('should emit sl-change when checked state changes via click', async () => {
    const page = await newE2EPage({
      html: `
        <sl-radio>Radio</sl-radio>
      `
    });
    const radio = await page.find('sl-radio');
    const slChange = await radio.spyOnEvent('sl-change');

    await radio.click();

    expect(slChange).toHaveReceivedEventTimes(1);
  });

  it('should emit sl-change when setting checked attribute', async () => {
    const page = await newE2EPage({
      html: `
        <sl-radio>Radio</sl-radio>
      `
    });
    const radio = await page.find('sl-radio');
    const slChange = await radio.spyOnEvent('sl-change');

    radio.setAttribute('checked', '');
    await page.waitForChanges();

    expect(slChange).toHaveReceivedEventTimes(1);
  });

  it('should emit sl-change when removing checked attribute', async () => {
    const page = await newE2EPage({
      html: `
        <sl-radio checked>Radio</sl-radio>
        <button>Button</button>
      `
    });
    const radio = await page.find('sl-radio');
    const slChange = await radio.spyOnEvent('sl-change');

    radio.removeAttribute('checked');
    await page.waitForChanges();

    expect(slChange).toHaveReceivedEventTimes(1);
  });

  it('should emit sl-change when setting checked property to true', async () => {
    const page = await newE2EPage({
      html: `
        <sl-radio>Radio</sl-radio>
      `
    });
    const radio = await page.find('sl-radio');
    const slChange = await radio.spyOnEvent('sl-change');

    radio.setProperty('checked', true);
    await page.waitForChanges();

    expect(slChange).toHaveReceivedEventTimes(1);
  });

  it('should emit sl-change when setting checked property to false', async () => {
    const page = await newE2EPage({
      html: `
        <sl-radio checked>Radio</sl-radio>
        <button>Button</button>
      `
    });
    const radio = await page.find('sl-radio');
    const slChange = await radio.spyOnEvent('sl-change');

    radio.setProperty('checked', false);
    await page.waitForChanges();

    expect(slChange).toHaveReceivedEventTimes(1);
  });
});
