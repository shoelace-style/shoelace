import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';

import '../../../dist/shoelace.js';
import type SlRadio from '../radio/radio';
import type SlRadioGroup from './radio-group';

describe('<sl-radio-group>', () => {
  it('should toggle selected radio when toggled via keyboard - arrow right key', async () => {
    const radioGroup = await fixture<SlRadioGroup>(html`
      <sl-radio-group>
        <sl-radio id="radio-1" checked></sl-radio>
        <sl-radio id="radio-2"></sl-radio>
      </sl-radio-group>
    `);
    const radio1: SlRadio = radioGroup.querySelector('sl-radio#radio-1');
    const radio2: SlRadio = radioGroup.querySelector('sl-radio#radio-2');

    expect(radio2.checked).to.be.false;
    expect(radio1.checked).to.be.true;

    radio1.focus();
    await sendKeys({ press: 'ArrowRight' });

    expect(radio2.checked).to.be.true;
    expect(radio1.checked).to.be.false;
  });

  it('should toggle selected radio when toggled via keyboard - arrow down key', async () => {
    const radioGroup = await fixture<SlRadioGroup>(html`
      <sl-radio-group>
        <sl-radio id="radio-1" checked></sl-radio>
        <sl-radio id="radio-2"></sl-radio>
      </sl-radio-group>
    `);
    const radio1: SlRadio = radioGroup.querySelector('sl-radio#radio-1');
    const radio2: SlRadio = radioGroup.querySelector('sl-radio#radio-2');

    expect(radio2.checked).to.be.false;
    expect(radio1.checked).to.be.true;

    radio1.focus();
    await sendKeys({ press: 'ArrowDown' });

    expect(radio2.checked).to.be.true;
    expect(radio1.checked).to.be.false;
  });

  it('should toggle selected radio when toggled via keyboard - arrow left key', async () => {
    const radioGroup = await fixture<SlRadioGroup>(html`
      <sl-radio-group>
        <sl-radio id="radio-1"></sl-radio>
        <sl-radio id="radio-2" checked></sl-radio>
      </sl-radio-group>
    `);
    const radio1: SlRadio = radioGroup.querySelector('sl-radio#radio-1');
    const radio2: SlRadio = radioGroup.querySelector('sl-radio#radio-2');

    expect(radio2.checked).to.be.true;
    expect(radio1.checked).to.be.false;

    radio1.focus();
    await sendKeys({ press: 'ArrowLeft' });

    expect(radio2.checked).to.be.false;
    expect(radio1.checked).to.be.true;
  });

  it('should toggle selected radio when toggled via keyboard - arrow up key', async () => {
    const radioGroup = await fixture<SlRadioGroup>(html`
      <sl-radio-group>
        <sl-radio id="radio-1"></sl-radio>
        <sl-radio id="radio-2" checked></sl-radio>
      </sl-radio-group>
    `);
    const radio1: SlRadio = radioGroup.querySelector('sl-radio#radio-1');
    const radio2: SlRadio = radioGroup.querySelector('sl-radio#radio-2');

    expect(radio2.checked).to.be.true;
    expect(radio1.checked).to.be.false;

    radio1.focus();
    await sendKeys({ press: 'ArrowUp' });

    expect(radio2.checked).to.be.false;
    expect(radio1.checked).to.be.true;
  });
});
