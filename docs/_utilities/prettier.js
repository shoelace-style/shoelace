import { format } from 'prettier';

/** Formats markup using prettier. */
export function prettierPlugin(options) {
  return function (eleventyConfig) {
    eleventyConfig.addTransform('external-links', async content => {
      options = {
        arrowParens: 'avoid',
        bracketSpacing: true,
        htmlWhitespaceSensitivity: 'css',
        insertPragma: false,
        bracketSameLine: false,
        jsxSingleQuote: false,
        parser: 'html',
        printWidth: 120,
        proseWrap: 'preserve',
        quoteProps: 'as-needed',
        requirePragma: false,
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'none',
        useTabs: false,
        ...options
      };

      return await format(content, options);
    });
  };
}
