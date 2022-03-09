import { expect, fixture, html } from '@open-wc/testing';
import type SlFormatNumber from './format-number';

describe('<sl-format-number>', () => {

  describe('defaults ', () => {
    it('default properties', async () => {
      const el = await fixture<SlFormatNumber>(html` <sl-format-number></sl-format-number> `);
      expect(el.value).to.equal(0);

      expect(el.lang).to.be.undefined;
      expect(el.type).to.equal('decimal');
      expect(el.noGrouping).to.be.false;
      expect(el.currency).to.equal('USD');
      expect(el.currencyDisplay).to.equal('symbol');
      expect(el.minimumIntegerDigits).to.be.undefined;
      expect(el.minimumFractionDigits).to.be.undefined;
      expect(el.maximumFractionDigits).to.be.undefined;
      expect(el.minimumSignificantDigits).to.be.undefined;
      expect(el.maximumSignificantDigits).to.be.undefined;

    });
  });

  describe('lang property', () => {

    [ 'de', 'de-CH', 'fr', 'es', 'he', 'ja', 'nl', 'pl', 'pt', 'ru' ].forEach((lang) => {
      it(`number has correct language format: ${lang}`, async () => {
        const el = await fixture<SlFormatNumber>(html` <sl-format-number value="1000" lang="${lang}"></sl-format-date> `);
        const expected = new Intl.NumberFormat(lang).format(1000);
        expect(el.shadowRoot?.textContent).to.equal(expected);
      });
    });
  });

  // describe('weekday property', () => {
  //   const weekdays = [ 'narrow', 'short', 'long'];
  //   weekdays.forEach((weekdayFormat: 'narrow' | 'short' | 'long') => {
  //     it(`date has correct weekday format: ${weekdayFormat}`, async () => {
  //       const el = await fixture<SlFormatDate>(html` <sl-format-date date="${new Date(new Date().getFullYear(), 0, 1)}" weekday="${weekdayFormat}"></sl-format-date> `);

  //       const expected = new Intl.DateTimeFormat('en-US', { weekday: weekdayFormat}).format(new Date(new Date().getFullYear(), 0, 1))
  //       expect(el.shadowRoot?.textContent).to.equal(expected);
  //     });
  //   });
  // });

  // describe('era property', () => {
  //   const eras = [ 'narrow', 'short', 'long'];
  //   eras.forEach((eraFormat: 'narrow' | 'short' | 'long') => {
  //     it(`date has correct era format: ${eraFormat}`, async () => {
  //       const el = await fixture<SlFormatDate>(html` <sl-format-date date="${new Date(new Date().getFullYear(), 0, 1)}" era="${eraFormat}"></sl-format-date> `);

  //       const expected = new Intl.DateTimeFormat('en-US', { era: eraFormat}).format(new Date(new Date().getFullYear(), 0, 1))
  //       expect(el.shadowRoot?.textContent).to.equal(expected);
  //     });
  //   });
  // });

  // describe('year property', () => {
  //   const yearFormats = [ 'numeric', '2-digit'];
  //   yearFormats.forEach((yearFormat: 'numeric' | '2-digit') => {
  //     it(`date has correct year format: ${yearFormats}`, async () => {
  //       const el = await fixture<SlFormatDate>(html` <sl-format-date date="${new Date(new Date().getFullYear(), 0, 1)}" year="${yearFormat}"></sl-format-date> `);

  //       const expected = new Intl.DateTimeFormat('en-US', { year: yearFormat}).format(new Date(new Date().getFullYear(), 0, 1))
  //       expect(el.shadowRoot?.textContent).to.equal(expected);
  //     });
  //   });
  // });

  // describe('month property', () => {
  //   const monthFormats = [ 'numeric', '2-digit', 'narrow', 'short', 'long'];
  //   monthFormats.forEach((monthFormat: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long') => {
  //     it(`date has correct month format: ${monthFormats}`, async () => {
  //       const el = await fixture<SlFormatDate>(html` <sl-format-date date="${new Date(new Date().getFullYear(), 0, 1)}" month="${monthFormat}"></sl-format-date> `);

  //       const expected = new Intl.DateTimeFormat('en-US', { month: monthFormat}).format(new Date(new Date().getFullYear(), 0, 1))
  //       expect(el.shadowRoot?.textContent).to.equal(expected);
  //     });
  //   });
  // });

  // describe('day property', () => {
  //   const dayFormats = [ 'numeric', '2-digit'];
  //   dayFormats.forEach((dayFormat: 'numeric' | '2-digit') => {
  //     it(`date has correct day format: ${dayFormats}`, async () => {
  //       const el = await fixture<SlFormatDate>(html` <sl-format-date date="${new Date(new Date().getFullYear(), 0, 1)}" day="${dayFormat}"></sl-format-date> `);

  //       const expected = new Intl.DateTimeFormat('en-US', { day: dayFormat}).format(new Date(new Date().getFullYear(), 0, 1))
  //       expect(el.shadowRoot?.textContent).to.equal(expected);
  //     });
  //   });
  // });

  // describe('hour property', () => {
  //   const hourFormats = [ 'numeric', '2-digit'];
  //   hourFormats.forEach((hourFormat: 'numeric' | '2-digit') => {
  //     it(`date has correct hour format: ${hourFormats}`, async () => {
  //       const el = await fixture<SlFormatDate>(html` <sl-format-date date="${new Date(new Date().getFullYear(), 0, 1)}" hour="${hourFormat}"></sl-format-date> `);

  //       const expected = new Intl.DateTimeFormat('en-US', { hour: hourFormat}).format(new Date(new Date().getFullYear(), 0, 1))
  //       expect(el.shadowRoot?.textContent).to.equal(expected);
  //     });
  //   });
  // });

  // describe('minute property', () => {
  //   const minuteFormats = [ 'numeric', '2-digit'];
  //   minuteFormats.forEach((minuteFormat: 'numeric' | '2-digit') => {
  //     it(`date has correct minute format: ${minuteFormats}`, async () => {
  //       const el = await fixture<SlFormatDate>(html` <sl-format-date date="${new Date(new Date().getFullYear(), 0, 1)}" minute="${minuteFormat}"></sl-format-date> `);

  //       const expected = new Intl.DateTimeFormat('en-US', { minute: minuteFormat}).format(new Date(new Date().getFullYear(), 0, 1))
  //       expect(el.shadowRoot?.textContent).to.equal(expected);
  //     });
  //   });
  // });

  // describe('second property', () => {
  //   const secondFormats = [ 'numeric', '2-digit'];
  //   secondFormats.forEach((secondFormat: 'numeric' | '2-digit') => {
  //     it(`date has correct second format: ${secondFormats}`, async () => {
  //       const el = await fixture<SlFormatDate>(html` <sl-format-date date="${new Date(new Date().getFullYear(), 0, 1)}" second="${secondFormat}"></sl-format-date> `);

  //       const expected = new Intl.DateTimeFormat('en-US', { second: secondFormat}).format(new Date(new Date().getFullYear(), 0, 1))
  //       expect(el.shadowRoot?.textContent).to.equal(expected);
  //     });
  //   });
  // });

  // describe('timeZoneName property', () => {
  //   const timeZoneNameFormats = [ 'short', 'long'];
  //   timeZoneNameFormats.forEach((timeZoneNameFormat: 'short' | 'long') => {
  //     it(`date has correct timeZoneName format: ${timeZoneNameFormats}`, async () => {
  //       const el = await fixture<SlFormatDate>(html` <sl-format-date date="${new Date(new Date().getFullYear(), 0, 1)}" time-zone-name="${timeZoneNameFormat}"></sl-format-date> `);

  //       const expected = new Intl.DateTimeFormat('en-US', { timeZoneName: timeZoneNameFormat}).format(new Date(new Date().getFullYear(), 0, 1))
  //       expect(el.shadowRoot?.textContent).to.equal(expected);
  //     });
  //   });
  // });

  // describe('timeZone property', () => {
  //   const timeZones = [ 'America/New_York', 'America/Los_Angeles', 'Europe/Zurich'];
  //   timeZones.forEach((timeZone) => {
  //     it(`date has correct timeZoneName format: ${timeZone}`, async () => {
  //       const el = await fixture<SlFormatDate>(html` <sl-format-date date="${new Date(new Date().getFullYear(), 0, 1)}" time-zone="${timeZone}"></sl-format-date> `);

  //       const expected = new Intl.DateTimeFormat('en-US', { timeZone: timeZone}).format(new Date(new Date().getFullYear(), 0, 1))
  //       expect(el.shadowRoot?.textContent).to.equal(expected);
  //     });
  //   });
  // });

  // describe('hourFormat property', () => {
  //   const hourFormatValues = [ 'auto', '12', '24'];
  //   hourFormatValues.forEach((hourFormatValue) => {
  //     it(`date has correct hourFormat format: ${hourFormatValue}`, async () => {
  //       const el = await fixture<SlFormatDate>(html` <sl-format-date date="${new Date(new Date().getFullYear(), 0, 1)}" hour-format="${hourFormatValue}"></sl-format-date> `);

  //       const expected = new Intl.DateTimeFormat('en-US', { hour12: hourFormatValue === 'auto' ? undefined : hourFormatValue === '12'}).format(new Date(new Date().getFullYear(), 0, 1))
  //       expect(el.shadowRoot?.textContent).to.equal(expected);
  //     });
  //   });
  // });
});
