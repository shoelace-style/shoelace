//
// This script runs the Custom Elements Manifest analyzer to generate custom-elements.json
//

import { execSync } from 'child_process';
import commandLineArgs from 'command-line-args';

const { outdir } = commandLineArgs({ name: 'outdir', type: String });

execSync(`cem analyze --litelement --outdir "${outdir}"`, { stdio: 'inherit' });
