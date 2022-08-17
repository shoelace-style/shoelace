import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

export default class ShoelaceElement extends LitElement {
  // Make localization attributes reactive
  @property() dir: string;
  @property() lang: string;
}
