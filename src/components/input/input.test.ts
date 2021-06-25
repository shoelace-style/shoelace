import { expect, fixture, html, waitUntil } from '@open-wc/testing';
import sinon from 'sinon';

import '../../../dist/shoelace.js';
import type SlInput from './input';

describe('<sl-input>', () => {
  it('should be disabled with the disabled attribute', async () => {
    const el = await fixture(html` <sl-input disabled></sl-input> `);
    const input = el.shadowRoot?.querySelector('[part="input"]') as HTMLInputElement;

    expect(input.disabled).to.be.true;
  });

  it('should be valid by default', async () => {
    const el = (await fixture(html` <sl-input></sl-input> `)) as SlInput;

    expect(el.invalid).to.be.false;
  });

  it('should be invalid when required and empty', async () => {
    const el = (await fixture(html` <sl-input required></sl-input> `)) as SlInput;

    expect(el.invalid).to.be.true;
  });

  it('should be invalid when required and after removing disabled ', async () => {
    const el = (await fixture(html` <sl-input disabled required></sl-input> `)) as SlInput;

    el.disabled = false;
    await el.updateComplete;

    expect(el.invalid).to.be.true;
  });
});
