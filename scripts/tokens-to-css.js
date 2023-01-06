import fs from 'fs';
import commandLineArgs from 'command-line-args';

const { theme } = commandLineArgs({ name: 'theme', type: String, defaultValue: 'light' });

const source = fs.readFileSync('src/themes/default.json', 'utf8');
const tokens = JSON.parse(source);

const rootSelectors = [':root'];
if (theme == 'light') rootSelectors.push(':host');
rootSelectors.push(`.sl-theme-${theme}`);

const outputLines = [];

const processThemeValues = entries => {
  entries.forEach(([key, value]) => {
    let suffixComment = '';

    if (value.newline) outputLines.push('');
    if (value.comment) suffixComment = ` /* ${value.comment} */`;
    outputLines.push(`  --sl-${key}: ${value.themes[theme] || value.themes['light']};${suffixComment}`);
  });
};

outputLines.push(`${rootSelectors.join(',\n')} {`);
outputLines.push(`  color-scheme: ${theme};`);

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
