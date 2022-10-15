interface DragOptions {
    onMove: (x: number, y: number) => void;
    onStop: () => void;
    initialEvent: PointerEvent;
}
export declare function drag(container: HTMLElement, options?: Partial<DragOptions>): void;
export {};
