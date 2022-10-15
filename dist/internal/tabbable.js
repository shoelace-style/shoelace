function isTabbable(el) {
    const tag = el.tagName.toLowerCase();
    if (el.getAttribute('tabindex') === '-1') {
        return false;
    }
    if (el.hasAttribute('disabled')) {
        return false;
    }
    if (el.hasAttribute('aria-disabled') && el.getAttribute('aria-disabled') !== 'false') {
        return false;
    }
    if (tag === 'input' && el.getAttribute('type') === 'radio' && !el.hasAttribute('checked')) {
        return false;
    }
    if (el.offsetParent === null) {
        return false;
    }
    if (window.getComputedStyle(el).visibility === 'hidden') {
        return false;
    }
    if ((tag === 'audio' || tag === 'video') && el.hasAttribute('controls')) {
        return true;
    }
    if (el.hasAttribute('tabindex')) {
        return true;
    }
    if (el.hasAttribute('contenteditable') && el.getAttribute('contenteditable') !== 'false') {
        return true;
    }
    return ['button', 'input', 'select', 'textarea', 'a', 'audio', 'video', 'summary'].includes(tag);
}
export function getTabbableBoundary(root) {
    var _a, _b;
    const allElements = [];
    function walk(el) {
        if (el instanceof HTMLElement) {
            allElements.push(el);
            if (el.shadowRoot !== null && el.shadowRoot.mode === 'open') {
                walk(el.shadowRoot);
            }
        }
        [...el.children].forEach((e) => walk(e));
    }
    walk(root);
    const start = (_a = allElements.find(el => isTabbable(el))) !== null && _a !== void 0 ? _a : null;
    const end = (_b = allElements.reverse().find(el => isTabbable(el))) !== null && _b !== void 0 ? _b : null;
    return { start, end };
}
