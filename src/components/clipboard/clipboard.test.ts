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

    it('should initially not be in copy state', () => {
      expect(el.copy).to.false;
    });

    it('should reset copy state after 2 seconds', async () => {
      expect(el.copy).to.be.false;
      el.copy = true;
      await aTimeout(1000);
      expect(el.copy).to.be.true;
      await aTimeout(1100);
      expect(el.copy).to.be.false;
    });
  });
});
