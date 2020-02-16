window.$docsify.plugins.push(function(hook, vm) {
  hook.beforeEach(function(content) {
    //
    // Convert custom preview blocks to previews + code blocks before markdown processing.
    //
    //                          [code]
    // ```lang preview    =>
    // [code]                   ```lang
    // ```                      [code]
    //                          ```
    content = content
      .replace(/(```([a-z0-9-_]+) preview\s+(.*?)```)/gis, `$3\n$1`)
      .replace(/(```[a-z0-9-_]+) preview/g, '$1');

    content = content.replace(/{{year}}/g, new Date().getFullYear());

    return content;
  });
});
