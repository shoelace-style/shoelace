import '../../../dist/shoelace.js';
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

  it('should receive positional classes from <sl-button-group>', async () => {
    const radioGroup = await fixture<SlRadioGroup>(html`
      <sl-radio-group value="1">
        <sl-radio-button id="radio-1" value="1"></sl-radio-button>
        <sl-radio-button id="radio-2" value="2"></sl-radio-button>
        <sl-radio-button id="radio-3" value="3"></sl-radio-button>
      </sl-radio-group>
    `);
    const radio1 = radioGroup.querySelector<SlRadioButton>('#radio-1')!;
    const radio2 = radioGroup.querySelector<SlRadioButton>('#radio-2')!;
    const radio3 = radioGroup.querySelector<SlRadioButton>('#radio-3')!;

    await Promise.all([radioGroup.updateComplete, radio1.updateComplete, radio2.updateComplete, radio3.updateComplete]);

    expect(radio1.classList.contains('sl-button-group__button')).to.be.true;
    expect(radio1.classList.contains('sl-button-group__button--first')).to.be.true;
    expect(radio2.classList.contains('sl-button-group__button')).to.be.true;
    expect(radio2.classList.contains('sl-button-group__button--inner')).to.be.true;
    expect(radio3.classList.contains('sl-button-group__button')).to.be.true;
    expect(radio3.classList.contains('sl-button-group__button--last')).to.be.true;
  });
});
