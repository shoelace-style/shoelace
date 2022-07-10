export function uppercaseFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function stringMap(...parts: (string | Record<string, boolean>)[]): string | undefined {
  return parts
    .map(part => (typeof part === 'object' ? Object.keys(part).filter((key: string) => part[key]) : part))
    .flat()
    .filter(Boolean)
    .join(' ');
}
