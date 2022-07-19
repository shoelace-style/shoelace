import { expect, fixture, html, waitUntil } from '@open-wc/testing';
import sinon from 'sinon';
import type SlTooltip from './tooltip';

describe('<sl-tooltip>', () => {
  it('should be visible with the open attribute', async () => {
    const el = await fixture<SlTooltip>(html`
      <sl-tooltip content="This is a tooltip" open>
        <sl-button>Hover Me</sl-button>
      </sl-tooltip>
    `);
    const base = el.shadowRoot!.querySelector<HTMLElement>('[part="base"]')!;

    expect(base.hidden).to.be.false;
  });

  it('should not be visible without the open attribute', async () => {
    const el = await fixture<SlTooltip>(html`
      <sl-tooltip content="This is a tooltip">
        <sl-button>Hover Me</sl-button>
      </sl-tooltip>
    `);
    const base = el.shadowRoot!.querySelector<HTMLElement>('[part="base"]')!;

    expect(base.hidden).to.be.true;
  });

  it('should emit sl-show and sl-after-show when calling show()', async () => {
    const el = await fixture<SlTooltip>(html`
      <sl-tooltip content="This is a tooltip">
        <sl-button>Hover Me</sl-button>
      </sl-tooltip>
    `);
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
    const el = await fixture<SlTooltip>(html`
      <sl-tooltip content="This is a tooltip" open>
        <sl-button>Hover Me</sl-button>
      </sl-tooltip>
    `);
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

  it('should emit sl-show and sl-after-show when setting open = true', async () => {
    const el = await fixture<SlTooltip>(html`
      <sl-tooltip content="This is a tooltip">
        <sl-button>Hover Me</sl-button>
      </sl-tooltip>
    `);
    const base = el.shadowRoot!.querySelector<HTMLElement>('[part="base"]')!;
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
    const el = await fixture<SlTooltip>(html`
      <sl-tooltip content="This is a tooltip" open>
        <sl-button>Hover Me</sl-button>
      </sl-tooltip>
    `);
    const base = el.shadowRoot!.querySelector<HTMLElement>('[part="base"]')!;
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

  it('should hide the tooltip when tooltip is visible and disabled becomes true', async () => {
    const el = await fixture<SlTooltip>(html`
      <sl-tooltip content="This is a tooltip" open>
        <sl-button>Hover Me</sl-button>
      </sl-tooltip>
    `);
    const base = el.shadowRoot!.querySelector<HTMLElement>('[part="base"]')!;
    const hideHandler = sinon.spy();
    const afterHideHandler = sinon.spy();

    el.addEventListener('sl-hide', hideHandler);
    el.addEventListener('sl-after-hide', afterHideHandler);
    el.disabled = true;

    await waitUntil(() => hideHandler.calledOnce);
    await waitUntil(() => afterHideHandler.calledOnce);

    expect(hideHandler).to.have.been.calledOnce;
    expect(afterHideHandler).to.have.been.calledOnce;
    expect(base.hidden).to.be.true;
  });

  it('should recalculate its target when the slotted element changes', async () => {
    const el = await fixture<SlTooltip>(html`
      <sl-tooltip content="This is a tooltip" open>
        <sl-button>Hover me</sl-button>
      </sl-tooltip>
    `);

    el.innerHTML = '<sl-button>New element</sl-button>';
    await el.updateComplete;

    expect((el as unknown as { target: HTMLElement }).target.innerHTML).to.equal('New element');
  });
});
