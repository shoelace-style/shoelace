import { expect, fixture, html, oneEvent, waitUntil } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import sinon from 'sinon';
import type SlRadioGroup from '~/components/radio-group/radio-group';
import type SlRadio from './radio';

describe('<sl-radio>', () => {
  it('should be disabled with the disabled attribute', async () => {
    const el = await fixture<SlRadio>(html` <sl-radio disabled></sl-radio> `);
    const radio = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;

    expect(radio.disabled).to.be.true;
  });

  it('should be valid by default', async () => {
    const el = await fixture<SlRadio>(html` <sl-radio></sl-radio> `);

    expect(el.invalid).to.be.false;
  });

  it('should fire sl-change when clicked', async () => {
    const el = await fixture<SlRadio>(html` <sl-radio></sl-radio> `);
    setTimeout(() => el.shadowRoot!.querySelector('input')!.click());
    const event = await oneEvent(el, 'sl-change');
    expect(event.target).to.equal(el);
    expect(el.checked).to.be.true;
  });

  it('should fire sl-change when toggled via keyboard - space', async () => {
    const el = await fixture<SlRadio>(html` <sl-radio></sl-radio> `);
    const input = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;
    input.focus();
    setTimeout(() => sendKeys({ press: ' ' }));
    const event = await oneEvent(el, 'sl-change');
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
    const radio1 = radioGroup.querySelector<SlRadio>('sl-radio#radio-1')!;
    const radio2 = radioGroup.querySelector<SlRadio>('sl-radio#radio-2')!;
    const input1 = radio1.shadowRoot!.querySelector<HTMLInputElement>('input')!;
    input1.focus();
    setTimeout(() => sendKeys({ press: 'ArrowRight' }));
    const event = await oneEvent(radio2, 'sl-change');
    expect(event.target).to.equal(radio2);
    expect(radio2.checked).to.be.true;
  });

  describe('when submitting a form', () => {
    it('should submit the correct value', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <sl-radio-group>
            <sl-radio id="radio-1" name="a" value="1" checked></sl-radio>
            <sl-radio id="radio-2" name="a" value="2"></sl-radio>
            <sl-radio id="radio-2" name="a" value="3"></sl-radio>
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
});
