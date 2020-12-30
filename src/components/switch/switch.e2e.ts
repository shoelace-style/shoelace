import { newE2EPage } from '@stencil/core/testing';

describe('<sl-switch>', () => {
  it('should emit sl-focus when gaining focus', async () => {
    const page = await newE2EPage({
      html: `
        <sl-switch>Switch</sl-switch>
      `
    });
    const switchEl = await page.find('sl-switch');
    const slFocus = await switchEl.spyOnEvent('sl-focus');

    await switchEl.click();

    expect(slFocus).toHaveReceivedEventTimes(1);
  });

  it('should emit sl-blur when losing focus', async () => {
    const page = await newE2EPage({
      html: `
        <sl-switch>Switch</sl-switch>
        <button>Native Button</button>
      `
    });
    const switchEl = await page.find('sl-switch');
    const nativeButton = await page.find('button');
    const slBlur = await switchEl.spyOnEvent('sl-blur');

    await switchEl.click();
    await nativeButton.click();

    expect(slBlur).toHaveReceivedEventTimes(1);
  });

  it('should emit sl-focus when calling setFocus()', async () => {
    const page = await newE2EPage({
      html: `
        <sl-switch>Switch</sl-switch>
      `
    });
    const switchEl = await page.find('sl-switch');
    const slFocus = await switchEl.spyOnEvent('sl-focus');

    await switchEl.callMethod('setFocus');

    expect(slFocus).toHaveReceivedEventTimes(1);
  });

  it('should emit sl-blur when calling removeFocus()', async () => {
    const page = await newE2EPage({
      html: `
        <sl-switch>Switch</sl-switch>
      `
    });
    const switchEl = await page.find('sl-switch');
    const slBlur = await switchEl.spyOnEvent('sl-blur');

    await switchEl.callMethod('setFocus');
    await switchEl.callMethod('removeFocus');

    expect(slBlur).toHaveReceivedEventTimes(1);
  });

  it('should emit sl-change when checked state changes via click', async () => {
    const page = await newE2EPage({
      html: `
        <sl-switch>Switch</sl-switch>
      `
    });
    const switchEl = await page.find('sl-switch');
    const slChange = await switchEl.spyOnEvent('sl-change');

    await switchEl.click();

    expect(slChange).toHaveReceivedEventTimes(1);
  });

  it('should emit sl-change when setting checked attribute', async () => {
    const page = await newE2EPage({
      html: `
        <sl-switch>Switch</sl-switch>
      `
    });
    const switchEl = await page.find('sl-switch');
    const slChange = await switchEl.spyOnEvent('sl-change');

    switchEl.setAttribute('checked', '');
    await page.waitForChanges();

    expect(slChange).toHaveReceivedEventTimes(1);
  });

  it('should emit sl-change when removing checked attribute', async () => {
    const page = await newE2EPage({
      html: `
        <sl-switch checked>Switch</sl-switch>
      `
    });
    const switchEl = await page.find('sl-switch');
    const slChange = await switchEl.spyOnEvent('sl-change');

    switchEl.removeAttribute('checked');
    await page.waitForChanges();

    expect(slChange).toHaveReceivedEventTimes(1);
  });

  it('should emit sl-change when setting checked property to true', async () => {
    const page = await newE2EPage({
      html: `
        <sl-switch>Switch</sl-switch>
      `
    });
    const switchEl = await page.find('sl-switch');
    const slChange = await switchEl.spyOnEvent('sl-change');

    switchEl.setProperty('checked', true);
    await page.waitForChanges();

    expect(slChange).toHaveReceivedEventTimes(1);
  });

  it('should emit sl-change when setting checked property to false', async () => {
    const page = await newE2EPage({
      html: `
      <sl-switch checked>Switch</sl-switch>
      <button>Native Button</button>
      `
    });
    const switchEl = await page.find('sl-switch');
    const slChange = await switchEl.spyOnEvent('sl-change');

    switchEl.setProperty('checked', false);
    await page.waitForChanges();

    expect(slChange).toHaveReceivedEventTimes(1);
  });
});
