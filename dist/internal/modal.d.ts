export default class Modal {
    element: HTMLElement;
    tabDirection: 'forward' | 'backward';
    constructor(element: HTMLElement);
    activate(): void;
    deactivate(): void;
    isActive(): boolean;
    checkFocus(): void;
    handleFocusIn(): void;
    handleKeyDown(event: KeyboardEvent): void;
    handleKeyUp(): void;
}
