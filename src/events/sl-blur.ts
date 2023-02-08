type SlBlurEvent = CustomEvent<null>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-blur': SlBlurEvent;
  }
}

export default SlBlurEvent;
