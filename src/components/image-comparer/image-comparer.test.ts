import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import type SlImageComparer from './image-comparer';

describe('<sl-image-comparer>', () => {
  it('should render a basic before/after', async () => {
    const el = await fixture<SlImageComparer>(html`
      <sl-image-comparer>
        <div slot="before"></div>
        <div slot="after"></div>
      </sl-image-comparer>
    `);

    const afterPart = el.shadowRoot!.querySelector<HTMLElement>('[part~="after"]')!;
    const iconContainer = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="handle"]')!;
    const handle = el.shadowRoot!.querySelector<HTMLElement>('[part~="handle"]')!;

    expect(el.position).to.equal(50);
    expect(afterPart.getAttribute('style')).to.equal('clip-path:inset(0 50% 0 0);');
    expect(iconContainer.assignedElements().length).to.equal(0);
    expect(handle.getAttribute('role')).to.equal('scrollbar');
    expect(handle.getAttribute('aria-valuenow')).to.equal('50');
    expect(handle.getAttribute('aria-valuemin')).to.equal('0');
    expect(handle.getAttribute('aria-valuemax')).to.equal('100');
  });

  it('should emit change event when position changed manually', async () => {
    const el = await fixture<SlImageComparer>(html`
      <sl-image-comparer>
        <div slot="before"></div>
        <div slot="after"></div>
      </sl-image-comparer>
    `);
    const handler = sinon.spy();

    el.addEventListener('sl-change', handler, { once: true });

    el.position = 40;
    await el.updateComplete;

    expect(handler.called).to.equal(true);
  });

  it('should increment position on arrow right', async () => {
    const el = await fixture<SlImageComparer>(html`
      <sl-image-comparer>
        <div slot="before"></div>
        <div slot="after"></div>
      </sl-image-comparer>
    `);

    const base = el.shadowRoot!.querySelector<HTMLElement>('[part~="base"]')!;

    base.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'ArrowRight'
      })
    );
    await el.updateComplete;

    expect(el.position).to.equal(51);
  });

  it('should decrement position on arrow left', async () => {
    const el = await fixture<SlImageComparer>(html`
      <sl-image-comparer>
        <div slot="before"></div>
        <div slot="after"></div>
      </sl-image-comparer>
    `);

    const base = el.shadowRoot!.querySelector<HTMLElement>('[part~="base"]')!;

    base.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'ArrowLeft'
      })
    );
    await el.updateComplete;

    expect(el.position).to.equal(49);
  });

  it('should set position to 0 on home key', async () => {
    const el = await fixture<SlImageComparer>(html`
      <sl-image-comparer>
        <div slot="before"></div>
        <div slot="after"></div>
      </sl-image-comparer>
    `);

    const base = el.shadowRoot!.querySelector<HTMLElement>('[part~="base"]')!;

    base.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Home'
      })
    );
    await el.updateComplete;

    expect(el.position).to.equal(0);
  });

  it('should set position to 100 on end key', async () => {
    const el = await fixture<SlImageComparer>(html`
      <sl-image-comparer>
        <div slot="before"></div>
        <div slot="after"></div>
      </sl-image-comparer>
    `);

    const base = el.shadowRoot!.querySelector<HTMLElement>('[part~="base"]')!;

    base.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'End'
      })
    );
    await el.updateComplete;

    expect(el.position).to.equal(100);
  });

  it('should clamp to 100 on arrow right', async () => {
    const el = await fixture<SlImageComparer>(html`
      <sl-image-comparer>
        <div slot="before"></div>
        <div slot="after"></div>
      </sl-image-comparer>
    `);

    el.position = 0;
    await el.updateComplete;

    const base = el.shadowRoot!.querySelector<HTMLElement>('[part~="base"]')!;

    base.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'ArrowLeft'
      })
    );
    await el.updateComplete;

    expect(el.position).to.equal(0);
  });

  it('should clamp to 0 on arrow left', async () => {
    const el = await fixture<SlImageComparer>(html`
      <sl-image-comparer>
        <div slot="before"></div>
        <div slot="after"></div>
      </sl-image-comparer>
    `);

    el.position = 100;
    await el.updateComplete;

    const base = el.shadowRoot!.querySelector<HTMLElement>('[part~="base"]')!;

    base.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'ArrowRight'
      })
    );
    await el.updateComplete;

    expect(el.position).to.equal(100);
  });

  it('should increment position by 10 on arrow right + shift', async () => {
    const el = await fixture<SlImageComparer>(html`
      <sl-image-comparer>
        <div slot="before"></div>
        <div slot="after"></div>
      </sl-image-comparer>
    `);

    const base = el.shadowRoot!.querySelector<HTMLElement>('[part~="base"]')!;

    base.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'ArrowRight',
        shiftKey: true
      })
    );
    await el.updateComplete;

    expect(el.position).to.equal(60);
  });

  it('should decrement position by 10 on arrow left + shift', async () => {
    const el = await fixture<SlImageComparer>(html`
      <sl-image-comparer>
        <div slot="before"></div>
        <div slot="after"></div>
      </sl-image-comparer>
    `);

    const base = el.shadowRoot!.querySelector<HTMLElement>('[part~="base"]')!;

    base.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'ArrowLeft',
        shiftKey: true
      })
    );
    await el.updateComplete;

    expect(el.position).to.equal(40);
  });

  it('should set position by attribute', async () => {
    const el = await fixture<SlImageComparer>(html`
      <sl-image-comparer position="10">
        <div slot="before"></div>
        <div slot="after"></div>
      </sl-image-comparer>
    `);

    expect(el.position).to.equal(10);
  });

  it('should move position on drag', async () => {
    const el = await fixture<SlImageComparer>(html`
      <sl-image-comparer>
        <div slot="before" style="width: 50px"></div>
        <div slot="after" style="width: 50px"></div>
      </sl-image-comparer>
    `);
    const handle = el.shadowRoot!.querySelector<HTMLElement>('[part~="handle"]')!;
    const base = el.shadowRoot!.querySelector<HTMLElement>('[part~="base"]')!;
    const rect = base.getBoundingClientRect();
    const offsetX = rect.left + window.pageXOffset;
    const offsetY = rect.top + window.pageYOffset;

    handle.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

    document.dispatchEvent(
      new PointerEvent('pointermove', {
        clientX: offsetX + 20,
        clientY: offsetY
      })
    );

    document.dispatchEvent(new PointerEvent('pointerup'));

    await el.updateComplete;

    expect(el.position).to.equal(40);
  });
});
