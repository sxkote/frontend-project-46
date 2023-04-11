import * as path from 'path';
import { cwd } from 'node:process';
import fs from 'fs';
// eslint-disable-next-line import/no-extraneous-dependencies
import yaml from 'js-yaml';

function normalizePath(filepath) {
  return filepath.includes(cwd()) ? filepath : path.resolve(cwd(), filepath);
}

function readFile(filepath) {
  return fs.readFileSync(normalizePath(filepath));
}

export default (filepath) => {
  const extension = path.extname(path.basename(filepath));
  switch (extension) {
    case '.json':
      return JSON.parse(readFile(filepath));
    case '.yaml':
    case '.yml':
      return yaml.load(readFile(filepath));
    default:
      throw new Error('Unrecognized file format!');
  }
};
