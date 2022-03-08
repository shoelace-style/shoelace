import { expect, fixture, html, elementUpdated } from '@open-wc/testing';
import type SlFormatBytes from './format-bytes';

describe('<sl-format-bytes>', () => {

  describe('defaults ', () => {

    it('default properties', async () => {
      const el = await fixture<SlFormatBytes>(html` <sl-format-bytes></sl-format-bytes> `);

      expect(el.value).to.equal(0);
      expect(el.unit).to.equal('byte');
      expect(el.display).to.equal('short');
      expect(el.lang).to.be.undefined;
    });
  });

  describe('bytes', () => {

    it('bytes : short display', async () => {
      const el = await fixture<SlFormatBytes>(html` <sl-format-bytes></sl-format-bytes> `);

      el.value = 12;
      await elementUpdated(el);
      // webkit keeps the lit comment in textContent
      expect(el.shadowRoot?.textContent?.endsWith('12 byte')).to.be.true;

      el.value = 1200;
      await elementUpdated(el);
      // webkit keeps the lit comment in textContent
      expect(el.shadowRoot?.textContent?.endsWith('1.2 kB')).to.be.true;

      el.value = 1200000;
      await elementUpdated(el);
      // webkit keeps the lit comment in textContent
      expect(el.shadowRoot?.textContent?.endsWith('1.2 MB')).to.be.true;

      el.value = 1200000000;
      await elementUpdated(el);
      // webkit keeps the lit comment in textContent
      expect(el.shadowRoot?.textContent?.endsWith('1.2 GB')).to.be.true;
    });

    it('bytes : long display', async () => {
      const el = await fixture<SlFormatBytes>(html` <sl-format-bytes display="long"></sl-format-bytes> `);

      el.value = 12;
      await elementUpdated(el);
      // webkit keeps the lit comment in textContent
      expect(el.shadowRoot?.textContent?.endsWith('12 bytes')).to.be.true;

      el.value = 1200;
      await elementUpdated(el);
      // webkit keeps the lit comment in textContent
      expect(el.shadowRoot?.textContent?.endsWith('1.2 kilobytes')).to.be.true;

      el.value = 1200000;
      await elementUpdated(el);
      // webkit keeps the lit comment in textContent
      expect(el.shadowRoot?.textContent?.endsWith('1.2 megabytes')).to.be.true;

      el.value = 1200000000;
      await elementUpdated(el);
      // webkit keeps the lit comment in textContent
      expect(el.shadowRoot?.textContent?.endsWith('1.2 gigabytes')).to.be.true;
    });

    it('bytes : narrow display', async () => {
      const el = await fixture<SlFormatBytes>(html` <sl-format-bytes display="narrow"></sl-format-bytes> `);

      el.value = 12;
      await elementUpdated(el);
      // webkit keeps the lit comment in textContent
      expect(el.shadowRoot?.textContent?.endsWith('12B')).to.be.true;

      el.value = 1200;
      await elementUpdated(el);
      // webkit keeps the lit comment in textContent
      expect(el.shadowRoot?.textContent?.endsWith('1.2kB')).to.be.true;

      el.value = 1200000;
      await elementUpdated(el);
      // webkit keeps the lit comment in textContent
      expect(el.shadowRoot?.textContent?.endsWith('1.2MB')).to.be.true;

      el.value = 1200000000;
      await elementUpdated(el);
      // webkit keeps the lit comment in textContent
      expect(el.shadowRoot?.textContent?.endsWith('1.2GB')).to.be.true;
    });
  });

  describe('bits', () => {
    it('bits : short display', async () => {
      const el = await fixture<SlFormatBytes>(html` <sl-format-bytes unit="bit"></sl-format-bytes> `);

      el.value = 12;
      await elementUpdated(el);
      // webkit keeps the lit comment in textContent
      expect(el.shadowRoot?.textContent?.endsWith('12 bit')).to.be.true;

      el.value = 1200;
      await elementUpdated(el);
      // webkit keeps the lit comment in textContent
      expect(el.shadowRoot?.textContent?.endsWith('1.2 kb')).to.be.true;

      el.value = 1200000;
      await elementUpdated(el);
      // webkit keeps the lit comment in textContent
      expect(el.shadowRoot?.textContent?.endsWith('1.2 Mb')).to.be.true;

      el.value = 1200000000;
      await elementUpdated(el);
      // webkit keeps the lit comment in textContent
      expect(el.shadowRoot?.textContent?.endsWith('1.2 Gb')).to.be.true;
    });

    it('bits : long display', async () => {
      const el = await fixture<SlFormatBytes>(html` <sl-format-bytes unit="bit" display="long"></sl-format-bytes> `);

      el.value = 12;
      await elementUpdated(el);
      // webkit keeps the lit comment in textContent
      expect(el.shadowRoot?.textContent?.endsWith('12 bits')).to.be.true;

      el.value = 1200;
      await elementUpdated(el);
      // webkit keeps the lit comment in textContent
      expect(el.shadowRoot?.textContent?.endsWith('1.2 kilobits')).to.be.true;

      el.value = 1200000;
      await elementUpdated(el);
      // webkit keeps the lit comment in textContent
      expect(el.shadowRoot?.textContent?.endsWith('1.2 megabits')).to.be.true;

      el.value = 1200000000;
      await elementUpdated(el);
      // webkit keeps the lit comment in textContent
      expect(el.shadowRoot?.textContent?.endsWith('1.2 gigabits')).to.be.true;
    });

    it('bits : narrow display', async () => {
      const el = await fixture<SlFormatBytes>(html` <sl-format-bytes unit="bit" display="narrow"></sl-format-bytes> `);

      el.value = 12;
      await elementUpdated(el);
      // webkit keeps the lit comment in textContent
      expect(el.shadowRoot?.textContent?.endsWith('12bit')).to.be.true;

      el.value = 1200;
      await elementUpdated(el);
      // webkit keeps the lit comment in textContent
      expect(el.shadowRoot?.textContent?.endsWith('1.2kb')).to.be.true;

      el.value = 1200000;
      await elementUpdated(el);
      // webkit keeps the lit comment in textContent
      expect(el.shadowRoot?.textContent?.endsWith('1.2Mb')).to.be.true;

      el.value = 1200000000;
      await elementUpdated(el);
      // webkit keeps the lit comment in textContent
      expect(el.shadowRoot?.textContent?.endsWith('1.2Gb')).to.be.true;
    });
  });

});
