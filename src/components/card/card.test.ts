import { expect, fixture, html } from '@open-wc/testing';

import '../../../dist/shoelace.js';
import type SlCard from './card';

describe('<sl-card>', () => {
  let el: SlCard;

  describe('when provided no parameters', async () => {
    before(async () => {
      el = await fixture<SlCard>(
        html` <sl-card>This is just a basic card. No image, no header, and no footer. Just your content.</sl-card> `
      );
    });

    it('should render a component that passes accessibility test.', async () => {
      await expect(el).to.be.accessible();
    });

    it('should render the child content provided.', async () => {
      expect(el.innerText).to.eq('This is just a basic card. No image, no header, and no footer. Just your content.');
    });

    it('should contain the class card.', async () => {
      const card = el.shadowRoot.querySelector('.card') as HTMLElement;
      expect(card.classList.value.trim()).to.eq('card');
    });
  });

  describe('when provided an element in the slot "header" to render a header', async () => {
    before(async () => {
      el = await fixture<SlCard>(
        html`<sl-card>
          <div slot="header">Header Title</div>
          This card has a header. You can put all sorts of things in it!
        </sl-card>`
      );
    });

    it('should render a component that passes accessibility test.', async () => {
      await expect(el).to.be.accessible();
    });

    it('should render the child content provided.', async () => {
      expect(el.innerText).to.contain('This card has a header. You can put all sorts of things in it!');
    });

    it('render the header content provided.', async () => {
      const header = <HTMLDivElement>el.querySelector('div[slot=header]');
      expect(header.innerText).eq('Header Title');
    });

    it('accept "header" as an assigned child in the shadow root.', async () => {
      const slot = <HTMLSlotElement>el.shadowRoot.querySelector('slot[name=header]');
      const childNodes = slot.assignedNodes({ flatten: true });

      expect(childNodes.length).to.eq(1);
    });

    it('should contain the class card--has-header.', async () => {
      const card = el.shadowRoot.querySelector('.card') as HTMLElement;
      expect(card.classList.value.trim()).to.eq('card card--has-header');
    });
  });

  describe('when provided an element in the slot "footer" to render a footer', async () => {
    before(async () => {
      el = await fixture<SlCard>(
        html`<sl-card>
          This card has a footer. You can put all sorts of things in it!

          <div slot="footer">Footer Content</div>
        </sl-card>`
      );
    });

    it('should render a component that passes accessibility test.', async () => {
      await expect(el).to.be.accessible();
    });

    it('should render the child content provided.', async () => {
      expect(el.innerText).to.contain('This card has a footer. You can put all sorts of things in it!');
    });

    it('render the footer content provided.', async () => {
      const footer = <HTMLDivElement>el.querySelector('div[slot=footer]');
      expect(footer.innerText).eq('Footer Content');
    });

    it('accept "footer" as an assigned child in the shadow root.', async () => {
      const slot = <HTMLSlotElement>el.shadowRoot.querySelector('slot[name=footer]');
      const childNodes = slot.assignedNodes({ flatten: true });

      expect(childNodes.length).to.eq(1);
    });

    it('should contain the class card--has-footer.', async () => {
      const card = el.shadowRoot.querySelector('.card') as HTMLElement;
      expect(card.classList.value.trim()).to.eq('card card--has-footer');
    });
  });

  describe('when provided an element in the slot "image" to render a image', async () => {
    before(async () => {
      el = await fixture<SlCard>(
        html`<sl-card>
          <img
            slot="image"
            src="https://images.unsplash.com/photo-1547191783-94d5f8f6d8b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80"
            alt="A kitten walks towards camera on top of pallet."
          />
          This is a kitten, but not just any kitten. This kitten likes walking along pallets.
        </sl-card>`
      );
    });

    it('should render a component that passes accessibility test.', async () => {
      await expect(el).to.be.accessible();
    });

    it('should render the child content provided.', async () => {
      expect(el.innerText).to.contain(
        'This is a kitten, but not just any kitten. This kitten likes walking along pallets.'
      );
    });

    it('accept "image" as an assigned child in the shadow root.', async () => {
      const slot = <HTMLSlotElement>el.shadowRoot.querySelector('slot[name=image]');
      const childNodes = slot.assignedNodes({ flatten: true });

      expect(childNodes.length).to.eq(1);
    });

    it('should contain the class card--has-image.', async () => {
      const card = el.shadowRoot.querySelector('.card') as HTMLElement;
      expect(card.classList.value.trim()).to.eq('card card--has-image');
    });
  });
});
