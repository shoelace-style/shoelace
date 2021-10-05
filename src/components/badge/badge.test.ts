import { expect, fixture, html } from '@open-wc/testing';

import '../../../dist/shoelace.js';
import type SlBadge from './badge';

describe('<sl-badge>', () => {
  let el: SlBadge;

  describe('when provided no parameters', async () => {
    before(async () => {
      el = await fixture<SlBadge>(html` <sl-badge>Badge</sl-badge> `);
    });

    it('should render a component that passes accessibility test, with a role of status on the base part.', async () => {
      await expect(el).to.be.accessible();

      const part = el.shadowRoot?.querySelector('[part="base"]') as HTMLElement;
      expect(part.getAttribute('role')).to.eq('status');
    });

    it('should render the child content provided', async () => {
      expect(el.innerText).to.eq('Badge');
    });

    it('should default to square styling, with the primary color', async () => {
      const part = el.shadowRoot?.querySelector('[part="base"]') as HTMLElement;
      expect(part.classList.value.trim()).to.eq('badge badge--primary');
    });
  });

  describe('when provided a pill parameter', async () => {
    before(async () => {
      el = await fixture<SlBadge>(html` <sl-badge pill>Badge</sl-badge> `);
    });

    it('should render a component that passes accessibility test', async () => {
      await expect(el).to.be.accessible();
    });

    it('should append the pill class to the classlist to render a pill', async () => {
      const part = el.shadowRoot?.querySelector('[part="base"]') as HTMLElement;
      expect(part.classList.value.trim()).to.eq('badge badge--primary badge--pill');
    });
  });

  describe('when provided a pulse parameter', async () => {
    before(async () => {
      el = await fixture<SlBadge>(html` <sl-badge pulse>Badge</sl-badge> `);
    });

    it('should render a component that passes accessibility test', async () => {
      await expect(el).to.be.accessible();
    });

    it('should append the pulse class to the classlist to render a pulse', async () => {
      const part = el.shadowRoot?.querySelector('[part="base"]') as HTMLElement;
      expect(part.classList.value.trim()).to.eq('badge badge--primary badge--pulse');
    });
  });

  ['primary', 'success', 'neutral', 'warning', 'danger'].forEach(type => {
    describe(`when passed a type attribute ${type}`, () => {
      before(async () => {
        el = await fixture<SlBadge>(html`<sl-badge type="${type as any}">Badge</sl-badge>`);
      });

      it('should render a component that passes accessibility test', async () => {
        await expect(el).to.be.accessible();
      });

      it('should default to square styling, with the primary color', async () => {
        const part = el.shadowRoot?.querySelector('[part="base"]') as HTMLElement;
        expect(part.classList.value.trim()).to.eq(`badge badge--${type}`);
      });
    });
  });
});
