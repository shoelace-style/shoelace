import { expect, fixture, html } from '@open-wc/testing';

import '../../../dist/shoelace.js';
import type SlBreadcrumbItem from './breadcrumb-item';

describe('<sl-breadcrumb-item>', () => {
  let el: SlBreadcrumbItem;

  describe('when not provided a href attribute', async () => {
    before(async () => {
      el = await fixture<SlBreadcrumbItem>(html` <sl-breadcrumb-item>Home</sl-breadcrumb-item> `);
    });

    it('should render a component that passes accessibility test', async () => {
      await expect(el).to.be.accessible();
    });

    it('should hide the seperator from screen readers', async () => {
      const separator: HTMLSpanElement = el.shadowRoot.querySelector('[part="separator"]');
      expect(separator).attribute('aria-hidden', 'true');
    });

    it('should render a HTMLButtonElement as the part "label", with a set type "button"', () => {
      const button: HTMLButtonElement = el.shadowRoot.querySelector('[part="label"]');
      expect(button).to.exist;
      expect(button).attribute('type', 'button');
    });
  });

  describe('when provided a href attribute', async () => {
    describe('and no target', () => {
      before(async () => {
        el = await fixture<SlBreadcrumbItem>(html`
          <sl-breadcrumb-item href="https://jsonplaceholder.typicode.com/">Home</sl-breadcrumb-item>
        `);
      });

      it('should render a component that passes accessibility test', async () => {
        await expect(el).to.be.accessible();
      });

      it('should render a HTMLAnchorElement as the part "label", with the supplied href value', () => {
        const hyperlink: HTMLAnchorElement = el.shadowRoot.querySelector('[part="label"]');
        expect(hyperlink).attribute('href', 'https://jsonplaceholder.typicode.com/');
      });
    });

    describe('and target, without rel', () => {
      before(async () => {
        el = await fixture<SlBreadcrumbItem>(html`
          <sl-breadcrumb-item href="https://jsonplaceholder.typicode.com/" target="_blank">Help</sl-breadcrumb-item>
        `);
      });

      it('should render a component that passes accessibility test', async () => {
        await expect(el).to.be.accessible();
      });

      describe('should render a HTMLAnchorElement as the part "label"', () => {
        let hyperlink: HTMLAnchorElement;

        before(() => {
          hyperlink = el.shadowRoot.querySelector('[part="label"]');
        });

        it('should use the supplied href value, as the href attribute value', () => {
          expect(hyperlink).attribute('href', 'https://jsonplaceholder.typicode.com/');
        });

        it('should default rel attribute to "noreferrer noopener"', () => {
          expect(hyperlink).attribute('rel', 'noreferrer noopener');
        });
      });
    });

    describe('and target, with rel', () => {
      before(async () => {
        el = await fixture<SlBreadcrumbItem>(html`
          <sl-breadcrumb-item href="https://jsonplaceholder.typicode.com/" target="_blank" rel="alternate"
            >Help</sl-breadcrumb-item
          >
        `);
      });

      it('should render a component that passes accessibility test', async () => {
        await expect(el).to.be.accessible();
      });

      describe('should render a HTMLAnchorElement', () => {
        let hyperlink: HTMLAnchorElement;

        before(() => {
          hyperlink = el.shadowRoot.querySelector('a');
        });

        it('should use the supplied href value, as the href attribute value', () => {
          expect(hyperlink).attribute('href', 'https://jsonplaceholder.typicode.com/');
        });

        it('should use the supplied rel value, as the rel attribute value', () => {
          expect(hyperlink).attribute('rel', 'alternate');
        });
      });
    });
  });

  describe('when provided an element in the slot "prefix" to support prefix icons', async () => {
    before(async () => {
      el = await fixture<SlBreadcrumbItem>(html`
        <sl-breadcrumb-item>
          <span class="prefix-example" slot="prefix">/</span>
          Home
        </sl-breadcrumb-item>
      `);
    });

    it('should render a component that passes accessibility test', async () => {
      await expect(el).to.be.accessible();
    });

    it('should accept as an assigned child in the shadow root', () => {
      const slot = <HTMLSlotElement>el.shadowRoot.querySelector('slot[name=prefix]');
      const childNodes = slot.assignedNodes({ flatten: true });

      expect(childNodes.length).to.eq(1);
    });

    it('should append class "breadcrumb-item--has-prefix" to "base" part', () => {
      const part = el.shadowRoot?.querySelector('[part="base"]') as HTMLElement;
      expect(part.classList.value).to.equal('breadcrumb-item breadcrumb-item--has-prefix');
    });
  });

  describe('when provided an element in the slot "suffix" to support suffix icons', async () => {
    before(async () => {
      el = await fixture<SlBreadcrumbItem>(html`
        <sl-breadcrumb-item>
          <span class="prefix-example" slot="suffix">/</span>
          Security
        </sl-breadcrumb-item>
      `);
    });

    it('should render a component that passes accessibility test', async () => {
      await expect(el).to.be.accessible();
    });

    it('should accept as an assigned child in the shadow root', () => {
      const slot = <HTMLSlotElement>el.shadowRoot.querySelector('slot[name=suffix]');
      const childNodes = slot.assignedNodes({ flatten: true });

      expect(childNodes.length).to.eq(1);
    });

    it('should append class "breadcrumb-item--has-suffix" to "base" part', () => {
      const part = el.shadowRoot?.querySelector('[part="base"]') as HTMLElement;
      expect(part.classList.value).to.equal('breadcrumb-item breadcrumb-item--has-suffix');
    });
  });
});
