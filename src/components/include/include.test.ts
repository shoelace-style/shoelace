import { expect, fixture, html, waitUntil } from '@open-wc/testing';
import sinon from 'sinon';

import '../../../dist/shoelace.js';
import type SlInclude from './include';

const stubbedFetchResponse: Response = {
  headers: new Headers(),
  ok: true,
  redirected: false,
  status: 200,
  statusText: 'OK',
  type: 'default',
  url: '',
  json: () => Promise.resolve({}),
  text: () => Promise.resolve(''),
  blob: sinon.fake(),
  arrayBuffer: sinon.fake(),
  formData: sinon.fake(),
  bodyUsed: false,
  body: null,
  clone: sinon.fake()
};

describe('<sl-include>', () => {
  afterEach(() => {
    sinon.verifyAndRestore();
  });

  it('should load content and emit sl-load', async () => {
    sinon.stub(window, 'fetch').resolves({
      ...stubbedFetchResponse,
      ok: true,
      status: 200,
      text: () => Promise.resolve('"id": 1')
    });
    const el = await fixture<SlInclude>(html` <sl-include src="/found"></sl-include> `);
    const loadHandler = sinon.spy();

    el.addEventListener('sl-load', loadHandler);
    await waitUntil(() => loadHandler.calledOnce);

    expect(el.innerHTML).to.contain('"id": 1');
    expect(loadHandler).to.have.been.calledOnce;
  });

  it('should emit sl-error when content cannot be loaded', async () => {
    sinon.stub(window, 'fetch').resolves({
      ...stubbedFetchResponse,
      ok: false,
      status: 404,
      text: () => Promise.resolve('{}')
    });
    const el = await fixture<SlInclude>(html` <sl-include src="/not-found"></sl-include> `);
    const loadHandler = sinon.spy();

    el.addEventListener('sl-error', loadHandler);
    await waitUntil(() => loadHandler.calledOnce);

    expect(loadHandler).to.have.been.calledOnce;
  });
});
