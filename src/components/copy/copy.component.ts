import { getAnimation, setDefaultAnimation } from '../../utilities/animation-registry.js';
import { html } from 'lit';
import { LocalizeController } from '../../utilities/localize.js';
import { property, query } from 'lit/decorators.js';
import ShoelaceElement from '../../internal/shoelace-element.js';
import SlIconButton from '../icon-button/icon-button.component.js';
import styles from './copy.styles.js';
import type { CSSResultGroup } from 'lit';

/**
 * @summary Copies data to the clipboard when the user clicks or taps the trigger.
 * @documentation https://shoelace.style/components/copy
 * @status experimental
 * @since 2.7
 *
 * @dependency sl-icon-button
 *
 * @event sl-copied - Emitted when the data has been copied.
 * @event sl-error - Emitted when the data could not be copied.
 *
 * @slot - A button that triggers copying.
 * @slot success - A button to briefly show when copying is successful.
 * @slot error - A button to briefly show when a copy error occurs.
 *
 * @animation copy.in - The animation to use when copy buttons animate in.
 * @animation copy.out - The animation to use when copy buttons animate out.
 */
export default class SlCopy extends ShoelaceElement {
  static styles: CSSResultGroup = styles;
  static dependencies = {
    'sl-icon-button': SlIconButton
  };

  private readonly localize = new LocalizeController(this);

  @query('slot:not([name])') defaultSlot: HTMLSlotElement;
  @query('slot[name="success"]') successSlot: HTMLSlotElement;
  @query('slot[name="error"]') errorSlot: HTMLSlotElement;

  /** The text value to copy. */
  @property({ type: String }) value = '';

  /** The length of time to show feedback before restoring the default trigger. */
  @property({ attribute: 'feedback-duration', type: Number }) feedbackDuration = 1000;

  /**
   * An id that references an element in the same document from which data will be copied. If the element is a link, the
   * `href` will be copied. If the element is a form control or has a `value` property, its `value` will be copied.
   * Otherwise, the element's text content will be copied.
   */
  @property({ type: String }) from = '';

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('aria-live', 'polite');
  }

  private async handleCopy() {
    // Copy the value by default
    let valueToCopy = this.value;

    // If an element is specified, copy from that instead
    if (this.from) {
      const root = this.getRootNode() as ShadowRoot | Document;
      const target = 'getElementById' in root ? root.getElementById(this.from) : false;

      if (target) {
        if (target instanceof HTMLAnchorElement && target.hasAttribute('href')) {
          valueToCopy = target.href;
        } else if ('value' in target) {
          valueToCopy = String(target.value);
        } else {
          valueToCopy = target.textContent || '';
        }
      } else {
        this.showStatus('error');
        this.emit('sl-error');
      }
    }

    // Copy from the value property otherwise
    if (valueToCopy) {
      try {
        await navigator.clipboard.writeText(valueToCopy);
        this.showStatus('success');
        this.emit('sl-copied');
      } catch (error) {
        this.showStatus('error');
        this.emit('sl-error');
      }
    }
  }

  private async showStatus(status: 'success' | 'error') {
    const target = status === 'success' ? this.successSlot : this.errorSlot;
    const showAnimation = getAnimation(this, 'copy.in', { dir: 'ltr' });
    const hideAnimation = getAnimation(this, 'copy.out', { dir: 'ltr' });

    await this.defaultSlot.animate(hideAnimation.keyframes, hideAnimation.options).finished;
    this.defaultSlot.hidden = true;

    target.hidden = false;
    await target.animate(showAnimation.keyframes, showAnimation.options).finished;

    setTimeout(async () => {
      await target.animate(hideAnimation.keyframes, hideAnimation.options).finished;
      target.hidden = true;
      this.defaultSlot.hidden = false;
      this.defaultSlot.animate(showAnimation.keyframes, showAnimation.options);
    }, this.feedbackDuration);
  }

  render() {
    return html`
      <slot @click=${this.handleCopy}>
        <sl-icon-button
          library="system"
          name="copy"
          label=${this.localize.term('copy')}
          exportparts="base:icon-button__base"
        ></sl-icon-button>
      </slot>

      <slot name="success" hidden>
        <sl-icon-button
          library="system"
          name="check"
          label=${this.localize.term('copied')}
          exportparts="base:icon-button__base"
        ></sl-icon-button>
      </slot>

      <slot name="error" hidden>
        <sl-icon-button
          library="system"
          name="x-lg"
          label=${this.localize.term('error')}
          exportparts="base:icon-button__base"
        ></sl-icon-button>
      </slot>
    `;
  }
}

setDefaultAnimation('copy.in', {
  keyframes: [
    { scale: '.25', opacity: '.25' },
    { scale: '1', opacity: '1' }
  ],
  options: { duration: 125 }
});

setDefaultAnimation('copy.out', {
  keyframes: [
    { scale: '1', opacity: '1' },
    { scale: '.25', opacity: '0' }
  ],
  options: { duration: 125 }
});

declare global {
  interface HTMLElementTagNameMap {
    'sl-copy': SlCopy;
  }
}
