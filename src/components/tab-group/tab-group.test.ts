import { elementUpdated, expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import { queryByTestId } from '../../internal/test/data-testid-helpers';
import { IntersectionObserverMock } from '../../internal/test/intersection-observer-mock';
import type SlTabPanel from '../tab-panel/tab-panel';
import type SlTab from '../tab/tab';
import type SlTabGroup from './tab-group';

interface ClientRectangles {
  body?: DOMRect;
  navigation?: DOMRect;
}

const getClientRectangles = (tabGroup: SlTabGroup): ClientRectangles => {
  const shadowRoot = tabGroup.shadowRoot;
  if (shadowRoot) {
    const nav = shadowRoot.querySelector<HTMLElement>('[part=nav]');
    const body = shadowRoot.querySelector<HTMLElement>('[part=body]');
    return {
      body: body?.getBoundingClientRect(),
      navigation: nav?.getBoundingClientRect()
    };
  }
  return {};
};

const expectHeaderToBeVisible = (container: HTMLElement, dataTestid: string): void => {
  const generalHeader = queryByTestId<SlTab>(container, dataTestid);
  expect(generalHeader).not.to.be.null;
  expect(generalHeader).to.be.visible;
};

const expectOnlyOneTabPanelToBeActive = (container: HTMLElement, dataTestIdOfActiveTab: string) => {
  const tabPanels = Array.from(container.getElementsByTagName('sl-tab-panel'));

  const activeTabPanels = tabPanels.filter((element: SlTabPanel) => element.hasAttribute('active'));
  expect(activeTabPanels).to.have.length(1, `Expect to have exactly one active tab panel`);
  expect(activeTabPanels[0]).to.have.attribute('data-testid', dataTestIdOfActiveTab);
};

describe('<sl-tab-group>', () => {
  const intersectionObserverMock = new IntersectionObserverMock();

  const triggerIntersectionObserverToShowTabPanels = (tabGroup: SlTabGroup) => {
    const mocks = intersectionObserverMock.mocks;
    expect(mocks.length).to.be.equal(1);
    mocks[0].executeCallback([{ intersectionRatio: 1.0, target: tabGroup } as unknown as IntersectionObserverEntry]);
  };

  const showTabGroup = (tabGroup: SlTabGroup): Promise<SlTabGroup> => {
    triggerIntersectionObserverToShowTabPanels(tabGroup);

    return elementUpdated(tabGroup);
  };

  beforeEach(() => {
    intersectionObserverMock.install();
  });

  afterEach(() => {
    intersectionObserverMock.uninstall();
  });

  it('renders', async () => {
    const tabGroup = await fixture<SlTabGroup>(html`
      <sl-tab-group>
        <sl-tab slot="nav" panel="general">General</sl-tab>
        <sl-tab-panel name="general">This is the general tab panel.</sl-tab-panel>
      </sl-tab-group>
    `);

    expect(tabGroup).to.be.visible;
  });

  it('is accessible', async () => {
    const tabGroup = await fixture<SlTabGroup>(html`
      <sl-tab-group>
        <sl-tab slot="nav" panel="general">General</sl-tab>
        <sl-tab-panel name="general">This is the general tab panel.</sl-tab-panel>
      </sl-tab-group>
    `);

    await expect(tabGroup).to.be.accessible();
  });

  it('displays all tabs', async () => {
    const tabGroup = await fixture<SlTabGroup>(html`
      <sl-tab-group>
        <sl-tab slot="nav" panel="general" data-testid="general-tab-header">General</sl-tab>
        <sl-tab slot="nav" panel="disabled" disabled data-testid="disabled-tab-header">Disabled</sl-tab>
        <sl-tab-panel name="general">This is the general tab panel.</sl-tab-panel>
        <sl-tab-panel name="disabled">This is a disabled tab panel.</sl-tab-panel>
      </sl-tab-group>
    `);

    expectHeaderToBeVisible(tabGroup, 'general-tab-header');
    expectHeaderToBeVisible(tabGroup, 'disabled-tab-header');
  });

  it('shows the first tab to be active by default', async () => {
    const tabGroup = await fixture<SlTabGroup>(html`
      <sl-tab-group>
        <sl-tab slot="nav" panel="general">General</sl-tab>
        <sl-tab slot="nav" panel="custom">Custom</sl-tab>
        <sl-tab-panel name="general" data-testid="general-tab-content">This is the general tab panel.</sl-tab-panel>
        <sl-tab-panel name="custom">This is the custom tab panel.</sl-tab-panel>
      </sl-tab-group>
    `);

    await showTabGroup(tabGroup);

    expectOnlyOneTabPanelToBeActive(tabGroup, 'general-tab-content');
  });

  describe('proper positioning', () => {
    it('shows the header above the tabs by default', async () => {
      const tabGroup = await fixture<SlTabGroup>(html`
        <sl-tab-group>
          <sl-tab slot="nav" panel="general">General</sl-tab>
          <sl-tab-panel name="general">This is the general tab panel.</sl-tab-panel>
        </sl-tab-group>
      `);

      await showTabGroup(tabGroup);

      const clientRectangles = getClientRectangles(tabGroup);
      expect(clientRectangles.body?.top).to.be.greaterThanOrEqual(clientRectangles.navigation?.bottom || -Infinity);
    });

    it('shows the header below the tabs by setting placement to bottom', async () => {
      const tabGroup = await fixture<SlTabGroup>(html`
        <sl-tab-group>
          <sl-tab slot="nav" panel="general">General</sl-tab>
          <sl-tab-panel name="general">This is the general tab panel.</sl-tab-panel>
        </sl-tab-group>
      `);
      tabGroup.placement = 'bottom';

      await showTabGroup(tabGroup);

      const clientRectangles = getClientRectangles(tabGroup);
      expect(clientRectangles.body?.bottom).to.be.lessThanOrEqual(clientRectangles.navigation?.top || +Infinity);
    });

    it('shows the header left of the tabs by setting placement to start', async () => {
      const tabGroup = await fixture<SlTabGroup>(html`
        <sl-tab-group>
          <sl-tab slot="nav" panel="general">General</sl-tab>
          <sl-tab-panel name="general">This is the general tab panel.</sl-tab-panel>
        </sl-tab-group>
      `);
      tabGroup.placement = 'start';

      await showTabGroup(tabGroup);

      const clientRectangles = getClientRectangles(tabGroup);
      expect(clientRectangles.body?.left).to.be.greaterThanOrEqual(clientRectangles.navigation?.right || -Infinity);
    });

    it('shows the header right of the tabs by setting placement to end', async () => {
      const tabGroup = await fixture<SlTabGroup>(html`
        <sl-tab-group>
          <sl-tab slot="nav" panel="general">General</sl-tab>
          <sl-tab-panel name="general">This is the general tab panel.</sl-tab-panel>
        </sl-tab-group>
      `);
      tabGroup.placement = 'end';

      await showTabGroup(tabGroup);

      const clientRectangles = getClientRectangles(tabGroup);
      expect(clientRectangles.body?.right).to.be.lessThanOrEqual(clientRectangles.navigation?.left || -Infinity);
    });
  });
});
