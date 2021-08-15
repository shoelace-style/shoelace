import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import SlSteps from '../steps/steps';
import styles from './step.styles';

/**
 * @since 2.0
 * @status experimental
 *
 * @dependency sl-icon
 *
 * @event sl-event-name - Emitted as an example.
 *
 * @slot step-icon The icon slot.
 * @slot step-title - The title slot.
 * @slot step-description - The description slot.
 *
 * @csspart step-container - The component's base wrapper.
 * @csspart step-content - The component's step content wrapper.
 * @csspart step-icon - The component's step title wrapper.
 * @csspart step-title - The component's step title wrapper.
 * @csspart step-description - The component's step description wrapper.
 *
 * @cssproperty --step-background-color - background-color for step.
 * @cssproperty --step-border-color - color for step border-color.
 * @cssproperty --step-icon-color - color for step icon color.
 */
@customElement('sl-step')
export default class SlStep extends LitElement {
  static styles = styles;
  /**
   * 图标
   */
  @property({ type: String, reflect: true }) icon: string;
  /**
   * 描述
   */
  @property({ type: String, reflect: true }) description: string;
  /**
   * 标题
   */
  @property({ type: String, reflect: true }) title: string;

  /**
   * 顺序号
   */
  @property({ type: Number })
  index: number = 0;

  isCurrentStep() {
    const steps = this.parentSteps;
    if (steps) {
      return steps.childStep.indexOf(this) === steps.current;
    }
    return false;
  }

  isFinished() {
    const steps = this.parentSteps;
    if (steps) {
      return steps.childStep.indexOf(this) < steps.current;
    }
    return false;
  }

  get parentSteps(): SlSteps {
    return this.closest('sl-steps') as SlSteps;
  }
  render() {
    return html`
      <div part="step-container">
        <div class="tail"></div>
        <div part="step-icon">
          <span class="step-icon-span" part="step-icon-span">
            <slot name="step-icon">
              ${this.icon
                ? html`<sl-icon library="system" name="${this.icon}"></sl-icon>`
                : html`<span>${this.index}</span>`}</slot
            >
          </span>
        </div>
        <div part="step-content">
          <div part="step-title">
            <slot name="step-title">${this.title}</slot>
          </div>
          <div part="step-description"><slot name="step-description">${this.description}</slot></div>
        </div>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-step': SlStep;
  }
}
