import { expect, fixture, html } from '@open-wc/testing';
import type SlBadge from './badge';

describe('<sl-badge>', () => {
  let el: SlBadge;

  describe('when provided no parameters', () => {
    before(async () => {
      el = await fixture<SlBadge>(html` <sl-badge>Badge</sl-badge> `);
    });

    it('should pass accessibility tests with a role of status on the base part.', async () => {
      await expect(el).to.be.accessible();

      const part = el.shadowRoot!.querySelector('[part~="base"]')!;
      expect(part.getAttribute('role')).to.eq('status');
    });

    it('should render the child content provided', () => {
      expect(el.innerText).to.eq('Badge');
    });

    it('should default to square styling, with the primary color', () => {
      const part = el.shadowRoot!.querySelector('[part~="base"]')!;
      expect(part.classList.value.trim()).to.eq('badge badge--primary');
    });
  });

  describe('when provided a pill parameter', () => {
    before(async () => {
      el = await fixture<SlBadge>(html` <sl-badge pill>Badge</sl-badge> `);
    });

    it('should pass accessibility tests', async () => {
      await expect(el).to.be.accessible();
    });

    it('should append the pill class to the classlist to render a pill', () => {
      const part = el.shadowRoot!.querySelector('[part~="base"]')!;
      expect(part.classList.value.trim()).to.eq('badge badge--primary badge--pill');
    });
  });

  describe('when provided a pulse parameter', () => {
    before(async () => {
      el = await fixture<SlBadge>(html` <sl-badge pulse>Badge</sl-badge> `);
    });

    it('should pass accessibility tests', async () => {
      await expect(el).to.be.accessible();
    });

    it('should append the pulse class to the classlist to render a pulse', () => {
      const part = el.shadowRoot!.querySelector('[part~="base"]')!;
      expect(part.classList.value.trim()).to.eq('badge badge--primary badge--pulse');
    });
  });

  ['primary', 'success', 'neutral', 'warning', 'danger'].forEach(variant => {
    describe(`when passed a variant attribute ${variant}`, () => {
      before(async () => {
        el = await fixture<SlBadge>(html`<sl-badge variant="${variant}">Badge</sl-badge>`);
      });

      it('should pass accessibility tests', async () => {
        await expect(el).to.be.accessible();
      });

      it('should default to square styling, with the primary color', () => {
        const part = el.shadowRoot!.querySelector('[part~="base"]')!;
        expect(part.classList.value.trim()).to.eq(`badge badge--${variant}`);
      });
    });
  });
});
