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
          cancelable: true,
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
// Runs when an observed property changes, e.g. @property or @internalProperty. This will only run after the first
// update, so initial values will not trigger the watch function.
//
// Usage:
//
//  @watch('propName') handlePropChange(oldValue, newValue) {
//    ...
//  }
//
export function watch(propName: string) {
  return (protoOrDescriptor: any, name: string): any => {
    const { firstUpdated, update } = protoOrDescriptor;

    protoOrDescriptor.firstUpdated = function (changedProps: Map<string, any>) {
      firstUpdated.call(this, changedProps);
      this.__didFirstUpdate = true;
    };

    protoOrDescriptor.update = function (changedProps: Map<string, any>) {
      if (this.__didFirstUpdate && changedProps.has(propName)) {
        const oldValue = changedProps.get(propName);
        const newValue = this[propName];

        if (oldValue !== newValue) {
          this[name].call(this, oldValue, newValue);
        }
      }

      update.call(this, changedProps);
    };
  };
}
