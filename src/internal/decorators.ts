// @event decorator
//
// For convenience, all events are composed, cancelable, and bubble. Calling emit() will return the dispatched event.
//
// Usage:
//
//  @event('sl-change') slChange: EventEmitter<void>;
//
// To emit the event:
//
//  this.slChange.emit({ detail: ... });
//
export function event(eventName?: string) {
  // Legacy TS Decorator
  function legacyEvent(descriptor: PropertyDescriptor, protoOrDescriptor: {}, name: PropertyKey) {
    Object.defineProperty(protoOrDescriptor, name, descriptor);
  }

  // TC39 Decorators proposal
  function standardEvent(descriptor: PropertyDescriptor, element: { key: string }) {
    return {
      kind: 'method',
      placement: 'prototype',
      key: element.key,
      descriptor
    };
  }

  return (protoOrDescriptor: any, name: string): any => {
    const descriptor = {
      get(this: HTMLElement) {
        return new EventEmitter(this, eventName || (name !== undefined ? name : protoOrDescriptor.key));
      },
      enumerable: true,
      configurable: true
    };
    return name !== undefined
      ? legacyEvent(descriptor, protoOrDescriptor, name)
      : standardEvent(descriptor, protoOrDescriptor);
  };
}

// EventEmitter to use with the @event decorator
export class EventEmitter<T> {
  constructor(private target: HTMLElement, private eventName: string) {}
  emit(eventOptions?: CustomEventInit) {
    const event = new CustomEvent<T>(
      this.eventName,
      Object.assign(
        {
          bubbles: true,
          cancelable: false,
          composed: true,
          detail: {}
        },
        eventOptions
      )
    );
    this.target.dispatchEvent(event);
    return event;
  }
}

// @watch decorator
//
// Runs when an observed property changes, e.g. @property or @state, but before the component updates.
//
// To wait for the update to complete after a change, use `await this.updateComplete` in the handler. To determine if
// the component has previously been updated/rendered, check `this.hasUpdated` in the handler.
//
// Usage:
//
//  @watch('propName')
//  handlePropChange(oldValue, newValue) {
//    ...
//  }
//
interface WatchOptions {
  waitUntilFirstUpdate?: boolean;
}

export function watch(propName: string, options?: WatchOptions) {
  return (protoOrDescriptor: any, name: string): any => {
    const { update } = protoOrDescriptor;

    options = Object.assign({ waitUntilFirstUpdate: false }, options) as WatchOptions;

    protoOrDescriptor.update = function (changedProps: Map<string, any>) {
      if (changedProps.has(propName)) {
        const oldValue = changedProps.get(propName);
        const newValue = this[propName];

        if (oldValue !== newValue) {
          if (!options?.waitUntilFirstUpdate || this.hasUpdated) {
            this[name].call(this, oldValue, newValue);
          }
        }
      }

      update.call(this, changedProps);
    };
  };
}
