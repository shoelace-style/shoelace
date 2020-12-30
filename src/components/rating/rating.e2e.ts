import { newE2EPage } from '@stencil/core/testing';

describe('<sl-rating>', () => {
  it('should emit sl-change when value changes with click', async () => {
    const page = await newE2EPage({
      html: `
        <sl-rating></sl-rating>>
      `
    });
    const rating = await page.find('sl-rating');
    const slChange = await rating.spyOnEvent('sl-change');

    await rating.click();

    expect(slChange).toHaveReceivedEventTimes(1);
  });

  it('should sync value when clicked', async () => {
    const page = await newE2EPage({
      html: `
        <sl-rating></sl-rating>>
      `
    });
    const rating = await page.find('sl-rating');

    await rating.click(); // click in center = 3

    expect(await rating.getProperty('value')).toBe(3);
  });

  it('should reset value when the current rating is clicked', async () => {
    const page = await newE2EPage({
      html: `
        <sl-rating value="3"></sl-rating>>
      `
    });
    const rating = await page.find('sl-rating');

    await rating.click();

    expect(await rating.getProperty('value')).toBe(0);
  });
});
