import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import type SlFormatDate from './format-date';

describe('<sl-format-date>', () => {
  describe('defaults ', () => {
    let clock: sinon.SinonFakeTimers;

    beforeEach(() => {
      // fake timer so `new Date()` can be tested
      clock = sinon.useFakeTimers({
        now: new Date()
      });
    });

    afterEach(() => {
      clock.restore();
    });

    it('default properties', async () => {
      const el = await fixture<SlFormatDate>(html` <sl-format-date></sl-format-date> `);
      expect(el.date).to.deep.equal(new Date());

      expect(el.lang).to.be.undefined;
      expect(el.weekday).to.be.undefined;
      expect(el.era).to.be.undefined;
      expect(el.year).to.be.undefined;
      expect(el.month).to.be.undefined;
      expect(el.day).to.be.undefined;
      expect(el.hour).to.be.undefined;
      expect(el.minute).to.be.undefined;
      expect(el.second).to.be.undefined;
      expect(el.timeZoneName).to.be.undefined;
      expect(el.timeZone).to.be.undefined;
      expect(el.hourFormat).to.equal('auto');
    });
  });

  describe('lang property', () => {
    const results = [
      { lang: 'de', result: `1.1.${new Date().getFullYear()}` },
      { lang: 'de-CH', result: `1.1.${new Date().getFullYear()}` },
      { lang: 'fr', result: `01/01/${new Date().getFullYear()}` },
      { lang: 'es', result: `1/1/${new Date().getFullYear()}` },
      { lang: 'he', result: `1.1.${new Date().getFullYear()}` },
      { lang: 'ja', result: `${new Date().getFullYear()}/1/1` },
      { lang: 'nl', result: `1-1-${new Date().getFullYear()}` },
      { lang: 'pl', result: `1.01.${new Date().getFullYear()}` },
      { lang: 'pt', result: `01/01/${new Date().getFullYear()}` },
      { lang: 'ru', result: `01.01.${new Date().getFullYear()}` }
    ];
    results.forEach(setup => {
      it(`date has correct language format: ${setup.lang}`, async () => {
        const el = await fixture<SlFormatDate>(
          html`
            <sl-format-date .date="${new Date(new Date().getFullYear(), 0, 1)}" lang="${setup.lang}"></sl-format-date>
          `
        );
        expect(el.shadowRoot?.textContent?.trim()).to.equal(setup.result);
      });
    });
  });

  describe('weekday property', () => {
    const weekdays = ['narrow', 'short', 'long'];
    weekdays.forEach((weekdayFormat: 'narrow' | 'short' | 'long') => {
      it(`date has correct weekday format: ${weekdayFormat}`, async () => {
        const el = await fixture<SlFormatDate>(
          html`
            <sl-format-date
              .date="${new Date(new Date().getFullYear(), 0, 1)}"
              weekday="${weekdayFormat}"
            ></sl-format-date>
          `
        );

        const expected = new Intl.DateTimeFormat('en-US', { weekday: weekdayFormat }).format(
          new Date(new Date().getFullYear(), 0, 1)
        );
        expect(el.shadowRoot?.textContent?.trim()).to.equal(expected);
      });
    });
  });

  describe('era property', () => {
    const eras = ['narrow', 'short', 'long'];
    eras.forEach((eraFormat: 'narrow' | 'short' | 'long') => {
      it(`date has correct era format: ${eraFormat}`, async () => {
        const el = await fixture<SlFormatDate>(
          html`
            <sl-format-date .date="${new Date(new Date().getFullYear(), 0, 1)}" era="${eraFormat}"></sl-format-date>
          `
        );

        const expected = new Intl.DateTimeFormat('en-US', { era: eraFormat }).format(
          new Date(new Date().getFullYear(), 0, 1)
        );
        expect(el.shadowRoot?.textContent?.trim()).to.equal(expected);
      });
    });
  });

  describe('year property', () => {
    const yearFormats = ['numeric', '2-digit'];
    yearFormats.forEach((yearFormat: 'numeric' | '2-digit') => {
      it(`date has correct year format: ${yearFormat}`, async () => {
        const el = await fixture<SlFormatDate>(
          html`
            <sl-format-date .date="${new Date(new Date().getFullYear(), 0, 1)}" year="${yearFormat}"></sl-format-date>
          `
        );

        const expected = new Intl.DateTimeFormat('en-US', { year: yearFormat }).format(
          new Date(new Date().getFullYear(), 0, 1)
        );
        expect(el.shadowRoot?.textContent?.trim()).to.equal(expected);
      });
    });
  });

  describe('month property', () => {
    const monthFormats = ['numeric', '2-digit', 'narrow', 'short', 'long'];
    monthFormats.forEach((monthFormat: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long') => {
      it(`date has correct month format: ${monthFormat}`, async () => {
        const el = await fixture<SlFormatDate>(
          html`
            <sl-format-date .date="${new Date(new Date().getFullYear(), 0, 1)}" month="${monthFormat}"></sl-format-date>
          `
        );

        const expected = new Intl.DateTimeFormat('en-US', { month: monthFormat }).format(
          new Date(new Date().getFullYear(), 0, 1)
        );
        expect(el.shadowRoot?.textContent?.trim()).to.equal(expected);
      });
    });
  });

  describe('day property', () => {
    const dayFormats = ['numeric', '2-digit'];
    dayFormats.forEach((dayFormat: 'numeric' | '2-digit') => {
      it(`date has correct day format: ${dayFormat}`, async () => {
        const el = await fixture<SlFormatDate>(
          html`
            <sl-format-date .date="${new Date(new Date().getFullYear(), 0, 1)}" day="${dayFormat}"></sl-format-date>
          `
        );

        const expected = new Intl.DateTimeFormat('en-US', { day: dayFormat }).format(
          new Date(new Date().getFullYear(), 0, 1)
        );
        expect(el.shadowRoot?.textContent?.trim()).to.equal(expected);
      });
    });
  });

  describe('hour property', () => {
    const hourFormats = ['numeric', '2-digit'];
    hourFormats.forEach((hourFormat: 'numeric' | '2-digit') => {
      it(`date has correct hour format: ${hourFormat}`, async () => {
        const el = await fixture<SlFormatDate>(
          html`
            <sl-format-date .date="${new Date(new Date().getFullYear(), 0, 1)}" hour="${hourFormat}"></sl-format-date>
          `
        );

        const expected = new Intl.DateTimeFormat('en-US', { hour: hourFormat }).format(
          new Date(new Date().getFullYear(), 0, 1)
        );
        expect(el.shadowRoot?.textContent?.trim()).to.equal(expected);
      });
    });
  });

  describe('minute property', () => {
    const minuteFormats = ['numeric', '2-digit'];
    minuteFormats.forEach((minuteFormat: 'numeric' | '2-digit') => {
      it(`date has correct minute format: ${minuteFormat}`, async () => {
        const el = await fixture<SlFormatDate>(
          html`
            <sl-format-date
              .date="${new Date(new Date().getFullYear(), 0, 1)}"
              minute="${minuteFormat}"
            ></sl-format-date>
          `
        );

        const expected = new Intl.DateTimeFormat('en-US', { minute: minuteFormat }).format(
          new Date(new Date().getFullYear(), 0, 1)
        );
        expect(el.shadowRoot?.textContent?.trim()).to.equal(expected);
      });
    });
  });

  describe('second property', () => {
    const secondFormats = ['numeric', '2-digit'];
    secondFormats.forEach((secondFormat: 'numeric' | '2-digit') => {
      it(`date has correct second format: ${secondFormat}`, async () => {
        const el = await fixture<SlFormatDate>(
          html`
            <sl-format-date
              .date="${new Date(new Date().getFullYear(), 0, 1)}"
              second="${secondFormat}"
            ></sl-format-date>
          `
        );

        const expected = new Intl.DateTimeFormat('en-US', { second: secondFormat }).format(
          new Date(new Date().getFullYear(), 0, 1)
        );
        expect(el.shadowRoot?.textContent?.trim()).to.equal(expected);
      });
    });
  });

  describe('timeZoneName property', () => {
    const timeZoneNameFormats = ['short', 'long'];
    timeZoneNameFormats.forEach((timeZoneNameFormat: 'short' | 'long') => {
      it(`date has correct timeZoneName format: ${timeZoneNameFormat}`, async () => {
        const el = await fixture<SlFormatDate>(
          html`
            <sl-format-date
              .date="${new Date(new Date().getFullYear(), 0, 1)}"
              time-zone-name="${timeZoneNameFormat}"
            ></sl-format-date>
          `
        );

        const expected = new Intl.DateTimeFormat('en-US', { timeZoneName: timeZoneNameFormat }).format(
          new Date(new Date().getFullYear(), 0, 1)
        );
        expect(el.shadowRoot?.textContent?.trim()).to.equal(expected);
      });
    });
  });

  describe('timeZone property', () => {
    const timeZones = ['America/New_York', 'America/Los_Angeles', 'Europe/Zurich'];
    timeZones.forEach(timeZone => {
      it(`date has correct timeZoneName format: ${timeZone}`, async () => {
        const el = await fixture<SlFormatDate>(
          html`
            <sl-format-date
              .date="${new Date(new Date().getFullYear(), 0, 1)}"
              time-zone="${timeZone}"
            ></sl-format-date>
          `
        );

        const expected = new Intl.DateTimeFormat('en-US', { timeZone: timeZone }).format(
          new Date(new Date().getFullYear(), 0, 1)
        );
        expect(el.shadowRoot?.textContent?.trim()).to.equal(expected);
      });
    });
  });

  describe('hourFormat property', () => {
    const hourFormatValues = ['auto', '12', '24'];
    hourFormatValues.forEach(hourFormatValue => {
      it(`date has correct hourFormat format: ${hourFormatValue}`, async () => {
        const el = await fixture<SlFormatDate>(
          html`
            <sl-format-date
              .date="${new Date(new Date().getFullYear(), 0, 1)}"
              hour-format="${hourFormatValue as 'auto' | '12' | '24'}"
            ></sl-format-date>
          `
        );

        const expected = new Intl.DateTimeFormat('en-US', {
          hour12: hourFormatValue === 'auto' ? undefined : hourFormatValue === '12'
        }).format(new Date(new Date().getFullYear(), 0, 1));
        expect(el.shadowRoot?.textContent?.trim()).to.equal(expected);
      });
    });
  });
});
