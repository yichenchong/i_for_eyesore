import { expect, test } from '@jest/globals';
import '../jest_extensions'

import all_settings from '../../src/default_settings';

import { Rule, parse } from 'css';
import fs from 'fs';
import path from 'path';

// hierarchical checks

function checkCSSQuery(query: Query) {
  let ast;
  try {
    ast = parse(query + " {}");
  } catch (error) {
    expect(query).fail(
      'Error parsing CSS: ' + JSON.stringify(query) + '\nError: ' + JSON.stringify(error)
    );
  }
  if (!(ast?.stylesheet?.rules) || ast.stylesheet.rules.length !== 1)
    expect(ast).fail('No rules or more than one rule in CSS: ' + JSON.stringify(query));
  const r = ast.stylesheet.rules[0] as Rule;
  if (!r || (r.declarations && r.declarations.length !== 0))
    expect(ast).fail(
      `Body included in CSS rule or not single rule: ${JSON.stringify(query)}\n` +
      `AST: ${JSON.stringify(ast)}\nRules: ${JSON.stringify(ast.stylesheet?.rules ?? [])}`
    );
  expect(ast).pass('Valid CSS: ' + JSON.stringify(query));
}

function isValidFilePath(filePath: string, extensionCheck?: string) {
    // Resolve the file path relative to the project root directory
    const absolutePath = path.resolve(__dirname, '../..', filePath);
    try {
        // Check if the file exists
        fs.accessSync(absolutePath, fs.constants.F_OK);
    } catch (error) {
      expect(error).fail('File does not exist or cannot be accessed: ' + absolutePath);
    }
    if (extensionCheck) expect(filePath).toEqual(expect.stringMatching(new RegExp(extensionCheck + '$')));
    else expect(filePath).pass('File exists: ' + absolutePath + ' with no extension check');
}

const checkCSSFile = (cssFile: CSSFile) => isValidFilePath(cssFile, '.css');
const checkHTMLInsert = (htmlInsert: HTMLInsert) => htmlInsert.length > 0;

function checkRemoval(removal: Removal) {
  if (typeof removal === 'string') checkCSSQuery(removal);
  else checkCSSQuery(removal.query);
}

function checkReplacement(replacement: Replacement) {
  checkCSSQuery(replacement.query);
  checkHTMLInsert(replacement.replacement);
}

function checkSiteSetting(setting: SiteSetting) {
  expect(setting.name.length).toBeGreaterThan(0);
  expect(setting.matches.length).toBeGreaterThan(0);
  setting.matches.forEach(match => expect(match.length).toBeGreaterThan(0));
  if (setting.css) setting.css.forEach(css => checkCSSFile(css));
  if (setting.removals) setting.removals.forEach(removal => checkRemoval(removal));
  if (setting.replacements) setting.replacements.forEach(replacement => checkReplacement(replacement));
}

test.each(all_settings.sites)(
  `$name settings are valid`,
  site => checkSiteSetting(site)
);
