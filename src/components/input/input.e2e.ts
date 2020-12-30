import { newE2EPage } from '@stencil/core/testing';

describe('<sl-input>', () => {
  it('should emit sl-focus when gaining focus', async () => {
    const page = await newE2EPage({
      html: `
        <sl-input></sl-input>
      `
    });
    const input = await page.find('sl-input');
    const slFocus = await input.spyOnEvent('sl-focus');

    await input.click();

    expect(slFocus).toHaveReceivedEventTimes(1);
  });

  it('should emit sl-blur when losing focus', async () => {
    const page = await newE2EPage({
      html: `
        <sl-input></sl-input>
        <button>Other Element</button>
      `
    });
    const input = await page.find('sl-input');
    const button = await page.find('button');
    const slBlur = await input.spyOnEvent('sl-blur');

    await input.click();
    await button.click();

    expect(slBlur).toHaveReceivedEventTimes(1);
  });

  it('should emit sl-focus when setFocus() is called', async () => {
    const page = await newE2EPage({
      html: `
        <sl-input></sl-input>
      `
    });
    const input = await page.find('sl-input');
    const slFocus = await input.spyOnEvent('sl-focus');

    await input.callMethod('setFocus');

    expect(slFocus).toHaveReceivedEventTimes(1);
  });

  it('should emit sl-blur when removeFocus() is called', async () => {
    const page = await newE2EPage({
      html: `
        <sl-input></sl-input>
      `
    });
    const input = await page.find('sl-input');
    const slBlur = await input.spyOnEvent('sl-blur');

    await input.callMethod('setFocus');
    await input.callMethod('removeFocus');

    expect(slBlur).toHaveReceivedEventTimes(1);
  });

  it('should emit sl-change when text is entered and focus is removed', async () => {
    const page = await newE2EPage({
      html: `
        <sl-input></sl-input>
      `
    });
    const input = await page.find('sl-input');
    const inputControl = await page.find('sl-input >>> .input__control');
    const slChange = await input.spyOnEvent('sl-change');

    await inputControl.press('A');
    await input.callMethod('removeFocus');

    expect(slChange).toHaveReceivedEventTimes(1);
  });

  it('should emit sl-input when text entered', async () => {
    const page = await newE2EPage({
      html: `
        <sl-input></sl-input>
      `
    });
    const input = await page.find('sl-input');
    const inputControl = await page.find('sl-input >>> .input__control');
    const slInput = await input.spyOnEvent('sl-input');

    await inputControl.press('A');

    expect(slInput).toHaveReceivedEventTimes(1);
  });

  it('should sync value when text is entered', async () => {
    const page = await newE2EPage({
      html: `
        <sl-input></sl-input>
        <button>Other Element</button>
      `
    });
    const input = await page.find('sl-input');
    const inputControl = await page.find('sl-input >>> .input__control');

    await inputControl.press('A');

    expect(await input.getProperty('value')).toBe('A');
  });

  it('should emit sl-clear when cleared', async () => {
    const page = await newE2EPage({
      html: `
        <sl-input clearable></sl-input>
      `
    });
    const input = await page.find('sl-input');
    const inputControl = await page.find('sl-input >>> .input__control');
    const inputClear = await page.find('sl-input >>> .input__clear');
    const slClear = await input.spyOnEvent('sl-clear');

    await inputControl.press('A');
    await inputClear.click();

    expect(slClear).toHaveReceivedEventTimes(1);
  });

  it('should select all text when select() method is called', async () => {
    const page = await newE2EPage({
      html: `
        <sl-input></sl-input>
      `
    });
    const input = await page.find('sl-input');
    const inputControl = await page.find('sl-input >>> .input__control');

    await inputControl.press('S');
    await inputControl.press('h');
    await inputControl.press('o');
    await inputControl.press('e');
    await input.callMethod('select');

    const selectedText = await page.evaluate(() => window.getSelection().toString());
    expect(selectedText).toBe('Shoe');
  });

  it('should select a range of text when setSelectionRange() is called', async () => {
    const page = await newE2EPage({
      html: `
        <sl-input></sl-input>
      `
    });
    const input = await page.find('sl-input');
    const inputControl = await page.find('sl-input >>> .input__control');

    await inputControl.press('S');
    await inputControl.press('h');
    await inputControl.press('o');
    await inputControl.press('e');
    await input.callMethod('setSelectionRange', 1, 3);

    const selectedText = await page.evaluate(() => window.getSelection().toString());
    expect(selectedText).toBe('ho');
  });

  it('should replace text when setRangeText() is called', async () => {
    const page = await newE2EPage({
      html: `
        <sl-input></sl-input>
      `
    });
    const input = await page.find('sl-input');
    const inputControl = await page.find('sl-input >>> .input__control');

    await inputControl.press('S');
    await inputControl.press('h');
    await inputControl.press('o');
    await inputControl.press('e');
    await input.callMethod('setRangeText', 'ur', 1, 3);

    const value = await input.getProperty('value');
    expect(value).toBe('Sure');
  });
});
