import { esbuildPlugin } from '@web/dev-server-esbuild';

export default {
  concurrentBrowsers: 3,
  plugins: [esbuildPlugin({ ts: true, target: 'auto' })],
  testRunnerHtml: testFramework => `
    <html>
      <head></head>
      <body>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>
  `
};
