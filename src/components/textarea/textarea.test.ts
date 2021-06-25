import { expect, fixture, html, waitUntil } from '@open-wc/testing';
import sinon from 'sinon';

import '../../../dist/shoelace.js';
import type SlTextarea from './textarea';

describe('<sl-textarea>', () => {
  it('should be disabled with the disabled attribute', async () => {
    const el = await fixture(html` <sl-textarea disabled></sl-textarea> `);
    const textarea = el.shadowRoot?.querySelector('[part="textarea"]') as HTMLInputElement;

    expect(textarea.disabled).to.be.true;
  });

  it('should be valid by default', async () => {
    const el = (await fixture(html` <sl-textarea></sl-textarea> `)) as SlTextarea;

    expect(el.invalid).to.be.false;
  });

  it('should be invalid when required and empty', async () => {
    const el = (await fixture(html` <sl-textarea required></sl-textarea> `)) as SlTextarea;

    expect(el.invalid).to.be.true;
  });

  it('should be invalid when required and after removing disabled ', async () => {
    const el = (await fixture(html` <sl-textarea disabled required></sl-textarea> `)) as SlTextarea;

    el.disabled = false;
    await el.updateComplete;

    expect(el.invalid).to.be.true;
  });
});
