import { newE2EPage } from '@stencil/core/testing';

const testContent = `
<sl-form class="form-overview">
  <sl-input name="name" type="text" label="Name" value="Ada"></sl-input>
  <br>
  <sl-select name="favorite" label="Select your favorite" value="dogs">
    <sl-menu-item value="birds">Birds</sl-menu-item>
    <sl-menu-item value="cats">Cats</sl-menu-item>
    <sl-menu-item value="dogs">Dogs</sl-menu-item>
  </sl-select>
  <br>
  <sl-checkbox name="agree" value="yes" checked>
    I totally agree
  </sl-checkbox>
  <br><br>
  <sl-button submit>Submit</sl-button>
</sl-form>
`;

describe('button', () => {
  it('should emit slSubmit when submit button clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const form = await page.find('sl-form');
    const button = await page.find('sl-button');

    const slSubmit = await form.spyOnEvent('slSubmit');

    await button.click();

    expect(slSubmit).toHaveReceivedEventTimes(1);
  });

  it('should emit slSubmit when submit method called', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const form = await page.find('sl-form');

    const slSubmit = await form.spyOnEvent('slSubmit');

    await form.callMethod('submit');

    expect(slSubmit).toHaveReceivedEventTimes(1);
  });

  it('should emit slSubmit when enter pressed in input', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const form = await page.find('sl-form');
    const inputControl = await page.find('sl-input >>> .input__control');

    const slSubmit = await form.spyOnEvent('slSubmit');

    await inputControl.press('Enter');

    expect(slSubmit).toHaveReceivedEventTimes(1);
  });

  it('should return array of form elements when getFormControls called', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const form = await page.find('sl-form');
    const inputEl = await page.$eval('sl-input', el => el);
    const selectEl = await page.$eval('sl-select', el => el);
    const checkboxEl = await page.$eval('sl-checkbox', el => el);
    const buttonEl = await page.$eval('sl-button', el => el);

    const formControls = await form.callMethod('getFormControls');

    expect(formControls).toEqual([inputEl, selectEl, checkboxEl, buttonEl]);
  });

  it('should return FormData object when getFormData called', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const formData = await page.$eval('sl-form', async el => [...(await el.getFormData()).entries()]);

    expect(formData).toEqual([
      ['name', 'Ada'],
      ['favorite', 'dogs'],
      ['agree', 'yes']
    ]);
  });
});
