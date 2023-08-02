import '../../../dist/shoelace.js';
import { aTimeout, expect, fixture, html } from '@open-wc/testing';
import type SlCopy from './copy.js';

describe('<sl-copy>', () => {
  let el: SlCopy;

  describe('when provided no parameters', () => {
    before(async () => {
      el = await fixture<SlCopy>(html`<sl-copy value="something"></sl-copy> `);
    });

    it('should pass accessibility tests', async () => {
      await expect(el).to.be.accessible();
    });

    it('should initially be in the trigger status', () => {
      expect(el.copyStatus).to.equal('trigger');
    });

    it('should reset copyStatus after 2 seconds', async () => {
      expect(el.copyStatus).to.equal('trigger');
      await el.copy(); // this will result in an error as copy needs to always be called from a user action
      expect(el.copyStatus).to.equal('error');
      await aTimeout(2100);
      expect(el.copyStatus).to.equal('trigger');
    });
  });
});
