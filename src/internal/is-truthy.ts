export function isTruthy<T>(obj: T | T[] | undefined | null | '' | [] | 0 | false): obj is T | T[] {
  // eslint-disable-next-line no-restricted-syntax -- we do intentionally want the type coercion behavior
  return Boolean(obj);
}
