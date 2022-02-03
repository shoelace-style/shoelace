export function partMap(map: { [partName: string]: boolean }) {
  const parts = [];

  for (const [key, value] of Object.entries(map)) {
    if (value) {
      parts.push(key);
    }
  }

  return parts.join(' ');
}
