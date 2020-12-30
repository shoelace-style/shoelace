import { newE2EPage } from '@stencil/core/testing';

const testContentUnchecked = `
<sl-switch>Switch</sl-switch>
<button>Other Element</button>
`;

const testContentChecked = `
<sl-switch checked>Switch</sl-switch>
<button>Other Element</button>
`;

describe('switch', () => {
  it('should emit slFocus when gaining focus', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentUnchecked);

    const switchComponent = await page.find('sl-switch');

    const slFocus = await switchComponent.spyOnEvent('slFocus');

    // give focus
    await switchComponent.click();

    expect(slFocus).toHaveReceivedEventTimes(1);
  });

  it('should emit slBlur when losing focus', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentUnchecked);

    const switchComponent = await page.find('sl-switch');
    const otherElement = await page.find('button');

    const slBlur = await switchComponent.spyOnEvent('slBlur');

    //give focus
    await switchComponent.click();

    // remove focus by clicking on other element
    await otherElement.click();

    expect(slBlur).toHaveReceivedEventTimes(1);
  });

  it('should emit slFocus on setFocus', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentUnchecked);

    const switchComponent = await page.find('sl-switch');

    const slFocus = await switchComponent.spyOnEvent('slFocus');

    await switchComponent.callMethod('setFocus');

    expect(slFocus).toHaveReceivedEventTimes(1);
  });

  it('should emit slBlur on removeFocus', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentUnchecked);

    const switchComponent = await page.find('sl-switch');

    const slBlur = await switchComponent.spyOnEvent('slBlur');

    await switchComponent.callMethod('setFocus');
    await switchComponent.callMethod('removeFocus');

    expect(slBlur).toHaveReceivedEventTimes(1);
  });

  it('should emit slChange when state changes with click', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentUnchecked);

    const switchComponent = await page.find('sl-switch');

    const slChange = await switchComponent.spyOnEvent('slChange');

    await switchComponent.click();

    expect(slChange).toHaveReceivedEventTimes(1);
  });

  it('should emit slChange when state changes when checked attribute set', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentUnchecked);

    const switchComponent = await page.find('sl-switch');

    const slChange = await switchComponent.spyOnEvent('slChange');

    switchComponent.setAttribute('checked', '');
    await page.waitForChanges();

    expect(slChange).toHaveReceivedEventTimes(1);
  });

  it('should emit slChange when state changes when checked attribute removed', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentChecked);

    const switchComponent = await page.find('sl-switch');

    const slChange = await switchComponent.spyOnEvent('slChange');

    switchComponent.removeAttribute('checked');
    await page.waitForChanges();

    expect(slChange).toHaveReceivedEventTimes(1);
  });

  it('should emit slChange when state changes when checked property set to true', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentUnchecked);

    const switchComponent = await page.find('sl-switch');

    const slChange = await switchComponent.spyOnEvent('slChange');

    switchComponent.setProperty('checked', true);
    await page.waitForChanges();

    expect(slChange).toHaveReceivedEventTimes(1);
  });

  it('should emit slChange when state changes when checked property set to false', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentChecked);

    const switchComponent = await page.find('sl-switch');

    const slChange = await switchComponent.spyOnEvent('slChange');

    switchComponent.setProperty('checked', false);
    await page.waitForChanges();

    expect(slChange).toHaveReceivedEventTimes(1);
  });
});
