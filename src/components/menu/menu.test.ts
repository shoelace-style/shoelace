import '../../../dist/shoelace.js';
import { clickOnElement } from '../../internal/test.js';
import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import { sendKeys } from '@web/test-runner-commands';
import sinon from 'sinon';
import type { SlSelectEvent } from '../../events/sl-select';
import type SlMenu from './menu';

describe('<sl-menu>', () => {
  it('emits sl-select with the correct event detail when clicking an item', async () => {
    const menu = await fixture<SlMenu>(html`
      <sl-menu>
        <sl-menu-item value="item-1">Item 1</sl-menu-item>
        <sl-menu-item value="item-2">Item 2</sl-menu-item>
        <sl-menu-item value="item-3">Item 3</sl-menu-item>
        <sl-menu-item value="item-4">Item 4</sl-menu-item>
      </sl-menu>
    `);
    const item2 = menu.querySelectorAll('sl-menu-item')[1];
    const selectHandler = sinon.spy((event: SlSelectEvent) => {
      const item = event.detail.item;
      if (item !== item2) {
        expect.fail('Incorrect event detail emitted with sl-select');
      }
    });

    menu.addEventListener('sl-select', selectHandler);
    await clickOnElement(item2);

    expect(selectHandler).to.have.been.calledOnce;
  });

  it('can be selected via keyboard', async () => {
    const menu = await fixture<SlMenu>(html`
      <sl-menu>
        <sl-menu-item value="item-1">Item 1</sl-menu-item>
        <sl-menu-item value="item-2">Item 2</sl-menu-item>
        <sl-menu-item value="item-3">Item 3</sl-menu-item>
        <sl-menu-item value="item-4">Item 4</sl-menu-item>
      </sl-menu>
    `);
    const [item1, item2] = menu.querySelectorAll('sl-menu-item');
    const selectHandler = sinon.spy((event: SlSelectEvent) => {
      const item = event.detail.item;
      if (item !== item2) {
        expect.fail('Incorrect item selected');
      }
    });

    menu.addEventListener('sl-select', selectHandler);

    item1.focus();
    await item1.updateComplete;
    await sendKeys({ press: 'ArrowDown' });
    await sendKeys({ press: 'Enter' });

    expect(selectHandler).to.have.been.calledOnce;
  });

  it('does not select disabled items when clicking', async () => {
    const menu = await fixture<SlMenu>(html`
      <sl-menu>
        <sl-menu-item value="item-1">Item 1</sl-menu-item>
        <sl-menu-item value="item-2" disabled>Item 2</sl-menu-item>
        <sl-menu-item value="item-3">Item 3</sl-menu-item>
        <sl-menu-item value="item-4">Item 4</sl-menu-item>
      </sl-menu>
    `);
    const item2 = menu.querySelectorAll('sl-menu-item')[1];
    const selectHandler = sinon.spy();

    menu.addEventListener('sl-select', selectHandler);

    await clickOnElement(item2);

    expect(selectHandler).to.not.have.been.calledOnce;
  });

  it('does not select disabled items when pressing enter', async () => {
    const menu = await fixture<SlMenu>(html`
      <sl-menu>
        <sl-menu-item value="item-1">Item 1</sl-menu-item>
        <sl-menu-item value="item-2" disabled>Item 2</sl-menu-item>
        <sl-menu-item value="item-3">Item 3</sl-menu-item>
        <sl-menu-item value="item-4">Item 4</sl-menu-item>
      </sl-menu>
    `);
    const [item1, item2] = menu.querySelectorAll('sl-menu-item');
    const selectHandler = sinon.spy();

    menu.addEventListener('sl-select', selectHandler);

    item1.focus();
    await item1.updateComplete;
    await sendKeys({ press: 'ArrowDown' });
    expect(document.activeElement).to.equal(item2);
    await sendKeys({ press: 'Enter' });
    await item2.updateComplete;

    expect(selectHandler).to.not.have.been.called;
  });
});

// @see https://github.com/shoelace-style/shoelace/issues/1596
it('Should fire "sl-select" when clicking an element within a menu-item', async () => {
  // eslint-disable-next-line
  const selectHandler = sinon.spy(() => {});

  const menu: SlMenu = await fixture(html`
    <sl-menu>
      <sl-menu-item>
        <span>Menu item</span>
      </sl-menu-item>
    </sl-menu>
  `);

  menu.addEventListener('sl-select', selectHandler);
  const span = menu.querySelector('span')!;
  await clickOnElement(span);

  expect(selectHandler).to.have.been.calledOnce;
});
