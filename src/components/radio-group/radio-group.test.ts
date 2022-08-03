import { aTimeout, expect, fixture, html, oneEvent, waitUntil } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import sinon from 'sinon';
import type SlRadio from '../radio/radio';
import type SlRadioGroup from './radio-group';

describe('<sl-radio-group>', () => {
  describe('validation tests', () => {
    it(`should be valid when required and one radio is checked`, async () => {
      const el = await fixture<SlRadioGroup>(html`
        <sl-radio-group label="Select an option" value="1" required>
          <sl-radio name="option" value="1">Option 1</sl-radio>
          <sl-radio name="option" value="2">Option 2</sl-radio>
          <sl-radio name="option" value="3">Option 3</sl-radio>
        </sl-radio-group>
      `);

      expect(el.reportValidity()).to.be.true;
    });

    it(`should be invalid when required and no radios are checked`, async () => {
      const el = await fixture<SlRadioGroup>(html`
        <sl-radio-group label="Select an option" required>
          <sl-radio name="option" value="1">Option 1</sl-radio>
          <sl-radio name="option" value="2">Option 2</sl-radio>
          <sl-radio name="option" value="3">Option 3</sl-radio>
        </sl-radio-group>
      `);

      expect(el.reportValidity()).to.be.false;
    });

    it(`should be valid when required and a different radio is checked`, async () => {
      const el = await fixture<SlRadioGroup>(html`
        <sl-radio-group label="Select an option" value="3" required>
          <sl-radio name="option" value="1">Option 1</sl-radio>
          <sl-radio name="option" value="2">Option 2</sl-radio>
          <sl-radio name="option" value="3">Option 3</sl-radio>
        </sl-radio-group>
      `);

      expect(el.reportValidity()).to.be.true;
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

      expect(el.reportValidity()).to.be.false;
    });
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
});

describe('when emitting "sl-change" event', () => {
  it('should fire sl-change when toggled via keyboard - arrow key', async () => {
    const radioGroup = await fixture<SlRadioGroup>(html`
      <sl-radio-group>
        <sl-radio id="radio-1" value="1"></sl-radio>
        <sl-radio id="radio-2" value="2"></sl-radio>
      </sl-radio-group>
    `);
    const radio1 = radioGroup.querySelector<SlRadio>('#radio-1')!;

    radio1.focus();
    setTimeout(() => sendKeys({ press: 'ArrowRight' }));
    await oneEvent(radioGroup, 'sl-change');

    expect(radioGroup.value).to.equal('2');
  });

  it('should fire sl-change when clicked', async () => {
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

  it('should fire sl-change when toggled via keyboard - space', async () => {
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
});
