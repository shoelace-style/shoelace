import '../../../dist/shoelace.js';
import { clickOnElement } from '../../internal/test.js';
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import type SlAnimatedImage from './animated-image.js';

describe('<sl-animated-image>', () => {
  it('should render a component', async () => {
    const animatedImage = await fixture(html` <sl-animated-image></sl-animated-image> `);

    expect(animatedImage).to.exist;
  });

  it('should render be accessible', async () => {
    const animatedImage = await fixture(html` <sl-animated-image></sl-animated-image> `);

    await expect(animatedImage).to.be.accessible();
  });

  const files = ['docs/assets/images/walk.gif', 'docs/assets/images/tie.webp'];

  files.forEach((file: string) => {
    it(`should load a ${file} without errors`, async () => {
      const animatedImage = await fixture<SlAnimatedImage>(html` <sl-animated-image></sl-animated-image> `);
      let errorCount = 0;
      oneEvent(animatedImage, 'sl-error').then(() => errorCount++);
      await loadImage(animatedImage, file);

      expect(errorCount).to.be.equal(0);
    });

    it(`should play ${file} on click`, async () => {
      const animatedImage = await fixture<SlAnimatedImage>(html` <sl-animated-image></sl-animated-image> `);
      await loadImage(animatedImage, file);

      expect(animatedImage.play).not.to.be.true;

      await clickOnElement(animatedImage);

      expect(animatedImage.play).to.be.true;
    });

    it(`should pause and resume ${file} on click`, async () => {
      const animatedImage = await fixture<SlAnimatedImage>(html` <sl-animated-image></sl-animated-image> `);
      await loadImage(animatedImage, file);

      animatedImage.play = true;

      await clickOnElement(animatedImage);

      expect(animatedImage.play).to.be.false;

      await clickOnElement(animatedImage);

      expect(animatedImage.play).to.be.true;
    });
  });

  it('should emit an error event on invalid url', async () => {
    const animatedImage = await fixture<SlAnimatedImage>(html` <sl-animated-image></sl-animated-image> `);

    const errorPromise = oneEvent(animatedImage, 'sl-error');
    animatedImage.src = 'completelyWrong';

    await errorPromise;
  });
});
async function loadImage(animatedImage: SlAnimatedImage, file: string) {
  const loadingPromise = oneEvent(animatedImage, 'sl-load');
  animatedImage.src = file;
  await loadingPromise;
}
