import { expect, fixture, html } from '@open-wc/testing';
import type SlRadio from '../radio/radio';
import type SlRadioGroup from './radio-group';

describe('<sl-radio-group>', () => {
  describe('validation tests', () => {
    it(`should be valid when required and one radio is checked`, async () => {
      const el = await fixture<SlRadioGroup>(html`
        <sl-radio-group label="Select an option" required>
          <sl-radio name="option" value="1" checked>Option 1</sl-radio>
          <sl-radio name="option" value="2">Option 2</sl-radio>
          <sl-radio name="option" value="3">Option 3</sl-radio>
        </sl-radio-group>
      `);
      const radio = el.querySelector<SlRadio>('sl-radio')!;

      expect(radio.reportValidity()).to.be.true;
    });

    it(`should be invalid when required and no radios are checked`, async () => {
      const el = await fixture<SlRadioGroup>(html`
        <sl-radio-group label="Select an option" required>
          <sl-radio name="option" value="1">Option 1</sl-radio>
          <sl-radio name="option" value="2">Option 2</sl-radio>
          <sl-radio name="option" value="3">Option 3</sl-radio>
        </sl-radio-group>
      `);
      const radio = el.querySelector<SlRadio>('sl-radio')!;

      expect(radio.reportValidity()).to.be.false;
    });

    it(`should be valid when required and a different radio is checked`, async () => {
      const el = await fixture<SlRadioGroup>(html`
        <sl-radio-group label="Select an option" required>
          <sl-radio name="option" value="1">Option 1</sl-radio>
          <sl-radio name="option" value="2">Option 2</sl-radio>
          <sl-radio name="option" value="3" checked>Option 3</sl-radio>
        </sl-radio-group>
      `);
      const radio = el.querySelectorAll('sl-radio')![2];

      expect(radio.reportValidity()).to.be.true;
    });

    it(`should be invalid when custom validity is set`, async () => {
      const el = await fixture<SlRadioGroup>(html`
        <sl-radio-group label="Select an option">
          <sl-radio name="option" value="1">Option 1</sl-radio>
          <sl-radio name="option" value="2">Option 2</sl-radio>
          <sl-radio name="option" value="3">Option 3</sl-radio>
        </sl-radio-group>
      `);
      const radio = el.querySelector<SlRadio>('sl-radio')!;

      radio.setCustomValidity('Error');

      expect(radio.reportValidity()).to.be.false;
    });
  });
});
