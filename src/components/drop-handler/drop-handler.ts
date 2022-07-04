import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../../components/icon-button/icon-button';
import '../../components/icon/icon';
import '../../components/progress-bar/progress-bar';
import { emit } from '../../internal/event';
import { DropEffect } from './library';

/**
 * @since 2.0
 * @status experimental
 *
 * @slot - the default slot is a container which allows the user to
 * interact with the HTML Drag and Drop API.
 *
 * @event sl-drag-leave - Emitted when dragged files have been moved out of the drop-handler area without having been dropped.
 * @event sl-drag-over - Emitted when files have been dragged over the drop-handler area, but not yet dropped.
 * @event sl-drop - Emitted when dragged files have been dropped on the drop-handler area.
 */

@customElement('sl-drop-handler')
export default class SlDropHandler extends LitElement {
  /** Controls the feedback (typically visual) the user is given during a drag and drop operation */
  get dropEffect(): DropEffect {
    return this.currentDropEffect;
  }
  set dropEffect(value: DropEffect) {
    if (Object.keys(DropEffect).includes(value)) {
      this.currentDropEffect = value;
    }
  }
  private currentDropEffect: DropEffect = DropEffect.COPY;

  /** Indicates if an item is currently dragged over the slotted area */
  @property({ type: Boolean, reflect: true, attribute: 'dragged' })
  isDragged = false;

  private debouncedDragLeave: number | null = null;

  private readonly eventMap: { type: string; listener: EventListenerOrEventListenerObject }[] = [
    { type: 'drop', listener: this.onDrop },
    { type: 'dragover', listener: this.onDragOver },
    { type: 'dragleave', listener: this.onDragLeave }
  ];

  connectedCallback(): void {
    super.connectedCallback();
    this.onDrop = this.onDrop.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);

    this.eventMap.forEach(opt => this.addEventListener(opt.type, opt.listener));
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.eventMap.forEach(opt => this.removeEventListener(opt.type, opt.listener));
  }

  onDragLeave(event: DragEvent): void {
    this.clearDebouncedDragLeave();

    this.debouncedDragLeave = window.setTimeout(() => {
      this.isDragged = false;
      emit(this, 'sl-drag-leave', {
        detail: event
      });
    }, 100);
  }

  public onDragOver(event: DragEvent): void {
    if (!event.dataTransfer) {
      return;
    }
    event.preventDefault();

    this.clearDebouncedDragLeave();

    this.isDragged = true;

    event.dataTransfer.dropEffect = this.dropEffect;
    emit(this, 'sl-drag-over', {
      detail: event
    });
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.clearDebouncedDragLeave();
    this.isDragged = false;

    emit(this, 'sl-drop', {
      detail: event
    });
  }

  protected clearDebouncedDragLeave(): void {
    if (this.debouncedDragLeave) {
      clearTimeout(this.debouncedDragLeave);
      this.debouncedDragLeave = null;
    }
  }

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-drop-handler': SlDropHandler;
  }
}
