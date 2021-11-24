//
// This script runs the Custom Elements Manifest analyzer to generate custom-elements.json
//
import commandLineArgs from 'command-line-args';
import { execSync } from 'child_process';

const { outdir } = commandLineArgs({ name: 'outdir', type: String });

// Run the analyzer
console.log('Generating component metadata');
execSync(`cem analyze --litelement --outdir "${outdir}"`, { stdio: 'inherit' });
