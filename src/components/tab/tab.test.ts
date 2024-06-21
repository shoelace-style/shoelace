import '../../../dist/shoelace.js';
import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import type SlIconButton from '../icon-button/icon-button.js';
import type SlTab from './tab.js';
import type SlTabGroup from '../tab-group/tab-group.js';

describe('<sl-tab>', () => {
  it('passes accessibility test', async () => {
    const el = await fixture<SlTab>(html`
      <sl-tab-group>
        <sl-tab slot="nav">Test</sl-tab>
      </sl-tab-group>
    `);

    await expect(el).to.be.accessible();
  });

  it('should render default tab', async () => {
    const el = await fixture<SlTab>(html` <sl-tab>Test</sl-tab> `);

    const base = el.shadowRoot!.querySelector<HTMLElement>('[part~="base"]')!;

    expect(el.getAttribute('role')).to.equal('tab');
    expect(el.getAttribute('aria-disabled')).to.equal('false');
    expect(el.getAttribute('aria-selected')).to.equal('false');
    expect(el.getAttribute('tabindex')).to.equal('0');
    expect(base.getAttribute('class')).to.equal(' tab ');
    expect(el.active).to.equal(false);
    expect(el.closable).to.equal(false);
    expect(el.disabled).to.equal(false);
  });

  it('should disable tab by attribute', async () => {
    const el = await fixture<SlTab>(html` <sl-tab disabled>Test</sl-tab> `);

    const base = el.shadowRoot!.querySelector<HTMLElement>('[part~="base"]')!;

    expect(el.disabled).to.equal(true);
    expect(el.getAttribute('aria-disabled')).to.equal('true');
    expect(base.getAttribute('class')).to.equal(' tab tab--disabled ');
    expect(el.getAttribute('tabindex')).to.equal('-1');
  });

  it('should set active tab by attribute', async () => {
    const el = await fixture<SlTab>(html` <sl-tab active>Test</sl-tab> `);

    const base = el.shadowRoot!.querySelector<HTMLElement>('[part~="base"]')!;

    expect(el.active).to.equal(true);
    expect(el.getAttribute('aria-selected')).to.equal('true');
    expect(base.getAttribute('class')).to.equal(' tab tab--active ');
    expect(el.getAttribute('tabindex')).to.equal('0');
  });

  it('should set closable by attribute', async () => {
    const el = await fixture<SlTab>(html` <sl-tab closable>Test</sl-tab> `);

    const base = el.shadowRoot!.querySelector<HTMLElement>('[part~="base"]')!;
    const closeButton = el.shadowRoot!.querySelector('[part~="close-button"]');

    expect(el.closable).to.equal(true);
    expect(base.getAttribute('class')).to.match(/tab tab--closable/);
    expect(closeButton).not.to.be.null;
  });

  describe('focus', () => {
    it('should focus itself', async () => {
      const el = await fixture<SlTab>(html` <sl-tab>Test</sl-tab> `);

      el.focus();
      await el.updateComplete;

      expect(document.activeElement).to.equal(el);
    });
  });

  describe('blur', () => {
    it('should blur itself', async () => {
      const el = await fixture<SlTab>(html` <sl-tab>Test</sl-tab> `);

      el.focus();
      await el.updateComplete;

      expect(document.activeElement).to.equal(el);

      el.blur();
      await el.updateComplete;

      expect(document.activeElement).to.not.equal(el);
    });
  });

  describe('closable', () => {
    it('should emit close event when the close button is clicked', async () => {
      const tabGroup = await fixture<SlTabGroup>(html`
        <sl-tab-group>
          <sl-tab slot="nav" panel="general" closable>General</sl-tab>
          <sl-tab slot="nav" panel="custom" closable>Custom</sl-tab>
          <sl-tab-panel name="general">This is the general tab panel.</sl-tab-panel>
          <sl-tab-panel name="custom">This is the custom tab panel.</sl-tab-panel>
        </sl-tab-group>
      `);
      const closeButton = tabGroup
        .querySelectorAll('sl-tab')[0]!
        .shadowRoot!.querySelector<SlIconButton>('[part~="close-button"]')!;

      const handleClose = sinon.spy();
      const handleTabShow = sinon.spy();

      tabGroup.addEventListener('sl-close', handleClose, { once: true });
      // The sl-tab-show event shouldn't be emitted when clicking the close button
      tabGroup.addEventListener('sl-tab-show', handleTabShow);

      closeButton.click();
      await closeButton?.updateComplete;

      expect(handleClose.called).to.equal(true);
      expect(handleTabShow.called).to.equal(false);
    });
  });
});
