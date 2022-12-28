import { aTimeout, expect, fixture, html, oneEvent, waitUntil } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import sinon from 'sinon';
import { waitForEvent } from '../../internal/event';
import { clickOnElement } from '../../internal/test';
import { serialize } from '../../utilities/form';
import type SlOption from '../option/option';
import type SlSelect from './select';

describe('<sl-select>', () => {
  it('should pass accessibility tests', async () => {
    const el = await fixture<SlSelect>(html`
      <sl-select label="Select one">
        <sl-option value="option-1">Option 1</sl-option>
        <sl-option value="option-2">Option 2</sl-option>
        <sl-option value="option-3">Option 3</sl-option>
      </sl-select>
    `);
    await expect(el).to.be.accessible();
  });

  it('should be disabled with the disabled attribute', async () => {
    const el = await fixture<SlSelect>(html`
      <sl-select disabled>
        <sl-option value="option-1">Option 1</sl-option>
        <sl-option value="option-2">Option 2</sl-option>
        <sl-option value="option-3">Option 3</sl-option>
      </sl-select>
    `);
    expect(el.displayInput.disabled).to.be.true;
  });

  it('should not allow selection when the option is disabled', async () => {
    const el = await fixture<SlSelect>(html`
      <sl-select value="option-1">
        <sl-option value="option-1">Option 1</sl-option>
        <sl-option value="option-2" disabled>Option 2</sl-option>
      </sl-select>
    `);
    const disabledOption = el.querySelector('sl-option[disabled]')!;

    await clickOnElement(el);
    await waitForEvent(el, 'sl-after-show');
    await clickOnElement(disabledOption);
    await el.updateComplete;

    expect(el.value).to.equal('option-1');
  });

  it('should focus the select when clicking on the label', async () => {
    const el = await fixture<SlSelect>(html`
      <sl-select label="Select One">
        <sl-option value="option-1">Option 1</sl-option>
        <sl-option value="option-2">Option 2</sl-option>
        <sl-option value="option-3">Option 3</sl-option>
      </sl-select>
    `);
    const label = el.shadowRoot!.querySelector('[part~="form-control-label"]')!;
    const submitHandler = sinon.spy();

    el.addEventListener('sl-focus', submitHandler);
    (label as HTMLLabelElement).click();
    await waitUntil(() => submitHandler.calledOnce);

    expect(submitHandler).to.have.been.calledOnce;
  });

  describe('when the value changes', () => {
    it('should emit sl-change when the value is changed with the mouse', async () => {
      const el = await fixture<SlSelect>(html`
        <sl-select value="option-1">
          <sl-option value="option-1">Option 1</sl-option>
          <sl-option value="option-2">Option 2</sl-option>
          <sl-option value="option-3">Option 3</sl-option>
        </sl-select>
      `);
      const secondOption = el.querySelectorAll<SlOption>('sl-option')[1];
      const changeHandler = sinon.spy();
      const inputHandler = sinon.spy();

      el.addEventListener('sl-change', changeHandler);
      el.addEventListener('sl-input', inputHandler);

      await clickOnElement(el);
      await waitForEvent(el, 'sl-after-show');
      await clickOnElement(secondOption);
      await el.updateComplete;

      expect(changeHandler).to.have.been.calledOnce;
      expect(inputHandler).to.have.been.calledOnce;
      expect(el.value).to.equal('option-2');
    });

    it('should emit sl-change and sl-input when the value is changed with the keyboard', async () => {
      const el = await fixture<SlSelect>(html`
        <sl-select value="option-1">
          <sl-option value="option-1">Option 1</sl-option>
          <sl-option value="option-2">Option 2</sl-option>
          <sl-option value="option-3">Option 3</sl-option>
        </sl-select>
      `);
      const changeHandler = sinon.spy();
      const inputHandler = sinon.spy();

      el.addEventListener('sl-change', changeHandler);
      el.addEventListener('sl-input', inputHandler);

      el.focus();
      await el.updateComplete;
      await sendKeys({ press: ' ' }); // open the dropdown
      await aTimeout(500); // wait for the dropdown to open
      await sendKeys({ press: 'ArrowDown' }); // move selection to the second option
      await el.updateComplete;
      await sendKeys({ press: 'ArrowDown' }); // move selection to the third option
      await el.updateComplete;
      await sendKeys({ press: 'Enter' }); // commit the selection
      await el.updateComplete;

      expect(changeHandler).to.have.been.calledOnce;
      expect(inputHandler).to.have.been.calledOnce;
      expect(el.value).to.equal('option-3');
    });

    it('should not emit sl-change or sl-input when the value is changed programmatically', async () => {
      const el = await fixture<SlSelect>(html`
        <sl-select value="option-1">
          <sl-option value="option-1">Option 1</sl-option>
          <sl-option value="option-2">Option 2</sl-option>
          <sl-option value="option-3">Option 3</sl-option>
        </sl-select>
      `);

      el.addEventListener('sl-change', () => expect.fail('sl-change should not be emitted'));
      el.addEventListener('sl-input', () => expect.fail('sl-input should not be emitted'));
      el.value = 'option-2';

      await el.updateComplete;
    });
  });

  it('should open the listbox when any letter key is pressed with sl-select is on focus', async () => {
    const el = await fixture<SlSelect>(html`
      <sl-select>
        <sl-option value="option-1">Option 1</sl-option>
        <sl-option value="option-2">Option 2</sl-option>
        <sl-option value="option-3">Option 3</sl-option>
      </sl-select>
    `);
    const displayInput = el.shadowRoot!.querySelector<HTMLSelectElement>('.select__display-input')!;

    el.focus();
    await sendKeys({ press: 'r' });
    await el.updateComplete;

    expect(displayInput.getAttribute('aria-expanded')).to.equal('true');
  });

  it('should not open the listbox when ctrl + R is pressed with sl-select is on focus', async () => {
    const el = await fixture<SlSelect>(html`
      <sl-select>
        <sl-option value="option-1">Option 1</sl-option>
        <sl-option value="option-2">Option 2</sl-option>
        <sl-option value="option-3">Option 3</sl-option>
      </sl-select>
    `);
    const displayInput = el.shadowRoot!.querySelector<HTMLSelectElement>('.select__display-input')!;

    el.focus();
    await sendKeys({ down: 'Control' });
    await sendKeys({ press: 'r' });
    await sendKeys({ up: 'Control' });
    await el.updateComplete;
    expect(displayInput.getAttribute('aria-expanded')).to.equal('false');
  });

  describe('when using constraint validation', () => {
    it('should be valid by default', async () => {
      const el = await fixture<HTMLFormElement>(html`
        <form>
          <sl-select>
            <sl-option value="option-1">Option 1</sl-option>
            <sl-option value="option-2">Option 2</sl-option>
            <sl-option value="option-3">Option 3</sl-option>
          </sl-select>
        </form>
      `);
      const select = el.querySelector<SlSelect>('sl-select')!;
      expect(select.checkValidity()).to.be.true;
    });

    it('should be invalid when required and empty', async () => {
      const el = await fixture<HTMLFormElement>(html`
        <form>
          <sl-select required>
            <sl-option value="option-1">Option 1</sl-option>
            <sl-option value="option-2">Option 2</sl-option>
            <sl-option value="option-3">Option 3</sl-option>
          </sl-select>
        </form>
      `);
      const select = el.querySelector<SlSelect>('sl-select')!;
      expect(select.checkValidity()).to.be.false;
    });

    it('should focus on the displayInput when constraint validation occurs', async () => {
      const el = await fixture<HTMLFormElement>(html`
        <form>
          <sl-select required>
            <sl-option value="option-1">Option 1</sl-option>
            <sl-option value="option-2">Option 2</sl-option>
            <sl-option value="option-3">Option 3</sl-option>
          </sl-select>
        </form>
      `);
      const select = el.querySelector<SlSelect>('sl-select')!;
      el.requestSubmit();
      expect(select.shadowRoot!.activeElement).to.equal(select.displayInput);
    });
  });

  describe('when serializing', () => {
    it('should serialize its name and value with FormData', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <sl-select name="a" value="option-1">
            <sl-option value="option-1">Option 1</sl-option>
            <sl-option value="option-2">Option 2</sl-option>
            <sl-option value="option-3">Option 3</sl-option>
          </sl-select>
        </form>
      `);
      const formData = new FormData(form);
      expect(formData.get('a')).to.equal('option-1');
    });

    it('should serialize its name and value in FormData when multiple options are selected', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <sl-select name="a" value="option-2 option-3" multiple>
            <sl-option value="option-1">Option 1</sl-option>
            <sl-option value="option-2">Option 2</sl-option>
            <sl-option value="option-3">Option 3</sl-option>
          </sl-select>
        </form>
      `);
      const formData = new FormData(form);
      expect(formData.getAll('a')).to.include('option-2');
      expect(formData.getAll('a')).to.include('option-3');
    });

    it('should serialize its name and value in JSON', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <sl-select name="a" value="option-1">
            <sl-option value="option-1">Option 1</sl-option>
            <sl-option value="option-2">Option 2</sl-option>
            <sl-option value="option-3">Option 3</sl-option>
          </sl-select>
        </form>
      `);
      const json = serialize(form);
      expect(json.a).to.equal('option-1');
    });

    it('should serialize its name and value in JSON when multiple options are selected', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <sl-select name="a" value="option-2 option-3" multiple>
            <sl-option value="option-1">Option 1</sl-option>
            <sl-option value="option-2">Option 2</sl-option>
            <sl-option value="option-3">Option 3</sl-option>
          </sl-select>
        </form>
      `);
      const json = serialize(form);
      expect(JSON.stringify(json)).to.equal(JSON.stringify({ a: ['option-2', 'option-3'] }));
    });
  });

  describe('when resetting a form', () => {
    it('should reset the element to its initial value', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <sl-select value="option-1">
            <sl-option value="option-1">Option 1</sl-option>
            <sl-option value="option-2">Option 2</sl-option>
            <sl-option value="option-3">Option 3</sl-option>
          </sl-select>
          <sl-button type="reset">Reset</sl-button>
        </form>
      `);
      const resetButton = form.querySelector('sl-button')!;
      const select = form.querySelector('sl-select')!;
      const option2 = form.querySelectorAll('sl-option')![1];

      await clickOnElement(select);
      await waitForEvent(select, 'sl-after-show');

      await clickOnElement(option2);
      await select.updateComplete;
      expect(select.value).to.equal('option-2');

      setTimeout(() => clickOnElement(resetButton));
      await oneEvent(form, 'reset');
      await select.updateComplete;
      expect(select.value).to.equal('option-1');
    });
  });

  it('should update the display label when an option changes', async () => {
    const el = await fixture<SlSelect>(html`
      <sl-select value="option-1">
        <sl-option value="option-1">Option 1</sl-option>
        <sl-option value="option-2">Option 2</sl-option>
        <sl-option value="option-3">Option 3</sl-option>
      </sl-select>
    `);
    const displayInput = el.shadowRoot!.querySelector<HTMLSelectElement>('.select__display-input')!;
    const option = el.querySelector('sl-option')!;

    expect(displayInput.value).to.equal('Option 1');

    option.textContent = 'updated';
    await oneEvent(option, 'slotchange');
    await el.updateComplete;

    expect(displayInput.value).to.equal('updated');
  });
});
