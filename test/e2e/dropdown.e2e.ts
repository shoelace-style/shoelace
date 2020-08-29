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

    const showEventHappened = dropdown.waitForEvent('slAfterShow');
    await dropdown.click();
    await showEventHappened;

    expect(await dropdownPanel.isVisible()).toBe(true);

    const afterEventHappened = dropdown.waitForEvent('slAfterHide');
    await dropdown.click();
    await afterEventHappened;

    expect(await dropdownPanel.isVisible()).toBe(false);
  });

  it('should open/close with the show/hide methods', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentStartClosed);

    const dropdown = await page.find('sl-dropdown');
    const dropdownPanel = await page.find('sl-dropdown >>> .dropdown__panel');

    expect(await dropdownPanel.isVisible()).toBe(false);

    const showEventHappened = dropdown.waitForEvent('slAfterShow');
    await dropdown.callMethod('show');
    await showEventHappened;

    expect(await dropdownPanel.isVisible()).toBe(true);

    const hideEventHappened = dropdown.waitForEvent('slAfterHide');
    await dropdown.callMethod('hide');
    await hideEventHappened;

    expect(await dropdownPanel.isVisible()).toBe(false);
  });

  it('should open/close with the open attribute added/removed', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentStartClosed);

    const dropdown = await page.find('sl-dropdown');
    const dropdownPanel = await page.find('sl-dropdown >>> .dropdown__panel');

    expect(await dropdownPanel.isVisible()).toBe(false);

    const showEventHappened = dropdown.waitForEvent('slAfterShow');
    dropdown.setAttribute('open', '');
    await page.waitForChanges();
    await showEventHappened;

    expect(await dropdownPanel.isVisible()).toBe(true);

    const hideEventHappened = dropdown.waitForEvent('slAfterHide');
    dropdown.removeAttribute('open');
    await page.waitForChanges();
    await hideEventHappened;

    expect(await dropdownPanel.isVisible()).toBe(false);
  });

  it('should emit slShow and slAfterShow events when opened', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentStartClosed);

    const dropdown = await page.find('sl-dropdown');
    const slShow = await dropdown.spyOnEvent('slShow');
    const slAfterShow = await dropdown.spyOnEvent('slAfterShow');

    const eventHappened = dropdown.waitForEvent('slAfterShow');
    await dropdown.callMethod('show');

    await eventHappened;

    expect(slShow).toHaveReceivedEventTimes(1);
    expect(slAfterShow).toHaveReceivedEventTimes(1);
  });

  it('should emit slHide and slAfterHide events when dropdown is closed', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentStartOpen);
    await page.waitForChanges();

    const dropdown = await page.find('sl-dropdown');
    const slHide = await dropdown.spyOnEvent('slHide');
    const slAfterHide = await dropdown.spyOnEvent('slAfterHide');

    const eventHappened = dropdown.waitForEvent('slAfterHide');
    await dropdown.callMethod('hide');

    await eventHappened;

    expect(slHide).toHaveReceivedEventTimes(1);
    expect(slAfterHide).toHaveReceivedEventTimes(1);
  });

  it('should close on item select', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentStartOpen);

    const dropdown = await page.find('sl-dropdown');
    const dropdownPanel = await page.find('sl-dropdown >>> .dropdown__panel');

    expect(await dropdownPanel.isVisible()).toBe(true);

    const eventHappened = dropdown.waitForEvent('slAfterHide');
    await dropdownPanel.click();

    await eventHappened;

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
