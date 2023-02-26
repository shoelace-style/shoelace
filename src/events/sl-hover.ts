type SlHoverEvent = CustomEvent<{
  phase: 'start' | 'move' | 'end';
  value: number;
}>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-hover': SlHoverEvent;
  }
}

export default SlHoverEvent;
