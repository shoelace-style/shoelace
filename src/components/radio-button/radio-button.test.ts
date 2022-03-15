import { expect, fixture, html, oneEvent, waitUntil } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import sinon from 'sinon';
import type SlRadioGroup from '~/components/radio-group/radio-group';
import type SlRadioButton from './radio-button';

describe('<sl-radio-button>', () => {
  it('should be disabled with the disabled attribute', async () => {
    const el = await fixture<SlRadioButton>(html` <sl-radio-button disabled></sl-radio-button> `);

    expect(el.input.disabled).to.be.true;
  });

  it('should be valid by default', async () => {
    const el = await fixture<SlRadioButton>(html` <sl-radio-button></sl-radio-button> `);

    expect(el.invalid).to.be.false;
  });

  it('should fire sl-change when clicked', async () => {
    const el = await fixture<SlRadioButton>(html` <sl-radio-button></sl-radio-button> `);
    setTimeout(() => el.input.click());
    const event = await oneEvent(el, 'sl-change');
    expect(event.target).to.equal(el);
    expect(el.checked).to.be.true;
  });

  it('should fire sl-change when toggled via keyboard - space', async () => {
    const el = await fixture<SlRadioButton>(html` <sl-radio-button></sl-radio-button> `);
    el.input.focus();
    setTimeout(() => sendKeys({ press: ' ' }));
    const event = await oneEvent(el, 'sl-change');
    expect(event.target).to.equal(el);
    expect(el.checked).to.be.true;
  });

  it('should fire sl-change when toggled via keyboard - arrow key', async () => {
    const radioGroup = await fixture<SlRadioGroup>(html`
      <sl-radio-group>
        <sl-radio-button id="radio-1"></sl-radio-button>
        <sl-radio-button id="radio-2"></sl-radio-button>
      </sl-radio-group>
    `);
    const radio1 = radioGroup.querySelector<SlRadioButton>('#radio-1')!;
    const radio2 = radioGroup.querySelector<SlRadioButton>('#radio-2')!;
    radio1.input.focus();
    setTimeout(() => sendKeys({ press: 'ArrowRight' }));
    const event = await oneEvent(radio2, 'sl-change');
    expect(event.target).to.equal(radio2);
    expect(radio2.checked).to.be.true;
  });

  it('should not get checked when disabled', async () => {
    const radioGroup = await fixture<SlRadioGroup>(html`
      <sl-radio-group>
        <sl-radio-button checked></sl-radio-button>
        <sl-radio-button disabled></sl-radio-button>
      </sl-radio-group>
    `);
    const radio1 = radioGroup.querySelector<SlRadioButton>('sl-radio-button[checked]')!;
    const radio2 = radioGroup.querySelector<SlRadioButton>('sl-radio-button[disabled]')!;

    radio2.click();
    await Promise.all([radio1.updateComplete, radio2.updateComplete]);

    expect(radio1.checked).to.be.true;
    expect(radio2.checked).to.be.false;
  });

  describe('when submitting a form', () => {
    it('should submit the correct value', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <sl-radio-group>
            <sl-radio-button id="radio-1" name="a" value="1" checked></sl-radio-button>
            <sl-radio-button id="radio-2" name="a" value="2"></sl-radio-button>
            <sl-radio-button id="radio-2" name="a" value="3"></sl-radio-button>
          </sl-radio-group>
          <sl-button type="submit">Submit</sl-button>
        </form>
      `);
      const button = form.querySelector('sl-button')!;
      const radio = form.querySelectorAll('sl-radio-button')[1]!;
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
});
