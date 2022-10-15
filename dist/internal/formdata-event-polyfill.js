"use strict";
class FormDataEventPolyfill extends Event {
    constructor(formData) {
        super('formdata');
        this.formData = formData;
    }
}
class FormDataPolyfill extends FormData {
    constructor(form) {
        if (form) {
            super(form);
            this.form = form;
            form.dispatchEvent(new FormDataEventPolyfill(this));
        }
        else {
            super();
        }
    }
    append(name, value) {
        if (!this.form) {
            return super.append(name, value);
        }
        let input = this.form.elements[name];
        if (!input) {
            input = document.createElement('input');
            input.type = 'hidden';
            input.name = name;
            this.form.appendChild(input);
        }
        if (this.has(name)) {
            const entries = this.getAll(name);
            const index = entries.indexOf(input.value);
            if (index !== -1) {
                entries.splice(index, 1);
            }
            entries.push(value);
            this.set(name, entries);
        }
        else {
            super.append(name, value);
        }
        input.value = value;
    }
}
function supportsFormDataEvent() {
    const form = document.createElement('form');
    let isSupported = false;
    document.body.append(form);
    form.addEventListener('submit', event => {
        new FormData(event.target);
        event.preventDefault();
    });
    form.addEventListener('formdata', () => (isSupported = true));
    form.dispatchEvent(new Event('submit', { cancelable: true }));
    form.remove();
    return isSupported;
}
function polyfillFormData() {
    if (!window.FormData || supportsFormDataEvent()) {
        return;
    }
    window.FormData = FormDataPolyfill;
    window.addEventListener('submit', event => {
        if (!event.defaultPrevented) {
            new FormData(event.target);
        }
    });
}
if (document.readyState === 'complete') {
    polyfillFormData();
}
else {
    window.addEventListener('DOMContentLoaded', () => polyfillFormData());
}
