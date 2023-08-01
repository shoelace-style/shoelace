import '../../../dist/shoelace.js';
import { aTimeout, expect, fixture, html } from '@open-wc/testing';
import type SlClipboard from './clipboard.js';

describe('<sl-clipboard>', () => {
  let el: SlClipboard;

  describe('when provided no parameters', () => {
    before(async () => {
      el = await fixture<SlClipboard>(html`<sl-clipboard value="something"></sl-clipboard> `);
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
