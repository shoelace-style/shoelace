// A validity state object that represents `valid`
export const validValidityState: ValidityState = Object.freeze({
  badInput: false,
  customError: false,
  patternMismatch: false,
  rangeOverflow: false,
  rangeUnderflow: false,
  stepMismatch: false,
  tooLong: false,
  tooShort: false,
  typeMismatch: false,
  valid: true,
  valueMissing: false
});

// A validity state object that represents `value missing`
export const valueMissingValidityState: ValidityState = Object.freeze({
  ...validValidityState,
  valid: false,
  valueMissing: true
});

// A validity state object that represents a custom error
export const customErrorValidityState: ValidityState = Object.freeze({
  ...validValidityState,
  valid: false,
  customError: true
});
