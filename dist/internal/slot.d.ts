import type { ReactiveController, ReactiveControllerHost } from 'lit';
export declare class HasSlotController implements ReactiveController {
    host: ReactiveControllerHost & Element;
    slotNames: string[];
    constructor(host: ReactiveControllerHost & Element, ...slotNames: string[]);
    private hasDefaultSlot;
    private hasNamedSlot;
    test(slotName: string): boolean;
    hostConnected(): void;
    hostDisconnected(): void;
    handleSlotChange(event: Event): void;
}
export declare function getInnerHTML(slot: HTMLSlotElement): string;
export declare function getTextContent(slot: HTMLSlotElement | undefined | null): string;
