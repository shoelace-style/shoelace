import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { version } from './package.json';

export const config: Config = {
  namespace: 'Shoelace',
  buildEs5: false,
  extras: {
    cssVarsShim: false,
    dynamicImportShim: false,
    safari10: false,
    scriptDataOpts: false,
    shadowDomShim: false
  },
  globalStyle: 'src/styles/shoelace.scss',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'dist-custom-elements-bundle',
      dir: './dist/custom-elements-bundle'
    },
    {
      type: 'docs-custom',
      generator: (docs: any) => {
        docs = Object.assign(docs, { version });
      }
    },
    {
      type: 'docs-json',
      file: './dist/components.json'
    },
    {
      type: 'docs-vscode',
      file: './dist/custom-elements.json'
    }
  ],
  plugins: [
    sass({
      includePaths: ['./node_modules', './src/styles']
    })
  ]
};
