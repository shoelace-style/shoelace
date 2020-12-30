import { newE2EPage } from '@stencil/core/testing';

const testContent = `
<sl-textarea></sl-textarea>
<button>Other Element</button>
`;

describe('textarea', () => {
  it('should emit slFocus when gaining focus', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const textarea = await page.find('sl-textarea');

    const slFocus = await textarea.spyOnEvent('slFocus');

    // give focus
    await textarea.click();

    expect(slFocus).toHaveReceivedEventTimes(1);
  });

  it('should emit slBlur when losing focus', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const textarea = await page.find('sl-textarea');
    const otherElement = await page.find('button');

    const slBlur = await textarea.spyOnEvent('slBlur');

    //give focus
    await textarea.click();

    // remove focus by clicking on other element
    await otherElement.click();

    expect(slBlur).toHaveReceivedEventTimes(1);
  });

  it('should emit slFocus on setFocus', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const textarea = await page.find('sl-textarea');

    const slFocus = await textarea.spyOnEvent('slFocus');

    await textarea.callMethod('setFocus');

    expect(slFocus).toHaveReceivedEventTimes(1);
  });

  it('should emit slBlur on removeFocus', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const textarea = await page.find('sl-textarea');

    const slBlur = await textarea.spyOnEvent('slBlur');

    await textarea.callMethod('setFocus');
    await textarea.callMethod('removeFocus');

    expect(slBlur).toHaveReceivedEventTimes(1);
  });

  it('should emit slChange when text entered and focus removed', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const textarea = await page.find('sl-textarea');
    const textareaControl = await page.find('sl-textarea >>> .textarea__control');

    const slChange = await textarea.spyOnEvent('slChange');

    await textareaControl.press('A');
    await textarea.callMethod('removeFocus');

    expect(slChange).toHaveReceivedEventTimes(1);
  });

  it('should emit slInput when text entered', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const textarea = await page.find('sl-textarea');
    const textareaControl = await page.find('sl-textarea >>> .textarea__control');

    const slInput = await textarea.spyOnEvent('slInput');

    await textareaControl.press('A');

    expect(slInput).toHaveReceivedEventTimes(1);
  });

  it('should change value when text entered', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const textarea = await page.find('sl-textarea');
    const textareaControl = await page.find('sl-textarea >>> .textarea__control');

    await textareaControl.press('A');

    expect(await textarea.getProperty('value')).toBe('A');
  });

  it('should select all text when select method called', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const textarea = await page.find('sl-textarea');
    const textareaControl = await page.find('sl-textarea >>> .textarea__control');

    await textareaControl.press('A');
    await textareaControl.press('d');
    await textareaControl.press('a');

    await textarea.callMethod('select');

    const selectedText = await page.evaluate(() => window.getSelection().toString());

    expect(selectedText).toBe('Ada');
  });

  it('should select range of text when setSelectionRange method called', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const textarea = await page.find('sl-textarea');
    const textareaControl = await page.find('sl-textarea >>> .textarea__control');

    await textareaControl.press('A');
    await textareaControl.press('d');
    await textareaControl.press('a');

    await textarea.callMethod('setSelectionRange', 1, 2);

    const selectedText = await page.evaluate(() => window.getSelection().toString());

    expect(selectedText).toBe('d');
  });

  it('should replace text when setRangeText method called', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const textarea = await page.find('sl-textarea');
    const textareaControl = await page.find('sl-textarea >>> .textarea__control');

    await textareaControl.press('A');
    await textareaControl.press('d');
    await textareaControl.press('a');

    await textarea.callMethod('setRangeText', 'bb', 1, 2);
    const value = await textarea.getProperty('value');

    expect(value).toBe('Abba');
  });
});
