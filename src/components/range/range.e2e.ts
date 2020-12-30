import { newE2EPage } from '@stencil/core/testing';

describe('<sl-range>', () => {
  it('should emit sl-focus when gaining focus', async () => {
    const page = await newE2EPage({
      html: `
        <sl-range min="0" max="100" step="1"></sl-range>
      `
    });
    const range = await page.find('sl-range');
    const slFocus = await range.spyOnEvent('sl-focus');

    await range.click();

    expect(slFocus).toHaveReceivedEventTimes(1);
  });

  it('should emit sl-blur when losing focus', async () => {
    const page = await newE2EPage({
      html: `
        <sl-range min="0" max="100" step="1"></sl-range>
        <button>Other Element</button>
      `
    });
    const range = await page.find('sl-range');
    const button = await page.find('button');
    const slBlur = await range.spyOnEvent('sl-blur');

    await range.click();
    await button.click();

    expect(slBlur).toHaveReceivedEventTimes(1);
  });

  it('should emit sl-focus when setFocus() is called', async () => {
    const page = await newE2EPage({
      html: `
        <sl-range min="0" max="100" step="1"></sl-range>
      `
    });
    const range = await page.find('sl-range');
    const slFocus = await range.spyOnEvent('sl-focus');

    await range.callMethod('setFocus');

    expect(slFocus).toHaveReceivedEventTimes(1);
  });

  it('should emit sl-blur when removeFocus() is called', async () => {
    const page = await newE2EPage({
      html: `
        <sl-range min="0" max="100" step="1"></sl-range>
      `
    });
    const range = await page.find('sl-range');
    const slBlur = await range.spyOnEvent('sl-blur');

    await range.callMethod('setFocus');
    await range.callMethod('removeFocus');

    expect(slBlur).toHaveReceivedEventTimes(1);
  });

  it('should emit sl-change when value changes with click', async () => {
    const page = await newE2EPage({
      html: `
        <sl-range min="0" max="100" step="1"></sl-range>
      `
    });
    const range = await page.find('sl-range');
    const slChange = await range.spyOnEvent('sl-change');

    await range.click();

    expect(slChange).toHaveReceivedEventTimes(1);
  });

  it('should sync value when changed with click', async () => {
    const page = await newE2EPage({
      html: `
        <sl-range min="0" max="100" step="1"></sl-range>
      `
    });
    const range = await page.find('sl-range');

    await range.click();

    expect(await range.getProperty('value')).toBe(50);
  });
});
