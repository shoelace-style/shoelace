export class HasSlotController {
    constructor(host, ...slotNames) {
        this.slotNames = [];
        (this.host = host).addController(this);
        this.slotNames = slotNames;
        this.handleSlotChange = this.handleSlotChange.bind(this);
    }
    hasDefaultSlot() {
        return [...this.host.childNodes].some(node => {
            if (node.nodeType === node.TEXT_NODE && node.textContent.trim() !== '') {
                return true;
            }
            if (node.nodeType === node.ELEMENT_NODE) {
                const el = node;
                const tagName = el.tagName.toLowerCase();
                if (tagName === 'sl-visually-hidden') {
                    return false;
                }
                if (!el.hasAttribute('slot')) {
                    return true;
                }
            }
            return false;
        });
    }
    hasNamedSlot(name) {
        return this.host.querySelector(`:scope > [slot="${name}"]`) !== null;
    }
    test(slotName) {
        return slotName === '[default]' ? this.hasDefaultSlot() : this.hasNamedSlot(slotName);
    }
    hostConnected() {
        this.host.shadowRoot.addEventListener('slotchange', this.handleSlotChange);
    }
    hostDisconnected() {
        this.host.shadowRoot.removeEventListener('slotchange', this.handleSlotChange);
    }
    handleSlotChange(event) {
        const slot = event.target;
        if ((this.slotNames.includes('[default]') && !slot.name) || (slot.name && this.slotNames.includes(slot.name))) {
            this.host.requestUpdate();
        }
    }
}
export function getInnerHTML(slot) {
    const nodes = slot.assignedNodes({ flatten: true });
    let html = '';
    [...nodes].forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
            html += node.outerHTML;
        }
        if (node.nodeType === Node.TEXT_NODE) {
            html += node.textContent;
        }
    });
    return html;
}
export function getTextContent(slot) {
    if (!slot) {
        return '';
    }
    const nodes = slot.assignedNodes({ flatten: true });
    let text = '';
    [...nodes].forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
            text += node.textContent;
        }
    });
    return text;
}
