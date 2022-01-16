export function drag(container: HTMLElement, onMove: (x: number, y: number) => void) {
  function move(pointerEvent: PointerEvent) {
    const dims = container.getBoundingClientRect();
    const defaultView = container.ownerDocument.defaultView!;
    const offsetX = dims.left + defaultView.pageXOffset;
    const offsetY = dims.top + defaultView.pageYOffset;
    const x = pointerEvent.pageX - offsetX;
    const y = pointerEvent.pageY - offsetY;

    onMove(x, y);
  }

  function stop() {
    document.removeEventListener('pointermove', move);
    document.removeEventListener('pointerup', stop);
  }

  document.addEventListener('pointermove', move, { passive: true });
  document.addEventListener('pointerup', stop);
}
