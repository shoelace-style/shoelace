const { format } = require('prettier');

/** Formats markup using prettier. */
module.exports = function (content, options) {
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

  return format(content, options);
};
