import { expect, fixture, html } from '@open-wc/testing';
import type SlRadioButton from './radio-button';
import type SlRadioGroup from '../radio-group/radio-group';

describe('<sl-radio-button>', () => {
  it('should not get checked when disabled', async () => {
    const radioGroup = await fixture<SlRadioGroup>(html`
      <sl-radio-group value="1">
        <sl-radio-button id="radio-1" value="1"></sl-radio-button>
        <sl-radio-button id="radio-2" value="2" disabled></sl-radio-button>
      </sl-radio-group>
    `);
    const radio1 = radioGroup.querySelector<SlRadioButton>('#radio-1')!;
    const radio2 = radioGroup.querySelector<SlRadioButton>('#radio-2')!;

    radio2.click();
    await Promise.all([radio1.updateComplete, radio2.updateComplete]);

    expect(radio1.checked).to.be.true;
    expect(radio2.checked).to.be.false;
  });
});
