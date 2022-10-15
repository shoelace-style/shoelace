import ShoelaceElement from '../../internal/shoelace-element';
import type { CSSResultGroup } from 'lit';
export default class SlMutationObserver extends ShoelaceElement {
    static styles: CSSResultGroup;
    private mutationObserver;
    attr: string;
    attrOldValue: boolean;
    charData: boolean;
    charDataOldValue: boolean;
    childList: boolean;
    disabled: boolean;
    connectedCallback(): void;
    disconnectedCallback(): void;
    handleDisabledChange(): void;
    handleChange(): void;
    handleMutation(mutationList: MutationRecord[]): void;
    startObserver(): void;
    stopObserver(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-mutation-observer': SlMutationObserver;
    }
}
