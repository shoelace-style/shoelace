import { newE2EPage } from '@stencil/core/testing';

describe('<sl-dropdown>', () => {
  it('should open when the open attribute is added', async () => {
    const page = await newE2EPage({
      html: `
        <sl-dropdown>
          <sl-button slot="trigger" caret>Dropdown</sl-button>
          <sl-menu>
            <sl-menu-item>Dropdown Item</sl-menu-item>
          </sl-menu>
        </sl-dropdown>
      `
    });
    const dropdown = await page.find('sl-dropdown');
    const panel = await page.find('sl-dropdown >>> .dropdown__panel');
    const slShow = await dropdown.spyOnEvent('sl-show');
    const slAfterShow = await dropdown.spyOnEvent('sl-after-show');

    expect(await panel.isVisible()).toBe(false);

    const showEventHappened = dropdown.waitForEvent('sl-after-show');
    dropdown.setAttribute('open', '');
    await page.waitForChanges();
    await showEventHappened;

    expect(await panel.isVisible()).toBe(true);
    expect(slShow).toHaveReceivedEventTimes(1);
    expect(slAfterShow).toHaveReceivedEventTimes(1);
  });

  it('should close when the open attribute is removed', async () => {
    const page = await newE2EPage({
      html: `
        <sl-dropdown open>
          <sl-button slot="trigger" caret>Dropdown</sl-button>
          <sl-menu>
            <sl-menu-item>Dropdown Item</sl-menu-item>
          </sl-menu>
        </sl-dropdown>
      `
    });
    const dropdown = await page.find('sl-dropdown');
    const panel = await page.find('sl-dropdown >>> .dropdown__panel');
    const slHide = await dropdown.spyOnEvent('sl-hide');
    const slAfterHide = await dropdown.spyOnEvent('sl-after-hide');

    expect(await panel.isVisible()).toBe(true);

    const hideEventHappened = dropdown.waitForEvent('sl-after-hide');
    dropdown.removeAttribute('open');
    await page.waitForChanges();
    await hideEventHappened;

    expect(await panel.isVisible()).toBe(false);
    expect(slHide).toHaveReceivedEventTimes(1);
    expect(slAfterHide).toHaveReceivedEventTimes(1);
  });

  it('should open when the show() method is called', async () => {
    const page = await newE2EPage({
      html: `
        <sl-dropdown>
          <sl-button slot="trigger" caret>Dropdown</sl-button>
          <sl-menu>
            <sl-menu-item>Dropdown Item</sl-menu-item>
          </sl-menu>
        </sl-dropdown>
      `
    });
    const dropdown = await page.find('sl-dropdown');
    const panel = await page.find('sl-dropdown >>> .dropdown__panel');
    const slShow = await dropdown.spyOnEvent('sl-show');
    const slAfterShow = await dropdown.spyOnEvent('sl-after-show');

    expect(await panel.isVisible()).toBe(false);

    const showEventHappened = dropdown.waitForEvent('sl-after-show');
    await dropdown.callMethod('show');
    await showEventHappened;

    expect(await panel.isVisible()).toBe(true);
    expect(slShow).toHaveReceivedEventTimes(1);
    expect(slAfterShow).toHaveReceivedEventTimes(1);
  });

  it('should close when the hide() method is called', async () => {
    const page = await newE2EPage({
      html: `
        <sl-dropdown open>
          <sl-button slot="trigger" caret>Dropdown</sl-button>
          <sl-menu>
            <sl-menu-item>Dropdown Item</sl-menu-item>
          </sl-menu>
        </sl-dropdown>
      `
    });

    const dropdown = await page.find('sl-dropdown');
    const panel = await page.find('sl-dropdown >>> .dropdown__panel');
    const slHide = await dropdown.spyOnEvent('sl-hide');
    const slAfterHide = await dropdown.spyOnEvent('sl-after-hide');

    expect(await panel.isVisible()).toBe(true);

    const hideEventHappened = dropdown.waitForEvent('sl-after-hide');
    await dropdown.callMethod('hide');
    await hideEventHappened;

    expect(await panel.isVisible()).toBe(false);
    expect(slHide).toHaveReceivedEventTimes(1);
    expect(slAfterHide).toHaveReceivedEventTimes(1);
  });

  it('should open when clicked and hidden', async () => {
    const page = await newE2EPage({
      html: `
        <sl-dropdown>
          <sl-button slot="trigger" caret>Dropdown</sl-button>
          <sl-menu>
            <sl-menu-item>Dropdown Item</sl-menu-item>
          </sl-menu>
        </sl-dropdown>
      `
    });
    const dropdown = await page.find('sl-dropdown');
    const panel = await page.find('sl-dropdown >>> .dropdown__panel');
    const slShow = await dropdown.spyOnEvent('sl-show');
    const slAfterShow = await dropdown.spyOnEvent('sl-after-show');

    expect(await panel.isVisible()).toBe(false);

    const showEventHappened = dropdown.waitForEvent('sl-after-show');
    await dropdown.click();
    await showEventHappened;

    expect(await panel.isVisible()).toBe(true);
    expect(slShow).toHaveReceivedEventTimes(1);
    expect(slAfterShow).toHaveReceivedEventTimes(1);
  });

  it('should close when clicked while showing', async () => {
    const page = await newE2EPage({
      html: `
        <sl-dropdown open>
          <sl-button slot="trigger" caret>Dropdown</sl-button>
          <sl-menu>
            <sl-menu-item>Dropdown Item</sl-menu-item>
          </sl-menu>
        </sl-dropdown>
      `
    });
    const dropdown = await page.find('sl-dropdown');
    const panel = await page.find('sl-dropdown >>> .dropdown__panel');
    const slHide = await dropdown.spyOnEvent('sl-hide');
    const slAfterHide = await dropdown.spyOnEvent('sl-after-hide');

    expect(await panel.isVisible()).toBe(true);

    const afterEventHappened = dropdown.waitForEvent('sl-after-hide');
    await dropdown.click();
    await afterEventHappened;

    expect(await panel.isVisible()).toBe(false);
    expect(slHide).toHaveReceivedEventTimes(1);
    expect(slAfterHide).toHaveReceivedEventTimes(1);
  });

  it('should close when an item is selected', async () => {
    const page = await newE2EPage({
      html: `
        <sl-dropdown open>
          <sl-button slot="trigger" caret>Dropdown</sl-button>
          <sl-menu>
            <sl-menu-item>Dropdown Item</sl-menu-item>
          </sl-menu>
        </sl-dropdown>
      `
    });
    const dropdown = await page.find('sl-dropdown');
    const panel = await page.find('sl-dropdown >>> .dropdown__panel');

    expect(await panel.isVisible()).toBe(true);

    const eventHappened = dropdown.waitForEvent('sl-after-hide');
    await panel.click();
    await eventHappened;

    expect(await panel.isVisible()).toBe(false);
  });

  it('should not close when an item is selected and closeOnSelect is true', async () => {
    const page = await newE2EPage({
      html: `
          <sl-dropdown open>
            <sl-button slot="trigger" caret>Dropdown</sl-button>
            <sl-menu>
              <sl-menu-item>Dropdown Item</sl-menu-item>
            </sl-menu>
          </sl-dropdown>
        `
    });
    const dropdown = await page.find('sl-dropdown');
    const panel = await page.find('sl-dropdown >>> .dropdown__panel');

    dropdown.setProperty('closeOnSelect', false);
    await page.waitForChanges();
    expect(await panel.isVisible()).toBe(true);

    await panel.click();
    expect(await panel.isVisible()).toBe(true);
  });
});
