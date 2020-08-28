import { newE2EPage } from '@stencil/core/testing';

const testContent = `
<sl-button>Button</sl-button>
<button>Other Element</button>
`;

describe('button', () => {
  it('should emit slFocus when gaining focus', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const button = await page.find('sl-button');

    const slFocus = await button.spyOnEvent('slFocus');

    // give focus
    await button.click();

    expect(slFocus).toHaveReceivedEventTimes(1);
  });

  it('should emit slBlur when losing focus', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const button = await page.find('sl-button');
    const otherElement = await page.find('button');

    const slBlur = await button.spyOnEvent('slBlur');

    //give focus
    await button.click();

    // remove focus by clicking on other element
    await otherElement.click();

    expect(slBlur).toHaveReceivedEventTimes(1);
  });

  it('should emit slFocus on setFocus', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const button = await page.find('sl-button');

    const slFocus = await button.spyOnEvent('slFocus');

    await button.callMethod('setFocus');

    expect(slFocus).toHaveReceivedEventTimes(1);
  });

  it('should emit slBlur on removeFocus', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const button = await page.find('sl-button');

    const slBlur = await button.spyOnEvent('slBlur');

    await button.callMethod('setFocus');
    await button.callMethod('removeFocus');

    expect(slBlur).toHaveReceivedEventTimes(1);
  });
});
