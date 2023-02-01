import { aTimeout, expect, fixture, html, waitUntil } from '@open-wc/testing';
import sinon from 'sinon';
import type SlMenuItem from './menu-item';

describe('<sl-menu-item>', () => {
  it('should pass accessibility tests', async () => {
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

  it('should have the correct default properties', async () => {
    const el = await fixture<SlMenuItem>(html` <sl-menu-item>Test</sl-menu-item> `);

    expect(el.value).to.equal('');
    expect(el.disabled).to.be.false;
    expect(el.getAttribute('aria-disabled')).to.equal('false');
  });

  it('should render the correct aria attributes when disabled', async () => {
    const el = await fixture<SlMenuItem>(html` <sl-menu-item>Test</sl-menu-item> `);

    el.disabled = true;
    await aTimeout(100);
    expect(el.getAttribute('aria-disabled')).to.equal('true');
  });

  it('should return a text label when calling getTextLabel()', async () => {
    const el = await fixture<SlMenuItem>(html` <sl-menu-item>Test</sl-menu-item> `);
    expect(el.getTextLabel()).to.equal('Test');
  });

  it('should emit the slotchange event when the label changes', async () => {
    const el = await fixture<SlMenuItem>(html` <sl-menu-item>Text</sl-menu-item> `);
    const slotChangeHandler = sinon.spy();

    el.addEventListener('slotchange', slotChangeHandler);
    el.textContent = 'New Text';
    await waitUntil(() => slotChangeHandler.calledOnce);

    expect(slotChangeHandler).to.have.been.calledOnce;
  });

  it('should render a hidden menu item when the inert attribute is used', async () => {
    const menu = await fixture<SlMenuItem>(html`
      <sl-menu>
        <sl-menu-item inert>Item 1</sl-menu-item>
        <sl-menu-item>Item 2</sl-menu-item>
        <sl-menu-item>Item 3</sl-menu-item>
      </sl-menu>
    `);
    const item1 = menu.querySelector('sl-menu-item')!;

    expect(getComputedStyle(item1).display).to.equal('none');
  });
});
