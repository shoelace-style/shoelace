import { elementUpdated, expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import { clickOnElement } from '../../internal/test';
import { queryByTestId } from '../../internal/test/data-testid-helpers';
import { IntersectionObserverMock } from '../../internal/test/intersection-observer-mock';
import type SlTabPanel from '../tab-panel/tab-panel';
import type SlTab from '../tab/tab';
import type SlTabGroup from './tab-group';
import type { HTMLTemplateResult } from 'lit';

interface ClientRectangles {
  body?: DOMRect;
  navigation?: DOMRect;
}

const wait = async (delayInMs = 0): Promise<void> => {
  return new Promise(resolve => {
    window.setTimeout(() => resolve(), delayInMs);
  });
};

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

const waitForScrollingToEnd = (element: Element, timeoutInMs = 500): Promise<void> => {
  let lastLeft = element.scrollLeft;
  let lastTop = element.scrollTop;
  let framesWithoutChange = 0;
  return new Promise((resolve, reject) => {
    const timeout = window.setTimeout(() => {
      reject(new Error('Waiting for scroll end timed out'));
    }, timeoutInMs);
    function checkScrollingChanged() {
      if (element.scrollLeft !== lastLeft || element.scrollTop !== lastTop) {
        framesWithoutChange = 0;
        lastLeft = window.scrollX;
        lastTop = window.scrollY;
      } else {
        framesWithoutChange++;
        if (framesWithoutChange >= 20) {
          clearTimeout(timeout);
          resolve();
        }
      }
      window.requestAnimationFrame(checkScrollingChanged);
    }
    checkScrollingChanged();
  });
};

const isElementVisibleFromScrolling = (outerElement: Element, innerElement: Element): boolean => {
  const outerRect = outerElement.getBoundingClientRect();
  const innerRect = innerElement.getBoundingClientRect();
  return (
    outerRect.top <= innerRect.bottom &&
    innerRect.top <= outerRect.bottom &&
    outerRect.left <= innerRect.right &&
    innerRect.left <= outerRect.right
  );
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

  const showTabGroup = async (tabGroup: SlTabGroup): Promise<SlTabGroup> => {
    triggerIntersectionObserverToShowTabPanels(tabGroup);

    await wait();

    return tabGroup;
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

  describe('scrolling behavior', () => {
    const generateTabs = (n: number): HTMLTemplateResult[] => {
      const result: HTMLTemplateResult[] = [];
      for (let i = 0; i < n; i++) {
        result.push(html`<sl-tab slot="nav" panel="tab-${i}">Tab ${i}</sl-tab>
          <sl-tab-panel name="tab-${i}">Content of tab ${i}0</sl-tab-panel> `);
      }
      return result;
    };

    it('shows scroll buttons on too many tabs', async () => {
      const tabGroup = await fixture<SlTabGroup>(html`<sl-tab-group> ${generateTabs(30)} </sl-tab-group>`);

      await wait();

      const scrollButtons = tabGroup.shadowRoot?.querySelectorAll('sl-icon-button');
      expect(scrollButtons, 'Both scroll buttons should be shown').to.have.length(2);
    });

    it('does not show scroll buttons on too many tabs if deactivated', async () => {
      const tabGroup = await fixture<SlTabGroup>(html`<sl-tab-group> ${generateTabs(30)} </sl-tab-group>`);
      tabGroup.noScrollControls = true;

      await wait();

      const scrollButtons = tabGroup.shadowRoot?.querySelectorAll('sl-icon-button');
      expect(scrollButtons).to.have.length(0);
    });

    it('does not show scroll buttons if all tabs fit on the screen', async () => {
      const tabGroup = await fixture<SlTabGroup>(html`<sl-tab-group> ${generateTabs(2)} </sl-tab-group>`);

      await wait();

      const scrollButtons = tabGroup.shadowRoot?.querySelectorAll('sl-icon-button');
      expect(scrollButtons).to.have.length(0);
    });

    it('does not show scroll buttons if placement is start', async () => {
      const tabGroup = await fixture<SlTabGroup>(html`<sl-tab-group> ${generateTabs(50)} </sl-tab-group>`);
      tabGroup.placement = 'start';

      await wait();

      const scrollButtons = tabGroup.shadowRoot?.querySelectorAll('sl-icon-button');
      expect(scrollButtons).to.have.length(0);
    });

    it('does not show scroll buttons if placement is end', async () => {
      const tabGroup = await fixture<SlTabGroup>(html`<sl-tab-group> ${generateTabs(50)} </sl-tab-group>`);
      tabGroup.placement = 'end';

      await wait();

      const scrollButtons = tabGroup.shadowRoot?.querySelectorAll('sl-icon-button');
      expect(scrollButtons).to.have.length(0);
    });

    it('does scroll on scroll button click', async () => {
      const tabGroup = await fixture<SlTabGroup>(html`<sl-tab-group> ${generateTabs(30)} </sl-tab-group>`);

      await wait();

      const scrollButtons = tabGroup.shadowRoot?.querySelectorAll('sl-icon-button');
      expect(scrollButtons).to.have.length(2);

      const firstTab = tabGroup.querySelector('[panel="tab-0"]');
      expect(firstTab).not.to.be.null;
      const lastTab = tabGroup.querySelector('[panel="tab-29"]');
      expect(lastTab).not.to.be.null;
      expect(isElementVisibleFromScrolling(tabGroup, firstTab!)).to.be.true;
      expect(isElementVisibleFromScrolling(tabGroup, lastTab!)).to.be.false;

      const scrollToRightButton = tabGroup.shadowRoot?.querySelector('sl-icon-button[part*="scroll-button--end"]');
      expect(scrollToRightButton).not.to.be.null;
      await clickOnElement(scrollToRightButton!);

      await elementUpdated(tabGroup);
      await waitForScrollingToEnd(firstTab!);

      expect(isElementVisibleFromScrolling(tabGroup, firstTab!)).to.be.false;
      expect(isElementVisibleFromScrolling(tabGroup, lastTab!)).to.be.true;
    });
  });
});
