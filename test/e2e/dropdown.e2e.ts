import { newE2EPage } from '@stencil/core/testing';

const testContentStartClosed = `
<sl-dropdown>
  <sl-button slot="trigger" caret>Dropdown</sl-button>
  <sl-menu>
    <sl-menu-item>Dropdown Item 1</sl-menu-item>
  </sl-menu>
</sl-dropdown>
`;

const testContentStartOpen = `
<sl-dropdown open>
  <sl-button slot="trigger" caret>Dropdown</sl-button>
  <sl-menu>
    <sl-menu-item>Dropdown Item 1</sl-menu-item>
  </sl-menu>
</sl-dropdown>
`;

describe('dropdown', () => {
  it('should open/close when clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentStartClosed);

    const dropdown = await page.find('sl-dropdown');
    const dropdownPanel = await page.find('sl-dropdown >>> .dropdown__panel');

    expect(await dropdownPanel.isVisible()).toBe(false);

    await dropdown.click();
    await dropdownPanel.waitForEvent('transitionend');

    expect(await dropdownPanel.isVisible()).toBe(true);

    await dropdown.click();
    await dropdownPanel.waitForEvent('transitionend');

    expect(await dropdownPanel.isVisible()).toBe(false);
  });

  it('should open/close with the show/hide methods', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentStartClosed);

    const dropdown = await page.find('sl-dropdown');
    const dropdownPanel = await page.find('sl-dropdown >>> .dropdown__panel');

    expect(await dropdownPanel.isVisible()).toBe(false);

    await dropdown.callMethod('show');
    await dropdownPanel.waitForEvent('transitionend');

    expect(await dropdownPanel.isVisible()).toBe(true);

    await dropdown.callMethod('hide');
    await dropdownPanel.waitForEvent('transitionend');

    expect(await dropdownPanel.isVisible()).toBe(false);
  });

  it('should open/close with the open attribute added/removed', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentStartClosed);

    const dropdown = await page.find('sl-dropdown');
    const dropdownPanel = await page.find('sl-dropdown >>> .dropdown__panel');

    expect(await dropdownPanel.isVisible()).toBe(false);

    dropdown.setAttribute('open', '');
    await page.waitForChanges();
    await dropdownPanel.waitForEvent('transitionend');

    expect(await dropdownPanel.isVisible()).toBe(true);

    dropdown.removeAttribute('open');
    await page.waitForChanges();
    await dropdownPanel.waitForEvent('transitionend');

    expect(await dropdownPanel.isVisible()).toBe(false);
  });

  it('should emit slShow and slAfterShow events when opened', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentStartClosed);

    const dropdown = await page.find('sl-dropdown');
    const dropdownPanel = await page.find('sl-dropdown >>> .dropdown__panel');
    const slShow = await dropdown.spyOnEvent('slShow');
    const slAfterShow = await dropdown.spyOnEvent('slAfterShow');

    await dropdown.callMethod('show');
    expect(slShow).toHaveReceivedEventTimes(1);

    await dropdownPanel.waitForEvent('transitionend');
    expect(slAfterShow).toHaveReceivedEventTimes(1);
  });

  it('should emit slHide and slAfterHide events when dropdown is closed', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentStartOpen);

    const dropdown = await page.find('sl-dropdown');
    const dropdownPanel = await page.find('sl-dropdown >>> .dropdown__panel');
    const slHide = await dropdown.spyOnEvent('slHide');
    const slAfterHide = await dropdown.spyOnEvent('slAfterHide');

    await dropdown.callMethod('hide');
    expect(slHide).toHaveReceivedEventTimes(1);

    await dropdownPanel.waitForEvent('transitionend');
    expect(slAfterHide).toHaveReceivedEventTimes(1);
  });

  it('should close on item select', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentStartOpen);

    const dropdownPanel = await page.find('sl-dropdown >>> .dropdown__panel');

    expect(await dropdownPanel.isVisible()).toBe(true);

    await dropdownPanel.click();

    expect(await dropdownPanel.isVisible()).toBe(false);
  });

  it('should not close on item select when closeOnSelect === true', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentStartOpen);

    const dropdown = await page.find('sl-dropdown');
    const dropdownPanel = await page.find('sl-dropdown >>> .dropdown__panel');

    dropdown.setProperty('closeOnSelect', false);
    await page.waitForChanges();

    expect(await dropdownPanel.isVisible()).toBe(true);

    await dropdownPanel.click();

    expect(await dropdownPanel.isVisible()).toBe(true);
  });
});
