//
// Polyfills the formdata event in unsupportive browsers. This is a partial polyfill to support appending custom element
// form data on submit. The formdata event landed in Safari until 15.1, which is slighly too new to rely on. All other
// browsers have great support.
//
// https://caniuse.com/mdn-api_htmlformelement_formdata_event
//
// Original code derived from: https://gist.github.com/WickyNilliams/eb6a44075356ee504dd9491c5a3ab0be
//
// Copyright (c) 2021 Nick Williams (https://wicky.nillia.ms)
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//
class FormDataEventPolyfill extends Event {
  formData: FormData;

  constructor(formData: FormData) {
    super('formdata');
    this.formData = formData;
  }
}

class FormDataPolyfill extends FormData {
  private form: HTMLFormElement;

  constructor(form: HTMLFormElement) {
    super(form);
    this.form = form;
    form.dispatchEvent(new FormDataEventPolyfill(this));
  }

  append(name: string, value: any) {
    let input = this.form.elements[name as any] as HTMLInputElement;

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
      this.set(name, entries as any);
    } else {
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
    new FormData(event.target as HTMLFormElement);
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
      new FormData(event.target as HTMLFormElement);
    }
  });
}

polyfillFormData();
