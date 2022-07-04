import { expect, fixture, html, waitUntil } from '@open-wc/testing';
import sinon from 'sinon';
import type SlFileItem from './file-item';

describe('<sl-file-item>', () => {
  it('should be visible per default', async () => {
    const el = await fixture<SlFileItem>(html` <sl-file-item>Filename</sl-file-item> `);
    const base = el.shadowRoot!.querySelector<HTMLElement>('[part="base"]')!;

    expect(base.hidden).to.be.false;
  });

  it('should not be visible with the hidden attribute', async () => {
    const el = await fixture<SlFileItem>(html` <sl-file-item hidden>Filename</sl-file-item> `);
    const base = el.shadowRoot!.querySelector<HTMLElement>('[part="base"]')!;

    expect(base.hidden).to.be.true;
  });

  it('should emit sl-show and sl-after-show when calling show()', async () => {
    const el = await fixture<SlFileItem>(html` <sl-file-item hidden>Filename</sl-file-item> `);
    const base = el.shadowRoot!.querySelector<HTMLElement>('[part="base"]')!;
    const showHandler = sinon.spy();
    const afterShowHandler = sinon.spy();

    el.addEventListener('sl-show', showHandler);
    el.addEventListener('sl-after-show', afterShowHandler);
    el.show();

    await waitUntil(() => showHandler.calledOnce);
    await waitUntil(() => afterShowHandler.calledOnce);

    expect(showHandler).to.have.been.calledOnce;
    expect(afterShowHandler).to.have.been.calledOnce;
    expect(base.hidden).to.be.false;
  });

  it('should emit sl-hide and sl-after-hide when calling hide()', async () => {
    const el = await fixture<SlFileItem>(html` <sl-file-item>Filename</sl-file-item> `);
    const base = el.shadowRoot!.querySelector<HTMLElement>('[part="base"]')!;
    const hideHandler = sinon.spy();
    const afterHideHandler = sinon.spy();

    el.addEventListener('sl-hide', hideHandler);
    el.addEventListener('sl-after-hide', afterHideHandler);
    el.hide();

    await waitUntil(() => hideHandler.calledOnce);
    await waitUntil(() => afterHideHandler.calledOnce);

    expect(hideHandler).to.have.been.calledOnce;
    expect(afterHideHandler).to.have.been.calledOnce;
    expect(base.hidden).to.be.true;
  });

  it('should emit sl-show and sl-after-show when setting hidden = false', async () => {
    const el = await fixture<SlFileItem>(html` <sl-file-item hidden>Filename</sl-file-item> `);
    const base = el.shadowRoot!.querySelector<HTMLElement>('[part="base"]')!;
    const showHandler = sinon.spy();
    const afterShowHandler = sinon.spy();

    el.addEventListener('sl-show', showHandler);
    el.addEventListener('sl-after-show', afterShowHandler);
    el.hidden = false;

    await waitUntil(() => showHandler.calledOnce);
    await waitUntil(() => afterShowHandler.calledOnce);

    expect(showHandler).to.have.been.calledOnce;
    expect(afterShowHandler).to.have.been.calledOnce;
    expect(base.hidden).to.be.false;
  });

  it('should emit sl-hide and sl-after-hide when setting hidden = true', async () => {
    const el = await fixture<SlFileItem>(html` <sl-file-item>Filename</sl-file-item> `);
    const base = el.shadowRoot!.querySelector<HTMLElement>('[part="base"]')!;
    const hideHandler = sinon.spy();
    const afterHideHandler = sinon.spy();

    el.addEventListener('sl-hide', hideHandler);
    el.addEventListener('sl-after-hide', afterHideHandler);
    el.hidden = true;

    await waitUntil(() => hideHandler.calledOnce);
    await waitUntil(() => afterHideHandler.calledOnce);

    expect(hideHandler).to.have.been.calledOnce;
    expect(afterHideHandler).to.have.been.calledOnce;
    expect(base.hidden).to.be.true;
  });
});
