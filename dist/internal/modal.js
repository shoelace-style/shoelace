import { getTabbableBoundary } from './tabbable';
let activeModals = [];
export default class Modal {
    constructor(element) {
        this.tabDirection = 'forward';
        this.element = element;
        this.handleFocusIn = this.handleFocusIn.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }
    activate() {
        activeModals.push(this.element);
        document.addEventListener('focusin', this.handleFocusIn);
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
    }
    deactivate() {
        activeModals = activeModals.filter(modal => modal !== this.element);
        document.removeEventListener('focusin', this.handleFocusIn);
        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('keyup', this.handleKeyUp);
    }
    isActive() {
        return activeModals[activeModals.length - 1] === this.element;
    }
    checkFocus() {
        if (this.isActive()) {
            if (!this.element.matches(':focus-within')) {
                const { start, end } = getTabbableBoundary(this.element);
                const target = this.tabDirection === 'forward' ? start : end;
                if (typeof (target === null || target === void 0 ? void 0 : target.focus) === 'function') {
                    target.focus({ preventScroll: true });
                }
            }
        }
    }
    handleFocusIn() {
        this.checkFocus();
    }
    handleKeyDown(event) {
        if (event.key === 'Tab' && event.shiftKey) {
            this.tabDirection = 'backward';
        }
        requestAnimationFrame(() => this.checkFocus());
    }
    handleKeyUp() {
        this.tabDirection = 'forward';
    }
}
