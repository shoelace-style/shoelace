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
      type: 'www',
      serviceWorker: undefined // disable service workers
    }
  ],
  plugins: [
    sass({
      includePaths: ['./node_modules', './src/styles']
    })
  ]
};
