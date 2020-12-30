import { newE2EPage } from '@stencil/core/testing';

describe('<sl-textarea>', () => {
  it('should emit sl-focus when gaining focus', async () => {
    const page = await newE2EPage({
      html: `
        <sl-textarea></sl-textarea>
      `
    });
    const textarea = await page.find('sl-textarea');
    const slFocus = await textarea.spyOnEvent('sl-focus');

    await textarea.click();

    expect(slFocus).toHaveReceivedEventTimes(1);
  });

  it('should emit sl-blur when losing focus', async () => {
    const page = await newE2EPage({
      html: `
        <sl-textarea></sl-textarea>
        <button>Other Element</button>
      `
    });
    const textarea = await page.find('sl-textarea');
    const button = await page.find('button');
    const slBlur = await textarea.spyOnEvent('sl-blur');

    await textarea.click();
    await button.click();

    expect(slBlur).toHaveReceivedEventTimes(1);
  });

  it('should emit sl-focus when setFocus() is called', async () => {
    const page = await newE2EPage({
      html: `
        <sl-textarea></sl-textarea>
      `
    });
    const textarea = await page.find('sl-textarea');
    const slFocus = await textarea.spyOnEvent('sl-focus');

    await textarea.callMethod('setFocus');

    expect(slFocus).toHaveReceivedEventTimes(1);
  });

  it('should emit sk-blur when removeFocus() is called', async () => {
    const page = await newE2EPage({
      html: `
        <sl-textarea></sl-textarea>
      `
    });
    const textarea = await page.find('sl-textarea');
    const slBlur = await textarea.spyOnEvent('sl-blur');

    await textarea.callMethod('setFocus');
    await textarea.callMethod('removeFocus');

    expect(slBlur).toHaveReceivedEventTimes(1);
  });

  it('should emit sl-change when text is entered and focus is removed', async () => {
    const page = await newE2EPage({
      html: `
        <sl-textarea></sl-textarea>
      `
    });
    const textarea = await page.find('sl-textarea');
    const textareaControl = await page.find('sl-textarea >>> .textarea__control');
    const slChange = await textarea.spyOnEvent('sl-change');

    await textareaControl.press('A');
    await textarea.callMethod('removeFocus');

    expect(slChange).toHaveReceivedEventTimes(1);
  });

  it('should emit sl-textarea when text entered', async () => {
    const page = await newE2EPage({
      html: `
        <sl-textarea></sl-textarea>
      `
    });
    const textarea = await page.find('sl-textarea');
    const textareaControl = await page.find('sl-textarea >>> .textarea__control');
    const slInput = await textarea.spyOnEvent('sl-input');

    await textareaControl.press('A');

    expect(slInput).toHaveReceivedEventTimes(1);
  });

  it('should sync value when text is entered', async () => {
    const page = await newE2EPage({
      html: `
        <sl-textarea></sl-textarea>
        <button>Other Element</button>
      `
    });
    const textarea = await page.find('sl-textarea');
    const textareaControl = await page.find('sl-textarea >>> .textarea__control');

    await textareaControl.press('A');

    expect(await textarea.getProperty('value')).toBe('A');
  });

  it('should select all text when select() method is called', async () => {
    const page = await newE2EPage({
      html: `
        <sl-textarea></sl-textarea>
      `
    });
    const textarea = await page.find('sl-textarea');
    const textareaControl = await page.find('sl-textarea >>> .textarea__control');

    await textareaControl.press('S');
    await textareaControl.press('h');
    await textareaControl.press('o');
    await textareaControl.press('e');
    await textarea.callMethod('select');

    const selectedText = await page.evaluate(() => window.getSelection().toString());

    expect(selectedText).toBe('Shoe');
  });

  it('should select a range of text when setSelectionRange() is called', async () => {
    const page = await newE2EPage({
      html: `
        <sl-textarea></sl-textarea>
      `
    });
    const textarea = await page.find('sl-textarea');
    const textareaControl = await page.find('sl-textarea >>> .textarea__control');

    await textareaControl.press('S');
    await textareaControl.press('h');
    await textareaControl.press('o');
    await textareaControl.press('e');
    await textarea.callMethod('setSelectionRange', 1, 3);

    const selectedText = await page.evaluate(() => window.getSelection().toString());

    expect(selectedText).toBe('ho');
  });

  it('should replace text when setRangeText() is called', async () => {
    const page = await newE2EPage({
      html: `
        <sl-textarea></sl-textarea>
      `
    });
    const textarea = await page.find('sl-textarea');
    const textareaControl = await page.find('sl-textarea >>> .textarea__control');

    await textareaControl.press('S');
    await textareaControl.press('h');
    await textareaControl.press('o');
    await textareaControl.press('e');
    await textarea.callMethod('setRangeText', 'ur', 1, 3);

    const value = await textarea.getProperty('value');

    expect(value).toBe('Sure');
  });
});
