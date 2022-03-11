import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import type SlButton from './button';

describe('<sl-button>', () => {

  describe('when provided no parameters', () => {

    it('passes accessibility test', async () => {
      const el = await fixture<SlButton>(html` <sl-button>Button Label</sl-button> `);
      await expect(el).to.be.accessible();
    });

    it('default values are set correctly', async () => {
      const el = await fixture<SlButton>(html` <sl-button>Button Label</sl-button> `);

      expect(el.variant).to.equal('default');
      expect(el.size).to.equal('medium');
      expect(el.disabled).to.equal(false);
      expect(el.caret).to.equal(false);
      expect(el.loading).to.equal(false);
      expect(el.outline).to.equal(false);
      expect(el.pill).to.equal(false);
      expect(el.circle).to.equal(false);
    });

    it('should render as a <button>', async () => {
      const el = await fixture<SlButton>(html` <sl-button>Button Label</sl-button> `);
      expect(el.shadowRoot!.querySelector('button')).to.exist;
      expect(el.shadowRoot!.querySelector('a')).not.to.exist;
    });

    it('should not have a spinner present', async () => {
      const el = await fixture<SlButton>(html` <sl-button>Button Label</sl-button> `);
      expect(el.shadowRoot!.querySelector('sl-spinner')).not.to.exist;
    });

    it('should not have a caret present', async () => {
      const el = await fixture<SlButton>(html` <sl-button>Button Label</sl-button> `);
      expect(el.shadowRoot?.querySelector('[part="caret"]')).not .to.exist;
    });
  });

  describe('when disabled', () => {

    it('passes accessibility test', async () => {
      const el = await fixture<SlButton>(html` <sl-button disabled>Button Label</sl-button> `);
      await expect(el).to.be.accessible();
    });

    it('should disable the native <button> when rendering a <button>', async () => {
      const el = await fixture<SlButton>(html` <sl-button disabled>Button Label</sl-button> `);
      expect(el.shadowRoot!.querySelector('button[disabled]')).to.exist;
    });

    it('should not disable the native <a> when rendering an <a>', async () => {
      const el = await fixture<SlButton>(html` <sl-button href="some/path" disabled>Button Label</sl-button> `);
      expect(el.shadowRoot!.querySelector('a[disabled]')).not.to.exist;
    });

    it('should not bubble up clicks', async () => {
      const button = await fixture<SlButton>(html` <sl-button disabled>Button Label</sl-button> `);
      const handleClick = sinon.spy();
      button.addEventListener('click', handleClick);
      button.click();

      expect(handleClick).not.to.have.been.called;

      button.shadowRoot!.querySelector('button')!.click();
      expect(handleClick).not.to.have.been.called;

      const buttonLink = await fixture<SlButton>(html` <sl-button href="some/path" disabled>Button Label</sl-button> `);
      buttonLink.addEventListener('click', handleClick);
      buttonLink.click();

      expect(handleClick).not.to.have.been.called;

      buttonLink.shadowRoot!.querySelector('a')!.click();
      expect(handleClick).not.to.have.been.called;
    });
  });

  describe('when loading', () => {

    it('should have a spinner present', async () => {
      const el = await fixture<SlButton>(html` <sl-button loading>Button Label</sl-button> `);
      expect(el.shadowRoot!.querySelector('sl-spinner')).to.exist;
    });

  });

  describe('when caret', () => {

    it('should have a caret present', async () => {
      const el = await fixture<SlButton>(html` <sl-button caret>Button Label</sl-button> `);
      expect(el.shadowRoot!.querySelector('[part="caret"]')).to.exist;
    });

  });

  describe('when href is present', () => {

    it('should render as an <a>', async () => {
      const el = await fixture<SlButton>(html` <sl-button href="some/path">Button Label</sl-button> `);
      expect(el.shadowRoot!.querySelector('a')).to.exist;
      expect(el.shadowRoot!.querySelector('button')).not.to.exist;
    });
  });
});
