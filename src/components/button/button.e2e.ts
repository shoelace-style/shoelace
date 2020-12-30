import { newE2EPage } from '@stencil/core/testing';

describe('<sl-button>', () => {
  it('should emit sl-focus when gaining focus', async () => {
    const page = await newE2EPage({
      html: `
        <sl-button>Button</sl-button>
      `
    });
    const button = await page.find('sl-button');
    const slFocus = await button.spyOnEvent('sl-focus');

    await button.click();

    expect(slFocus).toHaveReceivedEventTimes(1);
  });

  it('should emit sl-blur when losing focus', async () => {
    const page = await newE2EPage({
      html: `
        <sl-button>Button</sl-button>
        <button>Native Button</button>
      `
    });
    const button = await page.find('sl-button');
    const nativeButton = await page.find('button');
    const slBlur = await button.spyOnEvent('sl-blur');

    await button.click();
    await nativeButton.click();

    expect(slBlur).toHaveReceivedEventTimes(1);
  });

  it('should emit sl-focus when calling setFocus()', async () => {
    const page = await newE2EPage({
      html: `
        <sl-button>Button</sl-button>
      `
    });
    const button = await page.find('sl-button');
    const slFocus = await button.spyOnEvent('sl-focus');

    await button.callMethod('setFocus');

    expect(slFocus).toHaveReceivedEventTimes(1);
  });

  it('should emit sl-blur when calling removeFocus()', async () => {
    const page = await newE2EPage({
      html: `
        <sl-button>Button</sl-button>
      `
    });
    const button = await page.find('sl-button');
    const slBlur = await button.spyOnEvent('sl-blur');

    await button.callMethod('setFocus');
    await button.callMethod('removeFocus');

    expect(slBlur).toHaveReceivedEventTimes(1);
  });
});
