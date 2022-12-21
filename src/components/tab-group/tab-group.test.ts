import { elementUpdated, expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import type SlTabPanel from '../tab-panel/tab-panel';
import type SlTab from '../tab/tab';
import type SlTabGroup from './tab-group';

interface ClientRectangles {
  body?: DOMRect;
  navigation?: DOMRect;
}

const createTabGroup = async (): Promise<SlTabGroup> => {
  return fixture<SlTabGroup>(html`
    <sl-tab-group>
      <sl-tab slot="nav" panel="general" data-testid="general-tab-header">General</sl-tab>
      <sl-tab slot="nav" panel="custom" data-testid="custom-tab-header">Custom</sl-tab>
      <sl-tab slot="nav" panel="advanced" data-testid="advanced-tab-header">Advanced</sl-tab>
      <sl-tab slot="nav" panel="disabled" disabled data-testid="disabled-tab-header">Disabled</sl-tab>

      <sl-tab-panel name="general" data-testid="general-tab-content">This is the general tab panel.</sl-tab-panel>
      <sl-tab-panel name="custom" data-testid="custom-tab-content">This is the custom tab panel.</sl-tab-panel>
      <sl-tab-panel name="advanced" data-testid="advanced-tab-content">This is the advanced tab panel.</sl-tab-panel>
      <sl-tab-panel name="disabled" data-testid="disabled-tab-content">This is a disabled tab panel.</sl-tab-panel>
    </sl-tab-group>
  `);
};

const headerTestIds = ['general-tab-header', 'custom-tab-header', 'advanced-tab-header', 'disabled-tab-header'];
const contentTestIds = ['general-tab-content', 'custom-tab-content', 'advanced-tab-content', 'disabled-tab-content'];

const queryByTestId = <T>(container: HTMLElement, testId: string): T | null => {
  const selectedElement = container.querySelector(`[data-testid=${testId}]`);
  if (selectedElement) {
    return selectedElement as T;
  }
  return null;
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

const expectHeaderToBeVisible = (container: HTMLElement, dataTestid: string): void => {
  const generalHeader = queryByTestId<SlTab>(container, dataTestid);
  expect(generalHeader).not.to.be.null;
  expect(generalHeader).to.be.visible;
};

const expectTabPanelToBeActive = (container: HTMLElement, dataTestId: string) => {
  const panel = queryByTestId<SlTabPanel>(container, dataTestId);
  expect(panel).to.have.attribute('active');
};

const expectTabPanelNotToBeActive = (container: HTMLElement, dataTestId: string) => {
  const panel = queryByTestId<SlTabPanel>(container, dataTestId);
  expect(panel).not.to.have.attribute('active');
};

const expectOnlyOneTabPanelToBeActive = (container: HTMLElement, dataTestIdOfActiveTab: string) => {
  contentTestIds.forEach(testId => {
    if (testId === dataTestIdOfActiveTab) {
      expectTabPanelToBeActive(container, testId);
    } else {
      expectTabPanelNotToBeActive(container, testId);
    }
  });
};

describe('<sl-tab-group>', () => {
  let mocks: MockIntersectionObserver[] = [];
  class MockIntersectionObserver extends IntersectionObserver {
    constructor(callback: IntersectionObserverCallback) {
      super(callback, {});
      this.callback = callback;
      mocks.push(this);
    }
    prototype: IntersectionObserver;
    callback: IntersectionObserverCallback | undefined = undefined;
    root: Element | Document | null;
    rootMargin: string;
    thresholds: readonly number[];
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    disconnect(): void {}
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    observe(_: Element): void {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    unobserve(_: Element): void {}

    executeCallback(entries: IntersectionObserverEntry[]) {
      if (this.callback) {
        this.callback(entries, this);
      }
    }
  }

  const triggerIntersectionObserverToShowTabPanels = (tabGroup: SlTabGroup) => {
    expect(mocks.length).to.be.equal(1);
    if (mocks[0]?.callback) {
      mocks[0].callback(
        [{ intersectionRatio: 1.0, target: tabGroup } as unknown as IntersectionObserverEntry],
        mocks[0]
      );
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const createAndShowTabGroup = async (modifier: (tabGroup: SlTabGroup) => void = () => {}): Promise<SlTabGroup> => {
    const tabGroup = await createTabGroup();
    modifier(tabGroup);

    triggerIntersectionObserverToShowTabPanels(tabGroup);

    await elementUpdated(tabGroup);
    return tabGroup;
  };

  let originalIntersectionObserver: typeof window.IntersectionObserver | undefined;
  beforeEach(() => {
    originalIntersectionObserver = window.IntersectionObserver;
    window.IntersectionObserver = MockIntersectionObserver;
    mocks = [];
  });

  afterEach(() => {
    window.IntersectionObserver = originalIntersectionObserver || window.IntersectionObserver;
    mocks = [];
  });

  it('renders', async () => {
    const tabGroup = await createTabGroup();

    expect(tabGroup).to.be.visible;
  });

  it('is accessible', async () => {
    const tabGroup = await createTabGroup();

    await expect(tabGroup).to.be.accessible();
  });

  it('displays all tabs', async () => {
    const tabGroup = await createTabGroup();

    headerTestIds.forEach(() => {
      expectHeaderToBeVisible(tabGroup, 'general-tab-header');
    });
  });

  it('shows the first tab to be active by default', async () => {
    const tabGroup = await createAndShowTabGroup();

    expectOnlyOneTabPanelToBeActive(tabGroup, contentTestIds[0]);
  });

  describe('proper positioning', () => {
    it('shows the header above the tabs by default', async () => {
      const tabGroup = await createAndShowTabGroup();

      const clientRectangles = getClientRectangles(tabGroup);
      expect(clientRectangles.body?.top).to.be.greaterThanOrEqual(clientRectangles.navigation?.bottom || -Infinity);
    });

    it('shows the header below the tabs by setting placement to bottom', async () => {
      const tabGroup = await createAndShowTabGroup(tg => (tg.placement = 'bottom'));

      const clientRectangles = getClientRectangles(tabGroup);
      expect(clientRectangles.body?.bottom).to.be.lessThanOrEqual(clientRectangles.navigation?.top || +Infinity);
    });

    it('shows the header left of the tabs by setting placement to start', async () => {
      const tabGroup = await createAndShowTabGroup(tg => (tg.placement = 'start'));

      const clientRectangles = getClientRectangles(tabGroup);
      expect(clientRectangles.body?.left).to.be.greaterThanOrEqual(clientRectangles.navigation?.right || -Infinity);
    });

    it('shows the header right of the tabs by setting placement to end', async () => {
      const tabGroup = await createAndShowTabGroup(tg => (tg.placement = 'end'));

      const clientRectangles = getClientRectangles(tabGroup);
      expect(clientRectangles.body?.right).to.be.lessThanOrEqual(clientRectangles.navigation?.left || -Infinity);
    });
  });
});
