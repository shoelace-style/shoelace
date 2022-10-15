export function drag(container, options) {
    var _a;
    function move(pointerEvent) {
        const dims = container.getBoundingClientRect();
        const defaultView = container.ownerDocument.defaultView;
        const offsetX = dims.left + defaultView.pageXOffset;
        const offsetY = dims.top + defaultView.pageYOffset;
        const x = pointerEvent.pageX - offsetX;
        const y = pointerEvent.pageY - offsetY;
        if (options === null || options === void 0 ? void 0 : options.onMove) {
            options.onMove(x, y);
        }
    }
    function stop() {
        document.removeEventListener('pointermove', move);
        document.removeEventListener('pointerup', stop);
        if (options === null || options === void 0 ? void 0 : options.onStop) {
            options.onStop();
        }
    }
    document.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerup', stop);
    if (((_a = options === null || options === void 0 ? void 0 : options.initialEvent) === null || _a === void 0 ? void 0 : _a.type) === 'pointermove') {
        move(options.initialEvent);
    }
}
