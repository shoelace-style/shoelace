import '../../../dist/shoelace.js';
import { expect, fixture, html } from '@open-wc/testing';
import type SlCopyButton from './copy-button.js';

// We use aria-live to announce labels via tooltips
const ignoredRules = ['button-name'];

describe('<sl-copy-button>', () => {
  let el: SlCopyButton;

  describe('when provided no parameters', () => {
    before(async () => {
      el = await fixture(html`<sl-copy-button value="something"></sl-copy-button> `);
    });

    it('should pass accessibility tests', async () => {
      await expect(el).to.be.accessible({ ignoredRules });
    });
  });
});
