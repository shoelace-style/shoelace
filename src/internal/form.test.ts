import '../../../dist/shoelace.js';
import sinon from 'sinon';

import { expect, fixture, html, waitUntil } from '@open-wc/testing';

// Reproduction of this issue: https://github.com/shoelace-style/shoelace/issues/1703
it('Should still run form validations if an element is removed', async () => {
  const form = await fixture<HTMLFormElement>(html`
    <form>
      <sl-input name="name" label="Name" required></sl-input>
      <sl-textarea name="comment" label="Comment" required></sl-textarea>
    </form>
  `);

  expect(form.checkValidity()).to.equal(false);
  expect(form.reportValidity()).to.equal(false);

  form.querySelector('sl-input')!.remove();

  expect(form.checkValidity()).to.equal(false);
  expect(form.reportValidity()).to.equal(false);
});

it('should submit the correct form values', async () => {
  const form = await fixture<HTMLFormElement>(html`
    <form>
      <sl-input name="a" value="1"></sl-input>
      <sl-input name="b" value="2"></sl-input>
      <sl-input name="c" value="3"></sl-input>
      <sl-button type="submit">Submit</sl-button>
    </form>
  `);

  const button = form.querySelector('sl-button')!;
  const submitHandler = sinon.spy((event: SubmitEvent) => {
    formData = new FormData(form);
    event.preventDefault();
  });
  let formData: FormData;

  form.addEventListener('submit', submitHandler);
  button.click();

  await waitUntil(() => submitHandler.calledOnce);

  expect(formData!.get('a')).to.equal('1');
  expect(formData!.get('b')).to.equal('2');
  expect(formData!.get('c')).to.equal('3');
});

it('should submit the correct form values when form controls are removed from the DOM', async () => {
  const form = await fixture<HTMLFormElement>(html`
    <form>
      <sl-input name="a" value="1"></sl-input>
      <sl-input name="b" value="2"></sl-input>
      <sl-input name="c" value="3"></sl-input>
      <sl-button type="submit">Submit</sl-button>
    </form>
  `);

  const button = form.querySelector('sl-button')!;
  const submitHandler = sinon.spy((event: SubmitEvent) => {
    formData = new FormData(form);
    event.preventDefault();
  });
  let formData: FormData;

  form.addEventListener('submit', submitHandler);
  form.querySelector('[name="b"]')!.remove();

  button.click();

  await waitUntil(() => submitHandler.calledOnce);

  expect(formData!.get('a')).to.equal('1');
  expect(formData!.get('b')).to.equal(null);
  expect(formData!.get('c')).to.equal('3');
});
