import { newE2EPage } from '@stencil/core/testing';

const testContent = `
<sl-input clearable></sl-input>
<button>Other Element</button>
`;

describe('input', () => {
  it('should emit slFocus when gaining focus', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const input = await page.find('sl-input');

    const slFocus = await input.spyOnEvent('slFocus');

    // give focus
    await input.click();

    expect(slFocus).toHaveReceivedEventTimes(1);
  });

  it('should emit slBlur when losing focus', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const input = await page.find('sl-input');
    const otherElement = await page.find('button');

    const slBlur = await input.spyOnEvent('slBlur');

    //give focus
    await input.click();

    // remove focus by clicking on other element
    await otherElement.click();

    expect(slBlur).toHaveReceivedEventTimes(1);
  });

  it('should emit slFocus on setFocus', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const input = await page.find('sl-input');

    const slFocus = await input.spyOnEvent('slFocus');

    await input.callMethod('setFocus');

    expect(slFocus).toHaveReceivedEventTimes(1);
  });

  it('should emit slBlur on removeFocus', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const input = await page.find('sl-input');

    const slBlur = await input.spyOnEvent('slBlur');

    await input.callMethod('setFocus');
    await input.callMethod('removeFocus');

    expect(slBlur).toHaveReceivedEventTimes(1);
  });

  it('should emit slChange when text entered and focus removed', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const input = await page.find('sl-input');
    const inputControl = await page.find('sl-input >>> .input__control');

    const slChange = await input.spyOnEvent('slChange');

    await inputControl.press('A');
    await input.callMethod('removeFocus');

    expect(slChange).toHaveReceivedEventTimes(1);
  });

  it('should emit slInput when text entered', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const input = await page.find('sl-input');
    const inputControl = await page.find('sl-input >>> .input__control');

    const slInput = await input.spyOnEvent('slInput');

    await inputControl.press('A');

    expect(slInput).toHaveReceivedEventTimes(1);
  });

  it('should change value when text entered', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const input = await page.find('sl-input');
    const inputControl = await page.find('sl-input >>> .input__control');

    await inputControl.press('A');

    expect(await input.getProperty('value')).toBe('A');
  });

  it('should emit slClear when cleared', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const input = await page.find('sl-input');
    const inputControl = await page.find('sl-input >>> .input__control');
    const inputClear = await page.find('sl-input >>> .input__clear');

    const slClear = await input.spyOnEvent('slClear');

    await inputControl.press('A');
    await inputClear.click();

    expect(slClear).toHaveReceivedEventTimes(1);
  });

  it('should select all text when select method called', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const input = await page.find('sl-input');
    const inputControl = await page.find('sl-input >>> .input__control');

    await inputControl.press('A');
    await inputControl.press('d');
    await inputControl.press('a');

    await input.callMethod('select');

    const selectedText = await page.evaluate(() => window.getSelection().toString());

    expect(selectedText).toBe('Ada');
  });

  it('should select range of text when setSelectionRange method called', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const input = await page.find('sl-input');
    const inputControl = await page.find('sl-input >>> .input__control');

    await inputControl.press('A');
    await inputControl.press('d');
    await inputControl.press('a');

    await input.callMethod('setSelectionRange', 1, 2);

    const selectedText = await page.evaluate(() => window.getSelection().toString());

    expect(selectedText).toBe('d');
  });

  it('should replace text when setRangeText method called', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const input = await page.find('sl-input');
    const inputControl = await page.find('sl-input >>> .input__control');

    await inputControl.press('A');
    await inputControl.press('d');
    await inputControl.press('a');

    await input.callMethod('setRangeText', 'bb', 1, 2);
    const value = await input.getProperty('value');

    expect(value).toBe('Abba');
  });
});
