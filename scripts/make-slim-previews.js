import { execSync } from 'child_process';
import { readFileSync, readdirSync, writeFileSync, unlinkSync } from 'fs';
import path from 'path';

/* 
This script generates slim template code blocks from the HTML examples in the markdown. 
It should only need to be run once per file, since the slim examples will then be checked in.
For new files (new features, etc.), add the filename to the `files` array.
Usage: `node scripts/make-slim-previews.js` 
The translation won't be perfect! You will probably need to adjust indentation and change "style." to "css" and "script." to "javascript"
*/

console.log('Make-slim-previews');

const docsDir = path.join('docs/components');
// const files = readdirSync(docsDir); /* The whole directory */
const files = ['carousel-item.md']; /* A discreet set of files */
const excluded = ['animation', 'mutation-observer', 'popup', 'icon'];
const errorFiles = {};

files.forEach(fileName => {
  const nameSlug = path.parse(fileName).name;
  if (nameSlug.includes('-slim')) {
    unlinkSync(`${docsDir}/${fileName}`);
    return;
  }
  try {
    console.log(`   parsing ${nameSlug}...`);
    if (!excluded.includes(nameSlug)) {
      let contents = readFileSync(`${docsDir}/${fileName}`, 'utf8');
      const regex = /(```html:preview)(?:(?!skip).)*?(```)/gs;
      const matches = contents.match(regex);
      console.log('Matches: ', matches.length);
      matches.forEach((match, i) => {
        const stripped = match.replace('```html:preview', '').replace('\n```', '');
        let slim = execSync(`echo '${stripped}' | xhtml2slim -w none -f`, { encoding: 'utf8' });
        slim = slim.slice(0, slim.lastIndexOf('\n'));
        const replacement = match + '\r\n\r\n```pug:slim\r\n' + slim + '```';
        contents = contents.replace(match, replacement);
      });
      console.log(`       done parsing ${nameSlug}.`);
      // writeFileSync(`${docsDir}/${nameSlug}-slim.md`, contents); /* The more cautious approach, makes a new copy with `-slim` appended */
      writeFileSync(`${docsDir}/${nameSlug}.md`, contents);
      console.log(`           Wrote to ${nameSlug}.md`);
    }
  } catch (err) {
    errorFiles[nameSlug] = err;
  }
});

console.error(errorFiles);
console.log('>>>>>>>>>>>>>>>  <<<<<<<<<<<<<<<');
console.log('Error files: ', Object.keys(errorFiles));
