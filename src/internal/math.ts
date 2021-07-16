//
// Ensures a number stays within a minimum and maximum value
//
export function clamp(value: number, min: number, max: number) {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}
