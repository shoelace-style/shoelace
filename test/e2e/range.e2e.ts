import { newE2EPage } from '@stencil/core/testing';

const testContent = `
<sl-range min="0" max="100" step="1"></sl-range>
<button>Other Element</button>
`;

describe('range', () => {
  it('should emit slFocus when gaining focus', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const range = await page.find('sl-range');

    const slFocus = await range.spyOnEvent('slFocus');

    // give focus
    await range.click();

    expect(slFocus).toHaveReceivedEventTimes(1);
  });

  it('should emit slBlur when losing focus', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const range = await page.find('sl-range');
    const otherElement = await page.find('button');

    const slBlur = await range.spyOnEvent('slBlur');

    //give focus
    await range.click();

    // remove focus by clicking on other element
    await otherElement.click();

    expect(slBlur).toHaveReceivedEventTimes(1);
  });

  it('should emit slFocus on setFocus', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const range = await page.find('sl-range');

    const slFocus = await range.spyOnEvent('slFocus');

    await range.callMethod('setFocus');

    expect(slFocus).toHaveReceivedEventTimes(1);
  });

  it('should emit slBlur on removeFocus', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const range = await page.find('sl-range');

    const slBlur = await range.spyOnEvent('slBlur');

    await range.callMethod('setFocus');
    await range.callMethod('removeFocus');

    expect(slBlur).toHaveReceivedEventTimes(1);
  });

  it('should emit slChange when value changes with click', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const range = await page.find('sl-range');

    const slChange = await range.spyOnEvent('slChange');

    // click in center of range
    await range.click();

    expect(slChange).toHaveReceivedEventTimes(1);
  });

  it('should change value when changed with click', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const range = await page.find('sl-range');

    // click in center of range
    await range.click();

    expect(await range.getProperty('value')).toBe(50);
  });
});
