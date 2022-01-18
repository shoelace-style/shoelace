import { expect, fixture, html } from '@open-wc/testing';
import type SlInput from './input';

describe('<sl-input>', () => {
  it('should be disabled with the disabled attribute', async () => {
    const el = await fixture<SlInput>(html` <sl-input disabled></sl-input> `);
    const input = el.shadowRoot!.querySelector<HTMLInputElement>('[part="input"]')!;

    expect(input.disabled).to.be.true;
  });

  it('should be valid by default', async () => {
    const el = await fixture<SlInput>(html` <sl-input></sl-input> `);

    expect(el.invalid).to.be.false;
  });

  it('should be invalid when required and empty', async () => {
    const el = await fixture<SlInput>(html` <sl-input required></sl-input> `);

    expect(el.invalid).to.be.true;
  });

  it('should be invalid when required and after removing disabled ', async () => {
    const el = await fixture<SlInput>(html` <sl-input disabled required></sl-input> `);

    el.disabled = false;
    await el.updateComplete;

    expect(el.invalid).to.be.true;
  });
});
