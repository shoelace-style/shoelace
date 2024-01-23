import '../../../dist/shoelace.js';
// cspell:dictionaries lorem-ipsum
import { aTimeout, elementUpdated, expect, fixture, waitUntil } from '@open-wc/testing';
import { html, LitElement } from 'lit';
import { sendKeys } from '@web/test-runner-commands';
import sinon from 'sinon';
import type SlDialog from './dialog.js';

describe('<sl-dialog>', () => {
  it('should be visible with the open attribute', async () => {
    const el = await fixture<SlDialog>(html`
      <sl-dialog open>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</sl-dialog>
    `);
    const base = el.shadowRoot!.querySelector<HTMLElement>('[part~="base"]')!;

    expect(base.hidden).to.be.false;
  });

  it('should not be visible without the open attribute', async () => {
    const el = await fixture<SlDialog>(html`
      <sl-dialog>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</sl-dialog>
    `);
    const base = el.shadowRoot!.querySelector<HTMLElement>('[part~="base"]')!;

    expect(base.hidden).to.be.true;
  });

  it('should emit sl-show and sl-after-show when calling show()', async () => {
    const el = await fixture<SlDialog>(html`
      <sl-dialog>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</sl-dialog>
    `);
    const base = el.shadowRoot!.querySelector<HTMLElement>('[part~="base"]')!;
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
    const el = await fixture<SlDialog>(html`
      <sl-dialog open>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</sl-dialog>
    `);
    const base = el.shadowRoot!.querySelector<HTMLElement>('[part~="base"]')!;
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
    const el = await fixture<SlDialog>(html`
      <sl-dialog>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</sl-dialog>
    `);
    const base = el.shadowRoot!.querySelector<HTMLElement>('[part~="base"]')!;
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
    const el = await fixture<SlDialog>(html`
      <sl-dialog open>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</sl-dialog>
    `);
    const base = el.shadowRoot!.querySelector<HTMLElement>('[part~="base"]')!;
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
    const el = await fixture<SlDialog>(html`
      <sl-dialog open>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</sl-dialog>
    `);
    const overlay = el.shadowRoot!.querySelector<HTMLElement>('[part~="overlay"]')!;

    el.addEventListener('sl-request-close', event => {
      event.preventDefault();
    });
    overlay.click();

    expect(el.open).to.be.true;
  });

  it('should allow initial focus to be set', async () => {
    const el = await fixture<SlDialog>(html` <sl-dialog><input /></sl-dialog> `);
    const input = el.querySelector('input')!;
    const initialFocusHandler = sinon.spy((event: Event) => {
      event.preventDefault();
      input.focus();
    });

    el.addEventListener('sl-initial-focus', initialFocusHandler);
    el.show();

    await waitUntil(() => initialFocusHandler.calledOnce);

    expect(initialFocusHandler).to.have.been.calledOnce;
    expect(document.activeElement).to.equal(input);
  });

  it('should close when pressing Escape', async () => {
    const el = await fixture<SlDialog>(html` <sl-dialog open></sl-dialog> `);
    const hideHandler = sinon.spy();

    el.addEventListener('sl-hide', hideHandler);

    await sendKeys({ press: 'Escape' });
    await waitUntil(() => hideHandler.calledOnce);

    expect(el.open).to.be.false;
  });

  // https://github.com/shoelace-style/shoelace/issues/1382
  it('should properly cycle through tabbable elements when sl-dialog is used in a shadowRoot', async () => {
    class AContainer extends LitElement {
      get dialog() {
        return this.shadowRoot?.querySelector('sl-dialog');
      }

      openDialog() {
        this.dialog?.show();
      }

      render() {
        return html`
          <h1>Dialog Example</h1>
          <sl-dialog label="Dialog" class="dialog-overview">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            <br />
            <label><input type="checkbox" />A</label>
            <label><input type="checkbox" />B</label>
            <button>Button</button>
          </sl-dialog>

          <sl-button @click=${this.openDialog}>Open Dialog</sl-button>
        `;
      }
    }

    if (!window.customElements.get('a-container')) {
      window.customElements.define('a-container', AContainer);
    }

    const testCase = await fixture(html`
      <div>
        <a-container></a-container>

        <p>
          Open the dialog, then use <kbd>Tab</kbd> to cycle through the inputs. Focus should be trapped, but it reaches
          things outside the dialog.
        </p>
      </div>
    `);

    const container = testCase.querySelector('a-container');

    if (!container) {
      throw Error('Could not find <a-container> element.');
    }

    await elementUpdated(container);
    const dialog = container.shadowRoot?.querySelector('sl-dialog');

    if (!dialog) {
      throw Error('Could not find <sl-dialog> element.');
    }

    const closeButton = dialog.shadowRoot?.querySelector('sl-icon-button');
    const checkbox1 = dialog.querySelector("input[type='checkbox']");
    const checkbox2 = dialog.querySelectorAll("input[type='checkbox']")[1];
    const button = dialog.querySelector('button');

    // Opens modal.
    const openModalButton = container.shadowRoot?.querySelector('sl-button');

    openModalButton!.click();

    // Test tab cycling
    await pressTab();

    expect(container.shadowRoot?.activeElement).to.equal(dialog);
    expect(dialog.shadowRoot?.activeElement).to.equal(closeButton);

    await pressTab();
    expect(container.shadowRoot?.activeElement).to.equal(checkbox1);

    await pressTab();
    expect(container.shadowRoot?.activeElement).to.equal(checkbox2);

    await pressTab();
    expect(container.shadowRoot?.activeElement).to.equal(button);

    await pressTab();
    expect(dialog.shadowRoot?.activeElement).to.equal(closeButton);

    await pressTab();
    expect(container.shadowRoot?.activeElement).to.equal(checkbox1);

    // Test Shift+Tab cycling

    // I found these timeouts were needed for WebKit locally.
    await aTimeout(10);
    await sendKeys({ down: 'Shift' });
    await aTimeout(10);

    await pressTab();
    expect(dialog.shadowRoot?.activeElement).to.equal(closeButton);

    await pressTab();
    expect(container.shadowRoot?.activeElement).to.equal(button);

    await pressTab();
    expect(container.shadowRoot?.activeElement).to.equal(checkbox2);

    await pressTab();
    expect(container.shadowRoot?.activeElement).to.equal(checkbox1);

    await pressTab();
    expect(dialog.shadowRoot?.activeElement).to.equal(closeButton);

    // End shift+tab cycling
    await sendKeys({ up: 'Shift' });
  });
});

// We wait 50ms just to give the browser some time to figure out the current focus.
// 50 was the magic number I found locally :shrug:
async function pressTab() {
  await aTimeout(50);
  await sendKeys({ press: 'Tab' });
  await aTimeout(50);
}
