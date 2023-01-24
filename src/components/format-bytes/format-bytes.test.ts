import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
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
    const results = [
      {
        value: 12,
        short: '12 byte',
        long: '12 bytes',
        narrow: '12B'
      },
      {
        value: 1200,
        short: '1.2 kB',
        long: '1.2 kilobytes',
        narrow: '1.2kB'
      },
      {
        value: 1200000,
        short: '1.2 MB',
        long: '1.2 megabytes',
        narrow: '1.2MB'
      },
      {
        value: 1200000000,
        short: '1.2 GB',
        long: '1.2 gigabytes',
        narrow: '1.2GB'
      }
    ];

    results.forEach(expected => {
      it('bytes : display formats', async () => {
        const el = await fixture<SlFormatBytes>(html` <sl-format-bytes></sl-format-bytes> `);
        // short
        el.value = expected.value;
        await elementUpdated(el);
        expect(el.shadowRoot?.textContent).to.equal(expected.short);

        // long
        el.display = 'long';
        el.value = expected.value;
        await elementUpdated(el);
        expect(el.shadowRoot?.textContent).to.equal(expected.long);

        // narrow
        el.display = 'narrow';
        el.value = expected.value;
        await elementUpdated(el);
        expect(el.shadowRoot?.textContent).to.equal(expected.narrow);
      });
    });
  });

  describe('bits', () => {
    const results = [
      {
        value: 12,
        short: '12 bit',
        long: '12 bits',
        narrow: '12bit'
      },
      {
        value: 1200,
        short: '1.2 kb',
        long: '1.2 kilobits',
        narrow: '1.2kb'
      },
      {
        value: 1200000,
        short: '1.2 Mb',
        long: '1.2 megabits',
        narrow: '1.2Mb'
      },
      {
        value: 1200000000,
        short: '1.2 Gb',
        long: '1.2 gigabits',
        narrow: '1.2Gb'
      }
    ];

    results.forEach(expected => {
      it('bits : display formats', async () => {
        const el = await fixture<SlFormatBytes>(html` <sl-format-bytes unit="bit"></sl-format-bytes> `);
        // short
        el.value = expected.value;
        await elementUpdated(el);
        expect(el.shadowRoot?.textContent).to.equal(expected.short);

        // long
        el.display = 'long';
        el.value = expected.value;
        await elementUpdated(el);
        expect(el.shadowRoot?.textContent).to.equal(expected.long);

        // narrow
        el.display = 'narrow';
        el.value = expected.value;
        await elementUpdated(el);
        expect(el.shadowRoot?.textContent).to.equal(expected.narrow);
      });
    });
  });
});
