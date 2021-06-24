//
// This script runs the Custom Elements Manifest analyzer to generate custom-elements.json
//
import chalk from 'chalk';
import mkdirp from 'mkdirp';
import { execSync } from 'child_process';

mkdirp.sync('./dist');

// Run the analyzer
console.log('Generating component metadata');
execSync('cem analyze --litelement --outdir dist', { stdio: 'inherit' });
console.log(chalk.cyan(`Successfully generated metadata 🏷\n`));
