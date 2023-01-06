import fs from 'fs';

let source = fs.readFileSync('default.json', 'utf8');
let tokens = JSON.parse(source);

let currentTheme = 'light';
let rootSelectors = [':root', ':host', `.sl-theme-${currentTheme}`];
let outputLines = [];

let processThemeValues = entries => {
  entries.forEach(([key, value]) => {
    let suffixComment = '';

    if (value.newline) outputLines.push('');
    if (value.comment) suffixComment = ` /* ${value.comment} */`;
    outputLines.push(`  --sl-${key}: ${value.themes[currentTheme] || value.themes['light']};${suffixComment}`);
  });
};

outputLines.push(`${rootSelectors.join(',\n')} {`);
outputLines.push(`  color-scheme: ${currentTheme};`);

Object.entries(tokens).forEach(([key, value]) => {
  outputLines.push(`\n  /*\n   * ${key}\n   */`);

  if (Object.keys(Object.entries(value)[0][1]).includes('themes')) {
    // Shallow set of values
    outputLines.push('');
    processThemeValues(Object.entries(value));
  } else {
    // Nested sets of values
    Object.entries(value).forEach(([subKey, subValue]) => {
      outputLines.push(`\n  /* ${subKey} */`);
      processThemeValues(Object.entries(subValue));
    });
  }
});

outputLines.push('}');

console.log(outputLines.join('\n'));
