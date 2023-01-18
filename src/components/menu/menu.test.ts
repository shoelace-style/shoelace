import { expect, fixture, waitUntil } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit';
import sinon from 'sinon';
import type SlMenuItem from '../menu-item/menu-item';
import type SlMenu from './menu';

interface Payload {
  item: SlMenuItem;
}

const createTestMenu = (): Promise<SlMenu> => {
  return fixture<SlMenu>(html`
    <sl-menu>
      <sl-menu-item value="test1">test1</sl-menu-item>
      <sl-menu-item value="test2">test2</sl-menu-item>
      <sl-menu-item value="test3">test3</sl-menu-item>
      <sl-menu-item value="testDisabled" disabled>testDisabled</sl-menu-item>
    </sl-menu>
  `);
};

const clickOnItemWithValue = (menu: SlMenu, value: string) => {
  const clickedItem = menu.querySelector(`[value=${value}]`);
  if (clickedItem) {
    (clickedItem as SlMenuItem).click();
  }
};

const spyOnSelectHandler = (menu: SlMenu): sinon.SinonSpy => {
  const selectHandler = sinon.spy();
  menu.addEventListener('sl-select', selectHandler);
  return selectHandler;
};

const expectSelectHandlerToHaveBeenCalledOn = async (
  selectHandler: sinon.SinonSpy,
  expectedValue: string
): Promise<void> => {
  await waitUntil(() => selectHandler.called);
  expect(selectHandler).to.have.been.calledOnce;
  const event = selectHandler.args[0][0] as CustomEvent;
  const detail = event.detail as Payload;
  expect(detail.item.value).to.equal(expectedValue);
};

describe('<sl-menu>', () => {
  it('emits sl-select on click of an item returning the selected item as payload', async () => {
    const menu = await createTestMenu();
    const selectHandler = spyOnSelectHandler(menu);

    clickOnItemWithValue(menu, 'test1');

    await expectSelectHandlerToHaveBeenCalledOn(selectHandler, 'test1');
  });

  it('can be selected via keyboard', async () => {
    const menu = await createTestMenu();
    const selectHandler = spyOnSelectHandler(menu);

    await sendKeys({ press: 'Tab' });
    await sendKeys({ press: 'ArrowDown' });
    await sendKeys({ press: 'Enter' });

    await expectSelectHandlerToHaveBeenCalledOn(selectHandler, 'test2');
  });

  it('does not select disabled items', async () => {
    const menu = await createTestMenu();
    const selectHandler = spyOnSelectHandler(menu);

    await sendKeys({ press: 'Tab' });
    await sendKeys({ type: 'testDisabled' });
    await sendKeys({ press: 'Enter' });

    await expectSelectHandlerToHaveBeenCalledOn(selectHandler, 'test1');
  });
});
