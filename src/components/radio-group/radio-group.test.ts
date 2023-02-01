import { aTimeout, expect, fixture, html, oneEvent, waitUntil } from '@open-wc/testing';
import { clickOnElement } from '../../internal/test';
import { sendKeys } from '@web/test-runner-commands';
import sinon from 'sinon';
import type SlRadio from '../radio/radio';
import type SlRadioGroup from './radio-group';

describe('<sl-radio-group>', () => {
  describe('validation tests', () => {
    it('should be invalid initially when required and no radio is checked', async () => {
      const radioGroup = await fixture<SlRadioGroup>(html`
        <sl-radio-group required>
          <sl-radio value="1"></sl-radio>
          <sl-radio value="2"></sl-radio>
        </sl-radio-group>
      `);

      expect(radioGroup.checkValidity()).to.be.false;
    });

    it('should become valid when an option is checked', async () => {
      const radioGroup = await fixture<SlRadioGroup>(html`
        <sl-radio-group required>
          <sl-radio value="1"></sl-radio>
          <sl-radio value="2"></sl-radio>
        </sl-radio-group>
      `);

      radioGroup.value = '1';
      await radioGroup.updateComplete;

      expect(radioGroup.checkValidity()).to.be.true;
    });

    it(`should be valid when required and one radio is checked`, async () => {
      const el = await fixture<SlRadioGroup>(html`
        <sl-radio-group label="Select an option" value="1" required>
          <sl-radio name="option" value="1">Option 1</sl-radio>
          <sl-radio name="option" value="2">Option 2</sl-radio>
          <sl-radio name="option" value="3">Option 3</sl-radio>
        </sl-radio-group>
      `);

      expect(el.checkValidity()).to.be.true;
    });

    it(`should be invalid when required and no radios are checked`, async () => {
      const el = await fixture<SlRadioGroup>(html`
        <sl-radio-group label="Select an option" required>
          <sl-radio name="option" value="1">Option 1</sl-radio>
          <sl-radio name="option" value="2">Option 2</sl-radio>
          <sl-radio name="option" value="3">Option 3</sl-radio>
        </sl-radio-group>
      `);

      expect(el.checkValidity()).to.be.false;
    });

    it(`should be valid when required and a different radio is checked`, async () => {
      const el = await fixture<SlRadioGroup>(html`
        <sl-radio-group label="Select an option" value="3" required>
          <sl-radio name="option" value="1">Option 1</sl-radio>
          <sl-radio name="option" value="2">Option 2</sl-radio>
          <sl-radio name="option" value="3">Option 3</sl-radio>
        </sl-radio-group>
      `);

      expect(el.checkValidity()).to.be.true;
    });

    it(`should be invalid when custom validity is set`, async () => {
      const el = await fixture<SlRadioGroup>(html`
        <sl-radio-group label="Select an option">
          <sl-radio name="option" value="1">Option 1</sl-radio>
          <sl-radio name="option" value="2">Option 2</sl-radio>
          <sl-radio name="option" value="3">Option 3</sl-radio>
        </sl-radio-group>
      `);

      el.setCustomValidity('Error');

      expect(el.checkValidity()).to.be.false;
    });

    it('should receive the correct validation attributes ("states") when valid', async () => {
      const radioGroup = await fixture<SlRadioGroup>(html`
        <sl-radio-group value="1" required>
          <sl-radio value="1"></sl-radio>
          <sl-radio value="2"></sl-radio>
        </sl-radio-group>
      `);
      const secondRadio = radioGroup.querySelectorAll('sl-radio')[1];

      expect(radioGroup.checkValidity()).to.be.true;
      expect(radioGroup.hasAttribute('data-required')).to.be.true;
      expect(radioGroup.hasAttribute('data-optional')).to.be.false;
      expect(radioGroup.hasAttribute('data-invalid')).to.be.false;
      expect(radioGroup.hasAttribute('data-valid')).to.be.true;
      expect(radioGroup.hasAttribute('data-user-invalid')).to.be.false;
      expect(radioGroup.hasAttribute('data-user-valid')).to.be.false;

      await clickOnElement(secondRadio);
      await secondRadio.updateComplete;

      expect(radioGroup.checkValidity()).to.be.true;
      expect(radioGroup.hasAttribute('data-user-invalid')).to.be.false;
      expect(radioGroup.hasAttribute('data-user-valid')).to.be.true;
    });

    it('should receive the correct validation attributes ("states") when invalid', async () => {
      const radioGroup = await fixture<SlRadioGroup>(html`
        <sl-radio-group required>
          <sl-radio value="1"></sl-radio>
          <sl-radio value="2"></sl-radio>
        </sl-radio-group>
      `);
      const secondRadio = radioGroup.querySelectorAll('sl-radio')[1];

      expect(radioGroup.hasAttribute('data-required')).to.be.true;
      expect(radioGroup.hasAttribute('data-optional')).to.be.false;
      expect(radioGroup.hasAttribute('data-invalid')).to.be.true;
      expect(radioGroup.hasAttribute('data-valid')).to.be.false;
      expect(radioGroup.hasAttribute('data-user-invalid')).to.be.false;
      expect(radioGroup.hasAttribute('data-user-valid')).to.be.false;

      await clickOnElement(secondRadio);
      radioGroup.value = '';
      await radioGroup.updateComplete;

      expect(radioGroup.hasAttribute('data-user-invalid')).to.be.true;
      expect(radioGroup.hasAttribute('data-user-valid')).to.be.false;
    });
  });

  it('should show a constraint validation error when setCustomValidity() is called', async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <sl-radio-group value="1">
          <sl-radio id="radio-1" name="a" value="1"></sl-radio>
          <sl-radio id="radio-2" name="a" value="2"></sl-radio>
        </sl-radio-group>
        <sl-button type="submit">Submit</sl-button>
      </form>
    `);
    const button = form.querySelector('sl-button')!;
    const radioGroup = form.querySelector<SlRadioGroup>('sl-radio-group')!;
    const submitHandler = sinon.spy((event: SubmitEvent) => event.preventDefault());

    // Submitting the form after setting custom validity should not trigger the handler
    radioGroup.setCustomValidity('Invalid selection');
    form.addEventListener('submit', submitHandler);
    button.click();

    await aTimeout(100);

    expect(submitHandler).to.not.have.been.called;
  });
});

describe('when resetting a form', () => {
  it('should reset the element to its initial value', async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <sl-radio-group value="1">
          <sl-radio value="1"></sl-radio>
          <sl-radio value="2"></sl-radio>
        </sl-radio-group>
        <sl-button type="reset">Reset</sl-button>
      </form>
    `);
    const button = form.querySelector('sl-button')!;
    const radioGroup = form.querySelector('sl-radio-group')!;
    radioGroup.value = '2';

    await radioGroup.updateComplete;
    setTimeout(() => button.click());

    await oneEvent(form, 'reset');
    await radioGroup.updateComplete;

    expect(radioGroup.value).to.equal('1');
  });
});

describe('when submitting a form', () => {
  it('should submit the correct value when a value is provided', async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <sl-radio-group name="a" value="1">
          <sl-radio id="radio-1" value="1"></sl-radio>
          <sl-radio id="radio-2" value="2"></sl-radio>
          <sl-radio id="radio-3" value="3"></sl-radio>
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

    expect(formData!.get('a')).to.equal('2');
  });

  it('should be present in form data when using the form attribute and located outside of a <form>', async () => {
    const el = await fixture<HTMLFormElement>(html`
      <div>
        <form id="f">
          <sl-button type="submit">Submit</sl-button>
        </form>
        <sl-radio-group form="f" name="a" value="1">
          <sl-radio id="radio-1" value="1"></sl-radio>
          <sl-radio id="radio-2" value="2"></sl-radio>
          <sl-radio id="radio-3" value="3"></sl-radio>
        </sl-radio-group>
      </div>
    `);
    const form = el.querySelector('form')!;
    const formData = new FormData(form);

    expect(formData.get('a')).to.equal('1');
  });
});

describe('when the value changes', () => {
  it('should emit sl-change when toggled with the arrow keys', async () => {
    const radioGroup = await fixture<SlRadioGroup>(html`
      <sl-radio-group>
        <sl-radio id="radio-1" value="1"></sl-radio>
        <sl-radio id="radio-2" value="2"></sl-radio>
      </sl-radio-group>
    `);
    const firstRadio = radioGroup.querySelector<SlRadio>('#radio-1')!;
    const changeHandler = sinon.spy();
    const inputHandler = sinon.spy();

    radioGroup.addEventListener('sl-change', changeHandler);
    radioGroup.addEventListener('sl-input', inputHandler);
    firstRadio.focus();
    await sendKeys({ press: 'ArrowRight' });
    await radioGroup.updateComplete;

    expect(changeHandler).to.have.been.calledOnce;
    expect(inputHandler).to.have.been.calledOnce;
    expect(radioGroup.value).to.equal('2');
  });

  it('should emit sl-change and sl-input when clicked', async () => {
    const radioGroup = await fixture<SlRadioGroup>(html`
      <sl-radio-group>
        <sl-radio id="radio-1" value="1"></sl-radio>
        <sl-radio id="radio-2" value="2"></sl-radio>
      </sl-radio-group>
    `);
    const radio = radioGroup.querySelector<SlRadio>('#radio-1')!;
    setTimeout(() => radio.click());
    const event = (await oneEvent(radioGroup, 'sl-change')) as CustomEvent;
    expect(event.target).to.equal(radioGroup);
    expect(radioGroup.value).to.equal('1');
  });

  it('should emit sl-change and sl-input when toggled with spacebar', async () => {
    const radioGroup = await fixture<SlRadioGroup>(html`
      <sl-radio-group>
        <sl-radio id="radio-1" value="1"></sl-radio>
        <sl-radio id="radio-2" value="2"></sl-radio>
      </sl-radio-group>
    `);
    const radio = radioGroup.querySelector<SlRadio>('#radio-1')!;
    radio.focus();
    setTimeout(() => sendKeys({ press: ' ' }));
    const event = (await oneEvent(radioGroup, 'sl-change')) as CustomEvent;
    expect(event.target).to.equal(radioGroup);
    expect(radioGroup.value).to.equal('1');
  });

  it('should not emit sl-change or sl-input when the value is changed programmatically', async () => {
    const radioGroup = await fixture<SlRadioGroup>(html`
      <sl-radio-group value="1">
        <sl-radio id="radio-1" value="1"></sl-radio>
        <sl-radio id="radio-2" value="2"></sl-radio>
      </sl-radio-group>
    `);

    radioGroup.addEventListener('sl-change', () => expect.fail('sl-change should not be emitted'));
    radioGroup.addEventListener('sl-input', () => expect.fail('sl-input should not be emitted'));
    radioGroup.value = '2';
    await radioGroup.updateComplete;
  });
});
