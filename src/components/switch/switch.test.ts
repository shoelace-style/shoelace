import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';

import '../../../dist/shoelace.js';
import type SlSwitch from './switch';

describe('<sl-switch>', () => {
  it('should be disabled with the disabled attribute', async () => {
    const el = await fixture<SlSwitch>(html` <sl-switch disabled></sl-switch> `);
    const input = el.shadowRoot?.querySelector('input');

    expect(input.disabled).to.be.true;
  });

  it('should be valid by default', async () => {
    const el = await fixture<SlSwitch>(html` <sl-switch></sl-switch> `);

    expect(el.invalid).to.be.false;
  });

  it('should fire sl-change when clicked', async () => {
    const el = await fixture<SlSwitch>(html` <sl-switch></sl-switch> `);
    setTimeout(() => el.shadowRoot?.querySelector('input').click());
    const event = await oneEvent(el, 'sl-change');
    expect(event.target).to.equal(el);
    expect(el.checked).to.be.true;
  });

  it('should fire sl-change when toggled with spacebar', async () => {
    const el = await fixture<SlSwitch>(html` <sl-switch></sl-switch> `);
    el.focus();
    setTimeout(() => sendKeys({ press: ' ' }));
    const event = await oneEvent(el, 'sl-change');
    expect(event.target).to.equal(el);
    expect(el.checked).to.be.true;
  });

  it('should fire sl-change when toggled with the right arrow', async () => {
    const el = await fixture<SlSwitch>(html` <sl-switch></sl-switch> `);
    el.focus();
    setTimeout(() => sendKeys({ press: 'ArrowRight' }));
    const event = await oneEvent(el, 'sl-change');
    expect(event.target).to.equal(el);
    expect(el.checked).to.be.true;
  });

  it('should fire sl-change when toggled with the left arrow', async () => {
    const el = await fixture<SlSwitch>(html` <sl-switch checked></sl-switch> `);
    el.focus();
    setTimeout(() => sendKeys({ press: 'ArrowLeft' }));
    const event = await oneEvent(el, 'sl-change');
    expect(event.target).to.equal(el);
    expect(el.checked).to.be.false;
  });

  it('should not fire sl-change when checked is set by javascript', async () => {
    const el = await fixture<SlSwitch>(html` <sl-switch></sl-switch> `);
    el.addEventListener('sl-change', () => expect.fail('event fired'));
    el.checked = true;
    await el.updateComplete;
    el.checked = false;
    await el.updateComplete;
  });
});
