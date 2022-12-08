/** Converts the first letter of a string to uppercase */
export function uppercaseFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
