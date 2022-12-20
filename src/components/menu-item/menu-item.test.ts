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

  it('emit sl-label-change event on label change', async () => {
    const el = await fixture<SlMenuItem>(html` <sl-menu-item>Test</sl-menu-item> `);

    const labelChangeHandler = sinon.spy();
    el.textContent = 'New Text';
    el.addEventListener('sl-label-change', labelChangeHandler);
    await waitUntil(() => labelChangeHandler.calledOnce);
    expect(labelChangeHandler).to.have.been.calledOnce;
  });
});
