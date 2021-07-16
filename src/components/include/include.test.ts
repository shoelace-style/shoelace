import { expect, fixture, html, waitUntil } from '@open-wc/testing';
import sinon from 'sinon';

import '../../../dist/shoelace.js';
import type SlInclude from './include';

describe('<sl-include>', () => {
  it('should load content and emit sl-load', async () => {
    const el = await fixture(html` <sl-include src="https://jsonplaceholder.typicode.com/posts/1"></sl-include> `);
    const loadHandler = sinon.spy();

    el.addEventListener('sl-load', loadHandler);
    await waitUntil(() => loadHandler.calledOnce);

    expect(el.innerHTML).to.contain('"id": 1');
    expect(loadHandler).to.have.been.calledOnce;
  });

  it('should emit sl-error when content cannot be loaded', async () => {
    const el = await fixture(html` <sl-include src="https://404"></sl-include> `);
    const loadHandler = sinon.spy();

    el.addEventListener('sl-error', loadHandler);
    await waitUntil(() => loadHandler.calledOnce);

    expect(loadHandler).to.have.been.calledOnce;
  });
});
