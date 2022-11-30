import { expect, fixture, html } from '@open-wc/testing';
import type SlProgressRing from './progress-ring';

describe('<sl-progress-ring>', () => {
  let el: SlProgressRing;

  describe('when provided just a value parameter', () => {
    before(async () => {
      el = await fixture<SlProgressRing>(html`<sl-progress-ring value="25"></sl-progress-ring>`);
    });

    it('should pass accessibility tests', async () => {
      await expect(el).to.be.accessible();
    });
  });

  describe('when provided a title, and value parameter', () => {
    let base: HTMLDivElement;

    before(async () => {
      el = await fixture<SlProgressRing>(
        html`<sl-progress-ring title="Titled Progress Ring" value="25"></sl-progress-ring>`
      );
      base = el.shadowRoot!.querySelector('[part~="base"]')!;
    });

    it('should pass accessibility tests', async () => {
      await expect(el).to.be.accessible();
    });

    it('uses the value parameter on the base, as aria-valuenow', () => {
      expect(base).attribute('aria-valuenow', '25');
    });

    it('translates the value parameter to a percentage, and uses translation on the base, as percentage css variable', () => {
      expect(base).attribute('style', '--percentage: 0.25');
    });
  });

  describe('when provided a ariaLabel, and value parameter', () => {
    before(async () => {
      el = await fixture<SlProgressRing>(
        html`<sl-progress-ring ariaLabel="Labelled Progress Ring" value="25"></sl-progress-ring>`
      );
    });

    it('should pass accessibility tests', async () => {
      await expect(el).to.be.accessible();
    });
  });

  describe('when provided a ariaLabelledBy, and value parameter', () => {
    before(async () => {
      el = await fixture<SlProgressRing>(
        html`
          <label id="labelledby">Progress Ring Label</label>
          <sl-progress-ring ariaLabelledBy="labelledby" value="25"></sl-progress-ring>
        `
      );
    });

    it('should pass accessibility tests', async () => {
      await expect(el).to.be.accessible();
    });
  });
});
