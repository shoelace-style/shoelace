import { newE2EPage } from '@stencil/core/testing';

const testTabGroup = `
  <sl-tab-group>
    <sl-tab slot="nav" panel="general">General</sl-tab>
    <sl-tab slot="nav" panel="custom">Custom</sl-tab>
    <sl-tab slot="nav" panel="advanced">Advanced</sl-tab>

    <sl-tab-panel name="general">This is the general tab panel.</sl-tab-panel>
    <sl-tab-panel name="custom">This is the custom tab panel.</sl-tab-panel>
    <sl-tab-panel name="advanced">This is the advanced tab panel.</sl-tab-panel>
  </sl-tab-group>
`;

describe('<sl-tab group>', () => {
  it('should only show first panel by default', async () => {
    const page = await newE2EPage({
      html: testTabGroup
    });
    const firstPanelName = 'general';
    const firstPanel = await page.find(`sl-tab-panel[name=${firstPanelName}]`);

    expect(await firstPanel.isVisible()).toBe(true);

    const otherPanels = await page.findAll(`sl-tab-panel:not([name=${firstPanelName}]`);
    for (let panel of otherPanels) {
      expect(await panel.isVisible()).not.toBe(true);
    }
  });

  it('should have first tab activated by default', async () => {
    const page = await newE2EPage({
      html: testTabGroup
    });
    const firstPanelName = 'general';
    const tab = await page.find(`sl-tab[panel=${firstPanelName}] >>> .tab`);

    expect(tab).toHaveClass('tab--active');
  });

  it('should show appropriate panel when tab is selected by clicking', async () => {
    const page = await newE2EPage({
      html: testTabGroup
    });
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
    const page = await newE2EPage({
      html: testTabGroup
    });
    const selectedPanelName = 'advanced';
    const selectedTab = await page.find(`sl-tab[panel=${selectedPanelName}]`);

    await selectedTab.click();

    const tab = await page.find(`sl-tab[panel=${selectedPanelName}] >>> .tab`);
    expect(tab).toHaveClass('tab--active');
  });

  it('should show appropriate panel when show() is called', async () => {
    const page = await newE2EPage({
      html: testTabGroup
    });
    const selectedPanelName = 'custom';
    const tabGroup = await page.find('sl-tab-group');

    await tabGroup.callMethod('show', selectedPanelName);

    const selectedPanel = await page.find(`sl-tab-panel[name=${selectedPanelName}]`);
    expect(await selectedPanel.isVisible()).toBe(true);

    const tab = await page.find(`sl-tab[panel=${selectedPanelName}] >>> .tab`);
    expect(tab).toHaveClass('tab--active');
  });

  it('should emit sl-tab-hide and sl-tab-show events when tab is changed', async () => {
    const page = await newE2EPage({
      html: testTabGroup
    });
    const tabGroup = await page.find('sl-tab-group');
    const slTabHide = await tabGroup.spyOnEvent('sl-tab-hide');
    const slTabShow = await tabGroup.spyOnEvent('sl-tab-show');
    const selectedPanelName = 'advanced';
    const selectedTab = await page.find(`sl-tab[panel=${selectedPanelName}]`);

    await selectedTab.click();

    expect(slTabHide).toHaveReceivedEventTimes(1);
    expect(slTabHide).toHaveReceivedEventDetail({ name: 'general' });
    expect(slTabShow).toHaveReceivedEventTimes(1);
    expect(slTabShow).toHaveReceivedEventDetail({ name: 'advanced' });
  });

  it('should change tabs when show() is called', async () => {
    const page = await newE2EPage({
      html: testTabGroup
    });
    const tabGroup = await page.find('sl-tab-group');
    const slTabHide = await tabGroup.spyOnEvent('sl-tab-hide');
    const slTabShow = await tabGroup.spyOnEvent('sl-tab-show');
    const selectedPanelName = 'advanced';
    const selectedTab = await page.find(`sl-tab[panel=${selectedPanelName}]`);

    await selectedTab.click();

    expect(slTabHide).toHaveReceivedEventTimes(1);
    expect(slTabHide).toHaveReceivedEventDetail({ name: 'general' });
    expect(slTabShow).toHaveReceivedEventTimes(1);
    expect(slTabShow).toHaveReceivedEventDetail({ name: 'advanced' });
  });

  it('should not hide the active panel when selecting a nested tab', async () => {
    const page = await newE2EPage({
      html: `
        <sl-tab-group>
          <sl-tab slot="nav" panel="a">Tab A</sl-tab>
          <sl-tab slot="nav" panel="b">Tab B</sl-tab>

          <sl-tab-panel name="a">
            <sl-tab-group>
              <sl-tab slot="nav" panel="c">Tab C</sl-tab>
              <sl-tab slot="nav" panel="d">Tab D</sl-tab>
              <sl-tab-panel name="c">Panel C</sl-tab-panel>
              <sl-tab-panel name="d">Panel D</sl-tab-panel>
            </sl-tab-group>
          </sl-tab-panel>
          <sl-tab-panel name="b">Panel B</sl-tab-panel>
        </sl-tab-group>
      `
    });
    const nestedTabGroup = await page.find('sl-tab-group sl-tab-group');
    const tab = await page.find(`sl-tab[panel="d"]`);

    await tab.click();

    expect(await nestedTabGroup.isVisible()).toBe(true);
  });
});
