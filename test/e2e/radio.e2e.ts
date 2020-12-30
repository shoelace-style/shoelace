import { newE2EPage } from '@stencil/core/testing';

const testContentUnchecked = `
<sl-radio>Radio</sl-radio>
<button>Other Element</button>
`;

const testContentChecked = `
<sl-radio checked>Radio</sl-radio>
<button>Other Element</button>
`;

describe('radio', () => {
  it('should emit slFocus when gaining focus', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentUnchecked);

    const radio = await page.find('sl-radio');

    const slFocus = await radio.spyOnEvent('slFocus');

    // give focus
    await radio.click();

    expect(slFocus).toHaveReceivedEventTimes(1);
  });

  it('should emit slBlur when losing focus', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentUnchecked);

    const radio = await page.find('sl-radio');
    const otherElement = await page.find('button');

    const slBlur = await radio.spyOnEvent('slBlur');

    //give focus
    await radio.click();

    // remove focus by clicking on other element
    await otherElement.click();

    expect(slBlur).toHaveReceivedEventTimes(1);
  });

  it('should emit slFocus on setFocus', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentUnchecked);

    const radio = await page.find('sl-radio');

    const slFocus = await radio.spyOnEvent('slFocus');

    await radio.callMethod('setFocus');

    expect(slFocus).toHaveReceivedEventTimes(1);
  });

  it('should emit slBlur on removeFocus', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentUnchecked);

    const radio = await page.find('sl-radio');

    const slBlur = await radio.spyOnEvent('slBlur');

    await radio.callMethod('setFocus');
    await radio.callMethod('removeFocus');

    expect(slBlur).toHaveReceivedEventTimes(1);
  });

  it('should emit slChange when state changes with click', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentUnchecked);

    const radio = await page.find('sl-radio');

    const slChange = await radio.spyOnEvent('slChange');

    await radio.click();

    expect(slChange).toHaveReceivedEventTimes(1);
  });

  it('should emit slChange when state changes when checked attribute set', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentUnchecked);

    const radio = await page.find('sl-radio');

    const slChange = await radio.spyOnEvent('slChange');

    radio.setAttribute('checked', '');
    await page.waitForChanges();

    expect(slChange).toHaveReceivedEventTimes(1);
  });

  it('should emit slChange when state changes when checked attribute removed', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentChecked);

    const radio = await page.find('sl-radio');

    const slChange = await radio.spyOnEvent('slChange');

    radio.removeAttribute('checked');
    await page.waitForChanges();

    expect(slChange).toHaveReceivedEventTimes(1);
  });

  it('should emit slChange when state changes when checked property set to true', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentUnchecked);

    const radio = await page.find('sl-radio');

    const slChange = await radio.spyOnEvent('slChange');

    radio.setProperty('checked', true);
    await page.waitForChanges();

    expect(slChange).toHaveReceivedEventTimes(1);
  });

  it('should emit slChange when state changes when checked property set to false', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentChecked);

    const radio = await page.find('sl-radio');

    const slChange = await radio.spyOnEvent('slChange');

    radio.setProperty('checked', false);
    await page.waitForChanges();

    expect(slChange).toHaveReceivedEventTimes(1);
  });
});
