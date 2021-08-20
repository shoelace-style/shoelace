import { expect, fixture, html, waitUntil, aTimeout } from '@open-wc/testing';
import sinon from 'sinon';

import '../../../dist/shoelace.js';
import type SlSelect from './select';

describe('<sl-select>', () => {
  it('should emit sl-change when the value changes', async () => {
    const el = await fixture<SlSelect>(html`
      <sl-select>
        <sl-menu-item value="option-1">Option 1</sl-menu-item>
        <sl-menu-item value="option-2">Option 2</sl-menu-item>
        <sl-menu-item value="option-3">Option 3</sl-menu-item>
      </sl-select>
    `);
    const changeHandler = sinon.spy();

    el.addEventListener('sl-change', changeHandler);
    el.value = 'option-2';
    await waitUntil(() => changeHandler.calledOnce);

    expect(changeHandler).to.have.been.calledOnce;
  });

  it('should  open the menu when any letter key is pressed with sl-select is on focus', async () => {
    const el = (await fixture(html`
      <sl-select>
        <sl-menu-item value="option-1">Option 1</sl-menu-item>
        <sl-menu-item value="option-2">Option 2</sl-menu-item>
        <sl-menu-item value="option-3">Option 3</sl-menu-item>
      </sl-select>
    `)) as SlSelect;
    const selectBox = el.shadowRoot.querySelector('.select__box') as HTMLSelectElement;
    selectBox.focus();
    const rKeyEvent = new KeyboardEvent('keydown', { key: 'r' });
    selectBox.dispatchEvent(rKeyEvent);
    await aTimeout(100);
    expect(selectBox.getAttribute('aria-expanded')).to.equal('true');
  });

  it('should not open the menu when ctrl + R is pressed with sl-select is on focus', async () => {
    const el = (await fixture(html`
      <sl-select>
        <sl-menu-item value="option-1">Option 1</sl-menu-item>
        <sl-menu-item value="option-2">Option 2</sl-menu-item>
        <sl-menu-item value="option-3">Option 3</sl-menu-item>
      </sl-select>
    `)) as SlSelect;
    const selectBox = el.shadowRoot.querySelector('.select__box') as HTMLSelectElement;
    selectBox.focus();
    const rKeyEvent = new KeyboardEvent('keydown', { key: 'r', ctrlKey: true });
    selectBox.dispatchEvent(rKeyEvent);
    await aTimeout(100);
    expect(selectBox.getAttribute('aria-expanded')).to.equal('false');
  });
});
