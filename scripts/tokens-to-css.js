import fs from 'fs';
import { mkdirSync } from 'fs';
import path from 'path';
import commandLineArgs from 'command-line-args';

const { outdir, theme } = commandLineArgs([
  { name: 'outdir', type: String },
  { name: 'theme', type: String, defaultValue: 'light' }
]);
const themesDir = path.join(outdir, 'themes', 'generated'); // TODO: this is for testing purposes

const source = fs.readFileSync('src/themes/default.json', 'utf8');
const tokens = JSON.parse(source);

const rootSelectors = [':root'];
if (theme == 'light') rootSelectors.push(':host');
rootSelectors.push(`.sl-theme-${theme}`);

const outputLines = [];

console.log(`Converting tokens JSON to CSS variables for ${theme} theme`);

mkdirSync(themesDir, { recursive: true });

const processThemeValues = entries => {
  entries.forEach(([key, value]) => {
    if (!key.startsWith('$')) {
      let suffixComment = '';
      let tokenValue = value.$value;

      if (value.$extensions) {
        if (value.$extensions[`style.shoelace.theme-${theme}`])
          tokenValue = value.$extensions[`style.shoelace.theme-${theme}`];
        if (value.$extensions['style.shoelace.newline']) outputLines.push('');
        if (value.$extensions['style.shoelace.comment'])
          suffixComment = ` /* ${value.$extensions['style.shoelace.comment']} */`;
      }
      outputLines.push(`  --sl-${key}: ${tokenValue};${suffixComment}`);
    }
  });
};

outputLines.push(`${rootSelectors.join(',\n')} {`);
outputLines.push(`  color-scheme: ${theme};`);

Object.entries(tokens).forEach(([key, value]) => {
  outputLines.push(`\n  /*\n   * ${key}\n   */`);

  if (Object.keys(Object.entries(value)[0][1]).includes('$value')) {
    // Shallow set of values
    outputLines.push('');
    processThemeValues(Object.entries(value));
  } else {
    // Nested sets of values
    Object.entries(value).forEach(([subKey, subValue]) => {
      if (!subKey.startsWith('$')) {
        outputLines.push(`\n  /* ${subKey} */`);
        processThemeValues(Object.entries(subValue));
      }
    });
  }
});

outputLines.push('}');

const cssFile = path.join(themesDir, `${theme}.css`);

fs.writeFileSync(cssFile, outputLines.join('\n'), 'utf8');
