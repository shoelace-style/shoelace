import { expect, fixture, html, waitUntil, aTimeout } from '@open-wc/testing';
import sinon from 'sinon';
import type SlMenuItem from './menu-item';

describe('<sl-menu-item>', () => {
  it('passes accessibility test', async () => {
    const el = await fixture<SlMenuItem>(html`
      <sl-menu>
        <sl-menu-item>Item 1</sl-menu-item>
        <sl-menu-item>Item 2</sl-menu-item>
        <sl-menu-item>Item 3</sl-menu-item>
        <sl-divider></sl-divider>
        <sl-menu-item type="checkbox" checked>Checked</sl-menu-item>
        <sl-menu-item type="checkbox">Unchecked</sl-menu-item>
      </sl-menu>
    `);
    await expect(el).to.be.accessible();
  });

  it('default properties', async () => {
    const el = await fixture<SlMenuItem>(html` <sl-menu-item>Test</sl-menu-item> `);

    expect(el.value).to.equal('');
    expect(el.disabled).to.be.false;
    expect(el.getAttribute('aria-disabled')).to.equal('false');
  });

  it('changes aria attributes', async () => {
    const el = await fixture<SlMenuItem>(html` <sl-menu-item>Test</sl-menu-item> `);

    el.disabled = true;
    await aTimeout(100);
    expect(el.getAttribute('aria-disabled')).to.equal('true');
  });

  it('get text label', async () => {
    const el = await fixture<SlMenuItem>(html` <sl-menu-item>Test</sl-menu-item> `);
    expect(el.getTextLabel()).to.equal('Test');
  });

  it('emits the slotchange event when the label changes', async () => {
    const el = await fixture<SlMenuItem>(html` <sl-menu-item>Text</sl-menu-item> `);
    const slotChangeHandler = sinon.spy();

    el.addEventListener('slotchange', slotChangeHandler);
    el.textContent = 'New Text';
    await waitUntil(() => slotChangeHandler.calledOnce);

    expect(slotChangeHandler).to.have.been.calledOnce;
  });
});
