//
// Formats a number to a human-readable string of bytes or bits such as "100 MB"
//
export function formatBytes(bytes: number, options: FormatBytesOptions) {
  options = Object.assign(
    {
      unit: 'bytes',
      formatter: (number: number) => number.toLocaleString()
    },
    options
  );

  const byteUnits = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const bitUnits = ['b', 'kbit', 'Mbit', 'Gbit', 'Tbit', 'Pbit', 'Ebit', 'Zbit', 'Ybit']; // cspell:disable-line
  const units = options.unit === 'bytes' ? byteUnits : bitUnits;
  const isNegative = bytes < 0;

  bytes = Math.abs(bytes);
  if (bytes === 0) return '0 B';

  const i = Math.min(Math.floor(Math.log10(bytes) / 3), units.length - 1);
  const num = Number((bytes / Math.pow(1000, i)).toPrecision(3));
  const numString = options.formatter ? options.formatter(num) : num;
  const prefix = isNegative ? '-' : '';

  return `${prefix}${numString} ${units[i]}`;
}

interface FormatBytesOptions {
  unit?: 'bytes' | 'bits';
  formatter?: (number: number) => string;
}
