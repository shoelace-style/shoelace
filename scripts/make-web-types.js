//
// This script generates a web-types.json file from custom-elements.json for use with WebStorm/PHPStorm
//
// Docs: https://github.com/JetBrains/web-types
//
import commandLineArgs from 'command-line-args';
import jsonata from 'jsonata';
import fs from 'fs';
import path from 'path';

const { outdir } = commandLineArgs({ name: 'outdir', type: String });
const metadata = JSON.parse(fs.readFileSync(path.join(outdir, 'custom-elements.json'), 'utf8'));

const jsonataExprString = `{
  "$schema": "http://json.schemastore.org/web-types",
  "name": package.name,
  "version": package.version,
  "description-markup": "markdown",
  "framework-config": {
    "enable-when": {
      "node-packages": [
        package.name
      ]
    }
  },
  "contributions": {
    "html": {
      "elements": [
        modules.declarations.{
          "name": tagName,
          "description": description,
          "doc-url": $join(["https://shoelace.style/components/", $substringAfter(tagName, 'sl-')]),
          "js": {
            "properties": [
              members.{
                "name": name,
                "description": description,
                "value": {
                  "type": type.text
                }
              }
            ],
            "events": [
              events.{
                "name": name,
                "description": description
              }
            ]
          },
          "attributes": [
            attributes.{
              "name": name,
              "description": description,
              "value": {
                "type": type.text
              }
            }
          ]
        }
      ]
    }
  }
}`;

// Run the conversion
const expression = jsonata(jsonataExprString);
const result = await expression.evaluate(metadata);

console.log('Generating web types');
fs.writeFileSync(path.join(outdir, 'web-types.json'), JSON.stringify(result, null, 2), 'utf8');
