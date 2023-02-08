type SlBlurEvent = CustomEvent<Record<string, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-blur': SlBlurEvent;
  }
}

export default SlBlurEvent;
