import { elementUpdated, expect, fixture, html, waitUntil } from '@open-wc/testing';
import sinon from 'sinon';
import { DropEffect } from './library';
import type SLDropHandler from './drop-handler';

describe('<sl-drop-handler>', () => {
  it('should render content', async () => {
    const el = await fixture<SLDropHandler>(html`<sl-drop-handler><div class="area">Area</div></sl-drop-handler> `);
    const content = el.querySelector<HTMLElement>('.area')!;
    const slot = el.shadowRoot!.querySelector('slot')!;

    expect(content).to.not.equal(undefined);
    expect(slot).to.not.equal(undefined);
  });

  it('should handle dropEffect', async () => {
    const el = await fixture<SLDropHandler>(html` <sl-drop-handler></sl-drop-handler> `);

    await elementUpdated(el);

    expect(el.dropEffect).to.equal(DropEffect.COPY);

    el['currentDropEffect'] = DropEffect.MOVE;

    await elementUpdated(el);

    expect(el.dropEffect).to.equal(DropEffect.MOVE);
  });

  it('should emit `sl-drag-over` when drag event `dragover` is dispatched', async () => {
    const dragOverHandler = sinon.spy();
    const el = await fixture<SLDropHandler>(html` <sl-drop-handler></sl-drop-handler> `);

    el.addEventListener('sl-drag-over', dragOverHandler);

    const dataTransfer = new DataTransfer();
    const dragOverEvent = new DragEvent('dragover', {
      dataTransfer
    });

    el.dispatchEvent(dragOverEvent);

    await waitUntil(() => dragOverHandler.calledOnce);

    expect(dragOverHandler).to.have.been.calledOnce;
  });

  it('should not emit `sl-drag-over` when drag event `dragover` is dispatched without DataTransfer object', async () => {
    const dragOverHandler = sinon.spy();
    const el = await fixture<SLDropHandler>(html` <sl-drop-handler></sl-drop-handler> `);

    el.addEventListener('sl-drag-over', dragOverHandler);

    const dragOverEvent = new DragEvent('dragover');

    el.dispatchEvent(dragOverEvent);

    await waitUntil(() => dragOverHandler.notCalled);

    expect(dragOverHandler).to.not.have.been.calledOnce;
  });

  it('should set `isDragged` to true when drag event `dragover` is dispatched', async () => {
    const el = await fixture<SLDropHandler>(html` <sl-drop-handler></sl-drop-handler> `);
    expect(el.isDragged).to.be.false;

    const dataTransfer = new DataTransfer();
    const dragOverEvent = new DragEvent('dragover', {
      dataTransfer
    });

    el.dispatchEvent(dragOverEvent);
    expect(el.isDragged).to.be.true;
  });

  it('should not set `isDragged` to true when drag event `dragover` is dispatched without DataTransfer object', async () => {
    const el = await fixture<SLDropHandler>(html` <sl-drop-handler></sl-drop-handler> `);
    expect(el.isDragged).to.be.false;

    el.dispatchEvent(new DragEvent('dragover'));

    expect(el.isDragged).to.be.false;
  });

  it('should emit debounced `sl-drag-leave` when drag event `dragleave` is dispatched twice', async () => {
    const dragLeaveHandler = sinon.spy();
    const el = await fixture<SLDropHandler>(html` <sl-drop-handler></sl-drop-handler> `);

    el.addEventListener('sl-drag-leave', dragLeaveHandler);
    el.dispatchEvent(new DragEvent('dragleave'));
    el.dispatchEvent(new DragEvent('dragleave'));

    await waitUntil(() => dragLeaveHandler.calledOnce);

    expect(dragLeaveHandler).to.have.been.calledOnce;
  });

  it('should emit `sl-drop` when drag event `drop` is dispatched', async () => {
    const dropHandler = sinon.spy();
    const el = await fixture<SLDropHandler>(html` <sl-drop-handler></sl-drop-handler> `);

    el.addEventListener('sl-drop', dropHandler);
    el.dispatchEvent(new DragEvent('drop'));

    await waitUntil(() => dropHandler.calledOnce);

    expect(dropHandler).to.have.been.calledOnce;
  });
});
