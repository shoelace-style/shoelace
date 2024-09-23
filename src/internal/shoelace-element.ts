import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

// Match event type name strings that are registered on GlobalEventHandlersEventMap...
type EventTypeRequiresDetail<T> = T extends keyof GlobalEventHandlersEventMap
  ? // ...where the event detail is an object...
    GlobalEventHandlersEventMap[T] extends CustomEvent<Record<PropertyKey, unknown>>
    ? // ...that is non-empty...
      GlobalEventHandlersEventMap[T] extends CustomEvent<Record<PropertyKey, never>>
      ? never
      : // ...and has at least one non-optional property
        Partial<GlobalEventHandlersEventMap[T]['detail']> extends GlobalEventHandlersEventMap[T]['detail']
        ? never
        : T
    : never
  : never;

// The inverse of the above (match any type that doesn't match EventTypeRequiresDetail)
type EventTypeDoesNotRequireDetail<T> = T extends keyof GlobalEventHandlersEventMap
  ? GlobalEventHandlersEventMap[T] extends CustomEvent<Record<PropertyKey, unknown>>
    ? GlobalEventHandlersEventMap[T] extends CustomEvent<Record<PropertyKey, never>>
      ? T
      : Partial<GlobalEventHandlersEventMap[T]['detail']> extends GlobalEventHandlersEventMap[T]['detail']
        ? T
        : never
    : T
  : T;

// `keyof EventTypesWithRequiredDetail` lists all registered event types that require detail
type EventTypesWithRequiredDetail = {
  [EventType in keyof GlobalEventHandlersEventMap as EventTypeRequiresDetail<EventType>]: true;
};

// `keyof EventTypesWithoutRequiredDetail` lists all registered event types that do NOT require detail
type EventTypesWithoutRequiredDetail = {
  [EventType in keyof GlobalEventHandlersEventMap as EventTypeDoesNotRequireDetail<EventType>]: true;
};

// Helper to make a specific property of an object non-optional
type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

// Given an event name string, get a valid type for the options to initialize the event that is more restrictive than
// just CustomEventInit when appropriate (validate the type of the event detail, and require it to be provided if the
// event requires it)
type SlEventInit<T> = T extends keyof GlobalEventHandlersEventMap
  ? GlobalEventHandlersEventMap[T] extends CustomEvent<Record<PropertyKey, unknown>>
    ? GlobalEventHandlersEventMap[T] extends CustomEvent<Record<PropertyKey, never>>
      ? CustomEventInit<GlobalEventHandlersEventMap[T]['detail']>
      : Partial<GlobalEventHandlersEventMap[T]['detail']> extends GlobalEventHandlersEventMap[T]['detail']
        ? CustomEventInit<GlobalEventHandlersEventMap[T]['detail']>
        : WithRequired<CustomEventInit<GlobalEventHandlersEventMap[T]['detail']>, 'detail'>
    : CustomEventInit
  : CustomEventInit;

// Given an event name string, get the type of the event
type GetCustomEventType<T> = T extends keyof GlobalEventHandlersEventMap
  ? GlobalEventHandlersEventMap[T] extends CustomEvent<unknown>
    ? GlobalEventHandlersEventMap[T]
    : CustomEvent<unknown>
  : CustomEvent<unknown>;

// `keyof ValidEventTypeMap` is equivalent to `keyof GlobalEventHandlersEventMap` but gives a nicer error message
type ValidEventTypeMap = EventTypesWithRequiredDetail | EventTypesWithoutRequiredDetail;

export default class ShoelaceElement extends LitElement {
  // Make localization attributes reactive
  @property() dir: string;
  @property() lang: string;

  /** Emits a custom event with more convenient defaults. */
  emit<T extends string & keyof EventTypesWithoutRequiredDetail>(
    name: EventTypeDoesNotRequireDetail<T>,
    options?: SlEventInit<T> | undefined
  ): GetCustomEventType<T>;
  emit<T extends string & keyof EventTypesWithRequiredDetail>(
    name: EventTypeRequiresDetail<T>,
    options: SlEventInit<T>
  ): GetCustomEventType<T>;
  emit<T extends string & keyof ValidEventTypeMap>(
    name: T,
    options?: SlEventInit<T> | undefined
  ): GetCustomEventType<T> {
    const event = new CustomEvent(name, {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: {},
      ...options
    });

    this.dispatchEvent(event);

    return event as GetCustomEventType<T>;
  }

  /* eslint-disable */
  // @ts-expect-error This is auto-injected at build time.
  static version = __SHOELACE_VERSION__;
  /* eslint-enable */

  static define(name: string, elementConstructor = this, options: ElementDefinitionOptions = {}) {
    const currentlyRegisteredConstructor = customElements.get(name) as
      | CustomElementConstructor
      | typeof ShoelaceElement;

    if (!currentlyRegisteredConstructor) {
      // We try to register as the actual class first. If for some reason that fails, we fall back to anonymous classes.
      // customElements can only have 1 class of the same "object id" per registry, so that is why the try {} catch {} exists.
      // Some tools like Jest Snapshots and if you import the constructor and call `new SlButton()` they will fail with
      //   the anonymous class version.
      try {
        customElements.define(name, elementConstructor, options);
      } catch (_err) {
        customElements.define(name, class extends elementConstructor {}, options);
      }
      return;
    }

    let newVersion = ' (unknown version)';
    let existingVersion = newVersion;

    if ('version' in elementConstructor && elementConstructor.version) {
      newVersion = ' v' + elementConstructor.version;
    }

    if ('version' in currentlyRegisteredConstructor && currentlyRegisteredConstructor.version) {
      existingVersion = ' v' + currentlyRegisteredConstructor.version;
    }

    // Need to make sure we're not working with null or empty strings before doing version comparisons.
    if (newVersion && existingVersion && newVersion === existingVersion) {
      // If versions match, we don't need to warn anyone. Carry on.
      return;
    }

    console.warn(
      `Attempted to register <${name}>${newVersion}, but <${name}>${existingVersion} has already been registered.`
    );
  }

  static dependencies: Record<string, typeof ShoelaceElement> = {};

  constructor() {
    super();
    Object.entries((this.constructor as typeof ShoelaceElement).dependencies).forEach(([name, component]) => {
      (this.constructor as typeof ShoelaceElement).define(name, component);
    });
  }

  #hasRecordedInitialProperties = false;

  // Store the constructor value of all `static properties = {}`
  initialReflectedProperties: Map<string, unknown> = new Map();

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (!this.#hasRecordedInitialProperties) {
      (this.constructor as typeof ShoelaceElement).elementProperties.forEach(
        (obj, prop: keyof typeof this & string) => {
          // eslint-disable-next-line
          if (obj.reflect && this[prop] != null) {
            this.initialReflectedProperties.set(prop, this[prop]);
          }
        }
      );

      this.#hasRecordedInitialProperties = true;
    }

    super.attributeChangedCallback(name, oldValue, newValue);
  }

  protected willUpdate(changedProperties: Parameters<LitElement['willUpdate']>[0]): void {
    super.willUpdate(changedProperties);

    // Run the morph fixing *after* willUpdate.
    this.initialReflectedProperties.forEach((value, prop: string & keyof typeof this) => {
      // If a prop changes to `null`, we assume this happens via an attribute changing to `null`.
      // eslint-disable-next-line
      if (changedProperties.has(prop) && this[prop] == null) {
        // Silly type gymnastics to appease the compiler.
        (this as Record<string, unknown>)[prop] = value;
      }
    });
  }
}

export interface ShoelaceFormControl extends ShoelaceElement {
  // Form attributes
  name: string;
  value: unknown;
  disabled?: boolean;
  defaultValue?: unknown;
  defaultChecked?: boolean;
  form?: string;

  // Constraint validation attributes
  pattern?: string;
  min?: number | string | Date;
  max?: number | string | Date;
  step?: number | 'any';
  required?: boolean;
  minlength?: number;
  maxlength?: number;

  // Form validation properties
  readonly validity: ValidityState;
  readonly validationMessage: string;

  // Form validation methods
  checkValidity: () => boolean;
  getForm: () => HTMLFormElement | null;
  reportValidity: () => boolean;
  setCustomValidity: (message: string) => void;
}
