import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import type SlCheckbox from './checkbox';

describe('<sl-checkbox>', () => {
  it('should be disabled with the disabled attribute', async () => {
    const el = await fixture<SlCheckbox>(html` <sl-checkbox disabled></sl-checkbox> `);
    const checkbox = el.shadowRoot!.querySelector('input')!;

    expect(checkbox.disabled).to.be.true;
  });

  it('should be valid by default', async () => {
    const el = await fixture<SlCheckbox>(html` <sl-checkbox></sl-checkbox> `);

    expect(el.invalid).to.be.false;
  });

  it('should fire sl-change when clicked', async () => {
    const el = await fixture<SlCheckbox>(html` <sl-checkbox></sl-checkbox> `);
    setTimeout(() => el.shadowRoot!.querySelector('input')!.click());
    const event = await oneEvent(el, 'sl-change');
    expect(event.target).to.equal(el);
    expect(el.checked).to.be.true;
  });

  it('should fire sl-change when toggled via keyboard', async () => {
    const el = await fixture<SlCheckbox>(html` <sl-checkbox></sl-checkbox> `);
    const input = el.shadowRoot!.querySelector('input')!;
    input.focus();
    setTimeout(() => sendKeys({ press: ' ' }));
    const event = await oneEvent(el, 'sl-change');
    expect(event.target).to.equal(el);
    expect(el.checked).to.be.true;
  });

  it('should not fire sl-change when checked is set by javascript', async () => {
    const el = await fixture<SlCheckbox>(html` <sl-checkbox></sl-checkbox> `);
    el.addEventListener('sl-change', () => expect.fail('event fired'));
    el.checked = true;
    await el.updateComplete;
    el.checked = false;
    await el.updateComplete;
  });
});
