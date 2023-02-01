import { expect, fixture, html } from '@open-wc/testing';
import type SlRadio from './radio';
import type SlRadioGroup from '../radio-group/radio-group';

describe('<sl-radio>', () => {
  it('should not get checked when disabled', async () => {
    const radioGroup = await fixture<SlRadioGroup>(html`
      <sl-radio-group value="1">
        <sl-radio id="radio-1" value="1"></sl-radio>
        <sl-radio id="radio-2" value="2" disabled></sl-radio>
      </sl-radio-group>
    `);
    const radio1 = radioGroup.querySelector<SlRadio>('#radio-1')!;
    const radio2 = radioGroup.querySelector<SlRadio>('#radio-2')!;

    radio2.click();
    await Promise.all([radio1.updateComplete, radio2.updateComplete]);

    expect(radio1.checked).to.be.true;
    expect(radio2.checked).to.be.false;
  });
});
