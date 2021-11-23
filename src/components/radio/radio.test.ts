import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';

import '../../../dist/shoelace.js';
import type SlRadio from './radio';
import type SlRadioGroup from '../radio-group/radio-group';

describe('<sl-radio>', () => {
  it('should be disabled with the disabled attribute', async () => {
    const el = await fixture<SlRadio>(html` <sl-radio disabled></sl-radio> `);
    const radio = el.shadowRoot?.querySelector('input');

    expect(radio.disabled).to.be.true;
  });

  it('should be valid by default', async () => {
    const el = await fixture<SlRadio>(html` <sl-radio></sl-radio> `);

    expect(el.invalid).to.be.false;
  });

  it('should fire sl-change when clicked', async () => {
    const el = await fixture<SlRadio>(html` <sl-radio></sl-radio> `);
    setTimeout(() => el.shadowRoot?.querySelector('input').click());
    const event = await oneEvent(el, 'sl-change');
    expect(event.target).to.equal(el);
    expect(el.checked).to.be.true;
  });

  it('should fire sl-change when toggled via keyboard - space', async () => {
    const el = await fixture<SlRadio>(html` <sl-radio></sl-radio> `);
    const input = el.shadowRoot?.querySelector('input');
    input.focus();
    setTimeout(() => sendKeys({ press: ' ' }));
    const event = await oneEvent(el, 'sl-change');
    expect(event.target).to.equal(el);
    expect(el.checked).to.be.true;
  });

  it('should fire sl-change when toggled via keyboard - arrow key', async () => {
    const radioGroup = await fixture<SlRadioGroup>(html`
      <sl-radio-group>
        <sl-radio id="radio-1"></sl-radio>
        <sl-radio id="radio-2"></sl-radio>
      </sl-radio-group>
    `);
    const radio1: SlRadio = radioGroup.querySelector('sl-radio#radio-1');
    const radio2: SlRadio = radioGroup.querySelector('sl-radio#radio-2');
    const input1 = radio1.shadowRoot?.querySelector('input');
    input1.focus();
    setTimeout(() => sendKeys({ press: 'ArrowRight' }));
    const event = await oneEvent(radio2, 'sl-change');
    expect(event.target).to.equal(radio2);
    expect(radio2.checked).to.be.true;
  });

  it('should not fire sl-change when checked is set by javascript', async () => {
    const el = await fixture<SlRadio>(html` <sl-radio></sl-radio> `);
    el.addEventListener('sl-change', () => expect.fail('event fired'));
    el.checked = true;
    await el.updateComplete;
    el.checked = false;
    await el.updateComplete;
  });
});
