import { expect, fixture, html } from '@open-wc/testing';
import type SlRating from './rating';

describe('<sl-rating>', () => {
  it('should pass accessibility tests', async () => {
    const el = await fixture<SlRating>(html` <sl-rating label="Test"></sl-rating> `);
    await expect(el).to.be.accessible();

    const base = el.shadowRoot!.querySelector<HTMLElement>('[part="base"]')!;

    expect(base.getAttribute('role')).to.equal('slider');
    expect(base.getAttribute('aria-disabled')).to.equal('false');
    expect(base.getAttribute('aria-readonly')).to.equal('false');
    expect(base.getAttribute('aria-valuenow')).to.equal('0');
    expect(base.getAttribute('aria-valuemin')).to.equal('0');
    expect(base.getAttribute('aria-valuemax')).to.equal('5');
    expect(base.getAttribute('tabindex')).to.equal('0');
    expect(base.getAttribute('class')).to.equal(' rating ');
  });

  it('should be readonly with the readonly attribute', async () => {
    const el = await fixture<SlRating>(html` <sl-rating label="Test" readonly></sl-rating> `);
    const base = el.shadowRoot!.querySelector<HTMLElement>('[part="base"]')!;

    expect(base.getAttribute('aria-readonly')).to.equal('true');
    expect(base.getAttribute('class')).to.equal(' rating rating--readonly ');
  });

  it('should be disabled with the disabled attribute', async () => {
    const el = await fixture<SlRating>(html` <sl-rating label="Test" disabled></sl-rating> `);
    const base = el.shadowRoot!.querySelector<HTMLElement>('[part="base"]')!;

    expect(base.getAttribute('aria-disabled')).to.equal('true');
    expect(base.getAttribute('class')).to.equal(' rating rating--disabled ');
  });

  it('should set max value by attribute', async () => {
    const el = await fixture<SlRating>(html` <sl-rating label="Test" max="12"></sl-rating> `);
    const base = el.shadowRoot!.querySelector<HTMLElement>('[part="base"]')!;

    expect(base.getAttribute('aria-valuemax')).to.equal('12');
  });

  it('should set selected value by attribute', async () => {
    const el = await fixture<SlRating>(html` <sl-rating label="Test" value="3"></sl-rating> `);
    const base = el.shadowRoot!.querySelector<HTMLElement>('[part="base"]')!;

    expect(base.getAttribute('aria-valuenow')).to.equal('3');
  });

  describe('focus', () => {
    it('should focus inner div', async () => {
      const el = await fixture<SlRating>(html` <sl-rating label="Test"></sl-rating> `);

      const base = el.shadowRoot!.querySelector<HTMLElement>('[part="base"]')!;

      el.focus();
      await el.updateComplete;

      expect(el.shadowRoot!.activeElement).to.equal(base);
    });
  });

  describe('blur', () => {
    it('should blur inner div', async () => {
      const el = await fixture<SlRating>(html` <sl-rating label="Test"></sl-rating> `);

      el.focus();
      await el.updateComplete;

      el.blur();
      await el.updateComplete;

      expect(el.shadowRoot!.activeElement).to.equal(null);
    });
  });
});
