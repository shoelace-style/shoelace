import { newE2EPage } from '@stencil/core/testing';

const testContentUnchecked = `
<sl-checkbox>Checkbox</sl-checkbox>
<button>Other Element</button>
`;

const testContentChecked = `
<sl-checkbox checked>Checkbox</sl-checkbox>
<button>Other Element</button>
`;

describe('checkbox', () => {
  it('should emit slFocus when gaining focus', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentUnchecked);

    const checkbox = await page.find('sl-checkbox');

    const slFocus = await checkbox.spyOnEvent('slFocus');

    // give focus
    await checkbox.click();

    expect(slFocus).toHaveReceivedEventTimes(1);
  });

  it('should emit slBlur when losing focus', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentUnchecked);

    const checkbox = await page.find('sl-checkbox');
    const otherElement = await page.find('button');

    const slBlur = await checkbox.spyOnEvent('slBlur');

    //give focus
    await checkbox.click();

    // remove focus by clicking on other element
    await otherElement.click();

    expect(slBlur).toHaveReceivedEventTimes(1);
  });

  it('should emit slFocus on setFocus', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentUnchecked);

    const checkbox = await page.find('sl-checkbox');

    const slFocus = await checkbox.spyOnEvent('slFocus');

    await checkbox.callMethod('setFocus');

    expect(slFocus).toHaveReceivedEventTimes(1);
  });

  it('should emit slBlur on removeFocus', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentUnchecked);

    const checkbox = await page.find('sl-checkbox');

    const slBlur = await checkbox.spyOnEvent('slBlur');

    await checkbox.callMethod('setFocus');
    await checkbox.callMethod('removeFocus');

    expect(slBlur).toHaveReceivedEventTimes(1);
  });

  it('should emit slChange when state changes with click', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentUnchecked);

    const checkbox = await page.find('sl-checkbox');

    const slChange = await checkbox.spyOnEvent('slChange');

    await checkbox.click();

    expect(slChange).toHaveReceivedEventTimes(1);
  });

  it('should emit slChange when state changes when checked attribute set', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentUnchecked);

    const checkbox = await page.find('sl-checkbox');

    const slChange = await checkbox.spyOnEvent('slChange');

    checkbox.setAttribute('checked', '');
    await page.waitForChanges();

    expect(slChange).toHaveReceivedEventTimes(1);
  });

  it('should emit slChange when state changes when checked attribute removed', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentChecked);

    const checkbox = await page.find('sl-checkbox');

    const slChange = await checkbox.spyOnEvent('slChange');

    checkbox.removeAttribute('checked');
    await page.waitForChanges();

    expect(slChange).toHaveReceivedEventTimes(1);
  });

  it('should emit slChange when state changes when checked property set to true', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentUnchecked);

    const checkbox = await page.find('sl-checkbox');

    const slChange = await checkbox.spyOnEvent('slChange');

    checkbox.setProperty('checked', true);
    await page.waitForChanges();

    expect(slChange).toHaveReceivedEventTimes(1);
  });

  it('should emit slChange when state changes when checked property set to false', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentChecked);

    const checkbox = await page.find('sl-checkbox');

    const slChange = await checkbox.spyOnEvent('slChange');

    checkbox.setProperty('checked', false);
    await page.waitForChanges();

    expect(slChange).toHaveReceivedEventTimes(1);
  });
});
