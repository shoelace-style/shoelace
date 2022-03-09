import { expect, fixture, html, waitUntil } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import sinon from 'sinon';
// eslint-disable-next-line no-restricted-imports
import { serialize } from '../../utilities/form';
import type SlInput from './input';

describe('<sl-input>', () => {
  it('should pass accessibility tests', async () => {
    const el = await fixture<SlInput>(html` <sl-input label="Name"></sl-input> `);
    await expect(el).to.be.accessible();
  });

  it('should be disabled with the disabled attribute', async () => {
    const el = await fixture<SlInput>(html` <sl-input disabled></sl-input> `);
    const input = el.shadowRoot!.querySelector<HTMLInputElement>('[part="input"]')!;

    expect(input.disabled).to.be.true;
  });

  it('should submit the form when pressing enter in a form without a submit button', async () => {
    const form = await fixture<HTMLFormElement>(html` <form><sl-input></sl-input></form> `);
    const input = form.querySelector('sl-input')!;
    const submitHandler = sinon.spy((event: SubmitEvent) => event.preventDefault());

    form.addEventListener('submit', submitHandler);
    input.focus();
    await sendKeys({ press: 'Enter' });
    await waitUntil(() => submitHandler.calledOnce);

    expect(submitHandler).to.have.been.calledOnce;
  });

  it('should set the value as a date when using valueAsDate', async () => {
    const el = await fixture<SlInput>(html` <sl-input type="date"></sl-input> `);
    const today = new Date();

    el.valueAsDate = today;
    await el.updateComplete;

    expect(el.value).to.equal(today.toISOString().split('T')[0]);
  });

  it('should set the value as a number when using valueAsNumber', async () => {
    const el = await fixture<SlInput>(html` <sl-input type="number"></sl-input> `);
    const num = 12345;

    el.valueAsNumber = num;
    await el.updateComplete;

    expect(el.value).to.equal(num.toString());
  });

  it('should focus the input when clicking on the label', async () => {
    const el = await fixture<SlInput>(html` <sl-input label="Name"></sl-input> `);
    const label = el.shadowRoot!.querySelector('[part="label"]')!;
    const submitHandler = sinon.spy();

    el.addEventListener('sl-focus', submitHandler);
    (label as HTMLLabelElement).click();
    await waitUntil(() => submitHandler.calledOnce);

    expect(submitHandler).to.have.been.calledOnce;
  });

  it('should be valid by default', async () => {
    const el = await fixture<SlInput>(html` <sl-input></sl-input> `);
    expect(el.invalid).to.be.false;
  });

  it('should be invalid when required and empty', async () => {
    const el = await fixture<SlInput>(html` <sl-input required></sl-input> `);
    expect(el.reportValidity()).to.be.false;
    expect(el.invalid).to.be.true;
  });

  it('should be invalid when the pattern does not match', async () => {
    const el = await fixture<SlInput>(html` <sl-input pattern="^test" value="fail"></sl-input> `);
    expect(el.invalid).to.be.true;
    expect(el.reportValidity()).to.be.false;
  });

  it('should be invalid when required and disabled is removed', async () => {
    const el = await fixture<SlInput>(html` <sl-input disabled required></sl-input> `);
    el.disabled = false;
    await el.updateComplete;
    expect(el.invalid).to.be.true;
  });

  it('should serialize its name and value with FormData', async () => {
    const form = await fixture<HTMLFormElement>(html` <form><sl-input name="a" value="1"></sl-input></form> `);
    const formData = new FormData(form);
    expect(formData.get('a')).to.equal('1');
  });

  it('should serialize its name and value with JSON', async () => {
    const form = await fixture<HTMLFormElement>(html` <form><sl-input name="a" value="1"></sl-input></form> `);
    const json = serialize(form);
    expect(json.a).to.equal('1');
  });
});
