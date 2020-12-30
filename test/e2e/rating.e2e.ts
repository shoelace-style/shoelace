import { newE2EPage } from '@stencil/core/testing';

const testContent = `
<sl-rating></sl-rating>>
<button>Other Element</button>
`;

const testContentValue3 = `
<sl-rating value="3"></sl-rating>>
<button>Other Element</button>
`;

describe('rating', () => {
  it('should emit slChange when value changes with click', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const rating = await page.find('sl-rating');

    const slChange = await rating.spyOnEvent('slChange');

    // click in center of rating
    await rating.click();

    expect(slChange).toHaveReceivedEventTimes(1);
  });

  it('should change value when changed with click', async () => {
    const page = await newE2EPage();
    await page.setContent(testContent);

    const rating = await page.find('sl-rating');

    // click in center of rating (3)
    await rating.click();

    expect(await rating.getProperty('value')).toBe(3);
  });

  it('should reset value when active rating clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(testContentValue3);

    const rating = await page.find('sl-rating');

    // click in center of rating (3)
    await rating.click();

    expect(await rating.getProperty('value')).toBe(0);
  });
});
