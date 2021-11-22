import { expect, fixture, html } from '@open-wc/testing';
import '../../../dist/shoelace.js';
import type SlVisuallyHidden from './visually-hidden';

describe('<sl-visually-hidden>', () => {
  it('should render but not display visually hidden content', async () => {
    const el = <SlVisuallyHidden>await fixture(html`
      <sl-visually-hidden>
        <a href="#">Skip to main content</a>
      </sl-visually-hidden>
    `);

    const { width, height, overflow, clipPath } = getComputedStyle(el);

    expect(width).to.equal('1px');
    expect(height).to.equal('1px');
    expect(overflow).to.equal('hidden');
    expect(clipPath).to.equal('inset(50%)');
  });

  // should show visually hidden content when focused
  it('should show visually hidden content when focused', async () => {
    const el = <SlVisuallyHidden>await fixture(html`
      <sl-visually-hidden>
        <a href="#">Skip to main content</a>
      </sl-visually-hidden>
    `);

    const a = el.querySelector('a');
    a.focus();

    const { width, height, overflow, clipPath } = getComputedStyle(el);

    expect(width).not.to.equal('1px');
    expect(height).not.to.equal('1px');
    expect(overflow).not.to.equal('hidden');
    expect(clipPath).not.to.equal('inset(50%)');
  });
});
