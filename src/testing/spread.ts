/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { ElementPart, Part, nothing } from 'lit';
import { AsyncDirective, directive } from 'lit/async-directive.js';

type EventListenerWithOptions = EventListenerOrEventListenerObject &
  Partial<AddEventListenerOptions>;

/**
 * Usage:
 *    import { html, render } from 'lit-html';
 *    import { spread } from '@open-wc/lit-helpers';
 *
 *    render(
 *      html`
 *        <div
 *          ${spread({
 *            'my-attribute': 'foo',
 *            '?my-boolean-attribute': true,
 *            '.myProperty': { foo: 'bar' },
 *            '@my-event': () => console.log('my-event fired'),
 *          })}
 *        ></div>
 *      `,
 *      document.body,
 *    );
 *
 * @TODO: replace this with a lit-native directive once one is released: https://github.com/lit/lit/pull/1960
 */
class SpreadDirective extends AsyncDirective {
  host!: EventTarget | object | Element;
  element!: Element;
  prevData: { [key: string]: unknown } = {};

  render(_spreadData: { [key: string]: unknown }) {
    return nothing;
  }
  update(part: Part, [spreadData]: Parameters<this['render']>) {
    if (this.element !== (part as ElementPart).element) {
      this.element = (part as ElementPart).element;
    }
    this.host = part.options?.host || this.element;
    this.apply(spreadData);
    this.groom(spreadData);
    this.prevData = spreadData;
  }

  apply(data: { [key: string]: unknown }) {
    if (!data) return;
    const { prevData, element } = this;
    for (const key in data) {
      const value = data[key];
      if (value === prevData[key]) {
        continue;
      }
      const name = key.slice(1);
      switch (key[0]) {
        case '@': // event listener
          const prevHandler = prevData[key];
          if (prevHandler) {
            element.removeEventListener(
              name,
              this,
              value as EventListenerWithOptions
            );
          }
          element.addEventListener(
            name,
            this,
            value as EventListenerWithOptions
          );
          break;
        case '.': // property
          // @ts-ignore
          element[name] = value;
          break;
        case '?': // boolean attribute
          if (value) {
            element.setAttribute(name, '');
          } else {
            element.removeAttribute(name);
          }
          break;
        default:
          // standard attribute
          if (value != null) {
            element.setAttribute(key, String(value));
          } else {
            element.removeAttribute(key);
          }
          break;
      }
    }
  }

  groom(data: { [key: string]: unknown }) {
    const { prevData, element } = this;
    if (!prevData) return;
    for (const key in prevData) {
      if (!data || !(key in data)) {
        switch (key[0]) {
          case '@': // event listener
            const value = prevData[key];
            element.removeEventListener(
              key.slice(1),
              this,
              value as EventListenerWithOptions
            );
            break;
          case '.': // property
            // @ts-ignore
            element[key.slice(1)] = undefined;
            break;
          case '?': // boolean attribute
            element.removeAttribute(key.slice(1));
            break;
          default:
            // standard attribute
            element.removeAttribute(key);
            break;
        }
      }
    }
  }

  handleEvent(event: Event) {
    const value: Function | EventListenerObject = this.prevData[
      `@${event.type}`
    ] as Function | EventListenerObject;
    if (typeof value === 'function') {
      (value as Function).call(this.host, event);
    } else {
      (value as EventListenerObject).handleEvent(event);
    }
  }

  disconnected() {
    const { prevData, element } = this;
    for (const key in prevData) {
      if (key[0] !== '@') continue;
      // event listener
      const value = prevData[key];
      element.removeEventListener(
        key.slice(1),
        this,
        value as EventListenerWithOptions
      );
    }
  }

  reconnected() {
    const { prevData, element } = this;
    for (const key in prevData) {
      if (key[0] !== '@') continue;
      // event listener
      const value = prevData[key];
      element.addEventListener(
        key.slice(1),
        this,
        value as EventListenerWithOptions
      );
    }
  }
}

export const spread = directive(SpreadDirective);

class SpreadPropsDirective extends AsyncDirective {
  host!: EventTarget | object | Element;
  element!: Element;
  prevData: { [key: string]: unknown } = {};

  render(_spreadData: { [key: string]: unknown }) {
    return nothing;
  }
  update(part: Part, [spreadData]: Parameters<this['render']>) {
    if (this.element !== (part as ElementPart).element) {
      this.element = (part as ElementPart).element;
    }
    this.host = part.options?.host || this.element;
    this.apply(spreadData);
    this.groom(spreadData);
    this.prevData = spreadData;
  }

  apply(data: { [key: string]: unknown }) {
    if (!data) return;
    const { prevData, element } = this;
    for (const key in data) {
      const value = data[key];
      if (value === prevData[key]) {
        continue;
      }
      // @ts-ignore
      element[key] = value;
    }
  }

  groom(data: { [key: string]: unknown }) {
    const { prevData, element } = this;
    if (!prevData) return;
    for (const key in prevData) {
      if (!data || !(key in data)) {
        // @ts-ignore
        element[key] = undefined;
      }
    }
  }
}

export const spreadProps = directive(SpreadPropsDirective);
