import { newE2EPage } from '@stencil/core/testing';

const testContent = `
<sl-tab-group>
  <sl-tab slot="nav" panel="general">General</sl-tab>
  <sl-tab slot="nav" panel="custom">Custom</sl-tab>
  <sl-tab slot="nav" panel="advanced">Advanced</sl-tab>
  <sl-tab slot="nav" panel="disabled" disabled>Disabled</sl-tab>

  <sl-tab-panel name="general">This is the general tab panel.</sl-tab-panel>
  <sl-tab-panel name="custom">This is the custom tab panel.</sl-tab-panel>
  <sl-tab-panel name="advanced">This is the advanced tab panel.</sl-tab-panel>
  <sl-tab-panel name="disabled">This is a disabled tab panel.</sl-tab-panel>
</sl-tab-group>
`;

describe('tab group', () => {
  it('should only show first panel by default', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const firstPanelName = 'general';

    const firstPanel = await page.find(`sl-tab-panel[name=${firstPanelName}]`);
    expect(await firstPanel.isVisible()).toBe(true);

    const otherPanels = await page.findAll(`sl-tab-panel:not([name=${firstPanelName}]`);
    for (let panel of otherPanels) {
      expect(await panel.isVisible()).not.toBe(true);
    }
  });

  it('should have first tab activated by default', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const firstPanelName = 'general';

    const tab = await page.find(`sl-tab[panel=${firstPanelName}] >>> .tab`);
    expect(tab).toHaveClass('tab--active');
  });

  it('should show appropriate panel when tab is selected by clicking', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const selectedPanelName = 'custom';

    const selectedTab = await page.find(`sl-tab[panel=${selectedPanelName}]`);
    await selectedTab.click();

    const selectedPanel = await page.find(`sl-tab-panel[name=${selectedPanelName}]`);
    expect(await selectedPanel.isVisible()).toBe(true);

    const otherPanels = await page.findAll(`sl-tab-panel:not([name=${selectedPanelName}]`);
    for (let panel of otherPanels) {
      expect(await panel.isVisible()).not.toBe(true);
    }
  });

  it('should have appropriate tab activated when selected by clicking', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const selectedPanelName = 'advanced';

    const selectedTab = await page.find(`sl-tab[panel=${selectedPanelName}]`);
    await selectedTab.click();

    const tab = await page.find(`sl-tab[panel=${selectedPanelName}] >>> .tab`);
    expect(tab).toHaveClass('tab--active');
  });

  it('should show appropriate panel when show method called', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const selectedPanelName = 'custom';

    const tabGroup = await page.find('sl-tab-group');
    await tabGroup.callMethod('show', selectedPanelName);

    const selectedPanel = await page.find(`sl-tab-panel[name=${selectedPanelName}]`);
    expect(await selectedPanel.isVisible()).toBe(true);

    const tab = await page.find(`sl-tab[panel=${selectedPanelName}] >>> .tab`);
    expect(tab).toHaveClass('tab--active');
  });

  it('should emit slTabHide and slTabShow events when tab is changed', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const tabGroup = await page.find('sl-tab-group');
    const slTabHide = await tabGroup.spyOnEvent('slTabHide');
    const slTabShow = await tabGroup.spyOnEvent('slTabShow');

    const selectedPanelName = 'advanced';

    const selectedTab = await page.find(`sl-tab[panel=${selectedPanelName}]`);
    await selectedTab.click();

    expect(slTabHide).toHaveReceivedEventTimes(1);
    expect(slTabHide).toHaveReceivedEventDetail({ name: 'general' });
    expect(slTabShow).toHaveReceivedEventTimes(1);
    expect(slTabShow).toHaveReceivedEventDetail({ name: 'advanced' });
  });

  it('should change tab with the show method', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const tabGroup = await page.find('sl-tab-group');
    const slTabHide = await tabGroup.spyOnEvent('slTabHide');
    const slTabShow = await tabGroup.spyOnEvent('slTabShow');

    const selectedPanelName = 'advanced';

    const selectedTab = await page.find(`sl-tab[panel=${selectedPanelName}]`);
    await selectedTab.click();

    expect(slTabHide).toHaveReceivedEventTimes(1);
    expect(slTabHide).toHaveReceivedEventDetail({ name: 'general' });
    expect(slTabShow).toHaveReceivedEventTimes(1);
    expect(slTabShow).toHaveReceivedEventDetail({ name: 'advanced' });
  });
});
