import { newE2EPage } from '@stencil/core/testing';

describe('<sl-checkbox>', () => {
  it('should emit sl-focus when gaining focus', async () => {
    const page = await newE2EPage({
      html: `
        <sl-checkbox>Checkbox</sl-checkbox>
      `
    });
    const checkbox = await page.find('sl-checkbox');
    const slFocus = await checkbox.spyOnEvent('sl-focus');

    await checkbox.click();

    expect(slFocus).toHaveReceivedEventTimes(1);
  });

  it('should emit sl-blur when losing focus', async () => {
    const page = await newE2EPage({
      html: `
        <sl-checkbox>Checkbox</sl-checkbox>
        <button>Native Button</button>
      `
    });
    const checkbox = await page.find('sl-checkbox');
    const nativeButton = await page.find('button');
    const slBlur = await checkbox.spyOnEvent('sl-blur');

    await checkbox.click();
    await nativeButton.click();

    expect(slBlur).toHaveReceivedEventTimes(1);
  });

  it('should emit sl-focus when calling setFocus()', async () => {
    const page = await newE2EPage({
      html: `
        <sl-checkbox>Checkbox</sl-checkbox>
      `
    });
    const checkbox = await page.find('sl-checkbox');
    const slFocus = await checkbox.spyOnEvent('sl-focus');

    await checkbox.callMethod('setFocus');

    expect(slFocus).toHaveReceivedEventTimes(1);
  });

  it('should emit sl-blur when calling removeFocus()', async () => {
    const page = await newE2EPage({
      html: `
        <sl-checkbox>Checkbox</sl-checkbox>
      `
    });
    const checkbox = await page.find('sl-checkbox');
    const slBlur = await checkbox.spyOnEvent('sl-blur');

    await checkbox.callMethod('setFocus');
    await checkbox.callMethod('removeFocus');

    expect(slBlur).toHaveReceivedEventTimes(1);
  });

  it('should emit sl-change when checked state changes via click', async () => {
    const page = await newE2EPage({
      html: `
        <sl-checkbox>Checkbox</sl-checkbox>
      `
    });
    const checkbox = await page.find('sl-checkbox');
    const slChange = await checkbox.spyOnEvent('sl-change');

    await checkbox.click();

    expect(slChange).toHaveReceivedEventTimes(1);
  });

  it('should emit sl-change when setting checked attribute', async () => {
    const page = await newE2EPage({
      html: `
        <sl-checkbox>Checkbox</sl-checkbox>
      `
    });
    const checkbox = await page.find('sl-checkbox');
    const slChange = await checkbox.spyOnEvent('sl-change');

    checkbox.setAttribute('checked', '');
    await page.waitForChanges();

    expect(slChange).toHaveReceivedEventTimes(1);
  });

  it('should emit sl-change when removing checked attribute', async () => {
    const page = await newE2EPage({
      html: `
        <sl-checkbox checked>Checkbox</sl-checkbox>
      `
    });
    const checkbox = await page.find('sl-checkbox');
    const slChange = await checkbox.spyOnEvent('sl-change');

    checkbox.removeAttribute('checked');
    await page.waitForChanges();

    expect(slChange).toHaveReceivedEventTimes(1);
  });

  it('should emit sl-change when setting checked property to true', async () => {
    const page = await newE2EPage({
      html: `
        <sl-checkbox>Checkbox</sl-checkbox>
      `
    });
    const checkbox = await page.find('sl-checkbox');
    const slChange = await checkbox.spyOnEvent('sl-change');

    checkbox.setProperty('checked', true);
    await page.waitForChanges();

    expect(slChange).toHaveReceivedEventTimes(1);
  });

  it('should emit sl-change when setting checked property to false', async () => {
    const page = await newE2EPage({
      html: `
      <sl-checkbox checked>Checkbox</sl-checkbox>
      <button>Native Button</button>
      `
    });
    const checkbox = await page.find('sl-checkbox');
    const slChange = await checkbox.spyOnEvent('sl-change');

    checkbox.setProperty('checked', false);
    await page.waitForChanges();

    expect(slChange).toHaveReceivedEventTimes(1);
  });
});
