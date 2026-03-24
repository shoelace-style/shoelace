import '../../../dist/shoelace.js';
import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import type SlSearchSelect from './search-select.js';

describe('<sl-search-select>', () => {
  it('should render an editable display input', async () => {
    const el = await fixture<SlSearchSelect>(html`
      <sl-search-select>
        <sl-option value="a">A</sl-option>
      </sl-search-select>
    `);
    const displayInput = el.shadowRoot!.querySelector<HTMLInputElement>('.select__display-input')!;
    expect(displayInput.readOnly).to.be.false;
  });

  it('should update searchQuery and emit sl-input when typing', async () => {
    const el = await fixture<SlSearchSelect>(html`
      <sl-search-select>
        <sl-option value="a">Alpha</sl-option>
      </sl-search-select>
    `);
    const displayInput = el.shadowRoot!.querySelector<HTMLInputElement>('.select__display-input')!;
    const inputHandler = sinon.spy();
    el.addEventListener('sl-input', inputHandler);

    displayInput.value = 'al';
    displayInput.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
    await el.updateComplete;

    expect(el.searchQuery).to.equal('al');
    expect(inputHandler).to.have.been.calledOnce;
  });

  it('should clear value and preserve typed character when typing with a selection', async () => {
    const el = await fixture<SlSearchSelect>(html`
      <sl-search-select value="option-1">
        <sl-option value="option-1">Option 1</sl-option>
        <sl-option value="option-2">Option 2</sl-option>
      </sl-search-select>
    `);
    const displayInput = el.shadowRoot!.querySelector<HTMLInputElement>('.select__display-input')!;
    const changeHandler = sinon.spy();
    const inputHandler = sinon.spy();
    el.addEventListener('sl-change', changeHandler);
    el.addEventListener('sl-input', inputHandler);

    displayInput.value = 'x';
    displayInput.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
    await el.updateComplete;

    expect(el.value).to.equal('');
    expect(el.searchQuery).to.equal('x');
    expect(changeHandler).to.have.been.calledOnce;
    expect(inputHandler).to.have.been.calledOnce;
  });
});
