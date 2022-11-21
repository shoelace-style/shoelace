import { expect, fixture, html, oneEvent, waitUntil } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import sinon from 'sinon';
import type SlSelect from './select';

describe('<sl-select>', () => {
  it('should pass accessibility tests', async () => {
    const el = await fixture<SlSelect>(html`
      <sl-select>
        <sl-menu-item value="option-1">Option 1</sl-menu-item>
        <sl-menu-item value="option-2">Option 2</sl-menu-item>
        <sl-menu-item value="option-3">Option 3</sl-menu-item>
      </sl-select>
    `);
    await expect(el).to.be.accessible();
  });

  it('should be disabled with the disabled attribute', async () => {
    const el = await fixture<SlSelect>(html`
      <sl-select disabled>
        <sl-menu-item value="option-1">Option 1</sl-menu-item>
        <sl-menu-item value="option-2">Option 2</sl-menu-item>
        <sl-menu-item value="option-3">Option 3</sl-menu-item>
      </sl-select>
    `);
    expect(el.dropdown.disabled).to.be.true;
    expect(el.control.tabIndex).to.equal(-1);
  });

  it('should focus the select when clicking on the label', async () => {
    const el = await fixture<SlSelect>(html`
      <sl-select label="Select One">
        <sl-menu-item value="option-1">Option 1</sl-menu-item>
        <sl-menu-item value="option-2">Option 2</sl-menu-item>
        <sl-menu-item value="option-3">Option 3</sl-menu-item>
      </sl-select>
    `);
    const label = el.shadowRoot!.querySelector('[part~="form-control-label"]')!;
    const submitHandler = sinon.spy();

    el.addEventListener('sl-focus', submitHandler);
    (label as HTMLLabelElement).click();
    await waitUntil(() => submitHandler.calledOnce);

    expect(submitHandler).to.have.been.calledOnce;
  });

  it('should emit sl-change when the value changes', async () => {
    const el = await fixture<SlSelect>(html`
      <sl-select>
        <sl-menu-item value="option-1">Option 1</sl-menu-item>
        <sl-menu-item value="option-2">Option 2</sl-menu-item>
        <sl-menu-item value="option-3">Option 3</sl-menu-item>
      </sl-select>
    `);
    const changeHandler = sinon.spy();

    el.addEventListener('sl-change', changeHandler);
    el.value = 'option-2';
    await waitUntil(() => changeHandler.calledOnce);

    expect(changeHandler).to.have.been.calledOnce;
  });

  it('should open the menu when any letter key is pressed with sl-select is on focus', async () => {
    const el = await fixture<SlSelect>(html`
      <sl-select>
        <sl-menu-item value="option-1">Option 1</sl-menu-item>
        <sl-menu-item value="option-2">Option 2</sl-menu-item>
        <sl-menu-item value="option-3">Option 3</sl-menu-item>
      </sl-select>
    `);
    const control = el.shadowRoot!.querySelector<HTMLSelectElement>('.select__control')!;
    control.focus();
    await sendKeys({ press: 'r' });
    await el.updateComplete;

    expect(control.getAttribute('aria-expanded')).to.equal('true');
  });

  it('should not open the menu when ctrl + R is pressed with sl-select is on focus', async () => {
    const el = await fixture<SlSelect>(html`
      <sl-select>
        <sl-menu-item value="option-1">Option 1</sl-menu-item>
        <sl-menu-item value="option-2">Option 2</sl-menu-item>
        <sl-menu-item value="option-3">Option 3</sl-menu-item>
      </sl-select>
    `);
    const control = el.shadowRoot!.querySelector<HTMLSelectElement>('.select__control')!;
    control.focus();
    await sendKeys({ down: 'Control' });
    await sendKeys({ press: 'r' });
    await sendKeys({ up: 'Control' });
    await el.updateComplete;
    expect(control.getAttribute('aria-expanded')).to.equal('false');
  });

  it('should focus on the custom control when constraint validation occurs', async () => {
    const el = await fixture<HTMLFormElement>(html`
      <form>
        <sl-select required>
          <sl-menu-item value="option-1">Option 1</sl-menu-item>
          <sl-menu-item value="option-2">Option 2</sl-menu-item>
          <sl-menu-item value="option-3">Option 3</sl-menu-item>
        </sl-select>
      </form>
    `);
    const select = el.querySelector('sl-select')!;
    el.requestSubmit();

    expect(select.shadowRoot!.activeElement).to.equal(select.control);
  });

  it('should update the display label when a menu item changes', async () => {
    const el = await fixture<SlSelect>(html`
      <sl-select value="option-1">
        <sl-menu-item value="option-1">Option 1</sl-menu-item>
        <sl-menu-item value="option-2">Option 2</sl-menu-item>
        <sl-menu-item value="option-3">Option 3</sl-menu-item>
      </sl-select>
    `);
    const displayLabel = el.shadowRoot!.querySelector('[part~="display-label"]')!;
    const menuItem = el.querySelector('sl-menu-item')!;

    expect(displayLabel.textContent?.trim()).to.equal('Option 1');
    menuItem.textContent = 'updated';

    await oneEvent(el, 'sl-label-change');
    await el.updateComplete;

    expect(displayLabel.textContent?.trim()).to.equal('updated');
  });

  describe('when resetting a form', () => {
    it('should reset the element to its initial value', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <sl-select value="option-1">
            <sl-menu-item value="option-1">Option 1</sl-menu-item>
            <sl-menu-item value="option-2">Option 2</sl-menu-item>
            <sl-menu-item value="option-3">Option 3</sl-menu-item>
          </sl-select>
          <sl-button type="reset">Reset</sl-button>
        </form>
      `);
      const button = form.querySelector('sl-button')!;
      const select = form.querySelector('sl-select')!;
      const option2 = form.querySelectorAll('sl-menu-item')![1];

      option2.click();
      await option2.updateComplete;

      expect(select.value).to.equal('option-2');

      setTimeout(() => button.click());
      await oneEvent(form, 'reset');
      await select.updateComplete;

      expect(select.value).to.equal('option-1');
    });
  });
});
