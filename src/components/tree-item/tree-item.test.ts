import { expect, fixture, html, oneEvent, waitUntil } from '@open-wc/testing';
import sinon from 'sinon';
import type SlTreeItem from './tree-item';

describe('<sl-tree-item>', () => {
  let leafItem: SlTreeItem;
  let parentItem: SlTreeItem;

  beforeEach(async () => {
    leafItem = await fixture(html` <sl-tree-item>Node 1</sl-tree-item> `);
    parentItem = await fixture(html`
      <sl-tree-item>
        Parent Node
        <sl-tree-item>Node 1</sl-tree-item>
        <sl-tree-item>Node 1</sl-tree-item>
      </sl-tree-item>
    `);
  });

  it('should render a component', () => {
    expect(leafItem).to.exist;
    expect(parentItem).to.exist;

    expect(leafItem).to.have.attribute('role', 'treeitem');
    expect(leafItem).to.have.attribute('aria-selected', 'false');
    expect(leafItem).to.have.attribute('aria-disabled', 'false');
  });

  describe('when it contains child tree items', () => {
    it('should set isLeaf to false', () => {
      // Assert
      expect(parentItem.isLeaf).to.be.false;
    });

    it('should show the toggle button', () => {
      // Arrange
      const toggleButton = parentItem.shadowRoot?.querySelector('.tree-item__toggle-button');

      // Act

      // Assert
      expect(toggleButton?.childElementCount).to.be.greaterThan(0);
    });

    it('should set the aria-expanded attribute', () => {
      expect(parentItem).to.have.attribute('aria-expanded', 'false');
    });
  });

  describe('when the user clicks the toggle button', () => {
    describe('and the item is collapsed', () => {
      it('should emit sl-expand and sl-after-expand events', async () => {
        // Arrange
        const expandSpy = sinon.spy();
        const afterExpandSpy = sinon.spy();

        parentItem.addEventListener('sl-expand', expandSpy);
        parentItem.addEventListener('sl-after-expand', afterExpandSpy);

        // Act
        parentItem.expanded = true;
        await waitUntil(() => expandSpy.calledOnce);
        await waitUntil(() => afterExpandSpy.calledOnce);

        // Assert
        expect(expandSpy).to.have.been.calledOnce;
        expect(afterExpandSpy).to.have.been.calledOnce;
      });
    });

    describe('and the item is expanded', () => {
      it('should emit sl-collapse and sl-after-collapse events', async () => {
        // Arrange
        const collapseSpy = sinon.spy();
        const afterCollapseSpy = sinon.spy();

        parentItem.addEventListener('sl-collapse', collapseSpy);
        parentItem.addEventListener('sl-after-collapse', afterCollapseSpy);

        parentItem.expanded = true;
        await oneEvent(parentItem, 'sl-after-expand');

        // Act
        parentItem.expanded = false;
        await waitUntil(() => collapseSpy.calledOnce);
        await waitUntil(() => afterCollapseSpy.calledOnce);

        // Assert
        expect(collapseSpy).to.have.been.calledOnce;
        expect(afterCollapseSpy).to.have.been.calledOnce;
      });

      describe('and the item is disabled', () => {
        it('should not expand', async () => {
          // Arrange
          const toggleButton: HTMLElement = parentItem.shadowRoot!.querySelector('.tree-item__toggle-button')!;
          parentItem.disabled = true;

          // Act
          toggleButton.click();
          await parentItem.updateComplete;

          // Assert
          expect(parentItem).not.to.have.attribute('expanded');
          expect(parentItem).to.have.attribute('aria-expanded', 'false');
        });
      });
    });
  });

  describe('when the item is selected', () => {
    it('should update the aria-selected attribute', async () => {
      // Act
      leafItem.selected = true;
      await leafItem.updateComplete;

      // Assert
      expect(leafItem).to.have.attribute('aria-selected', 'true');
    });

    it('should set item--selected part', async () => {
      // Act
      leafItem.selected = true;
      await leafItem.updateComplete;

      // Assert
      expect(leafItem.shadowRoot?.querySelector('.tree-item__item')?.part.contains('item--selected')).to.be.true;
    });
  });

  describe('when the item is disabled', () => {
    it('should update the aria-disabled attribute', async () => {
      // Act
      leafItem.disabled = true;
      await leafItem.updateComplete;

      // Assert
      expect(leafItem).to.have.attribute('aria-disabled', 'true');
    });

    it('should set item--disabled part', async () => {
      // Act
      leafItem.disabled = true;
      await leafItem.updateComplete;

      // Assert
      expect(leafItem.shadowRoot?.querySelector('.tree-item__item')?.part.contains('item--disabled')).to.be.true;
    });
  });

  describe('when the item is expanded', () => {
    it('should set item--expanded part', async () => {
      // Act
      leafItem.expanded = true;
      await leafItem.updateComplete;

      // Assert
      expect(leafItem.shadowRoot?.querySelector('.tree-item__item')?.part.contains('item--expanded')).to.be.true;
    });
  });
});
