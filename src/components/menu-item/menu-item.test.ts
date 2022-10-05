import { expect, fixture, html, waitUntil } from '@open-wc/testing';
import sinon from 'sinon';
import type SlMenuItem from './menu-item';

describe('<sl-menu-item>', () => {
  it('passes accessibility test', async () => {
    const el = await fixture<SlMenuItem>(html`
      <sl-select>
        <sl-menu-item>Test</sl-menu-item>
      </sl-select>
    `);
    await expect(el).to.be.accessible();
  });

  it('default properties', async () => {
    const el = await fixture<SlMenuItem>(html` <sl-menu-item>Test</sl-menu-item> `);

    expect(el.checked).to.be.false;
    expect(el.getAttribute('aria-checked')).to.equal('false');
    expect(el.value).to.equal('');
    expect(el.disabled).to.be.false;
    expect(el.getAttribute('aria-disabled')).to.equal('false');
  });

  it('changes aria attributes', async () => {
    const el = await fixture<SlMenuItem>(html` <sl-menu-item>Test</sl-menu-item> `);

    el.checked = true;
    setTimeout(() => expect(el.getAttribute('aria-checked')).to.equal('true'));
    el.disabled = true;
    setTimeout(() => expect(el.getAttribute('aria-disabled')).to.equal('true'));
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
