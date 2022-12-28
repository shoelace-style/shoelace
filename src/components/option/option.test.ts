import { expect, fixture, html, waitUntil, aTimeout } from '@open-wc/testing';
import sinon from 'sinon';
import type SlOption from './option';

describe('<sl-option>', () => {
  it('passes accessibility test', async () => {
    const el = await fixture<SlOption>(html`
      <sl-select label="Select one">
        <sl-option>Option 1</sl-option>
        <sl-option>Option 2</sl-option>
        <sl-option>Option 3</sl-option>
        <sl-option disabled>Disabled</sl-option>
      </sl-select>
    `);
    await expect(el).to.be.accessible();
  });

  it('default properties', async () => {
    const el = await fixture<SlOption>(html` <sl-option>Test</sl-option> `);

    expect(el.value).to.equal('');
    expect(el.disabled).to.be.false;
    expect(el.getAttribute('aria-disabled')).to.equal('false');
  });

  it('changes aria attributes', async () => {
    const el = await fixture<SlOption>(html` <sl-option>Test</sl-option> `);

    el.disabled = true;
    await aTimeout(100);
    expect(el.getAttribute('aria-disabled')).to.equal('true');
  });

  it('emits the slotchange event when the label changes', async () => {
    const el = await fixture<SlOption>(html` <sl-option>Text</sl-option> `);
    const slotChangeHandler = sinon.spy();

    el.addEventListener('slotchange', slotChangeHandler);
    el.textContent = 'New Text';
    await waitUntil(() => slotChangeHandler.calledOnce);

    expect(slotChangeHandler).to.have.been.calledOnce;
  });
});
