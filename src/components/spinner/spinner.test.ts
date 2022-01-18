import { expect, fixture, html } from '@open-wc/testing';
import type SlSpinner from './spinner';

describe('<sl-spinner>', () => {
  let el: SlSpinner;

  describe('when provided no parameters', () => {
    before(async () => {
      el = await fixture<SlSpinner>(html` <sl-spinner></sl-spinner> `);
    });

    it('should render a component that passes accessibility test.', async () => {
      await expect(el).to.be.accessible();
    });

    it('should have a role of "status".', () => {
      // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions
      const base = el.shadowRoot!.querySelector('[part="base"]')!;
      expect(base).have.attribute('role', 'status');
    });
  });
});
