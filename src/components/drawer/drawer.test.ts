import { expect, fixture, html, waitUntil } from '@open-wc/testing';
import sinon from 'sinon';

import '../../../dist/shoelace.js';
import type SlDrawer from './drawer';

describe('<sl-drawer>', () => {
  it('should be visible with the open attribute', async () => {
    const el = await fixture(html`
      <sl-drawer open>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</sl-drawer>
    `);
    const base = el.shadowRoot?.querySelector('[part="base"]') as HTMLElement;

    expect(base.hidden).to.be.false;
  });

  it('should not be visible without the open attribute', async () => {
    const el = await fixture(html` <sl-drawer>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</sl-drawer> `);
    const base = el.shadowRoot?.querySelector('[part="base"]') as HTMLElement;

    expect(base.hidden).to.be.true;
  });

  it('should emit sl-show and sl-after-show when calling show()', async () => {
    const el = (await fixture(html`
      <sl-drawer>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</sl-drawer>
    `)) as SlDrawer;
    const base = el.shadowRoot?.querySelector('[part="base"]') as HTMLElement;
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
    const el = (await fixture(html`
      <sl-drawer open>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</sl-drawer>
    `)) as SlDrawer;
    const base = el.shadowRoot?.querySelector('[part="base"]') as HTMLElement;
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

  it('should emit sl-show and sl-after-show when setting open = true', async () => {
    const el = (await fixture(html`
      <sl-drawer>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</sl-drawer>
    `)) as SlDrawer;
    const base = el.shadowRoot?.querySelector('[part="base"]') as HTMLElement;
    const showHandler = sinon.spy();
    const afterShowHandler = sinon.spy();

    el.addEventListener('sl-show', showHandler);
    el.addEventListener('sl-after-show', afterShowHandler);
    el.open = true;

    await waitUntil(() => showHandler.calledOnce);
    await waitUntil(() => afterShowHandler.calledOnce);

    expect(showHandler).to.have.been.calledOnce;
    expect(afterShowHandler).to.have.been.calledOnce;
    expect(base.hidden).to.be.false;
  });

  it('should emit sl-hide and sl-after-hide when setting open = false', async () => {
    const el = (await fixture(html`
      <sl-drawer open>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</sl-drawer>
    `)) as SlDrawer;
    const base = el.shadowRoot?.querySelector('[part="base"]') as HTMLElement;
    const hideHandler = sinon.spy();
    const afterHideHandler = sinon.spy();

    el.addEventListener('sl-hide', hideHandler);
    el.addEventListener('sl-after-hide', afterHideHandler);
    el.open = false;

    await waitUntil(() => hideHandler.calledOnce);
    await waitUntil(() => afterHideHandler.calledOnce);

    expect(hideHandler).to.have.been.calledOnce;
    expect(afterHideHandler).to.have.been.calledOnce;
    expect(base.hidden).to.be.true;
  });

  it('should not close when sl-request-close is prevented', async () => {
    const el = (await fixture(html`
      <sl-drawer open>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</sl-drawer>
    `)) as SlDrawer;
    const overlay = el.shadowRoot?.querySelector('[part="overlay"]') as HTMLElement;

    el.addEventListener('sl-request-close', event => event.preventDefault());
    overlay.click();

    expect(el.open).to.be.true;
  });

  it('should allow initial focus to be set', async () => {
    const el = (await fixture(html` <sl-drawer><input /></sl-drawer> `)) as SlDrawer;
    const input = el.querySelector('input');
    const initialFocusHandler = sinon.spy(event => {
      event.preventDefault();
      input.focus();
    });

    el.addEventListener('sl-initial-focus', initialFocusHandler);
    el.show();

    await waitUntil(() => initialFocusHandler.calledOnce);

    expect(initialFocusHandler).to.have.been.calledOnce;
    expect(document.activeElement).to.equal(input);
  });
});
