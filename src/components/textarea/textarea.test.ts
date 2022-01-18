import { expect, fixture, html } from '@open-wc/testing';
import type SlTextarea from './textarea';

describe('<sl-textarea>', () => {
  it('should be disabled with the disabled attribute', async () => {
    const el = await fixture<SlTextarea>(html` <sl-textarea disabled></sl-textarea> `);
    const textarea = el.shadowRoot!.querySelector<HTMLTextAreaElement>('[part="textarea"]')!;

    expect(textarea.disabled).to.be.true;
  });

  it('should be valid by default', async () => {
    const el = await fixture<SlTextarea>(html` <sl-textarea></sl-textarea> `);

    expect(el.invalid).to.be.false;
  });

  it('should be invalid when required and empty', async () => {
    const el = await fixture<SlTextarea>(html` <sl-textarea required></sl-textarea> `);

    expect(el.invalid).to.be.true;
  });

  it('should be invalid when required and after removing disabled ', async () => {
    const el = await fixture<SlTextarea>(html` <sl-textarea disabled required></sl-textarea> `);

    el.disabled = false;
    await el.updateComplete;

    expect(el.invalid).to.be.true;
  });
});
