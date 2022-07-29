import { aTimeout, expect, fixture, html, oneEvent, waitUntil } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import sinon from 'sinon';
import type SlRadioGroup from '../../components/radio-group/radio-group';
import type SlRadio from './radio';

describe('<sl-radio>', () => {
  it('should be disabled with the disabled attribute', async () => {
    const el = await fixture<SlRadio>(html` <sl-radio disabled></sl-radio> `);
    const radio = el.input;

    expect(radio.disabled).to.be.true;
  });

  it('should be valid by default', async () => {
    const el = await fixture<SlRadio>(html` <sl-radio></sl-radio> `);

    expect(el.invalid).to.be.false;
  });

  it('should fire sl-change when clicked', async () => {
    const el = await fixture<SlRadio>(html` <sl-radio></sl-radio> `);
    setTimeout(() => el.input.click());
    const event = (await oneEvent(el, 'sl-change')) as CustomEvent;
    expect(event.target).to.equal(el);
    expect(el.checked).to.be.true;
  });

  it('should fire sl-change when toggled via keyboard - space', async () => {
    const el = await fixture<SlRadio>(html` <sl-radio></sl-radio> `);
    el.input.focus();
    setTimeout(() => sendKeys({ press: ' ' }));
    const event = (await oneEvent(el, 'sl-change')) as CustomEvent;
    expect(event.target).to.equal(el);
    expect(el.checked).to.be.true;
  });

  it('should fire sl-change when toggled via keyboard - arrow key', async () => {
    const radioGroup = await fixture<SlRadioGroup>(html`
      <sl-radio-group>
        <sl-radio id="radio-1"></sl-radio>
        <sl-radio id="radio-2"></sl-radio>
      </sl-radio-group>
    `);
    const radio1 = radioGroup.querySelector<SlRadio>('#radio-1')!;
    const radio2 = radioGroup.querySelector<SlRadio>('#radio-2')!;
    radio1.input.focus();
    setTimeout(() => sendKeys({ press: 'ArrowRight' }));
    const event = (await oneEvent(radio2, 'sl-change')) as CustomEvent;
    expect(event.target).to.equal(radio2);
    expect(radio2.checked).to.be.true;
  });

  it('should not get checked when disabled', async () => {
    const radioGroup = await fixture<SlRadioGroup>(html`
      <sl-radio-group>
        <sl-radio checked></sl-radio>
        <sl-radio disabled></sl-radio>
      </sl-radio-group>
    `);
    const radio1 = radioGroup.querySelector<SlRadio>('sl-radio[checked]')!;
    const radio2 = radioGroup.querySelector<SlRadio>('sl-radio[disabled]')!;

    radio2.click();
    await Promise.all([radio1.updateComplete, radio2.updateComplete]);

    expect(radio1.checked).to.be.true;
    expect(radio2.checked).to.be.false;
  });

  describe('when submitting a form', () => {
    it('should submit the correct value when a value is provided', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <sl-radio-group>
            <sl-radio id="radio-1" name="a" value="1" checked></sl-radio>
            <sl-radio id="radio-2" name="a" value="2"></sl-radio>
            <sl-radio id="radio-3" name="a" value="3"></sl-radio>
          </sl-radio-group>
          <sl-button type="submit">Submit</sl-button>
        </form>
      `);
      const button = form.querySelector('sl-button')!;
      const radio = form.querySelectorAll('sl-radio')[1]!;
      const submitHandler = sinon.spy((event: SubmitEvent) => {
        formData = new FormData(form);
        event.preventDefault();
      });
      let formData: FormData;

      form.addEventListener('submit', submitHandler);
      radio.click();
      await radio.updateComplete;

      button.click();
      await waitUntil(() => submitHandler.calledOnce);

      expect(formData!.get('a')).to.equal('2');
    });
  });

  describe('when resetting a form', () => {
    it('should reset the element to its initial value', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <sl-radio name="a" value="1" checked></sl-radio>
          <sl-button type="reset">Reset</sl-button>
        </form>
      `);
      const button = form.querySelector('sl-button')!;
      const radio = form.querySelector('sl-radio')!;
      radio.checked = false;

      await radio.updateComplete;
      setTimeout(() => button.click());

      await oneEvent(form, 'reset');
      await radio.updateComplete;

      expect(radio.checked).to.true;

      radio.defaultChecked = false;

      setTimeout(() => button.click());
      await oneEvent(form, 'reset');
      await radio.updateComplete;

      expect(radio.checked).to.false;
    });
  });

  it('should submit "on" when no value is provided', async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <sl-radio-group>
          <sl-radio id="radio-1" name="a" checked></sl-radio>
          <sl-radio id="radio-2" name="a"></sl-radio>
          <sl-radio id="radio-3" name="a"></sl-radio>
        </sl-radio-group>
        <sl-button type="submit">Submit</sl-button>
      </form>
    `);
    const button = form.querySelector('sl-button')!;
    const radio = form.querySelectorAll('sl-radio')[1]!;
    const submitHandler = sinon.spy((event: SubmitEvent) => {
      formData = new FormData(form);
      event.preventDefault();
    });
    let formData: FormData;

    form.addEventListener('submit', submitHandler);
    radio.click();
    button.click();

    await waitUntil(() => submitHandler.calledOnce);

    expect(formData!.get('a')).to.equal('on');
  });

  it('should show a constraint validation error when setCustomValidity() is called', async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <sl-radio-group>
          <sl-radio id="radio-1" name="a" value="1" checked></sl-radio>
          <sl-radio id="radio-2" name="a" value="2"></sl-radio>
        </sl-radio-group>
        <sl-button type="submit">Submit</sl-button>
      </form>
    `);
    const button = form.querySelector('sl-button')!;
    const radio = form.querySelectorAll('sl-radio')[1]!;
    const submitHandler = sinon.spy((event: SubmitEvent) => event.preventDefault());

    // Submitting the form after setting custom validity should not trigger the handler
    radio.setCustomValidity('Invalid selection');
    form.addEventListener('submit', submitHandler);
    button.click();

    await aTimeout(100);

    expect(submitHandler).to.not.have.been.called;
  });
});
