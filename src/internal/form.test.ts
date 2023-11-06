import '../../../dist/shoelace.js';

import { expect, fixture, html } from '@open-wc/testing';

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
