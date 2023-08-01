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
      expect(el.copy).to.be.false;
      await el.copy();
      expect(el.copyStatus).to.equal('copied');
      await aTimeout(2100);
      expect(el.copyStatus).to.equal('trigger');
    });
  });
});
