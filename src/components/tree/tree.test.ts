import { expect, fixture, html, triggerBlurFor, triggerFocusFor } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import sinon from 'sinon';
import type SlTreeItem from '../tree-item/tree-item';
import type SlTree from './tree';

describe('<sl-tree>', () => {
  let el: SlTree;

  beforeEach(async () => {
    el = await fixture(html`
      <sl-tree>
        <sl-tree-item>Node 1</sl-tree-item>
        <sl-tree-item>Node 2</sl-tree-item>
        <sl-tree-item>
          Parent Node
          <sl-tree-item>Child Node 1</sl-tree-item>
          <sl-tree-item>Child Node 2</sl-tree-item>
        </sl-tree-item>
        <sl-tree-item>Node 3</sl-tree-item>
      </sl-tree>
    `);
  });

  it('should render a component', () => {
    expect(el).to.exist;
    expect(el).to.have.attribute('role', 'tree');
    expect(el).to.have.attribute('tabindex', '0');
  });

  it('should pass accessibility tests', async () => {
    await expect(el).to.be.accessible();
  });

  describe('Keyboard navigation', () => {
    describe('when ArrowDown is pressed', () => {
      it('should move the focus to the next tree item', async () => {
        // Arrange
        el.focus();
        await el.updateComplete;

        // Act
        await sendKeys({ press: 'ArrowDown' });

        // Assert
        expect(el).to.have.attribute('tabindex', '-1');
        expect(el.children[0]).to.have.attribute('tabindex', '-1');
        expect(el.children[1]).to.have.attribute('tabindex', '0');
      });
    });

    describe('when ArrowUp is pressed', () => {
      it('should move the focus to the prev tree item', async () => {
        // Arrange
        (el.children[1] as HTMLElement).focus();
        await el.updateComplete;

        // Act
        await sendKeys({ press: 'ArrowUp' });

        // Assert
        expect(el).to.have.attribute('tabindex', '-1');
        expect(el.children[0]).to.have.attribute('tabindex', '0');
        expect(el.children[1]).to.have.attribute('tabindex', '-1');
      });
    });

    describe('when ArrowRight is pressed', () => {
      describe('and node is a leaf', () => {
        it('should move the focus to the next tree item', async () => {
          // Arrange
          (el.children[0] as HTMLElement).focus();
          await el.updateComplete;

          // Act
          await sendKeys({ press: 'ArrowRight' });

          // Assert
          expect(el).to.have.attribute('tabindex', '-1');
          expect(el.children[0]).to.have.attribute('tabindex', '-1');
          expect(el.children[1]).to.have.attribute('tabindex', '0');
        });
      });

      describe('and node is collapsed', () => {
        it('should expand the tree item', async () => {
          // Arrange
          const parentNode = el.children[2] as SlTreeItem;
          parentNode.focus();
          await el.updateComplete;

          // Act
          await sendKeys({ press: 'ArrowRight' });

          // Assert
          expect(el).to.have.attribute('tabindex', '-1');
          expect(parentNode).to.have.attribute('tabindex', '0');
          expect(parentNode).to.have.attribute('expanded');
        });
      });

      describe('and node is expanded', () => {
        it('should move the focus to the next tree item', async () => {
          // Arrange
          const parentNode = el.children[2] as SlTreeItem;
          parentNode.expanded = true;
          parentNode.focus();

          await el.updateComplete;

          // Act
          await sendKeys({ press: 'ArrowRight' });

          // Assert
          expect(el).to.have.attribute('tabindex', '-1');
          expect(parentNode).to.have.attribute('tabindex', '-1');
          expect(parentNode.children[0]).to.have.attribute('tabindex', '0');
        });
      });
    });

    describe('when ArrowLeft is pressed', () => {
      describe('and node is a leaf', () => {
        it('should move the focus to the prev tree item', async () => {
          // Arrange
          (el.children[1] as HTMLElement).focus();
          await el.updateComplete;

          // Act
          await sendKeys({ press: 'ArrowLeft' });

          // Assert
          expect(el).to.have.attribute('tabindex', '-1');
          expect(el.children[0]).to.have.attribute('tabindex', '0');
          expect(el.children[1]).to.have.attribute('tabindex', '-1');
        });
      });

      describe('and node is collapsed', () => {
        it('should move the focus to the prev tree item', async () => {
          // Arrange
          (el.children[2] as HTMLElement).focus();
          await el.updateComplete;

          // Act
          await sendKeys({ press: 'ArrowLeft' });

          // Assert
          expect(el).to.have.attribute('tabindex', '-1');
          expect(el.children[1]).to.have.attribute('tabindex', '0');
          expect(el.children[2]).to.have.attribute('tabindex', '-1');
        });
      });

      describe('and node is expanded', () => {
        it('should collapse the tree item', async () => {
          // Arrange
          const parentNode = el.children[2] as SlTreeItem;
          parentNode.expanded = true;
          parentNode.focus();

          await el.updateComplete;

          // Act
          await sendKeys({ press: 'ArrowLeft' });

          // Assert
          expect(el).to.have.attribute('tabindex', '-1');
          expect(parentNode).to.have.attribute('tabindex', '0');
          expect(parentNode).not.to.have.attribute('expanded');
        });
      });
    });

    describe('when Home is pressed', () => {
      it('should move the focus to the first tree item in the tree', async () => {
        // Arrange
        const parentNode = el.children[3] as SlTreeItem;
        parentNode.focus();
        await el.updateComplete;

        // Act
        await sendKeys({ press: 'Home' });

        // Assert
        expect(el).to.have.attribute('tabindex', '-1');
        expect(el.children[0]).to.have.attribute('tabindex', '0');
        expect(el.children[3]).to.have.attribute('tabindex', '-1');
      });
    });

    describe('when End is pressed', () => {
      it('should move the focus to the last tree item in the tree', async () => {
        // Arrange
        const parentNode = el.children[0] as SlTreeItem;
        parentNode.focus();
        await el.updateComplete;

        // Act
        await sendKeys({ press: 'End' });

        // Assert
        expect(el).to.have.attribute('tabindex', '-1');
        expect(el.children[0]).to.have.attribute('tabindex', '-1');
        expect(el.children[3]).to.have.attribute('tabindex', '0');
      });
    });

    describe('when Enter is pressed', () => {
      describe('and selection is "single"', () => {
        it('should select only one tree item', async () => {
          // Arrange
          el.selection = 'single';
          const node = el.children[1] as SlTreeItem;
          node.focus();
          await el.updateComplete;

          // Act
          await sendKeys({ press: 'Enter' });
          await sendKeys({ press: 'ArrowRight' });
          await sendKeys({ press: 'Enter' });

          // Assert
          expect(el.selectedItems.length).to.eq(1);
          expect(el.children[2]).to.have.attribute('selected');
          expect(el.children[2]).not.to.have.attribute('expanded');
        });
      });

      describe('and selection is "leaf"', () => {
        it('should select only one tree item', async () => {
          // Arrange
          el.selection = 'leaf';
          const node = el.children[0] as SlTreeItem;
          node.focus();
          await el.updateComplete;

          // Act
          await sendKeys({ press: 'Enter' });
          await sendKeys({ press: 'ArrowRight' });
          await sendKeys({ press: 'Enter' });

          // Assert
          expect(el.selectedItems.length).to.eq(1);
        });

        it('should expand/collapse a parent node', async () => {
          // Arrange
          el.selection = 'leaf';
          const parentNode = el.children[2] as SlTreeItem;
          parentNode.focus();
          await el.updateComplete;

          // Act
          await sendKeys({ press: 'Enter' });

          // Assert
          expect(el).to.have.attribute('tabindex', '-1');
          expect(el.selectedItems.length).to.eq(0);
          expect(parentNode).to.have.attribute('expanded');
        });
      });

      describe('and selection is "multiple"', () => {
        it('should toggle the selection on the tree item', async () => {
          // Arrange
          el.selection = 'multiple';
          const node = el.children[1] as SlTreeItem;
          node.focus();
          await el.updateComplete;

          // Act
          await sendKeys({ press: 'Enter' });
          await sendKeys({ press: 'ArrowRight' });
          await sendKeys({ press: 'Enter' });

          // Assert
          expect(el.selectedItems.length).to.eq(4);
        });
      });
    });

    describe('when Space is pressed', () => {
      describe('and selection is "single"', () => {
        it('should select only one tree item', async () => {
          // Arrange
          el.selection = 'single';
          const node = el.children[1] as SlTreeItem;
          node.focus();
          await el.updateComplete;

          // Act
          await sendKeys({ press: ' ' });
          await sendKeys({ press: 'ArrowRight' });
          await sendKeys({ press: ' ' });

          // Assert
          expect(el.selectedItems.length).to.eq(1);
        });
      });

      describe('and selection is "leaf"', () => {
        it('should select only one tree item', async () => {
          // Arrange
          el.selection = 'leaf';
          const node = el.children[0] as SlTreeItem;
          node.focus();
          await el.updateComplete;

          // Act
          await sendKeys({ press: ' ' });
          await sendKeys({ press: 'ArrowRight' });
          await sendKeys({ press: ' ' });

          // Assert
          expect(el.selectedItems.length).to.eq(1);
        });

        it('should expand/collapse a parent node', async () => {
          // Arrange
          el.selection = 'leaf';
          const parentNode = el.children[2] as SlTreeItem;
          parentNode.focus();
          await el.updateComplete;

          // Act
          await sendKeys({ press: ' ' });

          // Assert
          expect(el).to.have.attribute('tabindex', '-1');
          expect(el.selectedItems.length).to.eq(0);
          expect(parentNode).to.have.attribute('expanded');
        });
      });

      describe('and selection is "multiple"', () => {
        it('should toggle the selection on the tree item', async () => {
          // Arrange
          el.selection = 'multiple';
          const node = el.children[0] as SlTreeItem;
          node.focus();
          await el.updateComplete;

          // Act
          await sendKeys({ press: ' ' });
          await sendKeys({ press: 'ArrowRight' });
          await sendKeys({ press: ' ' });

          // Assert
          expect(el.selectedItems.length).to.eq(2);
        });
      });
    });
  });

  describe('Interactions', () => {
    describe('when the tree is about to receive the focus', () => {
      it('should set the focus to the last focused item', async () => {
        // Arrange
        const node = el.children[1] as SlTreeItem;
        node.focus();
        await el.updateComplete;

        // Act
        triggerBlurFor(node);
        triggerFocusFor(el);

        // Assert
        expect(el).to.have.attribute('tabindex', '-1');
        expect(node).to.have.attribute('tabindex', '0');
      });
    });

    describe('when the user clicks the expand button', () => {
      it('should expand the tree item', async () => {
        // Arrange
        el.selection = 'single';
        await el.updateComplete;

        const node = el.children[2] as SlTreeItem;
        await node.updateComplete;

        const expandButton: HTMLElement = node.shadowRoot!.querySelector('.tree-item__expand-button')!;

        // Act
        expandButton.click();
        await el.updateComplete;

        // Assert
        expect(node).not.to.have.attribute('selected');
        expect(node).to.have.attribute('expanded');
      });
    });

    describe('when the user clicks on a tree item', () => {
      describe('and selection is "single"', () => {
        it('should select only one tree item', async () => {
          // Arrange
          el.selection = 'single';
          const node0 = el.children[0] as SlTreeItem;
          const node1 = el.children[1] as SlTreeItem;

          await el.updateComplete;

          // Act
          node0.click();
          await el.updateComplete;

          node1.click();
          await el.updateComplete;

          // Assert
          expect(el.selectedItems.length).to.eq(1);
        });
      });

      describe('and selection is "leaf"', () => {
        it('should select only one tree item', async () => {
          // Arrange
          el.selection = 'leaf';
          const node0 = el.children[0] as SlTreeItem;
          const node1 = el.children[1] as SlTreeItem;

          await el.updateComplete;

          // Act
          node0.click();
          await el.updateComplete;

          node1.click();
          await el.updateComplete;

          // Assert
          expect(el.selectedItems.length).to.eq(1);
        });

        it('should expand/collapse a parent node', async () => {
          // Arrange
          el.selection = 'leaf';
          const parentNode = el.children[2] as SlTreeItem;

          await el.updateComplete;

          // Act
          parentNode.click();
          await parentNode.updateComplete;

          // Assert
          expect(el.selectedItems.length).to.eq(0);
          expect(parentNode).to.have.attribute('expanded');
        });
      });

      describe('and selection is "multiple"', () => {
        it('should toggle the selection on the tree item', async () => {
          // Arrange
          el.selection = 'multiple';
          const node0 = el.children[0] as SlTreeItem;
          const node1 = el.children[1] as SlTreeItem;

          await el.updateComplete;

          // Act
          node0.click();
          await el.updateComplete;

          node1.click();
          await el.updateComplete;

          // Assert
          expect(el.selectedItems.length).to.eq(2);
        });

        it('should select all the child tree items', async () => {
          // Arrange
          el.selection = 'multiple';
          await el.updateComplete;

          const parentNode = el.children[2] as SlTreeItem;

          // Act
          parentNode.click();
          await el.updateComplete;

          // Assert
          expect(parentNode).to.have.attribute('selected');
          expect(parentNode.indeterminate).to.be.false;
          parentNode.getChildrenItems().forEach(child => {
            expect(child).to.have.attribute('selected');
          });
        });

        it('should set the indeterminate state to tree items if a child is selected', async () => {
          // Arrange
          el.selection = 'multiple';
          await el.updateComplete;

          const parentNode = el.children[2] as SlTreeItem;
          const childNode = parentNode.children[0] as SlTreeItem;

          // Act
          childNode.click();
          await el.updateComplete;

          // Assert
          expect(parentNode).not.to.have.attribute('selected');
          expect(parentNode.indeterminate).to.be.true;
        });
      });
    });
  });

  describe('when an tree item gets selected or deselected', () => {
    it('should emit a `sl-selection-change` event', async () => {
      // Arrange
      el.selection = 'single';
      await el.updateComplete;

      const selectedChangeSpy = sinon.spy();
      el.addEventListener('sl-selection-change', selectedChangeSpy);

      const node = el.children[0] as SlTreeItem;

      // Act
      node.click();
      await el.updateComplete;

      // Assert
      expect(selectedChangeSpy).to.have.been.called;
    });
  });
});
