import { esbuildPlugin } from '@web/dev-server-esbuild';
import { playwrightLauncher } from '@web/test-runner-playwright';
import { globbySync } from 'globby';

export default {
  rootDir: '.',
  files: 'src/**/*.test.ts',
  concurrentBrowsers: 3,
  nodeResolve: true,
  plugins: [
    esbuildPlugin({
      ts: true,
      target: 'auto'
    })
  ],
  browsers: [
    playwrightLauncher({ product: 'chromium' }),
    playwrightLauncher({ product: 'firefox' }),
    playwrightLauncher({ product: 'webkit' })
  ],
  testRunnerHtml: testFramework => `
    <html>
      <head></head>
      <body>
        <script type="module" src="dist/shoelace.js"></script>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>
  `,
  // Create a named group for every test file to enable running single tests.
  // If a test file is `split-panel.test.ts` then you can run `npm run test -- --group split-panel` to run only that file's tests
  groups: globbySync('src/**/*.test.ts').map(path => {
    const groupName = path.match(/^.*\/(?<fileName>.*)\.test\.ts/).groups.fileName;
    return {
      name: groupName,
      files: path
    };
  })
};
