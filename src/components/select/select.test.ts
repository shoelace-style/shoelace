import { expect, fixture, html, waitUntil } from '@open-wc/testing';
import sinon from 'sinon';

import '../../../dist/shoelace.js';
import type SlSelect from './select';

describe('<sl-select>', () => {
  it('should emit sl-change when the value changes', async () => {
    const el = (await fixture(html`
      <sl-select>
        <sl-menu-item value="option-1">Option 1</sl-menu-item>
        <sl-menu-item value="option-2">Option 2</sl-menu-item>
        <sl-menu-item value="option-3">Option 3</sl-menu-item>
      </sl-select>
    `)) as SlSelect;
    const changeHandler = sinon.spy();

    el.addEventListener('sl-change', changeHandler);
    el.value = 'option-2';
    await waitUntil(() => changeHandler.calledOnce);

    expect(changeHandler).to.have.been.calledOnce;
  });
});
