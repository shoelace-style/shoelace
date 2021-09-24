import { expect, fixture, html } from '@open-wc/testing';

import '../../../dist/shoelace.js';
import type SlAvatar from './avatar';

describe('<sl-avatar>', () => {
  let el: SlAvatar;

  describe('when provided no parameters', async () => {
    before(async () => {
      el = await fixture<SlAvatar>(html` <sl-avatar></sl-avatar> `);
    });

    it('passes accessibility test', async () => {
      await expect(el).to.be.accessible();
    });

    it('should default to circle styling', async () => {
      const part = el.shadowRoot?.querySelector('[part="base"]') as HTMLElement;
      expect(el.getAttribute('shape')).to.eq('circle');
      expect(part.classList.value.trim()).to.eq('avatar avatar--circle');
    });
  });

  describe('when provided an image and alt parameter', async () => {
    const image =
      'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80';
    const alt = 'Gray tabby kitten looking down';
    before(async () => {
      el = await fixture<SlAvatar>(html`<sl-avatar image="${image}" alt="${alt}"></sl-avatar>`);
    });

    it('passes accessibility test', async () => {
      /**
       * The image element itself is ancillary, because it's parent container contains the
       * aria-label which dictates what "sl-avatar" is. This also implies that alt text will
       * resolve to "" when not provided and ignored by readers. This is why we use alt="" on
       * the image element to pass accessibility.
       * https://html.spec.whatwg.org/multipage/images.html#ancillary-images
       */
      await expect(el).to.be.accessible();
    });

    it('renders "image" part, with src and a role of presentation', async () => {
      const part = el.shadowRoot?.querySelector('[part="image"]') as HTMLImageElement;

      expect(part.getAttribute('src')).to.eq(image);
    });

    it('renders the alt attribute in the "base" part', async () => {
      const part = el.shadowRoot?.querySelector('[part="base"]') as HTMLElement;

      expect(part.getAttribute('aria-label')).to.eq(alt);
    });

    describe('when an error occurs when attempting to load the image', async () => {
      before(async () => {
        el = await fixture<SlAvatar>(
          html`<sl-avatar image="data:text/plain;not-an-image-url" alt="${alt}"></sl-avatar>`
        );
      });

      it('does not render the "image" part', async () => {
        const part = el.shadowRoot?.querySelector('[part="image"]') as HTMLImageElement;

        expect(part).not.to.exist;
      });
    });
  });

  describe('when provided initials parameter', async () => {
    const initials = 'SL';
    before(async () => {
      el = await fixture<SlAvatar>(html`<sl-avatar initials="${initials}"></sl-avatar>`);
    });

    it('passes accessibility test', async () => {
      await expect(el).to.be.accessible();
    });

    it('renders "initials" part, with initials as the text node', async () => {
      const part = el.shadowRoot?.querySelector('[part="initials"]') as HTMLImageElement;

      expect(part.innerText).to.eq(initials);
    });
  });

  ['square', 'rounded', 'circle'].forEach(shape => {
    describe(`when passed a shape attribute ${shape}`, () => {
      before(async () => {
        el = await fixture<SlAvatar>(html`<sl-avatar shape="${shape}"></sl-avatar>`);
      });

      it('passes accessibility test', async () => {
        await expect(el).to.be.accessible();
      });

      it('appends the appropriate class on the "base" part', async () => {
        const part = el.shadowRoot?.querySelector('[part="base"]') as HTMLElement;

        expect(el.getAttribute('shape')).to.eq(shape);
        expect(part.classList.value.trim()).to.eq(`avatar avatar--${shape}`);
      });
    });
  });

  describe('when passed a <span>, on slot "icon"', async () => {
    before(async () => {
      el = await fixture<SlAvatar>(html`<sl-avatar><span slot="icon">random content</span></sl-avatar>`);
    });

    it('passes accessibility test', async () => {
      await expect(el).to.be.accessible();
    });

    it('should accept as an assigned child in the shadow root', async () => {
      const slot = <HTMLSlotElement>el.shadowRoot.querySelector('slot[name=icon]');
      const childNodes = slot.assignedNodes({ flatten: true });

      expect(childNodes.length).to.eq(1);

      const span = <HTMLElement>childNodes[0];
      expect(span.innerHTML).to.eq('random content');
    });
  });
});
