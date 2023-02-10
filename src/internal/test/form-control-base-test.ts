import { expect, fixture } from '@open-wc/testing';
import type { ShoelaceFormControl } from '../shoelace-element';

// Runs a set of generic tests for Shoelace form controls
export async function runFormControlBaseTest(tagName: string) {
  await runValidityTest(tagName);
}

// Checks the correct behavior of:
//   - `.validity`
//   - `.validationMessage`,
//   - `.checkValidity()`
//   - `.reportValidity()`
//   - `.setCustomValidity(msg)`
//
// Applicable for all Shoelace form controls
async function runValidityTest(tagName: string) {
  const control = await createFormControl(tagName);

  describe(`Form validity base test for ${tagName}`, () => {
    it('should have a property `validity` of type `object`', () => {
      expect(control).satisfy(() => control.validity !== null && typeof control.validity === 'object');
    });

    it('should have a property `validationMessage` of type `string`', () => {
      expect(control).satisfy(() => typeof control.validationMessage === 'string');
    });

    it('should implement method `checkValidity`', () => {
      expect(control).satisfies(() => typeof control.checkValidity === 'function');
    });

    it('should implement method `setCustomValidity`', () => {
      expect(control).satisfies(() => typeof control.setCustomValidity === 'function');
    });

    it('should implement method `reportValidity`', () => {
      expect(control).satisfies(() => typeof control.reportValidity === 'function');
    });

    it('should make sure that `.validity.valid` is `true` when valid', () => {
      expect(control.validity.valid).to.equal(true);
    });

    it('should make sure that `.validity.valid` is `false` when invalid', () => {
      expect(runWithCustomValidity(control, () => control.validity.valid)).to.equal(false);
    });

    it('should make sure that calling `.checkValidity()` will return `true` when valid', () => {
      expect(control.checkValidity()).to.equal(true);
    });

    it('should make sure that calling `.reportValidity()` will return `true` when valid', () => {
      expect(control.reportValidity()).to.equal(true);
    });

    it('should make sure that calling `.checkValidity()` will return `false` when invalid', () => {
      expect(runWithCustomValidity(control, () => control.checkValidity())).to.equal(false);
    });

    it('should make sure that calling `.reportValidity()` will return `false` when invalid', () => {
      expect(runWithCustomValidity(control, () => control.reportValidity())).to.equal(false);
    });

    it('should not emit an `sl-invalid` event when `.checkValidity()` is called while valid', () => {
      const emittedEvents = checkEventEmissions(control, 'sl-invalid', () => control.checkValidity());

      expect(emittedEvents.length).to.equal(0);
    });

    it('should not emit an `sl-invalid` event when `.reportValidity()` is called while valid', () => {
      const emittedEvents = checkEventEmissions(control, 'sl-invalid', () => control.reportValidity());

      expect(emittedEvents.length).to.equal(0);
    });

    it('should emit an `sl-invalid` event when `.checkValidity()` is called while invalid', () => {
      const emittedEvents = runWithCustomValidity(control, () =>
        checkEventEmissions(control, 'sl-invalid', () => control.checkValidity())
      );

      expect(emittedEvents.length).to.equal(1);
    });

    it('should emit an `sl-invalid` event when `.reportValidity()` is called while invalid', () => {
      const emittedEvents = runWithCustomValidity(control, () =>
        checkEventEmissions(control, 'sl-invalid', () => control.reportValidity())
      );

      expect(emittedEvents.length).to.equal(1);
    });
  });
}

// --- Local helper functions ---

// Creates a testable Shoelace form control instance
async function createFormControl<T extends ShoelaceFormControl = ShoelaceFormControl>(tagName: string): Promise<T> {
  return await fixture<T>(`<${tagName}></${tagName}>`);
}

// Sets a custom validity on a form control, runs an action, resets
// the validity to the previous value state and returns the return value
// of the performed action.
function runWithCustomValidity<R>(control: ShoelaceFormControl, action: () => R, customError = 'some-custom-error') {
  let ret: R;
  const oldValidationMessage = control.validationMessage;

  try {
    control.setCustomValidity(customError);
    ret = action();
  } finally {
    control.setCustomValidity(oldValidationMessage);
  }

  return ret;
}

// Runs an action while listening for emitted events of a given type.
// Returns an array of all events of the given type that have been
// been emitted while the action was running.
function checkEventEmissions(control: ShoelaceFormControl, eventType: string, action: () => void): Event[] {
  const emittedEvents: Event[] = [];

  const eventHandler = (event: Event) => {
    emittedEvents.push(event);
  };

  try {
    control.addEventListener(eventType, eventHandler);
    action();
  } finally {
    control.removeEventListener(eventType, eventHandler);
  }

  return emittedEvents;
}
